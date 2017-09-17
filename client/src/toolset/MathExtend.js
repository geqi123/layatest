//数学相关公用接口
var MathExtend =
{
    //获取单牌
    "getSingle": function(ids)
    {
        var card = [];
        for (var i = 0; i < ids.length;)
        {
            if (i + 1 == ids.length)
            {
                card.push(ids[i]);
                break;
            }

            if (ids[i] == ids[i + 1])
            {
                i += 2;
            }
            else
            {
                card.push(ids[i]);
                ++i;
            }            
        }

        return card;       
    },

    //获取对子
    "getPair": function(ids)
    {
        var pairCard = [];  // 对子  
        for (var i = 0; i < ids.length;)
        {
            if (i + 1 == ids.length)
            {
                break;
            }

            if (ids[i] == ids[i + 1])
            {
                pairCard.push(ids[i]);
                i += 2;
            }
            else
            {
                ++i;
            }            
        }

        return pairCard;
    },



    "getTargetIndex": function(ids, id)
    {
        for (var i = 0; i < ids.length; ++i)
        {
            if (ids[i].id == id)
            {
                return i;
            }
        }

        return -1;
    },

    "getShowIndex": function(selfIndex, ids, id)
    {
        var index = MathExtend.getTargetIndex(ids, id);
        return (index + ids.length - selfIndex) % ids.length;
    }
};