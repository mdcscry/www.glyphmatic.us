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
'Chiron GoRound TC','Nanum Pen Script','Lucida Sans Unicode'
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
myFontSet[27]=['x0950','Akshar Unicode','Annapurna SIL','Aparajita','Arial Unicode MS','Code2000','Kokila','Mangal','Siddhanta','Utsaah']; // Devanagari Om

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
myFontSet[50]=['x262C','Arial Unicode Ms','Arial Unicode MS','Code2000','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Adi Shakti (Khanda)
myFontSet[51]=['x262B','Arial Unicode Ms','Arial Unicode MS','Code2000','Meiryo','MS Mincho','Noto Sans Symbols','Quivira','Segoe UI Symbol','Symbola']; // Farsi symbol
myFontSet[52]=['x0F15','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan astrological sign 1
myFontSet[53]=['x0F16','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan astrological sign 2
myFontSet[54]=['x0F17','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan astrological sign 3
myFontSet[55]=['x0FC4','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan symbol variant 1
myFontSet[56]=['x0FC5','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan symbol variant 2
myFontSet[57]=['x0FC7','Tibetan Machine Uni','Monloam_Uni','DDC_Uchen','Kailasa','Qomolangma-Woodblock','Qomolangma-Art','Qomolangma-Edict','BabelStoneTibetan']; // Tibetan symbol variant 3
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
myFontSet[226]=['x1F300','Noto Emoji','Quivira','Symbola']; // Spiral (cham)
myFontSet[227]=['x1F300','Noto Emoji','Quivira','Symbola','Segoe UI Symbol']; // Cyclone 
myFontSet[228]=['x267E','Code2000','DejaVu Sans','DejaVu Sans Condensed','Everson Mono','Quivira','Symbola']; // Permanent Paper Sign for spinners

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
var whirldArraySignal = [];