#!/usr/bin/env python3
"""
Variable Font Skeleton Generator
Fetches Google Fonts API and generates skeleton data files
"""

import requests
import json
from pathlib import Path

API_KEY = 'AIzaSyBPEC-k91wzgVIMm9CZSJIINd-WKmR2Wmo'
OUTPUT_DIR = Path(__file__).parent.parent.parent / 'js_glyph' / '2025_var_blocks'

# Fonts to exclude from generation
EXCLUDED_FONTS = (
    'Honk',
    'Nabla',
)

# Map Google Fonts subsets to Unicode block names
SUBSET_TO_BLOCK = {
    'bengali': 'Bengali',
    'devanagari': 'Devanagari',
    'gujarati': 'Gujarati',
    'gurmukhi': 'Gurmukhi',
    'kannada': 'Kannada',
    'malayalam': 'Malayalam',
    'oriya': 'Oriya',
    'tamil': 'Tamil',
    'telugu': 'Telugu',
    'sinhala': 'Sinhala',
    'thai': 'Thai',
    'khmer': 'Khmer',
    'lao': 'Lao',
    'myanmar': 'Myanmar',
    'chinese-simplified': 'CJK Unified Ideographs',
    'chinese-traditional': 'CJK Unified Ideographs',
    'japanese': 'Hiragana',
    'korean': 'Hangul Syllables',
    'arabic': 'Arabic',
    'hebrew': 'Hebrew',
    'cyrillic': 'Cyrillic',
    'cyrillic-ext': 'Cyrillic Extended-B',
    'greek': 'Greek and Coptic',
    'greek-ext': 'Greek Extended',
    'latin': 'Basic Latin',
    'latin-ext': 'Latin Extended-A',
    'armenian': 'Armenian',
    'georgian': 'Georgian',
    'ethiopic': 'Ethiopic',
    'cherokee': 'Cherokee',
    'tibetan': 'Tibetan',
    'math': 'Mathematical Operators',
    'symbols': 'Geometric Shapes',
    'tifinagh': 'Tifinagh',
    'makasar': 'Makasar',
    'znamenny': 'Znamenny Musical Notation',
    'syriac': 'Syriac',
    'tai-le': 'Tai Le'
}

VIETNAMESE_BLOCKS = ['Basic Latin', 'Latin Extended-A', 'Latin Extended-B']


def fetch_google_fonts():
    """Fetch variable fonts from Google Fonts API"""
    url = f'https://www.googleapis.com/webfonts/v1/webfonts?key={API_KEY}&capability=VF&sort=alpha'
    response = requests.get(url)
    response.raise_for_status()
    return response.json()


def process_fonts(data):
    """Process font data into block-axes groups"""
    block_axes_groups = {}

    for font in data['items']:
        # Skip Material icons/symbols
        if 'Material' in font['family']:
            continue

        # Only include variable fonts with axes
        if 'axes' not in font or not font['axes']:
            continue

        # Get axes combo (sorted alphabetically)
        axes = '_'.join(sorted(axis['tag'] for axis in font['axes']))
        subsets = font.get('subsets', [])

        for subset in subsets:
            if subset == 'menu':
                continue

            # Vietnamese maps to multiple blocks
            if subset == 'vietnamese':
                for block_name in VIETNAMESE_BLOCKS:
                    key = f'{block_name}___{axes}'
                    if key not in block_axes_groups:
                        block_axes_groups[key] = {
                            'block': block_name,
                            'axes': axes,
                            'fonts': []
                        }
                    block_axes_groups[key]['fonts'].append(font['family'])
                continue

            # Map subset to block name
            block_name = SUBSET_TO_BLOCK.get(subset)
            if not block_name:
                continue

            key = f'{block_name}___{axes}'
            if key not in block_axes_groups:
                block_axes_groups[key] = {
                    'block': block_name,
                    'axes': axes,
                    'fonts': []
                }
            block_axes_groups[key]['fonts'].append(font['family'])

    return block_axes_groups


def collect_font_axis_ranges(data):
    """Collect axis ranges for all variable fonts"""
    font_axes_map = {}

    for font in data['items']:
        # Skip Material icons/symbols
        if 'Material' in font['family']:
            continue

        if 'axes' in font and font['axes']:
            axes_data = {}
            for axis in font['axes']:
                axes_data[axis['tag']] = {
                    'min': axis['start'],
                    'max': axis['end']
                }
            font_axes_map[font['family']] = axes_data

    return font_axes_map


def generate_var_axes(block_axes_groups):
    """Generate var_axes array"""
    sorted_keys = sorted(block_axes_groups.keys(),
                        key=lambda k: (block_axes_groups[k]['axes'],
                                      block_axes_groups[k]['block']))

    all_axes = sorted(set(group['axes'] for group in block_axes_groups.values()))

    lines = ['var_axes = [']
    for i, axes in enumerate(all_axes):
        comma = ',' if i < len(all_axes) - 1 else ''
        lines.append(f'  "{axes}"{comma}')
    lines.append('];')
    lines.append("console.log('var_axes loaded');")
    lines.append('var_axesWait = true;')

    return '\n'.join(lines) + '\n'


