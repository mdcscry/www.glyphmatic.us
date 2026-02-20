#!/usr/bin/env python3
"""
Batch resize/compress painting images using macOS `sips`.

Examples:
  python3 tools/resize_paintings.py
  python3 tools/resize_paintings.py --src tools/paintings_backup --dst tools/paintings
  python3 tools/resize_paintings.py --max-dim 1600 --jpeg-quality 88 --dry-run
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path


SUPPORTED_EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, capture_output=True, text=True)


def has_sips() -> bool:
    return shutil.which("sips") is not None


def iter_images(src: Path) -> list[Path]:
    return sorted(
        p for p in src.iterdir()
        if p.is_file() and p.suffix.lower() in SUPPORTED_EXTS
    )


def target_suffix(src_suffix: str, png_to_jpeg: bool) -> str:
    s = src_suffix.lower()
    if s in {".jpg", ".jpeg", ".webp"}:
        return ".jpg"
    if s == ".png" and png_to_jpeg:
        return ".jpg"
    return ".png"


def process_one(
    src_path: Path,
    dst_path: Path,
    max_dim: int,
    jpeg_quality: int,
    overwrite: bool,
    dry_run: bool,
) -> tuple[bool, str]:
    if dst_path.exists() and not overwrite:
        return False, f"skip (exists): {dst_path.name}"

    if dry_run:
        return True, f"dry-run: {src_path.name} -> {dst_path.name}"

    tmp = dst_path.with_suffix(dst_path.suffix + ".tmp")
    if tmp.exists():
        tmp.unlink()

    shutil.copy2(src_path, tmp)

    r1 = run(["sips", "-Z", str(max_dim), str(tmp)])
    if r1.returncode != 0:
        tmp.unlink(missing_ok=True)
        return False, f"resize fail: {src_path.name}"

    if dst_path.suffix.lower() == ".jpg":
        r2 = run(
            [
                "sips",
                "-s",
                "format",
                "jpeg",
                "-s",
                "formatOptions",
                str(jpeg_quality),
                str(tmp),
                "--out",
                str(dst_path),
            ]
        )
    else:
        r2 = run(["sips", "-s", "format", "png", str(tmp), "--out", str(dst_path)])

    tmp.unlink(missing_ok=True)
    if r2.returncode != 0:
        return False, f"write fail: {src_path.name}"

    return True, f"ok: {src_path.name} -> {dst_path.name}"


def fmt_mb(n: int) -> str:
    return f"{n / (1024 * 1024):.2f} MB"


def main() -> int:
    parser = argparse.ArgumentParser(description="Resize/compress paintings with sips.")
    parser.add_argument("--src", default="tools/paintings", help="Source directory")
    parser.add_argument(
        "--dst", default="tools/paintings_compressed", help="Output directory"
    )
    parser.add_argument("--max-dim", type=int, default=1800, help="Max edge in pixels")
    parser.add_argument(
        "--jpeg-quality", type=int, default=85, help="JPEG quality 1-100 (default 85)"
    )
    parser.add_argument(
        "--png-to-jpeg",
        action="store_true",
        help="Convert PNG files to JPEG output",
    )
    parser.add_argument("--overwrite", action="store_true", help="Overwrite outputs")
    parser.add_argument("--dry-run", action="store_true", help="Plan only, no writes")
    args = parser.parse_args()

    if not has_sips():
        print("Error: `sips` not found (this script requires macOS).")
        return 1
    if args.max_dim < 200:
        print("Error: --max-dim too small.")
        return 1
    if not (1 <= args.jpeg_quality <= 100):
        print("Error: --jpeg-quality must be 1..100.")
        return 1

    src = Path(args.src)
    dst = Path(args.dst)
    if not src.exists() or not src.is_dir():
        print(f"Error: source directory not found: {src}")
        return 1

    if not args.dry_run:
        dst.mkdir(parents=True, exist_ok=True)

    images = iter_images(src)
    if not images:
        print(f"No images found in {src}")
        return 0

    total_in = 0
    total_out = 0
    ok_count = 0
    skip_count = 0

    for img in images:
        in_size = img.stat().st_size
        total_in += in_size
        out_name = img.stem + target_suffix(img.suffix, args.png_to_jpeg)
        out_path = dst / out_name
        ok, msg = process_one(
            src_path=img,
            dst_path=out_path,
            max_dim=args.max_dim,
            jpeg_quality=args.jpeg_quality,
            overwrite=args.overwrite,
            dry_run=args.dry_run,
        )
        print(msg)

        if ok:
            ok_count += 1
            if not args.dry_run and out_path.exists():
                total_out += out_path.stat().st_size
        else:
            skip_count += 1

    print("\nSummary")
    print(f"Source:      {src}")
    print(f"Destination: {dst}")
    print(f"Processed:   {ok_count}")
    print(f"Skipped:     {skip_count}")
    if args.dry_run:
        print(f"Input size:  {fmt_mb(total_in)}")
    else:
        saved = total_in - total_out
        ratio = (saved / total_in * 100) if total_in else 0
        print(f"Input size:  {fmt_mb(total_in)}")
        print(f"Output size: {fmt_mb(total_out)}")
        print(f"Saved:       {fmt_mb(saved)} ({ratio:.1f}%)")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
