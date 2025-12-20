myFontSet=[];






whirldFontArray=[
'Noto Sans','Noto Sans Symbols','Noto Sans Symbols 2',
'Noto Sans Arabic','Noto Sans Bengali','Noto Sans Devanagari',
'Noto Sans Gujarati','Noto Sans Gurmukhi','Noto Sans Hebrew',
'Noto Sans KR','Noto Sans Malayalam','Noto Sans SC',
'Noto Sans Sharada','Noto Sans Tamil','Noto Sans Telugu',
'Noto Sans Cham','Noto Sans Egyptian Hieroglyphs','Noto Sans Tibetan',
'Noto Sans Balinese','Noto Sans Tai Tham','Noto Sans Myanmar',
'Noto Sans Chakma','Noto Sans Grantha','Noto Sans Kawi',
'Noto Sans Lepcha','Noto Sans Limbu','Noto Sans Meetei Mayek',
'Noto Sans Modi','Noto Sans Oriya','Noto Sans PhagsPa',
'Noto Sans Newa','Noto Sans Takri','Noto Sans Siddham',
'Noto Sans Tirhuta','Noto Sans Zanabazar Square','Noto Sans Khmer',
'Noto Sans Sundanese','Noto Sans Thai','Noto Sans Thaana',
'Noto Sans Warang Citi','Noto Sans Javanese','Noto Sans Mongolian',
'Noto Sans Soyombo','Noto Sans JP',
'Noto Serif SC','Noto Serif Bengali','Noto Serif Gujarati',
'Noto Serif Gurmukhi','Noto Serif Hebrew','Noto Serif Malayalam',
'Noto Serif Tamil','Noto Serif Telugu','Noto Serif Tibetan',
'Noto Serif Devanagari','Noto Serif Balinese','Noto Serif Grantha',
'Noto Serif Limbu','Noto Serif Oriya','Noto Serif Khmer',
'Noto Serif Sundanese','Noto Serif Thai','Noto Serif JP',
'Noto Serif Gujarati Full','Noto Serif KR',
'Noto Kufi Arabic','Noto Naskh Arabic','Noto Nastaliq Urdu',
'Noto Rashi Hebrew','Noto Emoji',
'Quivira','Symbola',
'Code2000','Code2001','Code2002',
'Aegyptus','AegyptusB','AegyptusR',
'Aegean','Anatolian','Anatolian_Douros',
'Maya','Gardiner',
'DejaVu Sans','DejaVu Sans Condensed','DejaVu',
'Everson Mono','Segoe UI Symbol',
'Arial Unicode MS','Meiryo','Meiryo UI',
'MS Mincho','MS PGothic','MPH 2B Damase',
'Amiri','Paktype Tehreer','PakType Ajrak',
'_PDMS_Saleem_QuranFont','jameel noori nastaleeq','fajer noori nastalique',
'paktype naqsh','lateef','Kinza',
'Geeza Pro','kufam','Alkalami',
'Scheherazade New',
'Tibetan Machine Uni','Monloam_Uni',
'DDC_Uchen','Kailasa','YagpoSambhotaUni',
'Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict',
'Qomolangma-Betsu','Qomolangma-Drutsa','Qomolangma-Chuyig',
'BabelStoneTibetan','Siddhanta','Jomolhari',
'Uchen','Akshar Unicode','Annapurna SIL',
'Aparajita','Kokila','Mangal',
'Utsaah','Aharoni','solitreo',
'secular-one','noto-roshi-hebrew','noto-serif-hebrew',
'Ezra SIL','Cardo','SBL Hebrew',
'Keter YG','Rubik Doodle Shadow','Amatic SC',
'Chathura','Dhurjati','Pothana2000',
'Vani','Gautami','Kartika',
'Latha','Vijaya','Shonar',
'Shonarb','Vrinda','Atma',
'Raavi','Shruti','BhuTuka Expanded One',
'Mukta Mahee','Braah One','Langar',
'Ma Shan Zheng','ZCOOL QingKe HuangYou','Liu Jian Mao Cao',
'Kosugi Maru','Dela Gothic One','Yuji Boku',
'Hachi Maru Pop','Rampart One','Reggae One',
'Stick','Black Han Sans','Nanum Brush Script',
'Chiron GoRound TC','Nanum Pen Script','Lucida Sans Unicode',
'Jaini','Jaini Purva','Myanmar Taungyi',
'Open Moji Black','Twitter Color Emoji',
'Puppies Play','Tangerine','Quintessential','Kings',
'Mingzat','Namdhinggo','Baloo Bhaina 2','Anek Odia',
'Taprom','Moulpali','Fasthand','Nokora',
'Prompt','Charm','Fahkwang','Athiti','Kodchasan',
'Shippori Mincho B1','Kaisei Opti','Noto Sans Sinhala'
];
// OM SYMBOLS - All Om and Om-related symbols
myFontSet[0]=['x0950','Akshar Unicode','Annapurna SIL','Aparajita','Arial Unicode MS','Code2000','Kokila','Mangal','Siddhanta','Utsaah','Jaini','Jaini Purva','Noto Sans Devanagari']; // Devanagari Om
myFontSet[1]=['x0AD0','Arial Unicode MS','Code2000','Shruti','Noto Serif Gujarati Full','Noto Sans Gujarati Full']; // Gujarati Om
myFontSet[2]=['x014C;&#x1E43;','Noto Sans','Noto Serif','DejaVu','Quivira','Calistoga','Langar','Pattaya','Tac One','Unbounded','Young Serif','Agbalumo','Fruktur','Kavoon','Braah One','Coiny']; // Latin Om (composite)
myFontSet[3]=['x0A74','Arial Unicode MS','Code2000','Raavi','Noto Sans Gurmukhi','Noto Serif Gurmukhi']; // Ik Onkar (Gurmukhi)
myFontSet[4]=['x1F549','Symbola','Noto Sans Symbols',"Open Moji Black",'Twitter Color Emoji','Noto Emoji']; // Devanagari Om symbol
myFontSet[5]=['x0F00','Arial Unicode MS','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','YagpoSambhotaUni','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan','Qomolangma-Drutsa','Qomolangma-Chuyig','Qomolangma-Betsu','Noto Sans Tibetan','Noto Serif Tibetan']; // Tibetan Om
myFontSet[6]=['x0BD0','Vijaya','Noto Serif Tamil']; // Tamil Om
myFontSet[7]=['x0993;&#x0981','Shonarb','Shonar','Vrinda','Noto Sans Bengali','Atma','Noto Serif Bengali']; // Bengali Om (composite)
myFontSet[8]=['x0c13;&#x0c02','Arial Unicode MS','Akshar Unicode','Code2000','Gautami','Noto Sans Telugu','Noto Serif Telugu','Pothana2000','Vani','chathura','dhurjati']; // Telugu Om (composite)
myFontSet[9]=['x0D13;&#x0D02','Arial Unicode MS','Akshar Unicode','Code2000','Kartika','Noto Sans Malayalam','Noto Serif Malayalam']; // Malayalam Om (composite)
myFontSet[10]=['x0A14;&#x0A01','Noto Sans Gurmukhi','BhuTuka Expanded One','Mukta Mahee','Braah One','Noto Serif Gurmukhi']; // Gurmukhi Om (composite)
myFontSet[11]=['x111C4','Noto Sans Sharada']; // Sharada Om
myFontSet[12]=['x1B12;&#x1B01','Noto Sans Balinese','Noto Serif Balinese']; // Balinese Om
myFontSet[13]=['xaa05;&#xaa4c','Noto Sans Cham']; // Cham Om
myFontSet[14]=['xaa00;&#xaa2f;&#xaa31;&#xaa4c','Noto Sans Cham']; // Cham Om variant 2
myFontSet[15]=['x1025;&#x102F;&#x1036','Noto Sans Myanmar','Noto Serif Myanmar','Myanmar Taungyi']; // Myanmar Om
myFontSet[16]=['x11103;&#x1110E;&#x11100','Noto Sans Chakma']; // Chakma Om
myFontSet[17]=['x11350','Noto Sans Grantha','Noto Serif Grantha']; // Grantha Om
myFontSet[18]=['x11A50;&#x11A56;&#x11A96','Noto Sans Soyombo']; // Soyombo Om 𑩐𑩖𑪖
myFontSet[19]=['x1A52;&#x1A74','Noto Sans Tai Tham']; // Tai Tham Om
myFontSet[20]=['x11F10;&#x11F00','Noto Sans Kawi']; // Kawi Om
myFontSet[21]=['x1C23;&#x1C28;&#x1C35','Noto Sans Lepcha','Mingzat']; // Lepcha Om
myFontSet[22]=['x1900;&#x1925;&#x1931','Noto Sans Limbu','Namdhinggo']; // Limbu Om
myFontSet[23]=['xAAF2','Noto Sans Meetei Mayek']; // Meitei Mayek Om
myFontSet[24]=['x1160C;&#x1163D','Noto Sans Modi']; // Modi Om
myFontSet[25]=['x0B13;&#x200D;&#x0B01','Noto Sans Oriya','Noto Serif Oriya','Baloo Bhaina 2','Anek Odia']; // Odia Om
myFontSet[26]=['xA85D;&#xA861;&#xA84F','Noto Sans PhagsPa']; // Phags-pa Om
myFontSet[27]=['x11449','Noto Sans Newa']; // Pracalit Om (Newa)
myFontSet[28]=['x11688;&#x116AB','Noto Sans Takri']; // Takri Om
myFontSet[29]=['x1158C;&#x115BC','Noto Sans Siddham']; // Siddham Om
myFontSet[30]=['x114C7','Noto Sans Tirhuta']; // Tirhuta Om
myFontSet[31]=['x11A00;&#x11A06;&#x11A35','Noto Sans Zanabazar Square','BabelStone Zanabazar']; // Zanabazar Square Om
myFontSet[32]=['x17A2;&#x17C6','Noto Sans Khmer','Noto Serif Khmer','Taprom','Moulpali','Fasthand','Nokora']; // Khmer Om
myFontSet[33]=['x17DA','Noto Sans Khmer','Noto Serif Khmer','Taprom','Moulpali','Fasthand','Nokora']; // Khmer Sign Avakrahasanya
myFontSet[34]=['x1B87;&#x1B80','Noto Sans Sundanese']; // Sundanese Om
myFontSet[35]=['xE42;&#xE2D;&#xE4D','Noto Sans Thai','Noto Serif Thai','Prompt','Charm','Fahkwang','Athiti','Kodchasan']; // Thai Om
myFontSet[36]=['xE5B','Noto Sans Thai','Noto Serif Thai','Prompt','Charm','Fahkwang','Athiti','Kodchasan']; // Thai Character Khomut
myFontSet[37]=['x5535','Arial Unicode MS','Code2000','MS Mincho','Noto Sans SC','Noto Serif SC','ZCOOL QingKe HuangYou','Noto Serif SC']; // Chinese/Japanese Om (唵)
myFontSet[38]=['xC634','Arial Unicode MS','Code2000','Noto Sans KR','Black Han Sans','Nanum Brush Script','Noto Serif KR']; // Korean Om (옴)
myFontSet[39]=['x963F;&#x5443','Arial Unicode MS','Code2000','MS Mincho','Noto Sans JP','Noto Serif JP','Yuji Boku','Shippori Mincho B1','Hachi Maru Pop']; // Japanese A-Un (阿吽)
myFontSet[40]=['x30AA;&#x30FC;&#x30E0','Arial Unicode MS','Code2000','MS Mincho','Noto Sans JP','Noto Serif JP','Yuji Boku','Shippori Mincho B1','Hachi Maru Pop','Kaisei Opti']; // Japanese Om (Katakana オーム)
myFontSet[41]=['x1880;&#x1823','Noto Sans Mongolian']; // Manchu Om (ᢀᠣ)
myFontSet[42]=['x1880;&#x1823;&#x1838;&#x1820','Noto Sans Mongolian']; // Mongolian Om (ᢀᠣᠸᠠ)
myFontSet[43]=['x787;&#x7AE;&#x789','Noto Sans Thaana']; // Thaana Om (އޮމް)
myFontSet[44]=['x118FF','Noto Sans Warang Citi']; // Warang Citi Om (𑣿)
myFontSet[45]=['xA98E;&#xA9B4;&#xA980','Noto Sans Javanese']; // Javanese Om (ꦎꦴꦀ)
myFontSet[46]=['x0D95;&#x0DB8','Noto Sans Sinhala']; //Sinhala Om (ඕම්)
myFontSet[47]=['x0D95;&#x0D82','Noto Sans Sinhala']; //Sinhala Om (with circle)
myFontSet[48]=['x0BD0','Latha','Noto Sans Tamil']; // Tamil Om
myFontSet[49]=['x0627;&#x0648;&#x0645;','Noto Sans Arabic','Amiri','Paktype Tehreer','PakType Ajrak',
'_PDMS_Saleem_QuranFont','jameel noori nastaleeq','fajer noori nastalique',
'paktype naqsh','lateef','Kinza',
'Geeza Pro','kufam','Alkalami',
'Scheherazade New']; // Arabic Om
myFontSet[50]=['x11011;&#x1102B','Noto Sans Brahmi']; // Brahmi Om
myFontSet[51]=['xA8FD;','Jaini','Jaini Purva']; // Jaini Om
myFontSet[52]=['x0950;','Nithya Ranjana DU']; // Ranjana Devanagari Om
myFontSet[53]=['x11449;','Nithya Ranjana NU']; // Ranjana Newa Om
myFontSet[54]=['x0913;&#x092E;&#x094D;','Akshar Unicode','Annapurna SIL','Aparajita','Arial Unicode MS','Code2000','Kokila','Mangal','Siddhanta','Utsaah','Jaini','Jaini Purva','Noto Sans Devanagari']; // Devanagari Om
//myFontSet[55]=['x014C;&#x006D;&#x0310;','Siddhanta','Everson Mono','Quivira','Fascinate Inline']; // Latin Om (composite)


