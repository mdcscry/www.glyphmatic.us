myFontSet=[];

whirldFontArray=[
'Noto Sans','Noto Sans Symbols','Noto Sans Symbols',
'Noto Sans Symbols 2','Noto Sans Arabic','Noto Sans Bengali',
'Noto Sans Devanagari','Noto Sans Gujarati','Noto Sans Gurmukhi',
'Noto Sans Hebrew','Noto Sans KR','Noto Sans Malayalam',
'Noto Sans SC','Noto Sans Sharada','Noto Sans Tamil',
'Noto Sans Telugu','Noto Sans Cham','Noto Sans Egyptian Hieroglyphs',
'Noto Serif SC','Noto Serif Bengali','Noto Serif Gujarati',
'Noto Serif Gurmukhi','Noto Serif Hebrew','Noto Serif Malayalam',
'Noto Serif Tamil','Noto Serif Telugu','Noto Serif Tibetan',
'Noto Kufi Arabic','Noto Naskh Arabic','Noto Nastaliq Urdu',
'Noto Rashi Hebrew','Quivira','Symbola',
'Code2000','Code2001','Code2002',
'Aegyptus','AegyptusB','AegyptusR',
'Aegean','Anatolian','Anatolian_Douros',
'Maya','Gardiner','DejaVu Sans',
'DejaVu Sans Condensed','Everson Mono','Segoe UI Symbol',
'Arial Unicode MS','Meiryo','Meiryo UI',
'MS Mincho','MS PGothic','MPH 2B Damase',
'Amiri','Paktype Tehreer','PakType Ajrak',
'_PDMS_Saleem_QuranFont','jameel noori nastaleeq','fajer noori nastalique',
'paktype naqsh','lateef','Kinza',
'Geeza Pro','kufam','Alkalami',
'Scheherazade New','Tibetan Machine Uni','Monloam_Uni',
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
'Chiron GoRound TC','Nanum Pen Script','Lucida Sans Unicode','Junicode','Junicode Two Regular'
];

