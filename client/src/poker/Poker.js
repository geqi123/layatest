
//牌
function Poker(id)
{
    HandCell.call(this, id);

    // var icon = new Laya.Sprite();
    // icon.graphics.drawTexture(SPoker.cards[id].iconRes);
    // this.addChild(icon);
    var icon = new laya.ui.Image();
    icon.skin = SPoker.root + SPoker.cards[id].icon;
    this.addChild(icon);

    this.icon = icon;

    this.width = icon.width;
    this.height = icon.height;
}

JSExtern.inherits(Poker, HandCell);


Poker.createCards = function(ids)
{
    var cards = [];
    for (var i = 0; i < ids.length; ++i)
    {
        cards[i] = new Poker(ids[i]);
    }

    return cards;   
}

Poker.createCardss = function(idss)
{
    var cardss = [];
    for (var i = 0; i < idss.length; ++i)
    {
        var cards = [];
        for (var j = 0; j < idss[i].length; ++j)
        {
            cards[j] = new Poker(idss[i][j]);
        }
        cardss.push(cards);
    }

    return cardss;
}

Poker.createSameCards = function(id, num)
{
    var cards = [];
    for (var i = 0; i < num; ++i)
    {
        cards[i] = new Poker(id);
    }

    return cards;   
}

Poker.prototype.showSelectFlag = function()
{
    if (!this.maskSprite)
    {
        var sprite = new Laya.Sprite();
        sprite.graphics.drawRect(0, 0, this.icon.width, this.icon.height, "#808080");
        sprite.alpha = 0.3;
        sprite.zOrder = 1;
        this.addChild(sprite);
        this.maskSprite = sprite;
    }
    this.maskSprite.visible = true;
}

Poker.prototype.hideSelectFlag = function()
{
    // this.icon.alpha = 1;
    if (this.maskSprite)
    {
        this.maskSprite.visible = false;
    }
}

Poker.prototype.showMajorFlag = function()
{
    if (SPoker.isJokerID(this.id) == true)
    {
        return;
    }

    if (!this.majorSprite)
    {
        var sprite = new laya.ui.Image();
        sprite.skin = "cards/MainCardFlag.png";
        sprite.pos(11, 108);
        this.addChild(sprite);
        this.majorSprite = sprite;
    }

    this.majorSprite.visible = true;
}

Poker.prototype.hideMajorFlag = function()
{
    if (this.majorSprite)
    {
        this.majorSprite.visible = false;
    }
}

Poker.prototype.showBiggestFlag = function(show)
{
    if (show == true)
    {
        if (!this.biggestSprite)
        {
            var sprite = new laya.ui.Image();
            sprite.skin = "cards/Big.png";
            sprite.anchorX = 1;
            sprite.anchorY = 0;
            sprite.pos(this.icon.width, 0);
            this.addChild(sprite);
            this.biggestSprite = sprite;            
        }
        this.biggestSprite.visible = true;
    }
    else
    {
        if (this.biggestSprite)
        {
            this.biggestSprite.visible = false;
        }
    }
}

Poker.prototype.showFirstFlag = function()
{
    var sprite = new laya.ui.Image();
    sprite.skin = "cards/FirstHand.png";
    sprite.anchorX = 1;
    sprite.anchorY = 0;
    sprite.pos(this.icon.width, 0);
    this.addChild(sprite);    
}

Poker.prototype.showFirstFlag2 = function()
{
    var sprite = new laya.ui.Image();
    sprite.skin = "cards/FirstHand.png";
    sprite.anchorX = 1;
    sprite.anchorY = 0;
    sprite.pos(this.icon.width - 20, 0);
    this.addChild(sprite);    
}