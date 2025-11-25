var mycolors = [
        '#000000', '#000080', '#00008B', '#0000CD', '#0000FF', '#006400', '#008000', '#008080', '#008B8B', '#00BFFF', '#00CED1'
        , '#00FA9A', '#00FF00', '#00FF7F', '#00FFFF', '#00FFFF', '#191970', '#1E90FF', '#20B2AA', '#228B22', '#2E8B57', '#2F4F4F'
        , '#2F4F4F', '#32CD32', '#3CB371', '#40E0D0', '#4169E1', '#4682B4', '#483D8B', '#48D1CC', '#4B0082', '#556B2F', '#5F9EA0'
        , '#6495ED', '#66CDAA', '#696969', '#696969', '#6A5ACD', '#6B8E23', '#708090', '#708090', '#778899', '#778899', '#7B68EE'
        , '#7CFC00', '#7FFF00', '#7FFFD4', '#800000', '#800080', '#808000', '#808080', '#808080', '#87CEEB', '#87CEFA', '#8A2BE2'
        , '#8B0000', '#8B008B', '#8B4513', '#8FBC8F', '#90EE90', '#9370DB', '#9400D3', '#98FB98', '#9932CC', '#9ACD32', '#A0522D'
        , '#A52A2A', '#A9A9A9', '#A9A9A9', '#ADD8E6', '#ADFF2F', '#AFEEEE', '#B0C4DE', '#B0E0E6', '#B22222', '#B8860B', '#BA55D3'
        , '#BC8F8F', '#BDB76B', '#C0C0C0', '#C71585', '#CD5C5C', '#CD853F', '#D2691E', '#D2B48C', '#D3D3D3', '#D3D3D3', '#D8BFD8'
        , '#DA70D6', '#DAA520', '#DB7093', '#DC143C', '#DCDCDC', '#DDA0DD', '#DEB887', '#E0FFFF', '#E6E6FA', '#E9967A', '#EE82EE'
        , '#EEE8AA', '#F08080', '#F0E68C', '#F0F8FF', '#F0FFF0', '#F0FFFF', '#F4A460', '#F5DEB3', '#F5F5DC', '#F5F5F5', '#F5FFFA'
        , '#F8F8FF', '#FA8072', '#FAEBD7', '#FAF0E6', '#FAFAD2', '#FDF5E6', '#FF0000', '#FF00FF', '#FF00FF', '#FF1493', '#FF4500'
        , '#FF6347', '#FF69B4', '#FF7F50', '#FF8C00', '#FFA07A', '#FFA500', '#FFB6C1', '#FFC0CB', '#FFD700', '#FFDAB9', '#FFDEAD'
        , '#FFE4B5', '#FFE4C4', '#FFE4E1', '#FFEBCD', '#FFEFD5', '#FFF0F5', '#FFF5EE', '#FFF8DC', '#FFFACD', '#FFFAF0', '#FFFAFA'
        , '#FFFF00', '#FFFFE0', '#FFFFF0', '#FFFFFF'
    
    ];  

    // USER-SPECIFIED mixBlendModes array
    var mixBlendModes = [
        'normal', 'multiply', 'screen', 'overlay', 'darken'
        , 'lighten'
        , 'color-dodge', 'color-burn',
        ,'hard-light'
        , 'soft-light'
        , 'difference'
        , 'exclusion'
        , 'hue', 'saturation', 'color'
        , 'luminosity'
    ];

    // Combine all shape arrays for a rich character set

    var legacyComputingArray = [
        '1FB00', '1FB01', '1FB02', '1FB03', '1FB04', '1FB05', '1FB06', '1FB07', '1FB08', '1FB09'
        , '1FB0A', '1FB0B', '1FB0C', '1FB0D', '1FB0E', '1FB0F', '1FB10', '1FB11', '1FB12', '1FB13'
        , '1FB14', '1FB15', '1FB16', '1FB17', '1FB18', '1FB19', '1FB1A', '1FB1B', '1FB1C', '1FB1D'
        , '1FB1E', '1FB1F', '1FB20', '1FB21', '1FB22', '1FB23', '1FB24', '1FB25', '1FB26', '1FB27'
        , '1FB28', '1FB29', '1FB2A', '1FB2B', '1FB2C', '1FB2D', '1FB2E', '1FB2F', '1FB30', '1FB31'
        , '1FB32', '1FB33', '1FB34', '1FB35', '1FB36', '1FB37', '1FB38', '1FB39', '1FB3A', '1FB3B'
        , '1FB3C', '1FB3D', '1FB3E', '1FB3F', '1FB40', '1FB41', '1FB42', '1FB43', '1FB44', '1FB45'
        , '1FB46', '1FB47', '1FB48', '1FB49', '1FB4A', '1FB4B', '1FB4C', '1FB4D', '1FB4E', '1FB4F'
        , '1FB50', '1FB51', '1FB52', '1FB53', '1FB54', '1FB55', '1FB56', '1FB57', '1FB58', '1FB59'
        , '1FB5A', '1FB5B', '1FB5C', '1FB5D', '1FB5E', '1FB5F', '1FB60', '1FB61', '1FB62', '1FB63'
        , '1FB64', '1FB65', '1FB66', '1FB67', '1FB68', '1FB69', '1FB6A', '1FB6B', '1FB6C', '1FB6D'
        , '1FB6E', '1FB6F', '1FB70', '1FB71', '1FB72', '1FB73', '1FB74', '1FB75', '1FB76', '1FB77'
        , '1FB78', '1FB79', '1FB7A', '1FB7B'// ,'1FB7C', '1FB7D', '1FB7E', '1FB7F', '1FB80', '1FB81'
        // , '1FB82', '1FB83', '1FB84', '1FB85', '1FB86', '1FB87', '1FB88', '1FB89', '1FB8A', '1FB8B'
        // , '1FB8C', '1FB8D', '1FB8E', '1FB8F', '1FB90', '1FB91', '1FB92', '1FB93', '1FB94', '1FB95'
        // , '1FB96'
         ,'1FB97'
         //, '1FB98', '1FB99'
          , '1FB9A', '1FB9B'
         // , '1FB9C', '1FB9D', '1FB9E', '1FB9F'
         , '1FBA0', '1FBA1', '1FBA2', '1FBA3', '1FBA4', '1FBA5', '1FBA6', '1FBA7', '1FBA8', '1FBA9'
         //, '1FBAA', '1FBAB', '1FBAC', '1FBAD', '1FBAE'
          , '1FBAF' //'1FBB0'
        //, '1FBB1', '1FBB2', '1FBB3', '1FBB4', '1FBB5', '1FBB6', '1FBB7'
         //, '1FBB8'
         , '1FBB9', '1FBBA', '1FBBB'
        // , '1FBBC', '1FBBD'
        //, '1FBBE', '1FBBF', '1FBC0', '1FBC1', '1FBC2', '1FBC3', '1FBC4', '1FBC5', '1FBC6', '1FBC7'
        //, '1FBC8', '1FBC9'
         //, '1FBCA'
       // , '1FBF0', '1FBF1', '1FBF2', '1FBF3', '1FBF4', '1FBF5', '1FBF6', '1FBF7', '1FBF8', '1FBF9'
    ];

    var boxDrawingHexArray = [
        '2500', '2501', '2502', '2503', '2504', '2505', '2506', '2507', '2508', '2509', '250A', '250B', '250C', '250D', '250E', '250F',
        '2510', '2511', '2512', '2513', '2514', '2515', '2516', '2517', '2518', '2519', '251A', '251B', '251C', '251D', '251E', '251F',
        '2520', '2521', '2522', '2523', '2524', '2525', '2526', '2527', '2528', '2529', '252A', '252B', '252C', '252D', '252E', '252F',
        '2530', '2531', '2532', '2533', '2534', '2535', '2536', '2537', '2538', '2539', '253A', '253B', '253C', '253D', '253E', '253F',
        '2540', '2541', '2542', '2543', '2544', '2545', '2546', '2547', '2548', '2549', '254A', '254B', '254C', '254D', '254E', '254F',
        '2550', '2551', '2552', '2553', '2554', '2555', '2556', '2557', '2558', '2559', '255A', '255B', '255C', '255D', '255E', '255F',
        '2560', '2561', '2562', '2563', '2564', '2565', '2566', '2567', '2568', '2569', '256A', '256B', '256C'//, '256D', '256E', '256F',
        //'2570', 
        ,'2571', '2572', '2573', '2574', '2575', '2576', '2577', '2578', '2579', '257A', '257B', '257C', '257D', '257E', '257F'
    ];
    var blockElementsHexArray = [
        '2580', '2581', '2582', '2583', '2584', '2585', '2586', '2587', '2588', '2589', '258A', '258B', '258C', '258D', '258E', '258F',
        '2590', 
        //'2591', '2592', '2593', 
        '2594', '2595', '2596', '2597', '2598', '2599', '259A', '259B', '259C', '259D', '259E', '259F'
    ];
    var geometricShapesHexArray = [
        //'25A0', '25A1', '25A2', '25A3',
         '25A4',
        // '25A5', '25A6', '25A7', '25A8', '25A9', '25AA', '25AB', '25AC',
         '25AD',// '25AE', '25AF',
        //'25B0', 
        '25B1',
        // '25B2', '25B3', '25B4', '25B5', '25B6', '25B7', '25B8', '25B9', '25BA', '25BB', '25BC', '25BD', 
        '25BE', '25BF',
        //'25C0', '25C1', '25C2', '25C3', '25C4',
         '25C5', '25C6',
         // '25C7', '25C8', '25C9', '25CA', '25CB', '25CC', '25CD', '25CE', '25CF',
        //'25D0', '25D1', '25D2', '25D3', '25D4', '25D5', '25D6', '25D7', '25D8', '25D9', '25DA', '25DB', '25DC', '25DD', '25DE', '25DF',
        //'25E0', '25E1', '25E2', '25E3', '25E4', '25E5', '25E6', '25E7', '25E8', '25E9', '25EA', '25EB', '25EC', '25ED', '25EE', '25EF',
        //'25F0', '25F1', '25F2', '25F3', '25F4', '25F5', '25F6', '25F7', '25F8', '25F9', '25FA', '25FB', '25FC',
         '25FD'//, '25FE', '25FF'
    ];

    var geometricShapesExtendedHexArray= [
        '1F780','1F781','1F782','1F783'
        // ,'1F784','1F785','1F786','1F787','1F788','1F789','1F78A','1F78B','1F78C','1F78D','1F78E','1F78F'
        // ,'1F790','1F791','1F792','1F793','1F794','1F795','1F796','1F797','1F798','1F799','1F79A','1F79B','1F79C','1F79D','1F79E','1F79F'
         ,'1F7A0','1F7A1','1F7A2','1F7A3','1F7A4','1F7A5','1F7A6','1F7A7'//,'1F7A8','1F7A9','1F7AA','1F7AB','1F7AC','1F7AD','1F7AE','1F7AF'
        // ,'1F7B0','1F7B1','1F7B2','1F7B3','1F7B4','1F7B5','1F7B6','1F7B7','1F7B8','1F7B9','1F7BA','1F7BB','1F7BC','1F7BD','1F7BE','1F7BF'
        // ,'1F7C0','1F7C1','1F7C2','1F7C3','1F7C4','1F7C5','1F7C6','1F7C7','1F7C8','1F7C9','1F7CA','1F7CB','1F7CC','1F7CD','1F7CE','1F7CF'
        // ,'1F7D0','1F7D1','1F7D2','1F7D3','1F7D4','1F7D5','1F7D6','1F7D7','1F7D8','1F7D9'
    ]

    var countingRodNumeralsHexArray = [
    '1D360', '1D361', '1D362', '1D363', '1D364', '1D365', '1D366', '1D367', '1D368', '1D369',
    '1D36A', '1D36B', '1D36C', '1D36D', '1D36E', '1D36F', '1D370', '1D371', '1D372', '1D373',
    '1D374', '1D375', '1D376', '1D377', //'1D378', '1D379', '1D37A', '1D37B', '1D37C', '1D37D',
    //'1D37E', '1D37F'
    ];

    var mathematicalOperatorsHexArray = [
        '2223','2225','2261','2263','2291','2292','22a2','22a3','22a4','22a5','22a6','22a7',
        '22a8','22a9','22aa','22ab','22ac','22ad','22b9','22ba','22cb','22cc','22d5','22ee','22ef'
    ]

    var supplementalMathematicalOperatorsHexArray = [
        '2a1e','2a3c','2acd','2a57','2a58','2a68','2a69','2a76','2acd','2ace','2ade','2adf',
        '2ae2','2ae3','2ae4','2ae5','2ae6','2ae7','2ae8','2ae9','2aea','2aeb','2aec','2aed',
        '2af2','2af4','2af5','2af6','2afb','2afc','2aff'
    ]
    var miscellaneousMathematicalSymbolsA = [
        '27c2','27ca','27d8','27da','27db','27dd','27de'   
    ]

    var miscellaneousMathematicalSymbolsB = [
        '2980','299f','29a2','29a3','29a6','29a7','29e6','29e7','29c9','29fa','29fb'   
    ]

    var miscellaneaousTechnicalBlock = [
        '2308','2309','230a','230b','230c','230d','230e','230f','2310','2319','231c',
        '231d','231e','231f','2324','2325','232f','2338','234a','2351','2348','2385',
        '2387','238d','238e','23ca','23cb','23cc','23e2','23e4','23e5','23d9','23da','23db'
    ]


    var myarray = 
    legacyComputingArray
    .concat(boxDrawingHexArray)
    .concat(blockElementsHexArray)
    .concat(geometricShapesHexArray)
    .concat(geometricShapesExtendedHexArray)
    .concat(countingRodNumeralsHexArray)
    .concat(mathematicalOperatorsHexArray)  
    .concat(supplementalMathematicalOperatorsHexArray)
    .concat(miscellaneousMathematicalSymbolsA)  
    .concat(miscellaneousMathematicalSymbolsB)   
    .concat(miscellaneaousTechnicalBlock) 
