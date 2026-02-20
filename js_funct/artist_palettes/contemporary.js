/**
 * artist_palettes/contemporary.js
 * Contemporary International
 * 32 palettes
 */
(function() {
    'use strict';
    Object.assign(window.ARTIST_PALETTES, {

        modigliani_nudes: {
            name: 'Modigliani — Reclining Nude',
            artist: 'Amedeo Modigliani',
            school: 'Expressionism',
            ref: 'Reclining Nude (1917–1918)',
            bg: '#262323',
            colors: [
                '#262323',   // dominant (16.0%)
                '#D5916B',   // secondary (13.4%)
                '#CB8563',   // tertiary (12.2%)
                '#DF9C75',   // accent (8.1%)
                '#3C2323',   // accent (7.8%)
                '#BF795B',   // accent (7.8%)
                '#87463C',   // accent (7.2%)
                '#995145',   // accent (6.9%)
                '#703933',   // accent (4.9%)
                '#552A28',   // accent (4.7%)
                '#AD6952',   // accent (3.9%)
                '#55525F',   // accent (2.5%)
                '#403B49',   // accent (2.2%)
                '#6B6871',   // accent (1.4%)
                '#988C86',   // accent (0.7%)
                '#CBBEB2',   // accent (0.4%)
            ],
            pcts: [16.0, 13.4, 12.2, 8.1, 7.8, 7.8, 7.2, 6.9, 4.9, 4.7, 3.9, 2.5, 2.2, 1.4, 0.7, 0.4],
            useBoxMuller: true
        },

        modigliani_jeanne: {
            name: 'Modigliani — Portrait of Jeanne Hébuterne',
            artist: 'Amedeo Modigliani',
            school: 'Expressionism',
            ref: 'Portrait of Jeanne Hébuterne (1919)',
            bg: '#E8EFD2',
            colors: [
                '#E8EFD2',   // dominant (12.1%)
                '#B87D07',   // secondary (10.5%)
                '#F9DF90',   // tertiary (8.8%)
                '#CDD9C2',   // accent (8.2%)
                '#9B9868',   // accent (7.2%)
                '#90A79F',   // accent (7.0%)
                '#ABBFB3',   // accent (6.8%)
                '#F3C767',   // accent (6.6%)
                '#B6B585',   // accent (5.4%)
                '#7F7548',   // accent (5.2%)
                '#D39819',   // accent (4.8%)
                '#040302',   // accent (4.3%)
                '#5A5943',   // accent (3.9%)
                '#738172',   // accent (3.4%)
                '#372D1E',   // accent (2.9%)
                '#794113',   // accent (2.8%)
            ],
            pcts: [12.1, 10.5, 8.8, 8.2, 7.2, 7.0, 6.8, 6.6, 5.4, 5.2, 4.8, 4.3, 3.9, 3.4, 2.9, 2.8],
            useBoxMuller: true
        },

        soutine_impasto: {
            name: 'Soutine — Side of Beef',
            artist: 'Chaïm Soutine',
            school: 'Expressionism',
            ref: 'Side of Beef (1925)',
            bg: '#192131',
            colors: [
                '#192131',   // dominant (9.3%)
                '#16151C',   // secondary (8.9%)
                '#331112',   // tertiary (8.3%)
                '#572D24',   // accent (8.1%)
                '#202F44',   // accent (8.1%)
                '#67402F',   // accent (7.6%)
                '#26415E',   // accent (7.0%)
                '#382825',   // accent (6.6%)
                '#4A1616',   // accent (6.6%)
                '#305273',   // accent (6.5%)
                '#363E47',   // accent (6.0%)
                '#7A563A',   // accent (5.5%)
                '#45525D',   // accent (5.4%)
                '#8D6D57',   // accent (2.5%)
                '#596B78',   // accent (2.5%)
                '#A29186',   // accent (1.1%)
            ],
            pcts: [9.3, 8.9, 8.3, 8.1, 8.1, 7.6, 7.0, 6.6, 6.6, 6.5, 6.0, 5.5, 5.4, 2.5, 2.5, 1.1],
            useBoxMuller: false
        },

        bacon_figure: {
            name: 'Bacon — Three Studies for Figures at the Base of a Crucifixion',
            artist: 'Francis Bacon',
            school: 'Figurative Expressionism',
            ref: 'Three Studies for Figures at the Base of a Crucifixion (1944)',
            bg: '#A44617',
            colors: [
                '#A44617',   // dominant (17.7%)
                '#801D18',   // secondary (16.4%)
                '#0B0C0D',   // tertiary (13.3%)
                '#BC5918',   // accent (12.7%)
                '#882D24',   // accent (12.2%)
                '#1B1C1A',   // accent (7.0%)
                '#FDFCFA',   // accent (3.0%)
                '#CBB8AE',   // accent (2.8%)
                '#46130F',   // accent (2.5%)
                '#E5D6D0',   // accent (2.3%)
                '#B4988C',   // accent (2.3%)
                '#413637',   // accent (2.0%)
                '#645756',   // accent (1.9%)
                '#9E6958',   // accent (1.8%)
                '#7F8382',   // accent (1.4%)
                '#065037',   // accent (0.6%)
            ],
            pcts: [17.7, 16.4, 13.3, 12.7, 12.2, 7.0, 3.0, 2.8, 2.5, 2.3, 2.3, 2.0, 1.9, 1.8, 1.4, 0.6],
            useBoxMuller: false
        },

        bacon_pope: {
            name: 'Bacon — Study after Velázquez\'s Portrait of Pope Innocent X',
            artist: 'Francis Bacon',
            school: 'Figurative Expressionism',
            ref: 'Study after Velázquez\'s Portrait of Pope Innocent X (1953)',
            bg: '#1F1C1A',
            colors: [
                '#1F1C1A',   // dominant (12.4%)
                '#403733',   // secondary (11.1%)
                '#2F2926',   // tertiary (11.0%)
                '#100E0D',   // accent (10.7%)
                '#504541',   // accent (10.5%)
                '#615352',   // accent (8.7%)
                '#76635F',   // accent (7.8%)
                '#8F7364',   // accent (6.3%)
                '#AB8877',   // accent (4.1%)
                '#BDA09C',   // accent (3.6%)
                '#D5BDBE',   // accent (2.8%)
                '#785C3A',   // accent (2.5%)
                '#89778A',   // accent (2.4%)
                '#EFE0E3',   // accent (2.4%)
                '#AD8644',   // accent (2.1%)
                '#D7AD50',   // accent (1.7%)
            ],
            pcts: [12.4, 11.1, 11.0, 10.7, 10.5, 8.7, 7.8, 6.3, 4.1, 3.6, 2.8, 2.5, 2.4, 2.4, 2.1, 1.7],
            useBoxMuller: false
        },

        bacon_triptych: {
            name: 'Bacon — Triptych',
            artist: 'Francis Bacon',
            school: 'Figurative Expressionism',
            ref: 'Triptych (1976)',
            bg: '#889F93',
            colors: [
                '#889F93',   // dominant (23.8%)
                '#95A99E',   // secondary (15.6%)
                '#444848',   // tertiary (8.6%)
                '#535755',   // accent (8.3%)
                '#323438',   // accent (6.4%)
                '#6A695D',   // accent (4.8%)
                '#1E1F21',   // accent (4.6%)
                '#877C58',   // accent (4.3%)
                '#7D827B',   // accent (4.2%)
                '#9F957C',   // accent (3.7%)
                '#BAAF9B',   // accent (3.5%)
                '#D0C3B6',   // accent (3.2%)
                '#FCFCF8',   // accent (3.0%)
                '#675739',   // accent (2.8%)
                '#EAE7DD',   // accent (2.4%)
                '#AE833D',   // accent (0.8%)
            ],
            pcts: [23.8, 15.6, 8.6, 8.3, 6.4, 4.8, 4.6, 4.3, 4.2, 3.7, 3.5, 3.2, 3.0, 2.8, 2.4, 0.8],
            useBoxMuller: false
        },

        freud_flesh: {
            name: 'Freud — Benefits Supervisor Sleeping',
            artist: 'Lucian Freud',
            school: 'Figurative',
            ref: 'Benefits Supervisor Sleeping (1995)',
            bg: '#80705A',
            colors: [
                '#80705A',   // dominant (8.6%)
                '#907E69',   // secondary (8.4%)
                '#A08D77',   // tertiary (8.2%)
                '#C5B9A7',   // accent (8.0%)
                '#6F604E',   // accent (7.8%)
                '#B0A89C',   // accent (7.1%)
                '#B19C85',   // accent (6.9%)
                '#5E5144',   // accent (6.9%)
                '#9C9692',   // accent (6.0%)
                '#4C4138',   // accent (5.7%)
                '#C4AD93',   // accent (5.5%)
                '#7A7776',   // accent (5.5%)
                '#8B8683',   // accent (5.2%)
                '#6D6A66',   // accent (4.3%)
                '#D4C9B9',   // accent (4.3%)
                '#382C27',   // accent (1.6%)
            ],
            pcts: [8.6, 8.4, 8.2, 8.0, 7.8, 7.1, 6.9, 6.9, 6.0, 5.7, 5.5, 5.5, 5.2, 4.3, 4.3, 1.6],
            useBoxMuller: true
        },

        freud_plant: {
            name: 'Freud — Interior with Plant, Reflection Listening',
            artist: 'Lucian Freud',
            school: 'Figurative',
            ref: 'Interior with Plant, Reflection Listening (Self-Portrait) (1967–1968)',
            bg: '#070302',
            colors: [
                '#070302',   // dominant (17.7%)
                '#261B08',   // secondary (15.9%)
                '#180D04',   // tertiary (14.9%)
                '#34290B',   // accent (13.7%)
                '#3C341A',   // accent (7.9%)
                '#4D3C10',   // accent (6.1%)
                '#574A29',   // accent (4.9%)
                '#AC8E70',   // accent (3.6%)
                '#937B59',   // accent (3.1%)
                '#75633F',   // accent (2.8%)
                '#765019',   // accent (2.2%)
                '#C5A78F',   // accent (2.1%)
                '#A46D28',   // accent (1.5%)
                '#CE8B39',   // accent (1.3%)
                '#E4BE6B',   // accent (1.1%)
                '#F3E3BC',   // accent (1.1%)
            ],
            pcts: [17.7, 15.9, 14.9, 13.7, 7.9, 6.1, 4.9, 3.6, 3.1, 2.8, 2.2, 2.1, 1.5, 1.3, 1.1, 1.1],
            useBoxMuller: true
        },

        hodgkin_memory: {
            name: 'Hodgkin — After Visiting David Hockney',
            artist: 'Howard Hodgkin',
            school: 'Abstract Expressionism',
            ref: 'After Visiting David Hockney (1991–1992)',
            bg: '#183B81',
            colors: [
                '#183B81',   // dominant (11.5%)
                '#142B63',   // secondary (11.1%)
                '#214EA0',   // tertiary (9.9%)
                '#3D64B3',   // accent (9.2%)
                '#0C1640',   // accent (8.1%)
                '#5579CB',   // accent (7.8%)
                '#2A262E',   // accent (7.3%)
                '#32547D',   // accent (6.5%)
                '#44474A',   // accent (5.4%)
                '#78728E',   // accent (5.3%)
                '#AC490A',   // accent (5.0%)
                '#ED7F09',   // accent (4.5%)
                '#398F7F',   // accent (3.3%)
                '#612E19',   // accent (2.2%)
                '#ABA9AD',   // accent (1.4%)
                '#E7E6E0',   // accent (1.4%)
            ],
            pcts: [11.5, 11.1, 9.9, 9.2, 8.1, 7.8, 7.3, 6.5, 5.4, 5.3, 5.0, 4.5, 3.3, 2.2, 1.4, 1.4],
            useBoxMuller: false
        },

        richter_squeegee: {
            name: 'Richter — Abstract Picture 599',
            artist: 'Gerhard Richter',
            school: 'Neo-Expressionism',
            ref: 'Abstract Picture 599 (1986)',
            bg: '#102E36',
            colors: [
                '#102E36',   // dominant (13.5%)
                '#133F4D',   // secondary (11.5%)
                '#323625',   // tertiary (9.6%)
                '#922215',   // accent (7.9%)
                '#604F1F',   // accent (7.5%)
                '#434744',   // accent (7.0%)
                '#171713',   // accent (6.8%)
                '#AF4F22',   // accent (5.3%)
                '#636A57',   // accent (5.2%)
                '#86702B',   // accent (4.9%)
                '#581D15',   // accent (4.8%)
                '#C98C39',   // accent (4.3%)
                '#1E7270',   // accent (4.2%)
                '#948B5B',   // accent (3.3%)
                '#D3B588',   // accent (2.4%)
                '#72AB8B',   // accent (1.8%)
            ],
            pcts: [13.5, 11.5, 9.6, 7.9, 7.5, 7.0, 6.8, 5.3, 5.2, 4.9, 4.8, 4.3, 4.2, 3.3, 2.4, 1.8],
            useBoxMuller: false
        },

        richter_gray: {
            name: 'Richter — Grey',
            artist: 'Gerhard Richter',
            school: 'Neo-Expressionism',
            ref: 'Grey (1975)',
            bg: '#2B2C31',
            colors: [
                '#2B2C31',   // dominant (24.1%)
                '#2A2B30',   // secondary (16.4%)
                '#292A2F',   // tertiary (10.9%)
                '#2C2D32',   // accent (9.3%)
                '#28292E',   // accent (8.4%)
                '#2B2B33',   // accent (5.1%)
                '#2D2E33',   // accent (4.6%)
                '#2A2A32',   // accent (4.0%)
                '#292931',   // accent (3.0%)
                '#2E2F34',   // accent (3.0%)
                '#282830',   // accent (2.4%)
                '#2C2C34',   // accent (2.4%)
                '#2D2D35',   // accent (2.0%)
                '#292C33',   // accent (2.0%)
                '#27282D',   // accent (1.8%)
                '#303037',   // accent (0.6%)
            ],
            pcts: [24.1, 16.4, 10.9, 9.3, 8.4, 5.1, 4.6, 4.0, 3.0, 3.0, 2.4, 2.4, 2.0, 2.0, 1.8, 0.6],
            useBoxMuller: true
        },

        kiefer_mythic: {
            name: 'Kiefer — Shulamite',
            artist: 'Anselm Kiefer',
            school: 'Neo-Expressionism',
            ref: 'Shulamite (1983)',
            bg: '#2F2B26',
            colors: [
                '#2F2B26',   // dominant (15.3%)
                '#383531',   // secondary (14.5%)
                '#27221C',   // tertiary (14.5%)
                '#423F3D',   // accent (10.0%)
                '#4F4B47',   // accent (7.1%)
                '#1B1712',   // accent (6.9%)
                '#3E3021',   // accent (6.6%)
                '#4D3E2D',   // accent (6.4%)
                '#615B55',   // accent (4.5%)
                '#624F38',   // accent (3.8%)
                '#797068',   // accent (2.9%)
                '#7A6448',   // accent (2.2%)
                '#928981',   // accent (1.9%)
                '#B1A495',   // accent (1.6%)
                '#9C845F',   // accent (1.2%)
                '#D2C8BB',   // accent (0.6%)
            ],
            pcts: [15.3, 14.5, 14.5, 10.0, 7.1, 6.9, 6.6, 6.4, 4.5, 3.8, 2.9, 2.2, 1.9, 1.6, 1.2, 0.6],
            useBoxMuller: true
        },

        kiefer_osiris: {
            name: 'Kiefer — Osiris and Isis',
            artist: 'Anselm Kiefer',
            school: 'Neo-Expressionism',
            ref: 'Osiris and Isis (1985–1987)',
            bg: '#533F31',
            colors: [
                '#533F31',   // dominant (9.2%)
                '#3B3C3D',   // secondary (9.1%)
                '#684E3C',   // tertiary (8.8%)
                '#282F32',   // accent (8.2%)
                '#7F5F48',   // accent (7.9%)
                '#4E4B4A',   // accent (7.9%)
                '#3C2F25',   // accent (7.8%)
                '#1F2121',   // accent (7.2%)
                '#957157',   // accent (6.6%)
                '#625C57',   // accent (6.3%)
                '#786F67',   // accent (4.6%)
                '#AB8669',   // accent (4.5%)
                '#B99E86',   // accent (4.0%)
                '#90877E',   // accent (3.4%)
                '#100E0D',   // accent (2.5%)
                '#CDB7A3',   // accent (2.2%)
            ],
            pcts: [9.2, 9.1, 8.8, 8.2, 7.9, 7.9, 7.8, 7.2, 6.6, 6.3, 4.6, 4.5, 4.0, 3.4, 2.5, 2.2],
            useBoxMuller: true
        },

        hockney_pool: {
            name: 'Hockney — A Bigger Splash',
            artist: 'David Hockney',
            school: 'Pop Art',
            ref: 'A Bigger Splash (1967)',
            bg: '#4D96AB',
            colors: [
                '#4D96AB',   // dominant (18.0%)
                '#78C0DF',   // secondary (18.0%)
                '#E2D4B9',   // tertiary (13.4%)
                '#EBDDC1',   // accent (10.3%)
                '#DCCCB0',   // accent (10.0%)
                '#D0AFA2',   // accent (7.1%)
                '#AE8A7E',   // accent (4.9%)
                '#606363',   // accent (3.6%)
                '#CAC18F',   // accent (3.1%)
                '#64A6BB',   // accent (3.1%)
                '#8FBBCA',   // accent (2.3%)
                '#B5CAD2',   // accent (2.0%)
                '#969B98',   // accent (1.2%)
                '#D9E3E5',   // accent (1.1%)
                '#89786D',   // accent (1.0%)
                '#306C93',   // accent (0.9%)
            ],
            pcts: [18.0, 18.0, 13.4, 10.3, 10.0, 7.1, 4.9, 3.6, 3.1, 3.1, 2.3, 2.0, 1.2, 1.1, 1.0, 0.9],
            useBoxMuller: false
        },

        hockney_clark: {
            name: 'Hockney — Mr and Mrs Clark and Percy',
            artist: 'David Hockney',
            school: 'Pop Art',
            ref: 'Mr and Mrs Clark and Percy (1970–1971)',
            bg: '#927F52',
            colors: [
                '#927F52',   // dominant (15.6%)
                '#7F7347',   // secondary (15.0%)
                '#D1D7C6',   // tertiary (8.0%)
                '#071407',   // accent (7.5%)
                '#9E9369',   // accent (6.8%)
                '#8D9F85',   // accent (6.7%)
                '#7D8F67',   // accent (6.5%)
                '#B2AD81',   // accent (6.5%)
                '#ECEADD',   // accent (5.9%)
                '#7D6C26',   // accent (5.6%)
                '#A8BBAF',   // accent (4.6%)
                '#C9C296',   // accent (4.2%)
                '#1E351E',   // accent (3.2%)
                '#5B4D1C',   // accent (2.2%)
                '#3A655B',   // accent (1.1%)
                '#B58C0E',   // accent (0.6%)
            ],
            pcts: [15.6, 15.0, 8.0, 7.5, 6.8, 6.7, 6.5, 6.5, 5.9, 5.6, 4.6, 4.2, 3.2, 2.2, 1.1, 0.6],
            useBoxMuller: false
        },

        zao_lyrical: {
            name: 'Zao Wou-Ki — Hommage à Edgar Varèse',
            artist: 'Zao Wou-Ki',
            school: 'Lyrical Abstraction',
            ref: 'Hommage à Edgar Varèse (1954)',
            bg: '#C0B294',
            colors: [
                '#C0B294',   // dominant (13.2%)
                '#B3A78B',   // secondary (11.8%)
                '#CEBE9D',   // tertiary (7.2%)
                '#443224',   // accent (6.9%)
                '#664F34',   // accent (6.7%)
                '#705D42',   // accent (6.6%)
                '#33251B',   // accent (5.9%)
                '#BFA980',   // accent (5.9%)
                '#4E4337',   // accent (5.4%)
                '#AD9C7B',   // accent (5.3%)
                '#59544D',   // accent (4.8%)
                '#816C4F',   // accent (4.7%)
                '#5B3F25',   // accent (4.4%)
                '#8F7C5F',   // accent (4.2%)
                '#9F8D6D',   // accent (4.1%)
                '#6B655C',   // accent (2.8%)
            ],
            pcts: [13.2, 11.8, 7.2, 6.9, 6.7, 6.6, 5.9, 5.9, 5.4, 5.3, 4.8, 4.7, 4.4, 4.2, 4.1, 2.8],
            useBoxMuller: true
        },

        zao_68: {
            name: 'Zao Wou-Ki — 01.06.68',
            artist: 'Zao Wou-Ki',
            school: 'Lyrical Abstraction',
            ref: '01.06.68 (1968)',
            bg: '#BC7437',
            colors: [
                '#BC7437',   // dominant (12.3%)
                '#AE5B2E',   // secondary (11.2%)
                '#D9A96D',   // tertiary (10.2%)
                '#8D542A',   // accent (7.3%)
                '#CB8F4F',   // accent (7.1%)
                '#654325',   // accent (7.0%)
                '#99784E',   // accent (6.7%)
                '#786443',   // accent (5.1%)
                '#A59779',   // accent (4.6%)
                '#ABCACF',   // accent (4.5%)
                '#D2BC97',   // accent (4.4%)
                '#8EA8A8',   // accent (4.4%)
                '#3A3226',   // accent (4.4%)
                '#70827D',   // accent (4.3%)
                '#D1E5E7',   // accent (3.4%)
                '#4A5955',   // accent (3.2%)
            ],
            pcts: [12.3, 11.2, 10.2, 7.3, 7.1, 7.0, 6.7, 5.1, 4.6, 4.5, 4.4, 4.4, 4.4, 4.3, 3.4, 3.2],
            useBoxMuller: true
        },

        polke_raster: {
            name: 'Polke — Bunnies',
            artist: 'Sigmar Polke',
            school: 'Neo-Expressionism',
            ref: 'Bunnies (1966)',
            bg: '#FCF7FA',
            colors: [
                '#FCF7FA',   // dominant (14.3%)
                '#06040D',   // secondary (10.8%)
                '#EDE0E3',   // tertiary (8.5%)
                '#161726',   // accent (7.5%)
                '#B9ADB4',   // accent (6.8%)
                '#9F929A',   // accent (6.8%)
                '#D2C6CE',   // accent (6.8%)
                '#675F6A',   // accent (6.7%)
                '#4F464E',   // accent (6.6%)
                '#7F7986',   // accent (6.2%)
                '#352D36',   // accent (6.0%)
                '#17334E',   // accent (3.5%)
                '#345371',   // accent (2.8%)
                '#F3D8A6',   // accent (2.5%)
                '#9D7A54',   // accent (2.0%)
                '#D4B271',   // accent (2.0%)
            ],
            pcts: [14.3, 10.8, 8.5, 7.5, 6.8, 6.8, 6.8, 6.7, 6.6, 6.2, 6.0, 3.5, 2.8, 2.5, 2.0, 2.0],
            useBoxMuller: false
        },

        polke_watchtower: {
            name: 'Polke — Watchtower',
            artist: 'Sigmar Polke',
            school: 'Neo-Expressionism',
            ref: 'Watchtower (1984)',
            bg: '#292527',
            colors: [
                '#292527',   // dominant (16.1%)
                '#231C1C',   // secondary (15.6%)
                '#382927',   // tertiary (9.7%)
                '#353037',   // accent (8.8%)
                '#483630',   // accent (7.5%)
                '#443E47',   // accent (7.2%)
                '#534E58',   // accent (6.5%)
                '#5C4439',   // accent (4.8%)
                '#64616C',   // accent (4.8%)
                '#777783',   // accent (3.5%)
                '#765640',   // accent (3.1%)
                '#C1C3C8',   // accent (3.0%)
                '#A9AAAF',   // accent (2.9%)
                '#8E909A',   // accent (2.9%)
                '#8B7555',   // accent (2.2%)
                '#AC9B6B',   // accent (1.4%)
            ],
            pcts: [16.1, 15.6, 9.7, 8.8, 7.5, 7.2, 6.5, 4.8, 4.8, 3.5, 3.1, 3.0, 2.9, 2.9, 2.2, 1.4],
            useBoxMuller: false
        },

        baselitz_inverted: {
            name: 'Baselitz — The Great Friends',
            artist: 'Georg Baselitz',
            school: 'Neo-Expressionism',
            ref: 'The Great Friends (1965)',
            bg: '#09090B',
            colors: [
                '#09090B',   // dominant (13.7%)
                '#121314',   // secondary (13.3%)
                '#1E1F1E',   // tertiary (11.7%)
                '#2E2C27',   // accent (9.0%)
                '#403B30',   // accent (6.6%)
                '#ACA187',   // accent (6.3%)
                '#8E8167',   // accent (5.4%)
                '#99917D',   // accent (5.1%)
                '#524D3F',   // accent (5.0%)
                '#67604D',   // accent (4.9%)
                '#787260',   // accent (3.9%)
                '#836F49',   // accent (3.8%)
                '#6D5034',   // accent (3.1%)
                '#593B25',   // accent (3.1%)
                '#A6976C',   // accent (3.0%)
                '#BBB29D',   // accent (2.1%)
            ],
            pcts: [13.7, 13.3, 11.7, 9.0, 6.6, 6.3, 5.4, 5.1, 5.0, 4.9, 3.9, 3.8, 3.1, 3.1, 3.0, 2.1],
            useBoxMuller: false
        },

        dubuffet_artbrut: {
            name: 'Dubuffet — Corps de dame, jardin fleuri',
            artist: 'Jean Dubuffet',
            school: 'Art Brut',
            ref: 'Corps de dame, jardin fleuri (1950)',
            bg: '#D5BFB9',
            colors: [
                '#D5BFB9',   // dominant (11.6%)
                '#5E4845',   // secondary (11.5%)
                '#6B5451',   // tertiary (11.1%)
                '#CAB2AC',   // accent (10.6%)
                '#513B38',   // accent (8.6%)
                '#79615D',   // accent (8.1%)
                '#BEA49E',   // accent (7.8%)
                '#E1CDC7',   // accent (6.6%)
                '#B2958C',   // accent (5.4%)
                '#8A6F6B',   // accent (5.0%)
                '#3C2C2A',   // accent (4.2%)
                '#9D827E',   // accent (4.2%)
                '#AA7D5E',   // accent (2.1%)
                '#84433B',   // accent (2.0%)
                '#F8F6F5',   // accent (0.6%)
                '#44416B',   // accent (0.5%)
            ],
            pcts: [11.6, 11.5, 11.1, 10.6, 8.6, 8.1, 7.8, 6.6, 5.4, 5.0, 4.2, 4.2, 2.1, 2.0, 0.6, 0.5],
            useBoxMuller: false
        },

        nicholson_relief: {
            name: 'Nicholson — White Relief',
            artist: 'Ben Nicholson',
            school: 'Abstract',
            ref: 'White Relief (1935)',
            bg: '#F3F2EF',
            colors: [
                '#F3F2EF',   // dominant (13.7%)
                '#EFEEEC',   // secondary (12.5%)
                '#E9E6E2',   // tertiary (11.6%)
                '#ECE9E7',   // accent (11.6%)
                '#E3E0DA',   // accent (9.6%)
                '#E6E3DE',   // accent (8.6%)
                '#DFDCD5',   // accent (8.5%)
                '#DAD7CD',   // accent (7.4%)
                '#D5D2C7',   // accent (7.0%)
                '#CFCCC0',   // accent (4.9%)
                '#F9F8F7',   // accent (1.5%)
                '#C7C4B6',   // accent (1.5%)
                '#4F402D',   // accent (1.0%)
                '#62553D',   // accent (0.4%)
                '#857C63',   // accent (0.2%)
                '#A8A28D',   // accent (0.2%)
            ],
            pcts: [13.7, 12.5, 11.6, 11.6, 9.6, 8.6, 8.5, 7.4, 7.0, 4.9, 1.5, 1.5, 1.0, 0.4, 0.2, 0.2],
            useBoxMuller: true
        },

        nicholson_painted: {
            name: 'Nicholson — Painted Relief',
            artist: 'Ben Nicholson',
            school: 'Abstract',
            ref: 'Painted Relief (1939)',
            bg: '#EBE9E3',
            colors: [
                '#EBE9E3',   // dominant (18.4%)
                '#558599',   // secondary (17.0%)
                '#E7E7DE',   // tertiary (14.6%)
                '#C9D6DA',   // accent (9.9%)
                '#D5DBDC',   // accent (8.8%)
                '#97794D',   // accent (7.4%)
                '#83372F',   // accent (5.5%)
                '#A5A8A9',   // accent (4.8%)
                '#3B8FCD',   // accent (4.5%)
                '#B1B2B2',   // accent (3.1%)
                '#010101',   // accent (2.5%)
                '#608A9E',   // accent (2.2%)
                '#F4F9F7',   // accent (0.5%)
                '#746245',   // accent (0.4%)
                '#426673',   // accent (0.4%)
                '#38201F',   // accent (0.2%)
            ],
            pcts: [18.4, 17.0, 14.6, 9.9, 8.8, 7.4, 5.5, 4.8, 4.5, 3.1, 2.5, 2.2, 0.5, 0.4, 0.4, 0.2],
            useBoxMuller: false
        },

        heron_color: {
            name: 'Heron — Azalea Garden',
            artist: 'Patrick Heron',
            school: 'Abstract',
            ref: 'Azalea Garden (1956)',
            bg: '#CAC6CC',
            colors: [
                '#CAC6CC',   // dominant (15.9%)
                '#D9DBDE',   // secondary (15.6%)
                '#B8B2BE',   // tertiary (15.0%)
                '#EDF1F0',   // accent (10.4%)
                '#150A0E',   // accent (5.6%)
                '#BCA195',   // accent (5.0%)
                '#91909F',   // accent (4.8%)
                '#992320',   // accent (4.0%)
                '#293C46',   // accent (3.6%)
                '#631E2A',   // accent (3.6%)
                '#A97C69',   // accent (3.5%)
                '#8E464A',   // accent (3.3%)
                '#A87520',   // accent (2.8%)
                '#5D5027',   // accent (2.8%)
                '#68676E',   // accent (2.7%)
                '#D1980E',   // accent (1.5%)
            ],
            pcts: [15.9, 15.6, 15.0, 10.4, 5.6, 5.0, 4.8, 4.0, 3.6, 3.6, 3.5, 3.3, 2.8, 2.8, 2.7, 1.5],
            useBoxMuller: false
        },

        lee_ufan: {
            name: 'Lee Ufan — From Point',
            artist: 'Lee Ufan',
            school: 'Mono-Ha',
            ref: 'From Point (1973)',
            bg: '#F0EAD8',
            colors: [
                '#F0EAD8',   // dominant (15.0%)
                '#E5DBC7',   // secondary (13.6%)
                '#EBE4CF',   // tertiary (13.6%)
                '#F6F1E1',   // accent (10.8%)
                '#DFD3BF',   // accent (10.8%)
                '#D7C9B5',   // accent (8.4%)
                '#0C0933',   // accent (5.2%)
                '#CBBDAA',   // accent (4.8%)
                '#B8AD9E',   // accent (2.9%)
                '#211A3B',   // accent (2.7%)
                '#A49990',   // accent (2.3%)
                '#8F8482',   // accent (2.1%)
                '#362E47',   // accent (2.1%)
                '#786E73',   // accent (2.0%)
                '#4C4355',   // accent (2.0%)
                '#615865',   // accent (1.9%)
            ],
            pcts: [15.0, 13.6, 13.6, 10.8, 10.8, 8.4, 5.2, 4.8, 2.9, 2.7, 2.3, 2.1, 2.1, 2.0, 2.0, 1.9],
            useBoxMuller: true
        },

        tapies_matter: {
            name: 'Tàpies — Large Painting',
            artist: 'Antoni Tàpies',
            school: 'Informalism',
            ref: 'Large Painting (1958)',
            bg: '#6F593E',
            colors: [
                '#6F593E',   // dominant (10.3%)
                '#7D6547',   // secondary (9.1%)
                '#7F6036',   // tertiary (8.9%)
                '#6F522B',   // accent (8.6%)
                '#8D6F49',   // accent (8.1%)
                '#7E7062',   // accent (7.4%)
                '#6C6157',   // accent (7.1%)
                '#5D4B35',   // accent (6.7%)
                '#5A534C',   // accent (6.0%)
                '#8D7F73',   // accent (5.6%)
                '#5C411F',   // accent (5.1%)
                '#9C7F5B',   // accent (4.5%)
                '#463D32',   // accent (4.0%)
                '#432F16',   // accent (3.6%)
                '#A39280',   // accent (3.2%)
                '#28190C',   // accent (1.9%)
            ],
            pcts: [10.3, 9.1, 8.9, 8.6, 8.1, 7.4, 7.1, 6.7, 6.0, 5.6, 5.1, 4.5, 4.0, 3.6, 3.2, 1.9],
            useBoxMuller: true
        },

        dumas_flesh: {
            name: 'Dumas — The Image as Burden',
            artist: 'Marlene Dumas',
            school: 'Contemporary Figurative',
            ref: 'The Image as Burden (1993)',
            bg: '#141B17',
            colors: [
                '#141B17',   // dominant (26.5%)
                '#1A221E',   // secondary (19.5%)
                '#D8DEE0',   // tertiary (13.6%)
                '#242C25',   // accent (6.0%)
                '#7A7D73',   // accent (4.1%)
                '#6D7168',   // accent (3.9%)
                '#CFD4D1',   // accent (3.7%)
                '#888B80',   // accent (3.5%)
                '#313831',   // accent (3.3%)
                '#5F645B',   // accent (3.2%)
                '#51564E',   // accent (3.1%)
                '#414840',   // accent (2.8%)
                '#949B93',   // accent (2.5%)
                '#A7ADA6',   // accent (1.6%)
                '#BEC4BD',   // accent (1.5%)
                '#73868F',   // accent (1.0%)
            ],
            pcts: [26.5, 19.5, 13.6, 6.0, 4.1, 3.9, 3.7, 3.5, 3.3, 3.2, 3.1, 2.8, 2.5, 1.6, 1.5, 1.0],
            useBoxMuller: true
        },

        dumas_magdalena: {
            name: 'Dumas — Magdalena',
            artist: 'Marlene Dumas',
            school: 'Contemporary Figurative',
            ref: 'Magdalena (1995)',
            bg: '#EEE9D7',
            colors: [
                '#EEE9D7',   // dominant (25.1%)
                '#E7DFC7',   // secondary (21.1%)
                '#E9E1CA',   // tertiary (18.8%)
                '#ECE6D4',   // accent (13.0%)
                '#20201F',   // accent (8.7%)
                '#E3DCC4',   // accent (7.3%)
                '#FBF7E5',   // accent (1.6%)
                '#D8D2BC',   // accent (1.3%)
                '#2B2C2A',   // accent (0.7%)
                '#13120E',   // accent (0.7%)
                '#C5C2B0',   // accent (0.5%)
                '#ACAC9E',   // accent (0.3%)
                '#40413C',   // accent (0.2%)
                '#75766E',   // accent (0.2%)
                '#5B5B54',   // accent (0.2%)
                '#929186',   // accent (0.2%)
            ],
            pcts: [25.1, 21.1, 18.8, 13.0, 8.7, 7.3, 1.6, 1.3, 0.7, 0.7, 0.5, 0.3, 0.2, 0.2, 0.2, 0.2],
            useBoxMuller: true
        },

        tuymans_muted: {
            name: 'Tuymans — Gas Chamber',
            artist: 'Luc Tuymans',
            school: 'Contemporary Figurative',
            ref: 'Gas Chamber (1986)',
            bg: '#F1E1C0',
            colors: [
                '#F1E1C0',   // dominant (15.6%)
                '#EEE2C9',   // secondary (14.6%)
                '#FFFFFE',   // tertiary (12.3%)
                '#E4D9BF',   // accent (9.1%)
                '#F0DAB3',   // accent (7.7%)
                '#E0C59C',   // accent (6.6%)
                '#EBD0A5',   // accent (6.5%)
                '#DCD0B3',   // accent (5.3%)
                '#D1C3A8',   // accent (5.0%)
                '#D4B890',   // accent (4.0%)
                '#827A64',   // accent (3.0%)
                '#928B76',   // accent (2.9%)
                '#6F6A56',   // accent (2.7%)
                '#C0B69F',   // accent (2.2%)
                '#AFA085',   // accent (1.5%)
                '#524F3F',   // accent (1.1%)
            ],
            pcts: [15.6, 14.6, 12.3, 9.1, 7.7, 6.6, 6.5, 5.3, 5.0, 4.0, 3.0, 2.9, 2.7, 2.2, 1.5, 1.1],
            useBoxMuller: true
        },

        doig_atmospheric: {
            name: 'Doig — Blotter',
            artist: 'Peter Doig',
            school: 'Neo-Expressionism',
            ref: 'Blotter (1993)',
            bg: '#E7E1DF',
            colors: [
                '#E7E1DF',   // dominant (11.4%)
                '#DCD6D4',   // secondary (10.8%)
                '#D2C9C8',   // tertiary (9.7%)
                '#AA9FAA',   // accent (9.5%)
                '#B7ACB4',   // accent (9.3%)
                '#C4B9C1',   // accent (7.8%)
                '#8E8197',   // accent (7.4%)
                '#9C90A5',   // accent (6.7%)
                '#9E9494',   // accent (5.7%)
                '#807186',   // accent (5.6%)
                '#8E8381',   // accent (4.0%)
                '#776B69',   // accent (3.5%)
                '#5D5554',   // accent (2.8%)
                '#443F3B',   // accent (2.1%)
                '#675A78',   // accent (2.0%)
                '#272320',   // accent (1.5%)
            ],
            pcts: [11.4, 10.8, 9.7, 9.5, 9.3, 7.8, 7.4, 6.7, 5.7, 5.6, 4.0, 3.5, 2.8, 2.1, 2.0, 1.5],
            useBoxMuller: true
        },

        doig_canoe: {
            name: 'Doig — Canoe Lake',
            artist: 'Peter Doig',
            school: 'Neo-Expressionism',
            ref: 'Canoe Lake (1997–1998)',
            bg: '#21201D',
            colors: [
                '#21201D',   // dominant (19.8%)
                '#3B3727',   // secondary (11.6%)
                '#504426',   // tertiary (9.8%)
                '#A2AD5F',   // accent (7.1%)
                '#B1BD76',   // accent (6.2%)
                '#B9C14F',   // accent (5.7%)
                '#665B2E',   // accent (5.5%)
                '#C9CF70',   // accent (5.4%)
                '#CCD497',   // accent (5.3%)
                '#98A148',   // accent (4.9%)
                '#7E773B',   // accent (4.6%)
                '#79A874',   // accent (3.6%)
                '#DCE1BE',   // accent (3.4%)
                '#67AF9A',   // accent (3.1%)
                '#85C3AB',   // accent (2.3%)
                '#A48C2A',   // accent (1.8%)
            ],
            pcts: [19.8, 11.6, 9.8, 7.1, 6.2, 5.7, 5.5, 5.4, 5.3, 4.9, 4.6, 3.6, 3.4, 3.1, 2.3, 1.8],
            useBoxMuller: true
        },

        rauch_dreamscape: {
            name: 'Neo Rauch — Para',
            artist: 'Neo Rauch',
            school: 'Neo-Expressionism',
            ref: 'Para (2001)',
            bg: '#161819',
            colors: [
                '#161819',   // dominant (22.7%)
                '#76726B',   // secondary (13.6%)
                '#2A231F',   // tertiary (9.5%)
                '#ABA293',   // accent (7.4%)
                '#412E24',   // accent (6.8%)
                '#51483D',   // accent (6.3%)
                '#898780',   // accent (6.1%)
                '#686054',   // accent (5.8%)
                '#F6D382',   // accent (3.8%)
                '#702E20',   // accent (3.4%)
                '#273446',   // accent (3.3%)
                '#984931',   // accent (2.6%)
                '#3C5474',   // accent (2.4%)
                '#D1C4B2',   // accent (2.4%)
                '#A87656',   // accent (2.1%)
                '#D5A74F',   // accent (1.7%)
            ],
            pcts: [22.7, 13.6, 9.5, 7.4, 6.8, 6.3, 6.1, 5.8, 3.8, 3.4, 3.3, 2.6, 2.4, 2.4, 2.1, 1.7],
            useBoxMuller: true
        },

    });
})();
