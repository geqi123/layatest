
function MainScene()
{
	MainScene.super(this);
	var test = new Pokers([52,52,52,52,52,52,52,52,52], 1);
    this.addChild(test);
}
Laya.class(MainScene, "MainScene", MainSceneUI);

