/**
 * artist_palettes.js — Color palettes drawn from famous modern artists
 *
 * Each entry has:
 *   name        — display label
 *   artist      — artist name
 *   ref         — work(s) or period referenced
 *   colors      — array of hex colors (use as glyph/shape colors)
 *   bg          — suggested background color
 *   useBoxMuller — true for weighted distribution (skews toward middle of array)
 *
 * Usage:
 *   const key = Object.keys(ARTIST_PALETTES)[n];
 *   const p = ARTIST_PALETTES[key];
 *   document.body.style.backgroundColor = p.bg;
 *   const color = p.colors[Math.floor(Math.random() * p.colors.length)];
 */

(function(global) {
    'use strict';

    const ARTIST_PALETTES = {

        // ── Pablo Picasso ──────────────────────────────────────────────────────

        picasso_blue: {
            name: 'Picasso — Blue Period',
            artist: 'Pablo Picasso',
            school: 'Cubism',
            ref: 'La Vie (1903)',
            bg: '#0D1F3C',
            colors: [
                '#1C3E6E',   // deep prussian blue
                '#3A6096',   // medium cobalt
                '#7099BF',   // steel blue
                '#A8C4DC',   // pale blue
                '#2E5C7A',   // teal-blue
                '#0F2844',   // near-black blue
                '#C8D8E8',   // icy highlight
                '#4A7A9B',   // blue-gray
            ],
            useBoxMuller: true
        },

        picasso_rose: {
            name: 'Picasso — Rose Period',
            artist: 'Pablo Picasso',
            school: 'Cubism',
            ref: 'Family of Saltimbanques (1905)',
            bg: '#E8D4C0',
            colors: [
                '#E09070',   // warm salmon
                '#C87050',   // terra cotta
                '#F0C8A8',   // peach
                '#A87860',   // muted rose-brown
                '#D4A880',   // dusty tan
                '#784840',   // deep rust
                '#F8E0D0',   // pale blush
                '#B08060',   // warm brown
            ],
            useBoxMuller: false
        },

        picasso_cubist: {
            name: 'Picasso — Analytical Cubism',
            artist: 'Pablo Picasso',
            school: 'Cubism',
            ref: 'Ma Jolie (1912)',
            bg: '#B8A880',
            colors: [
                '#8C7848',   // ochre
                '#6C5838',   // brown
                '#C8B888',   // light tan
                '#504030',   // dark umber
                '#A09878',   // warm gray-tan
                '#383020',   // very dark brown
                '#D8C8A0',   // pale ochre
                '#706050',   // mid brown
            ],
            useBoxMuller: true
        },

        // ── Henri Matisse ──────────────────────────────────────────────────────

        matisse_fauve: {
            name: 'Matisse — Fauvism',
            artist: 'Henri Matisse',
            school: 'Fauvism',
            ref: 'Woman with a Hat (1905)',
            bg: '#F8F0D8',
            colors: [
                '#CC3320',   // vermillion
                '#E87828',   // orange
                '#2868A8',   // cobalt blue
                '#F8C820',   // cadmium yellow
                '#3C8C40',   // viridian green
                '#C83878',   // magenta-rose
                '#F0A860',   // warm orange
                '#284870',   // deep blue
            ],
            useBoxMuller: false
        },

        matisse_odalisque: {
            name: 'Matisse — Odalisques',
            artist: 'Henri Matisse',
            school: 'Fauvism',
            ref: 'Odalisque with Magnolias (1924)',
            bg: '#F5E8D0',
            colors: [
                '#D84830',   // red
                '#3870B0',   // blue
                '#E8A830',   // golden
                '#78A858',   // green
                '#E87060',   // coral
                '#C8D8F0',   // pale blue
                '#F0C890',   // peach
                '#A04058',   // rose-crimson
            ],
            useBoxMuller: true
        },

        // ── Georges Braque ────────────────────────────────────────────────────

        braque_cubist: {
            name: 'Braque — Cubism',
            artist: 'Georges Braque',
            school: 'Cubism',
            ref: 'Violin and Candlestick (1910)',
            bg: '#C8B890',
            colors: [
                '#B8A070',   // warm ochre
                '#786048',   // umber brown
                '#D0C0A0',   // pale tan
                '#504030',   // dark brown
                '#909088',   // warm gray
                '#C89870',   // golden tan
                '#383028',   // near-black brown
                '#A09070',   // mid ochre
            ],
            useBoxMuller: true
        },

        // ── Wassily Kandinsky ─────────────────────────────────────────────────

        kandinsky_bauhaus: {
            name: 'Kandinsky — Bauhaus Compositions',
            artist: 'Wassily Kandinsky',
            school: 'Expressionism',
            ref: 'Composition VIII (1923)',
            bg: '#F8F4E8',
            colors: [
                '#E01C18',   // primary red
                '#1838C0',   // primary blue
                '#F8D018',   // primary yellow
                '#181818',   // black
                '#D86818',   // orange
                '#6028A8',   // violet
                '#20A040',   // green
                '#F8F4E8',   // white-cream
            ],
            useBoxMuller: false
        },

        kandinsky_early: {
            name: 'Kandinsky — Early Expressionism',
            artist: 'Wassily Kandinsky',
            school: 'Expressionism',
            ref: 'Composition IV (1911)',
            bg: '#1A2040',
            colors: [
                '#C83020',   // red
                '#E09028',   // amber
                '#2060B8',   // blue
                '#50A040',   // green
                '#8828A0',   // purple
                '#F0C038',   // yellow
                '#E07858',   // warm coral
                '#1840C8',   // cobalt
            ],
            useBoxMuller: false
        },

        // ── Paul Klee ─────────────────────────────────────────────────────────

        klee_polyphony: {
            name: 'Klee — Colorist Period',
            artist: 'Paul Klee',
            school: 'Bauhaus',
            ref: 'Senecio (1922)',
            bg: '#282018',
            colors: [
                '#D07830',   // amber
                '#8840A0',   // purple
                '#3870A0',   // blue
                '#C8A030',   // gold
                '#C03820',   // red
                '#408040',   // green
                '#E8C870',   // pale gold
                '#602880',   // deep violet
            ],
            useBoxMuller: true
        },

        // ── Mark Rothko ───────────────────────────────────────────────────────

        rothko_classic: {
            name: 'Rothko — Color Field',
            artist: 'Mark Rothko',
            school: 'Color Field',
            ref: 'No. 61 (Rust and Blue) (1953)',
            bg: '#1C1008',
            colors: [
                '#C04018',   // rust
                '#E87018',   // burnt orange
                '#A82010',   // deep red
                '#D8A030',   // golden ochre
                '#E8C040',   // saffron
                '#801808',   // maroon
                '#F09040',   // warm orange
                '#3C1808',   // near-black red
            ],
            useBoxMuller: true
        },

        rothko_seagram: {
            name: 'Rothko — Seagram Murals',
            artist: 'Mark Rothko',
            school: 'Color Field',
            ref: 'Seagram Murals (1958–1959)',
            bg: '#100808',
            colors: [
                '#601010',   // dark maroon
                '#901818',   // deep red
                '#481010',   // very dark red
                '#A83020',   // medium red
                '#200808',   // near-black
                '#781818',   // crimson-dark
                '#C04030',   // brighter red
                '#380808',   // black-red
            ],
            useBoxMuller: true
        },

        // ── Joan Miró ─────────────────────────────────────────────────────────

        miro_surrealist: {
            name: 'Miró — Surrealist',
            artist: 'Joan Miró',
            school: 'Surrealism',
            ref: 'The Harlequin\'s Carnival (1924–1925)',
            bg: '#F0ECD8',
            colors: [
                '#E01818',   // pure red
                '#1838D0',   // pure blue
                '#F8D018',   // pure yellow
                '#181818',   // black
                '#E87820',   // orange
                '#20A038',   // green
                '#C82870',   // magenta
                '#F8ECD8',   // cream (rare highlight)
            ],
            useBoxMuller: false
        },

        // ── Georgia O'Keeffe ──────────────────────────────────────────────────

        okeeffe_desert: {
            name: 'O\'Keeffe — Desert & Bones',
            artist: 'Georgia O\'Keeffe',
            school: 'Modern Art',
            ref: 'Cow\'s Skull: Red, White, and Blue (1931)',
            bg: '#E8D8C0',
            colors: [
                '#C04818',   // rust red
                '#D89040',   // ochre
                '#506838',   // sage green
                '#7858A0',   // purple mesa
                '#E8C898',   // sand
                '#A07050',   // warm brown
                '#305880',   // sky blue
                '#F0E0C8',   // pale cream
            ],
            useBoxMuller: false
        },

        okeeffe_flowers: {
            name: 'O\'Keeffe — Flowers',
            artist: 'Georgia O\'Keeffe',
            school: 'Modern Art',
            ref: 'Red Canna (1919)',
            bg: '#F8F4F0',
            colors: [
                '#C82828',   // deep red
                '#E86848',   // coral
                '#F8B8A0',   // soft salmon
                '#F8E8D8',   // petal cream
                '#80A878',   // green leaf
                '#C05850',   // rose-red
                '#F0D8C8',   // blush
                '#A84858',   // dark rose
            ],
            useBoxMuller: true
        },

        // ── Wilfredo Lam ──────────────────────────────────────────────────────

        lam_jungle: {
            name: 'Wilfredo Lam — The Jungle',
            artist: 'Wilfredo Lam',
            school: 'Surrealism',
            ref: 'The Jungle (1943)',
            bg: '#101808',
            colors: [
                '#283A10',   // dark jungle green
                '#8C6818',   // raw ochre
                '#4A2808',   // dark root brown
                '#C8A848',   // straw gold
                '#182810',   // deepest green
                '#A88040',   // amber
                '#604020',   // mid brown
                '#E0C070',   // pale gold
            ],
            useBoxMuller: true
        },

        // ── Frida Kahlo ───────────────────────────────────────────────────────

        kahlo_vibrant: {
            name: 'Kahlo — Mexican Vibrance',
            artist: 'Frida Kahlo',
            school: 'Surrealism',
            ref: 'The Two Fridas (1939)',
            bg: '#1C3020',
            colors: [
                '#C01828',   // crimson
                '#E87820',   // orange
                '#F8C818',   // golden yellow
                '#2C7838',   // tropical green
                '#8C1878',   // magenta
                '#3058A0',   // cobalt
                '#C84830',   // red-orange
                '#F0A840',   // warm gold
            ],
            useBoxMuller: false
        },

        // ── Franz Marc ────────────────────────────────────────────────────────

        marc_blauer_reiter: {
            name: 'Franz Marc — Der Blaue Reiter',
            artist: 'Franz Marc',
            school: 'Expressionism',
            ref: 'Blue Horse I (1911)',
            bg: '#101830',
            colors: [
                '#1828B0',   // cobalt blue
                '#C82018',   // red
                '#D8B018',   // golden yellow
                '#287828',   // rich green
                '#8848A8',   // violet
                '#E08028',   // orange
                '#103878',   // deep blue
                '#50A850',   // bright green
            ],
            useBoxMuller: false
        },

        // ── Piet Mondrian ─────────────────────────────────────────────────────

        mondrian_neoplastic: {
            name: 'Mondrian — De Stijl',
            artist: 'Piet Mondrian',
            school: 'De Stijl',
            ref: 'Composition with Red, Blue, and Yellow (1930)',
            bg: '#F8F8F8',
            colors: [
                '#E01C1C',   // primary red
                '#1838D0',   // primary blue
                '#F8D018',   // primary yellow
                '#181818',   // black
                '#181818',   // black (weighted)
                '#181818',   // black (weighted)
                '#F8F8F8',   // white
                '#F8F8F8',   // white (weighted)
            ],
            useBoxMuller: false
        },

        // ── Emil Nolde ────────────────────────────────────────────────────────

        nolde_expressionist: {
            name: 'Nolde — Expressionist',
            artist: 'Emil Nolde',
            school: 'Expressionism',
            ref: 'Tropical Sun (1914)',
            bg: '#181020',
            colors: [
                '#D81818',   // crimson
                '#F87018',   // orange
                '#F8C820',   // yellow
                '#2878A8',   // cerulean
                '#3C1870',   // deep purple
                '#E85888',   // hot pink
                '#E04820',   // red-orange
                '#1840A0',   // deep blue
            ],
            useBoxMuller: false
        },

        // ── Cy Twombly ────────────────────────────────────────────────────────

        twombly_gestural: {
            name: 'Twombly — Gestural',
            artist: 'Cy Twombly',
            school: 'Abstract Expressionism',
            ref: 'Untitled (Roman Notes) (1970)',
            bg: '#F2EDE0',
            colors: [
                '#E8E0C8',   // aged cream
                '#D0C0A0',   // warm tan
                '#A89880',   // gray-brown
                '#484038',   // dark warm gray
                '#787060',   // mid warm gray
                '#C8B898',   // pale umber
                '#282018',   // near-black warm
                '#B8A888',   // dusty
            ],
            useBoxMuller: true
        },

        // ── Helen Frankenthaler ───────────────────────────────────────────────

        frankenthaler_stained: {
            name: 'Frankenthaler — Stained Fields',
            artist: 'Helen Frankenthaler',
            school: 'Color Field',
            ref: 'Mountains and Sea (1952)',
            bg: '#F5F0E8',
            colors: [
                '#A8C8E0',   // cerulean wash
                '#E0B0A8',   // dusty rose
                '#B8D8B8',   // mint
                '#E8D8A8',   // warm cream
                '#C8A8D8',   // lavender
                '#A8C0A0',   // soft sage
                '#D8B8C0',   // blush
                '#C0D0E8',   // sky wash
            ],
            useBoxMuller: true
        },

        // ── Jackson Pollock ───────────────────────────────────────────────────

        pollock_drip: {
            name: 'Pollock — Drip Paintings',
            artist: 'Jackson Pollock',
            school: 'Abstract Expressionism',
            ref: 'Number 31 (1950)',
            bg: '#E8E0D0',
            colors: [
                '#181818',   // black
                '#E8E0D0',   // raw canvas/cream
                '#8C6030',   // umber
                '#C0A880',   // tan
                '#484038',   // dark gray-brown
                '#C83818',   // red accent
                '#D0C0A0',   // pale tan
                '#303028',   // dark neutral
            ],
            useBoxMuller: true
        },

        // ── Jean-Michel Basquiat ──────────────────────────────────────────────

        basquiat_raw: {
            name: 'Basquiat — Raw Urban',
            artist: 'Jean-Michel Basquiat',
            school: 'Neo-Expressionism',
            ref: 'Hollywood Africans (1983)',
            bg: '#101010',
            colors: [
                '#181818',   // black
                '#E81818',   // raw red
                '#F8D018',   // yellow
                '#1840C0',   // blue
                '#E86818',   // orange
                '#F8F0E0',   // white-cream
                '#A81818',   // dark red
                '#F0C020',   // golden
            ],
            useBoxMuller: false
        },

        // ── Paul Gauguin ──────────────────────────────────────────────────────

        gauguin_tahiti: {
            name: 'Gauguin — Tahitian',
            artist: 'Paul Gauguin',
            school: 'Post-Impressionism',
            ref: 'Where Do We Come From? What Are We? Where Are We Going? (1897–1898)',
            bg: '#3C2810',
            colors: [
                '#C87830',   // warm orange
                '#701818',   // deep red
                '#308050',   // tropical green
                '#C8A030',   // golden ochre
                '#8C4018',   // rust brown
                '#E8B860',   // pale gold
                '#285038',   // dark tropical green
                '#D89050',   // amber
            ],
            useBoxMuller: false
        },

        // ── Egon Schiele ──────────────────────────────────────────────────────

        schiele_expressionist: {
            name: 'Schiele — Viennese Expressionism',
            artist: 'Egon Schiele',
            school: 'Expressionism',
            ref: 'The Embrace (1917)',
            bg: '#E8D8B8',
            colors: [
                '#C07030',   // burnt flesh orange
                '#183058',   // prussian blue
                '#181818',   // black line
                '#C03818',   // deep burnt orange
                '#E8C898',   // pale flesh
                '#604820',   // warm umber
                '#A83020',   // dark rust
                '#D0A870',   // golden flesh
            ],
            useBoxMuller: false
        },

        // ── Yayoi Kusama ──────────────────────────────────────────────────────

        kusama_infinity: {
            name: 'Kusama — Infinity Rooms',
            artist: 'Yayoi Kusama',
            school: 'Avant-Garde',
            ref: 'Infinity Mirror Room—Phalli\'s Field (1965)',
            bg: '#080808',
            colors: [
                '#E81850',   // hot pink
                '#F8C818',   // yellow
                '#1890D8',   // cyan
                '#E84820',   // red-orange
                '#A818D8',   // purple
                '#18C870',   // green
                '#F8F818',   // bright yellow
                '#E81890',   // magenta
            ],
            useBoxMuller: false
        },

        // ── Lee Krasner ───────────────────────────────────────────────────────

        krasner_abstract: {
            name: 'Krasner — Abstract Expressionism',
            artist: 'Lee Krasner',
            school: 'Abstract Expressionism',
            ref: 'The Seasons (1957)',
            bg: '#101810',
            colors: [
                '#508030',   // forest green
                '#C85820',   // burnt orange
                '#183058',   // deep blue
                '#D0A830',   // ochre
                '#782858',   // deep rose
                '#38A048',   // vivid green
                '#C03020',   // red
                '#D8C070',   // pale gold
            ],
            useBoxMuller: false
        },

        // ── Franz Kline ───────────────────────────────────────────────────────

        kline_blackwhite: {
            name: 'Kline — Black & White',
            artist: 'Franz Kline',
            school: 'Abstract Expressionism',
            ref: 'Chief (1950)',
            bg: '#F0EEE8',
            colors: [
                '#181818',   // gestural black
                '#181818',   // black (weighted)
                '#181818',   // black (weighted)
                '#303030',   // dark gray
                '#F0EEE8',   // canvas white
                '#F0EEE8',   // white (weighted)
                '#888880',   // mid gray
                '#101010',   // near-black
            ],
            useBoxMuller: true
        },

        // ── Willem de Kooning ─────────────────────────────────────────────────

        dekooning_women: {
            name: 'de Kooning — Women Series',
            artist: 'Willem de Kooning',
            school: 'Abstract Expressionism',
            ref: 'Woman I (1950–1952)',
            bg: '#E8D8C0',
            colors: [
                '#D87858',   // salmon flesh
                '#C03820',   // slashing red
                '#F0C890',   // pale flesh
                '#3870A8',   // industrial blue
                '#808060',   // gray-green
                '#E8A060',   // warm orange-flesh
                '#183060',   // deep blue
                '#B06040',   // brown flesh
            ],
            useBoxMuller: false
        },

        // ── Clyfford Still ────────────────────────────────────────────────────

        still_clyfford: {
            name: 'Clyfford Still — Color Fields',
            artist: 'Clyfford Still',
            school: 'Color Field',
            ref: 'PH-950, 1957-D No.1 (1950s)',
            bg: '#100808',
            colors: [
                '#C84010',   // jagged burnt orange
                '#901808',   // dark red
                '#D8A020',   // golden ochre
                '#181010',   // near-black
                '#E8C040',   // vivid yellow
                '#601010',   // deep maroon
                '#F0A030',   // amber
                '#2C1808',   // very dark warm
            ],
            useBoxMuller: false
        },

        // ── Robert Motherwell ─────────────────────────────────────────────────

        motherwell_elegy: {
            name: 'Motherwell — Elegy to the Spanish Republic',
            artist: 'Robert Motherwell',
            school: 'Abstract Expressionism',
            ref: 'Elegy to the Spanish Republic No. 34 (1953–1954)',
            bg: '#F0EAD8',
            colors: [
                '#181818',   // black oval
                '#181818',   // black (weighted)
                '#101010',   // deep black
                '#F0EAD8',   // raw canvas
                '#F0EAD8',   // canvas (weighted)
                '#C09858',   // ochre accent
                '#383030',   // dark gray
                '#D8C8A8',   // warm off-white
            ],
            useBoxMuller: true
        },

        // ── Sam Francis ───────────────────────────────────────────────────────

        francis_splash: {
            name: 'Sam Francis — Splashed Color',
            artist: 'Sam Francis',
            school: 'Abstract Expressionism',
            ref: 'Big Red (1953)',
            bg: '#F8F8F8',
            colors: [
                '#E01818',   // pure red
                '#1840C8',   // cobalt
                '#F8C818',   // cadmium yellow
                '#18B870',   // emerald
                '#E87820',   // orange
                '#9818C8',   // violet
                '#F8F8F8',   // white void
                '#18A8D8',   // cyan
            ],
            useBoxMuller: false
        },

        // ── Joan Mitchell ─────────────────────────────────────────────────────

        mitchell_gestural: {
            name: 'Joan Mitchell — Gestural Abstract',
            artist: 'Joan Mitchell',
            school: 'Abstract Expressionism',
            ref: 'Ladybug (1957)',
            bg: '#F0EEE0',
            colors: [
                '#3870A0',   // cerulean
                '#50A850',   // summer green
                '#D8C020',   // yellow-green
                '#C84030',   // red
                '#8858A8',   // violet
                '#F8C030',   // golden
                '#1850A8',   // deep blue
                '#78C060',   // vivid green
            ],
            useBoxMuller: false
        },

        // ── Philip Guston ─────────────────────────────────────────────────────

        guston_pink: {
            name: 'Guston — Late Figurative',
            artist: 'Philip Guston',
            school: 'Abstract Expressionism',
            ref: 'The Studio (1969)',
            bg: '#F0D8C8',
            colors: [
                '#E89880',   // pink flesh
                '#D85030',   // red
                '#C8A898',   // dusty pink
                '#484840',   // dark gray-green
                '#E0B0A0',   // pale pink
                '#901818',   // dark red
                '#F8D0C0',   // blush
                '#383030',   // near-black
            ],
            useBoxMuller: true
        },

        // ── Salvador Dalí ─────────────────────────────────────────────────────

        dali_desert: {
            name: 'Dalí — Surrealist Landscapes',
            artist: 'Salvador Dalí',
            school: 'Surrealism',
            ref: 'The Persistence of Memory (1931)',
            bg: '#D8C890',
            colors: [
                '#D0A838',   // desert gold
                '#8C6020',   // sandy brown
                '#3868B0',   // deep sky blue
                '#C89050',   // ochre
                '#E8D898',   // pale sand
                '#2048A0',   // cerulean blue
                '#A87840',   // warm tan
                '#183070',   // shadow blue
            ],
            useBoxMuller: false
        },

        // ── René Magritte ─────────────────────────────────────────────────────

        magritte_sky: {
            name: 'Magritte — Metaphysical',
            artist: 'René Magritte',
            school: 'Surrealism',
            ref: 'The Son of Man (1964)',
            bg: '#90B8D8',
            colors: [
                '#90B8D8',   // day sky blue
                '#F8F8F8',   // cloud white
                '#182840',   // night black
                '#388038',   // Granny Smith apple green
                '#8C5830',   // suit brown
                '#C8E0F0',   // pale sky
                '#203858',   // night sky
                '#F0EEE0',   // pale light
            ],
            useBoxMuller: false
        },

        // ── Max Ernst ─────────────────────────────────────────────────────────

        ernst_frottage: {
            name: 'Ernst — Surrealist Textures',
            artist: 'Max Ernst',
            school: 'Surrealism',
            ref: 'Europe After the Rain II (1940–1942)',
            bg: '#A89878',
            colors: [
                '#786040',   // umber
                '#3A5828',   // forest
                '#A08058',   // warm tan
                '#282018',   // dark brown
                '#C8A868',   // golden
                '#504838',   // dark neutral
                '#887858',   // gray-tan
                '#181810',   // near-black
            ],
            useBoxMuller: true
        },

        // ── Giorgio de Chirico ────────────────────────────────────────────────

        dechirico_arcades: {
            name: 'de Chirico — Metaphysical',
            artist: 'Giorgio de Chirico',
            school: 'Metaphysical Art',
            ref: 'Mystery and Melancholy of a Street (1914)',
            bg: '#C0A860',
            colors: [
                '#C89840',   // golden afternoon
                '#8C5820',   // shadow ochre
                '#1A3080',   // prussian blue shadow
                '#E8C870',   // sunlit wall
                '#3A2A18',   // dark archway
                '#D8A840',   // warm orange
                '#506888',   // cool shadow
                '#F0D890',   // pale sun
            ],
            useBoxMuller: false
        },

        // ── Ernst Ludwig Kirchner ─────────────────────────────────────────────

        kirchner_brucke: {
            name: 'Kirchner — Die Brücke',
            artist: 'Ernst Ludwig Kirchner',
            school: 'Expressionism',
            ref: 'Street, Berlin (1913)',
            bg: '#181018',
            colors: [
                '#C81838',   // harsh crimson
                '#E87820',   // vivid orange
                '#183888',   // prussian blue
                '#F0C018',   // acid yellow
                '#7818A8',   // purple
                '#38A038',   // unnatural green
                '#E84878',   // hot pink
                '#C83018',   // red-orange
            ],
            useBoxMuller: false
        },

        // ── Oskar Kokoschka ───────────────────────────────────────────────────

        kokoschka_portrait: {
            name: 'Kokoschka — Expressionist Portraits',
            artist: 'Oskar Kokoschka',
            school: 'Expressionism',
            ref: 'The Bride of the Wind (1914)',
            bg: '#283848',
            colors: [
                '#2870A0',   // blue-green
                '#D06040',   // flesh
                '#C03828',   // red
                '#88B0C8',   // pale blue
                '#E8A870',   // warm flesh
                '#385870',   // deep teal
                '#C88060',   // salmon
                '#184860',   // dark blue-green
            ],
            useBoxMuller: false
        },

        // ── Max Beckmann ──────────────────────────────────────────────────────

        beckmann_triptych: {
            name: 'Beckmann — Triptychs',
            artist: 'Max Beckmann',
            school: 'Expressionism',
            ref: 'Departure (1932–1935)',
            bg: '#181010',
            colors: [
                '#C03820',   // red
                '#D8A030',   // ochre
                '#183870',   // blue
                '#E8C870',   // golden
                '#381808',   // very dark
                '#888070',   // warm gray
                '#C87840',   // amber
                '#282828',   // near-black
            ],
            useBoxMuller: false
        },

        // ── André Derain ──────────────────────────────────────────────────────

        derain_fauvist: {
            name: 'Derain — Fauvism',
            artist: 'André Derain',
            school: 'Fauvism',
            ref: 'London Bridge (1906)',
            bg: '#F8E8C0',
            colors: [
                '#CC2820',   // vermillion
                '#E87010',   // orange
                '#1868A8',   // blue
                '#50A030',   // green
                '#F8C820',   // yellow
                '#A82818',   // deep red
                '#28A8A0',   // teal
                '#E09030',   // warm orange
            ],
            useBoxMuller: false
        },

        // ── Raoul Dufy ────────────────────────────────────────────────────────

        dufy_regatta: {
            name: 'Dufy — Maritime & Regatta',
            artist: 'Raoul Dufy',
            school: 'Fauvism',
            ref: 'Regatta at Cowes (1934)',
            bg: '#D8EAF8',
            colors: [
                '#2880D0',   // regatta blue
                '#F8F8F8',   // sail white
                '#D81818',   // signal red
                '#88B8D8',   // pale sky blue
                '#F8C010',   // golden sun
                '#183880',   // deep navy
                '#C8E0F0',   // light sky
                '#E8A820',   // warm accent
            ],
            useBoxMuller: true
        },

        // ── Vincent van Gogh ──────────────────────────────────────────────────

        vangogh_starry: {
            name: 'Van Gogh — Starry Night',
            artist: 'Vincent van Gogh',
            school: 'Post-Impressionism',
            ref: 'The Starry Night (1889)',
            bg: '#0C1A38',
            colors: [
                '#1838A0',   // midnight blue
                '#F8D820',   // swirling yellow star
                '#2858B8',   // cobalt blue
                '#F8F050',   // bright yellow
                '#103070',   // deep night
                '#3878C8',   // blue-indigo
                '#F0B018',   // golden moon
                '#0A1428',   // darkest night
            ],
            useBoxMuller: false
        },

        vangogh_sunflowers: {
            name: 'Van Gogh — Sunflowers',
            artist: 'Vincent van Gogh',
            school: 'Post-Impressionism',
            ref: 'Sunflowers (1888)',
            bg: '#D8C030',
            colors: [
                '#F8C010',   // cadmium yellow
                '#D89010',   // golden ochre
                '#C06810',   // burnt orange center
                '#F8E060',   // pale yellow
                '#804010',   // dark brown
                '#E8A020',   // amber
                '#F8D840',   // bright yellow
                '#603008',   // dark umber
            ],
            useBoxMuller: false
        },

        // ── Paul Cézanne ──────────────────────────────────────────────────────

        cezanne_provence: {
            name: 'Cézanne — Provence',
            artist: 'Paul Cézanne',
            school: 'Post-Impressionism',
            ref: 'Mont Sainte-Victoire (c. 1904–1906)',
            bg: '#D0C8A8',
            colors: [
                '#8C6840',   // warm tan
                '#5878A0',   // blue-gray
                '#A07840',   // ochre
                '#4A6838',   // olive green
                '#C0A870',   // pale stone
                '#784830',   // terra cotta
                '#9898A8',   // cool gray
                '#C08848',   // warm golden
            ],
            useBoxMuller: true
        },

        // ── Marc Chagall ──────────────────────────────────────────────────────

        chagall_village: {
            name: 'Chagall — Village Fantasy',
            artist: 'Marc Chagall',
            school: 'Expressionism',
            ref: 'I and the Village (1911)',
            bg: '#101838',
            colors: [
                '#1848A8',   // deep blue
                '#C81828',   // red
                '#F8C818',   // golden yellow
                '#28A850',   // green
                '#D878A8',   // rose-pink
                '#9828C8',   // violet
                '#F8A820',   // warm orange
                '#2870D0',   // bright blue
            ],
            useBoxMuller: false
        },

        // ── Amedeo Modigliani ─────────────────────────────────────────────────

        modigliani_nudes: {
            name: 'Modigliani — Elongated Figures',
            artist: 'Amedeo Modigliani',
            school: 'Expressionism',
            ref: 'Reclining Nude (1917–1918)',
            bg: '#D8C0A0',
            colors: [
                '#D89068',   // warm flesh
                '#A86040',   // deep flesh
                '#1A3060',   // background blue
                '#E8B888',   // pale skin
                '#784830',   // shadow brown
                '#C07850',   // medium flesh
                '#3858A0',   // cool blue
                '#F0C898',   // highlight flesh
            ],
            useBoxMuller: true
        },

        // ── Chaïm Soutine ─────────────────────────────────────────────────────

        soutine_impasto: {
            name: 'Soutine — Impasto',
            artist: 'Chaïm Soutine',
            school: 'Expressionism',
            ref: 'Side of Beef (1925)',
            bg: '#180808',
            colors: [
                '#C01010',   // raw meat red
                '#E84018',   // blood orange
                '#901010',   // deep crimson
                '#D88040',   // flesh amber
                '#400808',   // very dark red
                '#C83020',   // red
                '#E07050',   // warm flesh
                '#200808',   // near-black red
            ],
            useBoxMuller: false
        },

        // ── Kazimir Malevich ──────────────────────────────────────────────────

        malevich_suprematism: {
            name: 'Malevich — Suprematism',
            artist: 'Kazimir Malevich',
            school: 'Suprematism',
            ref: 'Black Square (1915)',
            bg: '#F8F8F8',
            colors: [
                '#181818',   // black square
                '#E01818',   // red
                '#1838D8',   // blue
                '#F8D818',   // yellow
                '#181818',   // black (weighted)
                '#F8F8F8',   // white
                '#C83018',   // dark red
                '#303030',   // dark gray
            ],
            useBoxMuller: false
        },

        // ── El Lissitzky ──────────────────────────────────────────────────────

        lissitzky_proun: {
            name: 'El Lissitzky — Proun',
            artist: 'El Lissitzky',
            school: 'Constructivism',
            ref: 'Proun 19D (c. 1920–1921)',
            bg: '#F0EEE8',
            colors: [
                '#C81818',   // constructivist red
                '#181818',   // black
                '#888880',   // gray
                '#F0EEE8',   // white
                '#C81818',   // red (weighted)
                '#181818',   // black (weighted)
                '#606060',   // dark gray
                '#D0C8B8',   // off-white
            ],
            useBoxMuller: false
        },

        // ── Natalia Goncharova ────────────────────────────────────────────────

        goncharova_folk: {
            name: 'Goncharova — Russian Avant-Garde',
            artist: 'Natalia Goncharova',
            school: 'Russian Avant-Garde',
            ref: 'The Cyclist (1913)',
            bg: '#E8D8B0',
            colors: [
                '#C82018',   // red
                '#F8B818',   // golden yellow
                '#282870',   // deep blue
                '#38A038',   // green
                '#E87820',   // orange
                '#881888',   // magenta-purple
                '#C8A018',   // ochre
                '#183888',   // prussian
            ],
            useBoxMuller: false
        },

        // ── Lyubov Popova ─────────────────────────────────────────────────────

        popova_constructivist: {
            name: 'Popova — Constructivism',
            artist: 'Lyubov Popova',
            school: 'Constructivism',
            ref: 'Painterly Architectonic (1917)',
            bg: '#F0EAD8',
            colors: [
                '#C81818',   // red
                '#181818',   // black
                '#183898',   // blue
                '#F8C818',   // yellow
                '#888880',   // gray
                '#C83018',   // orange-red
                '#303030',   // dark
                '#F0EAD8',   // cream
            ],
            useBoxMuller: false
        },

        // ── Josef Albers ──────────────────────────────────────────────────────

        albers_squares: {
            name: 'Albers — Homage to the Square',
            artist: 'Josef Albers',
            school: 'Bauhaus',
            ref: 'Homage to the Square: Ascending (1953)',
            bg: '#E88030',
            colors: [
                '#E88030',   // outer orange
                '#D86818',   // middle orange-red
                '#C84810',   // inner burnt
                '#F0A848',   // pale outer
                '#B83808',   // dark inner
                '#F8C068',   // light warm
                '#A82808',   // deepest
                '#E07028',   // mid warm
            ],
            useBoxMuller: true
        },

        // ── László Moholy-Nagy ────────────────────────────────────────────────

        moholy_bauhaus: {
            name: 'Moholy-Nagy — Bauhaus',
            artist: 'László Moholy-Nagy',
            school: 'Bauhaus',
            ref: 'Space Modulator L3 (1936)',
            bg: '#F8F8F8',
            colors: [
                '#181818',   // black
                '#D81818',   // red
                '#F8F8F8',   // white
                '#888888',   // gray
                '#F8D018',   // yellow
                '#1838D8',   // blue
                '#C0C0C0',   // silver
                '#303030',   // dark gray
            ],
            useBoxMuller: false
        },

        // ── Diego Rivera ──────────────────────────────────────────────────────

        rivera_mural: {
            name: 'Rivera — Mexican Muralism',
            artist: 'Diego Rivera',
            school: 'Mexican Muralism',
            ref: 'Detroit Industry Murals (1932–1933)',
            bg: '#2A3810',
            colors: [
                '#8C5818',   // earth ochre
                '#C83018',   // red
                '#2858A8',   // blue
                '#D8A020',   // golden
                '#3C6820',   // deep green
                '#A87030',   // warm brown
                '#183870',   // deep blue
                '#E8C048',   // gold
            ],
            useBoxMuller: false
        },

        // ── Tarsila do Amaral ─────────────────────────────────────────────────

        tarsila_tropical: {
            name: 'Tarsila do Amaral — Pau-Brasil',
            artist: 'Tarsila do Amaral',
            school: 'Brazilian Modernism',
            ref: 'Abaporu (1928)',
            bg: '#3C7838',
            colors: [
                '#E8C030',   // tropical yellow
                '#C03828',   // Brazil red
                '#3878C8',   // sky blue
                '#50A040',   // vivid green
                '#E87818',   // orange
                '#D8A840',   // golden
                '#2860A8',   // deep sky
                '#78C048',   // bright tropical green
            ],
            useBoxMuller: false
        },

        // ── Roberto Matta ─────────────────────────────────────────────────────

        matta_cosmic: {
            name: 'Matta — Cosmic Surrealism',
            artist: 'Roberto Matta',
            school: 'Surrealism',
            ref: 'Psychological Morphology No. 104 (1938)',
            bg: '#080818',
            colors: [
                '#1840C8',   // cosmic blue
                '#C01888',   // magenta
                '#18B8A8',   // teal
                '#D81818',   // red
                '#8818D8',   // deep violet
                '#18D8A8',   // cyan
                '#F0A818',   // amber
                '#0820B0',   // deep blue
            ],
            useBoxMuller: false
        },

        // ── Roy Lichtenstein ──────────────────────────────────────────────────

        lichtenstein_comic: {
            name: 'Lichtenstein — Pop / Comic',
            artist: 'Roy Lichtenstein',
            school: 'Pop Art',
            ref: 'Whaam! (1963)',
            bg: '#F8F8F8',
            colors: [
                '#E01818',   // primary red
                '#F8D018',   // primary yellow
                '#1838D0',   // primary blue
                '#181818',   // Ben-Day outline black
                '#F8F8F8',   // white
                '#E01818',   // red (weighted)
                '#1838D0',   // blue (weighted)
                '#181818',   // black (weighted)
            ],
            useBoxMuller: false
        },

        // ── Andy Warhol ───────────────────────────────────────────────────────

        warhol_silkscreen: {
            name: 'Warhol — Silkscreen Pop',
            artist: 'Andy Warhol',
            school: 'Pop Art',
            ref: 'Marilyn Diptych (1962)',
            bg: '#F8E818',
            colors: [
                '#F8E818',   // yellow background
                '#E81888',   // hot pink
                '#18B8E8',   // cyan
                '#E81818',   // red
                '#1818E8',   // blue
                '#E888D8',   // lavender
                '#F8A818',   // orange
                '#181818',   // black
            ],
            useBoxMuller: false
        },

        // ── James Rosenquist ──────────────────────────────────────────────────

        rosenquist_billboard: {
            name: 'Rosenquist — Billboard Scale',
            artist: 'James Rosenquist',
            school: 'Pop Art',
            ref: 'F-111 (1964–1965)',
            bg: '#F0F0F0',
            colors: [
                '#C81818',   // billboard red
                '#F8D018',   // yellow
                '#48A8D8',   // sky blue
                '#F09070',   // flesh
                '#383838',   // dark
                '#D8E8F8',   // pale blue
                '#E87040',   // orange-flesh
                '#287898',   // deep sky
            ],
            useBoxMuller: false
        },

        // ── Bridget Riley ─────────────────────────────────────────────────────

        riley_optical: {
            name: 'Riley — Op Art',
            artist: 'Bridget Riley',
            school: 'Op Art',
            ref: 'Movement in Squares (1961)',
            bg: '#F8F8F8',
            colors: [
                '#181818',   // black
                '#F8F8F8',   // white
                '#181818',   // black (weighted)
                '#F8F8F8',   // white (weighted)
                '#484848',   // gray
                '#D8D8D8',   // light gray
                '#080808',   // near-black
                '#E8E8E8',   // near-white
            ],
            useBoxMuller: true
        },

        riley_color: {
            name: 'Riley — Color Op Art',
            artist: 'Bridget Riley',
            school: 'Op Art',
            ref: 'Chant 2 (1967)',
            bg: '#F8F8E8',
            colors: [
                '#E81818',   // red stripe
                '#F8C018',   // yellow
                '#1878D0',   // blue
                '#20B858',   // green
                '#E86818',   // orange
                '#8820D0',   // violet
                '#18C8C8',   // teal
                '#F8E018',   // bright yellow
            ],
            useBoxMuller: false
        },

        // ── Victor Vasarely ───────────────────────────────────────────────────

        vasarely_kinetic: {
            name: 'Vasarely — Kinetic / Op',
            artist: 'Victor Vasarely',
            school: 'Op Art',
            ref: 'Zebra (1938)',
            bg: '#101010',
            colors: [
                '#181818',   // black
                '#F8F8F8',   // white
                '#D81818',   // red
                '#F8C818',   // yellow
                '#1838D8',   // blue
                '#F8F8F8',   // white (weighted)
                '#181818',   // black (weighted)
                '#C0C0C0',   // silver
            ],
            useBoxMuller: false
        },

        // ── Kenneth Noland ────────────────────────────────────────────────────

        noland_targets: {
            name: 'Noland — Target Paintings',
            artist: 'Kenneth Noland',
            school: 'Color Field',
            ref: 'Turnsole (1961)',
            bg: '#F8F8F8',
            colors: [
                '#C81818',   // red ring
                '#F8C018',   // yellow ring
                '#1838D0',   // blue ring
                '#18A840',   // green ring
                '#E87018',   // orange ring
                '#8818A8',   // purple ring
                '#F8F8F8',   // white ground
                '#181818',   // black ring
            ],
            useBoxMuller: false
        },

        // ── Morris Louis ──────────────────────────────────────────────────────

        louis_veils: {
            name: 'Morris Louis — Veils & Unfurleds',
            artist: 'Morris Louis',
            school: 'Color Field',
            ref: 'Alpha-Phi (1961)',
            bg: '#F0EEE8',
            colors: [
                '#3870B8',   // cerulean veil
                '#D82818',   // red veil
                '#F8C018',   // yellow veil
                '#208848',   // green veil
                '#9028A8',   // violet veil
                '#E87018',   // orange veil
                '#18A8C8',   // teal veil
                '#C81858',   // rose veil
            ],
            useBoxMuller: false
        },

        // ── Ellsworth Kelly ───────────────────────────────────────────────────

        kelly_hardedge: {
            name: 'Kelly — Hard-Edge Color',
            artist: 'Ellsworth Kelly',
            school: 'Hard-Edge',
            ref: 'Spectrum (1953)',
            bg: '#F8F8F8',
            colors: [
                '#E01818',   // red panel
                '#F8C018',   // yellow panel
                '#1838D8',   // blue panel
                '#18A840',   // green panel
                '#E87018',   // orange panel
                '#181818',   // black panel
                '#8818A8',   // violet panel
                '#18B8D8',   // cyan panel
            ],
            useBoxMuller: false
        },

        // ── Ad Reinhardt ──────────────────────────────────────────────────────

        reinhardt_ultimate: {
            name: 'Reinhardt — Ultimate Paintings',
            artist: 'Ad Reinhardt',
            school: 'Abstract Expressionism',
            ref: 'Abstract Painting (1960–1966)',
            bg: '#080808',
            colors: [
                '#101010',   // near-black
                '#181818',   // dark
                '#0C0C14',   // blue-black
                '#140C0C',   // red-black
                '#0C140C',   // green-black
                '#141414',   // mid dark
                '#080810',   // deepest blue-black
                '#100808',   // deepest red-black
            ],
            useBoxMuller: true
        },

        // ── Stuart Davis ──────────────────────────────────────────────────────

        davis_jazz: {
            name: 'Stuart Davis — Jazz Modernism',
            artist: 'Stuart Davis',
            school: 'American Modernism',
            ref: 'Lucky Strike (1921)',
            bg: '#181828',
            colors: [
                '#D81818',   // red
                '#F8C818',   // yellow
                '#1838D0',   // blue
                '#18A840',   // green
                '#E87818',   // orange
                '#C81888',   // magenta
                '#F8F8F8',   // white
                '#181818',   // black
            ],
            useBoxMuller: false
        },

        // ── Marsden Hartley ───────────────────────────────────────────────────

        hartley_emblems: {
            name: 'Hartley — Emblematic Abstractions',
            artist: 'Marsden Hartley',
            school: 'American Modernism',
            ref: 'Portrait of a German Officer (1914)',
            bg: '#181018',
            colors: [
                '#C81818',   // red
                '#181818',   // black
                '#F8C018',   // gold
                '#1838A8',   // deep blue
                '#F8F8F8',   // white
                '#E87018',   // orange
                '#288838',   // green
                '#881888',   // purple
            ],
            useBoxMuller: false
        },

        // ── Wayne Thiebaud ────────────────────────────────────────────────────

        thiebaud_cakes: {
            name: 'Thiebaud — Pastry & Desserts',
            artist: 'Wayne Thiebaud',
            school: 'Figurative Realism',
            ref: 'Cakes, Pies, Lollipops (1961–1970)',
            bg: '#F8F0E8',
            colors: [
                '#F0B8C8',   // frosting pink
                '#F8E8A0',   // custard yellow
                '#D0E8F8',   // pale blue frosting
                '#E8B0A0',   // peach
                '#F8D8B0',   // cream
                '#C8A0D0',   // lavender frosting
                '#F8C8C0',   // blush
                '#E0F0C8',   // mint frosting
            ],
            useBoxMuller: true
        },

        // ── Alex Katz ─────────────────────────────────────────────────────────

        katz_flat: {
            name: 'Katz — Flat Figuration',
            artist: 'Alex Katz',
            school: 'Figurative',
            ref: 'Ada Ada (1959)',
            bg: '#D8E8F0',
            colors: [
                '#3878C0',   // clear sky blue
                '#C03020',   // red coat
                '#F8E8C0',   // flesh light
                '#D8A878',   // warm tan
                '#185888',   // deep sky
                '#E8C898',   // pale flesh
                '#481818',   // dark flesh shadow
                '#90C8E0',   // pale blue
            ],
            useBoxMuller: false
        },

        // ── Jasper Johns ──────────────────────────────────────────────────────

        johns_targets: {
            name: 'Johns — Flags & Targets',
            artist: 'Jasper Johns',
            school: 'Neo-Dada',
            ref: 'Flag (1954–1955)',
            bg: '#D0C0A0',
            colors: [
                '#C01818',   // red stripes
                '#F0E8C8',   // encaustic cream
                '#183870',   // blue canton
                '#F8E8D8',   // pale wax
                '#C89048',   // ochre encaustic
                '#888070',   // warm gray
                '#A06038',   // burnt umber
                '#F8F0E0',   // lightest wax
            ],
            useBoxMuller: true
        },

        // ── Robert Rauschenberg ───────────────────────────────────────────────

        rauschenberg_combine: {
            name: 'Rauschenberg — Combines',
            artist: 'Robert Rauschenberg',
            school: 'Neo-Dada',
            ref: 'Monogram (1955–1959)',
            bg: '#E8E0D0',
            colors: [
                '#C04020',   // red fragment
                '#3060A0',   // blue
                '#808070',   // newsprint gray
                '#D0B870',   // tan cardboard
                '#181818',   // black
                '#A89060',   // warm paper
                '#E89050',   // orange found
                '#404840',   // dark neutral
            ],
            useBoxMuller: false
        },

        // ── Francis Bacon ─────────────────────────────────────────────────────

        bacon_figure: {
            name: 'Bacon — Distorted Figures',
            artist: 'Francis Bacon',
            school: 'Figurative Expressionism',
            ref: 'Three Studies for Figures at the Base of a Crucifixion (1944)',
            bg: '#C05020',
            colors: [
                '#C05020',   // orange ground
                '#E08040',   // flesh orange
                '#181010',   // near-black
                '#903018',   // dark orange-red
                '#D09060',   // warm flesh
                '#681808',   // very dark red
                '#F0A860',   // highlight flesh
                '#380808',   // darkest
            ],
            useBoxMuller: false
        },

        // ── Lucian Freud ──────────────────────────────────────────────────────

        freud_flesh: {
            name: 'Freud — Flesh & Paint',
            artist: 'Lucian Freud',
            school: 'Figurative',
            ref: 'Benefits Supervisor Sleeping (1995)',
            bg: '#D8C8A8',
            colors: [
                '#C89068',   // warm paint flesh
                '#E0B080',   // light flesh
                '#988060',   // shadow flesh
                '#D0A878',   // mid flesh
                '#786048',   // warm shadow
                '#E8C898',   // highlight
                '#B07858',   // deep flesh
                '#A87860',   // neutral flesh
            ],
            useBoxMuller: true
        },

        // ── Howard Hodgkin ────────────────────────────────────────────────────

        hodgkin_memory: {
            name: 'Hodgkin — Memory Paintings',
            artist: 'Howard Hodgkin',
            school: 'Abstract Expressionism',
            ref: 'After Visiting David Hockney (1991–1992)',
            bg: '#283048',
            colors: [
                '#E87018',   // orange
                '#3870A8',   // blue
                '#C01840',   // deep rose
                '#F8C018',   // golden
                '#28A858',   // emerald
                '#8818A8',   // violet
                '#E83818',   // red-orange
                '#18A8B8',   // teal
            ],
            useBoxMuller: false
        },

        // ── Romare Bearden ────────────────────────────────────────────────────

        bearden_collage: {
            name: 'Bearden — Jazz Collage',
            artist: 'Romare Bearden',
            school: 'African-American Modernism',
            ref: 'Patchwork Quilt (1970)',
            bg: '#101828',
            colors: [
                '#1840A8',   // deep blue
                '#C83020',   // red
                '#F8C020',   // golden
                '#3A7830',   // green
                '#D07840',   // amber flesh
                '#8828A8',   // purple
                '#E0A040',   // warm gold
                '#181830',   // near-black
            ],
            useBoxMuller: false
        },

        // ── Jacob Lawrence ────────────────────────────────────────────────────

        lawrence_migration: {
            name: 'Jacob Lawrence — Migration Series',
            artist: 'Jacob Lawrence',
            school: 'Harlem Renaissance',
            ref: 'The Migration Series (1940–1941)',
            bg: '#181018',
            colors: [
                '#C82018',   // red
                '#F8B818',   // yellow
                '#1838A8',   // blue
                '#2A7830',   // green
                '#181818',   // black
                '#E88020',   // orange
                '#D8D020',   // bright yellow
                '#C8A818',   // golden
            ],
            useBoxMuller: false
        },

        // ── Arthur Dove ───────────────────────────────────────────────────────

        dove_american: {
            name: 'Arthur Dove — American Abstraction',
            artist: 'Arthur Dove',
            school: 'American Abstraction',
            ref: 'Nature Symbolized No. 2 (1911)',
            bg: '#404830',
            colors: [
                '#A0A028',   // yellow-olive
                '#506838',   // deep olive
                '#D0A020',   // golden
                '#304838',   // forest green
                '#C87820',   // amber
                '#686840',   // khaki
                '#E8B820',   // warm yellow
                '#283828',   // very dark green
            ],
            useBoxMuller: true
        },

        // ── Gerhard Richter ───────────────────────────────────────────────────

        richter_squeegee: {
            name: 'Richter — Abstract Squeegee',
            artist: 'Gerhard Richter',
            school: 'Neo-Expressionism',
            ref: 'Abstract Picture 599 (1986)',
            bg: '#F0EEE8',
            colors: [
                '#C03018',   // dragged red
                '#1848A8',   // blue
                '#D8A020',   // yellow-ochre
                '#38A040',   // green
                '#C8C0B0',   // pulled gray
                '#882888',   // violet
                '#F0C840',   // pale yellow
                '#503828',   // dark brown drag
            ],
            useBoxMuller: false
        },

        // ── Anselm Kiefer ─────────────────────────────────────────────────────

        kiefer_mythic: {
            name: 'Kiefer — Mythic & Lead',
            artist: 'Anselm Kiefer',
            school: 'Neo-Expressionism',
            ref: 'Shulamite (1983)',
            bg: '#181008',
            colors: [
                '#484030',   // leaden dark
                '#887050',   // straw gold
                '#282018',   // dark earth
                '#C0A060',   // pale gold
                '#381808',   // dark red-brown
                '#706050',   // mid warm gray
                '#D0C090',   // pale straw
                '#181008',   // near-black
            ],
            useBoxMuller: true
        },

        // ── David Hockney ─────────────────────────────────────────────────────

        hockney_pool: {
            name: 'Hockney — California Pools',
            artist: 'David Hockney',
            school: 'Pop Art',
            ref: 'A Bigger Splash (1967)',
            bg: '#D8EEF8',
            colors: [
                '#48B8E8',   // pool blue
                '#88D0F0',   // pale pool
                '#F8E818',   // California sun
                '#C83818',   // diving board red
                '#28A8D8',   // water
                '#F8F0C0',   // sand/deck
                '#1898D0',   // deep water
                '#E8F0F8',   // lightest pool
            ],
            useBoxMuller: false
        },

        // ── Kehinde Wiley ─────────────────────────────────────────────────────

        wiley_baroque: {
            name: 'Wiley — Jewel Baroque',
            artist: 'Kehinde Wiley',
            school: 'Contemporary Figurative',
            ref: 'Napoleon Leading the Army over the Alps (2005)',
            bg: '#1A2840',
            colors: [
                '#C8A018',   // gold
                '#1840A8',   // royal blue
                '#C01828',   // crimson
                '#38A848',   // green foliage
                '#D0B030',   // golden
                '#781878',   // purple
                '#E8C848',   // bright gold
                '#183868',   // deep blue
            ],
            useBoxMuller: false
        },

        // ── Amy Sherald ───────────────────────────────────────────────────────

        sherald_portraiture: {
            name: 'Sherald — Grisaille Portraits',
            artist: 'Amy Sherald',
            school: 'Contemporary Figurative',
            ref: 'Michelle Obama Portrait (2018)',
            bg: '#E8E0D8',
            colors: [
                '#888078',   // grisaille gray skin
                '#9898A0',   // cool gray
                '#D8C818',   // bright accent yellow
                '#E81838',   // red accent
                '#2858A8',   // blue accent
                '#B0A898',   // light gray flesh
                '#707878',   // mid gray
                '#C8B0A8',   // warm gray
            ],
            useBoxMuller: true
        },

        // ── Zao Wou-Ki ────────────────────────────────────────────────────────

        zao_lyrical: {
            name: 'Zao Wou-Ki — Lyrical Abstraction',
            artist: 'Zao Wou-Ki',
            school: 'Lyrical Abstraction',
            ref: 'Hommage à Edgar Varèse (1954)',
            bg: '#0C1820',
            colors: [
                '#486898',   // ink blue
                '#A87840',   // ochre
                '#D0C0A0',   // pale mist
                '#284868',   // dark ink
                '#C09858',   // warm stone
                '#688090',   // fog gray
                '#E8D8B8',   // light mist
                '#182838',   // deep ink
            ],
            useBoxMuller: true
        },

        // ── Frank Stella ──────────────────────────────────────────────────────

        stella_shaped: {
            name: 'Stella — Shaped Canvases',
            artist: 'Frank Stella',
            school: 'Minimalism',
            ref: 'Irregular Polygon No. 14 (1966)',
            bg: '#181818',
            colors: [
                '#E01818',   // red
                '#F8B818',   // orange-yellow
                '#1838D0',   // blue
                '#18A838',   // green
                '#E87818',   // orange
                '#C818C8',   // magenta
                '#18C8C8',   // cyan
                '#F8E018',   // yellow
            ],
            useBoxMuller: false
        },

        // ── Sigmar Polke ──────────────────────────────────────────────────────

        polke_raster: {
            name: 'Polke — Raster & Resin',
            artist: 'Sigmar Polke',
            school: 'Neo-Expressionism',
            ref: 'Bunnies (1966)',
            bg: '#F0E8D8',
            colors: [
                '#C83828',   // red raster
                '#1840A8',   // blue raster
                '#F8C018',   // yellow raster
                '#888070',   // dot gray
                '#C8A060',   // resin amber
                '#E8D0B0',   // pale resin
                '#304870',   // dark blue
                '#A87050',   // warm brown
            ],
            useBoxMuller: false
        },

        // ── Georg Baselitz ────────────────────────────────────────────────────

        baselitz_inverted: {
            name: 'Baselitz — Inverted Figures',
            artist: 'Georg Baselitz',
            school: 'Neo-Expressionism',
            ref: 'The Great Friends (1965)',
            bg: '#201808',
            colors: [
                '#C84018',   // orange-red
                '#3870A8',   // blue
                '#D0A020',   // ochre
                '#28A038',   // green
                '#181010',   // near-black
                '#A86030',   // warm brown
                '#E8B040',   // golden
                '#301818',   // dark warm
            ],
            useBoxMuller: false
        },

        // ── Theo van Doesburg ─────────────────────────────────────────────────

        doesburg_destijl: {
            name: 'van Doesburg — De Stijl',
            artist: 'Theo van Doesburg',
            school: 'De Stijl',
            ref: 'Counter-Composition V (1924)',
            bg: '#F8F8F8',
            colors: [
                '#E01818',   // primary red
                '#F8D018',   // primary yellow
                '#1838D0',   // primary blue
                '#181818',   // black
                '#181818',   // black (weighted)
                '#F8F8F8',   // white
                '#D0D0D0',   // gray
                '#E81818',   // red accent
            ],
            useBoxMuller: false
        },

        // ── Kerry James Marshall ──────────────────────────────────────────────

        marshall_black: {
            name: 'Kerry James Marshall — Deep Black',
            artist: 'Kerry James Marshall',
            school: 'Contemporary Figurative',
            ref: 'Souvenir (1998)',
            bg: '#080808',
            colors: [
                '#080808',   // deep black flesh
                '#101010',   // near-black
                '#C82018',   // red
                '#F8D018',   // yellow
                '#1838D0',   // blue
                '#18A838',   // green
                '#E87018',   // orange
                '#181818',   // black
            ],
            useBoxMuller: false
        },

        // ── Paul Signac ───────────────────────────────────────────────────────

        signac_pointillist: {
            name: 'Signac — Pointillism',
            artist: 'Paul Signac',
            school: 'Pointillism',
            ref: 'The Dining Room (1886–1887)',
            bg: '#E8F0D8',
            colors: [
                '#E01828',   // red dot
                '#F8B818',   // orange dot
                '#F8E818',   // yellow dot
                '#18C838',   // green dot
                '#1880D8',   // blue dot
                '#8818D8',   // violet dot
                '#E85818',   // red-orange
                '#18A8C8',   // cyan dot
            ],
            useBoxMuller: false
        },

        // ── Félix González-Torres ─────────────────────────────────────────────

        gonzalez_torres: {
            name: 'González-Torres — Minimal',
            artist: 'Félix González-Torres',
            school: 'Conceptual Art',
            ref: 'Untitled (Portrait of Ross in L.A.) (1991)',
            bg: '#F8F8F8',
            colors: [
                '#E89848',   // candy gold
                '#E85880',   // candy pink
                '#88C8E8',   // light blue
                '#F8D858',   // pale yellow
                '#C8E890',   // mint
                '#F0A860',   // peach
                '#D0B8E0',   // lavender
                '#F8F8F8',   // white ground
            ],
            useBoxMuller: true
        },

        // ── Agnes Martin ─────────────────────────────────────────────────────

        martin_serene: {
            name: 'Agnes Martin — Serene Grids',
            artist: 'Agnes Martin',
            school: 'Minimalism',
            ref: 'Happy Holiday (1999)',
            bg: '#F8F6F0',
            colors: [
                '#F8F6F0',   // white ground
                '#E8E4D8',   // warm off-white
                '#D8D4C8',   // pale gray
                '#C8C4B8',   // medium pale
                '#B8B4A8',   // warm gray
                '#A8A498',   // mid gray
                '#989488',   // darker pale
                '#F0EDE5',   // soft cream
            ],
            useBoxMuller: true
        },

        // ── Oskar Schlemmer ───────────────────────────────────────────────────

        schlemmer_bauhaus: {
            name: 'Schlemmer — Bauhaus Figure',
            artist: 'Oskar Schlemmer',
            school: 'Bauhaus',
            ref: 'Triadic Ballet (1922)',
            bg: '#E8E0D0',
            colors: [
                '#C03018',   // red
                '#1838B8',   // blue
                '#F8C018',   // yellow
                '#181818',   // black
                '#D8C8A8',   // warm cream
                '#888878',   // gray
                '#A83818',   // dark red
                '#F8F0E0',   // pale
            ],
            useBoxMuller: false
        },

        // ── Lee Krasner (second palette) ──────────────────────────────────────

        krasner_mosaic: {
            name: 'Krasner — Mosaic Collage',
            artist: 'Lee Krasner',
            school: 'Abstract Expressionism',
            ref: 'Palingenesis (1971)',
            bg: '#F8F8F0',
            colors: [
                '#F8F8F0',   // white
                '#F8E818',   // yellow
                '#181818',   // black
                '#C83018',   // red
                '#1840A8',   // blue
                '#28A848',   // green
                '#E87820',   // orange
                '#D8D8D0',   // light gray
            ],
            useBoxMuller: false
        },

        // ── Yves Klein ────────────────────────────────────────────────────────

        klein_blue: {
            name: 'Yves Klein — International Klein Blue',
            artist: 'Yves Klein',
            school: 'New Realism',
            ref: 'IKB 191 (1962)',
            bg: '#0828C8',
            colors: [
                '#0828C8',   // IKB blue
                '#0A30D8',   // IKB variant
                '#0618A8',   // deeper IKB
                '#1038E0',   // lighter IKB
                '#F8C018',   // gold leaf
                '#F8F8F8',   // white
                '#0420B0',   // darkest IKB
                '#0C28C0',   // mid IKB
            ],
            useBoxMuller: true
        },

        // ── Joaquín Torres-García ─────────────────────────────────────────────

        // ── Jean Dubuffet ─────────────────────────────────────────────────────

        dubuffet_artbrut: {
            name: 'Dubuffet — Art Brut',
            artist: 'Jean Dubuffet',
            school: 'Art Brut',
            ref: 'Corps de Dame (1950)',
            bg: '#E8D8B0',
            colors: [
                '#181818',   // black line
                '#E8D0A0',   // raw ground
                '#C03018',   // red
                '#1838A8',   // blue
                '#F8C018',   // yellow
                '#888070',   // gray-earth
                '#A87840',   // tan
                '#C8B080',   // pale ochre
            ],
            useBoxMuller: false
        },

        // ── Joaquín Torres-García ─────────────────────────────────────────────

        torres_garcia: {
            name: 'Torres-García — Constructive Universalism',
            artist: 'Joaquín Torres-García',
            school: 'Constructivism',
            ref: 'Constructive Composition (1943)',
            bg: '#C0A870',
            colors: [
                '#881818',   // brick red
                '#1838A8',   // blue
                '#F8C018',   // yellow
                '#288030',   // green
                '#181818',   // black grid
                '#C89048',   // ochre
                '#A87038',   // warm tan
                '#D8B070',   // light ochre
            ],
            useBoxMuller: false
        },


        // ── Gustav Klimt ──────────────────────────────────────────────────────

        klimt_gold: {
            name: 'Klimt — Gold & Jewel',
            artist: 'Gustav Klimt',
            school: 'Symbolism',
            ref: 'The Kiss (1907–1908)',
            bg: '#2A1A08',
            colors: [
                '#C8940C',   // gold leaf
                '#E8B820',   // bright gold
                '#8C5818',   // deep bronze
                '#1A3868',   // midnight blue
                '#C01830',   // deep crimson
                '#D0A030',   // warm gold
                '#182848',   // dark blue
                '#F0C840',   // pale gold
            ],
            useBoxMuller: false
        },

        // ── Edvard Munch ──────────────────────────────────────────────────────

        munch_scream: {
            name: 'Munch — The Scream',
            artist: 'Edvard Munch',
            school: 'Expressionism',
            ref: 'The Scream (1893)',
            bg: '#100810',
            colors: [
                '#C84010',   // blood orange sky
                '#E87020',   // vivid orange
                '#183870',   // deep fjord blue
                '#1A5830',   // dark green
                '#C0A820',   // sickly yellow
                '#A02810',   // dark red
                '#2870A0',   // blue water
                '#E0C030',   // pale yellow sky
            ],
            useBoxMuller: false
        },

        // ── Georges Seurat ────────────────────────────────────────────────────

        seurat_jatte: {
            name: 'Seurat — Pointillism',
            artist: 'Georges Seurat',
            school: 'Pointillism',
            ref: 'A Sunday on La Grande Jatte (1884–1886)',
            bg: '#A8C880',
            colors: [
                '#3888C8',   // blue water
                '#F8D040',   // sunlit yellow
                '#50A850',   // grass green
                '#D8A868',   // warm tan flesh
                '#A8C880',   // light green
                '#E0E8A0',   // pale sunlit
                '#884820',   // shadow warm
                '#68B8D0',   // sky blue
            ],
            useBoxMuller: false
        },

        // ── Claude Monet ──────────────────────────────────────────────────────

        monet_waterlilies: {
            name: 'Monet — Water Lilies',
            artist: 'Claude Monet',
            school: 'Impressionism',
            ref: 'Water Lilies (Large Composition) (1906)',
            bg: '#304858',
            colors: [
                '#2880B0',   // pond blue
                '#68B880',   // lily pad green
                '#C870A0',   // pink lily
                '#D8C888',   // pale reflection
                '#3870A8',   // deep water
                '#90C8A8',   // pale green
                '#E8A8C0',   // blush pink
                '#204060',   // dark water
            ],
            useBoxMuller: true
        },

        // ── Edgar Degas ───────────────────────────────────────────────────────

        degas_ballet: {
            name: 'Degas — Ballet',
            artist: 'Edgar Degas',
            school: 'Impressionism',
            ref: 'The Dance Class (1874)',
            bg: '#C8C0B0',
            colors: [
                '#E8D8C8',   // tutu cream
                '#A8C8E0',   // pale blue tulle
                '#D8A878',   // warm flesh
                '#B8B0A8',   // gray stone floor
                '#E0C8E8',   // lavender tutu
                '#C89870',   // shadow flesh
                '#88A8C0',   // cool stage light
                '#E8E0D0',   // lightest cream
            ],
            useBoxMuller: true
        },

        // ── Henri de Toulouse-Lautrec ─────────────────────────────────────────

        toulouselautrec_moulin: {
            name: 'Toulouse-Lautrec — Moulin Rouge',
            artist: 'Henri de Toulouse-Lautrec',
            school: 'Post-Impressionism',
            ref: 'Moulin Rouge: La Goulue (1891)',
            bg: '#181018',
            colors: [
                '#C83870',   // cancan pink
                '#E8C010',   // gaslight yellow
                '#1840A8',   // night blue
                '#A03018',   // dark red
                '#F0A020',   // warm amber
                '#503858',   // deep violet
                '#C86898',   // rose
                '#303028',   // dark neutral
            ],
            useBoxMuller: false
        },

        // ── Pierre-Auguste Renoir ─────────────────────────────────────────────

        renoir_light: {
            name: 'Renoir — Impressionist Light',
            artist: 'Pierre-Auguste Renoir',
            school: 'Impressionism',
            ref: 'Bal du moulin de la Galette (1876)',
            bg: '#E8D8C8',
            colors: [
                '#E0A878',   // warm sunlit flesh
                '#3878C0',   // cobalt blue
                '#F0D0A8',   // pale dappled light
                '#C87840',   // warm shadow
                '#D8E8F0',   // pale sky
                '#A84828',   // red accent
                '#F0C090',   // blush flesh
                '#28588A',   // deep blue
            ],
            useBoxMuller: true
        },

        // ── Caravaggio ────────────────────────────────────────────────────────

        caravaggio_chiaroscuro: {
            name: 'Caravaggio — Chiaroscuro',
            artist: 'Caravaggio',
            school: 'Baroque',
            ref: 'Judith Beheading Holofernes (c. 1598–1599)',
            bg: '#080808',
            colors: [
                '#E8A870',   // candle-lit flesh
                '#A86030',   // warm shadow flesh
                '#C03020',   // blood red
                '#080808',   // void black
                '#D0B888',   // pale highlight
                '#401808',   // very dark warm
                '#C89060',   // mid flesh
                '#200808',   // near-black warm
            ],
            useBoxMuller: false
        },

        // ── Johannes Vermeer ──────────────────────────────────────────────────

        vermeer_light: {
            name: 'Vermeer — Interior Light',
            artist: 'Johannes Vermeer',
            school: 'Dutch Golden Age',
            ref: 'Girl with a Pearl Earring (c. 1665)',
            bg: '#283040',
            colors: [
                '#2860A8',   // ultramarine blue
                '#F0E8C8',   // pearl white
                '#F8D040',   // lemon yellow
                '#C89060',   // warm flesh
                '#B8D0E8',   // pale window blue
                '#E0B878',   // golden light
                '#182840',   // deep shadow
                '#D8D0B8',   // ivory light
            ],
            useBoxMuller: false
        },

        // ── Rembrandt van Rijn ────────────────────────────────────────────────

        rembrandt_golden: {
            name: 'Rembrandt — Golden Age',
            artist: 'Rembrandt van Rijn',
            school: 'Dutch Golden Age',
            ref: 'The Night Watch (1642)',
            bg: '#100808',
            colors: [
                '#D0A040',   // golden light
                '#C88840',   // warm amber
                '#E0B870',   // pale highlight
                '#401808',   // dark warm shadow
                '#A07030',   // mid gold
                '#200C08',   // near-black
                '#E8C880',   // brightest gold
                '#602808',   // deep warm
            ],
            useBoxMuller: true
        },

        // ── J.M.W. Turner ─────────────────────────────────────────────────────

        turner_atmospheric: {
            name: 'Turner — Atmospheric Light',
            artist: 'J.M.W. Turner',
            school: 'Romanticism',
            ref: 'Rain, Steam and Speed (1844)',
            bg: '#D8C890',
            colors: [
                '#F0D870',   // burning gold haze
                '#D8B040',   // warm mist
                '#C8D0E8',   // cool hazy blue
                '#F0E8C0',   // pale luminous
                '#A89060',   // warm mid fog
                '#688098',   // blue-gray distance
                '#E8C870',   // atmospheric yellow
                '#B8A878',   // neutral haze
            ],
            useBoxMuller: true
        },

        // ── Eugène Delacroix ──────────────────────────────────────────────────

        delacroix_romantic: {
            name: 'Delacroix — Romantic Drama',
            artist: 'Eugène Delacroix',
            school: 'Romanticism',
            ref: 'Liberty Leading the People (1830)',
            bg: '#180808',
            colors: [
                '#C01820',   // tricolor red
                '#F8D040',   // gold
                '#1830A0',   // blue
                '#881810',   // dark crimson
                '#D09050',   // warm flesh
                '#4820A0',   // deep blue
                '#F0A040',   // amber
                '#300808',   // near-black
            ],
            useBoxMuller: false
        },

        // ── Katsushika Hokusai ────────────────────────────────────────────────

        hokusai_wave: {
            name: 'Hokusai — The Great Wave',
            artist: 'Katsushika Hokusai',
            school: 'Ukiyo-e',
            ref: 'The Great Wave off Kanagawa (1831)',
            bg: '#0A2040',
            colors: [
                '#1848A8',   // Prussian blue
                '#F8F8F8',   // wave foam white
                '#2870D0',   // mid wave blue
                '#102858',   // deep ocean
                '#D8C8A0',   // Mt. Fuji pale
                '#3888D8',   // bright blue
                '#080C18',   // near-black sea
                '#B8C8D8',   // pale sky
            ],
            useBoxMuller: false
        },

        // ── Utagawa Hiroshige ─────────────────────────────────────────────────

        hiroshige_woodblock: {
            name: 'Hiroshige — Woodblock',
            artist: 'Utagawa Hiroshige',
            school: 'Ukiyo-e',
            ref: 'Plum Park in Kameido (1857)',
            bg: '#2848A0',
            colors: [
                '#2848A0',   // indigo sky
                '#F8C870',   // warm sunset
                '#C84020',   // vermillion
                '#A8C8E0',   // pale blue
                '#284820',   // dark pine
                '#E89040',   // orange glow
                '#D8D0B0',   // cream ground
                '#183880',   // deep indigo
            ],
            useBoxMuller: false
        },

        // ── Tamara de Lempicka ────────────────────────────────────────────────

        lempicka_deco: {
            name: 'Lempicka — Art Deco',
            artist: 'Tamara de Lempicka',
            school: 'Art Deco',
            ref: 'Young Lady with Gloves (1930)',
            bg: '#202830',
            colors: [
                '#C8C0B0',   // silver metallic
                '#3870A8',   // steel blue
                '#E8E0D0',   // platinum pale
                '#C03020',   // red lips
                '#484050',   // dark steel
                '#A8B8C8',   // cool silver
                '#880818',   // deep crimson
                '#D8D0C0',   // ivory glam
            ],
            useBoxMuller: false
        },

        // ── Alphonse Mucha ────────────────────────────────────────────────────

        mucha_nouveau: {
            name: 'Mucha — Art Nouveau',
            artist: 'Alphonse Mucha',
            school: 'Art Nouveau',
            ref: 'Gismonda (1894)',
            bg: '#D8C898',
            colors: [
                '#C8A030',   // warm gold
                '#D0C8A0',   // soft cream
                '#A87838',   // bronze
                '#78A870',   // sage green
                '#D8A870',   // peach
                '#8870A0',   // muted violet
                '#E8C860',   // golden
                '#5E8068',   // deep sage
            ],
            useBoxMuller: true
        },

        // ── Fernand Léger ─────────────────────────────────────────────────────

        leger_mechanical: {
            name: 'Léger — Mechanical Cubism',
            artist: 'Fernand Léger',
            school: 'Cubism',
            ref: 'The City (1919)',
            bg: '#F0F0F0',
            colors: [
                '#D81818',   // primary red
                '#F8D018',   // primary yellow
                '#1838D8',   // primary blue
                '#181818',   // black outline
                '#F0F0F0',   // white
                '#888888',   // industrial gray
                '#C87818',   // warm orange-red
                '#404040',   // dark gray
            ],
            useBoxMuller: false
        },

        // ── Robert Delaunay ───────────────────────────────────────────────────

        delaunay_orphism: {
            name: 'Robert Delaunay — Orphism',
            artist: 'Robert Delaunay',
            school: 'Orphism',
            ref: 'Simultaneous Windows on the City (1912)',
            bg: '#181020',
            colors: [
                '#E01818',   // red disc
                '#F8C018',   // yellow
                '#1838D0',   // blue
                '#18B838',   // green
                '#E07818',   // orange
                '#8018C8',   // violet
                '#18C8D8',   // cyan
                '#F0F020',   // bright yellow
            ],
            useBoxMuller: false
        },

        // ── Sonia Delaunay ────────────────────────────────────────────────────

        sonia_delaunay: {
            name: 'Sonia Delaunay — Color Rhythms',
            artist: 'Sonia Delaunay',
            school: 'Orphism',
            ref: 'Prose of the Trans-Siberian (1913)',
            bg: '#201828',
            colors: [
                '#D81818',   // red
                '#F8B818',   // orange-yellow
                '#1850D0',   // deep blue
                '#18C040',   // vivid green
                '#E07818',   // orange
                '#C818C0',   // magenta
                '#F8E018',   // yellow
                '#18A8C8',   // turquoise
            ],
            useBoxMuller: false
        },

        // ── Sophie Taeuber-Arp ────────────────────────────────────────────────

        taeuber_geometric: {
            name: 'Taeuber-Arp — Geometric Abstraction',
            artist: 'Sophie Taeuber-Arp',
            school: 'Concrete Art',
            ref: 'Composition with Rectangles (1927)',
            bg: '#F0EEE8',
            colors: [
                '#E01818',   // primary red
                '#F8D018',   // primary yellow
                '#1838D0',   // primary blue
                '#181818',   // black
                '#F0EEE8',   // white
                '#888880',   // gray
                '#E01818',   // red (weighted)
                '#303030',   // dark gray
            ],
            useBoxMuller: false
        },

        // ── Jean Arp ──────────────────────────────────────────────────────────

        arp_biomorphic: {
            name: 'Jean Arp — Biomorphic',
            artist: 'Jean Arp',
            school: 'Dada',
            ref: 'Collage Arranged According to the Laws of Chance (1916–1917)',
            bg: '#F0EAD8',
            colors: [
                '#C03018',   // warm red
                '#F8D018',   // yellow
                '#1838B8',   // blue
                '#181818',   // black
                '#F0EAD8',   // cream ground
                '#28A040',   // green
                '#D0B888',   // soft warm
                '#E08040',   // orange
            ],
            useBoxMuller: false
        },

        // ── Odilon Redon ──────────────────────────────────────────────────────

        redon_symbolist: {
            name: 'Redon — Symbolist Dreams',
            artist: 'Odilon Redon',
            school: 'Symbolism',
            ref: 'The Cyclops (c. 1914)',
            bg: '#180818',
            colors: [
                '#8830C8',   // deep violet
                '#D870A8',   // rose
                '#F0C050',   // golden
                '#3880C8',   // sapphire
                '#C840A0',   // magenta
                '#F0D880',   // pale gold
                '#5050C0',   // indigo
                '#E89060',   // warm amber
            ],
            useBoxMuller: true
        },

        // ── Gustave Moreau ────────────────────────────────────────────────────

        moreau_jewels: {
            name: 'Moreau — Jeweled Mythology',
            artist: 'Gustave Moreau',
            school: 'Symbolism',
            ref: 'Salome Dancing (1876)',
            bg: '#100818',
            colors: [
                '#C89010',   // gold
                '#1838A0',   // lapis blue
                '#C01828',   // ruby
                '#28A870',   // emerald
                '#D0A020',   // warm gold
                '#881870',   // deep rose
                '#E8C040',   // bright gold
                '#202860',   // deep night
            ],
            useBoxMuller: false
        },

        // ── John Singer Sargent ───────────────────────────────────────────────

        sargent_portrait: {
            name: 'Sargent — Fluid Portraiture',
            artist: 'John Singer Sargent',
            school: 'Realism',
            ref: 'Madame X (1884)',
            bg: '#181018',
            colors: [
                '#E8C890',   // luminous flesh
                '#C8A868',   // warm tan
                '#181818',   // black satin
                '#D8E8F0',   // pale cool light
                '#E0B070',   // sunlit flesh
                '#282028',   // near-black
                '#F0D8B0',   // brightest highlight
                '#988070',   // shadow flesh
            ],
            useBoxMuller: false
        },

        // ── Winslow Homer ─────────────────────────────────────────────────────

        homer_american: {
            name: 'Homer — American Landscape',
            artist: 'Winslow Homer',
            school: 'Realism',
            ref: 'Snap the Whip (1872)',
            bg: '#1840A0',
            colors: [
                '#1840A0',   // deep Maine sea
                '#D8C078',   // sandy shore
                '#2870C0',   // Atlantic blue
                '#E8D898',   // pale beach
                '#187038',   // forest green
                '#A8901C',   // hay gold
                '#80B8D8',   // sky blue
                '#282818',   // dark land
            ],
            useBoxMuller: false
        },

        // ── Mary Cassatt ──────────────────────────────────────────────────────

        cassatt_pastel: {
            name: 'Cassatt — Impressionist Pastels',
            artist: 'Mary Cassatt',
            school: 'Impressionism',
            ref: 'The Child\'s Bath (1893)',
            bg: '#E8DED0',
            colors: [
                '#D8A8B8',   // rose pink flesh
                '#88B8D8',   // soft blue
                '#F0D0B0',   // warm pale skin
                '#C8A890',   // shadow flesh
                '#D0D8B0',   // pale sage
                '#A8C0D8',   // soft blue-gray
                '#E8C0A8',   // peach
                '#B8D0C0',   // soft sage
            ],
            useBoxMuller: true
        },

        // ── Berthe Morisot ────────────────────────────────────────────────────

        morisot_impressionist: {
            name: 'Morisot — French Impressionist',
            artist: 'Berthe Morisot',
            school: 'Impressionism',
            ref: 'The Cradle (1872)',
            bg: '#D8E0E8',
            colors: [
                '#B8C8D8',   // soft gray-blue
                '#E8D0B8',   // warm pale flesh
                '#9ABAC8',   // cool light
                '#D8B890',   // blush flesh
                '#C8D8C8',   // sage green
                '#E0C8B8',   // warm cream
                '#A8B8D0',   // blue-gray
                '#D0C8B8',   // warm neutral
            ],
            useBoxMuller: true
        },

        // ── El Greco ──────────────────────────────────────────────────────────

        elgreco_mannerist: {
            name: 'El Greco — Mannerist',
            artist: 'El Greco',
            school: 'Mannerism',
            ref: 'The Burial of the Count of Orgaz (1586–1588)',
            bg: '#101828',
            colors: [
                '#B8C8E8',   // cold silver light
                '#F0E060',   // acid yellow
                '#3050A0',   // deep blue mantle
                '#D09060',   // flesh
                '#C83020',   // crimson
                '#E8E8D0',   // pale ethereal
                '#183060',   // dark blue
                '#808898',   // cool gray
            ],
            useBoxMuller: false
        },

        // ── Diego Velázquez ───────────────────────────────────────────────────

        velazquez_court: {
            name: 'Velázquez — Spanish Court',
            artist: 'Diego Velázquez',
            school: 'Baroque',
            ref: 'Las Meninas (1656)',
            bg: '#181018',
            colors: [
                '#B8B0A8',   // silver-gray garment
                '#E8D0A0',   // pale flesh
                '#881818',   // burgundy
                '#C0A878',   // warm ivory
                '#282028',   // near-black
                '#686068',   // dark neutral
                '#D8C8A0',   // light ivory
                '#401828',   // very dark red
            ],
            useBoxMuller: false
        },

        // ── Peter Paul Rubens ─────────────────────────────────────────────────

        rubens_baroque: {
            name: 'Rubens — Baroque Flesh',
            artist: 'Peter Paul Rubens',
            school: 'Baroque',
            ref: 'The Three Graces (c. 1635)',
            bg: '#200808',
            colors: [
                '#E8B888',   // rosy flesh
                '#C05030',   // warm red
                '#D0A070',   // tan flesh
                '#1838A0',   // cobalt drapery
                '#F0D0A0',   // pale highlight
                '#A03018',   // deep red
                '#C89060',   // mid flesh
                '#304080',   // blue shadow
            ],
            useBoxMuller: true
        },

        // ── Gustave Caillebotte ───────────────────────────────────────────────

        caillebotte_paris: {
            name: 'Caillebotte — Paris Modern',
            artist: 'Gustave Caillebotte',
            school: 'Impressionism',
            ref: 'Paris Street; Rainy Day (1877)',
            bg: '#A8A8B0',
            colors: [
                '#A8A8B0',   // wet cobblestone gray
                '#C8C0B0',   // pale pavement
                '#484850',   // dark overcoat
                '#808898',   // rainy sky
                '#D8D0C0',   // light stone
                '#383840',   // dark shadow
                '#B8B8C8',   // cool blue-gray
                '#282830',   // near-black
            ],
            useBoxMuller: true
        },

        // ── Camille Pissarro ──────────────────────────────────────────────────

        pissarro_village: {
            name: 'Pissarro — Village & Fields',
            artist: 'Camille Pissarro',
            school: 'Impressionism',
            ref: 'The Harvest (1882)',
            bg: '#78A058',
            colors: [
                '#78A058',   // field green
                '#C89040',   // harvest gold
                '#A87030',   // warm earth
                '#D8B870',   // pale straw
                '#3870A8',   // sky blue
                '#C04020',   // red roof
                '#D0C890',   // sunlit pale
                '#285030',   // deep foliage
            ],
            useBoxMuller: false
        },

        // ── Ben Nicholson ─────────────────────────────────────────────────────

        nicholson_relief: {
            name: 'Nicholson — Relief & Abstraction',
            artist: 'Ben Nicholson',
            school: 'Abstract',
            ref: 'White Relief (1935)',
            bg: '#F0EEE8',
            colors: [
                '#F0EEE8',   // white relief
                '#D8D4C8',   // off-white cast shadow
                '#B8B4A8',   // pale gray
                '#C83018',   // red accent
                '#1838A0',   // blue
                '#888880',   // mid gray
                '#E8E4D8',   // very pale
                '#303028',   // dark gray
            ],
            useBoxMuller: true
        },

        // ── Patrick Heron ─────────────────────────────────────────────────────

        heron_color: {
            name: 'Heron — Bold Color Abstraction',
            artist: 'Patrick Heron',
            school: 'Abstract',
            ref: 'Azalea Garden (1956)',
            bg: '#F8F0E8',
            colors: [
                '#E81830',   // red
                '#F8B018',   // orange
                '#18B038',   // green
                '#1858D0',   // cobalt
                '#C818A8',   // magenta
                '#F8E018',   // yellow
                '#1898C0',   // teal
                '#E85018',   // red-orange
            ],
            useBoxMuller: false
        },

        // ── Lee Ufan ──────────────────────────────────────────────────────────

        lee_ufan: {
            name: 'Lee Ufan — Mono-Ha',
            artist: 'Lee Ufan',
            school: 'Mono-Ha',
            ref: 'From Point (1973)',
            bg: '#E8E4DC',
            colors: [
                '#E8E4DC',   // white ground
                '#484440',   // brush gray
                '#706860',   // warm mid gray
                '#B8B4A8',   // pale stone
                '#282420',   // near-black mark
                '#989088',   // medium gray
                '#D8D4C8',   // light ground
                '#181410',   // darkest mark
            ],
            useBoxMuller: true
        },

        // ── Antoni Tàpies ─────────────────────────────────────────────────────

        tapies_matter: {
            name: 'Tàpies — Matter Painting',
            artist: 'Antoni Tàpies',
            school: 'Informalism',
            ref: 'Large Painting (1958)',
            bg: '#302818',
            colors: [
                '#786048',   // earth brown
                '#989080',   // warm gray
                '#A87838',   // ochre
                '#383028',   // dark earth
                '#C0A870',   // pale ochre
                '#585048',   // neutral dark
                '#B89870',   // warm pale
                '#201810',   // deepest earth
            ],
            useBoxMuller: true
        },

        // ── Marlene Dumas ─────────────────────────────────────────────────────

        dumas_flesh: {
            name: 'Dumas — Raw Figuration',
            artist: 'Marlene Dumas',
            school: 'Contemporary Figurative',
            ref: 'The Image as Burden (1993)',
            bg: '#F0E8E0',
            colors: [
                '#E0B8A0',   // raw flesh
                '#D09888',   // mid flesh
                '#808898',   // cool blue-gray
                '#B88878',   // shadow flesh
                '#C8C0C8',   // pale lavender gray
                '#A07868',   // warm shadow
                '#D8D0D8',   // very pale gray
                '#786868',   // dark flesh
            ],
            useBoxMuller: true
        },

        // ── Luc Tuymans ───────────────────────────────────────────────────────

        tuymans_muted: {
            name: 'Tuymans — Desaturated Dread',
            artist: 'Luc Tuymans',
            school: 'Contemporary Figurative',
            ref: 'Gas Chamber (1986)',
            bg: '#D8D0C0',
            colors: [
                '#D8D0C0',   // pale sickly ground
                '#B8B0A0',   // washed flesh
                '#989080',   // desaturated mid
                '#C8C0A8',   // pale muted
                '#A09888',   // shadow muted
                '#787068',   // dark desaturated
                '#E8E0D0',   // near-white
                '#585048',   // darkest
            ],
            useBoxMuller: true
        },

        // ── Kara Walker ───────────────────────────────────────────────────────

        walker_silhouette: {
            name: 'Kara Walker — Silhouette',
            artist: 'Kara Walker',
            school: 'Contemporary Art',
            ref: 'Gone: An Historical Romance of a Civil War (1994)',
            bg: '#F8F4E8',
            colors: [
                '#101010',   // cut-paper black
                '#181818',   // silhouette
                '#F8F4E8',   // pale ground
                '#E8E0C8',   // warm paper
                '#282820',   // near-black
                '#F0E8D0',   // ivory
                '#080808',   // deep black
                '#D8D0B8',   // shadow ground
            ],
            useBoxMuller: false
        },

        // ── Alice Neel ────────────────────────────────────────────────────────

        neel_portrait: {
            name: 'Alice Neel — Raw Portraiture',
            artist: 'Alice Neel',
            school: 'Social Realism',
            ref: 'Andy Warhol (1970)',
            bg: '#F0E8D8',
            colors: [
                '#E0A890',   // warm raw flesh
                '#3878C0',   // background blue
                '#C87860',   // mid flesh
                '#D88060',   // reddish flesh
                '#1840A8',   // deep blue
                '#A06048',   // shadow flesh
                '#F0C8A8',   // pale flesh
                '#183068',   // dark blue ground
            ],
            useBoxMuller: false
        },

        // ── Peter Doig ────────────────────────────────────────────────────────

        doig_atmospheric: {
            name: 'Doig — Atmospheric Figurative',
            artist: 'Peter Doig',
            school: 'Neo-Expressionism',
            ref: 'Blotter (1993)',
            bg: '#102030',
            colors: [
                '#2868A8',   // cold lake blue
                '#D8C890',   // pale reflection
                '#487838',   // forest green
                '#A8B8C8',   // misty light
                '#102030',   // dark water
                '#D0A858',   // autumn gold
                '#6890B0',   // pale blue-gray
                '#283818',   // deep forest
            ],
            useBoxMuller: true
        },

        // ── Neo Rauch ─────────────────────────────────────────────────────────

        rauch_dreamscape: {
            name: 'Neo Rauch — Dream Figurative',
            artist: 'Neo Rauch',
            school: 'Neo-Expressionism',
            ref: 'Para (2001)',
            bg: '#283038',
            colors: [
                '#708090',   // slate dream
                '#C8A840',   // ochre
                '#486848',   // gray-green
                '#A09080',   // warm gray
                '#2858A0',   // cool blue
                '#B87840',   // warm tan
                '#607870',   // muted teal
                '#D0B888',   // pale amber
            ],
            useBoxMuller: true
        },

        // ── Aaron Douglas ─────────────────────────────────────────────────────

        aaron_douglas: {
            name: 'Aaron Douglas — Harlem Renaissance',
            artist: 'Aaron Douglas',
            school: 'Harlem Renaissance',
            ref: 'Aspects of Negro Life: From Slavery to Reconstruction (1934)',
            bg: '#081820',
            colors: [
                '#1848A8',   // deep blue
                '#F8B818',   // golden
                '#081820',   // near-black
                '#28A038',   // green
                '#C83018',   // red
                '#D89030',   // amber
                '#183060',   // deep night
                '#A06818',   // dark gold
            ],
            useBoxMuller: false
        },

        // ── Fairfield Porter ──────────────────────────────────────────────────

        porter_american: {
            name: 'Fairfield Porter — American Light',
            artist: 'Fairfield Porter',
            school: 'American Realism',
            ref: 'The Screen Porch (1964)',
            bg: '#D0D8E0',
            colors: [
                '#88B0C8',   // clear sky
                '#D8C890',   // pale sunlit floor
                '#3878A8',   // deeper sky
                '#A8C080',   // summer green
                '#E0D0A8',   // warm interior light
                '#5890A8',   // mid blue
                '#C8B870',   // golden interior
                '#284868',   // shadow
            ],
            useBoxMuller: true
        },

        // ── Leon Golub ────────────────────────────────────────────────────────

        golub_mercenary: {
            name: 'Golub — Mercenaries',
            artist: 'Leon Golub',
            school: 'Figurative Expressionism',
            ref: 'Mercenaries I (1976)',
            bg: '#C08840',
            colors: [
                '#C08840',   // raw sienna ground
                '#E0B060',   // warm ochre
                '#C83020',   // red
                '#D09060',   // flesh
                '#903018',   // dark red-brown
                '#E8C880',   // pale ochre
                '#602010',   // deep warm
                '#A86030',   // shadow flesh
            ],
            useBoxMuller: false
        },

        // ── Dana Schutz ───────────────────────────────────────────────────────

        schutz_vivid: {
            name: 'Dana Schutz — Vivid Expressionism',
            artist: 'Dana Schutz',
            school: 'Neo-Expressionism',
            ref: 'Self-Eater (2001)',
            bg: '#E0C8B8',
            colors: [
                '#D83020',   // hot red
                '#F0A030',   // orange
                '#20A048',   // vivid green
                '#3868D0',   // blue
                '#E85080',   // hot pink
                '#F0D020',   // yellow
                '#8820D0',   // violet
                '#18B8C0',   // teal
            ],
            useBoxMuller: false
        },

        // ── Lynette Yiadom-Boakye ─────────────────────────────────────────────

        yiadom_boakye: {
            name: 'Yiadom-Boakye — Moody Figure',
            artist: 'Lynette Yiadom-Boakye',
            school: 'Contemporary Figurative',
            ref: 'A Culmination (2014)',
            bg: '#101810',
            colors: [
                '#181818',   // deep dark
                '#505040',   // muted dark
                '#C88840',   // warm ochre
                '#3868A8',   // cool blue
                '#282818',   // near-black
                '#A07840',   // warm tan
                '#606850',   // muted green-gray
                '#D0A060',   // pale golden
            ],
            useBoxMuller: true
        },

        // ── Henry Taylor ──────────────────────────────────────────────────────

        taylor_figuration: {
            name: 'Henry Taylor — Flat Figuration',
            artist: 'Henry Taylor',
            school: 'Contemporary Figurative',
            ref: 'The Wait (2012)',
            bg: '#F8F0E8',
            colors: [
                '#C83018',   // red
                '#F8C018',   // yellow
                '#1838D0',   // blue
                '#18A840',   // green
                '#E87018',   // orange
                '#881888',   // purple
                '#181818',   // black
                '#F8F0E8',   // cream ground
            ],
            useBoxMuller: false
        },

        // ── Norman Lewis ──────────────────────────────────────────────────────

        lewis_luminous: {
            name: 'Norman Lewis — Luminous Black Abstraction',
            artist: 'Norman Lewis',
            school: 'Abstract Expressionism',
            ref: 'America the Beautiful (1960)',
            bg: '#080808',
            colors: [
                '#080808',   // deep black
                '#181818',   // dark
                '#383828',   // warm dark
                '#E8C018',   // luminous gold
                '#C8A018',   // amber
                '#D88820',   // warm glow
                '#101010',   // near-black
                '#F0D040',   // bright glow
            ],
            useBoxMuller: true
        },

        // ── Beauford Delaney ──────────────────────────────────────────────────

        delaney_golden: {
            name: 'Beauford Delaney — Golden Light',
            artist: 'Beauford Delaney',
            school: 'Abstract Expressionism',
            ref: 'Can Fire in the Park (1946)',
            bg: '#282010',
            colors: [
                '#E8C020',   // incandescent gold
                '#C89818',   // deep yellow
                '#D0A820',   // amber glow
                '#F0D040',   // bright gold
                '#A07018',   // dark gold
                '#E0B030',   // warm amber
                '#F8E050',   // palest gold
                '#181008',   // darkest shadow
            ],
            useBoxMuller: true
        },

    };

    global.ARTIST_PALETTES = ARTIST_PALETTES;
    console.log('ARTIST_PALETTES loaded —', Object.keys(ARTIST_PALETTES).length, 'palettes');

})(window);
