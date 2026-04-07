# Lotus Mandala Structure - All 6 Flavors

## Core Sacred Geometry: FLOWER OF LIFE
Each lotus instance must contain the sacred flower of life pattern in its center:
1. **Center Circle** - 1 circle at the center
2. **Outer Ring** - 6 circles arranged around the center (sacred geometry)
3. **Supporting Geometry** - Concentric rings and toroidal circles extending outward

---

## Flavor Breakdown

### Flavor 0: Basic Lotus
- **Single centered mandala** on dark background
- **Rotating container** with random direction/speed
- **Flower of Life**: ✓ Center circle + 6 outer circles
- **Supporting**: Concentric rings (6), toroidal circles (108)
- **Outer**: 12 lotus petals using brace characters `}`
- **Layout**: Full-screen, centered

### Flavor 1: Lotus Redo
- **Enhanced dual-rotation** with opposite-spinning layers
- **Flower of Life**: ✓ Center + 6 outer circles (separate rotating container)
- **Radial Spokes**: Circles radiating from center (18/36/54/72/108 options)
- **Variable Rings**: 4-7 concentric rings (6-9 total including boundaries)
- **Supporting**: Toroidal circles
- **Petals**: 12 lotus petals on main rotating layer

### Flavor 2: CirclePack
- **Multiple independent lotuses** positioned via circle packing algorithm
- **Circle Packing**: Generates 3-10 interior circles via relaxation algorithm
- **Each Lotus Contains**: ✓ Full flower of life (1 center + 6 outer)
- **Supporting**: Concentric rings (6) + toroidal circles (24-84)
- **Layout**: Full-screen with overlapping positioned lotuses
- **Animations**: Staggered fade-in

### Flavor 3: CirclePack Grid
- **2x2 grid** of cells, each with independent circle packing
- **Per Cell**: Circle packing generates 2-10 interior lotuses
- **Each Lotus**: ✓ Full flower of life (1 center + 6 outer)
- **Supporting**: Concentric rings (4) + toroidal circles (12-36)
- **Layout**: Grid cells with scaled coordinates and proper dimensions
- **Animations**: Staggered fade-in per cell

### Flavor 4: CirclePack NoOverlap
- **Full-screen** circle packing with strict non-overlap constraint
- **Circle Generation**: Boundary circles + interior (5-15) with collision detection
- **Relaxation**: Physics-based while maintaining no-overlap
- **Each Lotus**: ✓ Full flower of life (1 center + 6 outer)
- **Supporting**: Concentric rings (6) + toroidal circles (24-84)
- **Layout**: Positioned absolutely on full viewport
- **Animations**: Staggered fade-in

### Flavor 5: Grid Layout
- **2x2 grid** with one centered mini-mandala per cell
- **Each Cell**: Single mandala (not circle packing)
- **Each Mandala**: ✓ Full flower of life (1 center + 6 outer)
- **Supporting**: Concentric rings (6) + toroidal circles (24-84)
- **Rotation**: Individual rotation animations (15-40s) per mandala
- **Layout**: Flex-centered in each cell with 90% sizing
- **Animations**: Fade-in + independent rotation

---

## Structure Verification Checklist

For EVERY lotus instance across all flavors:
- [ ] 1 center circle (flower of life center)
- [ ] 6 surrounding circles at 60° intervals (flower of life pattern)
- [ ] Concentric rings (4-6 rings depending on flavor)
- [ ] Toroidal circles in annular region (12-108 depending on flavor)
- [ ] Proper color palette cycling
- [ ] Correct scaling based on lotus size
- [ ] Proper positioning (absolute or grid-based)

---

## Key Files
- `lotus.htm` - Reference for Flavor 0
- `lotus_redo.htm` - Reference for Flavor 1
- `lotus_circlepack.htm` - Reference for Flavor 2
- `lotus_circlepack_grid.htm` - Reference for Flavor 3
- `lotus_circlepack_nooverlap.htm` - Reference for Flavor 4
- `lotus_grid.htm` - Reference for Flavor 5
- `insert29.js` - Consolidated implementation

---

## Testing
Test each flavor by pressing keys 0-5 to cycle through:
- Visual verification of flower of life in each lotus
- Proper scaling and positioning
- Smooth animations and fades
- Color palette application
