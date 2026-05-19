# Experiment to Insert Template

Use this template when converting a standalone Glyphmatic experiment into an insert.

## Source

- Source experiment path:
- Source family / theme:
- Target insert index:
- Legacy or modern insert directory:

## Dependencies

- Required glyph/data files:
- Shared engines needed (`ColorPalette`, `AutoFont`, etc.):
- External libraries, if any:
- Wait-signals required before init:

## Host Registration

- `g.us3.htm` entry to add/update:
- `js_funct/insert_config.js` entry to add/update:
- Title label:
- Long-form description:

## Runtime Structure

- Root DOM node ID/class:
- CSS injection strategy:
- Main init function:
- Cleanup function:
- Timers/intervals/RAF to track:
- Event listeners to track:

## Flavor / Preset Mapping

- Flavor 0:
- Flavor 1:
- Flavor 2:
- Keyboard controls:
- URL support (`&flavor=` etc.):

## Host Contract Checklist

- [ ] Do not wipe `document.body.innerHTML`
- [ ] Preserve watermark elements
- [ ] Preserve nav/menu behavior
- [ ] Provide `changeHtmlDisplayInline()` if required by host
- [ ] Support re-entry / regeneration cleanly

## Validation URLs

- Local default:
- Local insert-only:
- Local insert + flavor:

## QA Checklist

- [ ] No console errors
- [ ] Root DOM is not duplicated on restart
- [ ] Keyboard controls work
- [ ] Watermark/nav still visible
- [ ] Description/config matches behavior
- [ ] Insert file, host registration, and config registration are all in sync
