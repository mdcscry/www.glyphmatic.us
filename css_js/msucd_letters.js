//super painters

var langArray =[];
var arrowArray =[];
var homeDetector=location.href;
var ua=navigator.userAgent;


  combFormsAbove=[777,778,779,780,781,782,783,784,785,786,787,788,794,829,830,831,832,833,836];
  combFormsMiddle=[820,821,822,823];
  combFormsBelow=[790,791,792,793,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,825,826,827,828,837];

 langArray[97]=['a',224,225,226,227,228,229,257,259,261,462,479,481,507,513,515,593,1072,1233,1235,7834,7841,7843,7845,7847,7849,7851
 ,7853,7855,7857,7859,7861,7863,7936,7937,7938,7939,7940,7941,8064,8065,8066,8067,8068,8069,8070,8071,8112,8113,8114,8115,8116,8118,8119];
 langArray[98]=['b',254,384,385,386,387,388,389,595,665,976,914,946,1098,1100,1068,1066,1074,1591,1592,1695,8492,65217,65218,65219,65220,65221,65222,65223,65224,65314,65346];
 langArray[99]=['c',263,265,267,269];
 langArray[100]=['d',65316,65348,8363];
 langArray[101]=['e',8496,8495,8494,8455,65317,65349,65468];
 langArray[102]=['f',65350,65318,8497,8457,2623];
 langArray[103]=['g',285,287,289,291,485,487,501,608,609];

 langArray[104]=['h',293,295,614,615,1035,1115,1106,7715,7717,7719,7721,7723,8462,8463];
 langArray[105]=['i',616,236,237,238,239,297,299,301,303,305,464,521,523,616,912,943,953,970,1110,1111,7725
 ,7727,7881,7883,7991,7990,7989,7988,7987,7986,7985,7984,8055,8054,8151,8150,8147,8146,8145,8144];
 langArray[106]=['j',65322,65354];
 langArray[107]=['k',65323,65355];
 langArray[108]=['l',204,205,206,207,296,298,318,316,314,322,320
 ,617];
 langArray[109]=['m',8357,625,3667,7745,7747,8357];
 langArray[110]=['n',303,8358,65326,65358,8469];
 langArray[111]=['o',65518,65463];
 langArray[112]=['p',7765,7767,1088,7765,7767,8164,8165,421];
 langArray[113]=['q',65361,65329];
 langArray[114]=['r',65330,65362,8479,8478,8477,8476,8475];
 langArray[115]=['s',167,347,349,351,353,1609,1610,1574,1656,1740,1741,1742,1744,1745,3600,3758,3773,65161,65263,65265,3758];
 langArray[116]=['t',355,357,359,407,410,427,619,620,648,7787,7789,7791,7793,7831];
 langArray[117]=['u',361,363,365,367,369,371,432,468,470,472,474,476,649,650,651,971,956,944,973];
 langArray[118]=['v',65366,65334,8483,8167,8166,8163,8162,8161,8160,8059,8058,8023,8022,8021,8020,8019,8018,8017,8016];
 langArray[119]=['w',65335,65367,65510,8361];
 langArray[120]=['x',65368,65336];
 langArray[121]=['y',255,1207,436,591,611];
 langArray[122]=['z',65370,65338];




  langArray[65]=['A',192,193,194,195,196,197,256,258,260,461,478,480,506,512,514,902,913,1040,1232,1234,9074,9398,65313];
  langArray[66]=['B',254,384,385,386,387,388,389,595,665,976,914,946,1098,1100,1068,1066,1074,1591,1592,1695,8492,65217,65218,65219,65220,65221,65222,65223,65224,65314,65346];
  langArray[67]=['C',65315,9400,199,262,264,266,268,391,986,1057,1194,65315,8450,8451,8353,8364];
  langArray[68]=['D',65316,65348,8363];
  langArray[69]=['E',8496,8495,8494,8455,65317,65349,65468];
  langArray[70]=['F',65350,65318,8497,8457];
  langArray[71]=['G',65319,9404,284,286,288,290,484,486,500,667,610,1004,1398,7712,610];
  langArray[72]=['H',292,294,919,1186,1187,65320,65352,8462,8463,8461,8460,8459,405,292,294,919,1186,1187];
  langArray[73]=['I',618];
  langArray[74]=['J',65322,65354];
  langArray[75]=['K',65323,65355];
  langArray[76]=['L',65328,420,1056,7764,7765,7766,8172,8473,8471,9413,8359];
  langArray[77]=['M',65325,65357,8499,8357,4415,9807,3904];
  langArray[78]=['N',303,8358,65326,65358,8469];
  langArray[79]=['O',65518,65463];
  langArray[80]=['P',65328,420,1056,7764,7766,8172,8473,8471,9413,8359];
  langArray[81]=['Q',65361,65329];
  langArray[82]=['R',65330,65362,8479,8478,8477,8476,8475];
  langArray[83]=['S',3773,167,346,348,350,352,1029,1359,1705,1706,1707,1711,1712,1713,1714,1715,1716,4285,65284,65331];
  langArray[84]=['T',65332,9417,354,356,358,428,430,964,1006,1007,1196,1197,7786,7788,7790,7792,8890,8868,9057,9041];
  langArray[85]=['U',217,218,219,220,360,361,362,363,364,365,366,367,368,369,370,371,431,432
  ,467,468,469,470,471,472,473,474,475,476,649,971,956,944,1396,1405,1415,3609,7794,7795,7796
  ,7797,7798,7799,7800,7801,7802,7803,7908,7909];//&#8899,8634,8635,8844,8845,8846,8852;
  langArray[86]=['V',65366,65334,8483];
  langArray[87]=['W',65335,65367,65510,8361];
  langArray[88]=['X',65368,65336];
  langArray[89]=['Y',65337,65509,9422,374,376,655,939,933,978,979,980,1198,1199,7822,376,374,1059,1038,1264,1266,1262];
  langArray[90]=['Z',65370,65338];

 langArray[46]=['periods',8228];
