var JSExtern = 
{
    "inherits": function (Child, Parent)
    {
        var F = function () {};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
    },

    "getSimpleTime": function()
    {
        var data = new Date();
        var hour = data.getHours();
        var min = data.getMinutes();
        var sec = data.getSeconds();
        var milliSec = data.getMilliseconds();
        return hour + "-" + min + " " + sec + "." + milliSec;
    },

    "log": function(str1, str2, str3)
    {
        //这种方法在安卓中打不出日志
        // var args = Array.prototype.slice.call(arguments);
        // args.unshift(this.getSimpleTime() + ":");
        // console.log.apply(console, args);
        var str = str1;
        if (str2) str += str2;
        if (str3) str += str3;
        console.log(str);
    },

    "error": function(str1, str2, str3)
    {
        var str = "!!!error "
        str += str1;
        if (str2) str += str2;
        if (str3) str += str3;
        console.error(str);   
    },

    //string format
    //使用方法
    // "{0},{1},hehe".format("hello","world");
    setStringFormat: function()
    {
        String.prototype.format = function()
        {
            if (arguments.length == 0)
            {
                return this;
            }
            
            for (var str = this, index = 0; index < arguments.length; ++index) 
            {
                str = str.replace("{" + index + "}", arguments[index]);
            }

            return str;
        };
    }
}
