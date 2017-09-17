
//分数信息

var ScoreInfo = 
{
    //叫分 小光 反小光 反大光
    scoreRule:[
        {winDouble: 0, winHalf: -1, breakHalf: -1, breakDouble: 10}, //5
        {winDouble: 0, winHalf: 5,  breakHalf: 15, breakDouble: 20}, //10
        {winDouble: 0, winHalf: 5, breakHalf: 20, breakDouble: 30}, //15
        {winDouble: 0, winHalf: 10, breakHalf: 30, breakDouble: 40}, //20
        {winDouble: 0, winHalf: 10, breakHalf: 35, breakDouble: 50}, //25
        {winDouble: 0, winHalf: 15, breakHalf: 45, breakDouble: 60}, //30
        {winDouble: 0, winHalf: 15, breakHalf: 50, breakDouble: 70}, //35
        {winDouble: 0, winHalf: 20, breakHalf: 60, breakDouble: 80}, //40
        {winDouble: 0, winHalf: 20, breakHalf: 65, breakDouble: 90}, //45
        {winDouble: 0, winHalf: 25, breakHalf: 75, breakDouble: 100}, //50
        {winDouble: 0, winHalf: 25, breakHalf: 80, breakDouble: 110}, //55
        {winDouble: 0, winHalf: 30, breakHalf: 90, breakDouble: 120}, //60
        {winDouble: 0, winHalf: 30, breakHalf: 95, breakDouble: 130}, //65
        {winDouble: 0, winHalf: 35, breakHalf: 105, breakDouble: 140}, //70
        {winDouble: 0, winHalf: 35, breakHalf: 110, breakDouble: 150}, //75
        {winDouble: 0, winHalf: 40, breakHalf: 120, breakDouble: 160}, //80 <--
        {winDouble: 0, winHalf: 40, breakHalf: 125, breakDouble: 170}, //85
        {winDouble: 0, winHalf: 45, breakHalf: 130, breakDouble: 180}, //90
        {winDouble: 0, winHalf: 45, breakHalf: 135, breakDouble: 190}, //95
        {winDouble: 0, winHalf: 50, breakHalf: 145, breakDouble: 200}, //100
        {winDouble: 0, winHalf: 50, breakHalf: 150, breakDouble: 200}, //105
        {winDouble: 0, winHalf: 55, breakHalf: 155, breakDouble: 200}, //110
        {winDouble: 0, winHalf: 55, breakHalf: 160, breakDouble: 200}, //115
        {winDouble: 0, winHalf: 60, breakHalf: 165, breakDouble: 200}, //120
        {winDouble: 0, winHalf: 60, breakHalf: 170, breakDouble: 200}, //125
        {winDouble: 0, winHalf: 65, breakHalf: 175, breakDouble: 200}, //130
        {winDouble: 0, winHalf: 65, breakHalf: 180, breakDouble: 200}, //135
        {winDouble: 0, winHalf: 70, breakHalf: 185, breakDouble: 200} //140
    ],

    isPo: function(line, cur, getScore)
    {
        var index = Math.floor(line / 5) - 1;
        var data = this.scoreRule[index];
        var total = cur + getScore;
        if (total < line)
        {
            return false;
        }

        if (cur < line && total >= line)
        {
            return true;
        }
        else if (cur >= line && cur < data.breakHalf && total >= data.breakHalf)
        {
            return true;
        }
        else if (cur >= data.breakHalf && cur < data.breakDouble && total >= data.breakDouble)
        {
            return true;
        }
        return false;
    }
}