var glyphDescriptions = [];

glyphDescriptions[0] = 'Devanagari Om';
glyphDescriptions[1] = 'Gujarati Om';
glyphDescriptions[2] = 'Latin Om';
glyphDescriptions[3] = 'Gurmucki Ik Onkar';
glyphDescriptions[4] = 'Om symbol';
glyphDescriptions[5] = 'Tibetan Om';
glyphDescriptions[6] = 'Tamil Om';
glyphDescriptions[7] = 'Bengali Om';
glyphDescriptions[8] = 'Telugu Om';
glyphDescriptions[9] = 'Malayalam Om';
glyphDescriptions[10] = 'Gurmukhi Om';
glyphDescriptions[11] = 'Sharada Om';
glyphDescriptions[12] = 'Balinese Om';
glyphDescriptions[13] = 'Cham Om';
glyphDescriptions[14] = 'Cham Om';
glyphDescriptions[15] = 'Myanmar Om';
glyphDescriptions[16] = 'Chakma Om';
glyphDescriptions[17] = 'Grantha Om';
glyphDescriptions[18] = 'Soyombo Om';
glyphDescriptions[19] = 'Tai Tham Om';
glyphDescriptions[20] = 'Kawi Om';
glyphDescriptions[21] = 'Lepcha Om';
glyphDescriptions[22] = 'Limbu Om';
glyphDescriptions[23] = 'Meitei Mayek Om';
glyphDescriptions[24] = 'Modi Om';
glyphDescriptions[25] = 'Odia Om';
glyphDescriptions[26] = 'Phags-pa Om';
glyphDescriptions[27] = 'Newa Om';
glyphDescriptions[28] = 'Takri Om';
glyphDescriptions[29] = 'Siddham Om';
glyphDescriptions[30] = 'Tirhuta Om';
glyphDescriptions[31] = 'Zanabazar Square Om';
glyphDescriptions[32] = 'Khmer Om';
glyphDescriptions[33] = 'Khmer Avakrahasanya';
glyphDescriptions[34] = 'Sundanese Om';
glyphDescriptions[35] = 'Thai Om';
glyphDescriptions[36] = 'Thai Khomut';
glyphDescriptions[37] = 'CJK Om';
glyphDescriptions[38] = 'Korean Om';
glyphDescriptions[39] = 'Japanese A-Un';
glyphDescriptions[40] = 'Japanese Om';
glyphDescriptions[41] = 'Manchu Om';
glyphDescriptions[42] = 'Mongolian Om';
glyphDescriptions[43] = 'Thaana Om';
glyphDescriptions[44] = 'Warang Citi Om';
glyphDescriptions[45] = 'Javanese Om';
glyphDescriptions[46] = 'Sinhala Om';
glyphDescriptions[47] = 'Sinhala Om';
glyphDescriptions[48] = 'Tamil Om';
glyphDescriptions[49] = 'Arabic Om';
glyphDescriptions[50] = 'Brahmi Om';
glyphDescriptions[51] = 'Jain Om';
glyphDescriptions[52] = 'Ranjana Devanagari Om';
glyphDescriptions[53] = 'Ranjana Newa Om';
glyphDescriptions[54] = 'Devanagari Om';
//glyphDescriptions[55] = 'Latin Om';

