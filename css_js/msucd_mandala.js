// Geometric Shapes Block (U+25A0 - U+25FF)
var geometricShapes = {
    fontFamily: 'Noto Sans',
    glyphs: [
        0x25A4, 0x25C9, 0x25CB, 0x25CC, 0x25CD, 0x25CE, 0x25CF, 0x25D0, 0x25D1, 0x25D2, 0x25D3,
        0x25E0, 0x25E1, 0x25E6, 0x25EF, 0x2609,
        0x25C9, 0x25CD, 0x25CE, 0x25EF, 0x25EF, 0x25EF, 0x25EF, 0x25EF, 0x25E6, 0x25E6, 0x25E6, 0x2600
    ]
};

// Miscellaneous Symbols (U+2600 - U+26FF)
var miscSymbols = {
    fontFamily: 'Noto Sans Symbols',
    glyphs: [
        0x2609, 0x2606, 0x2605, 
        0x2610, 0x2616, 0x2617, 
        0x2723, 0x2722, 0x2724, 0x2725, 0x2726, 0x2727, 0x2729, 0x272A, 0x272B, 0x272C, 0x272D, 0x274D, 0x274B, 0x274A, 0x2749,
        0x2609,
        0x260A, 0x260B
    ]
};

// Latin Extended (various blocks)
var latinExtended = {
    fontFamily: 'Noto Sans',
    glyphs: [
        0x0277, 0x0278, 0x0275, 0x0231, 0x0298, 0x02DA, 0x02D8, 0x02F8, 0x02F3, 0x0398, 0x03A6, 0x03A9, 0x03A8, 0x03B8, 0x03BF, 0x0397, 0x03D8, 0x03D5
    ]
};

// Cyrillic Block (U+0400 - U+04FF)
var cyrillic = {
    fontFamily: 'Noto Sans',
    glyphs: [
        0x03F4, 0x041E, 0x043E, 0x0436, 0x0416, 0x0460, 0x046A, 0x0472, 0x0473, 0x047A, 0x047B, 0x047E, 0x04E6, 0x04E8, 0x04E9, 0x04EA, 0x04FF
    ]
};

// Arabic Block (U+0600 - U+06FF)
var arabic = {
    fontFamily: 'Noto Sans Arabic',
    glyphs: [
        0x061E, 0x066D, 0x065C,
        0x0660, 0x0665, 0x06BA, 0x06D5, 0x06DD
    ]
};

// NKo and other African scripts
var nkoOthers = {
    fontFamily: '[Noto Sans NKo / Noto Sans Adlam]', // Multiple scripts, need to verify
    glyphs: [
        0x1D11, 0x1D12, 0x1D15, 0x1D0F, 0x1D25, 0x1D1C, 0x1D3C, 0x1D3D, 0x1D5C,
        0x1D5C, 0x1D60, 0x1D69, 0x1D7F, 0x1DBF, 0x1DB2, 0x1DC2
    ]
};

// General Punctuation & Symbols
var punctuationSymbols = {
    fontFamily: 'Noto Sans',
    glyphs: [
        0x2022, 0x2092, 0x20AA, 0x221E, 0x25CF, 0x25E6, 0x25AB, 0x263C, 0x2C77
    ]
};

// Devanagari Block (U+0900 - U+097F)
var devanagari = {
    fontFamily: 'Noto Sans Devanagari',
    glyphs: [
        0x0970, 0x0A20, 0x0B20, 0x0B66
    ]
};

// Myanmar Block (U+1000 - U+109F)
var myanmar = {
    fontFamily: 'Noto Sans Myanmar',
    glyphs: [
         0x1040
    ]
};

// Georgian Block (U+10A0 - U+10FF)
var georgian = {
    fontFamily: 'Noto Sans Georgian',
    glyphs: [
        0x10AB
    ]
};

// Ethiopic Block (U+1200 - U+137F)
var ethiopic = {
    fontFamily: 'Noto Sans Ethiopic',
    glyphs: [
        0x0D15, 
        0x0D20, 0x0D31, 0x0D60, 0x0E6F
    ]
};

// Khmer Block (U+1780 - U+17FF)
var khmer = {
    fontFamily: 'Noto Sans Khmer',
    glyphs: [
        0x10A3, 0x10A9
    ]
};

// Telugu & Kannada Blocks
var teluguKannada = {
    fontFamily: 'Noto Sans Telugu, Noto Sans Kannada', // Mixed scripts
    glyphs: [
        0x10F2, 0x11BC, 0x11C2, 0x11F9, 0x1210,  0x224E, 
        0x2256, 0x226C, 0x228D, 0x2295, 0x2296, 0x2297, 0x2299, 0x229A, 0x229B, 0x229C, 0x229D, 0x22C7, 0x22D2, 0x22D3, 0x2318, 0x233E, 0x235F, 0x235C, 0x235B, 0x2355, 0x24EA
    ]
};

// Additional Symbols
var additionalSymbols = {
    fontFamily: 'Noto Sans JP', // CJK characters
    glyphs: [
        0x263F, 0x2638, 0x3036, 0x3147, 0x314E, 0x318D, 0x3194, 0x319D, 0x3207, 0x320D, 0x518B, 0xBD69, 0xC6C5, 0xC73C
    ]
};

// Concatenate all glyph arrays
var myArray = [].concat(
    geometricShapes.glyphs,
    miscSymbols.glyphs,
    latinExtended.glyphs,
    cyrillic.glyphs,
    arabic.glyphs,
    nkoOthers.glyphs,
    punctuationSymbols.glyphs,
    devanagari.glyphs,
    myanmar.glyphs,
    georgian.glyphs,
    ethiopic.glyphs,
    khmer.glyphs,
    teluguKannada.glyphs,
    additionalSymbols.glyphs
);