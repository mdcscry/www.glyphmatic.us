# Insert29.js - Lotus Structure Verification ✓

## Critical Requirement
**Every single lotus must contain the FLOWER OF LIFE in its center:**
- 1 center circle
- 6 surrounding circles (at 60° intervals)
- This sacred geometry is the CORE of each lotus

---

## Flavor 0: Basic Lotus ✓

### Structure
- **Single mandala** centered on screen
- **Rotating container** with random direction (CW/CCW) and speed (60-180s)

### Flower of Life Components ✓
- **Center Circle**: 50px radius → `folCircleRadius = 50`
- **6 Outer Circles**: 50px offset at 60° intervals → `folOffset = 50`
- **Color Scheme**: Center uses `palette[0]`, outer uses `palette[1]`

### Supporting Geometry ✓
- **Concentric Rings**: 6 rings at radii 100, 150, 200, 250, 300, 350px
- **Toroidal Circles**: 108 circles in annular region (innerRadius=100, outerRadius=350)
- **Lotus Petals**: 12 petals using brace characters `}` around outer ring

### Animations ✓
- Single rotation (clockwise or counter-clockwise)
- Center glow effect with radial gradient

---

## Flavor 1: Enhanced Lotus ✓

### Structure
- **Dual rotating containers**: FOL spins opposite to everything else
- **Variable concentric rings**: 4-7 inner rings (6-9 total with boundaries)
- **Radial spokes**: 18/36/54/72/108 circles radiating from center

### Flower of Life Components ✓
- **Center Circle**: 50px radius → `folCircleRadius = 50`
- **6 Outer Circles**: 50px offset at 60° intervals → `folOffset = 50`
- **Color Scheme**: All use `palette[1]` for unity
- **Container**: Separate `folRotatingContainer` for opposite rotation

### Supporting Geometry ✓
- **Variable Rings**: Random count (4-7) evenly spaced between innerRadius and outerRadius
- **Toroidal Circles**: Present in main container
- **Radial Spokes**: Large circles positioned along radial lines, clipped by annular mask

### Animations ✓
- Main container rotates one direction
- FOL container rotates opposite direction at same speed
- Inner mask hides center flower of life from spoke visibility

---

## Flavor 2: Circle Packing ✓

### Structure
- **Multiple independent lotuses** on full screen
- **Circle packing algorithm**: Generates boundary + interior circles with relaxation
- **3-10 lotuses** per generation

### Flower of Life Per Lotus ✓
- **Center Circle**: `folR = 50 * scale` radius
- **6 Outer Circles**: `folOff = 50 * scale` offset at 60° intervals
- **Color Scheme**: Center uses `palette[1]`, outer uses `palette[0]`
- **Scaling**: Based on packed circle radius (`scale = (circle.r * 2) / 900`)

### Supporting Geometry Per Lotus ✓
- **Concentric Rings**: 6 rings [100, 150, 200, 250, 300, 350] scaled
- **Toroidal Circles**: 24-84 circles (random options: 24, 36, 48, 60, 72, 84)
- **Proper centering**: Center positioned at `(circle.r, circle.r)` relative to lotus container

### Animations ✓
- Staggered fade-in (0-duration × index)
- No rotation (packed circles remain static once placed)
- Position set via circle packing physics

---

## Flavor 3: Circle Packing Grid ✓

### Structure
- **2×2 grid** with independent circle packing per cell
- **Each cell**: 2-10 interior lotuses positioned via relaxation
- **Proper scaling**: Coordinates transformed from pack-space (400×400) to cell-space

### Flower of Life Per Lotus ✓
- **Center Circle**: `folR = 12.5 * scale` radius
- **6 Outer Circles**: `folOff = 12.5 * scale` offset at 60° intervals
- **Color Scheme**: Center uses `palette[1]`, outer uses `palette[0]`
- **Scaling**: `scale = (circle.r * 2 * coordScale) / 100`

### Supporting Geometry Per Lotus ✓
- **Concentric Rings**: 4 rings [25, 31.25, 37.5, 43.75] scaled ✓ **FIXED**
- **Toroidal Circles**: 12-36 circles (12, 24, or 36 random) ✓ **FIXED**
- **Proper coordinate transformation**: Pack-space → cell-space via `coordScale`

### Animations ✓
- Per-cell circle packing generates unique layouts
- Staggered fade-in per cell (100ms delay)
- No rotation (grid cells are static)

