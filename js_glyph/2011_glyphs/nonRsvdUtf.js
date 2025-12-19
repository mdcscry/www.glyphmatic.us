// Set to null for random glyphs, or set to a specific hex codepoint to force a single glyph
var forceGlyph = null //['1F480','1F571','2620']
   // ,'2620','1F571']; //['2600']// Example: '262F' for yin-yang ☯, '2615' for coffee ☕


// Set to null for random blocks, or set to a number (0-24) to force a specific block
var forceBlock =null;  // Change to 0, 1, 2, etc. to test specific blocks

// 0 = LGC Extended
// 1 = Tamil
// 2 = Myanmar
// 3 = Tai Le
// 4 = Cherokee
// 5 = Arabic
// 6 = Korean Hangul
// 7 = Thai
// 8 = Ethiopic
// 9 = Armenian
// 10 = Georgian
// 11 = Khmer
// 12 = Telugu
// 13 = Kannada
// 14 = Osmanya
// 15 = Malayalam
// 16 = Lao
// 17 = Yi
// 18 = Avestan
// 19 = Vai
// 20 = Urdu
// 21 = CJK-kangxi
// 22 = Symbols
// 23 = Symbols2
// 24 = Emoji
// 25 = Emoji-Special
// 26 = Cyrillic
// 27 = CJK-strokes
// 28 = CJK-radicals



