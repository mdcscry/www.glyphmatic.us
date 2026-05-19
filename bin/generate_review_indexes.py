#!/usr/bin/env python3
from __future__ import annotations

import html
import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = ROOT / "review_indexes"
DATA_DIR = OUTPUT_DIR / "data"
DATA_FAMILY_DIR = DATA_DIR / "families"
FAMILY_DIR = OUTPUT_DIR / "families"
SCREENSHOT_DIR = OUTPUT_DIR / "screenshots"
ASSET_DIR = OUTPUT_DIR / "assets"

EXCLUDED_FILENAMES = {
    "index.html",
    "math_index.html",
}

EXCLUDED_PREFIXES = [
    "review_indexes/",
]

SOURCE_PRIORITY = {
    "2026_exp/vis": 0,
    "2025_exp/html_experiments": 1,
    "2025_exp": 2,
    "2026_exp": 3,
}

TRANSITIONED_EXPERIMENTS = {
    "2025_exp/fibonacci_v1.html": {"insert": 31, "label": "Fibonacci Spirals"},
    "2025_exp/fibonacci_v2.html": {"insert": 31, "label": "Fibonacci Spirals"},
    "2025_exp/html_experiments/fibonacci_study_0.html": {"insert": 31, "label": "Fibonacci Spirals"},
    "2025_exp/html_experiments/fibonacci_study_1.html": {"insert": 31, "label": "Fibonacci Spirals"},
    "2025_exp/html_experiments/fibonacci_study_2.html": {"insert": 31, "label": "Fibonacci Spirals"},
    "2025_exp/html_experiments/rectangle_tiling.html": {"insert": 25, "label": "Rectangle Tiling"},
    "2025_exp/html_experiments/rectangle_tiling_lines.html": {"insert": 25, "label": "Rectangle Tiling"},
    "2026_exp/vis/v23_contours_grid.html": {"insert": 37, "label": "Field / Contour / Noise"},
    "2026_exp/vis/v25_optimization_landscapes.html": {"insert": 37, "label": "Field / Contour / Noise"},
    "2026_exp/vis/v33_function_contours.html": {"insert": 37, "label": "Field / Contour / Noise"},
    "2026_exp/vis/v34_perlin_noise.html": {"insert": 37, "label": "Field / Contour / Noise"},
    "2026_exp/vis/v35_perlin_glyphs.html": {"insert": 37, "label": "Field / Contour / Noise"},
    "2026_exp/vis/v36_sincos_contour.html": {"insert": 37, "label": "Field / Contour / Noise"},
    "2026_exp/vis/v37_contour_blocks.html": {"insert": 37, "label": "Field / Contour / Noise"},
    "2026_exp/vis/v38_perlin_square.html": {"insert": 37, "label": "Field / Contour / Noise"},
    "2026_exp/vis/v39_perlin_square_circles.html": {"insert": 37, "label": "Field / Contour / Noise"},
}

