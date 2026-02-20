#!/usr/bin/env python3
"""
palette_check.py
Compare actual dominant colors in a painting image against a palette entry.

Usage: python3 palette_check.py <image_path> [--topN 20] [--clusters 8]

Shows:
  - Top N most-frequent pixel colors from the image
  - K-means cluster centroids (better representative colors)
  - The palette colors to compare against (hardcoded below)
"""

import sys
import cv2
import numpy as np
from sklearn.cluster import KMeans

# ── Palette to compare against ───────────────────────────────────────────────
PALETTE_NAME = "Thiebaud — Cakes (1963)"
PALETTE_BG   = "#F8F0E8"
PALETTE_COLORS = [
    "#F0B8C8",  # frosting pink
    "#F8E8A0",  # custard yellow
    "#D0E8F8",  # pale blue frosting
    "#E8B0A0",  # peach
    "#F8D8B0",  # cream
    "#C8A0D0",  # lavender frosting
    "#F8C8C0",  # blush
    "#E0F0C8",  # mint frosting
]
# ─────────────────────────────────────────────────────────────────────────────

def hex_to_bgr(h):
    h = h.lstrip('#')
    r, g, b = int(h[0:2],16), int(h[2:4],16), int(h[4:6],16)
    return (b, g, r)

def bgr_to_hex(b, g, r):
    return f"#{int(r):02X}{int(g):02X}{int(b):02X}"

def color_block(hex_color, width=4):
    """ANSI 24-bit truecolor block for terminal display."""
    h = hex_color.lstrip('#')
    r, g, b = int(h[0:2],16), int(h[2:4],16), int(h[4:6],16)
    return f"\033[48;2;{r};{g};{b}m{' '*width}\033[0m"

def delta_e_approx(hex1, hex2):
    """Very rough perceptual distance (sRGB euclidean, not true ΔE)."""
    h1, h2 = hex1.lstrip('#'), hex2.lstrip('#')
    r1,g1,b1 = int(h1[0:2],16), int(h1[2:4],16), int(h1[4:6],16)
    r2,g2,b2 = int(h2[0:2],16), int(h2[2:4],16), int(h2[4:6],16)
    return ((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2) ** 0.5

def closest_palette_color(hex_color):
    best, best_d = None, 9999
    for p in PALETTE_COLORS + [PALETTE_BG]:
        d = delta_e_approx(hex_color, p)
        if d < best_d:
            best_d, best = d, p
    return best, best_d

def main():
    image_path = sys.argv[1] if len(sys.argv) > 1 else "cake.jpeg"
    top_n      = int(sys.argv[3]) if "--topN"    in sys.argv else 20
    n_clusters = int(sys.argv[3]) if "--clusters" in sys.argv else 8

    img = cv2.imread(image_path)
    if img is None:
        print(f"Cannot read image: {image_path}")
        sys.exit(1)

    h, w = img.shape[:2]
    print(f"\nImage: {image_path}  ({w}×{h}px, {w*h:,} pixels)")
    print(f"Palette: {PALETTE_NAME}\n")

    # ── 1. Raw pixel frequency (top N) ───────────────────────────────────────
    pixels = img.reshape(-1, 3)
    unique_colors, counts = np.unique(pixels, axis=0, return_counts=True)
    order = counts.argsort()[::-1]
    sorted_colors = unique_colors[order]
    sorted_counts = counts[order]
    total = pixels.shape[0]

    print(f"── Top {top_n} most-frequent pixel colors ──")
    print(f"  {'Hex':>8}   {'Count':>8}   {'%':>5}   {'Block'}   {'Nearest palette color'}   {'Dist'}")
    print(f"  {'-'*8}   {'-'*8}   {'-'*5}   {'-'*4}   {'-'*22}   {'-'*4}")
    for i in range(min(top_n, len(sorted_colors))):
        b, g, r = sorted_colors[i]
        hex_c   = bgr_to_hex(b, g, r)
        pct     = sorted_counts[i] / total * 100
        nearest, dist = closest_palette_color(hex_c)
        block   = color_block(hex_c)
        nblock  = color_block(nearest)
        print(f"  {hex_c:>8}   {sorted_counts[i]:>8,}   {pct:>4.1f}%   {block}   {nblock} {nearest}   {dist:>5.1f}")

    # ── 2. K-means representative colors ─────────────────────────────────────
    print(f"\n── K-means ({n_clusters} clusters) — representative colors ──")
    sample = pixels[np.random.choice(len(pixels), min(50000, len(pixels)), replace=False)]
    km = KMeans(n_clusters=n_clusters, n_init=10, random_state=42)
    km.fit(sample)

    # Sort clusters by size
    labels, label_counts = np.unique(km.labels_, return_counts=True)
    order2 = label_counts.argsort()[::-1]

    print(f"  {'Hex':>8}   {'%':>5}   {'Block'}   {'Nearest palette color'}   {'Dist'}")
    print(f"  {'-'*8}   {'-'*5}   {'-'*4}   {'-'*22}   {'-'*4}")
    for idx in order2:
        center = km.cluster_centers_[idx]
        b, g, r = center[0], center[1], center[2]
        hex_c   = bgr_to_hex(b, g, r)
        pct     = label_counts[idx] / len(sample) * 100
        nearest, dist = closest_palette_color(hex_c)
        block   = color_block(hex_c)
        nblock  = color_block(nearest)
        print(f"  {hex_c:>8}   {pct:>4.1f}%   {block}   {nblock} {nearest}   {dist:>5.1f}")

    # ── 3. Palette colors for reference ──────────────────────────────────────
    print(f"\n── Current palette entries ──")
    print(f"  bg: {color_block(PALETTE_BG)} {PALETTE_BG}")
    for c in PALETTE_COLORS:
        print(f"      {color_block(c)} {c}")

    print()

if __name__ == '__main__':
    main()
