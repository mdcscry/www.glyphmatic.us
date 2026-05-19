# Glyphmatic Insert Program

This document exists to make the insert question tractable.

## The emotional truth

Glyphmatic does not have a simple "port the experiments" problem.
It has a curation, formalization, and host-integration problem.

The hard part is not generating new standalones.
The hard part is deciding which experiments deserve:
- full insert-system adoption
- multi-flavor family consolidation
- advanced palette/glyph/autofont integration
- long-term maintenance inside the host page

## Current rough scale

Local repo counts from quick inventory:
- registered inserts: 38
- `2025_exp`: 52 HTML files total
- `2025_exp/html_experiments`: 44 HTML files
- `2026_exp`: 71 HTML files total
- `2026_exp/vis`: large majority of the 2026 HTML pool

These counts are not all unique migration candidates:
- some are already represented by inserts
- some are alternates or studies
- some are prototypes or support pages
- some are likely better kept standalone

## Anti-goal

Do NOT aim for:
- one insert per standalone HTML
- forcing every experiment into host form
- finishing organization only after all new experiments stop

That path creates endless partial ports and weak insert sprawl.

## Real goal

Create a curated insert system where the best standalone work is represented by a manageable number of strong, host-native families.

In practice this likely means:
- a smaller set of canonical insert families
- multiple flavors per family
- explicit decisions that some experiments remain standalone
- a documented status for every experiment bucket

## Four destination buckets

Every experiment should land in exactly one of these buckets.

### A. Canonical insert family
Use when the experiment is strong, reusable, and belongs in the main Glyphmatic host experience.

Requirements:
- host-safe DOM behavior
- cleanup lifecycle
- flavor switching if family-based
- advanced palette integration
- glyph/autofont integration where appropriate
- metadata + host registration
- visual validation against source

### B. Standalone keeper
Use when the experiment is good but gains little from insert formalization.

Examples:
- pieces whose strength depends on custom full-page structure
- experiments that are aesthetically complete standalone
- demos that are more like essays or proofs than reusable insert modules

### C. Prototype / study / ingredient
Use when the file is mainly:
- a step toward another piece
- a geometry study
- a palette test
- a reference implementation
- an alternate not worth surfacing on its own

These can feed families later without needing immediate insert work.

### D. Already absorbed / superseded
Use when the experiment already exists in an insert family or is clearly replaced by a better successor.

## Decision rule

Before building an insert, ask:
1. Is this piece actually important enough to preserve in the host?
2. Is it better as a flavor in an existing family than as a new insert?
3. Would host integration add real value, or just maintenance burden?
4. Does it need advanced palette/glyph/autofont hooks to feel complete?
5. Can it be validated visually without endless subjective rework?

If the answer is weak on 2-3 of those, it probably should not become an insert yet.

## Program structure

### Phase 1: Triage, not conversion
First pass is classification only.
No insert coding until each major source area has a rough map.

Source areas:
- `2025_exp/`
- `2025_exp/html_experiments/`
- `2026_exp/`
- `2026_exp/vis/`

For each file or coherent cluster, record:
- bucket: A / B / C / D
- family name
- likely destination insert
- already done? yes/no/partial
- needs palette bridge? yes/no
- needs autofont? yes/no
- notes on visual validation difficulty

### Phase 2: Family architecture
For every A-bucket family, define:
- source files included
- flavor map `0-9`
- shared controls
- palette modes (`artist`, `oklch`, `hybrid`, other)
- glyph strategy
- autofont dependency
- parity checklist against source experiments

### Phase 3: One family at a time
Do not port random favorites ad hoc.
Take one family through the full process:
- shell
- flavor implementation
- host integration
- palette/glyph integration
- visual QA
- documentation

## Existing strong precedent

Use `insert37` as the current model for a serious vis-family bridge:
- many sources -> one family insert
- direct flavor URLs
- keyboard switching
- palette integration
- append-only host-safe behavior
- cleanup discipline

## Working principle for future effort

The scarce resource is not creativity.
The scarce resource is formalization energy.

So the system should reward:
- consolidation
- family thinking
- clear exclusions
- deliberate promotion into inserts

It should not reward:
- guilt about unfinished experiments
- treating every cool standalone as an obligation
- pretending all work deserves equal formalization

## Suggested next milestone

Do a repo-wide migration map first.
Output should be a table or JSON/Markdown inventory that says, for each experiment family:
- where it lives
- whether it is already represented
- whether it deserves insert formalization
- what dependencies it needs
- what the next real action is

Only after that should new insert implementation begin.

## Success condition

Success is NOT:
"Everything is an insert."

Success IS:
"The best work is organized, the insert system has strong canonical families, and the rest has an intentional status instead of limbo."