FAMILY_CONFIG = {
    "stream-time-density": {
        "title": "Stream / Time / Density",
        "summary": "Streaming charts, ridgelines, time curves, bump charts, and moving distribution forms.",
        "future_insert": "Stream / Time / Density",
        "upgrade": "Randomize palette systems more aggressively; unify regeneration / timing controls; consider insert-family flavor mapping.",
    },
    "graphs-flows-networks": {
        "title": "Graphs / Flows / Networks",
        "summary": "Sankey, chord, BioFabric, edge bundling, network logic, and route-like graph structures.",
        "future_insert": "Graphs / Flows / Networks",
        "upgrade": "Add family-level palette bridge and shared HUD; consider glyph-capable variants for node/edge labeling.",
    },
    "hierarchy-enclosure": {
        "title": "Hierarchy / Enclosure",
        "summary": "Circlepack, treemap, glowing hierarchy, enclosure layouts, and nested spatial grouping.",
        "future_insert": "Hierarchy / Circlepack",
        "upgrade": "Good insert-family candidate; unify circlepack/treemap flavors and palette/glow controls.",
    },
    "fields-contours-noise": {
        "title": "Fields / Contours / Noise",
        "summary": "Contour grids, optimization landscapes, Perlin systems, function fields, and terrain-like surfaces.",
        "future_insert": "Field / Contour / Noise",
        "upgrade": "Already adjacent to insert37 logic; extend family review with palette-mode and glyph-overlay notes.",
    },
    "triangulation-voronoi-mesh": {
        "title": "Triangulation / Voronoi / Mesh",
        "summary": "Voronoi, Delaunay, triangle studies, triplots, and meshed geometric subdivision.",
        "future_insert": "Triangulation / Voronoi",
        "upgrade": "Strong future insert family; define flavor 0-9 map and consider glyph and artist-palette variants.",
    },
    "tilings-patterns-grids": {
        "title": "Tilings / Patterns / Grids",
        "summary": "Truchet, brick, rectangle, square, Islamic, hex, herringbone, and repeating geometry systems.",
        "future_insert": "Tilings / Patterns",
        "upgrade": "Very likely to benefit from shared randomization, palette systems, and optional glyph-block overlays.",
    },
    "fibonacci-spiral-growth": {
        "title": "Fibonacci / Spiral / Growth",
        "summary": "Fibonacci studies, spirals, growth forms, and recursive geometric expansion.",
        "future_insert": "Fibonacci / Spiral",
        "upgrade": "Good candidate for grouped flavors with stronger palette and glyph-function integration.",
    },
    "population-distribution-statistics": {
        "title": "Population / Distribution / Statistics",
        "summary": "Beeswarms, Likert, population pyramids, marimekko, Hinton, barcodes, and data-distribution forms.",
        "future_insert": "Population / Distribution",
        "upgrade": "Potential stats-family insert; unify animation and palette behavior across flavors.",
    },
    "vega-and-declarative": {
        "title": "Vega / Declarative",
        "summary": "Vega or declarative-spec experiments and related grid/random/windvector explorations.",
        "future_insert": "Vega-Lite Family",
        "upgrade": "Dedicated review family; good staging ground for a future insert with spec-swappable flavors.",
    },
    "glyph-grids-systems": {
        "title": "Glyph Grids / Systems",
        "summary": "Glyph mosaics, proof grids, number/glyph systems, and text/glyph-centric visualization surfaces.",
        "future_insert": "Glyph Systems",
        "upgrade": "Prime place for glyph-block expansion, AutoFont trials, and palette/glyph system formalization.",
    },
    "painterly-hatch-texture": {
        "title": "Painterly / Hatch / Texture",
        "summary": "Watercolor, hatch, accent, Molnar-like, painterly, and textural visual systems.",
        "future_insert": "Painterly / Texture",
        "upgrade": "Promote stronger artist-palette and hybrid palette behavior; evaluate whether texture forms want their own insert family.",
    },
    "fractals-attractors-recursion": {
        "title": "Fractals / Attractors / Recursion",
        "summary": "Dragon curves, square limits, strange attractors, recursive systems, and dynamical drawings.",
        "future_insert": "Recursive / Dynamical",
        "upgrade": "Strong math-family candidate; likely deserves grouped flavor navigation before insert formalization.",
    },
    "thematic-and-one-offs": {
        "title": "Thematic / One-offs",
        "summary": "Holiday, summoning, oracle, typewriter, clouds, transitions, and other bespoke or thematic works.",
        "future_insert": "Thematic One-offs",
        "upgrade": "Mostly a curation bucket; decide later which pieces stay standalone and which deserve family promotion.",
    },
}


@dataclass
class Entry:
    id: str
    title: str
    path: str
    source_area: str
    year_bucket: str
    family: str
    family_title: str
    subfamily: str
    sequence_hint: int | None
    tags: list[str]
    libraries: list[str]
    uses_autofont: bool
    uses_artist_palette: bool
    uses_colorpalette: bool
    uses_glyph_data: bool
    screenshot_path: str
    screenshot_exists: bool
    status: str
    future_insert_candidate: str
    notes: str
    upgrade_notes: str
    summary: str


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "item"


def load_html_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""


def extract_title(text: str, fallback: str) -> str:
    match = re.search(r"<title>(.*?)</title>", text, flags=re.IGNORECASE | re.DOTALL)
    if match:
        title = re.sub(r"\s+", " ", match.group(1)).strip()
        if title:
            return title
    return fallback.replace("_", " ").replace("-", " ").title()


def classify_source(rel_path: str) -> str:
    if rel_path.startswith("2026_exp/vis/"):
        return "2026_exp/vis"
    if rel_path.startswith("2025_exp/html_experiments/"):
        return "2025_exp/html_experiments"
    if rel_path.startswith("2025_exp/"):
        return "2025_exp"
    return "2026_exp"


def infer_year_bucket(rel_path: str) -> str:
    if rel_path.startswith("2025_exp/"):
        return "2025"
    if rel_path.startswith("2026_exp/"):
        return "2026"
    return "unknown"


def infer_libraries(text: str, path: str) -> list[str]:
    lower = text.lower()
    libraries = []
    checks = [
        ("d3", "d3" in lower),
        ("plotly", "plotly" in lower),
        ("vega", "vega" in lower),
        ("semiotic", "semiotic" in lower),
        ("react", "react" in lower),
        ("canvas", "getcontext(" in lower or "<canvas" in lower),
        ("svg", "<svg" in lower or ".append('svg'" in lower or '.append("svg"' in lower),
        ("css", "@keyframes" in lower or "display:grid" in lower or "display: grid" in lower),
    ]
    for name, present in checks:
        if present:
            libraries.append(name)
    if not libraries:
        libraries.append("dom")
    if "jsx" in path:
        libraries.append("jsx")
    return sorted(dict.fromkeys(libraries))


def infer_feature_flags(text: str, title: str, path: str) -> tuple[bool, bool, bool, bool]:
    lower = text.lower()
    t = f"{title} {path}".lower()
    uses_autofont = "autofont" in lower or "autofont" in t
    uses_artist_palette = "artist_palette" in lower or "artist_palettes" in lower
    uses_colorpalette = "colorpalette" in lower or "vis_palette_adapter" in lower
    glyph_markers = [
        "js_glyph/",
        "whirldsymbols",
        "block_hex",
        "country_glyphs",
        "emoji_versions",
        "glyph_",
        "glyph",
    ]
    uses_glyph_data = any(marker in lower for marker in glyph_markers) or any(token in t for token in ["glyph", "emoji", "numbers", "proof_grid"])
    return uses_autofont, uses_artist_palette, uses_colorpalette, uses_glyph_data


