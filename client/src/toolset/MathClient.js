
//数学相关公用接口 只有客户端用的到的
var MathClient =
{
    //获取第一个物品的位置
    //len：总的长度
    //itemWidth：物品的宽度
    //itemNum：数量
    "getFirstPos": function(len, itemWidth, itemNum)
    {
        if (len <= 0 || itemWidth <= 0 || itemNum <= 0)
        {
            return 0;
        }

		var itemsLen = itemNum * itemWidth;
        if (len < itemsLen)
		{
			//  放不下所有的元素  
			return 0;
		}
        else
        {
            return len * 0.5 - itemsLen * 0.5;
        }
    },

    //获取第一个物品的位置(物品之间有重叠)
    //len：总的长度
    //itemSpace：物品的间距
    //actualWidth：物品的宽度 (如果这个值等于itemSpace，则等价于getFirstPos)
    //itemNum：数量
    "getFirstPosOfFoldItem": function(len, itemSpace, actualWidth, itemNum)
	{
		if (itemNum == 0 || itemNum == 1)
		{
			return (len - actualWidth) * 0.5;
		}

		var lenTemp = len - actualWidth;
		var beginx = MathClient.getFirstPos(lenTemp, itemSpace, itemNum - 1);

        return beginx;
	},

    //获取索引范围
    //beginX 开始位置
    //endX 结束位置
    //rects 范围
    "getIndexRange": function(touchRect, rects)
    {
        var res = [];
        for (var i = 0; i < rects.length; ++i)
        {
            for (var j = 0; j < rects[i].length; ++j)
            {
                var rect = rects[i][j];
                if (touchRect.intersects(rect) == true)
                {
                    res.push(i);
                    break;
                }
            }
        } 

        return res;
    },

    //合并范围
    //rects 目标区域（必须连续）
    //outRect 输出
    "getMergeRect": function(rects, outRect)
    {
        if (rects.length == 0)
        {
            outRect.x = 0;
            outRect.y = 0;
            outRect.width = 0;
            outRect.height = 0;
        }
        else
        {
            // var last = rects.length - 1;
            // outRect.x = rects[0].x;
            // outRect.y = rects[0].y;
            // outRect.width = rects[last].width + rects[last].x - rects[0].x;
            // outRect.height = rects[0].height;
            var firstRect = rects[0][0]
            var xMin = firstRect.x; 
            var xMax = firstRect.x + firstRect.width;
            var yMin = firstRect.y;
            var yMax = firstRect.y + firstRect.height;
            for (var i = 0; i < rects.length; ++i)
            {
                for (var j = 0; j < rects[i].length; ++j)
                {
                    var rect = rects[i][j];
                    if (rect.x < xMin)
                    {
                        xMin = rect.x;
                    }

                    if (rect.x + rect.width > xMax)
                    {
                        xMax = rect.x + rect.width;
                    }

                    if (rect.y < yMin)
                    {
                        yMin = rect.y;
                    }

                    if (rect.y + rect.height > yMax)
                    {
                        yMax = rect.y + rect.height;
                    }
                }
            }
            outRect.x = xMin;
            outRect.y = yMin;
            outRect.width = xMax - xMin;
            outRect.height = yMax - yMin;
        }
    },

    //获取缩放系数（显示所有元素）
    //len：总的长度
    //itemSpace：物品的间距
    //actualWidth：物品的宽度
    //itemNum：数量
    "getScaleForShowAll": function(len, itemSpace, actualWidth, itemNum)
    {
        if (itemNum <= 1)
        {
            return 1.0;
        }

        //  最后一张要全部显示 
        var shouldLen = itemSpace * (itemNum - 1) + actualWidth;
        if (len >= shouldLen)
        {
            return 1.0;
        }

        // 计算公式
        // itemSpace * (itemNum - 1) * scale + actualWidth * scale = len;
        return len / (itemSpace * (itemNum - 1) + actualWidth);
    },

    //p0, p1是两个点
    getRect: function(p0, p1)
    {
        var rect = new laya.maths.Rectangle();
        if (p0.x <= p1.x)
        {
            rect.x = p0.x;
            rect.width = p1.x - p0.x; 
        }
        else
        {
            rect.x = p1.x;
            rect.width = p0.x - p1.x;
        }

        
        if (p0.y <= p1.y)
        {
            rect.y = p0.y;
            rect.height = p1.y - p0.y; 
        }
        else
        {
            rect.y = p1.y;
            rect.height = p0.y - p1.y;
        }

        return rect;
    }
};