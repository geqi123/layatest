
var SoundRoot = "sound/";
var SoundMan = "sound/man/";
var SoundWoman = "sound/woman/"
var SoundsConfig =
{
    //是否开启
    "on": true,
    //发牌
    "deal": SoundRoot + "deal.ogg",
    //出牌
    "playcard": SoundRoot + "playcard.ogg",
    //第一次不要 不要
    "buyaoFirst": "buyao0.wav",
    "buyaoLists": ["buyao0.wav", "buyao1.wav", "buyao2.wav", "buyao3.wav"],

    //牌2对应的索引为0 A对应的索引为12
    //小王为13 大王14
    "singleCard": ["2.wav", "3.wav", "4.wav", "5.wav", "6.wav", "7.wav", "8.wav", 
                   "9.wav", "10.wav", "11.wav", "12.wav", "13.wav", "1.wav", "14.map3", "15.map3"],
    "pairCard": ["dui2.wav", "dui3.wav", "dui4.wav", "dui5.wav", "dui6.wav", "dui7.wav", "dui8.wav", 
                 "dui9.wav", "dui10.wav", "dui11.wav", "dui12.wav", "dui13.wav", "dui1.wav", "dui14.map3", "dui15.map3"],

    //大过上家
    "dani": ["dani0.wav", "dani1.wav"],
    //连对
    "liandui": "liandui.wav",
    //甩牌
    "throwcard": "throwcard.wav",
    //毕了
    "kill": "kill.wav",
    //调主
    "getmain": "getmain.wav",
    //跟牌
    "follow": "follow.wav",
    //胜利
    "win": "win.wav",
    //失败
    "lose": "lose.ogg",

    //一根 方块 梅花 红桃 黑桃
    "onesuit": ["onefangkuai.wav", "onemeihua.wav", "onehongtao.wav", "oneheitao.wav"],
    "duisuit": ["duifangkuai.wav", "duimeihua.wav", "duihongtao.wav", "duiheitao.wav"],

    playSound: function(res)
    {
        if (res.indexOf(".wav") < 0 && res.indexOf(".ogg") < 0 && res.indexOf(".wav") < 0)
        {
            var a = 3
            a = 32
            return ;
        }
        if (this.on == true)
        {
            Laya.SoundManager.playSound(res);
        }
    },

    getGenderRoot: function(isMan)
    {
        return isMan == true ? SoundMan : SoundWoman;
    },  

    _playBuyao: function (firstCall, isMan)
    {
        var root = this.getGenderRoot(isMan);
        var res = root;
        if (firstCall == true)
        {      
            res += this.buyaoFirst;
        }
        else
        {
            var index = Math.floor(Math.random() * this.buyaoLists.length);
            res += this.buyaoLists[index];
        }
        this.playSound(res);
    },

    _playSingleCard: function(level, isMan)
    {
        var root = this.getGenderRoot(isMan);
        var res = root + this.singleCard[level];
        this.playSound(res);
    },

    _playPairCard: function(level, isMan)
    {
        var root = this.getGenderRoot(isMan);
        var res = root + this.pairCard[level];
        this.playSound(res);
    },

    _playDani: function(isMan)
    {
        var root = this.getGenderRoot(isMan);
        var index = Math.floor(Math.random() * this.dani.length);
        var res = root + this.dani[index];
        this.playSound(res);
    },

    _playLiandui: function(isMan)
    {
        var root = this.getGenderRoot(isMan);
        var res = root + this.liandui;
        this.playSound(res);
    },

    _playOneSuit: function(suit, isMan)
    {
        var root = this.getGenderRoot(isMan);
        var res = root + this.onesuit[suit];
        this.playSound(res);
    },

    _playDuiSuit: function(suit, isMan)
    {
        var root = this.getGenderRoot(isMan);
        var res = root + this.duisuit[suit];
        this.playSound(res);
    },

    _playShuaipai: function(suit, isMan)
    {
        var root = this.getGenderRoot(isMan);
        var res = root + this.throwcard;
        this.playSound(res);
    },

    _playeDiaozhu: function(isMan)
    {
        var root = this.getGenderRoot(isMan);
        var res = root + this.getmain;
        this.playSound(res);
    },

    _playeFollow: function(isMan)
    {
        var root = this.getGenderRoot(isMan);
        var res = root + this.follow;
        this.playSound(res);
    },

    _playeBile: function(isMan)
    {
        var root = this.getGenderRoot(isMan);
        var res = root + this.kill;
        this.playSound(res);
    },

    //info
    /*
     * firstCall: 是不是第一个叫
     * pass： 是否不叫
     * score: 分数
     * isMan: 
    */
    playSelectScoreSound: function(info)
    {
        if (info.pass == true)
        {
            this._playBuyao(info.firstCall, info.isMan);
        }
        else
        {
        }
    },

    //info
    /*
     * isFirst: 是不是第一个出牌的人
     * isLiandui: 是不是连对
     * isMajor: 是不是主
     * isMess: 是不是甩牌
     * isPair: 是不是对子
     * isBigger: 是不是大过上边的玩家
     * isBile: 是不是毕了
     * suit: 花色
    */
    playCardSound: function(info)
    {
        var isMan = info.isMan;
        if (info.isFirst == true)
        {
            if (info.isMess == true)
            {
                this._playShuaipai(isMan);
                return;
            }

            if (info.isMajor == true)
            {
                this._playeDiaozhu(isMan)
            }
            else
            {
                if (info.isLiandui == true)
                {
                    this._playLiandui(isMan);
                }
                else if (info.isPair == true)
                {
                    this._playDuiSuit(info.suit, isMan);
                }
                else
                {
                    this._playOneSuit(info.suit, isMan);
                }
            }
        }
        else
        {
            if (info.isBigger == true)
            {
                if (info.isBile == true)
                {
                    this._playeBile(isMan);
                }
                else
                {
                    this._playDani(isMan);
                }
            }
            else
            {
                this._playeFollow(isMan);
            }
        }
    }
};