def infer_sequence_hint(path: str) -> int | None:
    name = Path(path).stem
    for pattern in [r"^v(\d+)", r"_(\d+)$", r"(\d+)"]:
        match = re.search(pattern, name)
        if match:
            try:
                return int(match.group(1))
            except ValueError:
                return None
    return None


def infer_family(path: str, title: str, text: str) -> str:
    haystack = f"{path} {title}".lower()
    ordered_rules = [
        ("vega-and-declarative", ["vega", "windvector"]),
        ("glyph-grids-systems", ["glyph_grid", "glyph_mosaic", "proof_grid", "typewriter", "numbers", "emoji", "glyph"]),
        ("fractals-attractors-recursion", ["strange_attractor", "dragon", "square_limit", "fractal", "attractor"]),
        ("hierarchy-enclosure", ["circlepack", "treemap", "glowing orbs", "glowing_orbs", "enclosure"]),
        ("graphs-flows-networks", ["sankey", "chord", "biofabric", "edge_bundling", "substructure", "network", "vector_grid"]),
        ("stream-time-density", ["stream", "bump", "denseline", "time_curve", "ridgeline", "comet", "lasagna", "top10"]),
        ("population-distribution-statistics", ["beeswarm", "likert", "population", "marimekko", "barcode", "hinton", "radar"]),
        ("fields-contours-noise", ["contour", "perlin", "noise", "optimization", "function", "field", "sincos", "custom_projection"]),
        ("triangulation-voronoi-mesh", ["voronoi", "delaunay", "delauney", "triang", "triplot", "mesh", "penrose"]),
        ("fibonacci-spiral-growth", ["fibonacci", "spiral", "growth", "primes"]),
        ("painterly-hatch-texture", ["watercolor", "hatch", "molnar", "kandinsky", "texture", "accent"]),
        ("tilings-patterns-grids", ["tiling", "truchet", "brick", "hexagonal", "herringbone", "islamic", "pentagon", "rectangle", "square", "triangle", "gimenez", "grid"]),
        ("thematic-and-one-offs", ["xmas", "summoning", "oracle", "hanabi", "skellies", "cloud", "transition", "tester"]),
    ]
    for family, needles in ordered_rules:
        if any(needle in haystack for needle in needles):
            return family
    return "thematic-and-one-offs"


def infer_subfamily(path: str, family: str) -> str:
    name = Path(path).stem.lower()
    direct_map = {
        "stream-time-density": ["stream", "time", "ridge", "denseline", "bump"],
        "graphs-flows-networks": ["sankey", "chord", "biofabric", "bundling", "network"],
        "hierarchy-enclosure": ["circlepack", "treemap", "orbs"],
        "fields-contours-noise": ["contour", "perlin", "noise", "optimization", "function"],
        "triangulation-voronoi-mesh": ["voronoi", "delaunay", "triangle", "triplot"],
        "tilings-patterns-grids": ["truchet", "brick", "rectangle", "square", "hex", "islamic", "herringbone", "penrose", "gimenez"],
        "fibonacci-spiral-growth": ["fibonacci", "spiral"],
        "population-distribution-statistics": ["beeswarm", "likert", "population", "marimekko", "barcode", "hinton", "radar"],
        "vega-and-declarative": ["vega", "windvector"],
        "glyph-grids-systems": ["glyph", "proof", "typewriter", "numbers", "emoji"],
        "painterly-hatch-texture": ["watercolor", "hatch", "molnar", "kandinsky"],
        "fractals-attractors-recursion": ["dragon", "attractor", "square"],
        "thematic-and-one-offs": ["oracle", "summoning", "xmas", "hanabi", "cloud", "tester"],
    }
    for key in direct_map.get(family, []):
        if key in name:
            return key
    parts = re.split(r"[-_]", name)
    filtered = [p for p in parts if p and not p.isdigit() and p not in {"html", "v"}]
    return filtered[0] if filtered else "misc"


def infer_status(path: str, title: str) -> str:
    lower = f"{path} {title}".lower()
    if any(token in lower for token in ["test", "tester", "study", "standard", "steps"]):
        return "prototype"
    if "proof_grid" in lower:
        return "candidate"
    if "grid" in lower and "proof" not in lower and "glyph_grid" not in lower and "vis/index" not in lower:
        return "candidate"
    return "candidate"


