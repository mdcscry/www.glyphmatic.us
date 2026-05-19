# Glyphmatic Tooling Foundation Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a small, repo-native tooling layer that makes Glyphmatic easier to inspect, preview, validate, and continue expanding.

**Architecture:** Keep tools lightweight and browser-first, matching the repo’s style. Prefer standalone Python scripts in `bin/` plus markdown docs under `docs/`, avoiding any new build system or package dependency unless clearly necessary. Treat `g.us3.htm`, `js_funct/insert_config.js`, and insert files as the canonical insert registry surface.

**Tech Stack:** Python 3 stdlib, existing repo scripts in `bin/`, browser URLs for local/manual validation, markdown docs.

---

### Task 1: Save a roadmap document for the tooling layer

**Objective:** Create a single plan document that explains the tooling direction and execution order.

**Files:**
- Create: `docs/plans/2026-04-07-glyphmatic-tooling-foundation.md`

**Step 1: Document the first-wave tools**

Include:
- insert inventory
- insert QA
- local preview helper
- experiment-to-insert template
- palette QA helper
- AutoFont diagnostics helper

**Step 2: Document the sequencing**

Recommended order:
1. inventory
2. QA
3. preview
4. templates
5. palette QA
6. AutoFont diagnostics

**Step 3: Verification**

Open the file and confirm it names exact repo paths and doesn’t assume a build step.

**Step 4: Commit**

```bash
git add docs/plans/2026-04-07-glyphmatic-tooling-foundation.md
git commit -m "docs: add Glyphmatic tooling foundation plan"
```

### Task 2: Build insert QA script

**Objective:** Add a script that checks the consistency of the host insert registry, config registry, and insert files.

**Files:**
- Create: `bin/glyphmatic_insert_qa.py`

**Step 1: Read canonical inputs**

Parse:
- `g.us3.htm`
- `js_funct/insert_config.js`
- `insert_js_2013/`
- `insert_js_2025/`

**Step 2: Implement checks**

Checks should include:
- each `insertArray[index]` has a matching insert file
- each insert file is registered in the host
- each registered insert has a config entry or is explicitly noted missing
- each insert has a description if expected
- 2013/2025 directory split matches index boundaries
- optional warnings for placeholder titles or suspicious missing labels

**Step 3: Print human-readable output**

The script should print:
- PASS/WARN/FAIL summary counts
- one line per issue
- a success message when no failures exist

**Step 4: Verify**

Run:
```bash
python3 bin/glyphmatic_insert_qa.py
```

Expected:
- script exits cleanly
- current repo issues, if any, are reported without crashing

**Step 5: Commit**

```bash
git add bin/glyphmatic_insert_qa.py
git commit -m "feat: add Glyphmatic insert QA helper"
```

### Task 3: Build local preview helper

**Objective:** Add a small local workflow helper for serving the repo and generating/opening insert URLs.

**Files:**
- Create: `bin/glyphmatic_preview.py`

**Step 1: Implement URL generation**

Support flags such as:
- `--index N`
- `--flavor N`
- `--host 127.0.0.1`
- `--port 8000`
- `--open`
- `--serve`

**Step 2: Implement serve mode**

Use Python stdlib HTTP serving rooted at repo root.

**Step 3: Implement browser-open mode**

On macOS, use `open <url>` when `--open` is passed.
Do not auto-open unless explicitly requested.

**Step 4: Print exact validation URLs**

Examples:
- `/g.us3.htm?i=29`
- `/g.us3.htm?i=29&flavor=3`

**Step 5: Verify**

Run:
```bash
python3 bin/glyphmatic_preview.py --index 29 --flavor 3
python3 bin/glyphmatic_preview.py --help
```

Expected:
- valid URL output
- clean help text

**Step 6: Commit**

```bash
git add bin/glyphmatic_preview.py
git commit -m "feat: add Glyphmatic local preview helper"
```

### Task 4: Add experiment-to-insert template

**Objective:** Create a reusable conversion checklist/template for moving standalone experiments into the insert system.

**Files:**
- Create: `docs/experiment-to-insert-template.md`

**Step 1: Include required migration fields**

Template should capture:
- source experiment path
- target insert index
- shared dependencies
- flavor mapping
- cleanup needs
- keyboard controls
- config description text
- validation URLs

**Step 2: Include host contract reminders**

Must explicitly mention:
- preserve watermark/nav
- don’t wipe body
- register both host and config files

### Task 5: Add palette QA helper design

**Objective:** Define a practical QA workflow for the artist-grid palette pipeline before coding it.

**Files:**
- Create: `docs/palette-qa-helper-design.md`

**Step 1: Specify checks**

Include candidate checks for:
- missing source images
- missing generated metadata rows
- override-only rows with no source image
- palette key/file mismatches
- lightweight HTML review generation links

### Task 6: Add AutoFont diagnostics helper design

**Objective:** Define a practical diagnostics tool for Unicode block/font troubleshooting before coding it.

**Files:**
- Create: `docs/autofont-diagnostics-design.md`

**Step 1: Specify checks**

Include candidate checks for:
- missing local font files
- unresolved directory tokens
- sampled block-to-font availability
- generated font-stack previews
- target glyph lookup mode for debugging specific failures

---

## Verification Checklist

- [ ] New tools rely only on Python stdlib unless there is a compelling repo-local reason otherwise
- [ ] Scripts run from repo root without a build step
- [ ] URLs target `g.us3.htm`
- [ ] Docs use exact file paths
- [ ] Tools fit the browser-first nature of Glyphmatic
