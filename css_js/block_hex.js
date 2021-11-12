blocks = [//'Alphabetic_Presentation_Forms',
'Arabic','Arabic_Mathematical_Alphabetic_Symbols','Arrows','Basic_Latin','General_Punctuation'
,'Geometric_Shapes','Greek_And_Coptic','Halfwidth_And_Fullwidth_Forms','Latin_1_Supplement'
,'Letterlike_Symbols','Mathematical_Alphanumeric_Symbols','Mathematical_Operators'
,'Miscellaneous_Mathematical_Symbols_A','Miscellaneous_Mathematical_Symbols_B'
,'Miscellaneous_Symbols','Miscellaneous_Symbols_And_Arrows','Miscellaneous_Technical'
,'Small_Form_Variants','Superscripts_And_Subscripts'
,'Supplemental_Arrows_A'
,'Supplemental_Arrows_B','Supplemental_Mathematical_Operators'];



//  blocks.push ('Arrows','Arrows','Arrows','Arrows','Arrows','Arrows',
//  	'Mathematical_Operators','Mathematical_Operators','Mathematical_Operators',
//  	'Mathematical_Operators','Mathematical_Operators','Mathematical_Operators',
//  	'Mathematical_Operators','Mathematical_Operators','Mathematical_Operators',
//  	'Supplemental_Mathematical_Operators','Supplemental_Mathematical_Operators','Supplemental_Mathematical_Operators',
// 	'Supplemental_Arrows_B','Supplemental_Arrows_B','Supplemental_Arrows_B','Supplemental_Arrows_B','Supplemental_Arrows_B'
//  	)

// blocks = ['Arrows','Supplemental_Arrows_B','Supplemental_Arrows_A']