def infer_tags(path: str, title: str, libraries: list[str], family: str, flags: tuple[bool, bool, bool, bool]) -> list[str]:
    uses_autofont, uses_artist_palette, uses_colorpalette, uses_glyph_data = flags
    tokens = set(re.findall(r"[a-z0-9]+", f"{Path(path).stem} {title}".lower()))
    tags = []
    interesting = [
        "stream", "time", "density", "graph", "network", "sankey", "chord", "biofabric", "bundling",
        "circlepack", "treemap", "contour", "perlin", "noise", "function", "optimization", "voronoi",
        "delaunay", "triangle", "truchet", "brick", "rectangle", "square", "hexagonal", "islamic",
        "herringbone", "pentagon", "penrose", "fibonacci", "spiral", "beeswarm", "likert", "population",
        "barcode", "hinton", "vega", "glyph", "proof", "watercolor", "hatch", "molnar", "oracle",
        "xmas", "summoning", "hanabi", "typewriter", "emoji", "numbers",
    ]
    for token in interesting:
        if token in tokens:
            tags.append(token)
    tags.extend(libraries)
    tags.append(family)
    if uses_autofont:
        tags.append("autofont")
    if uses_artist_palette:
        tags.append("artist-palette")
    if uses_colorpalette:
        tags.append("colorpalette")
    if uses_glyph_data:
        tags.append("glyph-data")
    return sorted(dict.fromkeys(tags))


def infer_notes(path: str, source_area: str, libraries: list[str], flags: tuple[bool, bool, bool, bool]) -> str:
    uses_autofont, uses_artist_palette, uses_colorpalette, uses_glyph_data = flags
    notes = [source_area]
    notes.append("libraries: " + ", ".join(libraries))
    deps = []
    if uses_autofont:
        deps.append("AutoFont")
    if uses_artist_palette:
        deps.append("artist palettes")
    if uses_colorpalette:
        deps.append("ColorPalette/vis palette adapter")
    if uses_glyph_data:
        deps.append("glyph data")
    if deps:
        notes.append("signals: " + ", ".join(deps))
    return " · ".join(notes)


def infer_summary(title: str, family_title: str, source_area: str, tags: list[str]) -> str:
    tag_sample = ", ".join(tags[:4]) if tags else family_title.lower()
    return f"{title} — {source_area}; grouped under {family_title}. Signals: {tag_sample}."


def should_include(rel_path: str) -> bool:
    if any(rel_path.startswith(prefix) for prefix in EXCLUDED_PREFIXES):
        return False
    name = Path(rel_path).name.lower()
    if name in EXCLUDED_FILENAMES:
        return False
    return rel_path.endswith(".html")


def get_transition_info(rel_path: str) -> dict | None:
    return TRANSITIONED_EXPERIMENTS.get(rel_path)


def source_inventory_counts() -> dict[str, int]:
    counts = {}
    explicit_dirs = [
        ("2025_exp", False),
        ("2025_exp/html_experiments", True),
        ("2026_exp", False),
        ("2026_exp/vis", True),
    ]
    for rel, recursive in explicit_dirs:
        base = ROOT / rel
        if not base.exists():
            counts[rel] = 0
            continue
        walker = base.rglob("*.html") if recursive else base.glob("*.html")
        counts[rel] = sum(1 for path in walker if should_include(path.relative_to(ROOT).as_posix()))
    return counts


def iter_html_files() -> Iterable[Path]:
    explicit_dirs = [
        (ROOT / "2025_exp", False),
        (ROOT / "2025_exp/html_experiments", True),
        (ROOT / "2026_exp", False),
        (ROOT / "2026_exp/vis", True),
    ]
    seen = set()
    for base, recursive in explicit_dirs:
        if not base.exists():
            continue
        walker = base.rglob("*.html") if recursive else base.glob("*.html")
        for path in sorted(walker):
            rel = path.relative_to(ROOT).as_posix()
            if rel in seen:
                continue
            if should_include(rel):
                seen.add(rel)
                yield path


def make_entry(path: Path) -> Entry:
    rel_path = path.relative_to(ROOT).as_posix()
    text = load_html_text(path)
    title = extract_title(text, path.stem)
    source_area = classify_source(rel_path)
    year_bucket = infer_year_bucket(rel_path)
    family = infer_family(rel_path, title, text)
    family_title = FAMILY_CONFIG[family]["title"]
    subfamily = infer_subfamily(rel_path, family)
    sequence_hint = infer_sequence_hint(rel_path)
    libraries = infer_libraries(text, rel_path)
    flags = infer_feature_flags(text, title, rel_path)
    tags = infer_tags(rel_path, title, libraries, family, flags)
    screenshot_name = slugify(rel_path.replace("/", "--").replace(".html", "")) + ".png"
    screenshot_path = f"screenshots/{screenshot_name}"
    screenshot_exists = (OUTPUT_DIR / screenshot_path).exists()
    status = infer_status(rel_path, title)
    future_insert_candidate = FAMILY_CONFIG[family]["future_insert"]
    notes = infer_notes(rel_path, source_area, libraries, flags)
    upgrade_notes = FAMILY_CONFIG[family]["upgrade"]
    summary = infer_summary(title, family_title, source_area, tags)
    return Entry(
        id=slugify(rel_path),
        title=title,
        path=rel_path,
        source_area=source_area,
        year_bucket=year_bucket,
        family=family,
        family_title=family_title,
        subfamily=subfamily,
        sequence_hint=sequence_hint,
        tags=tags,
        libraries=libraries,
        uses_autofont=flags[0],
        uses_artist_palette=flags[1],
        uses_colorpalette=flags[2],
        uses_glyph_data=flags[3],
        screenshot_path=screenshot_path,
        screenshot_exists=screenshot_exists,
        status=status,
        future_insert_candidate=future_insert_candidate,
        notes=notes,
        upgrade_notes=upgrade_notes,
        summary=summary,
    )


