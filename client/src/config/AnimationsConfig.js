

//动画信息

var AnimationsConfig = 
{
    root: "Animation/",

    breakExplode: "Break_Explode",
    breakPo: "Break_Po",
    ribbonGrey: "Ribbon_Grey",
    ribbonRed: "Ribbon_Red",    
    setBottom: "SetBottom",    
    tractor: "Tractor",    
    victory: "Victory",    
    timeWarning: "TimeWarning",

    //这里不能用this.breakExplode 或者 AnimationsConfig.breakExplode
    anims: [
        { name: "Break_Explode", path: "Break/Explode/", begin: 0, num: 10 },
        { name: "Break_Po", path: "Break/Po/", begin: 0, num: 2 },
        { name: "Ribbon_Grey", path: "Ribbon/Grey/", begin: 0, num: 6 },
        { name: "Ribbon_Red", path: "Ribbon/Red/", begin: 0, num: 8 },
        { name: "SetBottom", path: "SetBottom/", begin: 0, num: 10 },
        { name: "Tractor", path: "Tractor/", begin: 0, num: 5 },
        { name: "Victory", path: "Victory/", begin: 0, num: 11 },
        { name: "TimeWarning", path: "Warning/", begin: 0, num: 6 }
    ],

    init: function()
    {
        for (var i = 0; i < this.anims.length; ++i)
        {
            var d = this.anims[i];
            var images = this.getImages(this.root + d.path, d.begin, d.num);
            Laya.Animation.createFrames(images, d.name);      
        }
    },

    getImages: function(root, begin, num)
    {
        var images = [];
        for (var i = 0; i < num; ++i)
        {
            var image = root;
            if (i <= 9)
            {
                image += "0" + i + ".png"
            }
            else
            {
                image += i + ".png";
            }
            images.push(image);
        }
        return images;
    }

}