block_hex = {
//'Alphabetic_Presentation_Forms' : ['FB29'], // moved to arrows
'Arabic' : ['0606','0607','0608'], //arabic
'Arabic_Mathematical_Alphabetic_Symbols' : ['1EEF0','1EEF1'], //math
'Arrows' : ['2190','2191','2192','2193','2194','219A','219B','21A0','21A3','21A6','21AE'
,'21CE','21CF','21D2','21D4','21F4','21F5','21F6','21F7','21F8','21F9','21FA','21FB','21FC'
,'21FD','21FE','21FF','FB29'], //symbols
'Basic_Latin' : ['002B','003C','003D','003E','007C','007E'], //basic_latin
'General_Punctuation' : ['2044','2052'], //symbols
'Geometric_Shapes' : ['25B7','25C1','25F8','25F9','25FA','25FB','25FC','25FD','25FE','25FF'], //symbols
'Greek_And_Coptic' : ['03F6'], //noto trio
'Halfwidth_And_Fullwidth_Forms' : ['FF0B','FF1C','FF1D','FF1E','FF5C','FF5E','FFE2','FFE9','FFEA','FFEB','FFEC'], //chinese-cjk
'Latin_1_Supplement' : ['00AC','00B1','00D7','00F7'], //basic_latin
'Letterlike_Symbols' : ['2118','2140','2141','2142','2143','2144','214B'], //latin3
'Mathematical_Alphanumeric_Symbols' : ['1D6C1','1D6DB','1D6FB','1D715','1D735','1D74F'
,'1D76F','1D789','1D7A9','1D7C3'], //math
'Mathematical_Operators' : ['2200','2201','2202','2203','2204','2205','2206','2207','2208','2209','220A'
,'220B','220C','220D','220E','220F','2210','2211','2212','2213','2214','2215','2216','2217'
,'2218','2219','221A','221B','221C','221D','221E','221F','2220','2221','2222','2223','2224'
,'2225','2226','2227','2228','2229','222A','222B','222C','222D','222E','222F','2230','2231'
,'2232','2233','2234','2235','2236','2237','2238','2239','223A','223B','223C','223D','223E'
,'223F','2240','2241','2242','2243','2244','2245','2246','2247','2248','2249','224A','224B'
,'224C','224D','224E','224F','2250','2251','2252','2253','2254','2255','2256','2257','2258'
,'2259','225A','225B','225C','225D','225E','225F','2260','2261','2262','2263','2264','2265'
,'2266','2267','2268','2269','226A','226B','226C','226D','226E','226F','2270','2271','2272'
,'2273','2274','2275','2276','2277','2278','2279','227A','227B','227C','227D','227E','227F'
,'2280','2281','2282','2283','2284','2285','2286','2287','2288','2289','228A','228B','228C'
,'228D','228E','228F','2290','2291','2292','2293','2294','2295','2296','2297','2298','2299'
,'229A','229B','229C','229D','229E','229F','22A0','22A1','22A2','22A3','22A4','22A5','22A6'
,'22A7','22A8','22A9','22AA','22AB','22AC','22AD','22AE','22AF','22B0','22B1','22B2','22B3'
,'22B4','22B5','22B6','22B7','22B8','22B9','22BA','22BB','22BC','22BD','22BE','22BF','22C0'
,'22C1','22C2','22C3','22C4','22C5','22C6','22C7','22C8','22C9','22CA','22CB','22CC','22CD'
,'22CE','22CF','22D0','22D1','22D2','22D3','22D4','22D5','22D6','22D7','22D8','22D9','22DA'
,'22DB','22DC','22DD','22DE','22DF','22E0','22E1','22E2','22E3','22E4','22E5','22E6','22E7'
,'22E8','22E9','22EA','22EB','22EC','22ED','22EE','22EF','22F0','22F1','22F2','22F3','22F4'
,'22F5','22F6','22F7','22F8','22F9','22FA','22FB','22FC','22FD','22FE','22FF'], //math
'Miscellaneous_Mathematical_Symbols_A' : ['27C0','27C1','27C2','27C3','27C4','27C7','27C8','27C9','27CA','27CB'
,'27CC','27CD','27CE','27CF','27D0','27D1','27D2','27D3','27D4','27D5','27D6','27D7','27D8','27D9','27DA','27DB'
,'27DC','27DD','27DE','27DF','27E0','27E1','27E2','27E3','27E4','27E5'], //math
'Miscellaneous_Mathematical_Symbols_B' : ['2980','2981','2982','2999','299A','299B','299C','299D','299E','299F'
,'29A0','29A1','29A2','29A3','29A4','29A5','29A6','29A7','29A8','29A9','29AA','29AB','29AC','29AD','29AE','29AF'
,'29B0','29B1','29B2','29B3','29B4','29B5','29B6','29B7','29B8','29B9','29BA','29BB','29BC','29BD','29BE','29BF'
,'29C0','29C1','29C2','29C3','29C4','29C5','29C6','29C7','29C8','29C9','29CA','29CB','29CC','29CD','29CE','29CF'
,'29D0','29D1','29D2','29D3','29D4','29D5','29D6','29D7','29DC','29DD','29DE','29DF','29E0','29E1','29E2','29E3'
,'29E4','29E5','29E6','29E7','29E8','29E9','29EA','29EB','29EC','29ED','29EE','29EF','29F0','29F1','29F2','29F3'
,'29F4','29F5','29F6','29F7','29F8','29F9','29FA','29FB','29FE','29FF'], //math
'Miscellaneous_Symbols' : ['266F'], //symbols
'Miscellaneous_Symbols_And_Arrows' : ['2B30','2B31','2B32','2B33','2B34','2B35','2B36','2B37','2B38','2B39'
,'2B3A','2B3B','2B3C','2B3D','2B3E','2B3F','2B40','2B41','2B42','2B43','2B44','2B47','2B48','2B49','2B4A'
,'2B4B','2B4C','27F0','27F1','27F2','27F3','27F4','27F5','27F6','27F7','27F8','27F9','27FA','27FB'
,'27FC','27FD','27FE','27FF'], //symbols
'Miscellaneous_Technical' : ['2320','2321','237C','239B','239C','239D','239E','239F','23A0','23A1','23A2'
,'23A3','23A4','23A5','23A6','23A7','23A8','23A9','23AA','23AB','23AC','23AD','23AE','23AF','23B0','23B1'
,'23B2','23B3','23DC','23DD','23DE','23DF','23E0','23E1'], //symbols
'Small_Form_Variants' : ['FE62','FE64','FE65','FE66'], //basic_latin
'Superscripts_And_Subscripts' : ['207A','207B','207C','208A','208B','208C'], //display
'Supplemental_Arrows_A' : ['27F0','27F1','27F2','27F3','27F4','27F5','27F6','27F7','27F8','27F9','27FA','27FB'
,'27FC','27FD','27FE','27FF'], //symbols moved to misc symbols
'Supplemental_Arrows_B' : ['2900','2901','2902','2903','2904','2905','2906','2907','2908','2909','290A','290B'
,'290C','290D','290E','290F','2910','2911','2912','2913','2914','2915','2916','2917','2918','2919','291A'
,'291B','291C','291D','291E','291F','2920','2921','2922','2923','2924','2925','2926','2927','2928','2929'
,'292A','292B','292C','292D','292E','292F','2930','2931','2932','2933','2934','2935','2936','2937','2938'
,'2939','293A','293B','293C','293D','293E','293F','2940','2941','2942','2943','2944','2945','2946','2947'
,'2948','2949','294A','294B','294C','294D','294E','294F','2950','2951','2952','2953','2954','2955','2956'
,'2957','2958','2959','295A','295B','295C','295D','295E','295F','2960','2961','2962','2963','2964','2965'
,'2966','2967','2968','2969','296A','296B','296C','296D','296E','296F','2970','2971','2972','2973','2974'
,'2975','2976','2977','2978','2979','297A','297B','297C','297D','297E','297F'], //symbols
'Supplemental_Mathematical_Operators' : ['2A00','2A01','2A02','2A03','2A04','2A05','2A06','2A07','2A08'
,'2A09','2A0A','2A0B','2A0C','2A0D','2A0E','2A0F','2A10','2A11','2A12','2A13','2A14','2A15','2A16','2A17'
,'2A18','2A19','2A1A','2A1B','2A1C','2A1D','2A1E','2A1F','2A20','2A21','2A22','2A23','2A24','2A25','2A26'
,'2A27','2A28','2A29','2A2A','2A2B','2A2C','2A2D','2A2E','2A2F','2A30','2A31','2A32','2A33','2A34','2A35'
,'2A36','2A37','2A38','2A39','2A3A','2A3B','2A3C','2A3D','2A3E','2A3F','2A40','2A41','2A42','2A43','2A44'
,'2A45','2A46','2A47','2A48','2A49','2A4A','2A4B','2A4C','2A4D','2A4E','2A4F','2A50','2A51','2A52','2A53'
,'2A54','2A55','2A56','2A57','2A58','2A59','2A5A','2A5B','2A5C','2A5D','2A5E','2A5F','2A60','2A61','2A62'
,'2A63','2A64','2A65','2A66','2A67','2A68','2A69','2A6A','2A6B','2A6C','2A6D','2A6E','2A6F','2A70','2A71'
,'2A72','2A73','2A74','2A75','2A76','2A77','2A78','2A79','2A7A','2A7B','2A7C','2A7D','2A7E','2A7F','2A80'
,'2A81','2A82','2A83','2A84','2A85','2A86','2A87','2A88','2A89','2A8A','2A8B','2A8C','2A8D','2A8E','2A8F'
,'2A90','2A91','2A92','2A93','2A94','2A95','2A96','2A97','2A98','2A99','2A9A','2A9B','2A9C','2A9D','2A9E'
,'2A9F','2AA0','2AA1','2AA2','2AA3','2AA4','2AA5','2AA6','2AA7','2AA8','2AA9','2AAA','2AAB','2AAC','2AAD'
,'2AAE','2AAF','2AB0','2AB1','2AB2','2AB3','2AB4','2AB5','2AB6','2AB7','2AB8','2AB9','2ABA','2ABB','2ABC'
,'2ABD','2ABE','2ABF','2AC0','2AC1','2AC2','2AC3','2AC4','2AC5','2AC6','2AC7','2AC8','2AC9','2ACA','2ACB'
,'2ACC','2ACD','2ACE','2ACF','2AD0','2AD1','2AD2','2AD3','2AD4','2AD5','2AD6','2AD7','2AD8','2AD9','2ADA'
,'2ADB','2ADC','2ADD','2ADE','2ADF','2AE0','2AE1','2AE2','2AE3','2AE4','2AE5','2AE6','2AE7','2AE8','2AE9'
,'2AEA','2AEB','2AEC','2AED','2AEE','2AEF','2AF0','2AF1','2AF2','2AF3','2AF4','2AF5','2AF6','2AF7','2AF8'
,'2AF9','2AFA','2AFB','2AFC','2AFD','2AFF'],

// 'Maya' : MayaArray,
// 'CretanHiero' : CretanHieroArray,
// 'CyproMinoan' : CyproMinoanArray
}

blocks_before_we_add_to_it= blocks.length

for (var i = 0; i < blocks_before_we_add_to_it; i++) { 

		//console.log(blocks[i]); 
		//console.log( block_hex[blocks[i]].length)

		for (var u = 0; u < block_hex[blocks[i]].length-1; u++) {
			blocks.push (blocks[i])
			console.log(u)
		}

	}



// block_hex = {
  // 'Basic_Latin' : ['003F'],
  // //,'0021'],

// }