def sort_entries(entries: list[Entry]) -> list[Entry]:
    return sorted(
        entries,
        key=lambda e: (
            SOURCE_PRIORITY.get(e.source_area, 99),
            e.sequence_hint is None,
            e.sequence_hint if e.sequence_hint is not None else 9999,
            e.subfamily,
            e.title.lower(),
        ),
    )


def ensure_dirs() -> None:
    for path in [OUTPUT_DIR, DATA_DIR, DATA_FAMILY_DIR, FAMILY_DIR, SCREENSHOT_DIR, ASSET_DIR]:
        path.mkdir(parents=True, exist_ok=True)


def write_json(path: Path, data) -> None:
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def image_html(rel_from_page: str, entry: Entry) -> str:
    if entry.screenshot_exists:
        return f'<img src="{html.escape(rel_from_page + entry.screenshot_path)}" alt="{html.escape(entry.title)} screenshot" loading="lazy">'
    initials = html.escape(entry.family_title[:2].upper())
    return f'<div class="thumb-placeholder"><span>{initials}</span></div>'


def page_shell(title: str, body: str, extra_head: str = "") -> str:
    return f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
  <title>{html.escape(title)}</title>
  <link rel=\"stylesheet\" href=\"assets/review_indexes.css\">
  {extra_head}
</head>
<body>
{body}
</body>
</html>
"""


def family_page_shell(title: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
  <title>{html.escape(title)}</title>
  <link rel=\"stylesheet\" href=\"../assets/review_indexes.css\">
</head>
<body>
{body}
</body>
</html>
"""


def write_assets() -> None:
    css = """
:root {
  --bg: #080a0f;
  --surface: #10131b;
  --surface-2: #171b24;
  --surface-3: #1f2530;
  --border: rgba(255,255,255,0.08);
  --text: rgba(255,255,255,0.92);
  --muted: rgba(255,255,255,0.52);
  --accent: #67e8f9;
  --accent-2: #f472b6;
  --accent-3: #fde047;
  --good: #86efac;
  --warn: #f9a8d4;
  --shadow: 0 12px 40px rgba(0,0,0,0.28);
}
* { box-sizing: border-box; }
html, body {
  margin: 0;
  padding: 0;
  background: radial-gradient(circle at top, #111827 0%, var(--bg) 55%);
  color: var(--text);
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
a { color: inherit; }
body {
  min-height: 100vh;
}
.wrap {
  width: min(1480px, calc(100vw - 40px));
  margin: 0 auto;
}
header.hero {
  padding: 44px 0 24px;
}
.hero-top {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-start;
}
.hero h1 {
  margin: 0;
  font-size: clamp(28px, 5vw, 54px);
  line-height: 1.04;
  letter-spacing: -0.03em;
}
.hero p {
  color: var(--muted);
  line-height: 1.6;
  max-width: 860px;
}
.hero .mini-nav {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
}
.pill, .button-link {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.03);
  color: var(--text);
  text-decoration: none;
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 12px;
}
.stats-grid, .family-grid, .card-grid {
  display: grid;
  gap: 18px;
}
.stats-grid {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin: 22px 0 34px;
}
.stat-box, .family-card, .entry-card, .note-box {
  background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025));
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
}
.stat-box {
  padding: 16px 18px;
}
.stat-kicker {
  color: var(--muted);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}
.stat-value {
  margin-top: 10px;
  font-size: 32px;
  font-weight: 700;
}
.section-head {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: end;
  margin: 36px 0 18px;
}
.section-head h2 {
  margin: 0;
  font-size: clamp(20px, 3vw, 34px);
}
.section-head p {
  margin: 0;
  color: var(--muted);
}
.family-grid {
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}
.family-card {
  padding: 20px;
}
.family-card h3 {
  margin: 0;
  font-size: 22px;
}
.family-card p {
  color: var(--muted);
  line-height: 1.55;
}
.card-kicker {
  color: var(--accent);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  margin-bottom: 10px;
}
.family-meta, .entry-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: 1px solid var(--border);
  padding: 6px 10px;
  font-size: 11px;
  color: var(--muted);
  background: rgba(255,255,255,0.035);
}
.chip.good { color: var(--good); }
.chip.warn { color: var(--warn); }
.preview-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 16px 0;
}
.preview-strip img, .thumb img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: #05070c;
}
.preview-placeholder, .thumb-placeholder {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 14px;
  border: 1px dashed var(--border);
  display: grid;
  place-items: center;
  background: rgba(255,255,255,0.02);
  color: var(--muted);
  font-weight: 700;
  letter-spacing: 0.18em;
}
.family-links, .entry-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}
.button-link {
  border-radius: 12px;
}
.toolbar {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(18px);
  background: rgba(8,10,15,0.76);
  border-top: 1px solid rgba(255,255,255,0.04);
  border-bottom: 1px solid var(--border);
}
.toolbar-inner {
  display: grid;
  gap: 12px;
  grid-template-columns: 1.4fr repeat(4, minmax(120px, 1fr));
  padding: 14px 0;
}
.toolbar input, .toolbar select {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.05);
  color: var(--text);
  padding: 12px 14px;
  font-size: 14px;
}
.card-grid {
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  padding: 26px 0 60px;
}
.entry-card {
  overflow: hidden;
}
.thumb {
  padding: 14px 14px 0;
}
.entry-body {
  padding: 18px 18px 20px;
}
.entry-body h3 {
  margin: 0 0 8px;
  font-size: 22px;
  line-height: 1.15;
}
.pathline {
  color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  line-height: 1.5;
  word-break: break-all;
}
.entry-body p {
  color: var(--muted);
  line-height: 1.58;
}
.note-box {
  padding: 18px;
  margin: 16px 0 18px;
}
footer {
  padding: 32px 0 60px;
  color: var(--muted);
  font-size: 13px;
}
@media (max-width: 980px) {
  .toolbar-inner {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 720px) {
  .wrap {
    width: min(100vw - 20px, 1480px);
  }
  header.hero { padding-top: 28px; }
  .hero-top, .section-head {
    flex-direction: column;
    align-items: flex-start;
  }
  .toolbar-inner {
    grid-template-columns: 1fr;
  }
}
"""
    (ASSET_DIR / "review_indexes.css").write_text(css.strip() + "\n", encoding="utf-8")


