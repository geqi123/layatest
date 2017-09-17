
//同服务端配置

var ServerConfig = {
    itemType:
    {
        stone: 0,
        vitality: 1,
        recordCard: 2,
        godeye: 3,
        nothing: 99
    },

    //0砖石量 1体力值
    vitalityTip: "用{0}钻石购买{1}点体力？",
    vitalityItems: [[1,1], [2,2], [3,3], 
                    [4,6], [5,10], [10,25]],

    //0砖石量 1记牌器数量
    recordCardTip: "用{0}钻石购买{1}张记牌器？",
    recordCardItems: [[1,1], [2,2], [3,3], 
                    [4,6], [5,10], [10,50]],

    //使用一次上帝之眼消耗的砖石
    godeyeTip: "用{0}钻石开启上帝之眼？",
    godEyeItem: 5,

    noGoldTip: "金币不足",
    buySuccess: "购买成功",
    buyFail: "购买失败",
}