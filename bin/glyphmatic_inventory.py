#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HOST = ROOT / 'g.us3.htm'
CONFIG = ROOT / 'js_funct' / 'insert_config.js'
INSERT_2013 = ROOT / 'insert_js_2013'
INSERT_2025 = ROOT / 'insert_js_2025'

host_text = HOST.read_text(encoding='utf-8')
config_text = CONFIG.read_text(encoding='utf-8')

insert_pattern = re.compile(r"insertArray\[(\d+)\]\s*=\s*\[(.*?)\];")
desc_pattern = re.compile(r"\n\s*(\d+):\s*\{.*?description:\s*'((?:\\'|[^'])*)'", re.S)

rows = []
for m in insert_pattern.finditer(host_text):
    idx = int(m.group(1))
    raw = m.group(2)
    parts = [p.strip() for p in raw.split(',')]
    parts = [p.strip(" []'") for p in parts if p.strip()]
    glyph_file = parts[0] if parts else ''
    title = parts[1] if len(parts) > 1 else ''
    insert_file = (INSERT_2013 / f'insert{idx}.js') if idx <= 12 else (INSERT_2025 / f'insert{idx}.js')
    rows.append({
        'index': idx,
        'glyph_file': glyph_file,
        'title': title,
        'insert_file': insert_file.relative_to(ROOT).as_posix() if insert_file.exists() else 'MISSING',
    })

descriptions = {int(i): d.replace("\\'", "'") for i, d in desc_pattern.findall(config_text)}

print('Glyphmatic insert inventory')
print('===========================')
print(f'Host file: {HOST.relative_to(ROOT)}')
print(f'Total registered inserts: {len(rows)}')
print()
for row in sorted(rows, key=lambda r: r['index']):
    desc = descriptions.get(row['index'], '')
    desc = re.sub(r'<br\\s*/?>', ' ', desc)
    desc = re.sub(r'\\s+', ' ', desc).strip()
    if len(desc) > 110:
        desc = desc[:107] + '...'
    print(f"{row['index']:>2} | {row['insert_file']:<28} | glyph={row['glyph_file']:<24} | {row['title']}")
    if desc:
        print(f"     desc: {desc}")

missing = [r for r in rows if r['insert_file'] == 'MISSING']
print()
print('Checks')
print('------')
print(f'Missing insert files: {len(missing)}')
for row in missing:
    print(f"- index {row['index']} is registered in g.us3.htm but the file is missing")

extra_2013 = sorted(p.name for p in INSERT_2013.glob('insert*.js'))
extra_2025 = sorted(p.name for p in INSERT_2025.glob('insert*.js'))
print(f'2013 insert files present: {len(extra_2013)}')
print(f'2025 insert files present: {len(extra_2025)}')