def render_master_index(entries: list[Entry], family_entries: dict[str, list[Entry]], inventory_counts: dict[str, int], transitioned_summary: list[dict]) -> str:
    screenshot_count = sum(1 for e in entries if e.screenshot_exists)
    family_cards = []
    for family_slug, fam_entries in sorted(family_entries.items(), key=lambda item: FAMILY_CONFIG[item[0]]["title"]):
        config = FAMILY_CONFIG[family_slug]
        previews = []
        for entry in fam_entries[:3]:
            if entry.screenshot_exists:
                previews.append(f'<img src="{html.escape(entry.screenshot_path)}" alt="{html.escape(entry.title)} screenshot" loading="lazy">')
            else:
                previews.append('<div class="preview-placeholder">NO SHOT</div>')
        family_cards.append(f"""
        <article class=\"family-card\">
          <div class=\"card-kicker\">Future insert family</div>
          <h3>{html.escape(config['title'])}</h3>
          <p>{html.escape(config['summary'])}</p>
          <div class=\"family-meta\">
            <span class=\"chip\">{len(fam_entries)} experiments</span>
            <span class=\"chip\">{sum(1 for e in fam_entries if e.screenshot_exists)} screenshots</span>
            <span class=\"chip good\">{html.escape(config['future_insert'])}</span>
          </div>
          <div class=\"preview-strip\">{''.join(previews)}</div>
          <div class=\"family-links\">
            <a class=\"button-link\" href=\"families/{html.escape(family_slug)}.html\">Open family index</a>
          </div>
        </article>
        """)
    transitioned_lines = ''.join(
        f'<div>insert {item["insert"]}: {html.escape(item["label"])} — {item["count"]} source experiments removed from active review</div>'
        for item in transitioned_summary
    ) or '<div>No transitioned experiments filtered yet.</div>'
    body = f"""
<div class=\"wrap\">
  <header class=\"hero\">
    <div class=\"hero-top\">
      <div>
        <div class=\"card-kicker\">Glyphmatic review indexes</div>
        <h1>Experiment review system</h1>
        <p>This is the navigation layer between standalone experiments and formal insert adoption. It groups the 2025 and 2026 reservoirs into family review pages with screenshots, metadata, and future-insert framing.</p>
        <div class=\"mini-nav\">
          <span class=\"pill\">2025_exp</span>
          <span class=\"pill\">2025_exp/html_experiments</span>
          <span class=\"pill\">2026_exp</span>
          <span class=\"pill\">2026_exp/vis</span>
        </div>
      </div>
    </div>
    <div class=\"stats-grid\">
      <div class=\"stat-box\"><div class=\"stat-kicker\">Active experiments</div><div class=\"stat-value\">{len(entries)}</div></div>
      <div class=\"stat-box\"><div class=\"stat-kicker\">Transitioned removed</div><div class=\"stat-value\">{sum(item['count'] for item in transitioned_summary)}</div></div>
      <div class=\"stat-box\"><div class=\"stat-kicker\">Family pages</div><div class=\"stat-value\">{len(family_entries)}</div></div>
      <div class=\"stat-box\"><div class=\"stat-kicker\">Screenshots cached</div><div class=\"stat-value\">{screenshot_count}</div></div>
      <div class=\"stat-box\"><div class=\"stat-kicker\">Generated</div><div class=\"stat-value\">{html.escape(datetime.now().strftime('%Y-%m-%d'))}</div></div>
    </div>
    <div class=\"note-box\">
      <strong>Source scope audit:</strong>
      2025_exp = {inventory_counts['2025_exp']} ·
      2025_exp/html_experiments = {inventory_counts['2025_exp/html_experiments']} ·
      2026_exp = {inventory_counts['2026_exp']} ·
      2026_exp/vis = {inventory_counts['2026_exp/vis']}.
      This now matches the four source directories exactly; 2026_exp currently contributes 0 top-level HTML beyond 2026_exp/vis.
    </div>
    <div class=\"note-box\">
      <strong>Transition filter:</strong>
      {transitioned_lines}
    </div>
  </header>

  <section>
    <div class=\"section-head\">
      <div>
        <h2>Families / future inserts</h2>
        <p>Use these family pages as the pre-insert curation layer: compare, shortlist, and decide which clusters deserve full insert formalization.</p>
      </div>
    </div>
    <div class=\"family-grid\">
      {''.join(family_cards)}
    </div>
  </section>

  <footer>
    <div>Manifest: review_indexes/data/manifest.json</div>
    <div>Transition archive: review_indexes/data/transitioned_manifest.json</div>
    <div>Family summaries: review_indexes/data/families/*.json</div>
  </footer>
</div>
"""
    return page_shell("Glyphmatic Review Indexes", body)


