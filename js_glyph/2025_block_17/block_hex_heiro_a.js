// Egyptian Hieroglyphs Extended-A (Unicode 16)
// Total: 3,956 glyphs across 16 PDF pages
// Unicode range: U+13460 - U+143D3

// Helper function to generate hex range
function hexRange(start, end) {
    const result = [];
    const startNum = parseInt(start, 16);
    const endNum = parseInt(end, 16);
    for (let i = startNum; i <= endNum; i++) {
        result.push(i.toString(16).toUpperCase());
    }
    return result;
}

// Unicode codepoints for each PDF page (256 glyphs per page, except last page)
const hieroglyphPages = [
    // Page 1: U+13460-U+1355F (256 glyphs)
    hexRange('13460', '1355F'),
    
    // Page 2: U+13560-U+1365F (256 glyphs)
    hexRange('13560', '1365F'),
    
    // Page 3: U+13660-U+1375F (256 glyphs)
    hexRange('13660', '1375F'),
    
    // Page 4: U+13760-U+1385F (256 glyphs)
    hexRange('13760', '1385F'),
    
    // Page 5: U+13860-U+1395F (256 glyphs)
    hexRange('13860', '1395F'),
    
    // Page 6: U+13960-U+13A5F (256 glyphs)
    hexRange('13960', '13A5F'),
    
    // Page 7: U+13A60-U+13B5F (256 glyphs)
    hexRange('13A60', '13B5F'),
    
    // Page 8: U+13B60-U+13C5F (256 glyphs)
    hexRange('13B60', '13C5F'),
    
    // Page 9: U+13C60-U+13D5F (256 glyphs)
    hexRange('13C60', '13D5F'),
    
    // Page 10: U+13D60-U+13E5F (256 glyphs)
    hexRange('13D60', '13E5F'),
    
    // Page 11: U+13E60-U+13F5F (256 glyphs)
    hexRange('13E60', '13F5F'),
    
    // Page 12: U+13F60-U+13FFF then U+14000-U+1405F (160 + 96 = 256 glyphs)
    hexRange('13F60', '13FFF').concat(hexRange('14000', '1405F')),
    
    // Page 13: U+14060-U+1415F (256 glyphs)
    hexRange('14060', '1415F'),
    
    // Page 14: U+14160-U+1425F (256 glyphs)
    hexRange('14160', '1425F'),
    
    // Page 15: U+14260-U+1435F (256 glyphs)
    hexRange('14260', '1435F'),
    
    // Page 16: U+14360-U+143D3 (116 glyphs, rest are empty)
    hexRange('14360', '143D3')
];

// PUA start points for each page in Aegyptus font
// First page starts at F3000 (confirmed by user)
// Remaining start points TBD - will be filled in as user tests each page
const puaStartPoints = [
    'F3000',  // Page 1 start (CONFIRMED)
    'F3100',  // Page 2 start (ESTIMATED - adjust based on testing)
    'F3200',  // Page 3 start (ESTIMATED)
    'F3300',  // Page 4 start (ESTIMATED)
    'F3400',  // Page 5 start (ESTIMATED)
    'F3500',  // Page 6 start (ESTIMATED)
    'F3600',  // Page 7 start (ESTIMATED)
    'F3700',  // Page 8 start (ESTIMATED)
    'F3800',  // Page 9 start (ESTIMATED)
    'F3900',  // Page 10 start (ESTIMATED)
    'F3A00',  // Page 11 start (ESTIMATED)
    'F3B00',  // Page 12 start (ESTIMATED)
    'F3C00',  // Page 13 start (ESTIMATED)
    'F3D00',  // Page 14 start (ESTIMATED)
    'F3E00',  // Page 15 start (ESTIMATED)
    'F3F00'   // Page 16 start (ESTIMATED)
];

// Page info for display
const pageInfo = [
    'Page 1: U+13460-U+1355F (256 glyphs)',
    'Page 2: U+13560-U+1365F (256 glyphs)',
    'Page 3: U+13660-U+1375F (256 glyphs)',
    'Page 4: U+13760-U+1385F (256 glyphs)',
    'Page 5: U+13860-U+1395F (256 glyphs)',
    'Page 6: U+13960-U+13A5F (256 glyphs)',
    'Page 7: U+13A60-U+13B5F (256 glyphs)',
    'Page 8: U+13B60-U+13C5F (256 glyphs)',
    'Page 9: U+13C60-U+13D5F (256 glyphs)',
    'Page 10: U+13D60-U+13E5F (256 glyphs)',
    'Page 11: U+13E60-U+13F5F (256 glyphs)',
    'Page 12: U+13F60-U+1405F (256 glyphs, crosses page boundary)',
    'Page 13: U+14060-U+1415F (256 glyphs)',
    'Page 14: U+14160-U+1425F (256 glyphs)',
    'Page 15: U+14260-U+1435F (256 glyphs)',
    'Page 16: U+14360-U+143D3 (116 glyphs + empties)'
];