const defaultMaskStyle = {
    maskSize: '40vw',
    maskYPosition: '58%', 
    maskXPosition: '50%'
};

const outlierDefinitions = [

    //--- Currently Unassigned Glyphs (Default Style) ---
    // Glyph indices (0-based) falling into 'defaultMaskStyle': [2, 3, 39]
    // Glyph NUMBERS (1-based) falling into 'defaultMaskStyle': [3, 4, 40]

    // --- HIGH Placement (Low Y-Position: 30% - 50%) ---
    {
        id: 'HighCenter-Large-VeryTop-55vw', // Ex. Glyph 7, very high
        maskSize: '50vw',
        maskYPosition: '30%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [6]
    },
    {
        id: 'HighCenter-Large-VeryTop-50vw', // Ex. Glyph 7, very high
        maskSize: '60vw',
        maskYPosition: '50%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [41]
    },
    {
        id: 'HighCenter-MediumLarge-Up-50vw', // Ex. Glyph 22, shifted up
        maskSize: '45vw',
        maskYPosition: '44%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [21]
    },
    {
        id: 'HighCenter-Medium-Up-46vw',      // Ex. Glyphs 37, 49, standard-medium moved up
        maskSize: '41vw',
        maskYPosition: '48%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [36, 48,49] // Restored index 48
    },
    {
        id: 'MidCenter-PhagsPa-Standard-34vw', // Ex. Phags-Pa glyphs, mid-center, compact
        maskSize: '31vw',
        maskYPosition: '50%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [26, 33, 40]
    },
    {
        id: 'MidCenter-Javanese-Compact-30vw', // Ex. Javanese glyph
        maskSize: '25vw',
        maskYPosition: '32%', // Closer to top
        maskXPosition: '50%',
        appliesToGlyphIndices: [45]
    },
    {
        id: 'HighCenter-TallGlyph-Compact-35vw', // Ex. Tall glyphs, compact
        maskSize: '30vw',
        maskYPosition: '42%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [15, 20]
    },
    {
        id: 'HighCenter-TallGlyph-Small-30vw', // Ex. Tall glyphs, smaller
        maskSize: '25vw',
        maskYPosition: '42%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [12, 19]
    },
    {
        id: 'MidCenter-Small-40vw', // Ex. Single small-medium glyph
        maskSize: '35vw',
        maskYPosition: '50%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [17, 42]
    },

    // --- STANDARD / MID Placement (Mid Y-Position: 57% - 60%) ---
    {
        id: 'MidCenter-SlightlyLarge-57vw', // Ex. Standard placement, a bit bigger
        maskSize: '47vw',
        maskYPosition: '57%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [4, 8, 9, 44]
    },
    {
        id: 'MidCenter-Standard-55vw', // Ex. Standard general size and placement
        maskSize: '50vw',
        maskYPosition: '60%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [0, 13, 24, 37, 38, 50, 54]
    },

    // --- LOW Placement (High Y-Position: 65% - 78%) ---
    {
        id: 'LowCenter-VeryLarge-70vw', // Ex. Very large glyph, dropped down
        maskSize: '65vw',
        maskYPosition: '65%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [23]
    },
    {
        id: 'LowCenter-Medium-65vw', // Ex. Medium size, dropped (16,29)
        maskSize: '45vw',
        maskYPosition: '65%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [16, 29]
    },
    {
        id: 'LowCenter-Large-60vw', // Ex. Large glyph, dropped down
        maskSize: '55vw',
        maskYPosition: '70%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [7, 11,51]
    },
    {
        id: 'LowLeft-MediumLarge-70vw', // Ex. Medium-large, dropped, slightly left
        maskSize: '49vw',
        maskYPosition: '70%',
        maskXPosition: '47%',
        appliesToGlyphIndices: [34]
    },
    {
        id: 'LowLeft-MediumLarge-70vw', // Ex. Medium-large, dropped, slightly left
        maskSize: '50vw',
        maskYPosition: '80%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [52,53]
    },
    {
        id: 'LowCenter-Standard-55vw', // Ex. Standard size, dropped down
        maskSize: '50vw',
        maskYPosition: '71%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [1, 22, 25, 27, 28, 30]
    },
    {
        id: 'LowLeft-Medium-71p-50vw', // Ex. Medium size, dropped, shifted left
        maskSize: '45vw',
        maskYPosition: '71%',
        maskXPosition: '45%',
        appliesToGlyphIndices: [14]
    },
    {
        id: 'LowCenter-Medium-71p-46vw', // Ex. Medium size, dropped down
        maskSize: '41vw',
        maskYPosition: '71%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [5, 10, 46, 47] // Restored indices 46, 47
    },
    {
        id: 'LowCenter-Medium-73p-46vw', // Ex. Medium size, deeper drop
        maskSize: '41vw',
        maskYPosition: '73%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [18, 35]
    },
    {
        id: 'LowCenter-MediumSmall-73p-44vw', // Ex. Medium-small, deeper drop
        maskSize: '39vw',
        maskYPosition: '73%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [32]
    },
    {
        id: 'LowCenter-Zanabazar-VeryLow-37vw', // Ex. Zanabazar glyph, very low
        maskSize: '32vw',
        maskYPosition: '78%',
        maskXPosition: '50%',
        appliesToGlyphIndices: [31]
    },

    // --- UNIQUE / EXTREME Styles ---
    {
        id: 'LowLeft-ExtremeLarge-75vw', // Ex. Very large, low, and shifted left
        maskSize: '70vw',
        maskYPosition: '68%',
        maskXPosition: '45%',
        appliesToGlyphIndices: [43]
    }
];