def render_family_page(family_slug: str, entries: list[Entry]) -> str:
    config = FAMILY_CONFIG[family_slug]
    cards = []
    for entry in entries:
        tags = ''.join(f'<span class="chip">{html.escape(tag)}</span>' for tag in entry.tags[:8])
        flags = []
        if entry.uses_autofont:
            flags.append('<span class="chip good">AutoFont</span>')
        if entry.uses_artist_palette:
            flags.append('<span class="chip good">artist palettes</span>')
        if entry.uses_colorpalette:
            flags.append('<span class="chip good">ColorPalette</span>')
        if entry.uses_glyph_data:
            flags.append('<span class="chip warn">glyph data</span>')
        cards.append(f"""
        <article class=\"entry-card\" 
          data-source-area=\"{html.escape(entry.source_area)}\"
          data-year=\"{html.escape(entry.year_bucket)}\"
          data-status=\"{html.escape(entry.status)}\"
          data-libraries=\"{' '.join(entry.libraries)}\"
          data-tags=\"{' '.join(entry.tags)}\"
          data-title=\"{html.escape(entry.title.lower())}\">
          <div class=\"thumb\">{image_html('../', entry)}</div>
          <div class=\"entry-body\">
            <div class=\"card-kicker\">{html.escape(entry.source_area)} · {html.escape(entry.subfamily)}</div>
            <h3>{html.escape(entry.title)}</h3>
            <div class=\"pathline\">{html.escape(entry.path)}</div>
            <div class=\"entry-meta\">
              <span class=\"chip\">{html.escape(entry.status)}</span>
              <span class=\"chip\">{html.escape(entry.year_bucket)}</span>
              <span class=\"chip\">future insert: {html.escape(entry.future_insert_candidate)}</span>
              {''.join(flags)}
            </div>
            <p>{html.escape(entry.summary)}</p>
            <p><strong>Upgrade notes:</strong> {html.escape(entry.upgrade_notes)}</p>
            <div class=\"entry-meta\">{tags}</div>
            <div class=\"entry-links\">
              <a class=\"button-link\" href=\"../{html.escape(entry.path)}\" target=\"_blank\">Open standalone</a>
              <a class=\"button-link\" href=\"../{html.escape(entry.path)}\" target=\"_blank\">Open source file</a>
              {f'<a class="button-link" href="../{html.escape(entry.screenshot_path)}" target="_blank">Open screenshot</a>' if entry.screenshot_exists else ''}
            </div>
          </div>
        </article>
        """)
    source_options = sorted({entry.source_area for entry in entries})
    year_options = sorted({entry.year_bucket for entry in entries})
    library_options = sorted({lib for entry in entries for lib in entry.libraries})
    status_options = sorted({entry.status for entry in entries})
    body = f"""
<div class=\"wrap\">
  <header class=\"hero\">
    <div class=\"hero-top\">
      <div>
        <div class=\"card-kicker\">Family review index</div>
        <h1>{html.escape(config['title'])}</h1>
        <p>{html.escape(config['summary'])}</p>
        <div class=\"mini-nav\">
          <a class=\"pill\" href=\"../index.html\">← Master index</a>
          <span class=\"pill\">{len(entries)} experiments</span>
          <span class=\"pill\">future insert: {html.escape(config['future_insert'])}</span>
        </div>
      </div>
    </div>
    <div class=\"note-box\">
      <strong>Upgrade direction:</strong> {html.escape(config['upgrade'])}
    </div>
  </header>
</div>
<div class=\"toolbar\">
  <div class=\"wrap toolbar-inner\">
    <input id=\"searchInput\" type=\"search\" placeholder=\"Search title, tags, path…\">
    <select id=\"sourceFilter\"><option value=\"\">All sources</option>{''.join(f'<option value="{html.escape(v)}">{html.escape(v)}</option>' for v in source_options)}</select>
    <select id=\"yearFilter\"><option value=\"\">All years</option>{''.join(f'<option value="{html.escape(v)}">{html.escape(v)}</option>' for v in year_options)}</select>
    <select id=\"libraryFilter\"><option value=\"\">All libraries</option>{''.join(f'<option value="{html.escape(v)}">{html.escape(v)}</option>' for v in library_options)}</select>
    <select id=\"statusFilter\"><option value=\"\">All statuses</option>{''.join(f'<option value="{html.escape(v)}">{html.escape(v)}</option>' for v in status_options)}</select>
  </div>
</div>
<div class=\"wrap\">
  <section>
    <div class=\"card-grid\" id=\"cardGrid\">
      {''.join(cards)}
    </div>
  </section>
  <footer>
    <div>Cards update client-side with filters; these pages are intended as your winner-picking and future-insert staging surface.</div>
  </footer>
</div>
<script>
  const searchInput = document.getElementById('searchInput');
  const sourceFilter = document.getElementById('sourceFilter');
  const yearFilter = document.getElementById('yearFilter');
  const libraryFilter = document.getElementById('libraryFilter');
  const statusFilter = document.getElementById('statusFilter');
  const cards = Array.from(document.querySelectorAll('.entry-card'));

  function applyFilters() {{
    const q = searchInput.value.trim().toLowerCase();
    const source = sourceFilter.value;
    const year = yearFilter.value;
    const library = libraryFilter.value;
    const status = statusFilter.value;
    for (const card of cards) {{
      const haystack = [card.dataset.title, card.dataset.tags, card.dataset.libraries, card.dataset.sourceArea, card.dataset.year, card.dataset.status].join(' ');
      const visible = (!q || haystack.includes(q))
        && (!source || card.dataset.sourceArea === source)
        && (!year || card.dataset.year === year)
        && (!library || (card.dataset.libraries || '').split(' ').includes(library))
        && (!status || card.dataset.status === status);
      card.style.display = visible ? '' : 'none';
    }}
  }}

  [searchInput, sourceFilter, yearFilter, libraryFilter, statusFilter].forEach(el => el.addEventListener('input', applyFilters));
  [sourceFilter, yearFilter, libraryFilter, statusFilter].forEach(el => el.addEventListener('change', applyFilters));
</script>
"""
    return family_page_shell(f"{config['title']} — Glyphmatic Review Index", body)