// Crosses and Christian symbols
myFontSet[0]=['x2648','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','MS PGothic','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Aries
myFontSet[1]=['9767','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','MS PGothic','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Cross variant 1
myFontSet[2]=['9768','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','MS PGothic','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Cross variant 2
myFontSet[3]=['9769','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','MS PGothic','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Cross variant 3
myFontSet[4]=['10009','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','MS PGothic','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Heavy cross 1
myFontSet[5]=['10010','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','MS PGothic','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Heavy cross 2
myFontSet[6]=['10015','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','MS PGothic','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Maltese cross
myFontSet[7]=['10016','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','MS PGothic','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Cross of Lorraine

// Islamic symbols
myFontSet[8]=['xFDFD','Paktype Tehreer','Amiri','PakType Ajrak','_PDMS_Saleem_QuranFont','jameel noori nastaleeq','fajer noori nastalique','paktype naqsh']; // Bismillah

// Miscellaneous symbols
myFontSet[9]=['x1F548','Symbola','Noto Sans Symbols']; // Ankh (eye variant)
myFontSet[10]=['x2670','Code2000','Symbola','Noto Sans Symbols','Segoe UI Symbol','DejaVu Sans','DejaVu Sans Condensed','Everson Mono']; // West Syriac cross
myFontSet[11]=['x2671','Code2000','Symbola','Noto Sans Symbols','Segoe UI Symbol','DejaVu Sans','DejaVu Sans Condensed','Everson Mono']; // East Syriac cross
myFontSet[12]=['x26E4','Symbola','Noto Sans Symbols','Quivira']; // Pentagram
myFontSet[13]=['x26E5','Symbola','Noto Sans Symbols']; // Right-handed interlaced pentagram
myFontSet[14]=['x26E6','Symbola','Noto Sans Symbols']; // Left-handed interlaced pentagram
myFontSet[15]=['x26E7','Symbola','Noto Sans Symbols','Quivira']; // Heavy four-pointed pentagram
myFontSet[16]=['x2693','Symbola','Noto Sans Symbols','Quivira','Code2000','Segoe UI Symbol','DejaVu Sans','DejaVu Sans Condensed','Everson Mono']; // Anchor
myFontSet[17]=['x2696','Symbola','Noto Sans Symbols','Quivira','Segoe UI Symbol','DejaVu Sans','DejaVu Sans Condensed','Everson Mono']; // Scales of justice

// Arabic/Islamic symbols continued
myFontSet[18]=['x06E9','Arial Unicode MS','Courier New','Tahoma','lateef','amiri','Paktype Tehreer','PakType Ajrak','_PDMS_Saleem_QuranFont']; // Arabic place of sajdah
myFontSet[19]=['x06DE','Arial Unicode MS','Courier New','Tahoma','kufam','lateef','amiri','Paktype Tehreer','PakType Ajrak','_PDMS_Saleem_QuranFont']; // Arabic start of rub el hizb
myFontSet[20]=['9770','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Arial Unicode Ms','Code2000','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Crescent
myFontSet[21]=['9773','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Arial Unicode MS','Code2000','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Hammer and sickle
myFontSet[22]=['10017','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Arial Unicode MS','Code2000','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Star of David

// Indic Om symbols
myFontSet[23]=['x0AD0','Arial Unicode MS','Code2000','Shruti','Noto Sans Gujarati','Noto Serif Gujarati']; // Gujarati Om
myFontSet[24]=['x006F;&#x030A;&#x006D','Akshar Unicode','Siddhanta']; // Latin Om (composite)
myFontSet[25]=['x0A74','Arial Unicode MS','Code2000','Raavi','Noto Sans Gurmukhi','Noto Serif Gurmukhi']; // Ik Onkar (Gurmukhi)
myFontSet[26]=['x1F549','Symbola','Noto Sans Symbols']; // Om symbol
myFontSet[27]=['x0950','Akshar Unicode','Annapurna SIL','Aparajita','Arial Unicode MS','Code2000','Kokila','Mangal','Siddhanta','Utsaah','Jaini','Jaini Purva']; // Devanagari Om

// Tibetan sacred symbols
myFontSet[28]=['x0FD5','Siddhanta','Tibetan Machine Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan right-facing swastika
myFontSet[29]=['x0FD6','Siddhanta','Tibetan Machine Uni','DDC_Uchen','Kailasa','YagpoSambhotaUni','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan left-facing swastika
myFontSet[30]=['x0FD7','Siddhanta','Tibetan Machine Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan swastika variant 1
myFontSet[31]=['x0FD8','Siddhanta','Tibetan Machine Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan swastika variant 2
myFontSet[32]=['x0F00','Arial Unicode MS','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','YagpoSambhotaUni','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan','Qomolangma-Drutsa','Qomolangma-Chuyig','Qomolangma-Betsu']; // Tibetan Om

// Indic Om symbols continued
myFontSet[33]=['x0BD0','Latha','Noto Sans Tamil','Vijaya','Noto Serif Tamil']; // Tamil Om
myFontSet[34]=['x0993;&#x0981','Shonarb','Shonar','Vrinda','Noto Sans Bengali','Atma']; // Bengali Om (composite)
myFontSet[35]=['x0c13;&#x0c02','Arial Unicode MS','Akshar Unicode','Code2000','Gautami','Noto Sans Telugu','Noto Serif Telugu','Pothana2000','Vani','chathura','dhurjati']; // Telugu Om (composite)
myFontSet[36]=['x0D13;&#x0D02','Arial Unicode MS','Akshar Unicode','Code2000','Kartika','Noto Sans Malayalam','Noto Serif Malayalam']; // Malayalam Om (composite)

// Islamic calligraphic symbols
myFontSet[37]=['xFDFB','Arial Unicode MS','amiri','Paktype Tehreer','Kinza','_PDMS_Saleem_QuranFont','Geeza Pro']; // Jalla Jalaluhu
myFontSet[38]=['xFDF2','PakType Tehreer','_PDMS_Saleem_QuranFont','Amiri','Arial Unicode MS','Code2000','Courier New','Fajer Noori Nastalique','Kinza','PakType Ajrak','Simplified Arabic','Tahoma','Geeza Pro']; // Allah

// Peace and harmony symbols
myFontSet[39]=['x262E','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Arial Unicode MS','Code2000','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Lucida Sans Unicode']; // Peace symbol
myFontSet[40]=['x262F','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Arial Unicode MS','Code2000','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Yin Yang
myFontSet[41]=['x270C','Noto Sans Symbols 2','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Arial Unicode MS','Code2000','Meiryo','MS Mincho','Segoe UI Symbol','Symbola']; // Victory hand/Peace sign

// Hebrew Tetragrammaton variants
myFontSet[42]=['x05D9;&#x05D4;&#x05D5;&#x05D4','Aharoni','Arial Unicode MS','Code2000','Courier New','MPH 2B Damase','Noto Sans Hebrew','Quivira','Tahoma','Times New Roman','solitreo','secular-one','noto-roshi-hebrew','noto-serif-hebrew','Ezra SIL','Cardo','SBL Hebrew','Keter YG','Rubik Doodle Shadow','Amatic SC']; // Tetragrammaton (pure)
myFontSet[43]=['x05D9;&#x05B0;&#x05D4;&#x05B9;&#x05D5;&#x05B8;&#x05D4','Aharoni','Arial Unicode MS','Code2000','Courier New','MPH 2B Damase','Noto Sans Hebrew','Quivira','Tahoma','Times New Roman','secular-one','noto-roshi-hebrew','noto-serif-hebrew','Ezra SIL','Cardo','SBL Hebrew','Keter YG','Rubik Doodle Shadow','Amatic SC']; // Tetragrammaton (Adonai pointing)
myFontSet[44]=['x05D9;&#x05B0;&#x05D4;&#x05D5;&#x05B8;&#x05D4','Aharoni','Arial Unicode MS','Code2000','Courier New','MPH 2B Damase','Noto Sans Hebrew','Quivira','Tahoma','Times New Roman','secular-one','noto-roshi-hebrew','noto-serif-hebrew','Ezra SIL','Cardo','SBL Hebrew','Keter YG','Rubik Doodle Shadow','Amatic SC']; // Tetragrammaton (biblical scholars)
myFontSet[45]=['x05D9;&#x05B7;&#x05D4;&#x05B0;&#x05D5;&#x05B6;&#x05D4','Aharoni','Arial Unicode MS','Code2000','Courier New','MPH 2B Damase','Noto Sans Hebrew','Quivira','Tahoma','Times New Roman','solitreo','secular-one','noto-roshi-hebrew','noto-serif-hebrew','Ezra SIL','Cardo','SBL Hebrew','Keter YG','Rubik Doodle Shadow','Amatic SC']; // Tetragrammaton (final)

// Buddhist and Dharmic symbols
myFontSet[46]=['x2638','Arial Unicode Ms','Code2000','Noto Sans Symbols','Quivira','Segoe UI Symbol','Siddhanta','Symbola','Tibetan Machine Uni','DDC_Uchen','BabelStoneTibetan','Siddhanta','Meiryo','MS Mincho']; // Dharma wheel

// Tibetan symbols
myFontSet[47]=['x0FCA','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan Phur-pa variant 1
myFontSet[48]=['x0FCB','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan Phur-pa variant 2
myFontSet[49]=['x0FCC','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan Nor-bu variant
myFontSet[327]=['x0FCC;&#x0FC6','BabelStoneTibetan']; // Tibetan Nor-bu variant

myFontSet[50]=['x262C','Arial Unicode Ms','Arial Unicode MS','Code2000','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Adi Shakti (Khanda)
myFontSet[51]=['x262B','Arial Unicode Ms','Arial Unicode MS','Code2000','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Farsi symbol
myFontSet[52]=['x0F15','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan astrological sign 1
myFontSet[53]=['x0F16','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan astrological sign 2
myFontSet[54]=['x0F17','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan astrological sign 3
myFontSet[55]=['x0FC4','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan symbol variant 1
myFontSet[56]=['x0FC5','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan symbol variant 2
myFontSet[326]=['x0FC7;&#x0FC6','Qomolangma-Art','BabelStoneTibetan']; // Tibetan symbol variant 3
myFontSet[57]=['x0FC7;','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan symbol variant 3

myFontSet[58]=['x0F13','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan comma/shad
myFontSet[59]=['x0FC2','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan symbol variant 4
myFontSet[60]=['x0FC3','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan symbol variant 5
myFontSet[61]=['x0FC8','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan symbol variant 6
myFontSet[62]=['x0FC9','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan symbol variant 7

// CJK philosophical concepts
myFontSet[63]=['x5FE2','Arial Unicode MS','Code2000','MS Mincho','MS PGothic','Meiryo','Noto Sans SC','Noto Serif SC']; // Chinese satori/enlightenment
myFontSet[64]=['x41A8','Code2000']; // Archaic heaven/void
myFontSet[65]=['x7A7A','Arial Unicode MS','Code2000','MS Mincho','MS PGothic','Meiryo','Noto Sans SC','Noto Serif SC','Ma Shan Zheng','ZCOOL QingKe HuangYou','Liu Jian Mao Cao','Kosugi Maru','Dela Gothic One','Yuji Boku','Hachi Maru Pop','Rampart One','Reggae One','Stick','Noto Sans KR','Chiron GoRound TC']; // Void/emptiness/heaven (空)
myFontSet[66]=['x51A5','Arial Unicode MS','Code2000','MS Mincho','MS PGothic','Meiryo','Noto Sans SC','Noto Serif SC','Ma Shan Zheng','ZCOOL QingKe HuangYou','Liu Jian Mao Cao','Kosugi Maru','Dela Gothic One','Yuji Boku','Hachi Maru Pop','Rampart One','Reggae One','Stick','Noto Sans KR','Chiron GoRound TC']; // Meditation (冥)
myFontSet[67]=['x7985','Arial Unicode MS','Code2000','MS Mincho','MS PGothic','Meiryo','Noto Sans SC','Noto Serif SC','Ma Shan Zheng','ZCOOL QingKe HuangYou','Liu Jian Mao Cao','Kosugi Maru','Dela Gothic One','Yuji Boku','Hachi Maru Pop','Rampart One','Reggae One','Stick']; // Zen (禅)
myFontSet[68]=['x795E','Arial Unicode MS','Code2000','MS Mincho','MS PGothic','Meiryo','Noto Sans SC','Noto Serif SC','Ma Shan Zheng','ZCOOL QingKe HuangYou','Liu Jian Mao Cao','Kosugi Maru','Dela Gothic One','Yuji Boku','Hachi Maru Pop','Rampart One','Reggae One','Stick','Noto Sans KR','Chiron GoRound TC']; // Spirit/god (神)
myFontSet[69]=['x9053','Arial Unicode MS','Code2000','MS Mincho','MS PGothic','Meiryo','Noto Sans SC','Noto Serif SC','Ma Shan Zheng','ZCOOL QingKe HuangYou','Liu Jian Mao Cao','Kosugi Maru','Dela Gothic One','Yuji Boku','Hachi Maru Pop','Rampart One','Reggae One','Stick','Noto Sans KR','Chiron GoRound TC']; // Tao/way (道)

// Medical and esoteric symbols
myFontSet[70]=['x2625','Aegean','Aegyptus','Analecta','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condense','Everson Mono','Gardiner','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Ankh
myFontSet[71]=['x2624','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mon','Meiryo','MS Mincho','MS PGothic','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Caduceus
myFontSet[72]=['xC2E0','Arial Unicode MS','Code2000','Noto Sans KR','Black Han Sans','Nanum Brush Script','Chiron GoRound TC','Nanum Pen Script']; // Korean god/spirit (신)
myFontSet[73]=['xAA5C','Code2000','noto-sans-cham']; // Cham spiral
myFontSet[74]=['x1F4AE','Segoe UI Symbol','Symbola']; // White lotus
myFontSet[75]=['x1F54A','Symbola']; // Dove of peace
myFontSet[76]=['x1F54F','Noto Sans Symbols','Symbola']; // Bowl of Hygieia

// Egyptian hieroglyphs
myFontSet[77]=['995890','AegyptusB','AegyptusR']; // Egyptian hieroglyph - man
myFontSet[78]=['996367','AegyptusB','AegyptusR']; // Egyptian hieroglyph - moon creature with ankh
myFontSet[79]=['997013','AegyptusB','AegyptusR']; // Egyptian hieroglyph - monkey
myFontSet[80]=['999663','AegyptusB','AegyptusR']; // Egyptian hieroglyph - moon on platter
myFontSet[81]=['999747','AegyptusB','AegyptusR']; // Egyptian hieroglyph - flying ankh
myFontSet[82]=['1001520','AegyptusB','AegyptusR']; // Egyptian hieroglyph - scales
myFontSet[83]=['1001564','AegyptusB','AegyptusR']; // Egyptian hieroglyph - owl
myFontSet[84]=['xf40e8','AegyptusB','AegyptusR']; // Egyptian hieroglyph - winged snakes
myFontSet[85]=['x133AC','Aegyptus','Noto Sans Egyptian Hieroglyphs','AegyptusB','AegyptusR']; // Egyptian hieroglyph - blessed lady
myFontSet[86]=['x13080','Aegyptus','Noto Sans Egyptian Hieroglyphs','AegyptusB','AegyptusR']; // Egyptian hieroglyph - eye
myFontSet[87]=['x1305E','Aegyptus','Noto Sans Egyptian Hieroglyphs','AegyptusB','AegyptusR']; // Egyptian hieroglyph - creature with ankh and moon

// Anatolian hieroglyphs
myFontSet[88]=['x1455B','Anatolian','Anatolian_Douros']; // Anatolian hieroglyph

// Natural and medical symbols
myFontSet[89]=['x1F41A','Symbola','Segoe UI Symbol']; // Conch shell
myFontSet[90]=['x2695','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Everson Mono','DejaVu Sans']; // Staff of Aesculapius
myFontSet[91]=['x269A','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Everson Mono','DejaVu Sans']; // Staff of Hermes
myFontSet[92]=['x269B','Code2000','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Everson Mono','DejaVu Sans']; // Atom symbol
myFontSet[93]=['x203D','Arial Unicode MS','Code2000','Noto Sans Symbols','Quivira','Symbola','Segoe UI Symbol','Everson Mono','Lucida Sans Unicode','DejaVu Sans']; // Interrobang
myFontSet[94]=['x221E','Code2000','Noto Sans Symbols','Quivira','Symbola','Segoe UI Symbol','Everson Mono','Lucida Sans Unicode','DejaVu Sans']; // Infinity

// CJK swastikas
myFontSet[95]=['x534D','Code2000','Arial Unicode MS','MS Mincho','Noto Sans SC','Noto Serif SC','ZCOOL QingKe HuangYou']; // Chinese swastika (left-facing 卍)
myFontSet[96]=['x5350','Code2000','Arial Unicode MS','MS Mincho','Noto Sans SC','Noto Serif SC','ZCOOL QingKe HuangYou']; // Chinese swastika (right-facing 卐)

// Stars and decorative symbols
myFontSet[97]=['x2729','Arial Unicode MS','Code2000','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Everson Mono','DejaVu Sans']; // Five-pointed star
myFontSet[98]=['x2742','Arial Unicode MS','Code2000','Meiryo','MS PGothic','Noto Sans Symbols','Segoe UI Symbol','Symbola','Everson Mono','DejaVu Sans']; // Circled eight-pointed star
myFontSet[99]=['x26E9','Noto Sans Symbols','Quivira','Symbola','Segoe UI Symbol','Everson Mono']; // Shinto shrine
myFontSet[100]=['x269C','Code2000','Noto Sans Symbols','Quivira','Symbola','Segoe UI Symbol','Everson Mono','DejaVu Sans']; // Fleur-de-lis
myFontSet[101]=['9766','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','DejaVu Sans']; // Cross variant 4

// Additional Indic Om variants
myFontSet[102]=['x0A14;&#x0A01','Noto Sans Gurmukhi','BhuTuka Expanded One','Mukta Mahee','Braah One']; // Gurmukhi Om (composite)
myFontSet[103]=['x111C4','Noto Sans Sharada']; // Sharada Om
myFontSet[104]=['x2E18','Code2000','Quivira','Symbola','Segoe UI Symbol','Everson Mono','DejaVu Sans']; // Inverted interrobang

// Astronomical/Planetary symbols
myFontSet[105]=['x2609','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Sun
myFontSet[106]=['x263D','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // First quarter moon
myFontSet[107]=['x263E','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Last quarter moon
myFontSet[108]=['x2641','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Earth
myFontSet[109]=['x2642','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Mars/Male
myFontSet[110]=['x2640','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Venus/Female
myFontSet[111]=['x2643','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Jupiter
myFontSet[112]=['x2644','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Saturn
myFontSet[113]=['x2645','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Uranus
myFontSet[114]=['x2646','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Neptune
myFontSet[115]=['x2647','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Pluto

// Alchemical symbols
myFontSet[116]=['x1F701','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical air
myFontSet[117]=['x1F702','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical fire
myFontSet[118]=['x1F703','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical earth
myFontSet[119]=['x1F704','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical water
myFontSet[120]=['x1F70D','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical sulfur
myFontSet[121]=['x1F714','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical salt
myFontSet[122]=['x1F71A','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical mercury

// I Ching trigrams
myFontSet[123]=['x2630','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola']; // I Ching trigram - Heaven
myFontSet[124]=['x2631','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola']; // I Ching trigram - Lake
myFontSet[125]=['x2632','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola']; // I Ching trigram - Fire
myFontSet[126]=['x2633','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola']; // I Ching trigram - Thunder
myFontSet[127]=['x2634','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola']; // I Ching trigram - Wind
myFontSet[128]=['x2635','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola']; // I Ching trigram - Water
myFontSet[129]=['x2636','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola']; // I Ching trigram - Mountain
myFontSet[130]=['x2637','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola']; // I Ching trigram - Earth

// Zodiac symbols (completing the set)
myFontSet[131]=['x2649','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Taurus
myFontSet[132]=['x264A','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Gemini
myFontSet[133]=['x264B','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Cancer
myFontSet[134]=['x264C','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Leo
myFontSet[135]=['x264D','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Virgo
myFontSet[136]=['x264E','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Libra
myFontSet[137]=['x264F','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Scorpio
myFontSet[138]=['x2650','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Sagittarius
myFontSet[139]=['x2651','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Capricorn
myFontSet[140]=['x2652','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Aquarius
myFontSet[141]=['x2653','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Pisces

// Chess pieces
myFontSet[142]=['x2654','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo']; // White king
myFontSet[143]=['x2655','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo']; // White queen
myFontSet[144]=['x2656','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo']; // White rook
myFontSet[145]=['x2657','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo']; // White bishop
myFontSet[146]=['x2658','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo']; // White knight
myFontSet[147]=['x2659','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo']; // White pawn
myFontSet[148]=['x265A','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Black king
myFontSet[149]=['x265B','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Black queen
myFontSet[150]=['x265C','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Black rook
myFontSet[151]=['x265D','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Black bishop
myFontSet[152]=['x265E','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Black knight
myFontSet[153]=['x265F','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Black pawn

// Musical symbols
myFontSet[154]=['x2669','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Music','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Quarter note
myFontSet[155]=['x266A','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Music','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Eighth note
myFontSet[156]=['x266B','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Music','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Beamed eighth notes
myFontSet[157]=['x266C','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Music','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Beamed sixteenth notes
myFontSet[158]=['x1D11E','Noto Music','Symbola']; // G clef (treble clef)

// Weather symbols
myFontSet[159]=['x2600','Symbola','Noto Emoji']; // Black sun
myFontSet[160]=['x2601','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Cloud
myFontSet[161]=['x2602','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Umbrella
myFontSet[162]=['x2603','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Snowman
myFontSet[163]=['x26C8','Everson Mono','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Thunder cloud and lightning

// Recycling/Environmental symbols
myFontSet[164]=['x2672','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Universal recycling symbol
myFontSet[165]=['x267B','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Black Universal Recycling Symbol
myFontSet[166]=['x267A','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Recycling Symbol for Generic Materials
myFontSet[167]=['x267C','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Recycled Paper Symbol
myFontSet[168]=['x267D','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Partially-Recycled Paper Symbol
myFontSet[169]=['x267E','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Permanent Paper Sign
//myFontSet[170]=['x2678','Arial Unicode MS','Code2000','Symbola']; // Universal recycling symbol (type-7)
myFontSet[171]=['x2679','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Universal recycling symbol (type-8)
myFontSet[172]=['x2620','Arial Unicode MS','Noto Emoji','Menlo','Arial Unicode MS','Code2000'
                ,'DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho'
                ,'Quivira','Segoe UI Symbol','Symbola']; // Skull and crossbones

// Political/Warning symbols
myFontSet[173]=['x270A;','Noto Emoji','Symbola']; // Raised fist
myFontSet[174]=['x2691','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Black flag
myFontSet[175]=['x26A1','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // High voltage/Lightning bolt
myFontSet[176]=['x26A0','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Warning sign
myFontSet[177]=['x2622','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Radioactive sign
myFontSet[178]=['x2623','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols 2','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Biohazard sign
myFontSet[179]=['x26B0','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Coffin
myFontSet[180]=['x26B1','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo','Noto Emoji']; // Funeral urn

// Christian symbols (additional)
myFontSet[181]=['x2627','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Chi Rho
myFontSet[182]=['x271D','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Latin cross
myFontSet[183]=['x2629','Arial Unicode MS','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Meiryo','MS Mincho',,'Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola','Menlo']; // Cross of Jerusalem

// Islamic symbols (additional)
myFontSet[184]=['x06DD','Arial Unicode MS','Noto Nastaliq Urdu','PakType Tehreer','_PDMS_Saleem_QuranFont','Amiri','Courier New','Fajer Noori Nastalique','Kinza','PakType Ajrak','Tahoma']; // Arabic end of Ayah

// Recent Unicode additions
myFontSet[185]=['x1FAAC','Noto Emoji']; // Hamsa
myFontSet[186]=['x058E','Code2000','Noto Sans Armenian']; // Armenian eternity sign
myFontSet[187]=['x1F480','Symbola','Noto Emoji','Quivira','Segoe UI Symbol']; // Skull



//Astronomical Symbols
myFontSet[188]=['x2BD3','Noto Sans Symbols 2']; // Pluto Form Two
myFontSet[189]=['x2BD4','Noto Sans Symbols 2']; // Pluto Form Three
myFontSet[190]=['x2BD5','Noto Sans Symbols 2']; // Pluto Form Four
myFontSet[191]=['x2BD6','Noto Sans Symbols 2']; // Pluto Form Five
myFontSet[192]=['x2BD7','Noto Sans Symbols 2']; // Transpluto
myFontSet[193]=['x2BD8','Noto Sans Symbols 2']; // Proserpina
myFontSet[194]=['x2BD9','Noto Sans Symbols 2']; // Astraea
myFontSet[195]=['x2BDA','Noto Sans Symbols 2']; // Hygiea
myFontSet[196]=['x2BDB','Noto Sans Symbols 2']; // Pholus
myFontSet[197]=['x2BDC','Noto Sans Symbols 2']; // Nessus
myFontSet[198]=['x2BDD','Noto Sans Symbols 2']; // White Moon Selena
myFontSet[199]=['x2BDE','Noto Sans Symbols 2']; // True Black Moon Lilith
myFontSet[200]=['x2BDF','Noto Sans Symbols 2']; // True Light Moon Arta
myFontSet[201]=['x2BE0','Noto Sans Symbols 2']; // Cupido
myFontSet[202]=['x2BE1','Noto Sans Symbols 2']; // Hades
myFontSet[203]=['x2BE2','Noto Sans Symbols 2']; // Zeus
myFontSet[204]=['x2BE3','Noto Sans Symbols 2']; // Kronos
myFontSet[205]=['x2BE4','Noto Sans Symbols 2']; // Apollon
myFontSet[206]=['x2BE5','Noto Sans Symbols 2']; // Admetos
myFontSet[207]=['x2BE6','Noto Sans Symbols 2']; // Vulcanus
myFontSet[208]=['x2BE7','Noto Sans Symbols 2']; // Poseidon
myFontSet[209]=['x2BE8','Noto Sans Symbols 2']; // Left Half Black Star
myFontSet[210]=['x2BE9','Noto Sans Symbols 2']; // Right Half Black Star
myFontSet[211]=['x2BEA','Noto Sans Symbols 2']; // Star with Left Half Black
myFontSet[212]=['x2BEB','Noto Sans Symbols 2']; // Star with Right Half Black
myFontSet[213]=['x2BEC','Noto Sans Symbols 2']; // Leftwards Two-Headed Arrow with Triangle Arrowheads
myFontSet[214]=['x2BED','Noto Sans Symbols 2']; // Upwards Two-Headed Arrow with Triangle Arrowheads
myFontSet[215]=['x2BEE','Noto Sans Symbols 2']; // Rightwards Two-Headed Arrow with Triangle Arrowheads
myFontSet[216]=['x2BEF','Noto Sans Symbols 2']; // Downwards Two-Headed Arrow with Triangle Arrowheads
myFontSet[217]=['x2BF0','Noto Sans Symbols 2']; // Eris Form One
myFontSet[218]=['x2BF1','Noto Sans Symbols 2']; // Eris Form Two
myFontSet[219]=['x2BF2','Noto Sans Symbols 2']; // Sedna

//Russian Astronomical Symbols
myFontSet[220]=['x2BF3','Noto Sans Symbols 2']; // Russian Astrological Symbol Vigintile
myFontSet[221]=['x2BF4','Noto Sans Symbols 2']; // Russian Astrological Symbol Novile
myFontSet[222]=['x2BF5','Noto Sans Symbols 2']; // Russian Astrological Symbol Quintile
myFontSet[223]=['x2BF6','Noto Sans Symbols 2']; // Russian Astrological Symbol Binovile
myFontSet[224]=['x2BF7','Noto Sans Symbols 2']; // Russian Astrological Symbol Sentagon
myFontSet[225]=['x2BF8','Noto Sans Symbols 2']; // Russian Astrological Symbol Tredecile
myFontSet[226]=['x1F300','Noto Emoji','Quivira','Symbola']; // Spiral
myFontSet[227]=['x1F300','Noto Emoji','Quivira','Symbola','Segoe UI Symbol']; // Cyclone 
myFontSet[228]=['x267E','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Quivira','Symbola']; // Permanent Paper Sign for spinners
myFontSet[229]=['x168D0','Noto Sans Bamum']; // Bamum Spiral for Spinners
myFontSet[230]=['x1B12;&#x1B01','Noto Sans Balinese','Noto Serif Balinese'] // Balinese OM
myFontSet[231]=['x1AA4','Noto Sans Tai Tham']; // Thai Tham Spiral for Spinners
myFontSet[232]=['x11A9E','Noto Sans Soyombo']; //SOYOMBO HEAD MARK WITH MOON AND SUN AND TRIPLE FLAME
myFontSet[233]=['x11A9F','Noto Sans Soyombo']; //SOYOMBO HEAD MARK WITH MOON AND SUN AND FLAME
myFontSet[234]=['x11AA0','Noto Sans Soyombo']; //SOYOMBO HEAD MARK WITH MOON AND SUN
myFontSet[235]=['x1F54E','Noto Emoji','Symbola']; //9 branch Menorah

// RUNIC SYMBOLS (U+16A0 - U+16FF)
// Elder Futhark (24 runes)
myFontSet[236] = ['x16A0','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Dotted','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚠ Fehu
myFontSet[237] = ['x16A1','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚡ Fehu variant
myFontSet[238] = ['x16A2','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Dotted','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚢ Uruz
myFontSet[239] = ['x16A3','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚣ Yr
myFontSet[240] = ['x16A4','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚤ Y
myFontSet[241] = ['x16A5','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚥ W
myFontSet[242] = ['x16A6','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Dotted','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚦ Thurisaz
myFontSet[243] = ['x16A7','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚧ Eth
myFontSet[244] = ['x16A8','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᚨ Ansuz
myFontSet[245] = ['x16A9','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚩ Os
myFontSet[246] = ['x16AA','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚪ Ac
myFontSet[247] = ['x16AB','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚫ Aesc
myFontSet[248] = ['x16AC','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᚬ Long-branch-oss O
myFontSet[249] = ['x16AD','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᚭ Short-twig-oss O
myFontSet[250] = ['x16AE','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚮ O
myFontSet[251] = ['x16AF','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚯ Oe
myFontSet[252] = ['x16B0','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚰ On
myFontSet[253] = ['x16B1','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Dotted','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚱ Raidho
myFontSet[254] = ['x16B2','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᚲ Kauna
myFontSet[255] = ['x16B3','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚳ Cen
myFontSet[256] = ['x16B4','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚴ Kaun
myFontSet[257] = ['x16B5','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚵ G
myFontSet[258] = ['x16B6','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚶ Eng
myFontSet[259] = ['x16B7','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚷ Gebo
myFontSet[260] = ['x16B8','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚸ Gar
myFontSet[261] = ['x16B9','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚹ Wunjo
myFontSet[262] = ['x16BA','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᚺ Haglas=z
myFontSet[263] = ['x16BB','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚻ Haegl
myFontSet[264] = ['x16BC','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚼ Long-branch-hagall H
myFontSet[265] = ['x16BD','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᚽ Short-twig-hagall H
myFontSet[266] = ['x16BE','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᚾ Naudiz
myFontSet[267] = ['x16BF','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᚿ Short-twig-naud N
myFontSet[268] = ['x16C0','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛀ Dotted-n
myFontSet[269] = ['x16C1','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Dotted','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛁ Isaz
myFontSet[270] = ['x16C2','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛂ E
myFontSet[271] = ['x16C3','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᛃ Jeran
myFontSet[272] = ['x16C4','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛄ Ger
myFontSet[273] = ['x16C5','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛅ Long-branch-ar Ae
myFontSet[274] = ['x16C6','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛆ Short-twig-ar A
myFontSet[275] = ['x16C7','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛇ Iwaz
myFontSet[276] = ['x16C8','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛈ Pertho
myFontSet[277] = ['x16C9','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛉ Algiz
myFontSet[278] = ['x16CA','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᛊ Sowilo
myFontSet[279] = ['x16CB','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛋ Sigel Long-branch-sol S
myFontSet[280] = ['x16CC','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛌ Short-twig-sol S
myFontSet[281] = ['x16CD','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛍ  C
myFontSet[282] = ['x16CE','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛎ Z
myFontSet[283] = ['x16CF','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛏ Tiwaz
myFontSet[284] = ['x16D0','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛐ Short-twig-tyr T
myFontSet[285] = ['x16D1','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛑ D
myFontSet[286] = ['x16D2','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Dotted','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛒ Berkanan
myFontSet[287] = ['x16D3','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᛓ Short-twig-bjarkan B
myFontSet[288] = ['x16D4','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛔ Dotted-p
myFontSet[289] = ['x16D5','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᛕ Open-p
myFontSet[290] = ['x16D6','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛖ Ehwaz
myFontSet[291] = ['x16D7','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛗ Mannaz
myFontSet[292] = ['x16D8','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛘ Long-branch-madr M
myFontSet[293] = ['x16D9','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᛙ Short-twig-madr M
myFontSet[294] = ['x16DA','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Dotted','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛚ Laukaz
myFontSet[295] = ['x16DB','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛛ Dotted-l
myFontSet[296] = ['x16DC','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᛜ Ingwaz
myFontSet[297] = ['x16DD','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛝ Ing
myFontSet[298] = ['x16DE','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛞ Dagaz
myFontSet[299] = ['x16DF','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛟ Othalan
myFontSet[300] = ['x16E0','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛠ Ear
myFontSet[301] = ['x16E1','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛡ Ior
myFontSet[302] = ['x16E2','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛢ Cweorth
myFontSet[303] = ['x16E3','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛣ Calc
myFontSet[304] = ['x16E4','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛤ Cealc
myFontSet[305] = ['x16E5','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛥ Stan
myFontSet[306] = ['x16E6','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛦ Long-branch-yr
myFontSet[307] = ['x16E7','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᛧ Short-twig-yr
myFontSet[308] = ['x16E8','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᛨ Icelandic-yr
myFontSet[309] = ['x16E9','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛩ Q
myFontSet[310] = ['x16EA','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic','BabelStone Runic Dotted']; // ᛪ X

// Additional runic letters and punctuation
myFontSet[311] = ['x16EB','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Dotted','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛫ Single punctuation
myFontSet[312] = ['x16EC','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Dotted','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛬ Multiple punctuation
myFontSet[313] = ['x16ED','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic Dotted','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛭ Cross punctuation
myFontSet[314] = ['x16EE','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᛮ Arlaug
myFontSet[315] = ['x16EF','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᛯ Tvimadur
myFontSet[316] = ['x16F0','Noto Sans Runic','Segoe UI Symbol','Code2000','Junicode','Junicode Two Regular','Quivira','Everson Mono','BabelStone Runic']; // ᛰ Belgthor
myFontSet[317] = ['x16F1','Noto Sans Runic','Code2000','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛱ K
myFontSet[318] = ['x16F2','Noto Sans Runic','Code2000','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛲ Sh
myFontSet[319] = ['x16F3','Noto Sans Runic','Code2000','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛳ Oo
myFontSet[320] = ['x16F4','Noto Sans Runic','Code2000','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛴ Franks Casket Os
myFontSet[321] = ['x16F5','Noto Sans Runic','Code2000','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛵ Franks Casket Is
myFontSet[322] = ['x16F6','Noto Sans Runic','Code2000','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛶ Franks Casket Eh
myFontSet[323] = ['x16F7','Noto Sans Runic','Code2000','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛷ Franks Casket Ac
myFontSet[324] = ['x16F8','Noto Sans Runic','Code2000','Quivira','Everson Mono','BabelStone Runic Byrhtferth','BabelStone Runic','BabelStone Moon Runes']; // ᛸ Franks Casket Aesc
myFontSet[325]=['x058D','Code2000','Noto Sans Armenian']; // Armenian eternity sign
myFontSet[328]=['x0ED1','Noto Sans Lao Looped']; // Lao number 1 spiral

// Alchemical Symbols (U+1F700-U+1F773) - Complete set
myFontSet[329]=['x1F700','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for quintessence
myFontSet[330]=['x1F705','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for aquafortis
myFontSet[331]=['x1F706','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for aqua regia
myFontSet[332]=['x1F707','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for aqua regia 2
myFontSet[333]=['x1F708','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for aqua vitae
myFontSet[334]=['x1F709','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for aqua vitae 2
myFontSet[335]=['x1F70A','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for vinegar
myFontSet[336]=['x1F70B','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for vinegar 2
myFontSet[337]=['x1F70C','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for vinegar 3
myFontSet[338]=['x1F70E','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for sulfur 2
myFontSet[339]=['x1F70F','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for sulfur 3
myFontSet[340]=['x1F710','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for philosopher's sulfur
myFontSet[341]=['x1F711','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for black sulfur
myFontSet[342]=['x1F712','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for mercury sublimate
myFontSet[343]=['x1F713','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for mercury sublimate 2
myFontSet[344]=['x1F715','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for salt 2
myFontSet[345]=['x1F716','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for salt 3
myFontSet[346]=['x1F717','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for nitre
myFontSet[347]=['x1F718','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for nitre 2
myFontSet[348]=['x1F719','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for nitre 3
myFontSet[349]=['x1F71B','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for cinnabar
myFontSet[350]=['x1F71C','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for cinnabar 2
myFontSet[351]=['x1F71D','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for cinnabar 3
myFontSet[352]=['x1F71E','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for gold
myFontSet[353]=['x1F71F','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for silver
myFontSet[354]=['x1F720','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for crocus of copper
myFontSet[355]=['x1F721','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for crocus of copper 2
myFontSet[356]=['x1F722','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for crocus of copper 3
myFontSet[357]=['x1F723','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for copper
myFontSet[358]=['x1F724','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for crocus of iron
myFontSet[359]=['x1F725','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for crocus of iron 2
myFontSet[360]=['x1F726','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for iron
myFontSet[361]=['x1F727','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for crocus of mars
myFontSet[362]=['x1F728','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for crocus of mars 2
myFontSet[363]=['x1F729','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for regulus
myFontSet[364]=['x1F72A','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for regulus 2
myFontSet[365]=['x1F72B','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for regulus 3
myFontSet[366]=['x1F72C','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for regulus 4
myFontSet[367]=['x1F72D','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for regulus of mars
myFontSet[368]=['x1F72E','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for regulus of mars 2
myFontSet[369]=['x1F72F','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for regulus of antimony
myFontSet[370]=['x1F730','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for regulus of antimony 2
myFontSet[371]=['x1F731','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for antimony
myFontSet[372]=['x1F732','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for antimony 2
myFontSet[373]=['x1F733','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for antimony 3
myFontSet[374]=['x1F734','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for tin
myFontSet[375]=['x1F735','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for lead
myFontSet[376]=['x1F736','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for lead ore
myFontSet[377]=['x1F737','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for lodestone
myFontSet[378]=['x1F738','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for lodestone 2
myFontSet[379]=['x1F739','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for stibnite
myFontSet[380]=['x1F73A','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for bismuth ore
myFontSet[381]=['x1F73B','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for auripigment
myFontSet[382]=['x1F73C','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for marcasite
myFontSet[383]=['x1F73D','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for marcasite 2
myFontSet[384]=['x1F73E','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for quick lime
myFontSet[385]=['x1F73F','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for borax
myFontSet[386]=['x1F740','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for borax 2
myFontSet[387]=['x1F741','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for borax 3
myFontSet[388]=['x1F742','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for alum
myFontSet[389]=['x1F743','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for oil
myFontSet[390]=['x1F744','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for spirit
myFontSet[391]=['x1F745','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for tincture
myFontSet[392]=['x1F746','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for gum
myFontSet[393]=['x1F747','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for wax
myFontSet[394]=['x1F748','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for powder
myFontSet[395]=['x1F749','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for calx
myFontSet[396]=['x1F74A','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for tutty
myFontSet[397]=['x1F74B','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for caput mortuum
myFontSet[398]=['x1F74C','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for scepter of jove
myFontSet[399]=['x1F74D','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for caduceus
myFontSet[400]=['x1F74E','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for trident
myFontSet[401]=['x1F74F','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for starred trident
myFontSet[402]=['x1F750','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for lodestone 3
myFontSet[403]=['x1F751','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for sal-ammoniac
myFontSet[404]=['x1F752','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for sal-ammoniac 2
myFontSet[405]=['x1F753','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for tartar
myFontSet[406]=['x1F754','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for tartar 2
myFontSet[407]=['x1F755','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for tartar 3
myFontSet[408]=['x1F756','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for vitriol
myFontSet[409]=['x1F757','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for vitriol 2
myFontSet[410]=['x1F758','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for rock salt
myFontSet[411]=['x1F759','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for rock salt 2
myFontSet[412]=['x1F75A','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for crocus of iron 3
myFontSet[413]=['x1F75B','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for horse dung
myFontSet[414]=['x1F75C','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for verdigris
myFontSet[415]=['x1F75D','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for vermillion
myFontSet[416]=['x1F75E','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for cinnabar 4
myFontSet[417]=['x1F75F','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for realgar
myFontSet[418]=['x1F760','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for realgar 2
myFontSet[419]=['x1F761','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for arsenic
myFontSet[420]=['x1F762','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for sublimation
myFontSet[421]=['x1F763','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for sublimation 2
myFontSet[422]=['x1F764','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for caput mortuum 2
myFontSet[423]=['x1F765','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for bismuth ore 2
myFontSet[424]=['x1F766','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for salt of copper
myFontSet[425]=['x1F767','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for nitre 4
myFontSet[426]=['x1F768','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for soap
myFontSet[427]=['x1F769','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for lye
myFontSet[428]=['x1F76A','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for ashes
myFontSet[429]=['x1F76B','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for pot ashes
myFontSet[430]=['x1F76C','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for brick
myFontSet[431]=['x1F76D','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for powdered brick
myFontSet[432]=['x1F76E','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for amalgam
myFontSet[433]=['x1F76F','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for stratum super stratum
myFontSet[434]=['x1F770','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for precipitation
myFontSet[435]=['x1F771','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for dissolution
myFontSet[436]=['x1F772','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for purify
myFontSet[437]=['x1F773','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Alchemical symbol for distill
myFontSet[438]=['x1F774','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Lot of fortune
myFontSet[439]=['x1F775','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Occultation
myFontSet[440]=['x1F776','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Lunar eclipse
// myFontSet[4XX=['x1F777','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Vesta form two
// myFontSet[4XX]=['x1F778','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Astraea form two
// myFontSet[4XX]=['x1F779','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Hygiea form two
// myFontSet[4XX]=['x1F77A','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Parthenope form two
myFontSet[441]=['x1F77B','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Haumea
myFontSet[442]=['x1F77C','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Makemake
myFontSet[443]=['x1F77D','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Gonggong
myFontSet[444]=['x1F77E','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Quaoar
myFontSet[445]=['x1F77F','Symbola','Noto Sans Symbols','Apple Symbols,Noto Sans Symbols','Quivira','Everson Mono']; // Orcus



var glyphDescriptions = [];

// Original entries 0-104
glyphDescriptions[0] = 'Aries';
glyphDescriptions[1] = 'Cross variant 1';
glyphDescriptions[2] = 'Cross variant 2';
glyphDescriptions[3] = 'Cross variant 3';
glyphDescriptions[4] = 'Heavy cross 1';
glyphDescriptions[5] = 'Heavy cross 2';
glyphDescriptions[6] = 'Maltese cross';
glyphDescriptions[7] = 'Cross of Lorraine';
glyphDescriptions[8] = 'Bismillah';
glyphDescriptions[9] = 'Ankh (eye variant)';
glyphDescriptions[10] = 'West Syriac cross';
glyphDescriptions[11] = 'East Syriac cross';
glyphDescriptions[12] = 'Pentagram';
glyphDescriptions[13] = 'Right-handed interlaced pentagram';
glyphDescriptions[14] = 'Left-handed interlaced pentagram';
glyphDescriptions[15] = 'Heavy four-pointed pentagram';
glyphDescriptions[16] = 'Anchor';
glyphDescriptions[17] = 'Scales of justice';
glyphDescriptions[18] = 'Arabic place of sajdah';
glyphDescriptions[19] = 'Arabic start of rub el hizb';
glyphDescriptions[20] = 'Crescent';
glyphDescriptions[21] = 'Hammer and sickle';
glyphDescriptions[22] = 'Star of David';
glyphDescriptions[23] = 'Gujarati Om';
glyphDescriptions[24] = 'Latin Om (composite)';
glyphDescriptions[25] = 'Ik Onkar (Gurmukhi)';
glyphDescriptions[26] = 'Om symbol';
glyphDescriptions[27] = 'Devanagari Om';
glyphDescriptions[28] = 'Tibetan right-facing swastika';
glyphDescriptions[29] = 'Tibetan left-facing swastika';
glyphDescriptions[30] = 'Tibetan swastika variant 1';
glyphDescriptions[31] = 'Tibetan swastika variant 2';
glyphDescriptions[32] = 'Tibetan Om';
glyphDescriptions[33] = 'Tamil Om';
glyphDescriptions[34] = 'Bengali Om (composite)';
glyphDescriptions[35] = 'Telugu Om (composite)';
glyphDescriptions[36] = 'Malayalam Om (composite)';
glyphDescriptions[37] = 'Jalla Jalaluhu';
glyphDescriptions[38] = 'Allah';
glyphDescriptions[39] = 'Peace symbol';
glyphDescriptions[40] = 'Yin Yang';
glyphDescriptions[41] = 'Victory hand/Peace sign';
glyphDescriptions[42] = 'Tetragrammaton (pure)';
glyphDescriptions[43] = 'Tetragrammaton (Adonai pointing)';
glyphDescriptions[44] = 'Tetragrammaton (biblical scholars)';
glyphDescriptions[45] = 'Tetragrammaton (final)';
glyphDescriptions[46] = 'Dharma wheel';
glyphDescriptions[47] = 'Tibetan Phur-pa variant 1';
glyphDescriptions[48] = 'Tibetan Phur-pa variant 2';
glyphDescriptions[49] = 'Tibetan Nor-bu variant';
glyphDescriptions[50] = 'Adi Shakti (Khanda)';
glyphDescriptions[51] = 'Farsi symbol';
glyphDescriptions[52] = 'Tibetan astrological sign 1';
glyphDescriptions[53] = 'Tibetan astrological sign 2';
glyphDescriptions[54] = 'Tibetan astrological sign 3';
glyphDescriptions[55] = 'Tibetan symbol variant 1';
glyphDescriptions[56] = 'Tibetan symbol variant 2';
glyphDescriptions[57] = 'Tibetan symbol variant 3';
glyphDescriptions[58] = 'Tibetan comma/shad';
glyphDescriptions[59] = 'Tibetan symbol variant 4';
glyphDescriptions[60] = 'Tibetan symbol variant 5';
glyphDescriptions[61] = 'Tibetan symbol variant 6';
glyphDescriptions[62] = 'Tibetan symbol variant 7';
glyphDescriptions[63] = 'Chinese satori/enlightenment';
glyphDescriptions[64] = 'Archaic heaven/void';
glyphDescriptions[65] = 'Void/emptiness/heaven (空)';
glyphDescriptions[66] = 'Meditation (冥)';
glyphDescriptions[67] = 'Zen (禅)';
glyphDescriptions[68] = 'Spirit/god (神)';
glyphDescriptions[69] = 'Tao/way (道)';
glyphDescriptions[70] = 'Ankh';
glyphDescriptions[71] = 'Caduceus';
glyphDescriptions[72] = 'Korean god/spirit (신)';
glyphDescriptions[73] = 'Cham spiral';
glyphDescriptions[74] = 'White lotus';
glyphDescriptions[75] = 'Dove of peace';
glyphDescriptions[76] = 'Bowl of Hygieia';
glyphDescriptions[77] = 'Egyptian hieroglyph - man';
glyphDescriptions[78] = 'Egyptian hieroglyph - moon creature with ankh';
glyphDescriptions[79] = 'Egyptian hieroglyph - monkey';
glyphDescriptions[80] = 'Egyptian hieroglyph - moon on platter';
glyphDescriptions[81] = 'Egyptian hieroglyph - flying ankh';
glyphDescriptions[82] = 'Egyptian hieroglyph - scales';
glyphDescriptions[83] = 'Egyptian hieroglyph - owl';
glyphDescriptions[84] = 'Egyptian hieroglyph - winged snakes';
glyphDescriptions[85] = 'Egyptian hieroglyph - blessed lady';
glyphDescriptions[86] = 'Egyptian hieroglyph - eye';
glyphDescriptions[87] = 'Egyptian hieroglyph - creature with ankh and moon';
glyphDescriptions[88] = 'Anatolian hieroglyph';
glyphDescriptions[89] = 'Conch shell';
glyphDescriptions[90] = 'Staff of Aesculapius';
glyphDescriptions[91] = 'Staff of Hermes';
glyphDescriptions[92] = 'Atom symbol';
glyphDescriptions[93] = 'Interrobang';
glyphDescriptions[94] = 'Infinity';
glyphDescriptions[95] = 'Chinese swastika (left-facing 卍)';
glyphDescriptions[96] = 'Chinese swastika (right-facing 卐)';
glyphDescriptions[97] = 'Five-pointed star';
glyphDescriptions[98] = 'Circled eight-pointed star';
glyphDescriptions[99] = 'Shinto shrine';
glyphDescriptions[100] = 'Fleur-de-lis';
glyphDescriptions[101] = 'Cross variant 4';
glyphDescriptions[102] = 'Gurmukhi Om (composite)';
glyphDescriptions[103] = 'Sharada Om';
glyphDescriptions[104] = 'Inverted interrobang';

// New entries 105-187
glyphDescriptions[105] = 'Sun';
glyphDescriptions[106] = 'First quarter moon';
glyphDescriptions[107] = 'Last quarter moon';
glyphDescriptions[108] = 'Earth';
glyphDescriptions[109] = 'Mars/Male';
glyphDescriptions[110] = 'Venus/Female';
glyphDescriptions[111] = 'Jupiter';
glyphDescriptions[112] = 'Saturn';
glyphDescriptions[113] = 'Uranus';
glyphDescriptions[114] = 'Neptune';
glyphDescriptions[115] = 'Pluto';
glyphDescriptions[116] = 'Alchemical air';
glyphDescriptions[117] = 'Alchemical fire';
glyphDescriptions[118] = 'Alchemical earth';
glyphDescriptions[119] = 'Alchemical water';
glyphDescriptions[120] = 'Alchemical sulfur';
glyphDescriptions[121] = 'Alchemical salt';
glyphDescriptions[122] = 'Alchemical mercury';
glyphDescriptions[123] = 'I Ching trigram - Heaven';
glyphDescriptions[124] = 'I Ching trigram - Lake';
glyphDescriptions[125] = 'I Ching trigram - Fire';
glyphDescriptions[126] = 'I Ching trigram - Thunder';
glyphDescriptions[127] = 'I Ching trigram - Wind';
glyphDescriptions[128] = 'I Ching trigram - Water';
glyphDescriptions[129] = 'I Ching trigram - Mountain';
glyphDescriptions[130] = 'I Ching trigram - Earth';
glyphDescriptions[131] = 'Taurus';
glyphDescriptions[132] = 'Gemini';
glyphDescriptions[133] = 'Cancer';
glyphDescriptions[134] = 'Leo';
glyphDescriptions[135] = 'Virgo';
glyphDescriptions[136] = 'Libra';
glyphDescriptions[137] = 'Scorpio';
glyphDescriptions[138] = 'Sagittarius';
glyphDescriptions[139] = 'Capricorn';
glyphDescriptions[140] = 'Aquarius';
glyphDescriptions[141] = 'Pisces';
glyphDescriptions[142] = 'White king';
glyphDescriptions[143] = 'White queen';
glyphDescriptions[144] = 'White rook';
glyphDescriptions[145] = 'White bishop';
glyphDescriptions[146] = 'White knight';
glyphDescriptions[147] = 'White pawn';
glyphDescriptions[148] = 'Black king';
glyphDescriptions[149] = 'Black queen';
glyphDescriptions[150] = 'Black rook';
glyphDescriptions[151] = 'Black bishop';
glyphDescriptions[152] = 'Black knight';
glyphDescriptions[153] = 'Black pawn';
glyphDescriptions[154] = 'Quarter note';
glyphDescriptions[155] = 'Eighth note';
glyphDescriptions[156] = 'Beamed eighth notes';
glyphDescriptions[157] = 'Beamed sixteenth notes';
glyphDescriptions[158] = 'G clef (treble clef)';
glyphDescriptions[159] = 'Black sun';
glyphDescriptions[160] = 'Cloud';
glyphDescriptions[161] = 'Umbrella';
glyphDescriptions[162] = 'Snowman';
glyphDescriptions[163] = 'Thunder cloud and lightning';
glyphDescriptions[164] = 'Universal recycling symbol';
glyphDescriptions[165] = 'Black Universal Recycling Symbol';
glyphDescriptions[166] = 'Recycling Symbol for Generic Materials';
glyphDescriptions[167] = 'Recycled Paper Symbol';
glyphDescriptions[168] = 'Partially-Recycled Paper Symbol';
glyphDescriptions[169] = 'Permanent Paper Sign';
//glyphDescriptions[170] = 'Universal recycling symbol (type-7)';
glyphDescriptions[171] = 'Recycling - Other: A catch-all category for various or mixed plastics, which are difficult to recycle.';
glyphDescriptions[172] = 'Skull and crossbones';
glyphDescriptions[173] = 'Raised fist';
glyphDescriptions[174] = 'Black flag';
glyphDescriptions[175] = 'High voltage/Lightning bolt';
glyphDescriptions[176] = 'Warning sign';
glyphDescriptions[177] = 'Radioactive sign';
glyphDescriptions[178] = 'Biohazard sign';
glyphDescriptions[179] = 'Coffin';
glyphDescriptions[180] = 'Funeral urn';
glyphDescriptions[181] = 'Chi Rho';
glyphDescriptions[182] = 'Latin cross';
glyphDescriptions[183] = 'Cross of Jerusalem';
glyphDescriptions[184] = 'Arabic end of Ayah';
glyphDescriptions[185] = 'Hamsa';
glyphDescriptions[186] = 'Armenian eternity sign';
glyphDescriptions[187] = 'Skull';

glyphDescriptions[188] = 'Pluto Form Two';
glyphDescriptions[189] = 'Pluto Form Three';
glyphDescriptions[190] = 'Pluto Form Four';
glyphDescriptions[191] = 'Pluto Form Five';
glyphDescriptions[192] = 'Transpluto';
glyphDescriptions[193] = 'Proserpina';
glyphDescriptions[194] = 'Astraea';
glyphDescriptions[195] = 'Hygiea';
glyphDescriptions[196] = 'Pholus';
glyphDescriptions[197] = 'Nessus';
glyphDescriptions[198] = 'White Moon Selena';
glyphDescriptions[199] = 'True Black Moon Lilith';
glyphDescriptions[200] = 'True Light Moon Arta';
glyphDescriptions[201] = 'Cupido';
glyphDescriptions[202] = 'Hades';
glyphDescriptions[203] = 'Zeus';
glyphDescriptions[204] = 'Kronos';
glyphDescriptions[205] = 'Apollon';
glyphDescriptions[206] = 'Admetos';
glyphDescriptions[207] = 'Vulcanus';
glyphDescriptions[208] = 'Poseidon';
glyphDescriptions[209] = 'Left Half Black Star';
glyphDescriptions[210] = 'Right Half Black Star';
glyphDescriptions[211] = 'Star with Left Half Black';
glyphDescriptions[212] = 'Star with Right Half Black';
glyphDescriptions[213] = 'Leftwards Two-Headed Arrow with Triangle Arrowheads';
glyphDescriptions[214] = 'Upwards Two-Headed Arrow with Triangle Arrowheads';
glyphDescriptions[215] = 'Rightwards Two-Headed Arrow with Triangle Arrowheads';
glyphDescriptions[216] = 'Downwards Two-Headed Arrow with Triangle Arrowheads';
glyphDescriptions[217] = 'Eris Form One';
glyphDescriptions[218] = 'Eris Form Two';
glyphDescriptions[219] = 'Sedna';
glyphDescriptions[220] = 'Russian Astrological Symbol Vigintile';
glyphDescriptions[221] = 'Russian Astrological Symbol Novile';
glyphDescriptions[222] = 'Russian Astrological Symbol Quintile';
glyphDescriptions[223] = 'Russian Astrological Symbol Binovile';
glyphDescriptions[224] = 'Russian Astrological Symbol Sentagon';
glyphDescriptions[225] = 'Russian Astrological Symbol Tredecile';
glyphDescriptions[226] = 'Spiral (Cham)'; //for spinners
glyphDescriptions[227] = 'Cyclone'; // for spinners
glyphDescriptions[228] = 'Permanent Paper Sign';//for spinners
glyphDescriptions[229]=  'Bamum Letter'; // Bamum Spiral for Spinners
glyphDescriptions[230]=  'Balinese OM' // Balinese OM
glyphDescriptions[231]=  'Thai Tham Letter'; // Thai Tham Spiral for Spinners
glyphDescriptions[232]='HEAD MARK WITH MOON AND SUN AND TRIPLE FLAME'; //Soyombo
glyphDescriptions[233]='SOYOMBO HEAD MARK WITH MOON AND SUN AND FLAME'; //Soyombo
glyphDescriptions[234]='SOYOMBO HEAD MARK WITH MOON AND SUN'; //Soyombo
glyphDescriptions[235]= 'MENORAH WITH NINE BRANCHES' 
// Descriptions with runic tradition origins
glyphDescriptions[236] = 'Fehu (cattle, wealth) - Elder Futhark';
glyphDescriptions[237] = 'Fehu variant - Anglo-Saxon Futhorc';
glyphDescriptions[238] = 'Uruz (aurochs, strength) - Elder Futhark';
glyphDescriptions[239] = 'Yr (yew bow) - Younger Futhark';
glyphDescriptions[240] = 'Y - Anglo-Saxon Futhorc';
glyphDescriptions[241] = 'W - Anglo-Saxon Futhorc';
glyphDescriptions[242] = 'Thurisaz (giant, thorn) - Elder Futhark';
glyphDescriptions[243] = 'Eth - Anglo-Saxon Futhorc';
glyphDescriptions[244] = 'Ansuz (god, mouth) - Elder Futhark';
glyphDescriptions[245] = 'Os - Anglo-Saxon Futhorc';
glyphDescriptions[246] = 'Ac (oak) - Anglo-Saxon Futhorc';
glyphDescriptions[247] = 'Aesc (ash tree) - Anglo-Saxon Futhorc';
glyphDescriptions[248] = 'Long-branch-oss O - Younger Futhark';
glyphDescriptions[249] = 'Short-twig-oss O - Younger Futhark';
glyphDescriptions[250] = 'O - Medieval Runes';
glyphDescriptions[251] = 'Oe - Medieval Runes';
glyphDescriptions[252] = 'On - Anglo-Saxon Futhorc';
glyphDescriptions[253] = 'Raidho (ride, journey) - Elder Futhark';
glyphDescriptions[254] = 'Kauna (ulcer) - Elder Futhark';
glyphDescriptions[255] = 'Cen (torch) - Anglo-Saxon Futhorc';
glyphDescriptions[256] = 'Kaun - Younger Futhark';
glyphDescriptions[257] = 'G - Anglo-Saxon Futhorc';
glyphDescriptions[258] = 'Eng - Anglo-Saxon Futhorc';
glyphDescriptions[259] = 'Gebo (gift) - Elder Futhark';
glyphDescriptions[260] = 'Gar (spear) - Anglo-Saxon Futhorc';
glyphDescriptions[261] = 'Wunjo (joy) - Elder Futhark';
glyphDescriptions[262] = 'Haglaz (hail) - Elder Futhark';
glyphDescriptions[263] = 'Haegl (hail) - Anglo-Saxon Futhorc';
glyphDescriptions[264] = 'Long-branch-hagall H - Younger Futhark';
glyphDescriptions[265] = 'Short-twig-hagall H - Younger Futhark';
glyphDescriptions[266] = 'Naudiz (need) - Elder Futhark';
glyphDescriptions[267] = 'Short-twig-naud N - Younger Futhark';
glyphDescriptions[268] = 'Dotted-n - Medieval Runes';
glyphDescriptions[269] = 'Isaz (ice) - Elder Futhark';
glyphDescriptions[270] = 'E - Anglo-Saxon Futhorc';
glyphDescriptions[271] = 'Jeran (year, harvest) - Elder Futhark';
glyphDescriptions[272] = 'Ger - Anglo-Saxon Futhorc';
glyphDescriptions[273] = 'Long-branch-ar Ae - Younger Futhark';
glyphDescriptions[274] = 'Short-twig-ar A - Younger Futhark';
glyphDescriptions[275] = 'Iwaz (yew) - Elder Futhark';
glyphDescriptions[276] = 'Pertho (fate, mystery) - Elder Futhark';
glyphDescriptions[277] = 'Algiz (elk, protection) - Elder Futhark';
glyphDescriptions[278] = 'Sowilo (sun) - Elder Futhark';
glyphDescriptions[279] = 'Sigel (sun) - Anglo-Saxon Futhorc';
glyphDescriptions[280] = 'Long-branch-sol S - Younger Futhark';
glyphDescriptions[281] = 'Short-twig-sol S - Younger Futhark';
glyphDescriptions[282] = 'C - Medieval Runes';
glyphDescriptions[283] = 'Tiwaz (Tyr, victory) - Elder Futhark';
glyphDescriptions[284] = 'Short-twig-tyr T - Younger Futhark';
glyphDescriptions[285] = 'D - Medieval Runes';
glyphDescriptions[286] = 'Berkanan (birch, growth) - Elder Futhark';
glyphDescriptions[287] = 'Short-twig-bjarkan B - Younger Futhark';
glyphDescriptions[288] = 'Dotted-p - Medieval Runes';
glyphDescriptions[289] = 'Open-p - Medieval Runes';
glyphDescriptions[290] = 'Ehwaz (horse) - Elder Futhark';
glyphDescriptions[291] = 'Mannaz (man, humanity) - Elder Futhark';
glyphDescriptions[292] = 'Long-branch-madr M - Younger Futhark';
glyphDescriptions[293] = 'Short-twig-madr M - Younger Futhark';
glyphDescriptions[294] = 'Laukaz (water, lake) - Elder Futhark';
glyphDescriptions[295] = 'Dotted-l - Medieval Runes';
glyphDescriptions[296] = 'Ingwaz (Ing, fertility) - Elder Futhark';
glyphDescriptions[297] = 'Ing - Anglo-Saxon Futhorc';
glyphDescriptions[298] = 'Dagaz (day) - Elder Futhark';
glyphDescriptions[299] = 'Othalan (heritage, estate) - Elder Futhark';
glyphDescriptions[300] = 'Ear (earth, grave) - Anglo-Saxon Futhorc';
glyphDescriptions[301] = 'Ior (serpent) - Anglo-Saxon Futhorc';
glyphDescriptions[302] = 'Cweorth (fire) - Anglo-Saxon Futhorc';
glyphDescriptions[303] = 'Calc (chalice) - Anglo-Saxon Futhorc';
glyphDescriptions[304] = 'Cealc - Anglo-Saxon Futhorc';
glyphDescriptions[305] = 'Stan (stone) - Anglo-Saxon Futhorc';
glyphDescriptions[306] = 'Long-branch-yr - Younger Futhark';
glyphDescriptions[307] = 'Short-twig-yr - Younger Futhark';
glyphDescriptions[308] = 'Icelandic-yr - Medieval Runes';
glyphDescriptions[309] = 'Q - Medieval Runes';
glyphDescriptions[310] = 'X - Medieval Runes';
glyphDescriptions[311] = 'Runic single punctuation';
glyphDescriptions[312] = 'Runic multiple punctuation';
glyphDescriptions[313] = 'Runic cross punctuation';
glyphDescriptions[314] = 'Arlaug (golden rune) - Medieval Runes';
glyphDescriptions[315] = 'Tvimadur (double man) - Medieval Runes';
glyphDescriptions[316] = 'Belgthor - Medieval Runes';
glyphDescriptions[317] = 'K - Medieval Runes';
glyphDescriptions[318] = 'Sh - Medieval Runes';
glyphDescriptions[319] = 'Oo - Medieval Runes';
glyphDescriptions[320] = 'Franks Casket Os - Anglo-Saxon Futhorc';
glyphDescriptions[321] = 'Franks Casket Is - Anglo-Saxon Futhorc';
glyphDescriptions[322] = 'Franks Casket Eh - Anglo-Saxon Futhorc';
glyphDescriptions[323] = 'Franks Casket Ac - Anglo-Saxon Futhorc';
glyphDescriptions[324] = 'Franks Casket Aesc - Anglo-Saxon Futhorc';
glyphDescriptions[325]='Armenian eternity sign';
glyphDescriptions[326]=['Tibetan symbol 4-fold With lotus'];

glyphDescriptions[327]=[' Tibetan Nor-bu variant with lotus'];
glyphDescriptions[328]=['Lao number 1 spiral']; // 
glyphDescriptions[329]=['Alchemical symbol for quintessence'];
glyphDescriptions[330]=['Alchemical symbol for aquafortis'];
glyphDescriptions[331]=['Alchemical symbol for aqua regia'];
glyphDescriptions[332]=['Alchemical symbol for aqua regia 2'];
glyphDescriptions[333]=['Alchemical symbol for aqua vitae'];
glyphDescriptions[334]=['Alchemical symbol for aqua vitae 2'];
glyphDescriptions[335]=['Alchemical symbol for vinegar'];
glyphDescriptions[336]=['Alchemical symbol for vinegar 2'];
glyphDescriptions[337]=['Alchemical symbol for vinegar 3'];
glyphDescriptions[338]=['Alchemical symbol for sulfur 2'];
glyphDescriptions[339]=['Alchemical symbol for sulfur 3'];
glyphDescriptions[340]=['Alchemical symbol for philosopher\'s sulfur'];
glyphDescriptions[341]=['Alchemical symbol for black sulfur'];
glyphDescriptions[342]=['Alchemical symbol for mercury sublimate'];
glyphDescriptions[343]=['Alchemical symbol for mercury sublimate 2'];
glyphDescriptions[344]=['Alchemical symbol for salt 2'];
glyphDescriptions[345]=['Alchemical symbol for salt 3'];
glyphDescriptions[346]=['Alchemical symbol for nitre'];
glyphDescriptions[347]=['Alchemical symbol for nitre 2'];
glyphDescriptions[348]=['Alchemical symbol for nitre 3'];
glyphDescriptions[349]=['Alchemical symbol for cinnabar'];
glyphDescriptions[350]=['Alchemical symbol for cinnabar 2'];
glyphDescriptions[351]=['Alchemical symbol for cinnabar 3'];
glyphDescriptions[352]=['Alchemical symbol for gold'];
glyphDescriptions[353]=['Alchemical symbol for silver'];
glyphDescriptions[354]=['Alchemical symbol for crocus of copper'];
glyphDescriptions[355]=['Alchemical symbol for crocus of copper 2'];
glyphDescriptions[356]=['Alchemical symbol for crocus of copper 3'];
glyphDescriptions[357]=['Alchemical symbol for copper'];
glyphDescriptions[358]=['Alchemical symbol for crocus of iron'];
glyphDescriptions[359]=['Alchemical symbol for crocus of iron 2'];
glyphDescriptions[360]=['Alchemical symbol for iron'];
glyphDescriptions[361]=['Alchemical symbol for crocus of mars'];
glyphDescriptions[362]=['Alchemical symbol for crocus of mars 2'];
glyphDescriptions[363]=['Alchemical symbol for regulus'];
glyphDescriptions[364]=['Alchemical symbol for regulus 2'];
glyphDescriptions[365]=['Alchemical symbol for regulus 3'];
glyphDescriptions[366]=['Alchemical symbol for regulus 4'];
glyphDescriptions[367]=['Alchemical symbol for regulus of mars'];
glyphDescriptions[368]=['Alchemical symbol for regulus of mars 2'];
glyphDescriptions[369]=['Alchemical symbol for regulus of antimony'];
glyphDescriptions[370]=['Alchemical symbol for regulus of antimony 2'];
glyphDescriptions[371]=['Alchemical symbol for antimony'];
glyphDescriptions[372]=['Alchemical symbol for antimony 2'];
glyphDescriptions[373]=['Alchemical symbol for antimony 3'];
glyphDescriptions[374]=['Alchemical symbol for tin'];
glyphDescriptions[375]=['Alchemical symbol for lead'];
glyphDescriptions[376]=['Alchemical symbol for lead ore'];
glyphDescriptions[377]=['Alchemical symbol for lodestone'];
glyphDescriptions[378]=['Alchemical symbol for lodestone 2'];
glyphDescriptions[379]=['Alchemical symbol for stibnite'];
glyphDescriptions[380]=['Alchemical symbol for bismuth ore'];
glyphDescriptions[381]=['Alchemical symbol for auripigment'];
glyphDescriptions[382]=['Alchemical symbol for marcasite'];
glyphDescriptions[383]=['Alchemical symbol for marcasite 2'];
glyphDescriptions[384]=['Alchemical symbol for quick lime'];
glyphDescriptions[385]=['Alchemical symbol for borax'];
glyphDescriptions[386]=['Alchemical symbol for borax 2'];
glyphDescriptions[387]=['Alchemical symbol for borax 3'];
glyphDescriptions[388]=['Alchemical symbol for alum'];
glyphDescriptions[389]=['Alchemical symbol for oil'];
glyphDescriptions[390]=['Alchemical symbol for spirit'];
glyphDescriptions[391]=['Alchemical symbol for tincture'];
glyphDescriptions[392]=['Alchemical symbol for gum'];
glyphDescriptions[393]=['Alchemical symbol for wax'];
glyphDescriptions[394]=['Alchemical symbol for powder'];
glyphDescriptions[395]=['Alchemical symbol for calx'];
glyphDescriptions[396]=['Alchemical symbol for tutty'];
glyphDescriptions[397]=['Alchemical symbol for caput mortuum'];
glyphDescriptions[398]=['Alchemical symbol for scepter of jove'];
glyphDescriptions[399]=['Alchemical symbol for caduceus'];
glyphDescriptions[400]=['Alchemical symbol for trident'];
glyphDescriptions[401]=['Alchemical symbol for starred trident'];
glyphDescriptions[402]=['Alchemical symbol for lodestone 3'];
glyphDescriptions[403]=['Alchemical symbol for sal-ammoniac'];
glyphDescriptions[404]=['Alchemical symbol for sal-ammoniac 2'];
glyphDescriptions[405]=['Alchemical symbol for tartar'];
glyphDescriptions[406]=['Alchemical symbol for tartar 2'];
glyphDescriptions[407]=['Alchemical symbol for tartar 3'];
glyphDescriptions[408]=['Alchemical symbol for vitriol'];
glyphDescriptions[409]=['Alchemical symbol for vitriol 2'];
glyphDescriptions[410]=['Alchemical symbol for rock salt'];
glyphDescriptions[411]=['Alchemical symbol for rock salt 2'];
glyphDescriptions[412]=['Alchemical symbol for crocus of iron 3'];
glyphDescriptions[413]=['Alchemical symbol for horse dung'];
glyphDescriptions[414]=['Alchemical symbol for verdigris'];
glyphDescriptions[415]=['Alchemical symbol for vermillion'];
glyphDescriptions[416]=['Alchemical symbol for cinnabar 4'];
glyphDescriptions[417]=['Alchemical symbol for realgar'];
glyphDescriptions[418]=['Alchemical symbol for realgar 2'];
glyphDescriptions[419]=['Alchemical symbol for arsenic'];
glyphDescriptions[420]=['Alchemical symbol for sublimation'];
glyphDescriptions[421]=['Alchemical symbol for sublimation 2'];
glyphDescriptions[422]=['Alchemical symbol for caput mortuum 2'];
glyphDescriptions[423]=['Alchemical symbol for bismuth ore 2'];
glyphDescriptions[424]=['Alchemical symbol for salt of copper'];
glyphDescriptions[425]=['Alchemical symbol for nitre 4'];
glyphDescriptions[426]=['Alchemical symbol for soap'];
glyphDescriptions[427]=['Alchemical symbol for lye'];
glyphDescriptions[428]=['Alchemical symbol for ashes'];
glyphDescriptions[429]=['Alchemical symbol for pot ashes'];
glyphDescriptions[430]=['Alchemical symbol for brick'];
glyphDescriptions[431]=['Alchemical symbol for powdered brick'];
glyphDescriptions[432]=['Alchemical symbol for amalgam'];
glyphDescriptions[433]=['Alchemical symbol for stratum super stratum'];
glyphDescriptions[434]=['Alchemical symbol for precipitation'];
glyphDescriptions[435]=['Alchemical symbol for dissolution'];
glyphDescriptions[436]=['Alchemical symbol for purify'];
glyphDescriptions[437]=['Alchemical symbol for distill'];
glyphDescriptions[438]=['Lot of fortune'];
glyphDescriptions[439]=['Occultation'];
glyphDescriptions[440]=['Lunar eclipse'];
// glyphDescriptions[441]=['Vesta form two'];
// glyphDescriptions[442]=['Astraea form two'];
// glyphDescriptions[443]=['Hygiea form two'];
// glyphDescriptions[444]=['Parthenope form two'];
glyphDescriptions[441]=['Haumea'];
glyphDescriptions[442]=['Makemake'];
glyphDescriptions[443]=['Gonggong'];
glyphDescriptions[444]=['Quaoar'];
glyphDescriptions[445]=['Orcus'];



// Place of Worship 

//'xaa05;&#xaa4c' //cham om

//'xaa00;&#xaa2f;&#xaa31;&#xaa4c; //cham om 2
//'x1025;&#x0x102F;&#x1036; //Myanmar om
//x11103 + 0x1110E + 0x11100 //chakma om
//x11350; //Grantha Om 𑍐
//xA600;&#xA62F;&#xA631;&#xA98C; //Cham Om ꨀꨯꨱꩌ
//x1A52;&#x1A74; //Tai Lanna Om ᩒᩴ
//x11F10;&#x11F00; //Kawi Om 𑼐𑼀
//x1C23;&#x1C28;&#x1C35; //Lepcha Om ᰣᰨᰵ
//x1900;&#x1925;&#x1931; //Limbu Om ᤀᤥᤱ
//xAAF2; //Meitei Mayek Om ꫲ
//x1160C;&#x1163D; //Modi Om 𑘌𑘽
//x0B13;&#x200D;&#x0B01; //Odia Om ଓ‍ଁ
//xA85D;&#xA861;&#xA84F; //Phags-pa Om ꡝꡡꡏ
//x11449; //Pracalit Om 𑑉 Newa
//x11688;&#x116AB; //Takri Om 𑚈𑚫
//x1158C;&#x115BC; //Siddham Om 𑖌𑖼
//x111C4; //Sharada Om 𑇄
//x114C7; //Tirhuta Om 𑓇
//x11A00;&#x11A06;&#x11A35; //Zanabazar Square Om 𑨀𑨆𑨵
//x17A2;&#x17C6; //Khmer Om ឱំ
//x17DA; //Khmer Sign Avakrahasanya ៚
//x1B87;&#x1B80; //Sundanese Om ᮇᮀ
//xE42;&#xE2D;&#xE4D; //Thai Om โอํ
//xE5B; //Thai Character Khomut ๛
//x5535; //Chinese/Japanese Om 唵
//xC634; //Korean Om 옴
//x963F;&#x5443; //Japanese A-Un 阿吽
//x30AA;&#x30FC;&#x30E0; //Japanese Om オーム
//x1880;&#x1823; //Manchu Om ᢀᠣ (mongolian)
//x1880;&#x1823;&#x1838;&#x1820; //Mongolian Om ᢀᠣᠸᠠ
//x787;&#x7AE;&#x789; //Thaana Om އޮމް
//x118FF; //Warang Citi Om 𑣿
//&#xA98E;&#xA9B4;&#xA980; //Javanese Om ꦎꦴꦀ


var whirldArraySignal = [];