function generateAllGlyphStyles(defaultStyle, outlierDefinitions, glyphsArray) {
    const NUM_GLYPHS = glyphsArray.length;
    const allGlyphStyles = new Array(NUM_GLYPHS); // Pre-allocate array

    // Step 1: Fill the entire lookup array with the default style
    // We create a new object for each entry to avoid reference issues if the defaultStyle object was mutated later.
    for (let i = 0; i < NUM_GLYPHS; i++) {
        allGlyphStyles[i] = { ...defaultStyle };
    }

    // Track assigned indices for warnings (useful for catching accidental reassignments)
    const assignedOutlierIndices = new Set();

    // Step 2: Iterate through outlier definitions and overwrite the default style
    outlierDefinitions.forEach(style => {
        const { maskSize, maskYPosition, maskXPosition, id } = style; // 'id' for logging
        style.appliesToGlyphIndices.forEach(glyphIndex => {
            if (glyphIndex >= 0 && glyphIndex < NUM_GLYPHS) {
                if (assignedOutlierIndices.has(glyphIndex)) {
                     // Using optional chaining (?.) for glyphsArray[glyphIndex]?.id for robustness
                     console.warn(`Warning: Glyph ID ${glyphsArray[glyphIndex]?.id || `index ${glyphIndex + 1}`} (0-based: ${glyphIndex}) is assigned to multiple OUTLIER styles!
                                   Previously assigned. Reassigning with style: "${id}".`);
                }
                // Assign the custom style properties, overwriting the default
                allGlyphStyles[glyphIndex] = {
                    maskSize,
                    maskYPosition,
                    maskXPosition
                };
                assignedOutlierIndices.add(glyphIndex);
            } else {
                console.error(`Error: Glyph index ${glyphIndex} defined in outlier style "${id}" is out of bounds (0-${NUM_GLYPHS - 1}).`);
            }
        });
    });

    return allGlyphStyles;
}
var whirldArraySignal = [];






