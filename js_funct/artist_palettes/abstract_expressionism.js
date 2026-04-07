/**
 * artist_palettes/abstract_expressionism.js
 * Abstract Expressionism & Color Field
 * 33 palettes — colors sampled from specific referenced paintings
 */
(function() {
    'use strict';
    Object.assign(window.ARTIST_PALETTES, {

        rothko_classic: {
            name: 'Rothko — No. 61 (Rust and Blue)',
            artist: 'Mark Rothko',
            school: 'Color Field',
            ref: 'No. 61 (Rust and Blue) (1953)',
            bg: '#360D1A',
            colors: [
                '#360D1A',   // dominant (12.3%)
                '#332E4D',   // secondary (10.7%)
                '#311224',   // tertiary (10.0%)
                '#3B5BB9',   // accent (8.8%)
                '#383558',   // accent (8.3%)
                '#3655AF',   // accent (7.8%)
                '#2D2746',   // accent (6.1%)
                '#3A1629',   // accent (5.9%)
                '#2A0816',   // accent (5.1%)
                '#24265B',   // accent (4.3%)
                '#41111D',   // accent (4.0%)
                '#3D3C64',   // accent (3.9%)
                '#2B306D',   // accent (3.8%)
                '#333D85',   // accent (3.5%)
                '#364F9E',   // accent (3.1%)
                '#291A3B',   // accent (2.2%)
            ],
            pcts: [12.3, 10.7, 10.0, 8.8, 8.3, 7.8, 6.1, 5.9, 5.1, 4.3, 4.0, 3.9, 3.8, 3.5, 3.1, 2.2],
            useBoxMuller: true
        },

        rothko_seagram: {
            name: 'Rothko — Seagram Murals',
            artist: 'Mark Rothko',
            school: 'Color Field',
            ref: 'Seagram Murals (1958–1959)',
            bg: '#6B3938',
            colors: [
                '#6B3938',   // dominant (14.5%)
                '#713F3B',   // secondary (11.6%)
                '#6D3A3C',   // tertiary (11.5%)
                '#CD4D38',   // accent (9.8%)
                '#D44F3A',   // accent (9.1%)
                '#D54B33',   // accent (9.0%)
                '#DC4C32',   // accent (7.6%)
                '#7A433C',   // accent (6.1%)
                '#DE5037',   // accent (5.6%)
                '#C44E3D',   // accent (4.3%)
                '#613333',   // accent (2.5%)
                '#B34D3F',   // accent (2.2%)
                '#8B473C',   // accent (2.1%)
                '#DA5441',   // accent (1.8%)
                '#9F4B3F',   // accent (1.8%)
                '#522325',   // accent (0.4%)
            ],
            pcts: [14.5, 11.6, 11.5, 9.8, 9.1, 9.0, 7.6, 6.1, 5.6, 4.3, 2.5, 2.2, 2.1, 1.8, 1.8, 0.4],
            useBoxMuller: true
        },

        rothko_orange_yellow: {
            name: 'Rothko — Orange and Yellow',
            artist: 'Mark Rothko',
            school: 'Color Field',
            ref: 'Orange and Yellow (1956)',
            bg: '#F8C537',
            colors: [
                '#F8C537',   // dominant (11.7%)
                '#EF692E',   // secondary (11.5%)
                '#F17133',   // tertiary (11.4%)
                '#F27836',   // accent (11.4%)
                '#EB612A',   // accent (9.5%)
                '#F3BC36',   // accent (9.1%)
                '#EBB035',   // accent (6.4%)
                '#EC874C',   // accent (5.9%)
                '#F29560',   // accent (4.7%)
                '#F28F54',   // accent (4.2%)
                '#EB833D',   // accent (3.5%)
                '#E57E44',   // accent (3.1%)
                '#ED9B3A',   // accent (2.3%)
                '#F4B140',   // accent (2.2%)
                '#F4A455',   // accent (1.5%)
                '#F4A369',   // accent (1.5%)
            ],
            pcts: [11.7, 11.5, 11.4, 11.4, 9.5, 9.1, 6.4, 5.9, 4.7, 4.2, 3.5, 3.1, 2.3, 2.2, 1.5, 1.5],
            useBoxMuller: true
        },

        rothko_dark: {
            name: 'Rothko — Four Darks in Red',
            artist: 'Mark Rothko',
            school: 'Color Field',
            ref: 'Four Darks in Red (1958)',
            bg: '#262625',
            colors: [
                '#262625',   // dominant (21.8%)
                '#542F28',   // secondary (15.9%)
                '#5B312B',   // tertiary (14.5%)
                '#2C2A2A',   // accent (9.7%)
                '#66332F',   // accent (8.4%)
                '#4A3631',   // accent (5.4%)
                '#75332F',   // accent (4.1%)
                '#3A2D2C',   // accent (3.7%)
                '#AD4741',   // accent (3.3%)
                '#A2383A',   // accent (3.3%)
                '#8B3534',   // accent (2.4%)
                '#BA574B',   // accent (2.2%)
                '#793E39',   // accent (2.0%)
                '#914842',   // accent (1.4%)
                '#C76D5A',   // accent (1.2%)
                '#9F5B57',   // accent (0.6%)
            ],
            pcts: [21.8, 15.9, 14.5, 9.7, 8.4, 5.4, 4.1, 3.7, 3.3, 3.3, 2.4, 2.2, 2.0, 1.4, 1.2, 0.6],
            useBoxMuller: true
        },

        twombly_gestural: {
            name: 'Twombly — Roman Notes',
            artist: 'Cy Twombly',
            school: 'Abstract Expressionism',
            ref: 'Roman Notes I (1970)',
            bg: '#CBC6BB',
            colors: [
                '#CBC6BB',   // dominant (22.6%)
                '#D1CBC0',   // secondary (21.5%)
                '#C5C1B5',   // tertiary (15.5%)
                '#D7D1C7',   // accent (14.6%)
                '#E0D9CF',   // accent (6.3%)
                '#BDB8AA',   // accent (5.0%)
                '#142F50',   // accent (2.7%)
                '#253B5B',   // accent (1.9%)
                '#ABB5B8',   // accent (1.7%)
                '#93A2AA',   // accent (1.5%)
                '#79909F',   // accent (1.5%)
                '#184973',   // accent (1.4%)
                '#3F5570',   // accent (1.1%)
                '#607386',   // accent (1.1%)
                '#5686A3',   // accent (0.9%)
                '#306C90',   // accent (0.9%)
            ],
            pcts: [22.6, 21.5, 15.5, 14.6, 6.3, 5.0, 2.7, 1.9, 1.7, 1.5, 1.5, 1.4, 1.1, 1.1, 0.9, 0.9],
            useBoxMuller: true
        },

        frankenthaler_stained: {
            name: 'Frankenthaler — Mountains and Sea',
            artist: 'Helen Frankenthaler',
            school: 'Color Field',
            ref: 'Mountains and Sea (1952)',
            bg: '#E5D3B0',
            colors: [
                '#E5D3B0',   // dominant (20.0%)
                '#EADDBB',   // secondary (13.8%)
                '#DFC9A6',   // tertiary (11.8%)
                '#C0C2A5',   // accent (8.5%)
                '#CDC9B4',   // accent (7.8%)
                '#DEBA9B',   // accent (6.2%)
                '#CCCFC7',   // accent (5.9%)
                '#B1B59D',   // accent (4.1%)
                '#7AA3BB',   // accent (4.0%)
                '#B6C1BE',   // accent (4.0%)
                '#E39F84',   // accent (3.2%)
                '#9F9F8B',   // accent (2.8%)
                '#97B0B7',   // accent (2.4%)
                '#C6AB88',   // accent (2.1%)
                '#BA9264',   // accent (1.7%)
                '#6C92A8',   // accent (1.7%)
            ],
            pcts: [20.0, 13.8, 11.8, 8.5, 7.8, 6.2, 5.9, 4.1, 4.0, 4.0, 3.2, 2.8, 2.4, 2.1, 1.7, 1.7],
            useBoxMuller: true
        },

        frankenthaler_interior: {
            name: 'Frankenthaler — Interior Landscape',
            artist: 'Helen Frankenthaler',
            school: 'Color Field',
            ref: 'Interior Landscape (1964)',
            bg: '#7985C0',
            colors: [
                '#7985C0',   // dominant (12.4%)
                '#EAD570',   // secondary (12.2%)
                '#595A6A',   // tertiary (11.8%)
                '#8A8D74',   // accent (11.3%)
                '#6F7FA4',   // accent (6.8%)
                '#DAC9B7',   // accent (6.6%)
                '#505262',   // accent (6.0%)
                '#6B7452',   // accent (5.9%)
                '#616270',   // accent (5.6%)
                '#818ECB',   // accent (4.9%)
                '#E2D1BF',   // accent (4.1%)
                '#FFFFFF',   // accent (3.5%)
                '#65866B',   // accent (3.3%)
                '#81856B',   // accent (2.9%)
                '#A19E80',   // accent (1.4%)
                '#BCB193',   // accent (1.2%)
            ],
            pcts: [12.4, 12.2, 11.8, 11.3, 6.8, 6.6, 6.0, 5.9, 5.6, 4.9, 4.1, 3.5, 3.3, 2.9, 1.4, 1.2],
            useBoxMuller: true
        },

        pollock_drip: {
            name: 'Pollock — Number 31',
            artist: 'Jackson Pollock',
            school: 'Abstract Expressionism',
            ref: 'Number 31 (1950)',
            bg: '#7C7059',
            colors: [
                '#7C7059',   // dominant (8.4%)
                '#8E8166',   // secondary (8.1%)
                '#6B5F49',   // tertiary (8.1%)
                '#372E20',   // accent (8.0%)
                '#271E11',   // accent (7.7%)
                '#483E2E',   // accent (7.4%)
                '#5A4F3C',   // accent (7.4%)
                '#9B907B',   // accent (6.4%)
                '#DBCAA9',   // accent (6.2%)
                '#B0A48E',   // accent (6.0%)
                '#130A02',   // accent (5.7%)
                '#E7DBC3',   // accent (4.8%)
                '#C3B9A4',   // accent (4.6%)
                '#CCB68B',   // accent (4.5%)
                '#B29D72',   // accent (4.0%)
                '#FAF2DE',   // accent (2.9%)
            ],
            pcts: [8.4, 8.1, 8.1, 8.0, 7.7, 7.4, 7.4, 6.4, 6.2, 6.0, 5.7, 4.8, 4.6, 4.5, 4.0, 2.9],
            useBoxMuller: true
        },

        pollock_lavender: {
            name: 'Pollock — Lavender Mist',
            artist: 'Jackson Pollock',
            school: 'Abstract Expressionism',
            ref: 'Lavender Mist: Number 1, 1950 (1950)',
            bg: '#ADA699',
            colors: [
                '#ADA699',   // dominant (8.8%)
                '#A0998D',   // secondary (8.8%)
                '#928D82',   // tertiary (8.1%)
                '#CCC2B1',   // accent (7.6%)
                '#868176',   // accent (7.5%)
                '#D9D0BF',   // accent (7.0%)
                '#78756C',   // accent (6.9%)
                '#B9B4A8',   // accent (6.9%)
                '#6C675F',   // accent (6.5%)
                '#5D5951',   // accent (6.2%)
                '#4D4942',   // accent (5.8%)
                '#E6DFCD',   // accent (5.7%)
                '#3C3832',   // accent (5.0%)
                '#C6B099',   // accent (3.4%)
                '#282520',   // accent (3.3%)
                '#F4F0E3',   // accent (2.3%)
            ],
            pcts: [8.8, 8.8, 8.1, 7.6, 7.5, 7.0, 6.9, 6.9, 6.5, 6.2, 5.8, 5.7, 5.0, 3.4, 3.3, 2.3],
            useBoxMuller: true
        },

        pollock_autumn: {
            name: 'Pollock — Autumn Rhythm',
            artist: 'Jackson Pollock',
            school: 'Abstract Expressionism',
            ref: 'Autumn Rhythm: Number 30 (1950)',
            bg: '#D4BFAA',
            colors: [
                '#D4BFAA',   // dominant (8.6%)
                '#332218',   // secondary (7.8%)
                '#25130A',   // tertiary (7.7%)
                '#140501',   // accent (7.7%)
                '#CCB396',   // accent (7.4%)
                '#443226',   // accent (6.7%)
                '#7F6855',   // accent (6.4%)
                '#E0CFBF',   // accent (6.4%)
                '#6A5647',   // accent (6.1%)
                '#A39080',   // accent (6.0%)
                '#564336',   // accent (5.8%)
                '#BC9F7F',   // accent (5.6%)
                '#8D7A6B',   // accent (5.6%)
                '#B8A698',   // accent (5.4%)
                '#A58563',   // accent (3.9%)
                '#F1E3D7',   // accent (3.1%)
            ],
            pcts: [8.6, 7.8, 7.7, 7.7, 7.4, 6.7, 6.4, 6.4, 6.1, 6.0, 5.8, 5.6, 5.6, 5.4, 3.9, 3.1],
            useBoxMuller: true
        },

        krasner_abstract: {
            name: 'Krasner — The Seasons',
            artist: 'Lee Krasner',
            school: 'Abstract Expressionism',
            ref: 'The Seasons (1957)',
            bg: '#E2CEB4',
            colors: [
                '#E2CEB4',   // dominant (15.4%)
                '#EBDBC2',   // secondary (10.7%)
                '#DCBAA6',   // tertiary (8.9%)
                '#94866A',   // accent (6.5%)
                '#AC9C80',   // accent (6.1%)
                '#64533B',   // accent (5.9%)
                '#D99991',   // accent (5.8%)
                '#C0B296',   // accent (5.6%)
                '#CC7A7E',   // accent (5.6%)
                '#BE5D6C',   // accent (5.4%)
                '#6E7F57',   // accent (5.2%)
                '#B03E59',   // accent (5.2%)
                '#4A3726',   // accent (4.8%)
                '#846552',   // accent (4.6%)
                '#0F5C31',   // accent (2.9%)
                '#377749',   // accent (1.4%)
            ],
            pcts: [15.4, 10.7, 8.9, 6.5, 6.1, 5.9, 5.8, 5.6, 5.6, 5.4, 5.2, 5.2, 4.8, 4.6, 2.9, 1.4],
            useBoxMuller: false
        },

        krasner_mosaic: {
            name: 'Krasner — Palingenesis',
            artist: 'Lee Krasner',
            school: 'Abstract Expressionism',
            ref: 'Palingenesis (1971)',
            bg: '#992846',
            colors: [
                '#992846',   // dominant (15.7%)
                '#016837',   // secondary (13.4%)
                '#2F3221',   // tertiary (11.5%)
                '#A7274A',   // accent (11.1%)
                '#027942',   // accent (9.8%)
                '#C63277',   // accent (7.8%)
                '#3C4229',   // accent (7.7%)
                '#A93653',   // accent (5.8%)
                '#E2D1B9',   // accent (4.8%)
                '#E9DBC7',   // accent (4.5%)
                '#515738',   // accent (3.0%)
                '#6D7352',   // accent (2.0%)
                '#CDB091',   // accent (1.1%)
                '#879C72',   // accent (0.8%)
                '#C07273',   // accent (0.7%)
                '#358F55',   // accent (0.5%)
            ],
            pcts: [15.7, 13.4, 11.5, 11.1, 9.8, 7.8, 7.7, 5.8, 4.8, 4.5, 3.0, 2.0, 1.1, 0.8, 0.7, 0.5],
            useBoxMuller: true
        },

        krasner_eye: {
            name: 'Krasner — The Eye is the First Circle',
            artist: 'Lee Krasner',
            school: 'Abstract Expressionism',
            ref: 'The Eye Is the First Circle (1960)',
            bg: '#D3C8B7',
            colors: [
                '#D3C8B7',   // dominant (11.6%)
                '#FEFEFE',   // secondary (11.0%)
                '#403029',   // tertiary (7.9%)
                '#32241E',   // accent (7.1%)
                '#BBAB95',   // accent (6.6%)
                '#4F3D33',   // accent (6.3%)
                '#C3BBAD',   // accent (6.1%)
                '#DAD3C8',   // accent (5.9%)
                '#AD9B85',   // accent (5.5%)
                '#5F4C3F',   // accent (5.3%)
                '#D0BC9E',   // accent (5.1%)
                '#9D8B77',   // accent (5.0%)
                '#6F5B4B',   // accent (4.9%)
                '#8E7B67',   // accent (4.7%)
                '#7E6B59',   // accent (4.6%)
                '#F1F0F0',   // accent (2.3%)
            ],
            pcts: [11.6, 11.0, 7.9, 7.1, 6.6, 6.3, 6.1, 5.9, 5.5, 5.3, 5.1, 5.0, 4.9, 4.7, 4.6, 2.3],
            useBoxMuller: false
        },

        kline_blackwhite: {
            name: 'Kline — Chief',
            artist: 'Franz Kline',
            school: 'Abstract Expressionism',
            ref: 'Chief (1950)',
            bg: '#0A0A09',
            colors: [
                '#0A0A09',   // dominant (19.4%)
                '#151515',   // secondary (13.2%)
                '#10100F',   // tertiary (11.6%)
                '#1A1A1A',   // accent (9.9%)
                '#E5E5D7',   // accent (9.8%)
                '#EEEEE3',   // accent (9.6%)
                '#DDDDCD',   // accent (7.4%)
                '#F7F6EF',   // accent (7.4%)
                '#242421',   // accent (3.8%)
                '#CECFC1',   // accent (1.9%)
                '#3A3831',   // accent (1.5%)
                '#B8B8AC',   // accent (1.1%)
                '#515046',   // accent (1.1%)
                '#6B6A5F',   // accent (0.8%)
                '#9F9F92',   // accent (0.7%)
                '#868579',   // accent (0.7%)
            ],
            pcts: [19.4, 13.2, 11.6, 9.9, 9.8, 9.6, 7.4, 7.4, 3.8, 1.9, 1.5, 1.1, 1.1, 0.8, 0.7, 0.7],
            useBoxMuller: true
        },

        dekooning_women: {
            name: 'de Kooning — Woman I',
            artist: 'Willem de Kooning',
            school: 'Abstract Expressionism',
            ref: 'Woman I (1950–1952)',
            bg: '#C7B9A7',
            colors: [
                '#C7B9A7',   // dominant (11.9%)
                '#ABA698',   // secondary (10.8%)
                '#7A826F',   // tertiary (10.6%)
                '#959283',   // accent (10.4%)
                '#6D6A5B',   // accent (9.2%)
                '#9D875B',   // accent (8.5%)
                '#53504A',   // accent (6.8%)
                '#BEA275',   // accent (6.6%)
                '#D8D2C6',   // accent (6.2%)
                '#619E8E',   // accent (4.8%)
                '#353531',   // accent (4.1%)
                '#DA8676',   // accent (2.8%)
                '#BB594B',   // accent (2.6%)
                '#368067',   // accent (2.1%)
                '#D1A12C',   // accent (1.6%)
                '#159CA2',   // accent (0.8%)
            ],
            pcts: [11.9, 10.8, 10.6, 10.4, 9.2, 8.5, 6.8, 6.6, 6.2, 4.8, 4.1, 2.8, 2.6, 2.1, 1.6, 0.8],
            useBoxMuller: false
        },

        dekooning_excavation: {
            name: 'de Kooning — Excavation',
            artist: 'Willem de Kooning',
            school: 'Abstract Expressionism',
            ref: 'Excavation (1950)',
            bg: '#332A22',
            colors: [
                '#332A22',   // dominant (15.3%)
                '#473D32',   // secondary (12.9%)
                '#5D5142',   // tertiary (10.1%)
                '#201711',   // accent (9.8%)
                '#6B6B59',   // accent (7.4%)
                '#DBB27D',   // accent (6.1%)
                '#B58E64',   // accent (6.0%)
                '#808B71',   // accent (5.6%)
                '#93724E',   // accent (5.5%)
                '#F5D69D',   // accent (5.5%)
                '#AAA889',   // accent (4.3%)
                '#F8EFCF',   // accent (4.1%)
                '#C3CEB4',   // accent (2.6%)
                '#EDEE50',   // accent (1.9%)
                '#ADBA41',   // accent (1.5%)
                '#6E7D1E',   // accent (1.4%)
            ],
            pcts: [15.3, 12.9, 10.1, 9.8, 7.4, 6.1, 6.0, 5.6, 5.5, 5.5, 4.3, 4.1, 2.6, 1.9, 1.5, 1.4],
            useBoxMuller: false
        },

        still_clyfford: {
            name: 'Clyfford Still — 1957-D No. 1',
            artist: 'Clyfford Still',
            school: 'Color Field',
            ref: 'PH-950, 1957-D No.1 (1957)',
            bg: '#D59F14',
            colors: [
                '#D59F14',   // dominant (18.6%)
                '#212122',   // secondary (18.2%)
                '#D7A21F',   // tertiary (15.4%)
                '#252629',   // accent (14.5%)
                '#D19C1D',   // accent (14.0%)
                '#D39F2B',   // accent (7.6%)
                '#2D2D2F',   // accent (5.3%)
                '#18254F',   // accent (1.4%)
                '#E5B31C',   // accent (1.3%)
                '#DEC9A7',   // accent (1.3%)
                '#B1A99B',   // accent (0.4%)
                '#535150',   // accent (0.4%)
                '#8C826F',   // accent (0.4%)
                '#D5D5D2',   // accent (0.4%)
                '#D3AE67',   // accent (0.3%)
                '#A08337',   // accent (0.3%)
            ],
            pcts: [18.6, 18.2, 15.4, 14.5, 14.0, 7.6, 5.3, 1.4, 1.3, 1.3, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3],
            useBoxMuller: false
        },

        motherwell_elegy: {
            name: 'Motherwell — Elegy No. 110',
            artist: 'Robert Motherwell',
            school: 'Abstract Expressionism',
            ref: 'Elegy to the Spanish Republic No. 110 (1971)',
            bg: '#0A090E',
            colors: [
                '#0A090E',   // dominant (31.4%)
                '#0D0C11',   // secondary (24.7%)
                '#110F14',   // tertiary (10.8%)
                '#FEFCF6',   // accent (7.9%)
                '#DACBB4',   // accent (5.5%)
                '#E3D5BC',   // accent (4.3%)
                '#F9F4EB',   // accent (3.8%)
                '#EFE9DF',   // accent (2.8%)
                '#040203',   // accent (2.2%)
                '#D0C1A9',   // accent (2.1%)
                '#E6DED0',   // accent (2.1%)
                '#ADA6A1',   // accent (0.6%)
                '#908B87',   // accent (0.6%)
                '#322D2A',   // accent (0.4%)
                '#726B65',   // accent (0.4%)
                '#524C46',   // accent (0.3%)
            ],
            pcts: [31.4, 24.7, 10.8, 7.9, 5.5, 4.3, 3.8, 2.8, 2.2, 2.1, 2.1, 0.6, 0.6, 0.4, 0.4, 0.3],
            useBoxMuller: true
        },

        newman_vir: {
            name: 'Newman — Vir Heroicus Sublimis',
            artist: 'Barnett Newman',
            school: 'Color Field',
            ref: 'Vir Heroicus Sublimis (1950–1951)',
            bg: '#D7170B',
            colors: [
                '#D7170B',   // dominant (14.7%)
                '#DB1B0F',   // secondary (12.1%)
                '#CB150D',   // tertiary (10.4%)
                '#D2190F',   // accent (9.6%)
                '#D11409',   // accent (9.5%)
                '#C51109',   // accent (8.7%)
                '#BC0D0B',   // accent (8.5%)
                '#B10C0C',   // accent (7.3%)
                '#A90E11',   // accent (5.8%)
                '#C2120F',   // accent (5.6%)
                '#B51010',   // accent (5.3%)
                '#B9211A',   // accent (1.1%)
                '#DF8350',   // accent (0.5%)
                '#C74328',   // accent (0.4%)
                '#ED9E77',   // accent (0.3%)
                '#D36A42',   // accent (0.3%)
            ],
            pcts: [14.7, 12.1, 10.4, 9.6, 9.5, 8.7, 8.5, 7.3, 5.8, 5.6, 5.3, 1.1, 0.5, 0.4, 0.3, 0.3],
            useBoxMuller: true
        },

        newman_onement: {
            name: 'Newman — Onement I',
            artist: 'Barnett Newman',
            school: 'Color Field',
            ref: 'Onement I (1948)',
            bg: '#74463C',
            colors: [
                '#74463C',   // dominant (20.0%)
                '#764638',   // secondary (15.2%)
                '#79483A',   // tertiary (14.6%)
                '#70443A',   // accent (14.1%)
                '#77483E',   // accent (13.9%)
                '#734132',   // accent (5.1%)
                '#7D4C3E',   // accent (4.8%)
                '#694136',   // accent (3.3%)
                '#7D4535',   // accent (2.9%)
                '#CD6939',   // accent (1.9%)
                '#C26234',   // accent (1.2%)
                '#B15A32',   // accent (0.8%)
                '#BD6A44',   // accent (0.7%)
                '#855745',   // accent (0.7%)
                '#9A5130',   // accent (0.5%)
                '#946B55',   // accent (0.2%)
            ],
            pcts: [20.0, 15.2, 14.6, 14.1, 13.9, 5.1, 4.8, 3.3, 2.9, 1.9, 1.2, 0.8, 0.7, 0.7, 0.5, 0.2],
            useBoxMuller: true
        },

        francis_splash: {
            name: 'Sam Francis — Big Red',
            artist: 'Sam Francis',
            school: 'Abstract Expressionism',
            ref: 'Big Red (1953)',
            bg: '#8B3A2B',
            colors: [
                '#8B3A2B',   // dominant (14.9%)
                '#962E1C',   // secondary (13.9%)
                '#A03A27',   // tertiary (13.0%)
                '#802B1B',   // accent (12.0%)
                '#703D31',   // accent (8.1%)
                '#A44D38',   // accent (6.4%)
                '#63281B',   // accent (5.5%)
                '#865545',   // accent (5.5%)
                '#493833',   // accent (4.0%)
                '#5F554E',   // accent (3.8%)
                '#AC6A53',   // accent (3.5%)
                '#84756C',   // accent (2.7%)
                '#C2964D',   // accent (2.2%)
                '#B8937B',   // accent (2.2%)
                '#CFB69E',   // accent (1.3%)
                '#251611',   // accent (1.1%)
            ],
            pcts: [14.9, 13.9, 13.0, 12.0, 8.1, 6.4, 5.5, 5.5, 4.0, 3.8, 3.5, 2.7, 2.2, 2.2, 1.3, 1.1],
            useBoxMuller: false
        },

        mitchell_gestural: {
            name: 'Mitchell — Ladybug',
            artist: 'Joan Mitchell',
            school: 'Abstract Expressionism',
            ref: 'Ladybug (1957)',
            bg: '#E7E6DA',
            colors: [
                '#E7E6DA',   // dominant (15.6%)
                '#DADACA',   // secondary (13.7%)
                '#C6C6B5',   // tertiary (8.2%)
                '#543833',   // accent (7.4%)
                '#B5AF9A',   // accent (6.9%)
                '#7D7266',   // accent (6.7%)
                '#9B907D',   // accent (6.6%)
                '#535B54',   // accent (6.1%)
                '#302828',   // accent (5.9%)
                '#725D41',   // accent (5.9%)
                '#243E47',   // accent (4.1%)
                '#8FA9A1',   // accent (3.6%)
                '#5D8984',   // accent (2.7%)
                '#A08447',   // accent (2.7%)
                '#1F6A73',   // accent (2.5%)
                '#A2413F',   // accent (1.5%)
            ],
            pcts: [15.6, 13.7, 8.2, 7.4, 6.9, 6.7, 6.6, 6.1, 5.9, 5.9, 4.1, 3.6, 2.7, 2.7, 2.5, 1.5],
            useBoxMuller: false
        },

        mitchell_hemlock: {
            name: 'Mitchell — Hemlock',
            artist: 'Joan Mitchell',
            school: 'Abstract Expressionism',
            ref: 'Hemlock (1956)',
            bg: '#D6D7D6',
            colors: [
                '#D6D7D6',   // dominant (15.8%)
                '#E2E4E4',   // secondary (13.9%)
                '#F2F3F1',   // tertiary (9.4%)
                '#C5CAC8',   // accent (8.8%)
                '#B4B9B5',   // accent (6.4%)
                '#293A31',   // accent (6.2%)
                '#A0A7A3',   // accent (5.1%)
                '#1B2520',   // accent (5.0%)
                '#414A3F',   // accent (5.0%)
                '#90948E',   // accent (4.7%)
                '#565F52',   // accent (4.6%)
                '#79827D',   // accent (4.3%)
                '#6B7164',   // accent (4.2%)
                '#070B09',   // accent (3.0%)
                '#2B604B',   // accent (2.7%)
                '#306A82',   // accent (0.8%)
            ],
            pcts: [15.8, 13.9, 9.4, 8.8, 6.4, 6.2, 5.1, 5.0, 5.0, 4.7, 4.6, 4.3, 4.2, 3.0, 2.7, 0.8],
            useBoxMuller: false
        },

        guston_pink: {
            name: 'Guston — The Studio',
            artist: 'Philip Guston',
            school: 'Abstract Expressionism',
            ref: 'The Studio (1969)',
            bg: '#CB8794',
            colors: [
                '#CB8794',   // dominant (14.1%)
                '#D9B8BE',   // secondary (10.9%)
                '#A72229',   // tertiary (10.4%)
                '#D595A0',   // accent (9.5%)
                '#E2CCCE',   // accent (9.2%)
                '#C2787F',   // accent (7.2%)
                '#B03E44',   // accent (6.6%)
                '#BD565D',   // accent (5.8%)
                '#180814',   // accent (5.5%)
                '#A74821',   // accent (5.2%)
                '#C2A9B1',   // accent (4.7%)
                '#35242F',   // accent (3.6%)
                '#8A707C',   // accent (2.3%)
                '#5C4654',   // accent (2.2%)
                '#5B8D4F',   // accent (1.5%)
                '#702223',   // accent (1.4%)
            ],
            pcts: [14.1, 10.9, 10.4, 9.5, 9.2, 7.2, 6.6, 5.8, 5.5, 5.2, 4.7, 3.6, 2.3, 2.2, 1.5, 1.4],
            useBoxMuller: true
        },

        guston_smoking: {
            name: 'Guston — Painting, Smoking, Eating',
            artist: 'Philip Guston',
            school: 'Abstract Expressionism',
            ref: 'Painting, Smoking, Eating (1973)',
            bg: '#D59899',
            colors: [
                '#D59899',   // dominant (15.8%)
                '#D6AFAA',   // secondary (12.3%)
                '#D48789',   // tertiary (11.7%)
                '#DEC1BD',   // accent (10.6%)
                '#BCB1A6',   // accent (8.5%)
                '#BB8B8A',   // accent (7.2%)
                '#CB7274',   // accent (7.0%)
                '#9D0B0E',   // accent (4.4%)
                '#BD5253',   // accent (3.9%)
                '#AF292C',   // accent (3.6%)
                '#986F6B',   // accent (3.1%)
                '#130E0E',   // accent (3.0%)
                '#9A4D37',   // accent (2.8%)
                '#372727',   // accent (2.3%)
                '#614B4B',   // accent (2.2%)
                '#6E1F1C',   // accent (1.7%)
            ],
            pcts: [15.8, 12.3, 11.7, 10.6, 8.5, 7.2, 7.0, 4.4, 3.9, 3.6, 3.1, 3.0, 2.8, 2.3, 2.2, 1.7],
            useBoxMuller: true
        },

        twombly_leda: {
            name: 'Twombly — Leda and the Swan',
            artist: 'Cy Twombly',
            school: 'Abstract Expressionism',
            ref: 'Leda and the Swan (1962)',
            bg: '#EBE8E0',
            colors: [
                '#EBE8E0',   // dominant (13.4%)
                '#E4E0D7',   // secondary (11.8%)
                '#DFD9CD',   // tertiary (11.8%)
                '#D7D1C4',   // accent (11.4%)
                '#CFC8BC',   // accent (10.6%)
                '#C8BFB1',   // accent (8.7%)
                '#BDB3A7',   // accent (6.6%)
                '#F3F0EA',   // accent (5.5%)
                '#AFA59B',   // accent (5.2%)
                '#A1968E',   // accent (4.1%)
                '#92867E',   // accent (3.7%)
                '#7F746C',   // accent (2.8%)
                '#6C5E58',   // accent (1.9%)
                '#C69E7E',   // accent (1.1%)
                '#52453F',   // accent (0.8%)
                '#AD6551',   // accent (0.6%)
            ],
            pcts: [13.4, 11.8, 11.8, 11.4, 10.6, 8.7, 6.6, 5.5, 5.2, 4.1, 3.7, 2.8, 1.9, 1.1, 0.8, 0.6],
            useBoxMuller: true
        },

        noland_targets: {
            name: 'Noland — Turnsole',
            artist: 'Kenneth Noland',
            school: 'Color Field',
            ref: 'Turnsole (1961)',
            bg: '#E3DECB',
            colors: [
                '#E3DECB',   // dominant (25.4%)
                '#E5DFCF',   // secondary (15.1%)
                '#DED7C0',   // tertiary (12.7%)
                '#E0DBC7',   // accent (12.6%)
                '#CBD0C2',   // accent (7.0%)
                '#1E1A16',   // accent (5.8%)
                '#D2D7CC',   // accent (5.8%)
                '#DAAD49',   // accent (5.7%)
                '#DAD2B8',   // accent (5.5%)
                '#DDB74E',   // accent (2.9%)
                '#D6BB69',   // accent (0.4%)
                '#CCC4AB',   // accent (0.3%)
                '#DCC88E',   // accent (0.3%)
                '#666770',   // accent (0.1%)
                '#464132',   // accent (0.1%)
                '#9A9686',   // accent (0.1%)
            ],
            pcts: [25.4, 15.1, 12.7, 12.6, 7.0, 5.8, 5.8, 5.7, 5.5, 2.9, 0.4, 0.3, 0.3, 0.1, 0.1, 0.1],
            useBoxMuller: false
        },

        louis_veils: {
            name: 'Morris Louis — Alpha-Phi',
            artist: 'Morris Louis',
            school: 'Color Field',
            ref: 'Alpha-Phi (1961)',
            bg: '#FEFCF4',
            colors: [
                '#FEFCF4',   // dominant (29.1%)
                '#FBF4EB',   // secondary (23.2%)
                '#F1EAE2',   // tertiary (18.0%)
                '#E7DFD9',   // accent (10.4%)
                '#DE6E4D',   // accent (2.6%)
                '#E3CEBE',   // accent (2.3%)
                '#44715E',   // accent (2.3%)
                '#805452',   // accent (2.3%)
                '#2E3C50',   // accent (2.2%)
                '#A47B51',   // accent (1.8%)
                '#FCC33C',   // accent (1.8%)
                '#2C466A',   // accent (1.3%)
                '#B8A59A',   // accent (0.9%)
                '#F1BB88',   // accent (0.8%)
                '#708381',   // accent (0.6%)
                '#AB323B',   // accent (0.4%)
            ],
            pcts: [29.1, 23.2, 18.0, 10.4, 2.6, 2.3, 2.3, 2.3, 2.2, 1.8, 1.8, 1.3, 0.9, 0.8, 0.6, 0.4],
            useBoxMuller: false
        },

        reinhardt_ultimate: {
            name: 'Reinhardt — Ultimate Paintings',
            artist: 'Ad Reinhardt',
            school: 'Abstract Expressionism',
            ref: 'Abstract Painting (1960–1966)',
            bg: '#1A1B1F',
            colors: [
                '#1A1B1F',   // dominant (11.6%)
                '#191A1E',   // secondary (9.9%)
                '#1B1C20',   // tertiary (9.1%)
                '#1C1F24',   // accent (8.3%)
                '#1B1E23',   // accent (8.1%)
                '#1A1D22',   // accent (6.7%)
                '#1D2025',   // accent (5.8%)
                '#1E2126',   // accent (5.4%)
                '#191C21',   // accent (5.3%)
                '#1C1D21',   // accent (5.3%)
                '#202227',   // accent (4.7%)
                '#1C2027',   // accent (4.6%)
                '#1E1F24',   // accent (4.5%)
                '#1D1E23',   // accent (4.4%)
                '#181B20',   // accent (3.2%)
                '#18191D',   // accent (3.1%)
            ],
            pcts: [11.6, 9.9, 9.1, 8.3, 8.1, 6.7, 5.8, 5.4, 5.3, 5.3, 4.7, 4.6, 4.5, 4.4, 3.2, 3.1],
            useBoxMuller: true
        },

        diebenkorn_ocean: {
            name: 'Diebenkorn — Ocean Park No. 67',
            artist: 'Richard Diebenkorn',
            school: 'Color Field',
            ref: 'Ocean Park No. 67 (1973)',
            bg: '#B2986F',
            colors: [
                '#B2986F',   // dominant (23.9%)
                '#B99665',   // secondary (19.1%)
                '#B99E73',   // tertiary (13.4%)
                '#AE9168',   // accent (12.2%)
                '#A5A09D',   // accent (5.8%)
                '#899392',   // accent (5.1%)
                '#9F907D',   // accent (3.8%)
                '#AC9C8A',   // accent (3.3%)
                '#A48560',   // accent (3.1%)
                '#8C8B80',   // accent (3.0%)
                '#B9AEA2',   // accent (2.8%)
                '#707C75',   // accent (1.1%)
                '#4E6C86',   // accent (1.0%)
                '#49634E',   // accent (0.9%)
                '#FDFCFC',   // accent (0.8%)
                '#916550',   // accent (0.8%)
            ],
            pcts: [23.9, 19.1, 13.4, 12.2, 5.8, 5.1, 3.8, 3.3, 3.1, 3.0, 2.8, 1.1, 1.0, 0.9, 0.8, 0.8],
            useBoxMuller: true
        },

        davis_jazz: {
            name: 'Stuart Davis — Lucky Strike',
            artist: 'Stuart Davis',
            school: 'American Modernism',
            ref: 'Lucky Strike (1921)',
            bg: '#0B1C0D',
            colors: [
                '#0B1C0D',   // dominant (15.9%)
                '#070503',   // secondary (15.8%)
                '#D0E7B0',   // tertiary (13.8%)
                '#172C19',   // accent (11.7%)
                '#DDF6C6',   // accent (8.9%)
                '#AF0604',   // accent (6.9%)
                '#D26710',   // accent (4.4%)
                '#C1C991',   // accent (3.7%)
                '#AC3F09',   // accent (3.3%)
                '#A09F6D',   // accent (2.9%)
                '#E3892D',   // accent (2.9%)
                '#649E94',   // accent (2.5%)
                '#4D7970',   // accent (2.1%)
                '#601D06',   // accent (1.9%)
                '#334937',   // accent (1.8%)
                '#916634',   // accent (1.6%)
            ],
            pcts: [15.9, 15.8, 13.8, 11.7, 8.9, 6.9, 4.4, 3.7, 3.3, 2.9, 2.9, 2.5, 2.1, 1.9, 1.8, 1.6],
            useBoxMuller: false
        },

        hartley_emblems: {
            name: 'Hartley — Portrait of a German Officer',
            artist: 'Marsden Hartley',
            school: 'American Modernism',
            ref: 'Portrait of a German Officer (1914)',
            bg: '#0D0F06',
            colors: [
                '#0D0F06',   // dominant (24.3%)
                '#B00C10',   // secondary (10.1%)
                '#DDCEAE',   // tertiary (8.6%)
                '#ECE1C6',   // accent (6.3%)
                '#465570',   // accent (5.9%)
                '#3F4B41',   // accent (5.8%)
                '#322716',   // accent (5.7%)
                '#DAAE0E',   // accent (4.7%)
                '#C4B596',   // accent (4.4%)
                '#67738E',   // accent (4.4%)
                '#B98D1A',   // accent (4.4%)
                '#741E10',   // accent (4.3%)
                '#706A53',   // accent (2.9%)
                '#A09176',   // accent (2.8%)
                '#8C5C1A',   // accent (2.7%)
                '#DBB636',   // accent (2.6%)
            ],
            pcts: [24.3, 10.1, 8.6, 6.3, 5.9, 5.8, 5.7, 4.7, 4.4, 4.4, 4.4, 4.3, 2.9, 2.8, 2.7, 2.6],
            useBoxMuller: false
        },

        dove_american: {
            name: 'Arthur Dove — Nature Symbolized No. 2',
            artist: 'Arthur Dove',
            school: 'American Abstraction',
            ref: 'Nature Symbolized No. 2 (1911)',
            bg: '#263328',
            colors: [
                '#263328',   // dominant (13.8%)
                '#1D2A1E',   // secondary (10.9%)
                '#335A32',   // tertiary (9.2%)
                '#2A4628',   // accent (7.4%)
                '#ACA366',   // accent (7.2%)
                '#999460',   // accent (6.1%)
                '#C3B064',   // accent (5.5%)
                '#CEBE7F',   // accent (5.5%)
                '#374133',   // accent (5.2%)
                '#727553',   // accent (5.1%)
                '#BBB175',   // accent (5.1%)
                '#868559',   // accent (4.9%)
                '#606449',   // accent (4.8%)
                '#4B533E',   // accent (4.4%)
                '#416D3E',   // accent (4.3%)
                '#7FA195',   // accent (0.6%)
            ],
            pcts: [13.8, 10.9, 9.2, 7.4, 7.2, 6.1, 5.5, 5.5, 5.2, 5.1, 5.1, 4.9, 4.8, 4.4, 4.3, 0.6],
            useBoxMuller: true
        },

    });
})();