// Script-specific combining characters ONLY
var combiningByScript = {
    devanagari: ['093C', '093E', '093F', '0940', '0941', '0942', '0943', '0944', '0945', '0946', '0947', '0948', '0949', '094A', '094B', '094C', '094D', '0951', '0952', '0953', '0954', '0962', '0963'],
    bengali: ['09BC', '09BE', '09BF', '09C0', '09C1', '09C2', '09C3', '09C4', '09C7', '09C8', '09CB', '09CC', '09CD', '09D7', '09E2', '09E3'],
    tamil: ['0BBE', '0BBF', '0BC0', '0BC1', '0BC2', '0BC6', '0BC8', '0BCA', '0BCB', '0BCC', '0BCD', '0BD7'],
    telugu: ['0C3F', '0C40', '0C41', '0C42', '0C43', '0C44', '0C46', '0C47', '0C48', '0C4A', '0C4B', '0C4D', '0C55', '0C56'],
    kannada: ['0CBE', '0CBF', '0CC0', '0CC1', '0CC2', '0CC3', '0CC4', '0CC6', '0CC7', '0CC8', '0CCA', '0CCB', '0CCC', '0CCD', '0CD5', '0CD6', '0CE2', '0CE3'],
    malayalam: ['0D3E', '0D3F', '0D40', '0D41', '0D42', '0D43', '0D44', '0D46', '0D47', '0D48', '0D4A', '0D4B', '0D4C', '0D4D', '0D57'],
    thai: ['0E31', '0E34', '0E35', '0E36', '0E37', '0E38', '0E39', '0E3A', '0E47', '0E48', '0E49', '0E4A', '0E4B', '0E4C', '0E4D', '0E4E'],
    lao: ['0EB1', '0EB4', '0EB5', '0EB6', '0EB7', '0EB8', '0EB9', '0EBB', '0EBC', '0EC8', '0EC9', '0ECA', '0ECB', '0ECC', '0ECD'],
    khmer: ['17B6', '17B7', '17B8', '17B9', '17BA', '17BB', '17BC', '17BD', '17BE', '17BF', '17C0', '17C1', '17C2', '17C3', '17C4', '17C5', '17C6', '17C7', '17C8', '17C9', '17CA', '17CB', '17CC', '17CD', '17CE', '17CF', '17D0', '17D1', '17D2', '17D3', '17DD'],
    myanmar: ['102B', '102C', '102D', '102F', '1030', '1031', '1032', '1036', '1037', '1038', '1039', '103A', '103B', '103C', '103D', '103E', '1056', '1057', '1058', '1059', '105E', '105F', '1060', '1062', '1063', '1064', '1067', '1068', '1069', '106A', '106B', '106C', '106D', '1071', '1072', '1073', '1074', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089', '108A', '108B', '108C', '108D', '108F', '109A', '109B', '109C', '109D'],
    arabic: ['064B', '064C', '064D', '064E', '064F', '0650', '0651', '0652', '0653', '0654', '0655'],
    latin: ['0300', '0301', '0302', '0303', '0304', '0306', '0307', '0308', '0309', '030A', '030B', '030C', '0323', '0327', '0328']
};

var glyphBlocks = [
    {
        name: "LGC Extended",
        fonts: ['Noto Sans Full', 'Noto Serif Full', 'Noto Sans Mono Full','BabelStone Roman'],
        // Only base characters - removed all combining marks
        glyphs: ['0020','0021','0022','0041','0042','0043','0044','0045','0046','0047','0048','0049','004A','004B','004C','004D','004E','004F','0050','0051','0052','0053','0054','0055','0056','0057','0058','0059','005A','0061','0062','0063','0064','0065','0066','0067','0068','0069','006A','006B','006C','006D','006E','006F','0070','0071','0072','0073','0074','0075','0076','0077','0078','0079','007A'],
        combining: 'latin'
    },
    
    {
        name: "Tamil",
        fonts: ['Noto Sans Tamil', 'Vijaya', 'Noto Serif Tamil'],
        // Removed combining marks: 0BBE-0BCC, 0BCD, 0BD7
        glyphs: ['0B85','0B86','0B87','0B88','0B89','0B8A','0B8E','0B8F','0B90','0B92','0B93','0B94','0B95','0B99','0B9A','0B9C','0B9E','0B9F','0BA3','0BA4','0BA8','0BA9','0BAA','0BAE','0BAF','0BB0','0BB1','0BB2','0BB3','0BB4','0BB5','0BB6','0BB7','0BB8','0BB9','0BD0','0BE6','0BE7','0BE8','0BE9','0BEA','0BEB','0BEC','0BED','0BEE','0BEF'],
        combining: 'tamil'
    },
    
    {
        name: "Myanmar",
        fonts: ['Noto Sans Myanmar', 'Noto Serif Myanmar', 'Padauk'],
        // Removed all combining marks (102B-109D range)
        glyphs: ['1000','1001','1002','1003','1004','1005','1006','1007','1008','1009','100A','100B'
          ,'100C','100D','100E','100F','1010','1011','1012','1013','1014','1015','1016','1017','1018'
          ,'1019','101A','101B','101C','101D','101E','101F','1020','1021','1022','1023','1024','1025'
          ,'1026','1027','1028','1029','102A','1040','1041','1042','1043','1044','1045','1046','1047'
          ,'1048','1049','104A','104B','104E','1050','1051','1052','1053','1054','1055'],
        combining: 'myanmar'
    },
    
    {
        name: "Tai Le",
        fonts: ['Noto Sans Tai Le'],
        glyphs: ['1950','1951','1952','1953','1954','1955','1956','1957','1958','1959','195A','195B','195C','195D','195E','195F','1960','1961','1962','1963','1964','1965','1966','1967','1968','1969','196A','196B','196C','196D','1970','1971','1972','1973','1974'],
        combining: null
    },
    
    {
        name: "Cherokee",
        fonts: ['Explora', 'Noto Sans Cherokee'],
        glyphs: ['13A0','13A1','13A2','13A3','13A4','13A5','13A6','13A7','13A8','13A9','13AA','13AB','13AC','13AD','13AE','13AF','13B0','13B1','13B2','13B3','13B4','13B5','13B6','13B7','13B8','13B9','13BA','13BB','13BC','13BD','13BE','13BF','13C0','13C1','13C2','13C3','13C4','13C5','13C6','13C7','13C8','13C9','13CA','13CB','13CC','13CD','13CE','13CF','13D0','13D1','13D2','13D3','13D4'],
        combining: null
    },
    
    {
        name: "Arabic",
        fonts: ['Noto Sans Arabic','Amiri', 'Paktype Tehreer','Noto Kufi Arabic','Noto Naskh Arabic'],
        // Removed combining marks (064B-0670 range)
        glyphs: ['0600','0601','0602','0603','0604','0605','0606','0607','0608','0609','060A','060B',
          '060C','060D','060E','060F','0610','0611','0612','0613','0614','0615','061B','061E','061F',
          '0620','0621','0622','0623','0624','0625','0626','0627','0628','0629','062A','062B','062C',
          '062D','062E','062F','0630','0631','0632','0633','0634','0635','0636','0637','0638','0639',
          '063A','0640','0641','0642','0643','0644','0645','0646','0647','0648','0649','064A','0660',
          '0661','0662'
          ,'0663','0664','0666','0667','0668','0669','066A','066B','066C','066D','066E','066F','0671'
          ,'0672','0673','0674','0675','0676','0677','0678','0679','067A','067B','067C','067D','067E'
          ,'067F','0680','0681','0682','0683','0684','0685','0686','0687','0688','0689','068A','068B'
          ,'068C','068D','068E','068F','0690','0691','0692','0693','0694','0695','0696','0697','0698'
          ,'0699','069A','069B','069C','069D','069E','06A0','06A1','06A2','06A3','06A4','06A5'
          ,'06A6','06A7','06A8','06A9','06AA','06AB','06AC','06AD','06AE','06AF','06B0','06B1','06B2'
          ,'06B3','06B4','06B5','06B6','06B7'
          //,'06B8','0674,'069F'
          ,'06B9','06BA','06BB','06BC','06BD','06BE','06BF','06C0','06C1','06C2','06C3','06C4','06C5'
          ,'06C6','06C7','06C8','06C9','06CA','06CB','06CC','06CD','06CE','06CF','06D0','06D1','06D2'
          ,'06D3','06D5','06EE','06EF','06F0','06F1','06F2','06F3','06F4','06F5','06F6','06F7','06F8'
          ,'06F9','06FA','06FB','06FC','06FD','06FE','06FF'],
        combining: 'arabic'
    },
    
    {
        name: "Korean Hangul",
        fonts: ['Noto Sans KR', 'Black Han Sans', 'Nanum Brush Script', 'Nanum Pen Script'],
        glyphs: ['3131','3132','3133','3134','3135','3136','3137','3138','3139','313A','313B','313C','313D','313E','313F','3140','3141','3142','3143','3144','3145','3146','3147','3148','3149','314A','314B','314C','314D','314E','314F','3150','3151','3152','3153','3154','3155','3156','3157','3158','3159','315A','315B','315C','315D','315E','315F','3160','3161','3162','3163','AC00','AC01','AC04','AC10','AC11','AC12','AC13','AC14','AC15','AC16','AC17','AC19','AC1A','AC1B','AC1C','AC1D','AC20','AC24','AC2C','AC2D','AC2F','AC30','AC31','AD00','AD04','AD0C','AD0D','AD0F','AD11','AE00','AE01','AE08','AE09','AE0B','AE0D','AE30','AE34','AE38','AE40','AE41','AE43','AE45','AF2C','AF2D','AF34','AF3C','AF3D','AF3F','AF41','B000','B001','B004','B00C','B010','B014','B01C','B01D','B028','B044','B045','B048','B04A','B04C','B04E','B053','B057','B059','B05D','B07C','B07D','B080','B084','B08C','B08D','B08F','B091','B098','B099','B09A','B09C','B09F','B0A0','B0A1','B0A2','B0A8','B0A9','B0AB','B0AC','B0AD','B0AE','B0AF','B0B1','B0B3','B0B4','B0B5','B0B8','B0BC','B0C4','B0C5','B0C7','B0C8','B0C9','B0D0','B0D1','B0D4','B0D8','B0E0','B0E5'],
        combining: null
    },
    
    {
        name: "Thai",
        fonts: ['Noto Sans Thai', 'Noto Serif Thai', 'Prompt'],
        // Removed combining marks (0E31-0E4E range)
        glyphs: ['0E01','0E02','0E03','0E04','0E05','0E06','0E07','0E08','0E09','0E0A','0E0B','0E0C','0E0D','0E0E','0E0F','0E10','0E11','0E12','0E13','0E14','0E15','0E16','0E17','0E18','0E19','0E1A','0E1B','0E1C','0E1D','0E1E','0E1F','0E20','0E21','0E22','0E23','0E24','0E25','0E26','0E27','0E28','0E29','0E2A','0E2B','0E2C','0E2D','0E2E','0E2F','0E30','0E32','0E33','0E3F','0E40','0E41','0E42','0E43','0E44','0E45','0E46','0E4F','0E50','0E51','0E52','0E53','0E54','0E55','0E56','0E57','0E58','0E59','0E5A','0E5B'],
        combining: 'thai'
    },
    
    {
        name: "Ethiopic",
        fonts: ['Abyssinica SIL', 'Noto Sans Ethiopic', 'Noto Serif Ethiopic'],
        glyphs: ['1200','1201','1202','1203','1204','1205','1206','1207','1208','1209','120A','120B','120C','120D','120E','120F','1210','1211','1212','1213','1214','1215','1216','1217','1218','1219','121A','121B','121C','121D','121E','121F','1220','1221','1222','1223','1224','1225','1226','1227','1228','1229','122A','122B','122C','122D','122E','122F','1230','1231','1232','1233','1234','1235','1236','1237','1238','1239','123A','123B','123C','123D','123E','123F','1240','1241','1242','1243','1244','1245','1246','1247','1248','124A','124B','124C','124D','1250','1251','1252','1253','1254','1255','1256','1258','125A','125B','125C','125D','1260','1261','1262','1263','1264','1265','1266','1267','1268','1269','126A','126B','126C','126D','126E','126F','1270','1271','1272','1273','1274','1275','1276','1277','1278','1279','127A','127B','127C','127D','127E','127F'],
        combining: null
    },
    
    {
        name: "Armenian",
        fonts: ['Noto Sans Armenian', 'Noto Serif Armenian'],
        glyphs: ['0531','0532','0533','0534','0535','0536','0537','0538','0539','053A','053B','053C','053D','053E','053F','0540','0541','0542','0543','0544','0545','0546','0547','0548','0549','054A','054B','054C','054D','054E','054F','0550','0551','0552','0553','0554','0555','0556','0559','055A','055B','055C','055D','055E','055F','0561','0562','0563','0564','0565','0566','0567','0568','0569','056A','056B','056C','056D','056E','056F','0570','0571','0572','0573','0574','0575','0576','0577','0578','0579','057A','057B','057C','057D','057E','057F','0580','0581','0582','0583','0584','0585','0586','0587','0589','058A','058F'
          ,'058D','x058E'
        ],
        combining: null
    },
    
    {
        name: "Georgian",
        fonts: ['Noto Sans Georgian', 'Noto Serif Georgian'],
        glyphs: ['10A0','10A1','10A2','10A3','10A4','10A5','10A6','10A7','10A8','10A9','10AA','10AB','10AC','10AD','10AE','10AF','10B0','10B1','10B2','10B3','10B4','10B5','10B6','10B7','10B8','10B9','10BA','10BB','10BC','10BD','10BE','10BF','10C0','10C1','10C2','10C3','10C4','10C5','10D0','10D1','10D2','10D3','10D4','10D5','10D6','10D7','10D8','10D9','10DA','10DB','10DC','10DD','10DE','10DF','10E0','10E1','10E2','10E3','10E4','10E5','10E6','10E7','10E8','10E9','10EA','10EB','10EC','10ED','10EE','10EF','10F0','10F1','10F2','10F3','10F4','10F5','10F6','10F7','10F8','10F9','10FA','10FB','10FC'],
        combining: null
    },
    
    {
        name: "Khmer",
        fonts: ['Kantumruy Pro', 'Metal', 'Moul', 'Noto Sans Khmer','Noto Serif Khmer'],
        // Removed combining marks (17B6-17DD range)
        glyphs: ['1780','1781','1782','1783','1784','1786','1787','1788','1789','178A','178B','178C','178D','178E','178F','1790','1791','1792','1793','1794','1795','1796','1797','1798','1799','179A','179B','179C','179D','179E','179F','17A0','17A1','17A2','17A3','17A4','17A5','17A6','17A7','17A8','17A9','17AA','17AB','17AC','17AD','17AE','17AF','17B0','17B1','17B2','17B3','17D9','17DA','17E0','17E1','17E2','17E3','17E4','17E5','17E6','17E7','17E8','17E9'],
        combining: 'khmer'
    },
    
    {
        name: "Telugu",
        fonts: ['Arial Unicode MS', 'Akshar Unicode', 'Code2000', 'Gautami', 'Noto Sans Telugu', 'Noto Serif Telugu', 'Pothana2000', 'Vani', 'chathura', 'dhurjati'],
        // Removed combining marks (0C3E-0C63 range)
        glyphs: ['0C05','0C06','0C07','0C08','0C09','0C0A','0C0B','0C0C','0C0E','0C0F','0C10','0C12','0C13','0C14','0C15','0C16','0C17','0C18','0C19','0C1A','0C1B','0C1C','0C1D','0C1E','0C1F','0C20','0C21','0C22','0C23','0C24','0C25','0C26','0C27','0C28','0C2A','0C2B','0C2C','0C2D','0C2E','0C2F','0C30','0C31','0C32','0C33','0C35','0C36','0C37','0C38','0C39','0C58','0C59','0C60','0C61','0C66','0C67','0C68','0C69','0C6A','0C6B','0C6C','0C6D','0C6E','0C6F','0C79','0C7A','0C7B','0C7C'],
        combining: 'telugu'
    },
    
    {
        name: "Kannada",
        fonts: ['Benne', 'Padyakke Expanded One', 'Tiro Kannada', 'Anek Kannada', 'Hubballi', 'Noto Serif Kannada','Noto Sans Kannada'],
        // Removed combining marks (0CBE-0CE3 range)
        glyphs: ['0C85','0C86','0C87','0C88','0C89','0C8A','0C8B','0C8C','0C8E','0C8F','0C90','0C92','0C93','0C94','0C95','0C96','0C97','0C98','0C99','0C9A','0C9B','0C9C','0C9D','0C9E','0C9F','0CA0','0CA1','0CA2','0CA3','0CA4','0CA5','0CA6','0CA7','0CA8','0CAA','0CAB','0CAC','0CAD','0CAE','0CAF','0CB0','0CB1','0CB2','0CB3','0CB5','0CB6','0CB7','0CB8','0CB9','0CBD','0CDE','0CE0','0CE1','0CE6','0CE7','0CE8','0CE9','0CEA','0CEB','0CEC','0CED','0CEE','0CEF'],
        combining: 'kannada'
    },
    
    {
        name: "Osmanya",
        fonts: ['Noto Sans Osmanya'],
        glyphs: ['10480','10481','10482','10483','10484','10485','10486','10487','10488','10489','1048A','1048B','1048C','1048D','1048E','1048F','10490','10491','10492','10493','10494','10495','10496','10497','10498','10499','1049A','1049B','1049C','1049D','104A0','104A1','104A2','104A3','104A4','104A5','104A6','104A7','104A8','104A9'],
        combining: null
    },
    
    {
        name: "Malayalam",
        fonts: ['Akshar Unicode', 'Code2000', 'Noto Sans Malayalam', 'Noto Serif Malayalam'],
        // Removed combining marks (0D3E-0D63 range)
        glyphs: ['0D05','0D06','0D07','0D08','0D09','0D0A','0D0B','0D0C','0D0E','0D0F','0D10','0D12','0D13','0D14','0D15','0D16','0D17','0D18','0D19','0D1A','0D1B','0D1C','0D1D','0D1E','0D1F','0D20','0D21','0D22','0D23','0D24','0D25','0D26','0D27','0D28','0D29','0D2A','0D2B','0D2C','0D2D','0D2E','0D2F','0D30','0D31','0D32','0D33','0D34','0D35','0D36','0D37','0D38','0D39','0D3D','0D60','0D61','0D66','0D67','0D68','0D69','0D6A','0D6B','0D6C','0D6D','0D6E','0D6F','0D70','0D71','0D72','0D73','0D74','0D75','0D79','0D7A','0D7C','0D7D','0D7E','0D7F'],
        combining: null
    },
    
    {
        name: "Lao",
        fonts: ['Noto Serif Lao', 'Noto Sans Lao Looped', 'Noto Sans Lao', 'Phetsarath'],
        // Removed combining marks (0EB1-0ECD range)
        glyphs: ['0E81','0E82','0E84','0E87','0E88','0E8A','0E8D','0E94','0E95','0E96','0E97','0E99','0E9A','0E9B','0E9C','0E9D','0E9E','0E9F','0EA1','0EA2','0EA3','0EA5','0EA7','0EAA','0EAB','0EAD','0EAE','0EAF','0EB0','0EB2','0EB3','0EBD','0EC0','0EC1','0EC2','0EC3','0EC4','0EC6','0ED0','0ED1','0ED2','0ED3','0ED4','0ED5','0ED6','0ED7','0ED8','0ED9','0EDC','0EDD','0EDE','0EDF'],
        combining: 'lao'
    },
    
    {
        name: "Yi",
        fonts: ['Noto Sans Yi', 'Nuosu SIL'],
        glyphs: ['A000','A001','A002','A003','A004','A005','A006','A007','A008','A009','A00A','A00B','A00C','A00D','A00E','A00F','A010','A011','A012','A013','A014','A015','A016','A017','A018','A019','A01A','A01B','A01C','A01D','A01E','A01F','A020','A021','A022','A023','A024','A025','A026','A027','A028','A029','A02A','A02B','A02C','A02D','A02E','A02F','A030','A031','A032','A033','A034','A035','A036','A037','A038','A039','A03A','A03B','A03C','A03D','A03E','A03F','A040','A041','A042','A043','A044','A045','A046','A047','A048','A049','A04A','A04B','A04C','A04D','A04E','A04F','A490','A491','A492','A493','A494','A495','A496','A497','A498','A499','A49A','A49B','A49C','A49D','A49E','A49F','A4A0','A4A1','A4A2','A4A3','A4A4','A4A5','A4A6','A4A7','A4A8','A4A9','A4AA','A4AB','A4AC','A4AD','A4AE','A4AF','A4B0','A4B1','A4B2','A4B3','A4B4','A4B5','A4B6','A4B7','A4B8','A4B9','A4BA','A4BB','A4BC','A4BD','A4BE','A4BF','A4C0','A4C1','A4C2','A4C3','A4C4','A4C5','A4C6'],
        combining: null
    },
    
    {
        name: "Avestan",
        fonts: ['Noto Sans Avestan'],
        glyphs: ['10B00','10B01','10B02','10B03','10B04','10B05','10B06','10B07','10B08','10B09','10B0A','10B0B','10B0C','10B0D','10B0E','10B0F','10B10','10B11','10B12','10B13','10B14','10B15','10B16','10B17','10B18','10B19','10B1A','10B1B','10B1C','10B1D','10B1E','10B1F','10B20','10B21','10B22','10B23','10B24','10B25','10B26','10B27','10B28','10B29','10B2A','10B2B','10B2C','10B2D','10B2E','10B2F','10B30','10B31','10B32','10B33','10B34','10B35','10B39','10B3A','10B3B','10B3C','10B3D','10B3E','10B3F'],
        combining: null
    },
    
    {
        name: "Vai",
        fonts: ['Noto Sans Vai','Dukor','Wakor'],
        glyphs: ['A500','A501','A502','A503','A504','A505','A506','A507','A508','A509','A50A','A50B','A50C','A50D','A50E','A50F','A510','A511','A512','A513','A514','A515','A516','A517','A518','A519','A51A','A51B','A51C','A51D','A51E','A51F','A520','A521','A522','A523','A524','A525','A526','A527','A528','A529','A52A','A52B','A52C','A52D','A52E','A52F','A530','A531','A532','A533','A534','A535','A536','A537','A538','A539','A53A','A53B','A53C','A53D','A53E','A53F','A540','A541','A542','A543','A544','A545','A546','A547','A548','A549','A54A','A54B','A54C','A54D','A54E','A54F','A550','A551','A552','A553','A554','A555','A556','A557','A558','A559','A55A','A55B','A55C','A55D','A55E','A55F'],
        combining: null
    },
    
    {
        name: "Urdu",
        fonts: ['PakType Tehreer', '_PDMS_Saleem_QuranFont', 'Amiri','Fajer Noori Nastalique','Kinza','PakType Ajrak', 'Noto Nastaliq Urdu', 'Lateef', 'Kufam'],
        // Using same base glyphs as Arabic
        glyphs: ['0600','0601','0602','0603','0604','0609','060A','060B','060C','060D','061B','061F','0621','0622','0623','0624','0625','0626','0627','0628','0629','062A','062B','062C','062D','062E','062F','0630','0631','0632','0633','0634','0635','0636','0637','0638','0639','063A','0640','0641','0642','0643','0644','0645','0646','0647','0648','0679','067E','0686','0688','0691','0698','06A9','06AF','06BA','06BE','06C1','06C2','06C3','06CC','06D2','06D3','06D4','06F0','06F1','06F2','06F3','06F4','06F5','06F6','06F7','06F8','06F9'],
        combining: null
    },
    
    {
        name: "CJK-kangxi",
        fonts: [  "DotGothic16","Kiwi Maru","Murecho",
                   "Noto Sans JP","Noto Serif JP","Rampart One","Reggae One","RocknRoll One","Stick"],
        glyphs: ['2F00','2F01','2F02','2F03','2F04','2F05','2F06','2F07','2F08','2F09','2F0A','2F0B','2F0C','2F0D','2F0E','2F0F','2F10','2F11','2F12','2F13','2F14','2F15','2F16','2F17','2F18','2F19','2F1A','2F1B','2F1C','2F1D','2F1F','2F20','2F21'
          ,'2F22','2F23','2F24','2F25','2F26','2F27','2F28','2F29','2F2A','2F2B','2F2C','2F2D','2F2E','2F2F','2F30','2F31','2F32','2F33','2F34','2F35','2F36','2F37','2F38','2F39','2F3A','2F3B','2F3C','2F3D','2F3E','2F3F'],
        combining: null
    },
    
    {
        name: "Symbols",
        fonts: [ 'DejaVu Sans', 'DejaVu Sans Condensed', 'Everson Mono', 'Code2000',  'Quivira', 'Segoe UI Symbol','Symbola'
        ],
        glyphs: [
          '2190','2191','2192','2193','2194','2195','2196','2197','2198','2199','219A','219B','219C'
          ,'219D','219E','219F','21A0','21A1','21A2','21A3','21A4','21A5','21A6','21A7','21A8','21A9'
          ,'21AA','21AB','21AC','21AD','21AE','21AF','2200','2201','2202','2203','2204','2205','2206'
          ,'2207','2208','2209','220A','220B','220C','220D','220E','220F','2210','2211','2212','2213'
          ,'2214','2215','2216','2217','2218','2219','221A','221B','221C','221D','221E','221F','2220'
          ,'2221','2222','2223','2224','2225','2226','2227','2228','2229','222A','222B','222C','222D'
          ,'222E','222F','2230','2600','2601','2602','2603','2604','2605','2606','2607','2608','2609'
          ,'260A','260B','260C','260D','260E','260F','2611','2612','2613','2614',
          '2615','2616','2617','2618','2619','261A','261B','261C','261D','261E','261F','2620','2621','2622','2623'
         ,'2624','2625','2626','2627','2628','2629','262A','262B','262C','262D','262E',
          '2630','262F'
        
        ],
        combining: null
    },
    {
        name: "Symbols2",
        fonts: [
          'Noto Sans Symbols','DejaVu Sans','DejaVu Sans Condensed', 'Everson Mono', 'Code2000',  'Quivira', 'Segoe UI Symbol', 'Symbola'     
        ],
        glyphs: [
          '2190','2191','2192','2193','2194','2195','2196','2197','2198','2199','2195','2212'
          ,'260A','260B','260C','260D','2613','260D','2624','2625','2626','2627','2628','2629'
           ,'262B','262A','262C','262D','262E','2626'      
        ],
        combining: null
    },
    // {
    //     name: "Emoji",
    //     fonts: [         
    //       'Noto Emoji',
    //       'Noto Sans Symbols','DejaVu Sans', 'DejaVu Sans Condensed', 'Everson Mono', 'Code2000',  'Quivira', 'Segoe UI Symbol', 'Symbola'

    //     ],
    //     glyphs: [
    //       '2191','2194','2195','2196','2197','2198','2199','262A','262E'
    //       ,'262F'
    //       ,'2626'
    //     ],
    //     combining: null
    // },

    // {
    //     name: "Emoji-Special",
    //     fonts: [         
    //     //'Quivira',
    //     'Symbola'
    //     , 'Segoe UI Symbol','Noto Emoji'
    //     ,'Twitter Color Emoji','Open Moji Black'

    //     ],
    //     glyphs: [
    //      '1F571', //black skull    
    //       '1F480' //skull
    //     //   ,'2638' //dharma wheel
    //     //   ,'1F47E' //alien
    //     //   ,'1F916' //robot
    //     //   ,'1F47D' //alien
    //       //,'262F' //yin yang
    //       //,'1F31E' //sun
    //     ],
    //     combining: null
    // },


    {
        name: "Cyrrilic",
        fonts: [ 'Noto Sans','Noto Serif'        
        ],
        glyphs: [
          '0391','0392','0393','0394','0395','0396','0397','0398','0399','039A','039B','039C','039D','039E','039F'
          ,'03A0','03A1','03A3','03A4','03A5','03A6','03A7','03A8','03A9','03B1','03B2','03B3','03B4','03B5','03B6'
          ,'03B7','03B8','03B9','03BA','03BB','03BC','03BD','03BE','03BF','03C0','03C1','03C2','03C3','03C4','03C5'
          ,'03C6','03C7','03C8','03C9','0410','0411','0412','0413','0414','0415','0416','0417','0418','0419','041A'
          ,'041B','041C','041D','041E','041F','0420','0421','0422','0423','0424','0425','0426','0427','0428','0429'
          ,'042A','042B','042C','042D','042E','042F','0430','0431','0432','0433','0434','0435','0436','0437','0438'
          ,'0439','043A','043B','043C','043D','043E','043F','0440','0441','0442','0443','0444','0445','0446','0447'
          ,'0448','0449','044A','044B','044C','044D','044E','044F'
        ],
        combining: null
    },

    {
        name: "CJK-strokes",
        fonts: ['Noto Sans JP'],
        glyphs: ['31C0','31C1','31C2','31C3','31C4','31C5','31C6','31C7','31C8','31C9','31CA','31CB','31CC','31CD','31CE','31CF'],
        combining: null
    },

    {
        name: "CJK-radicals",
        fonts: [
            "Noto Sans JP"
        ],
        glyphs: ['2E80','2E81','2E82','2E83','2E84','2E85','2E86','2E87','2E88','2E89','2E8A','2E8B','2E8C','2E8D','2E8E','2E8F'
          ,'2E90','2E91','2E92','2E93','2E94','2E95','2E96','2E97','2E98','2E99'],
        combining: null
    },


];

function getGlyph() {
    if (forceGlyph !== null) {
        var blockIndex;
        var selectedGlyph;
        
        // Handle array of glyphs
        if (Array.isArray(forceGlyph)) {
            selectedGlyph = forceGlyph[Math.floor(Math.random() * forceGlyph.length)];
        } else {
            selectedGlyph = forceGlyph;
        }
        
        // If forceBlock is set, use it
        if (forceBlock !== null) {
            blockIndex = forceBlock;
        } else {
            // Find which block contains this glyph
            for (var i = 0; i < glyphBlocks.length; i++) {
                if (glyphBlocks[i].glyphs.indexOf(selectedGlyph) !== -1) {
                    blockIndex = i;
                    break;
                }
            }
            // If not found in any block, default to block 0
            if (blockIndex === undefined) blockIndex = 0;
        }
        
        var block = glyphBlocks[blockIndex];
        var randomFont = block.fonts[Math.floor(Math.random() * block.fonts.length)];
        
        return {
            fontFamily: randomFont,
            glyphString: '&#x' + selectedGlyph + ';'
        };
    }
    return generateGlyphs(1);
}

// Set to null for random, single hex string for one glyph, or array for multiple


function generateGlyphs() {
    let blockIndex;
    let block;
    let randomFont;
    let selectedGlyph;
    
    // Handle forceGlyph - can be string or array
    if (forceGlyph !== null) {
        // If it's an array, pick random from list
        if (Array.isArray(forceGlyph)) {
            selectedGlyph = forceGlyph[Math.floor(Math.random() * forceGlyph.length)];
        } else {
            // Single glyph
            selectedGlyph = forceGlyph;
        }
        
        // If forceBlock is set, use it
        if (forceBlock !== null) {
            blockIndex = forceBlock;
        } else {
            // Find which block contains this glyph
            for (var i = 0; i < glyphBlocks.length; i++) {
                if (glyphBlocks[i].glyphs.indexOf(selectedGlyph) !== -1) {
                    blockIndex = i;
                    break;
                }
            }
            // If not found in any block, default to block 0
            if (blockIndex === undefined) blockIndex = 0;
        }
        
        block = glyphBlocks[blockIndex];
        randomFont = block.fonts[Math.floor(Math.random() * block.fonts.length)];
        
        return {
            fontFamily: randomFont,
            glyphString: '&#x' + selectedGlyph + ';'
        };
    }
    
    // Normal random mode
    blockIndex = (forceBlock !== null) ? forceBlock : Math.floor(Math.random() * glyphBlocks.length);
    block = glyphBlocks[blockIndex];
    randomFont = block.fonts[Math.floor(Math.random() * block.fonts.length)];
    let randomGlyph = block.glyphs[Math.floor(Math.random() * block.glyphs.length)];
    
    return {
        fontFamily: randomFont,
        glyphString: '&#x' + randomGlyph + ';'
    };
}

// Signal that arrays are loaded
var utfArraySignal = true;