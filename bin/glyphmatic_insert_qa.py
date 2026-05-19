#!/usr/bin/env python3
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HOST = ROOT / 'g.us3.htm'
CONFIG = ROOT / 'js_funct' / 'insert_config.js'
INSERT_2013 = ROOT / 'insert_js_2013'
INSERT_2025 = ROOT / 'insert_js_2025'

insert_re = re.compile(r"insertArray\[(\d+)\]\s*=\s*\[(.*?)\];")
config_entry_re = re.compile(r"\n\s*(\d+)\s*:\s*\{")
description_re = re.compile(r"\n\s*(\d+)\s*:\s*\{.*?description\s*:\s*'((?:\\'|[^'])*)'", re.S)


def load_text(path: Path) -> str:
    return path.read_text(encoding='utf-8')


def parse_host_entries(text: str):
    rows = {}
    for m in insert_re.finditer(text):
        idx = int(m.group(1))
        raw = m.group(2)
        parts = [p.strip() for p in raw.split(',')]
        parts = [p.strip(" []'") for p in parts if p.strip()]
        rows[idx] = {
            'glyph_file': parts[0] if len(parts) > 0 else '',
            'title': parts[1] if len(parts) > 1 else '',
            'raw_parts': parts,
        }
    return rows


def parse_config_entries(text: str):
    entries = {int(x) for x in config_entry_re.findall(text)}
    descriptions = {int(i): d.replace("\\'", "'") for i, d in description_re.findall(text)}
    return entries, descriptions


def expected_insert_path(idx: int) -> Path:
    base = INSERT_2013 if idx <= 12 else INSERT_2025
    return base / f'insert{idx}.js'


def actual_insert_indices():
    found = {}
    for p in list(INSERT_2013.glob('insert*.js')) + list(INSERT_2025.glob('insert*.js')):
        m = re.fullmatch(r'insert(\d+)\.js', p.name)
        if not m:
            continue
        found[int(m.group(1))] = p
    return found


def add_issue(issues, severity, message):
    issues.append((severity, message))


def main() -> int:
    issues = []

    for required in [HOST, CONFIG, INSERT_2013, INSERT_2025]:
        if not required.exists():
            add_issue(issues, 'FAIL', f'missing required path: {required.relative_to(ROOT)}')
    if any(sev == 'FAIL' and msg.startswith('missing required path') for sev, msg in issues):
        return finish(issues)

    host_entries = parse_host_entries(load_text(HOST))
    config_entries, descriptions = parse_config_entries(load_text(CONFIG))
    actual = actual_insert_indices()

    if not host_entries:
        add_issue(issues, 'FAIL', 'no insertArray entries parsed from g.us3.htm')

    for idx, meta in sorted(host_entries.items()):
        path = expected_insert_path(idx)
        if not path.exists():
            add_issue(issues, 'FAIL', f'host index {idx} is registered but file is missing: {path.relative_to(ROOT)}')

        if idx not in config_entries:
            add_issue(issues, 'WARN', f'host index {idx} has no explicit config entry in js_funct/insert_config.js')

        title = meta['title'].strip()
        if not title:
            add_issue(issues, 'WARN', f'host index {idx} has an empty title label in g.us3.htm')

        desc = descriptions.get(idx, '').strip()
        if not desc:
            add_issue(issues, 'WARN', f'host index {idx} has no description text in js_funct/insert_config.js')

        if idx <= 12 and not str(path).startswith(str(INSERT_2013)):
            add_issue(issues, 'FAIL', f'index {idx} should live in insert_js_2013/')
        if idx >= 13 and not str(path).startswith(str(INSERT_2025)):
            add_issue(issues, 'FAIL', f'index {idx} should live in insert_js_2025/')

    for idx, path in sorted(actual.items()):
        if idx not in host_entries:
            add_issue(issues, 'WARN', f'insert file exists but is not registered in g.us3.htm: {path.relative_to(ROOT)}')
        if idx <= 12 and path.parent != INSERT_2013:
            add_issue(issues, 'FAIL', f'legacy index {idx} is stored in the wrong directory: {path.relative_to(ROOT)}')
        if idx >= 13 and path.parent != INSERT_2025:
            add_issue(issues, 'FAIL', f'modern index {idx} is stored in the wrong directory: {path.relative_to(ROOT)}')

    host_only = sorted(set(host_entries) - set(actual))
    file_only = sorted(set(actual) - set(host_entries))

    print('Glyphmatic insert QA')
    print('====================')
    print(f'Repo root: {ROOT}')
    print(f'Host entries: {len(host_entries)}')
    print(f'Insert files: {len(actual)}')
    print(f'Config entries: {len(config_entries)}')
    print()

    if host_only:
        print('Host entries missing files:')
        for idx in host_only:
            print(f'  - {idx}')
        print()

    if file_only:
        print('Unregistered insert files:')
        for idx in file_only:
            print(f'  - {idx}: {actual[idx].relative_to(ROOT)}')
        print()

    return finish(issues)


def finish(issues):
    fail_count = sum(1 for sev, _ in issues if sev == 'FAIL')
    warn_count = sum(1 for sev, _ in issues if sev == 'WARN')
    pass_count = sum(1 for sev, _ in issues if sev == 'PASS')

    if issues:
        print('Issues')
        print('------')
        for sev, msg in issues:
            print(f'[{sev}] {msg}')
    else:
        print('No issues found.')

    print()
    print('Summary')
    print('-------')
    print(f'FAIL: {fail_count}')
    print(f'WARN: {warn_count}')
    print(f'PASS: {pass_count}')

    if fail_count == 0:
        print('\nQA completed with no failures.')
        return 0
    print('\nQA found failures.')
    return 1


if __name__ == '__main__':
    sys.exit(main())