def main() -> int:
    ensure_dirs()
    write_assets()
    inventory_counts = source_inventory_counts()
    all_entries = sort_entries([make_entry(path) for path in iter_html_files()])

    transitioned_entries = []
    active_entries = []
    for entry in all_entries:
        transition_info = get_transition_info(entry.path)
        if transition_info:
            transitioned_entries.append({
                **asdict(entry),
                "transitioned_to_insert": transition_info["insert"],
                "transitioned_to_label": transition_info["label"],
            })
        else:
            active_entries.append(entry)

    transitioned_summary_map: dict[tuple[int, str], int] = defaultdict(int)
    for item in transitioned_entries:
        transitioned_summary_map[(item["transitioned_to_insert"], item["transitioned_to_label"])] += 1
    transitioned_summary = [
        {"insert": insert, "label": label, "count": count}
        for (insert, label), count in sorted(transitioned_summary_map.items())
    ]

    entries = active_entries
    family_entries: dict[str, list[Entry]] = defaultdict(list)
    for entry in entries:
        family_entries[entry.family].append(entry)

    manifest = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "repo_root": str(ROOT),
        "output_dir": str(OUTPUT_DIR),
        "source_directories": ["2025_exp", "2025_exp/html_experiments", "2026_exp", "2026_exp/vis"],
        "source_inventory_counts": inventory_counts,
        "entry_count": len(entries),
        "transitioned_removed_count": len(transitioned_entries),
        "families": sorted(family_entries.keys()),
        "entries": [asdict(entry) for entry in entries],
    }
    write_json(DATA_DIR / "manifest.json", manifest)
    write_json(DATA_DIR / "transitioned_manifest.json", {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "count": len(transitioned_entries),
        "summary": transitioned_summary,
        "entries": transitioned_entries,
    })

    family_summary = []
    for family_slug, fam_entries in family_entries.items():
        counts = Counter(entry.source_area for entry in fam_entries)
        summary = {
            "family": family_slug,
            "title": FAMILY_CONFIG[family_slug]["title"],
            "count": len(fam_entries),
            "screenshots": sum(1 for entry in fam_entries if entry.screenshot_exists),
            "source_areas": dict(sorted(counts.items())),
            "future_insert_candidate": FAMILY_CONFIG[family_slug]["future_insert"],
            "entries": [asdict(entry) for entry in fam_entries],
        }
        family_summary.append(summary)
        write_json(DATA_FAMILY_DIR / f"{family_slug}.json", summary)
        (FAMILY_DIR / f"{family_slug}.html").write_text(render_family_page(family_slug, fam_entries), encoding="utf-8")

    write_json(DATA_DIR / "family_manifest.json", family_summary)
    (OUTPUT_DIR / "index.html").write_text(render_master_index(entries, family_entries, inventory_counts, transitioned_summary), encoding="utf-8")

    print(f"Generated review indexes for {len(entries)} active experiments across {len(family_entries)} families.")
    print(f"Filtered out {len(transitioned_entries)} transitioned experiments.")
    print(f"Master index: {OUTPUT_DIR / 'index.html'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
