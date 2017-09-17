
var RandomExtend = 
{
    "getNoRepeat": function(data, num)
    {
        if (data.length == 0 || num <= 0 || num > data.length)
        {
            return;
        }

        var result = [];
        var temp = data.slice(0);

        var leftLen = data.length;
        for (var i = 0; i < num; ++i)
        {
            var index = Math.floor(Math.random() * leftLen);
            var v = temp[index];
            result.push(v);
            temp[index] = temp[leftLen - 1];
            --leftLen;
        }
        return result;
    },

    //返回0~num的随机整数，不含num
    "getRandInt": function(num)
    {
        return Math.floor(Math.random() * num);
    }
}

// module.exports = RandomExtend