---

## Flavor 4: Circle Packing NoOverlap ✓

### Structure
- **Full-screen** circle packing with strict non-overlap constraint
- **Boundary circles**: Positioned on viewport edges
- **Interior circles**: 5-15 with rigorous collision detection
- **Relaxation**: Physics-based while maintaining gaps

### Flower of Life Per Lotus ✓
- **Center Circle**: `folR = 50 * scale` radius
- **6 Outer Circles**: `folOff = 50 * scale` offset at 60° intervals
- **Color Scheme**: Center uses `palette[1]`, outer uses `palette[0]`
- **Scaling**: `scale = (circle.r * 2) / 800`

### Supporting Geometry Per Lotus ✓
- **Concentric Rings**: 6 rings [100, 150, 200, 250, 300, 350] scaled
- **Toroidal Circles**: 24-84 circles (random options)
- **Viewport constraints**: Circles guaranteed within viewport bounds

### Animations ✓
- Staggered fade-in (0-duration × 100ms × index)
- Absolute positioning on viewport
- No rotation (static after placement)

---

## Flavor 5: Grid Layout ✓

### Structure
- **2×2 grid** with one centered mandala per cell
- **Single lotus per cell** (not circle packing)
- **Flex-centered** with 90% size constraint
- **Individual rotation** per lotus (15-40s, random direction)

### Flower of Life Per Lotus ✓
- **Center Circle**: `folCircleRadius = 25 * scale` radius
- **6 Outer Circles**: `folOffset = 25 * scale` offset at 60° intervals
- **Color Scheme**: Center uses `palette[1]`, outer uses `palette[0]`
- **Scaling**: `scale = referenceSize / 400` (referenceSize = 200px)

### Supporting Geometry Per Lotus ✓
- **Concentric Rings**: 6 rings [50, 75, 100, 125, 150, 175] scaled ✓
- **Toroidal Circles**: 24-84 circles (random options) ✓
- **Layout**: Each centered in flex container

### Animations ✓
- **Individual rotation**: 15-40s duration, random direction (CW/CCW)
- **Fade-in**: 100ms delay for visibility
- **Rotation keyframes**: rotateLotus-cw and rotateLotus-ccw defined in CSS

---

## Summary of Fixes Applied

### Flavor 2: ✓ Fully Implemented
- Complete circle packing algorithm
- Full flower of life in each lotus
- Concentric rings + toroidal circles
- Proper scaling and positioning

### Flavor 3: ✓ Fully Implemented  
- Grid-based circle packing per cell
- Full flower of life in each lotus
- **FIXED**: Added missing toroidal circles
- Proper coordinate transformation

### Flavor 4: ✓ Fully Implemented
- No-overlap circle packing algorithm
- Full flower of life in each lotus
- Concentric rings + toroidal circles
- Viewport boundary constraints

### Flavor 5: ✓ Fully Implemented
- Grid layout with centered mandalas
- Full flower of life in each lotus
- Concentric rings + toroidal circles
- Individual rotation animations

---

## Testing Instructions

1. **Load the page** - insert29.js will auto-load on page refresh
2. **Press 0-5** to cycle through flavors
3. **Visual verification**:
   - Look for the center circle (small) in each lotus
   - Look for 6 surrounding circles around each center (classic vesica piscis pattern)
   - Verify concentric rings expand outward
   - Verify toroidal circles form the annular region
4. **Flavor-specific checks**:
   - **0-1**: Single mandala, should rotate smoothly
   - **2**: Multiple lotuses scattered on screen, packed nicely
   - **3**: 2×2 grid, each cell has several lotuses
   - **4**: Multiple lotuses, should not overlap
   - **5**: 2×2 grid, one lotus per cell, each rotating independently

---

## Critical Implementation Notes

All lotus instances use the sacred geometry:
```
Flower of Life = 1 center circle + 6 surrounding circles at 60° intervals
```

This pattern is the CORE of every single lotus across all 6 flavors.

Each lotus container calculates:
- `folCircleRadius`: Radius of FOL circles based on scale
- `folOffset`: Distance from center to outer FOL circles
- Both scale with the container size for responsive rendering

Color palette cycles through:
- `palette[0]`: Outer rings/outer FOL circles
- `palette[1]`: Center circle/central FOL
- Additional colors for toroidal circles
