var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var MainSceneUI=(function(_super){
		function MainSceneUI(){
			
		    this.playBtn=null;
		    this.waitBox=null;
		    this.waitMatch=null;
		    this.online=null;
		    this.statisticsBtn=null;
		    this.playerInfo=null;
		    this.score=null;
		    this.stone=null;
		    this.vitality=null;
		    this.recordCard=null;
		    this.stoneBtn=null;
		    this.vitalityBtn=null;
		    this.bottomPanel=null;
		    this.settingBtn=null;
		    this.helpBtn=null;
		    this.itemBtn=null;
		    this.shopBtn=null;

			MainSceneUI.__super.call(this);
		}

		CLASS$(MainSceneUI,'ui.MainSceneUI',_super);
		var __proto__=MainSceneUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MainSceneUI.uiView);
		}
		MainSceneUI.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Button","props":{"y":560,"x":595,"visible":true,"var":"playBtn","stateNum":1,"skin":"game/btn.png","labelSize":20,"label":"开始游戏"}},{"type":"Box","props":{"y":539,"x":420,"visible":true,"var":"waitBox"},"child":[{"type":"Label","props":{"y":13,"x":240,"width":200,"text":"等待匹配：","fontSize":26,"color":"#eacbcb","anchorY":0.5,"anchorX":1,"align":"right"}},{"type":"Label","props":{"y":53,"x":240,"width":200,"text":"在线：","fontSize":26,"color":"#eacbcb","anchorY":0.5,"anchorX":1,"align":"right"}},{"type":"Label","props":{"y":13,"x":270,"width":100,"var":"waitMatch","text":"0/4","fontSize":26,"color":"#eacbcb","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":53,"x":270,"width":100,"var":"online","text":"0","fontSize":26,"color":"#eacbcb","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":108,"x":376},"child":[{"type":"Text","props":{"y":0,"x":213,"text":"那就","fontSize":50,"color":"#eacbcb"}},{"type":"Text","props":{"y":111,"x":72,"text":"1、发地方法规法规和人体会如何","fontSize":30,"color":"#eacbcb"}},{"type":"Text","props":{"y":162,"x":72,"text":"2、豆腐干大概豆腐干的豆腐干豆腐干","fontSize":30,"color":"#eacbcb"}},{"type":"Text","props":{"y":214,"x":72,"text":"3、法规和规范化规范化法规和规范化","fontSize":30,"color":"#eacbcb"}},{"type":"Text","props":{"y":265,"x":72,"text":"4、法规和能否给南非国内各方能够烦恼","fontSize":30,"color":"#eacbcb"}},{"type":"Text","props":{"y":317,"x":72,"text":"5、风格能否给南非国内废钢南非国内","fontSize":30,"color":"#eacbcb"}},{"type":"Text","props":{"y":368,"x":72,"text":"6、菜鸟房能够烦恼过分过分","fontSize":30,"color":"#eacbcb"}}]},{"type":"Button","props":{"y":610,"x":107,"var":"statisticsBtn","stateNum":1,"skin":"game/btn.png","label":"label"}},{"type":"Box","props":{"y":0,"x":0,"var":"playerInfo"},"child":[{"type":"Image","props":{"skin":"HeadImage/H00005_160.jpg"}},{"type":"Label","props":{"y":40,"x":195,"width":100,"var":"score","text":"label","fontSize":30,"color":"#b04947"}},{"type":"Label","props":{"y":40,"x":355,"width":100,"var":"stone","text":"label","fontSize":30,"color":"#b04947"}},{"type":"Label","props":{"y":44,"x":639,"width":100,"var":"vitality","text":"label","fontSize":30,"color":"#b04947"}},{"type":"Label","props":{"y":50,"x":987,"width":100,"var":"recordCard","text":"label","fontSize":30,"color":"#b04947"}},{"type":"Button","props":{"y":35,"x":464,"var":"stoneBtn","stateNum":1,"skin":"GameButton/confirmBtnNormal.png"}},{"type":"Button","props":{"y":33,"x":762,"var":"vitalityBtn","stateNum":1,"skin":"GameButton/confirmBtnNormal.png"}}]},{"type":"Box","props":{"y":656,"x":315,"var":"bottomPanel"},"child":[{"type":"Button","props":{"var":"settingBtn","stateNum":1,"skin":"GameButton/confirmBtnNormal.png"}},{"type":"Button","props":{"x":175,"var":"helpBtn","stateNum":1,"skin":"GameButton/confirmBtnNormal.png"}},{"type":"Button","props":{"x":350,"var":"itemBtn","stateNum":1,"skin":"GameButton/confirmBtnNormal.png"}},{"type":"Button","props":{"x":525,"var":"shopBtn","stateNum":1,"skin":"GameButton/confirmBtnNormal.png"}}]}]};
		return MainSceneUI;
	})(View);