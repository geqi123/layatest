
//一组牌
function Pokers(ids, scale)
{
    Laya.Sprite.call(this);

    if (ids.length == 0)
    {
        return;
    }

    this.ids = ids;
    this.scale = scale;
    this.scaleX = scale;
    this.scaleY = scale;

    var cards = Poker.createCards(ids);
    this.cards = cards;

    for (var i = 0; i < cards.length; ++i)
    {
        var card = cards[i];
        card.pos(i * SPoker.cardSpace, 0);
        this.addChild(card);
    }  

    this.width = ((ids.length - 1) * SPoker.cardSpace + SPoker.cardWidth) * scale;
    this.height = SPoker.cardHeight * scale;
}

JSExtern.inherits(Pokers, Laya.Sprite);

Pokers.prototype.removeCards = function(ids)
{
    var targetCards = [];

    //牌是按顺序放的，因此不用每次都从头开始查找
    var j = 0;
    for (var i = 0; i < ids.length; ++i)
    {
        for (; j < this.cards.length; ++j)
        {
            if (ids[i] == this.cards[j].id)
            {
                this.cards[j].removeSelf();
                targetCards.push(this.cards[j]);
                ++j; //bug j需要往后移
                break;
            }
        }
    }

    ContainerExtend.removeArray(this.cards, targetCards);

    //重新调整下位置
    for (var i = 0; i < this.cards.length; ++i)
    {
        var card = this.cards[i];
        card.pos(i * SPoker.cardSpace, 0);
    }  
}

Pokers.prototype.addCards = function(cards)
{
    for (var i = 0; i < cards.length; ++i)
    {
        var card = new Poker(cards[i]);
        this.addChild(card);
        this.cards.push(card);
    }
}

Pokers.prototype.freshPos = function()
{
    for (var i = 0; i < this.cards.length; ++i)
    {
        var card = this.cards[i];
        card.pos(i * SPoker.cardSpace, 0);
        card.zOrder = i;
    }
}

////////////////////////////////////////////////////////
function Pokers2(cards, scale)
{
    Laya.Sprite.call(this);

    if (cards.length == 0)
    {
        return;
    }

    this.scale = scale;
    this.cards = cards;
    this.scaleX = scale;
    this.scaleY = scale;

    for (var i = 0; i < cards.length; ++i)
    {
        var card = cards[i];
        card.pos(i * SPoker.cardSpace, 0);
        this.addChild(card);
    }  

    this.width = ((cards.length - 1) * SPoker.cardSpace + SPoker.cardWidth) * scale;
    this.height = SPoker.cardHeight * scale;
}

JSExtern.inherits(Pokers2, Laya.Sprite);