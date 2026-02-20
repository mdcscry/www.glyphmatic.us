/**
 * artist_palettes/impressionism.js
 * Impressionism & Post-Impressionism
 * 25 palettes
 */
(function() {
    'use strict';
    Object.assign(window.ARTIST_PALETTES, {

        gauguin_tahiti: {
            name: 'Gauguin — Where Do We Come From?',
            artist: 'Paul Gauguin',
            school: 'Post-Impressionism',
            ref: 'Where Do We Come From? What Are We? Where Are We Going? (1897–1898)',
            bg: '#2A2926',
            colors: [
                '#2A2926',   // dominant (14.0%)
                '#0F191B',   // secondary (12.4%)
                '#0E2A32',   // tertiary (11.2%)
                '#253B3F',   // accent (9.9%)
                '#47392A',   // accent (8.7%)
                '#0D3E53',   // accent (6.3%)
                '#424946',   // accent (5.8%)
                '#694E2D',   // accent (5.8%)
                '#265260',   // accent (5.8%)
                '#896935',   // accent (4.3%)
                '#B28032',   // accent (3.7%)
                '#4B6667',   // accent (3.5%)
                '#347593',   // accent (3.1%)
                '#86887D',   // accent (2.5%)
                '#E9B856',   // accent (1.6%)
                '#B5ACA8',   // accent (1.5%)
            ],
            pcts: [14.0, 12.4, 11.2, 9.9, 8.7, 6.3, 5.8, 5.8, 5.8, 4.3, 3.7, 3.5, 3.1, 2.5, 1.6, 1.5],
            useBoxMuller: true
        },

        gauguin_tahitian_women: {
            name: 'Gauguin — Ta Matete',
            artist: 'Paul Gauguin',
            school: 'Post-Impressionism',
            ref: 'Ta Matete (The Market) (1892)',
            bg: '#2B2515',
            colors: [
                '#2B2515',   // dominant (13.0%)
                '#403421',   // secondary (11.1%)
                '#181308',   // tertiary (9.3%)
                '#BDB1A1',   // accent (7.9%)
                '#504738',   // accent (7.5%)
                '#A69887',   // accent (6.2%)
                '#B33516',   // accent (6.1%)
                '#CC5227',   // accent (5.6%)
                '#755E48',   // accent (5.2%)
                '#DD9B23',   // accent (5.1%)
                '#D6CCB9',   // accent (4.9%)
                '#6D3820',   // accent (4.7%)
                '#917B64',   // accent (4.4%)
                '#515964',   // accent (4.3%)
                '#697582',   // accent (3.1%)
                '#E5AC57',   // accent (1.5%)
            ],
            pcts: [13.0, 11.1, 9.3, 7.9, 7.5, 6.2, 6.1, 5.6, 5.2, 5.1, 4.9, 4.7, 4.4, 4.3, 3.1, 1.5],
            useBoxMuller: false
        },

        vangogh_starry: {
            name: 'Van Gogh — The Starry Night',
            artist: 'Vincent van Gogh',
            school: 'Post-Impressionism',
            ref: 'The Starry Night (1889)',
            bg: '#1F312E',
            colors: [
                '#1F312E',   // dominant (10.7%)
                '#315F7F',   // secondary (10.1%)
                '#294C6C',   // tertiary (9.4%)
                '#46738E',   // accent (9.2%)
                '#466575',   // accent (8.1%)
                '#253C4F',   // accent (6.9%)
                '#425154',   // accent (6.8%)
                '#5E7D80',   // accent (6.6%)
                '#658B9B',   // accent (6.6%)
                '#3B3D36',   // accent (6.4%)
                '#87A59F',   // accent (4.7%)
                '#7F9379',   // accent (4.6%)
                '#ABAA7B',   // accent (3.8%)
                '#636C59',   // accent (3.1%)
                '#B7C2A7',   // accent (1.8%)
                '#A79536',   // accent (1.1%)
            ],
            pcts: [10.7, 10.1, 9.4, 9.2, 8.1, 6.9, 6.8, 6.6, 6.6, 6.4, 4.7, 4.6, 3.8, 3.1, 1.8, 1.1],
            useBoxMuller: false
        },

        vangogh_sunflowers: {
            name: 'Van Gogh — Sunflowers',
            artist: 'Vincent van Gogh',
            school: 'Post-Impressionism',
            ref: 'Sunflowers (1888)',
            bg: '#DBC879',
            colors: [
                '#DBC879',   // dominant (13.4%)
                '#E8D686',   // secondary (12.0%)
                '#AB8723',   // tertiary (9.9%)
                '#CEB86C',   // accent (9.5%)
                '#BA972E',   // accent (8.9%)
                '#8A5F1B',   // accent (8.2%)
                '#9E7115',   // accent (7.0%)
                '#97752D',   // accent (5.5%)
                '#BAA45C',   // accent (4.7%)
                '#CCA73B',   // accent (4.2%)
                '#724F16',   // accent (4.1%)
                '#F6E89B',   // accent (4.1%)
                '#9B8D49',   // accent (3.4%)
                '#6C7732',   // accent (3.2%)
                '#3E3E1F',   // accent (1.6%)
                '#42787A',   // accent (0.4%)
            ],
            pcts: [13.4, 12.0, 9.9, 9.5, 8.9, 8.2, 7.0, 5.5, 4.7, 4.2, 4.1, 4.1, 3.4, 3.2, 1.6, 0.4],
            useBoxMuller: false
        },

        vangogh_bedroom: {
            name: 'Van Gogh — The Bedroom',
            artist: 'Vincent van Gogh',
            school: 'Post-Impressionism',
            ref: 'The Bedroom (1888)',
            bg: '#986940',
            colors: [
                '#986940',   // dominant (13.0%)
                '#B27B4F',   // secondary (11.6%)
                '#DA9027',   // tertiary (11.3%)
                '#C1711F',   // accent (9.1%)
                '#7C5430',   // accent (9.0%)
                '#9EB5BD',   // accent (6.8%)
                '#8095A4',   // accent (6.2%)
                '#C8CFC0',   // accent (6.1%)
                '#E5E8DB',   // accent (5.4%)
                '#4D4221',   // accent (4.2%)
                '#C1A16A',   // accent (3.7%)
                '#A9A73E',   // accent (3.3%)
                '#E5D363',   // accent (2.8%)
                '#5A6971',   // accent (2.7%)
                '#9B3310',   // accent (2.4%)
                '#1C1B0D',   // accent (2.4%)
            ],
            pcts: [13.0, 11.6, 11.3, 9.1, 9.0, 6.8, 6.2, 6.1, 5.4, 4.2, 3.7, 3.3, 2.8, 2.7, 2.4, 2.4],
            useBoxMuller: false
        },

        vangogh_cafe: {
            name: 'Van Gogh — Café Terrace at Night',
            artist: 'Vincent van Gogh',
            school: 'Post-Impressionism',
            ref: 'Café Terrace at Night (1888)',
            bg: '#172526',
            colors: [
                '#172526',   // dominant (12.6%)
                '#263B44',   // secondary (11.2%)
                '#2B61B9',   // tertiary (9.4%)
                '#AC9251',   // accent (7.0%)
                '#D79C3A',   // accent (7.0%)
                '#846D41',   // accent (6.8%)
                '#898878',   // accent (5.8%)
                '#524933',   // accent (5.7%)
                '#B7AC8D',   // accent (5.2%)
                '#325380',   // accent (5.2%)
                '#B67634',   // accent (5.2%)
                '#60685E',   // accent (4.9%)
                '#5A7EAB',   // accent (3.7%)
                '#86A6CC',   // accent (3.6%)
                '#EBC451',   // accent (3.4%)
                '#D5D5BD',   // accent (3.3%)
            ],
            pcts: [12.6, 11.2, 9.4, 7.0, 7.0, 6.8, 5.8, 5.7, 5.2, 5.2, 5.2, 4.9, 3.7, 3.6, 3.4, 3.3],
            useBoxMuller: false
        },

        vangogh_crows: {
            name: 'Van Gogh — Wheat Field with Crows',
            artist: 'Vincent van Gogh',
            school: 'Post-Impressionism',
            ref: 'Wheat Field with Crows (1890)',
            bg: '#C4B415',
            colors: [
                '#C4B415',   // dominant (9.1%)
                '#143677',   // secondary (8.0%)
                '#82A6D7',   // tertiary (8.0%)
                '#5A80BF',   // accent (7.7%)
                '#E1D07F',   // accent (7.2%)
                '#D3C446',   // accent (7.2%)
                '#AB8748',   // accent (7.0%)
                '#BAA86F',   // accent (6.9%)
                '#33599F',   // accent (6.7%)
                '#865518',   // accent (6.4%)
                '#A19212',   // accent (5.5%)
                '#B3D0E7',   // accent (5.1%)
                '#0E1B37',   // accent (4.2%)
                '#4E370B',   // accent (3.9%)
                '#7A7B42',   // accent (3.6%)
                '#F7EDB1',   // accent (3.4%)
            ],
            pcts: [9.1, 8.0, 8.0, 7.7, 7.2, 7.2, 7.0, 6.9, 6.7, 6.4, 5.5, 5.1, 4.2, 3.9, 3.6, 3.4],
            useBoxMuller: false
        },

        cezanne_provence: {
            name: 'Cézanne — Mont Sainte-Victoire',
            artist: 'Paul Cézanne',
            school: 'Post-Impressionism',
            ref: 'Mont Sainte-Victoire (c. 1904–1906)',
            bg: '#AAB2C2',
            colors: [
                '#AAB2C2',   // dominant (14.2%)
                '#B9C0CB',   // secondary (10.7%)
                '#9BA2B2',   // tertiary (7.2%)
                '#433C40',   // accent (7.0%)
                '#63606B',   // accent (6.8%)
                '#ADA573',   // accent (6.4%)
                '#514D57',   // accent (6.3%)
                '#989164',   // accent (5.8%)
                '#757481',   // accent (5.7%)
                '#2F272F',   // accent (5.6%)
                '#7F7655',   // accent (5.0%)
                '#888A99',   // accent (4.6%)
                '#B8B38E',   // accent (4.5%)
                '#655A42',   // accent (4.4%)
                '#170F18',   // accent (3.6%)
                '#DBDAD6',   // accent (2.1%)
            ],
            pcts: [14.2, 10.7, 7.2, 7.0, 6.8, 6.4, 6.3, 5.8, 5.7, 5.6, 5.0, 4.6, 4.5, 4.4, 3.6, 2.1],
            useBoxMuller: true
        },

        cezanne_cards: {
            name: 'Cézanne — The Card Players',
            artist: 'Paul Cézanne',
            school: 'Post-Impressionism',
            ref: 'The Card Players (c. 1892–1896)',
            bg: '#2B2D2F',
            colors: [
                '#2B2D2F',   // dominant (12.1%)
                '#8C9898',   // secondary (8.9%)
                '#323940',   // tertiary (8.9%)
                '#798988',   // accent (7.9%)
                '#1D1F22',   // accent (7.8%)
                '#697573',   // accent (7.7%)
                '#3D4952',   // accent (7.6%)
                '#47392F',   // accent (7.4%)
                '#5D4839',   // accent (7.0%)
                '#A3A8A6',   // accent (5.4%)
                '#5B5E5B',   // accent (5.0%)
                '#7E5A3A',   // accent (4.7%)
                '#445E73',   // accent (4.1%)
                '#A17043',   // accent (2.8%)
                '#AD8D6E',   // accent (1.7%)
                '#020101',   // accent (1.0%)
            ],
            pcts: [12.1, 8.9, 8.9, 7.9, 7.8, 7.7, 7.6, 7.4, 7.0, 5.4, 5.0, 4.7, 4.1, 2.8, 1.7, 1.0],
            useBoxMuller: true
        },

        signac_pointillist: {
            name: 'Signac — The Dining Room',
            artist: 'Paul Signac',
            school: 'Pointillism',
            ref: 'The Dining Room (1886–1887)',
            bg: '#F0E3CE',
            colors: [
                '#F0E3CE',   // dominant (11.6%)
                '#E6D5B6',   // secondary (10.7%)
                '#362921',   // tertiary (7.7%)
                '#4E4237',   // accent (6.8%)
                '#20100A',   // accent (6.6%)
                '#90512B',   // accent (6.3%)
                '#72361C',   // accent (6.3%)
                '#C5C7BE',   // accent (6.0%)
                '#6B5D50',   // accent (5.8%)
                '#BE8E65',   // accent (5.6%)
                '#9A714E',   // accent (5.5%)
                '#541A0C',   // accent (5.5%)
                '#A4A89F',   // accent (4.4%)
                '#888379',   // accent (4.2%)
                '#D2B189',   // accent (3.7%)
                '#BB6B37',   // accent (3.4%)
            ],
            pcts: [11.6, 10.7, 7.7, 6.8, 6.6, 6.3, 6.3, 6.0, 5.8, 5.6, 5.5, 5.5, 4.4, 4.2, 3.7, 3.4],
            useBoxMuller: false
        },

        seurat_jatte: {
            name: 'Seurat — A Sunday on La Grande Jatte',
            artist: 'Georges Seurat',
            school: 'Pointillism',
            ref: 'A Sunday on La Grande Jatte (1884–1886)',
            bg: '#475646',
            colors: [
                '#475646',   // dominant (10.6%)
                '#566450',   // secondary (9.9%)
                '#867E53',   // tertiary (9.1%)
                '#4B505B',   // accent (8.6%)
                '#6F7450',   // accent (7.6%)
                '#675D5C',   // accent (7.4%)
                '#9A885E',   // accent (7.1%)
                '#414141',   // accent (6.6%)
                '#7E7A71',   // accent (6.2%)
                '#664643',   // accent (5.6%)
                '#5F6B70',   // accent (5.4%)
                '#82594B',   // accent (5.2%)
                '#879195',   // accent (3.7%)
                '#A6957A',   // accent (3.5%)
                '#B2ADA2',   // accent (2.8%)
                '#050302',   // accent (0.7%)
            ],
            pcts: [10.6, 9.9, 9.1, 8.6, 7.6, 7.4, 7.1, 6.6, 6.2, 5.6, 5.4, 5.2, 3.7, 3.5, 2.8, 0.7],
            useBoxMuller: false
        },

        seurat_circus: {
            name: 'Seurat — The Circus',
            artist: 'Georges Seurat',
            school: 'Pointillism',
            ref: 'The Circus (1890–1891)',
            bg: '#322F37',
            colors: [
                '#322F37',   // dominant (10.2%)
                '#212027',   // secondary (9.5%)
                '#4C413E',   // tertiary (9.1%)
                '#333D4E',   // accent (8.6%)
                '#62504B',   // accent (7.8%)
                '#444E5D',   // accent (7.3%)
                '#1E2B41',   // accent (7.3%)
                '#69432F',   // accent (7.2%)
                '#84513B',   // accent (6.9%)
                '#463125',   // accent (5.8%)
                '#775F58',   // accent (5.2%)
                '#5A606D',   // accent (5.2%)
                '#7A767B',   // accent (3.3%)
                '#996C55',   // accent (3.3%)
                '#090607',   // accent (1.6%)
                '#AA8D7A',   // accent (1.6%)
            ],
            pcts: [10.2, 9.5, 9.1, 8.6, 7.8, 7.3, 7.3, 7.2, 6.9, 5.8, 5.2, 5.2, 3.3, 3.3, 1.6, 1.6],
            useBoxMuller: false
        },

        monet_waterlilies: {
            name: 'Monet — Water Lilies',
            artist: 'Claude Monet',
            school: 'Impressionism',
            ref: 'Water Lilies (Large Composition) (1906)',
            bg: '#4F7C9A',
            colors: [
                '#4F7C9A',   // dominant (10.2%)
                '#597080',   // secondary (10.0%)
                '#4D6177',   // tertiary (9.4%)
                '#406265',   // accent (8.9%)
                '#406D8C',   // accent (8.8%)
                '#345E79',   // accent (8.2%)
                '#6388A4',   // accent (7.3%)
                '#52736A',   // accent (7.2%)
                '#2A575D',   // accent (6.9%)
                '#677D8B',   // accent (6.0%)
                '#829490',   // accent (4.1%)
                '#9AA5A3',   // accent (3.2%)
                '#194A44',   // accent (3.1%)
                '#466B49',   // accent (2.7%)
                '#6D896F',   // accent (2.6%)
                '#BCBDB7',   // accent (1.3%)
            ],
            pcts: [10.2, 10.0, 9.4, 8.9, 8.8, 8.2, 7.3, 7.2, 6.9, 6.0, 4.1, 3.2, 3.1, 2.7, 2.6, 1.3],
            useBoxMuller: true
        },

        monet_sunrise: {
            name: 'Monet — Impression, Sunrise',
            artist: 'Claude Monet',
            school: 'Impressionism',
            ref: 'Impression, Sunrise (1872)',
            bg: '#A0B2B9',
            colors: [
                '#A0B2B9',   // dominant (12.1%)
                '#8CA4AF',   // secondary (10.5%)
                '#BABFB3',   // tertiary (10.3%)
                '#A6AEA3',   // accent (9.3%)
                '#AFC1C5',   // accent (8.6%)
                '#7395A5',   // accent (7.8%)
                '#C3D1CD',   // accent (6.9%)
                '#909B94',   // accent (6.7%)
                '#DDCBB2',   // accent (5.8%)
                '#D3B79C',   // accent (5.1%)
                '#5A8091',   // accent (4.6%)
                '#78847D',   // accent (3.7%)
                '#E7E2CE',   // accent (3.6%)
                '#4E6364',   // accent (2.3%)
                '#C09B7E',   // accent (1.6%)
                '#1D2E35',   // accent (1.1%)
            ],
            pcts: [12.1, 10.5, 10.3, 9.3, 8.6, 7.8, 6.9, 6.7, 5.8, 5.1, 4.6, 3.7, 3.6, 2.3, 1.6, 1.1],
            useBoxMuller: false
        },

        monet_haystacks: {
            name: 'Monet — Haystacks at Sunset',
            artist: 'Claude Monet',
            school: 'Impressionism',
            ref: 'Haystacks (Sunset, Snow Effect) (1891)',
            bg: '#D3C9D1',
            colors: [
                '#D3C9D1',   // dominant (14.9%)
                '#CAC6D5',   // secondary (12.3%)
                '#C1BDCE',   // tertiary (11.6%)
                '#BDB7C4',   // accent (11.0%)
                '#CBC2CA',   // accent (11.0%)
                '#D7CFDB',   // accent (8.5%)
                '#B2AFC4',   // accent (6.0%)
                '#A2A1C2',   // accent (4.1%)
                '#9F8581',   // accent (3.5%)
                '#A68E94',   // accent (3.3%)
                '#9594B5',   // accent (3.0%)
                '#A799AA',   // accent (2.9%)
                '#9489A1',   // accent (2.8%)
                '#947970',   // accent (1.9%)
                '#BCADAD',   // accent (1.9%)
                '#8A7A8C',   // accent (1.6%)
            ],
            pcts: [14.9, 12.3, 11.6, 11.0, 11.0, 8.5, 6.0, 4.1, 3.5, 3.3, 3.0, 2.9, 2.8, 1.9, 1.9, 1.6],
            useBoxMuller: true
        },

        degas_ballet: {
            name: 'Degas — The Dance Class',
            artist: 'Edgar Degas',
            school: 'Impressionism',
            ref: 'The Dance Class (1874)',
            bg: '#635740',
            colors: [
                '#635740',   // dominant (13.7%)
                '#5E6852',   // secondary (11.2%)
                '#515F48',   // tertiary (10.6%)
                '#544C38',   // accent (10.5%)
                '#71654A',   // accent (7.8%)
                '#74735F',   // accent (6.8%)
                '#413D2E',   // accent (6.7%)
                '#010000',   // accent (6.6%)
                '#1F170F',   // accent (6.2%)
                '#322A1D',   // accent (5.9%)
                '#888570',   // accent (4.3%)
                '#9D9881',   // accent (3.1%)
                '#917754',   // accent (2.2%)
                '#59361C',   // accent (2.0%)
                '#7E4E2E',   // accent (1.6%)
                '#C1B99C',   // accent (0.9%)
            ],
            pcts: [13.7, 11.2, 10.6, 10.5, 7.8, 6.8, 6.7, 6.6, 6.2, 5.9, 4.3, 3.1, 2.2, 2.0, 1.6, 0.9],
            useBoxMuller: true
        },

        toulouselautrec_moulin: {
            name: 'Toulouse-Lautrec — Moulin Rouge: La Goulue',
            artist: 'Henri de Toulouse-Lautrec',
            school: 'Post-Impressionism',
            ref: 'Moulin Rouge: La Goulue (1891)',
            bg: '#22201B',
            colors: [
                '#22201B',   // dominant (14.2%)
                '#F2D5A0',   // secondary (9.5%)
                '#060606',   // tertiary (9.5%)
                '#D1B771',   // accent (9.0%)
                '#E2C04F',   // accent (8.2%)
                '#E5C97B',   // accent (7.6%)
                '#C1A556',   // accent (6.4%)
                '#9B8960',   // accent (5.9%)
                '#FCC604',   // accent (5.5%)
                '#B2A27A',   // accent (4.8%)
                '#ED5B18',   // accent (4.2%)
                '#7E6C4A',   // accent (3.8%)
                '#CDAB22',   // accent (3.2%)
                '#B03314',   // accent (3.1%)
                '#E82205',   // accent (2.8%)
                '#5B412A',   // accent (2.4%)
            ],
            pcts: [14.2, 9.5, 9.5, 9.0, 8.2, 7.6, 6.4, 5.9, 5.5, 4.8, 4.2, 3.8, 3.2, 3.1, 2.8, 2.4],
            useBoxMuller: false
        },

        toulouselautrec_jane: {
            name: 'Toulouse-Lautrec — Jane Avril',
            artist: 'Henri de Toulouse-Lautrec',
            school: 'Post-Impressionism',
            ref: 'Jane Avril Jardin de Paris (1893)',
            bg: '#F2E1AE',
            colors: [
                '#F2E1AE',   // dominant (17.3%)
                '#F9EBBB',   // secondary (12.6%)
                '#E8D6A0',   // tertiary (11.9%)
                '#E78216',   // accent (8.4%)
                '#DDC78E',   // accent (6.7%)
                '#615933',   // accent (5.9%)
                '#4F4721',   // accent (5.8%)
                '#3A340D',   // accent (5.0%)
                '#756C46',   // accent (4.5%)
                '#8F8159',   // accent (4.0%)
                '#A99970',   // accent (3.6%)
                '#EBC354',   // accent (3.4%)
                '#C3B187',   // accent (3.3%)
                '#CFB469',   // accent (3.3%)
                '#8C722C',   // accent (2.3%)
                '#B09549',   // accent (2.0%)
            ],
            pcts: [17.3, 12.6, 11.9, 8.4, 6.7, 5.9, 5.8, 5.0, 4.5, 4.0, 3.6, 3.4, 3.3, 3.3, 2.3, 2.0],
            useBoxMuller: false
        },

        renoir_light: {
            name: 'Renoir — Bal du moulin de la Galette',
            artist: 'Pierre-Auguste Renoir',
            school: 'Impressionism',
            ref: 'Bal du moulin de la Galette (1876)',
            bg: '#24292A',
            colors: [
                '#24292A',   // dominant (12.6%)
                '#151A1C',   // secondary (11.3%)
                '#2E3D3B',   // tertiary (9.4%)
                '#0B2C36',   // accent (8.1%)
                '#435751',   // accent (7.9%)
                '#4A4930',   // accent (6.2%)
                '#676F61',   // accent (5.8%)
                '#6A5F3C',   // accent (5.7%)
                '#8E764F',   // accent (5.3%)
                '#738784',   // accent (5.3%)
                '#A48D6B',   // accent (4.9%)
                '#446A73',   // accent (4.3%)
                '#1A4B55',   // accent (4.0%)
                '#97A59B',   // accent (3.6%)
                '#C3A684',   // accent (3.2%)
                '#D0C4AA',   // accent (2.5%)
            ],
            pcts: [12.6, 11.3, 9.4, 8.1, 7.9, 6.2, 5.8, 5.7, 5.3, 5.3, 4.9, 4.3, 4.0, 3.6, 3.2, 2.5],
            useBoxMuller: true
        },

        renoir_boating: {
            name: 'Renoir — Luncheon of the Boating Party',
            artist: 'Pierre-Auguste Renoir',
            school: 'Impressionism',
            ref: 'Luncheon of the Boating Party (1880–1881)',
            bg: '#1C2326',
            colors: [
                '#1C2326',   // dominant (12.6%)
                '#342F27',   // secondary (10.2%)
                '#3E413A',   // tertiary (7.5%)
                '#8C8072',   // accent (7.2%)
                '#A19589',   // accent (6.2%)
                '#736C5E',   // accent (6.2%)
                '#B9AB9F',   // accent (5.8%)
                '#D3C3B1',   // accent (5.5%)
                '#A77252',   // accent (5.5%)
                '#57564D',   // accent (5.4%)
                '#B7896E',   // accent (5.3%)
                '#935C43',   // accent (5.3%)
                '#754D39',   // accent (5.2%)
                '#583B29',   // accent (5.1%)
                '#CCA285',   // accent (3.9%)
                '#ECE0CE',   // accent (3.0%)
            ],
            pcts: [12.6, 10.2, 7.5, 7.2, 6.2, 6.2, 5.8, 5.5, 5.5, 5.4, 5.3, 5.3, 5.2, 5.1, 3.9, 3.0],
            useBoxMuller: true
        },

        cassatt_pastel: {
            name: 'Cassatt — The Child\'s Bath',
            artist: 'Mary Cassatt',
            school: 'Impressionism',
            ref: 'The Child\'s Bath (1893)',
            bg: '#EDC69D',
            colors: [
                '#EDC69D',   // dominant (19.1%)
                '#F1D1AD',   // secondary (17.3%)
                '#E6B98D',   // tertiary (12.4%)
                '#E79C29',   // accent (11.9%)
                '#F7DCBF',   // accent (8.9%)
                '#E7A441',   // accent (6.7%)
                '#516F62',   // accent (4.7%)
                '#D6A574',   // accent (3.2%)
                '#638175',   // accent (2.9%)
                '#455A4A',   // accent (2.7%)
                '#C6832C',   // accent (2.5%)
                '#8D5819',   // accent (1.9%)
                '#54300E',   // accent (1.9%)
                '#A8A98D',   // accent (1.4%)
                '#A27E55',   // accent (1.4%)
                '#190C08',   // accent (1.2%)
            ],
            pcts: [19.1, 17.3, 12.4, 11.9, 8.9, 6.7, 4.7, 3.2, 2.9, 2.7, 2.5, 1.9, 1.9, 1.4, 1.4, 1.2],
            useBoxMuller: true
        },

        morisot_impressionist: {
            name: 'Morisot — The Cradle',
            artist: 'Berthe Morisot',
            school: 'Impressionism',
            ref: 'The Cradle (1872)',
            bg: '#B6ADA2',
            colors: [
                '#B6ADA2',   // dominant (12.5%)
                '#C3B8AB',   // secondary (12.4%)
                '#CEC3B5',   // tertiary (11.7%)
                '#D9CFC1',   // accent (11.3%)
                '#AAA39A',   // accent (10.5%)
                '#E5DCCC',   // accent (7.7%)
                '#302E2A',   // accent (6.8%)
                '#403B34',   // accent (6.0%)
                '#9C948D',   // accent (5.6%)
                '#89817B',   // accent (3.6%)
                '#4A4E4F',   // accent (2.4%)
                '#5F4E3A',   // accent (2.1%)
                '#636564',   // accent (2.1%)
                '#CEAE8D',   // accent (2.0%)
                '#B79875',   // accent (2.0%)
                '#866D55',   // accent (1.3%)
            ],
            pcts: [12.5, 12.4, 11.7, 11.3, 10.5, 7.7, 6.8, 6.0, 5.6, 3.6, 2.4, 2.1, 2.1, 2.0, 2.0, 1.3],
            useBoxMuller: true
        },

        caillebotte_paris: {
            name: 'Caillebotte — Paris Street; Rainy Day',
            artist: 'Gustave Caillebotte',
            school: 'Impressionism',
            ref: 'Paris Street; Rainy Day (1877)',
            bg: '#E3DBC2',
            colors: [
                '#E3DBC2',   // dominant (11.5%)
                '#B4AF9F',   // secondary (9.3%)
                '#CCCCBD',   // tertiary (8.7%)
                '#BDBDB2',   // accent (8.6%)
                '#A49F95',   // accent (7.6%)
                '#3C3C36',   // accent (7.3%)
                '#494B48',   // accent (7.0%)
                '#807A73',   // accent (5.5%)
                '#515C5B',   // accent (5.4%)
                '#938D84',   // accent (5.3%)
                '#312F23',   // accent (4.8%)
                '#A2AAAA',   // accent (4.5%)
                '#6B6560',   // accent (4.4%)
                '#818E95',   // accent (3.5%)
                '#637479',   // accent (3.4%)
                '#A1796E',   // accent (3.3%)
            ],
            pcts: [11.5, 9.3, 8.7, 8.6, 7.6, 7.3, 7.0, 5.5, 5.4, 5.3, 4.8, 4.5, 4.4, 3.5, 3.4, 3.3],
            useBoxMuller: true
        },

        pissarro_village: {
            name: 'Pissarro — The Harvest',
            artist: 'Camille Pissarro',
            school: 'Impressionism',
            ref: 'The Harvest (1882)',
            bg: '#D2CAC1',
            colors: [
                '#D2CAC1',   // dominant (11.6%)
                '#AFA787',   // secondary (10.1%)
                '#C3B188',   // tertiary (9.3%)
                '#A2997B',   // accent (8.8%)
                '#C0BDB9',   // accent (7.8%)
                '#B2B29D',   // accent (7.4%)
                '#BDA471',   // accent (7.2%)
                '#CABE9D',   // accent (6.6%)
                '#AD9461',   // accent (5.8%)
                '#91866B',   // accent (5.2%)
                '#97A297',   // accent (4.3%)
                '#7F8F87',   // accent (4.0%)
                '#987F4F',   // accent (3.4%)
                '#697475',   // accent (2.9%)
                '#776B57',   // accent (2.9%)
                '#564F4E',   // accent (2.6%)
            ],
            pcts: [11.6, 10.1, 9.3, 8.8, 7.8, 7.4, 7.2, 6.6, 5.8, 5.2, 4.3, 4.0, 3.4, 2.9, 2.9, 2.6],
            useBoxMuller: false
        },

        pissarro_boulevard: {
            name: 'Pissarro — Boulevard Montmartre at Night',
            artist: 'Camille Pissarro',
            school: 'Impressionism',
            ref: 'Boulevard Montmartre at Night (1897)',
            bg: '#1E2D43',
            colors: [
                '#1E2D43',   // dominant (10.2%)
                '#111D33',   // secondary (9.3%)
                '#424F61',   // tertiary (9.0%)
                '#536074',   // accent (8.6%)
                '#2E3D53',   // accent (7.9%)
                '#403E3C',   // accent (7.3%)
                '#5F5549',   // accent (6.5%)
                '#2E2823',   // accent (6.2%)
                '#7D7C7B',   // accent (6.0%)
                '#786B5B',   // accent (5.8%)
                '#0F0F13',   // accent (5.4%)
                '#8B6132',   // accent (4.8%)
                '#94908F',   // accent (4.7%)
                '#634524',   // accent (3.7%)
                '#A7855A',   // accent (3.3%)
                '#C6B6A2',   // accent (1.2%)
            ],
            pcts: [10.2, 9.3, 9.0, 8.6, 7.9, 7.3, 6.5, 6.2, 6.0, 5.8, 5.4, 4.8, 4.7, 3.7, 3.3, 1.2],
            useBoxMuller: false
        },

    });
})();
