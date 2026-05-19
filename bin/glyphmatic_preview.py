#!/usr/bin/env python3
import argparse
import os
import subprocess
import sys
from pathlib import Path
from typing import Optional
from urllib.parse import urlencode

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_HOST = '127.0.0.1'
DEFAULT_PORT = 8000


def build_url(host: str, port: int, index: Optional[int] = None, flavor: Optional[int] = None, extra_params=None):
    params = {}
    if index is not None:
        params['i'] = index
    if flavor is not None:
        params['flavor'] = flavor
    if extra_params:
        params.update(extra_params)
    query = ('?' + urlencode(params)) if params else ''
    return f'http://{host}:{port}/g.us3.htm{query}'


def serve(host: str, port: int):
    os.chdir(ROOT)
    cmd = [sys.executable, '-m', 'http.server', str(port), '--bind', host]
    print('Starting local server...')
    print(' '.join(cmd))
    print(f'Serving: {ROOT}')
    print(f'URL: http://{host}:{port}/g.us3.htm')
    subprocess.run(cmd, check=False)


def open_url(url: str):
    if sys.platform == 'darwin':
        subprocess.run(['open', url], check=False)
    else:
        print('Open is only implemented automatically for macOS. URL:')
        print(url)


def parse_args():
    p = argparse.ArgumentParser(description='Glyphmatic local preview helper')
    p.add_argument('--host', default=DEFAULT_HOST, help='host for generated URL / local server')
    p.add_argument('--port', type=int, default=DEFAULT_PORT, help='port for generated URL / local server')
    p.add_argument('--index', type=int, help='insert index for g.us3.htm?i=N')
    p.add_argument('--flavor', type=int, help='optional flavor parameter')
    p.add_argument('--param', action='append', default=[], help='extra query param as key=value; can be repeated')
    p.add_argument('--open', action='store_true', dest='open_browser', help='open the generated URL in the browser')
    p.add_argument('--serve', action='store_true', help='start a local static server rooted at the repo')
    return p.parse_args()


def parse_extra_params(items):
    out = {}
    for item in items:
        if '=' not in item:
            raise SystemExit(f'Invalid --param value: {item!r}. Expected key=value')
        k, v = item.split('=', 1)
        out[k] = v
    return out


def main() -> int:
    args = parse_args()
    extra = parse_extra_params(args.param)
    url = build_url(args.host, args.port, args.index, args.flavor, extra)

    print('Glyphmatic preview helper')
    print('=========================')
    print(f'Repo root: {ROOT}')
    print(f'Base URL: http://{args.host}:{args.port}/g.us3.htm')
    print(f'Preview URL: {url}')

    if args.index is not None and args.flavor is None:
        print(f'Insert-only URL: http://{args.host}:{args.port}/g.us3.htm?i={args.index}')
    if args.index is not None and args.flavor is not None:
        print(f'Flavor URL: http://{args.host}:{args.port}/g.us3.htm?i={args.index}&flavor={args.flavor}')

    if args.open_browser:
        open_url(url)

    if args.serve:
        serve(args.host, args.port)

    return 0


if __name__ == '__main__':
    raise SystemExit(main())
