
//扑克牌的数据
//只有八十分下的才需要加载majorIcon的资源（用于亮主）
var SPoker = {
    //存放牌的数据
    "cards": [
            {'id':0, 'suit':0, 'level':0, 'icon':'card_02.png', 'majorIcon':'card_02_major.png'},
            {'id':1, 'suit':0, 'level':1, 'icon':'card_03.png', 'majorIcon':'card_03_major.png'},
            {'id':2, 'suit':0, 'level':2, 'icon':'card_04.png', 'majorIcon':'card_04_major.png'},
            {'id':3, 'suit':0, 'level':3, 'icon':'card_05.png', 'majorIcon':'card_05_major.png'},
            {'id':4, 'suit':0, 'level':4, 'icon':'card_06.png', 'majorIcon':'card_06_major.png'},
            {'id':5, 'suit':0, 'level':5, 'icon':'card_07.png', 'majorIcon':'card_07_major.png'},
            {'id':6, 'suit':0, 'level':6, 'icon':'card_08.png', 'majorIcon':'card_08_major.png'},
            {'id':7, 'suit':0, 'level':7, 'icon':'card_09.png', 'majorIcon':'card_09_major.png'},
            {'id':8, 'suit':0, 'level':8, 'icon':'card_10.png', 'majorIcon':'card_10_major.png'},
            {'id':9, 'suit':0, 'level':9, 'icon':'card_11.png', 'majorIcon':'card_11_major.png'},
            {'id':10, 'suit':0, 'level':10, 'icon':'card_12.png', 'majorIcon':'card_12_major.png'},
            {'id':11, 'suit':0, 'level':11, 'icon':'card_13.png', 'majorIcon':'card_13_major.png'},
            {'id':12, 'suit':0, 'level':12, 'icon':'card_01.png', 'majorIcon':'card_01_major.png'},                                                    
                                                                   
            {'id':13, 'suit':1, 'level':0, 'icon':'card_15.png', 'majorIcon':'card_15_major.png'},
            {'id':14, 'suit':1, 'level':1, 'icon':'card_16.png', 'majorIcon':'card_16_major.png'},
            {'id':15, 'suit':1, 'level':2, 'icon':'card_17.png', 'majorIcon':'card_17_major.png'},
            {'id':16, 'suit':1, 'level':3, 'icon':'card_18.png', 'majorIcon':'card_18_major.png'},
            {'id':17, 'suit':1, 'level':4, 'icon':'card_19.png', 'majorIcon':'card_19_major.png'},
            {'id':18, 'suit':1, 'level':5, 'icon':'card_20.png', 'majorIcon':'card_20_major.png'},
            {'id':19, 'suit':1, 'level':6, 'icon':'card_21.png', 'majorIcon':'card_21_major.png'},
            {'id':20, 'suit':1, 'level':7, 'icon':'card_22.png', 'majorIcon':'card_22_major.png'},
            {'id':21, 'suit':1, 'level':8, 'icon':'card_23.png', 'majorIcon':'card_23_major.png'},
            {'id':22, 'suit':1, 'level':9, 'icon':'card_24.png', 'majorIcon':'card_24_major.png'},
            {'id':23, 'suit':1, 'level':10, 'icon':'card_25.png', 'majorIcon':'card_25_major.png'},
            {'id':24, 'suit':1, 'level':11, 'icon':'card_26.png', 'majorIcon':'card_26_major.png'},
            {'id':25, 'suit':1, 'level':12, 'icon':'card_14.png', 'majorIcon':'card_14_major.png'},
                                                                   
            {'id':26, 'suit':2, 'level':0, 'icon':'card_28.png', 'majorIcon':'card_28_major.png'},
            {'id':27, 'suit':2, 'level':1, 'icon':'card_29.png', 'majorIcon':'card_29_major.png'},
            {'id':28, 'suit':2, 'level':2, 'icon':'card_30.png', 'majorIcon':'card_30_major.png'},
            {'id':29, 'suit':2, 'level':3, 'icon':'card_31.png', 'majorIcon':'card_31_major.png'},
            {'id':30, 'suit':2, 'level':4, 'icon':'card_32.png', 'majorIcon':'card_32_major.png'},
            {'id':31, 'suit':2, 'level':5, 'icon':'card_33.png', 'majorIcon':'card_33_major.png'},
            {'id':32, 'suit':2, 'level':6, 'icon':'card_34.png', 'majorIcon':'card_34_major.png'},
            {'id':33, 'suit':2, 'level':7, 'icon':'card_35.png', 'majorIcon':'card_35_major.png'},
            {'id':34, 'suit':2, 'level':8, 'icon':'card_36.png', 'majorIcon':'card_36_major.png'},
            {'id':35, 'suit':2, 'level':9, 'icon':'card_37.png', 'majorIcon':'card_37_major.png'},
            {'id':36, 'suit':2, 'level':10, 'icon':'card_38.png', 'majorIcon':'card_38_major.png'},
            {'id':37, 'suit':2, 'level':11, 'icon':'card_39.png', 'majorIcon':'card_39_major.png'},
            {'id':38, 'suit':2, 'level':12, 'icon':'card_27.png', 'majorIcon':'card_27_major.png'},
                                                                                                                                 
            {'id':39, 'suit':3, 'level':0, 'icon':'card_41.png', 'majorIcon':'card_41_major.png'},
            {'id':40, 'suit':3, 'level':1, 'icon':'card_42.png', 'majorIcon':'card_42_major.png'},
            {'id':41, 'suit':3, 'level':2, 'icon':'card_43.png', 'majorIcon':'card_43_major.png'},
            {'id':42, 'suit':3, 'level':3, 'icon':'card_44.png', 'majorIcon':'card_44_major.png'},
            {'id':43, 'suit':3, 'level':4, 'icon':'card_45.png', 'majorIcon':'card_45_major.png'},
            {'id':44, 'suit':3, 'level':5, 'icon':'card_46.png', 'majorIcon':'card_46_major.png'},
            {'id':45, 'suit':3, 'level':6, 'icon':'card_47.png', 'majorIcon':'card_47_major.png'},
            {'id':46, 'suit':3, 'level':7, 'icon':'card_48.png', 'majorIcon':'card_48_major.png'},
            {'id':47, 'suit':3, 'level':8, 'icon':'card_49.png', 'majorIcon':'card_49_major.png'},
            {'id':48, 'suit':3, 'level':9, 'icon':'card_50.png', 'majorIcon':'card_50_major.png'},
            {'id':49, 'suit':3, 'level':10, 'icon':'card_51.png', 'majorIcon':'card_51_major.png'},
            {'id':50, 'suit':3, 'level':11, 'icon':'card_52.png', 'majorIcon':'card_52_major.png'},
            {'id':51, 'suit':3, 'level':12, 'icon':'card_40.png', 'majorIcon':'card_40_major.png'},
                                                                              
            {'id':52, 'suit':4, 'level':13, 'icon':'card_53.png', 'majorIcon':'card_53_major.png'},
            {'id':53, 'suit':4, 'level':14, 'icon':'card_54.png', 'majorIcon':'card_54_major.png'},
    ],

    "getCards": function(deckNum, players, bottomCardNum)
    {
        var result = [];
        var allCards = [];
        for (var i = 0; i < deckNum; ++i)
        {
            for (var j = 0; j < this.cards.length; ++j)
            {
                allCards.push(this.cards[j].id);
            }
        }

        // JSExtern.log(allCards);

        var ids = RandomExtend.getNoRepeat(allCards, allCards.length);
        var eachPlayerCardsNum = Math.round((ids.length - bottomCardNum) / players);
        // JSExtern.log(ids.length, eachPlayerCardsNum);
        for (var i = 0; i < players; ++i)
        {
            var cards = [];
            var index = i * eachPlayerCardsNum;
            for (var j = index; j < index + eachPlayerCardsNum; ++j)
            {
                cards.push(ids[j]);
            }
            // JSExtern.log(cards);
            result.push(cards);
        }

        var bCards = [];
        for (var i = ids.length - bottomCardNum; i < ids.length; ++i)
        {
            bCards.push(ids[i]);
        }

        result.push(bCards);

        return result;
    },

    "saveRes": function()
    {
        var iconPath = [];
        var majorIconPath = [];
        for (var i = 0; i < SPoker.cards.length; ++i)
        {
            iconPath.push(SPoker.root + SPoker.cards[i].icon);
            majorIconPath.push(SPoker.root + SPoker.cards[i].majorIcon);
        }

        SPoker.saveIconRes();
        SPoker.saveMajorIconRes();
    },

    "saveIconRes" : function()
    {
        for (var i = 0; i < SPoker.cards.length; ++i)
        {
            SPoker.cards[i].iconRes = Laya.loader.getRes(SPoker.root + SPoker.cards[i].icon);
        } 
    },

    "saveMajorIconRes": function()
    {
        for (var i = 0; i < SPoker.cards.length; ++i)
        {
            SPoker.cards[i].majorIconRes = Laya.loader.getRes(SPoker.root + SPoker.cards[i].majorIcon);
        } 
    },

    //获取这种牌的id，注意不适用大小王
    "getID": function(level, suit)
    {
        return level + SPoker.eachSuitNum * suit;
    },

    "isBigJokerID": function(id)
    {
        return id == SPoker.bigJokerID;
    },

    "isLittleJokerID": function(id)
    {
        return id == SPoker.littleJokerID;
    },

    isJokerID: function(id)
    {
        return this.isBigJokerID(id) || this.isLittleJokerID(id);
    },

    isScoreCard: function(id)
    {        
        var sPoker = SPoker.cards[id];
        return sPoker.level == 3 || sPoker.level == 8 || sPoker.level == 11;
    }
}

SPoker.root = 'cards/'; //牌所在目录
SPoker.cardWidth = 122; //牌的宽度 高度
SPoker.cardHeight = 162;
SPoker.majorWidth = 54; //牌（亮主用）的宽度 高度
SPoker.majorHeight = 36; 
SPoker.cardSpace = 50; //牌的间距（比牌的宽度小，因此牌是叠在一起的）
SPoker.majorSpace = 30; //牌的间距（比牌的宽度小，因此牌是叠在一起的）
SPoker.suitNum = 4; //几个花色
SPoker.eachSuitNum = 13; //一个花色有几张牌 
SPoker.bigJokerID = 53; //大王id
SPoker.littleJokerID = 52; //小王id
SPoker.littleJokerLevel = 13; //小王的level 普通牌是0~12 将小王设置成13是为了方便计算拖拉机