def generate_var_block_lang(block_axes_groups):
    """Generate var_block_lang entries"""
    sorted_keys = sorted(block_axes_groups.keys(),
                        key=lambda k: (block_axes_groups[k]['axes'],
                                      block_axes_groups[k]['block']))

    lines = ['var_block_lang = {}', '']

    for key in sorted_keys:
        group = block_axes_groups[key]
        block_key = f"{group['block']}-{group['axes']}"
        lang_key = f"{group['block'].lower().replace(' ', '-').replace('/', '-')}-{group['axes']}"
        # Clean up multiple dashes
        lang_key = '-'.join(filter(None, lang_key.split('-')))

        lines.append(f"var_block_lang['{block_key}'] = ['{lang_key}'];")

    lines.append("console.log('var_block_lang loaded');")
    lines.append('var_block_langWait = true;')

    return '\n'.join(lines) + '\n'


def generate_var_lang_font(block_axes_groups):
    """Generate var_lang_font entries"""
    sorted_keys = sorted(block_axes_groups.keys(),
                        key=lambda k: (block_axes_groups[k]['axes'],
                                      block_axes_groups[k]['block']))

    lines = ['var_lang_font = {}', '']

    for key in sorted_keys:
        group = block_axes_groups[key]
        lang_key = f"{group['block'].lower().replace(' ', '-').replace('/', '-')}-{group['axes']}"
        lang_key = '-'.join(filter(None, lang_key.split('-')))

        # Sort fonts alphabetically and remove duplicates
        sorted_fonts = sorted(set(group['fonts']))

        lines.append(f"var_lang_font['{lang_key}'] = [")
        for i, font in enumerate(sorted_fonts):
            comma = ',' if i < len(sorted_fonts) - 1 else ''
            lines.append(f'  "{font}"{comma}')
        lines.append('];')
        lines.append('')

    lines.append("console.log('var_lang_font loaded');")
    lines.append('var_lang_fontWait = true;')

    return '\n'.join(lines)


def generate_var_blocks(block_axes_groups):
    """Generate var_blocks entries (grouped by axes)"""
    axes_groups = {}

    for group in block_axes_groups.values():
        axes = group['axes']
        if axes not in axes_groups:
            axes_groups[axes] = []
        axes_groups[axes].append(group['block'])

    sorted_axes = sorted(axes_groups.keys())

    lines = ['var_blocks = {}', '']

    for axes in sorted_axes:
        blocks = sorted(set(axes_groups[axes]))
        lines.append(f"var_blocks['{axes}'] = [")
        for i, block in enumerate(blocks):
            comma = ',' if i < len(blocks) - 1 else ''
            lines.append(f'  "{block}"{comma}')
        lines.append('];')
        lines.append('')

    lines.append("console.log('var_blocks loaded');")
    lines.append('var_blocksWait = true;')

    return '\n'.join(lines)


def generate_var_blocks_list(block_axes_groups):
    """Generate var_blocks_list (simple array of blocks with variable fonts)"""
    all_blocks = sorted(set(group['block'] for group in block_axes_groups.values()))

    lines = ['var_blocks_list = [']
    for i, block in enumerate(all_blocks):
        comma = ',' if i < len(all_blocks) - 1 else ''
        lines.append(f'  "{block}"{comma}')
    lines.append('];')
    lines.append("console.log('var_blocks_list loaded');")
    lines.append('var_blocks_listWait = true;')

    return '\n'.join(lines) + '\n'


def generate_font_axis_ranges(font_axes_map):
    """Generate font_axis_ranges entries"""
    sorted_fonts = sorted(font_axes_map.keys())

    lines = ['font_axis_ranges = {}', '']

    for font_name in sorted_fonts:
        axes_data = font_axes_map[font_name]
        sorted_axes = sorted(axes_data.keys())

        lines.append(f"font_axis_ranges['{font_name}'] = {{")
        for i, tag in enumerate(sorted_axes):
            comma = ',' if i < len(sorted_axes) - 1 else ''
            range_data = axes_data[tag]
            lines.append(f"  {tag}: {{ min: {range_data['min']}, max: {range_data['max']} }}{comma}")
        lines.append('};')
        lines.append('')

    lines.append("console.log('font_axis_ranges loaded');")
    lines.append('font_axis_rangesWait = true;')

    return '\n'.join(lines)


def write_file(filepath, content):
    """Write content to file"""
    filepath.write_text(content)
    print(f'✓ Written: {filepath.name}')


def main():
    print('Fetching Google Fonts API...')
    data = fetch_google_fonts()

    print(f'Processing {len(data["items"])} fonts...')
    block_axes_groups = process_fonts(data)
    font_axes_map = collect_font_axis_ranges(data)

    print(f'\nGenerating skeleton files...')

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Generate and write each file
    write_file(OUTPUT_DIR / 'var_axis.js', generate_var_axes(block_axes_groups))
    write_file(OUTPUT_DIR / 'var_block_skeleton.js',
               generate_var_block_lang(block_axes_groups))
    write_file(OUTPUT_DIR / 'var_lang_font.js', generate_var_lang_font(block_axes_groups))
    write_file(OUTPUT_DIR / 'var_blocks.js', generate_var_blocks(block_axes_groups))
    write_file(OUTPUT_DIR / 'var_blocks_list.js', generate_var_blocks_list(block_axes_groups))
    write_file(OUTPUT_DIR / 'font_axis_ranges.js', generate_font_axis_ranges(font_axes_map))

    # Summary
    total_groups = len(block_axes_groups)
    total_blocks = len(set(group['block'] for group in block_axes_groups.values()))
    print(f'\n✓ Generated {total_groups} block-axes combinations across {total_blocks} blocks')


if __name__ == '__main__':
    main()
