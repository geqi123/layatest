
//容器类操作扩展

var ContainerExtend = 
{
    //删除数组中制定的元素
    //target []
    //removes set
    "removeSet": function(target, removes)
    {
        var count = 0;
        for (var i = 0; i < target.length; ++i)
        {
            var item = target[i];
            target[i - count] = item;
            if (removes.has(item) == true)
            {
                ++count;
            }
        }   

        target.length -= count;
    },

    //删除数组中指定的元素 
    //注意不会删除所有的相同的元素，比如removes中有两个2，target中有三个2，那么结束后target中还有一个2
    //target []
    //removes []
    "removeArray": function(target, removes)
    {
        for (var i = 0; i < removes.length; ++i)
        {
            for (var j = 0; j < target.length; ++j)
            {
                if (removes[i] == target[j])
                {
                    target[j] = null;
                    break;
                }
            }
        }

        var count = 0;
        for (var i = 0; i < target.length; ++i)
        {
            var item = target[i];
            target[i - count] = item;
            if (item == null)
            {
                ++count;
            }
        }   

        target.length -= count;
    },

    //一个数组中是否有元素在集合中
    "isArrayAtleastOneItemInSet": function(set, array)
    {
        for (var i = 0; i < array.length; ++i)
        {
            if (set.has(array[i]) == true)
            {
                return true;
            }
        }

        return false;
    },

    //是否包含有item
    "includeItem": function(items, item)
    {
        for (var i = 0; i < items.length; ++i)
        {
            if (items[i] == item)
            {
                return true;
            }
        }

        return false;
    },

    //把数组中的元素加到集合中
    "addArrayToSet": function(array, set)
    {
        for (var i = 0; i < array.length; ++i)
        {
            set.add(array[i]);
        }
    },

    //数组a是否包含数组b
    "isArrayIncludeArray" : function(a, b)
    {
        var aTemp = a.slice(0);
        for (var i = 0; i < b.length; ++i)
        {
            var findSuccess = false;
            for (var j = 0; j < aTemp.length; ++j)
            {
                if (b[i] == aTemp[j])
                {
                    findSuccess = true;
                    aTemp[j] = undefined;
                    break;
                }
            }

            if (findSuccess == false)
            {
                return false;
            }
        }

        return true;
    }
}