// langArray[21]=['u',361,363,365,367,369,371,432,468,470,472,474,476,649,971,956,944,1396,1405,1415,3609,7795,7797,7799,7801,7803,7909];//,65168,65174,65173,65178,65177,65253,65254,65365,65167,1578,1579,1657,1658,1659,1660,1661,1662,1663,1664,1722,1723,1724,1725];

 //langArrayC[21]=['U',217,218,219,220,360,362,364,366,368,370,431,467,469,471,473,475,7794,7796,7798,7800,7802,7908];//,65168,65174,65173,65178,65177,65253,65254,65365,65167,1578,1579,1657,1658,1659,1660,1661,1662,1663,1664,1722,1723,1724,1725];
 //langArrayC[12]=['L',65324,65505,8466,313,315,317,319,321,617,671,7734,7736,7738,7740];
 //langArray[12]=['l',65356,8467,318,316,314,322,320,643,7735,7737,7739,7741];

arrowArray[1]=['left',706,8249,8592,8602,8604,8606,8610,8612,8617,8619,8636,8637
,8884,8918,8920,8924,8934,8936,8938,8940,9001,9029,9031,12296,12298,12367,12368,
,12337,12338,9754,9756,24027,24028,8678]
arrowArray[2]=['right',8250,8594,8603,8605,8608,8611,8614,8618,8620,8640,8641,8649,8655,8658,8667,8669,8674,8677,8678,8680,8811,8827,8881
,8883,8885,8919,8921,8925,8935,8937,8939,8941,9002,9010,9009,9032,9030,12297,12299,12445,12446,
,10132,10137,10139,10140,10141,10142,10143,10144,10145,10146,10147
,10148,10165,10168
,10170,10171,10172, 10173,10174,9755,9758];
arrowArray[3]=['up',708,710,8248,8593,8607,8613,8638,8639,8648,8657,8670,8673,8679,8682,8710,8743,8796,8793,8892,8896,8911
,8962,8963,8996,9035,9037,9039,9040,9043,9049,9074,9757];
arrowArray[4]=['down',721,711,709,748,8595,8609,8615,8642,8643,8650,8659,8671,8675,8711,8744,8893,8891,8897,8910,8964
,8980,9013,9036,9042,9044,9046,9047,9058,9067,9073,9759];
arrowArray[5]=['diagRUP',8599,8663,12293,12294,10138,10166,10169,9794,9808];
arrowArray[6]=['diagLDOWN',8665,8601,8894,8981];
arrowArray[7]=['diagRDOWN',8600,8664,8895,12349,10136,10164,10167,9736];
arrowArray[8]=['diagLUP',8598,8632,8662,9740];
arrowArray[9]=['hover',10149,10049,10050,10051,10052,10053,10054,10055,10056,10057,10058,10059,10061,10063]


//QUIVIRA add-on
if (homeDetector.indexOf("home")>0) {
langArray[109].push(11417,3433,3439,3368,9289,9436,9384,4320,3335,3340,42867,7535,119846,119898,119950,120002,120054,120106,120158,120210,120262,120314,120366,120418,120470);//m
langArray[121].push(3759,9448,9396,1118,1091,1095,1118,1265,1267,1263,1228,1269,7823,7833,375,255,7923,7927,7929);
langArray[108].push(7724,300,302,304,463,520,522,906,938,1031,1030,8467,7726,7880,7882,7999,9406,7998,7997,7996,7995,7994,7993,7992,8155,8154,8153,8152,7735,7737,7739,7741);
langArray[116].push(1006,9391,9443,1007,7791,7793,7831,9039,9069,8224,8225,9766,9768,9769);
langArray[104].push(998,1106,1387,1392,4281,4329);
langArray[112].push(1385,9439,9387,1088,447);
langArray[97].push(9078,9082,9424,9372);
langArray[105].push(8560,9380,9432);
langArray[99].push(8912,9426,8573,65117,65504,9686,7689,1195,8834,269,392,663,1010,1089,8847,8849,8705);
langArray[117].push(9062,9444,9739,12585,2554,2735,2730,2743,3609,7795,7797,7799,7801,7803,7909);
langArray[115].push(65129);
langArray[103].push(9430,7713,8458);
langArray[46].push(65106);
combFormsAbove.push(834,835);
}



msucdArraySignal=[];
