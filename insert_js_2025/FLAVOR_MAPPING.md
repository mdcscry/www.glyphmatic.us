# insert28.js - Multi-Flavor DeGenerator Mapping

## Flavor Index to Variant Mapping

### Flavor 0: Scattered Base
- **Source:** degenerator1_legacy_1.htm
- **Layout Type:** Scattered divs (1000 containers)
- **Change Rate:** 400ms
- **Features:** Classic scattered layout with 8 child divs per container
- **Symbols:** Extended Unicode block (1FB00-1FBF9)

### Flavor 1: Two-Block Slow
- **Source:** degenerator1_legacy_bi_slow.htm
- **Layout Type:** Two-block overlay side-by-side
- **Change Rate:** 10000ms (slowest)
- **Features:** 50/50 viewport split with flexbox layout, 3 layers each
- **Symbols:** Extended Unicode block

### Flavor 2: Dynamic Overlays
- **Source:** degenerator1_legacy_bi_slow2.htm
- **Layout Type:** Dynamic overlays
- **Change Rate:** 6200ms
- **Features:** Full-viewport overlay with dynamic layer updates
- **Symbols:** Extended Unicode block

### Flavor 3: Slow Overlays
- **Source:** degenerator1_legacy_bi_slow3.htm
- **Layout Type:** Dynamic overlays
- **Change Rate:** 6000ms
- **Features:** Full-viewport overlay with slower animations
- **Symbols:** Extended Unicode block

### Flavor 4: Color Mix
- **Source:** degenerator1_legacy_colormix.htm
- **Layout Type:** Scattered with color mixing
- **Change Rate:** 400ms
- **Features:** Scattered layout with extended color palette interaction
- **Symbols:** Extended Unicode block

### Flavor 5: Splat Effect
- **Source:** degenerator1_legacy_splat.htm
- **Layout Type:** Scattered with splat symbols
- **Change Rate:** 400ms
- **Features:** Scattered layout using special splatter/splat symbols (1CDFD-1CDFF)
- **Symbols:** Splat symbols only

### Flavor 6: Enhanced Overlays
- **Source:** degenerator1_legacyplus_bi_slow4.htm
- **Layout Type:** Dynamic overlays
- **Change Rate:** 6000ms
- **Features:** Enhanced two-block overlay with blend modes
- **Symbols:** Extended Unicode block

### Flavor 7: Box Mix Layout
- **Source:** degenerator1_bi_boxmix.htm
- **Layout Type:** Two-block overlay
- **Change Rate:** 6000ms
- **Features:** Two-block layout with box mixing effects
- **Symbols:** Extended Unicode block

### Flavor 8: Fast Scattered
- **Source:** degenerator1_legacy_bi_fast.htm
- **Layout Type:** Scattered layout (fast)
- **Change Rate:** 800ms
- **Features:** Scattered layout with faster animation updates
- **Symbols:** Extended Unicode block

## Keyboard Controls

Press **0-9** to switch between flavors:
- `0` → Scattered Base
- `1` → Two-Block Slow
- `2` → Dynamic Overlays
- `3` → Slow Overlays
- `4` → Color Mix
- `5` → Splat Effect
- `6` → Enhanced Overlays
- `7` → Box Mix Layout
- `8` → Fast Scattered

## URL Parameter Support

Access a specific flavor via query parameter:
```
?flavor=0   (Scattered Base)
?flavor=1   (Two-Block Slow)
?flavor=2   (Dynamic Overlays)
... etc
```

Example: `http://localhost/g.us3.htm?i=28&flavor=5` (loads insert28 with splat effect)

## Implementation Notes

### DOM Creation (No innerHTML)
All DOM elements and text content are created using:
- `document.createElement()` for elements
- `document.createTextNode()` for text content
- `appendChild()` to attach to DOM
- NO `innerHTML` assignments

### Symbol Rendering
- Uses `String.fromCodePoint()` to convert hex Unicode to characters
- Supports both regular Extended Symbols and special Splat symbols
- Text nodes created directly rather than HTML strings

### Layout Types

#### Scattered
- Multiple containers with nested child divs
- Random color and symbol selection on animation intervals
- Works well at 400-800ms rates

#### Two-Block
- Full-viewport divided into left/right halves
- 3 layers per block with flexbox centering
- Large symbol sizes (40vw) for dramatic effect
- Works well at 6000-10000ms rates

#### Dynamic Overlay
- Similar to two-block but with dynamic feature set
- Full viewport coverage with positioned layers
- Blend mode support (transition-ready)

## Animation Details

- **Background Color:** Changes every 2x fontChangeRate
- **Symbol Color:** Changes randomly from COLOR_PALETTE
- **Symbol Type:** Randomly selected from flavor's symbol set
- **Timing:** Controlled by flavor's fontChangeRate value

## Performance Optimization TODO

1. Consider using `requestAnimationFrame()` for smoother animations
2. Implement debouncing for rapid flavor switches
3. Add performance monitoring for 1000+ container layouts
4. Consider canvas rendering for very high symbol densities
5. Test memory usage on long-running instances

## Testing Checklist

- [ ] Test all 9 flavors load correctly
- [ ] Verify keyboard shortcuts work (0-9)
- [ ] Test URL parameter flavor switching
- [ ] Check symbol rendering in different browsers
- [ ] Verify no memory leaks on rapid flavor switches
- [ ] Test performance on different devices
- [ ] Confirm color palette loads correctly
- [ ] Validate responsive behavior (especially two-block at different viewport sizes)

## Browser Compatibility

- Requires CSS Flexbox support
- Requires Unicode Extended Symbols font (Noto Sans Symbols 2)
- Tested on: Chrome, Firefox, Safari (modern versions)
- Mobile support: Limited due to viewport calculations
