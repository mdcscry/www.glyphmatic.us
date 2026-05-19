GLYPHMATIC.US(1)

NAME
    glyphmatic.us - browser-first generative Unicode art project

SYNOPSIS
    bin/glyphmatic --help
    bin/glyphmatic man
    bin/glyphmatic overview
    bin/glyphmatic inventory
    bin/glyphmatic qa
    bin/glyphmatic preview [--index N] [--flavor N] [--serve] [--open]

DESCRIPTION
    glyphmatic.us is a long-running browser-native generative art system built
    around Unicode glyphs, dynamic font loading, palette systems, and modular
    insert-based visualizations.

    The canonical host page is `g.us3.htm`. It loads shared support scripts,
    chooses an insert by URL parameter or random selection, and then mounts
    a legacy or modern insert module.

ARCHITECTURE
    Host page:
        g.us3.htm

    Shared engines:
        js_funct/insert_config.js
        js_funct/nav_menu.js
        js_funct/colorpalette.js
        js_funct/autoFont.js

    Insert directories:
        insert_js_2013/
        insert_js_2025/

    Data and glyph assets:
        js_glyph/

    Experiments:
        2011_exp/
        2015_exp/
        2020_exp/
        2025_exp/
        2026_exp/

    Tooling:
        bin/
        docs/

COMMANDS
    --help, help
        Print a compact command-oriented help screen.

    man
        Print this man-page-style document.

    overview
        Print the project overview document.

    inventory
        Run the insert inventory helper and list registered inserts, file paths,
        and available descriptions.

    qa
        Run structural QA against:
        - g.us3.htm host registration
        - js_funct/insert_config.js config registration
        - insert files in insert_js_2013/ and insert_js_2025/

    preview
        Delegate to the local preview helper.

        Common examples:
            bin/glyphmatic preview --index 29 --flavor 3
            bin/glyphmatic preview --serve --index 34 --open

    root
        Print the repository root path.

LOCAL WORKFLOW
    Inspect the current insert system:
        bin/glyphmatic inventory
        bin/glyphmatic qa

    Generate a preview URL for an insert:
        bin/glyphmatic preview --index 35

    Serve the repo locally and open a flavor:
        bin/glyphmatic preview --serve --index 29 --flavor 3 --open

INSERT AUTHORING RULES
    1. Do not wipe `document.body.innerHTML` inside inserts.
    2. Preserve watermark and host navigation elements.
    3. If the host expects `changeHtmlDisplayInline()`, provide it.
    4. Track cleanup for timers, intervals, animation loops, listeners, and
       inserted DOM roots.
    5. When adding or changing an insert, check both:
       - g.us3.htm
       - js_funct/insert_config.js

PROJECT CONVENTIONS
    - Browser-first, usually no build step.
    - Shared globals are common.
    - CSS injection inside insert files is normal.
    - Multi-flavor inserts are preferred over families of nearly-identical files
      when several experiments share a core system.

FILES OF INTEREST
    docs/glyphmatic-overview.md
    docs/glyphmatic-vis-ongoing.md
    docs/plans/2026-04-07-glyphmatic-tooling-foundation.md
    docs/experiment-to-insert-template.md
    docs/palette-qa-helper-design.md
    docs/autofont-diagnostics-design.md

SEE ALSO
    bin/glyphmatic_inventory.py
    bin/glyphmatic_insert_qa.py
    bin/glyphmatic_preview.py
    insert_js_2025/insert_system.md

AUTHOR
    glyphmatic.us by the repository owner.
    Terminal help/man surface added by Dolios.
