/**
 * artist_palettes/old_masters.js
 * Old Masters, Romanticism & Ukiyo-e
 * 20 palettes
 */
(function() {
    'use strict';
    Object.assign(window.ARTIST_PALETTES, {

        caravaggio_chiaroscuro: {
            name: 'Caravaggio — Judith Beheading Holofernes',
            artist: 'Caravaggio',
            school: 'Baroque',
            ref: 'Judith Beheading Holofernes (c. 1598–1599)',
            bg: '#1E160F',
            colors: [
                '#1E160F',   // dominant (25.2%)
                '#281D15',   // secondary (20.1%)
                '#34281B',   // tertiary (13.6%)
                '#443321',   // accent (8.0%)
                '#3F190F',   // accent (4.8%)
                '#58452C',   // accent (4.1%)
                '#D9B587',   // accent (3.6%)
                '#E5CAA5',   // accent (2.8%)
                '#5E2C13',   // accent (2.8%)
                '#745E3D',   // accent (2.7%)
                '#79471B',   // accent (2.3%)
                '#D79E62',   // accent (2.3%)
                '#C08341',   // accent (2.1%)
                '#9E6529',   // accent (2.0%)
                '#B89C6F',   // accent (1.9%)
                '#987B51',   // accent (1.7%)
            ],
            pcts: [25.2, 20.1, 13.6, 8.0, 4.8, 4.1, 3.6, 2.8, 2.8, 2.7, 2.3, 2.3, 2.1, 2.0, 1.9, 1.7],
            useBoxMuller: false
        },

        caravaggio_matthew: {
            name: 'Caravaggio — The Calling of Saint Matthew',
            artist: 'Caravaggio',
            school: 'Baroque',
            ref: 'The Calling of Saint Matthew (1599–1600)',
            bg: '#1D1B18',
            colors: [
                '#1D1B18',   // dominant (18.2%)
                '#161513',   // secondary (17.7%)
                '#24211E',   // tertiary (14.1%)
                '#100F0E',   // accent (11.8%)
                '#2D2822',   // accent (10.1%)
                '#393127',   // accent (6.9%)
                '#090807',   // accent (4.6%)
                '#453B2E',   // accent (4.5%)
                '#554833',   // accent (3.6%)
                '#63553C',   // accent (3.2%)
                '#746548',   // accent (2.2%)
                '#8D7B57',   // accent (1.2%)
                '#AE8F61',   // accent (0.9%)
                '#D1AD7D',   // accent (0.5%)
                '#99613D',   // accent (0.4%)
                '#E4D8B6',   // accent (0.3%)
            ],
            pcts: [18.2, 17.7, 14.1, 11.8, 10.1, 6.9, 4.6, 4.5, 3.6, 3.2, 2.2, 1.2, 0.9, 0.5, 0.4, 0.3],
            useBoxMuller: false
        },

        vermeer_light: {
            name: 'Vermeer — Girl with a Pearl Earring',
            artist: 'Johannes Vermeer',
            school: 'Dutch Golden Age',
            ref: 'Girl with a Pearl Earring (c. 1665)',
            bg: '#21190D',
            colors: [
                '#21190D',   // dominant (21.1%)
                '#292419',   // secondary (18.7%)
                '#160D03',   // tertiary (11.2%)
                '#373126',   // accent (9.3%)
                '#4F4532',   // accent (6.4%)
                '#685840',   // accent (5.6%)
                '#A18762',   // accent (5.2%)
                '#BE9F72',   // accent (4.3%)
                '#847053',   // accent (4.1%)
                '#D5B693',   // accent (2.7%)
                '#EFD2B3',   // accent (2.3%)
                '#2F4251',   // accent (2.3%)
                '#526573',   // accent (2.1%)
                '#8597A1',   // accent (2.0%)
                '#ADBCC5',   // accent (1.8%)
                '#F7F0E2',   // accent (0.8%)
            ],
            pcts: [21.1, 18.7, 11.2, 9.3, 6.4, 5.6, 5.2, 4.3, 4.1, 2.7, 2.3, 2.3, 2.1, 2.0, 1.8, 0.8],
            useBoxMuller: false
        },

        vermeer_milkmaid: {
            name: 'Vermeer — The Milkmaid',
            artist: 'Johannes Vermeer',
            school: 'Dutch Golden Age',
            ref: 'The Milkmaid (c. 1657–1658)',
            bg: '#A09286',
            colors: [
                '#A09286',   // dominant (14.4%)
                '#050507',   // secondary (13.8%)
                '#AEA094',   // tertiary (9.4%)
                '#715840',   // accent (9.1%)
                '#908276',   // accent (8.9%)
                '#7F6957',   // accent (7.8%)
                '#5E4128',   // accent (6.1%)
                '#0A1629',   // accent (5.7%)
                '#532517',   // accent (5.7%)
                '#2C130D',   // accent (4.7%)
                '#854126',   // accent (3.1%)
                '#D2AD93',   // accent (2.9%)
                '#DAC7BB',   // accent (2.6%)
                '#183558',   // accent (2.4%)
                '#B38367',   // accent (2.0%)
                '#4A607A',   // accent (1.4%)
            ],
            pcts: [14.4, 13.8, 9.4, 9.1, 8.9, 7.8, 6.1, 5.7, 5.7, 4.7, 3.1, 2.9, 2.6, 2.4, 2.0, 1.4],
            useBoxMuller: false
        },

        rembrandt_golden: {
            name: 'Rembrandt — The Night Watch',
            artist: 'Rembrandt van Rijn',
            school: 'Dutch Golden Age',
            ref: 'The Night Watch (1642)',
            bg: '#161208',
            colors: [
                '#161208',   // dominant (22.2%)
                '#0C0B04',   // secondary (18.8%)
                '#231909',   // tertiary (15.6%)
                '#2F210E',   // accent (10.8%)
                '#402509',   // accent (6.4%)
                '#423118',   // accent (4.8%)
                '#58330D',   // accent (4.7%)
                '#5E441D',   // accent (3.5%)
                '#784811',   // accent (3.1%)
                '#966119',   // accent (2.4%)
                '#775E2E',   // accent (1.7%)
                '#B69455',   // accent (1.6%)
                '#927A47',   // accent (1.4%)
                '#B2812C',   // accent (1.3%)
                '#CBAD73',   // accent (1.1%)
                '#E4CD9C',   // accent (0.5%)
            ],
            pcts: [22.2, 18.8, 15.6, 10.8, 6.4, 4.8, 4.7, 3.5, 3.1, 2.4, 1.7, 1.6, 1.4, 1.3, 1.1, 0.5],
            useBoxMuller: false
        },

        rembrandt_anatomy: {
            name: 'Rembrandt — The Anatomy Lesson',
            artist: 'Rembrandt van Rijn',
            school: 'Dutch Golden Age',
            ref: 'The Anatomy Lesson of Dr. Nicolaes Tulp (1632)',
            bg: '#070302',
            colors: [
                '#070302',   // dominant (17.8%)
                '#130C07',   // secondary (15.5%)
                '#1D150D',   // tertiary (13.9%)
                '#281F14',   // accent (12.7%)
                '#3B3429',   // accent (9.5%)
                '#31291F',   // accent (9.2%)
                '#4A3E30',   // accent (3.6%)
                '#664E35',   // accent (2.9%)
                '#412A15',   // accent (2.4%)
                '#9D856A',   // accent (2.3%)
                '#8B7056',   // accent (2.2%)
                '#70604D',   // accent (2.1%)
                '#CCB793',   // accent (2.0%)
                '#B89C78',   // accent (2.0%)
                '#DFCDAF',   // accent (1.0%)
                '#A79F90',   // accent (0.9%)
            ],
            pcts: [17.8, 15.5, 13.9, 12.7, 9.5, 9.2, 3.6, 2.9, 2.4, 2.3, 2.2, 2.1, 2.0, 2.0, 1.0, 0.9],
            useBoxMuller: false
        },

        rembrandt_self: {
            name: 'Rembrandt — Self-Portrait with Two Circles',
            artist: 'Rembrandt van Rijn',
            school: 'Dutch Golden Age',
            ref: 'Self-Portrait with Two Circles (c. 1665–1669)',
            bg: '#0C0C08',
            colors: [
                '#0C0C08',   // dominant (19.7%)
                '#18120F',   // secondary (11.3%)
                '#84714F',   // tertiary (9.1%)
                '#8D7C59',   // accent (9.0%)
                '#7A6647',   // accent (8.3%)
                '#6F593F',   // accent (6.8%)
                '#231C19',   // accent (5.4%)
                '#988764',   // accent (5.2%)
                '#624A36',   // accent (5.2%)
                '#523A2A',   // accent (4.6%)
                '#36170F',   // accent (4.4%)
                '#3C291F',   // accent (4.2%)
                '#522619',   // accent (2.8%)
                '#AE9B73',   // accent (1.8%)
                '#D2BE90',   // accent (1.2%)
                '#EEE6BD',   // accent (0.8%)
            ],
            pcts: [19.7, 11.3, 9.1, 9.0, 8.3, 6.8, 5.4, 5.2, 5.2, 4.6, 4.4, 4.2, 2.8, 1.8, 1.2, 0.8],
            useBoxMuller: true
        },

        turner_atmospheric: {
            name: 'Turner — Rain, Steam and Speed',
            artist: 'J.M.W. Turner',
            school: 'Romanticism',
            ref: 'Rain, Steam and Speed — The Great Western Railway (1844)',
            bg: '#ADA792',
            colors: [
                '#ADA792',   // dominant (11.8%)
                '#B9B198',   // secondary (11.1%)
                '#9F9B8B',   // tertiary (8.7%)
                '#BEB9A7',   // accent (7.4%)
                '#9F9476',   // accent (7.0%)
                '#958865',   // accent (6.5%)
                '#ACACA4',   // accent (6.3%)
                '#887A58',   // accent (6.2%)
                '#AEA280',   // accent (6.1%)
                '#7D6C49',   // accent (6.0%)
                '#6F5E3F',   // accent (5.6%)
                '#604D33',   // accent (4.6%)
                '#4E3928',   // accent (4.4%)
                '#898981',   // accent (3.6%)
                '#39271C',   // accent (2.8%)
                '#D2CCB5',   // accent (2.0%)
            ],
            pcts: [11.8, 11.1, 8.7, 7.4, 7.0, 6.5, 6.3, 6.2, 6.1, 6.0, 5.6, 4.6, 4.4, 3.6, 2.8, 2.0],
            useBoxMuller: true
        },

        turner_temeraire: {
            name: 'Turner — The Fighting Temeraire',
            artist: 'J.M.W. Turner',
            school: 'Romanticism',
            ref: 'The Fighting Temeraire (1839)',
            bg: '#94866E',
            colors: [
                '#94866E',   // dominant (14.2%)
                '#867661',   // secondary (8.9%)
                '#9B9384',   // tertiary (8.6%)
                '#ACA492',   // accent (7.2%)
                '#76654C',   // accent (7.1%)
                '#837F77',   // accent (7.0%)
                '#705838',   // accent (6.7%)
                '#A5946F',   // accent (6.7%)
                '#99825A',   // accent (6.5%)
                '#6F6E6C',   // accent (5.4%)
                '#5A4432',   // accent (4.6%)
                '#605E5B',   // accent (4.3%)
                '#BDB7A7',   // accent (4.0%)
                '#8A6C3F',   // accent (3.7%)
                '#929BA4',   // accent (3.4%)
                '#3F2C20',   // accent (1.8%)
            ],
            pcts: [14.2, 8.9, 8.6, 7.2, 7.1, 7.0, 6.7, 6.7, 6.5, 5.4, 4.6, 4.3, 4.0, 3.7, 3.4, 1.8],
            useBoxMuller: false
        },

        delacroix_romantic: {
            name: 'Delacroix — Liberty Leading the People',
            artist: 'Eugène Delacroix',
            school: 'Romanticism',
            ref: 'Liberty Leading the People (1830)',
            bg: '#1E1918',
            colors: [
                '#1E1918',   // dominant (14.4%)
                '#2E2521',   // secondary (13.7%)
                '#413329',   // tertiary (10.0%)
                '#504438',   // accent (8.0%)
                '#60554D',   // accent (7.6%)
                '#8A8583',   // accent (6.3%)
                '#756D67',   // accent (5.7%)
                '#B2B4B7',   // accent (5.6%)
                '#A29B95',   // accent (5.2%)
                '#E5E8E6',   // accent (4.6%)
                '#CBCED3',   // accent (4.6%)
                '#869AB2',   // accent (4.0%)
                '#4F5C71',   // accent (3.1%)
                '#5679AB',   // accent (2.7%)
                '#2C3B55',   // accent (2.6%)
                '#BC5B44',   // accent (1.8%)
            ],
            pcts: [14.4, 13.7, 10.0, 8.0, 7.6, 6.3, 5.7, 5.6, 5.2, 4.6, 4.6, 4.0, 3.1, 2.7, 2.6, 1.8],
            useBoxMuller: false
        },

        hokusai_wave: {
            name: 'Hokusai — The Great Wave',
            artist: 'Katsushika Hokusai',
            school: 'Ukiyo-e',
            ref: 'The Great Wave off Kanagawa (1831)',
            bg: '#F8F2DD',
            colors: [
                '#F8F2DD',   // dominant (15.6%)
                '#F6EACD',   // secondary (15.2%)
                '#FBFBEB',   // tertiary (12.9%)
                '#EEDFC0',   // accent (10.9%)
                '#1E3B58',   // accent (6.4%)
                '#E2D2B2',   // accent (6.2%)
                '#D8E4D8',   // accent (5.7%)
                '#324B66',   // accent (5.7%)
                '#BFCFC4',   // accent (3.9%)
                '#2C6187',   // accent (3.0%)
                '#828581',   // accent (2.9%)
                '#D2BD9E',   // accent (2.8%)
                '#172A3D',   // accent (2.4%)
                '#A1A6A0',   // accent (2.2%)
                '#57626D',   // accent (2.2%)
                '#457A9E',   // accent (1.9%)
            ],
            pcts: [15.6, 15.2, 12.9, 10.9, 6.4, 6.2, 5.7, 5.7, 3.9, 3.0, 2.9, 2.8, 2.4, 2.2, 2.2, 1.9],
            useBoxMuller: false
        },

        hokusai_fuji: {
            name: 'Hokusai — Red Fuji',
            artist: 'Katsushika Hokusai',
            school: 'Ukiyo-e',
            ref: 'Red Fuji (South Wind, Clear Sky) (1831)',
            bg: '#C17D6A',
            colors: [
                '#C17D6A',   // dominant (11.6%)
                '#FDF7EB',   // secondary (10.9%)
                '#44758D',   // tertiary (9.6%)
                '#F1DEBE',   // accent (8.3%)
                '#B06D5C',   // accent (7.5%)
                '#D8CEB2',   // accent (7.0%)
                '#CF907C',   // accent (6.1%)
                '#1C3E5D',   // accent (5.7%)
                '#315F7B',   // accent (5.5%)
                '#57899E',   // accent (5.5%)
                '#52666E',   // accent (5.0%)
                '#425058',   // accent (4.9%)
                '#B5BBA9',   // accent (3.9%)
                '#909D95',   // accent (3.6%)
                '#718582',   // accent (3.4%)
                '#745D55',   // accent (1.7%)
            ],
            pcts: [11.6, 10.9, 9.6, 8.3, 7.5, 7.0, 6.1, 5.7, 5.5, 5.5, 5.0, 4.9, 3.9, 3.6, 3.4, 1.7],
            useBoxMuller: false
        },

        hiroshige_woodblock: {
            name: 'Hiroshige — Plum Park in Kameido',
            artist: 'Utagawa Hiroshige',
            school: 'Ukiyo-e',
            ref: 'Plum Park in Kameido (1857)',
            bg: '#D0C9B9',
            colors: [
                '#D0C9B9',   // dominant (12.2%)
                '#435152',   // secondary (10.6%)
                '#525F60',   // tertiary (10.5%)
                '#364042',   // accent (8.3%)
                '#626D6D',   // accent (7.8%)
                '#C6BCAA',   // accent (7.6%)
                '#D9D4C6',   // accent (7.3%)
                '#B06C5F',   // accent (6.1%)
                '#292E2F',   // accent (5.9%)
                '#A25A4E',   // accent (5.2%)
                '#77807C',   // accent (4.6%)
                '#BC8572',   // accent (3.4%)
                '#C5A791',   // accent (3.2%)
                '#933F37',   // accent (2.9%)
                '#949C90',   // accent (2.2%)
                '#583D35',   // accent (2.1%)
            ],
            pcts: [12.2, 10.6, 10.5, 8.3, 7.8, 7.6, 7.3, 6.1, 5.9, 5.2, 4.6, 3.4, 3.2, 2.9, 2.2, 2.1],
            useBoxMuller: false
        },

        sargent_portrait: {
            name: 'Sargent — Madame X',
            artist: 'John Singer Sargent',
            school: 'Realism',
            ref: 'Madame X (1884)',
            bg: '#0F1418',
            colors: [
                '#0F1418',   // dominant (20.0%)
                '#473822',   // secondary (13.3%)
                '#57432C',   // tertiary (9.9%)
                '#3E311F',   // accent (9.5%)
                '#503D24',   // accent (9.0%)
                '#181C1B',   // accent (7.0%)
                '#24221C',   // accent (7.0%)
                '#5D4A33',   // accent (6.9%)
                '#31281D',   // accent (5.6%)
                '#4B3E2C',   // accent (5.5%)
                '#BDAFA3',   // accent (1.6%)
                '#D5C0B2',   // accent (1.5%)
                '#91806F',   // accent (0.9%)
                '#A99887',   // accent (0.9%)
                '#776755',   // accent (0.8%)
                '#E5D4C9',   // accent (0.5%)
            ],
            pcts: [20.0, 13.3, 9.9, 9.5, 9.0, 7.0, 7.0, 6.9, 5.6, 5.5, 1.6, 1.5, 0.9, 0.9, 0.8, 0.5],
            useBoxMuller: false
        },

        homer_american: {
            name: 'Homer — Snap the Whip',
            artist: 'Winslow Homer',
            school: 'Realism',
            ref: 'Snap the Whip (1872)',
            bg: '#4D401A',
            colors: [
                '#4D401A',   // dominant (13.0%)
                '#574A25',   // secondary (11.8%)
                '#3C3C1E',   // tertiary (8.5%)
                '#6B7364',   // accent (8.3%)
                '#7C816F',   // accent (8.2%)
                '#000000',   // accent (7.4%)
                '#46250F',   // accent (6.6%)
                '#2C2C16',   // accent (6.4%)
                '#6D5331',   // accent (6.0%)
                '#596356',   // accent (5.6%)
                '#281809',   // accent (4.4%)
                '#978E76',   // accent (4.3%)
                '#4A4F42',   // accent (3.5%)
                '#733916',   // accent (2.6%)
                '#8A633F',   // accent (2.4%)
                '#C0AB8E',   // accent (0.8%)
            ],
            pcts: [13.0, 11.8, 8.5, 8.3, 8.2, 7.4, 6.6, 6.4, 6.0, 5.6, 4.4, 4.3, 3.5, 2.6, 2.4, 0.8],
            useBoxMuller: false
        },

        elgreco_mannerist: {
            name: 'El Greco — The Burial of the Count of Orgaz',
            artist: 'El Greco',
            school: 'Mannerism',
            ref: 'The Burial of the Count of Orgaz (1586–1588)',
            bg: '#08060A',
            colors: [
                '#08060A',   // dominant (14.5%)
                '#BFBEBF',   // secondary (9.6%)
                '#191516',   // tertiary (9.2%)
                '#2D2522',   // accent (8.7%)
                '#3F362E',   // accent (8.5%)
                '#625C4D',   // accent (8.3%)
                '#4F493E',   // accent (8.0%)
                '#726F5D',   // accent (7.8%)
                '#83816F',   // accent (6.9%)
                '#979584',   // accent (4.9%)
                '#B5B095',   // accent (3.2%)
                '#8A713C',   // accent (2.8%)
                '#694B25',   // accent (2.5%)
                '#AA904C',   // accent (2.2%)
                '#DFDABD',   // accent (1.5%)
                '#CDB160',   // accent (1.3%)
            ],
            pcts: [14.5, 9.6, 9.2, 8.7, 8.5, 8.3, 8.0, 7.8, 6.9, 4.9, 3.2, 2.8, 2.5, 2.2, 1.5, 1.3],
            useBoxMuller: false
        },

        elgreco_toledo: {
            name: 'El Greco — View of Toledo',
            artist: 'El Greco',
            school: 'Mannerism',
            ref: 'View of Toledo (c. 1599–1600)',
            bg: '#272E25',
            colors: [
                '#272E25',   // dominant (13.8%)
                '#333929',   // secondary (12.4%)
                '#3E4331',   // tertiary (10.8%)
                '#1C231E',   // accent (10.0%)
                '#384545',   // accent (8.6%)
                '#2B3939',   // accent (8.2%)
                '#4B5237',   // accent (7.0%)
                '#4E6161',   // accent (5.2%)
                '#385457',   // accent (4.5%)
                '#5B6F6F',   // accent (4.2%)
                '#4A514E',   // accent (4.0%)
                '#214B51',   // accent (3.6%)
                '#606343',   // accent (3.6%)
                '#737F7D',   // accent (2.3%)
                '#959892',   // accent (1.2%)
                '#010101',   // accent (0.7%)
            ],
            pcts: [13.8, 12.4, 10.8, 10.0, 8.6, 8.2, 7.0, 5.2, 4.5, 4.2, 4.0, 3.6, 3.6, 2.3, 1.2, 0.7],
            useBoxMuller: true
        },

        velazquez_court: {
            name: 'Velázquez — Las Meninas',
            artist: 'Diego Velázquez',
            school: 'Baroque',
            ref: 'Las Meninas (1656)',
            bg: '#241C11',
            colors: [
                '#241C11',   // dominant (17.4%)
                '#18130B',   // secondary (15.8%)
                '#302619',   // tertiary (13.8%)
                '#0B0904',   // accent (12.8%)
                '#42341F',   // accent (8.4%)
                '#554328',   // accent (6.1%)
                '#43250D',   // accent (5.6%)
                '#6D5A3B',   // accent (3.9%)
                '#6F4119',   // accent (2.6%)
                '#B88650',   // accent (2.3%)
                '#D89965',   // accent (2.3%)
                '#916532',   // accent (2.2%)
                '#B6A079',   // accent (2.0%)
                '#8E7A57',   // accent (1.9%)
                '#DCBF95',   // accent (1.8%)
                '#F6E3BA',   // accent (1.1%)
            ],
            pcts: [17.4, 15.8, 13.8, 12.8, 8.4, 6.1, 5.6, 3.9, 2.6, 2.3, 2.3, 2.2, 2.0, 1.9, 1.8, 1.1],
            useBoxMuller: false
        },

        velazquez_pope: {
            name: 'Velázquez — Portrait of Pope Innocent X',
            artist: 'Diego Velázquez',
            school: 'Baroque',
            ref: 'Portrait of Pope Innocent X (1650)',
            bg: '#43251D',
            colors: [
                '#43251D',   // dominant (16.6%)
                '#592B1F',   // secondary (15.5%)
                '#271D1B',   // tertiary (11.5%)
                '#0F0D0F',   // accent (8.4%)
                '#E3E1CD',   // accent (7.0%)
                '#F1EFE8',   // accent (6.9%)
                '#792C1A',   // accent (6.2%)
                '#CBCFBC',   // accent (5.7%)
                '#E3AF8E',   // accent (3.4%)
                '#9B4A2B',   // accent (3.2%)
                '#CE9868',   // accent (3.1%)
                '#5E512D',   // accent (2.9%)
                '#B27746',   // accent (2.9%)
                '#B3B89C',   // accent (2.8%)
                '#797448',   // accent (2.2%)
                '#959973',   // accent (1.6%)
            ],
            pcts: [16.6, 15.5, 11.5, 8.4, 7.0, 6.9, 6.2, 5.7, 3.4, 3.2, 3.1, 2.9, 2.9, 2.8, 2.2, 1.6],
            useBoxMuller: false
        },

        rubens_baroque: {
            name: 'Rubens — The Three Graces',
            artist: 'Peter Paul Rubens',
            school: 'Baroque',
            ref: 'The Three Graces (c. 1635)',
            bg: '#302315',
            colors: [
                '#302315',   // dominant (11.6%)
                '#1B140E',   // secondary (11.1%)
                '#43331D',   // tertiary (10.7%)
                '#564226',   // accent (9.0%)
                '#695333',   // accent (7.4%)
                '#E7D7C3',   // accent (6.7%)
                '#7E643F',   // accent (6.2%)
                '#D9C4AB',   // accent (6.1%)
                '#94774C',   // accent (5.3%)
                '#C8AF93',   // accent (5.1%)
                '#F5E9D9',   // accent (4.9%)
                '#A68962',   // accent (4.9%)
                '#B69C7B',   // accent (4.9%)
                '#75899F',   // accent (2.6%)
                '#7A776C',   // accent (2.3%)
                '#B0BBC4',   // accent (1.4%)
            ],
            pcts: [11.6, 11.1, 10.7, 9.0, 7.4, 6.7, 6.2, 6.1, 5.3, 5.1, 4.9, 4.9, 4.9, 2.6, 2.3, 1.4],
            useBoxMuller: true
        },

    });
})();
