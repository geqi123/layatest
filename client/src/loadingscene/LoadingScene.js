window.screenWidth = 1280;
window.screenHeight = 720;
document.bgColor = "#552570";
Laya.init(window.screenWidth, window.screenHeight, laya.webgl.WebGL);

Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;

Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
Laya.Stat.show(0,0);
Laya.stage.frameRate = "mouse";


//不能直接写 if (conch) 会报undefined
if (typeof(conch) != "undefined")
{
    JSExtern.log("====>conch sOS:", conch.config.getOS());
    conch.config.setSlowFrame(true);
}

if (typeof(Laya.Render) != "undefined")
{
    JSExtern.log("====>Laya.Render:", "false", "true");
    JSExtern.log("===>Laya.Render isConchNode:", Laya.Render.isConchNode == true ? "true" : "false"); 
    JSExtern.log("====>Laya.Render isConchApp:", Laya.Render.isConchApp == true ? "true" : "false"); 
    JSExtern.log("===>Laya.Render isConchWebGL:", Laya.Render.isConchWebGL == true ? "true" : "false"); 
    JSExtern.log("====>Laya.Render isWebGL:", Laya.Render.isWebGL == true ? "true" : "false"); 
    JSExtern.log("====>Laya.Render is3DMode:", Laya.Render.is3DMode == true ? "true" : "false"); 
}
JSExtern.setStringFormat();


function LoadingScene()
{
	Laya.Sprite.call(this);
    this.imagesWeight = 0.7;
    this.fontsWeight = 0.1;
    this.animsWeight = 0.2;

    //加载界面需要的资源，来显示界面
    //由于资源还没加载，因此这个界面不要用编辑器编辑
    //加载完后可以释放资源
    var loadingImages = [
        {
            url: [
                    'loading/progress.png',
                    'loading/progress$bar.png'
                 ],
            type: laya.net.Loader.IMAGE
        }
    ];

    Laya.loader.load(loadingImages, laya.utils.Handler.create(this, this.loadLoadingRes));
}
JSExtern.inherits(LoadingScene, Laya.Sprite);

LoadingScene.prototype.loadLoadingRes = function()
{
    var progressBar = new laya.ui.ProgressBar("loading/progress.png");
    progressBar.pos(50,300);
    progressBar.width = 300;
    progressBar.sizeGrid = "5,5,5,5";
    progressBar.value = 0;
    progressBar.preValue = 0;

    //当progressBar的value值改变时触发
    progressBar.changeHandler = new Laya.Handler(this, function(value)
    {
        // trace("进度: "+ (value * 100).toFixed(2) +"%");
    });
    this.addChild(progressBar);
    this.progressBar = progressBar;

    this.loadImages();
}

LoadingScene.prototype.loadImages = function()
{  
    function onImagesLoaded(pro)
    {
        // trace("加载图片:" + (pro * 100).toFixed(2) + "%");
        this.progressBar.value = this.progressBar.preValue + this.imagesWeight * pro;
        if (pro >= 1)
        {
            var time = new Date().getTime();
            trace("load images end:" + time + ", usetime:" + (time - this.loadImagesTiem) + "ms");
            this.progressBar.preValue = this.imagesWeight;
            this.loadFont();
        }  
    }

    var time = new Date().getTime();
    JSExtern.log("begin load res:" + time);
    JSExtern.log("begin load image:" + time);
    this.loadTime = time;
    this.loadImagesTiem = time;
    Laya.loader.load(ImagesRes, null, Laya.Handler.create(this, onImagesLoaded.bind(this), null, false));  
}

LoadingScene.prototype.loadFont = function()
{
    function onFontLoaded(index, bitmapFont)
    {
        var fontName = FontsRes.names[index];
		bitmapFont.setSpaceWidth(10);
		Laya.Text.registerBitmapFont(fontName, bitmapFont);


        var file = FontsRes.fontRoot + FontsRes.files[index];
        JSExtern.log("load font:", index, " ", file);
        this.progressBar.value = this.progressBar.preValue + this.fontsWeight * ((index + 1) / FontsRes.files.length);
        if (index + 1 == FontsRes.files.length)
        {
            var time = new Date().getTime();
            JSExtern.log("lond font end:" + time + ", usetime:" + (time - this.loadFontTiem) + "ms");
            this.progressBar.preValue += this.fontsWeight;
            this.loadAnimas();
        }
    }

    var time = new Date().getTime();
    JSExtern.log("begin load font:" + time);
    this.loadFontTiem = time;
    for (var i = 0; i < FontsRes.files.length; ++i)
    {
        var res = FontsRes.fontRoot + FontsRes.files[i];
        var bitmapFont = new Laya.BitmapFont();
        var index = i;
        bitmapFont.loadFont(res, new Laya.Handler(this, onFontLoaded.bind(this), [index, bitmapFont])); //注意这里的index不能直接用i
    }
}

LoadingScene.prototype.loadAnimas = function()
{
    var time = new Date().getTime();
    JSExtern.log("begin load anims:" + time);
    AnimationsConfig.init();
    var time2 = new Date().getTime();
    JSExtern.log("end load animms:" + time + ",usetime:" + (time2 - time) + "ms");
    JSExtern.log("end load res:" + time + ", usetime:" + (time - this.loadTime) + "ms");

    this.progressBar.preValue += this.animsWeight;
    this.progressBar.value = this.progressBar.preValue;

    var animation = new Laya.Animation();
    animation.interval = 100;
    animation.play(0, true, AnimationsConfig.breakExplode);
    animation.on(Laya.Event.COMPLETE, this, function(animation)
        {
            animation.removeSelf();
            this.loadFinish();
        }.bind(this), [animation]);
    animation.x = 400;
    animation.y = 300;
    this.addChild(animation);
    var bounds = animation.getGraphicBounds();
    animation.pivot(bounds.width / 2, bounds.height / 2);
}

LoadingScene.prototype.loadFinish = function()
{  
    var netServer = new NetServer(); 
    netServer.init();
    Laya.netServer = netServer;  
    
    Laya.stage.scene.destroy();
    var mainscene = new MainScene();
    Laya.stage.scene = mainscene;
    Laya.stage.addChild(mainscene); 
}

var loadingscene = new LoadingScene();
Laya.stage.scene = loadingscene;
Laya.stage.addChild(loadingscene);
