//显示手牌
var HandPanel = function(width, height, 
    itemWidth, itemHeight, itemSpace, 
    items, compareTool)
{
    Laya.Sprite.call(this);

    this._convex = 40; //牌被选中时凸起的高度 
    this._convexMoveTime = 100; //从凸起到归位的时间 毫秒
    this._bottomConvexMoveTime = 300; //拿起底牌从凸起到归位的时间 毫秒
    this._bottomCardHoldConvexTime = 1000; //拿起底牌在手牌中显示为凸起的时间 毫秒
    this._dealInterval = 100; //发牌的间隔 毫秒

    this.width = width;
    this.height = height;
    this.itemWidth = itemWidth; //物件的宽
    this.itemHeight = itemHeight; //物件的高
    this.itemSpace = itemSpace; //物件的距离
    this.cards = items; //所有手牌
    this.compareTool = compareTool;

    var cardNode = new Laya.Sprite();
    this.addChild(cardNode);
    this.cardNode = cardNode; //放手牌的节点
    for (var i = 0; i < items.length; ++i)
    {
        this.cardNode.addChild(items[i]);
        items[i].visible = false;
    }

    this.cardScale = 1.0; //卡牌的缩放 适配
    this.rects = []; //每张牌的触摸区域


    this.touchInArea = false; //是否点在触摸区域
    this.canTouch = true; //在移动牌的时候禁止操作，移动牌时间很短，不会影响操作，为了过滤意外情况
    this.touchBegan = new laya.maths.Point(0, 0);
    this.touchEnd = new laya.maths.Point(0, 0);  

    this.selectCards = []; //当前选中的手牌

    this._initTouch();

    if (this.cards.length < 25)
    {
        //重连的时候，会出现只剩几根牌的情况，牌显示的大小和正常就不一样
        this._setCardScale(25);
    }
    else
    {
        this._setCardScale(this.cards.length);
    }

    // this.graphics.drawRect(0, 0, this.width, this.height, "#ffff00");
}


JSExtern.inherits(HandPanel, Laya.Sprite);

//设置选中回调
HandPanel.prototype.setSelectedCallback = function(caller, selectedCallback)
{
    this.caller = caller;
    this.caller._selectedCallback = selectedCallback;
}

//发票时间
HandPanel.prototype.getDealCardsTime = function()
{
    return this._dealInterval * this.cards.length;
}

//发牌
HandPanel.prototype.loadCards = function()
{
    this.dealNum = 0; //已经发牌的数量，用于显示发牌的效果 
    Laya.timer.loop(this._dealInterval, this, this._dealCards);
    
    Laya.SoundManager.playSound(SoundsConfig.deal, 0);
}

HandPanel.prototype.showAll = function()
{
    this.dealNum = this.cards.length;
    for (var i = 0; i < this.cards.length; ++i)
    {
        this.cards[i].visible = true;
    }

    this.freshCards();
}

HandPanel.prototype._dealCards = function()
{
    if (this.dealNum == this.cards.length)
    {
        Laya.timer.clear(this, this._dealCards);
        Laya.SoundManager.stopSound(SoundsConfig.deal);
        return;
    }
    this.cards[this.dealNum].visible = true;
    ++this.dealNum;
    this.freshCards(); 
}

//整理牌
HandPanel.prototype.freshCards = function()
{
    if (this.cards.length == 0)
    {
        return;
    }

    var cards = null;
    if (this.compareTool)
    {
        if (this.dealNum == this.cards.length)
        {
            this.compareTool.sortCards(this.cards);
            cards = this.cards;
        }
        else 
        {
            //只排序已经发的
            cards = [];
            cards.length = this.dealNum
            for (var i = 0; i < this.dealNum; ++i)
            {
                cards[i] = this.cards[i];
            }
            this.compareTool.sortCards(cards);
            for (var i = 0; i < this.dealNum; ++i)
            {
                this.cards[i] = cards[i];
            }
        }
    }
    else
    {
        cards = this.cards;
    }

    var scale = this.cardScale;
    var itemLen = this.itemSpace * scale;
    var actualWidth = this.itemWidth * scale;
    var beginX = MathClient.getFirstPosOfFoldItem(this.width, itemLen, actualWidth, cards.length);
    for (var i = 0; i < cards.length; ++i)
    {
        cards[i].zOrder = i;
        cards[i].scaleX = this.cards[i].scaleY = scale;
        cards[i].pos(beginX + i * itemLen, 0);

        //bug 因为牌已经回到起始位置，所以选中标记也要取消
        cards[i].setSelect(false);
    }
}

//选主过程 和 亮主的时候用
HandPanel.prototype.freshMajorFlag = function()
{
    for (var i = 0; i < this.cards.length; ++i)
    {
        var card = this.cards[i];
        if (this.compareTool.isMajorByID(card.id) == true)
        {
            card.showMajorFlag();
        }
        else
        {
            card.hideMajorFlag();
        }
    }
}

//追加新的牌
HandPanel.prototype.addCards = function(items)
{
    for (var i = 0; i < items.length; ++i)
    {
        this.cardNode.addChild(items[i]);
    }

    this.cards = this.cards.concat(items);
    this.dealNum = this.cards.length;
    this._setCardScale(this.cards.length);
    this.freshCards();

    for (var i = 0; i < items.length; ++i)
    {                    
        var from = items[i].y - this._convex * this.cardScale;
        var to = items[i].y;
        items[i].y = from;
        Laya.Tween.to(items[i], {y: to}, this._bottomConvexMoveTime, null, null, this._bottomCardHoldConvexTime);
    } 

    Laya.timer.once(this._bottomConvexMoveTime + this._bottomCardHoldConvexTime + 100,
         this,
         function()
            {
                this._freshCardsRect();
            }
        );
}

//不重新计算缩放
HandPanel.prototype.addCardsSimple = function(items)
{
    for (var i = 0; i < items.length; ++i)
    {
        this.cardNode.addChild(items[i]);
    }

    this.cards = this.cards.concat(items);
    this.dealNum = this.cards.length;
    // this._setCardScale(this.cards.length);
    this.freshCards();
    this._freshCardsRect();

    for (var i = 0; i < items.length; ++i)
    {                    
        var from = items[i].y - this._convex * this.cardScale;
        var to = items[i].y;
        items[i].y = from;
        Laya.Tween.to(items[i], {y: to}, this._bottomConvexMoveTime, null, null, this._bottomCardHoldConvexTime);
    } 
}

HandPanel.prototype.getAddCardsMoveTime = function()
{
    return this._bottomConvexMoveTime + this._bottomCardHoldConvexTime;
}

//移除卡牌
HandPanel.prototype.removeCards = function(ids)
{
    this._setCardScale(this.cards.length - ids.length);
    this.simpleRemoveCards(ids);
}

//简单的移除开盘，不重新计算牌的缩放
HandPanel.prototype.simpleRemoveCards = function(ids)
{
    var selectCards = this._getSelectCards(ids);

    // 整理  
    var count = 0;
    for (var i = 0; i < this.cards.length; ++i)
    {
        var card = this.cards[i];
        this.cards[i - count] = card;
        if (ContainerExtend.includeItem(selectCards, card) == true)
        {
            ++count;
        }
        // if (selectCards.has(card) == true)
        // {
        //     ++count;
        // }
    }

    //移除，这里把牌转到出牌区域
    this.cards.length = this.cards.length - count;
    
    // var result = Array.from(selectCards);
    // for (var i = 0; i < result.length; ++i)
    // {
    //     result[i].removeSelf();
    // }    
    for (var i = 0; i < selectCards.length; ++i)
    {
        selectCards[i].removeSelf();
    }

    this.dealNum = this.cards.length;
    this.freshCards();
    this._freshCardsRect();

    //选中的牌也相应的清除
    ContainerExtend.removeArray(this.selectCards, ids);

    // return result;
    return selectCards;
}

HandPanel.prototype.getSelectedIDs = function()
{
    var result = [];
    for (var i = 0; i < this.cards.length; ++i)
    {
        var poker = this.cards[i];
        if (poker.isSelect() == true)
        {
            result.push(poker.getID());
        }
    }
    return result;
}

HandPanel.prototype._getSelectCards = function(ids)
{
    // 不使用es6特性 包含Set Map
    // var result = new Set();
    var result = [];
    for (var i = 0; i < ids.length; ++i)
    {
        var id = ids[i];
        var findSuccess = false;
        for (var j = 0; j < this.cards.length; ++j)
        {
            var d = this.cards[j];
            if (d.isSelect() == true && d.getID() == id && d.isFlag() == false)
            {
                d.setFlag(true);
                // result.add(d);
                result.push(d);
                findSuccess = true;
                break;
            }
        }

        if (findSuccess == true)
        {
            continue;
        }

        for (var j = 0; j < this.cards.length; ++j)
        {
            var d = this.cards[j];
            if (d.isFlag() == false && d.getID() == id)
            {
                d.setFlag(true);
                // result.add(d);
                result.push(d);                
                break;
            }
        }		
    }

    return result;
}

//计算牌显示的大小 适配
HandPanel.prototype._setCardScale = function(cardNum)
{
    var scale = MathClient.getScaleForShowAll(this.width, this.itemSpace, this.itemWidth, cardNum);
    this.cardNode.pos(0, this.height - this.itemHeight * scale);
    this.cardScale = scale;

    // JSExtern.log("HandPanel.prototype._setCardScale", scale);
}

//更新手牌的触摸区域
HandPanel.prototype._freshCardsRect = function()
{
    this.rects.length = this.cards.length;
    for (var i = 0; i < this.cards.length; ++i)
    {
        var card = this.cards[i];

        this.rects[i] = [];
        if (card.isSelect() == true)
        {
            //0是凸起的那部分
            var leftTop0 = new laya.maths.Point(0, 0);
            var leftTop1 = new laya.maths.Point(0, this._convex);
            var rightBottom0 = new laya.maths.Point(0, 0);
            var rightBottom1 = new laya.maths.Point(0, 0);
            if (i + 1 == this.cards.length)
            {
                //最后一张，整张区域都是
                rightBottom0.x = this.itemWidth;
                rightBottom0.y = this._convex;
                rightBottom1.x = this.itemWidth;
                rightBottom1.y = this.itemHeight;
            }
            else
            {
                if (this.cards[i + 1].isSelect() == false)
                {
                    //后一张没有选中，那么就是上边大的区域，加左边窄的区域
                    rightBottom0.x = this.itemWidth;
                    rightBottom0.y = this._convex;
                    rightBottom1.x = this.itemSpace;
                    rightBottom1.y = this.itemHeight;
                }
                else
                {
                    //右边的牌也是选中，那么只有左边窄的区域
                    rightBottom0.x = this.itemSpace;
                    rightBottom0.y = this._convex;
                    rightBottom1.x = this.itemSpace;
                    rightBottom1.y = this.itemHeight;
                }
            }

            this.rects[i].length = 2;
            this.rects[i][0] = new laya.maths.Rectangle();
            this.rects[i][1] = new laya.maths.Rectangle();
            LayaExtend.getRectInWorld(card, leftTop0, rightBottom0, this.rects[i][0]);
            LayaExtend.getRectInWorld(card, leftTop1, rightBottom1, this.rects[i][1]);
        }
        else
        {
            var leftTop = new laya.maths.Point(0, 0);
            var rightBottom = new laya.maths.Point(0, 0);
            if (i + 1 == this.cards.length)
            {
                rightBottom.x = this.itemWidth;
                rightBottom.y = this.itemHeight;
            }
            else
            {
                rightBottom.x = this.itemSpace;
                rightBottom.y = this.itemHeight;
            }
            this.rects[i].length = 1;
            this.rects[i][0] = new laya.maths.Rectangle();
            LayaExtend.getRectInWorld(card, leftTop, rightBottom, this.rects[i][0]);
        }
    }

    // // Laya.stage.scene = gameScene;
    // if (Laya.stage.scene.debugNode)
    // {
    //     Laya.stage.scene.debugNode.destroy();
    // }
    // {
    //     var sprite = new Laya.Sprite();
    //     Laya.stage.scene.addChild(sprite);
    //     Laya.stage.scene.debugNode = sprite;
    //     for (var i = 0; i < this.rects.length; i += 2)
    //     {
    //         // var color = i % 2 == 0 ? "#ff0000" : "00ff00";
    //         var color = "00ff00"; 
    //         for (var j = 0; j < this.rects[i].length; ++j)
    //         {
    //             var rect = this.rects[i][j];
    //             sprite.graphics.drawRect(rect.x, rect.y, rect.width, rect.height, color);
    //         }
    //     }
    // }
} 

//触摸处理
HandPanel.prototype._initTouch = function()
{
    this.on(Laya.Event.MOUSE_DOWN, this, _mouseHandler);
    this.on(Laya.Event.MOUSE_MOVE, this, _mouseHandler);
    this.on(Laya.Event.MOUSE_UP, this, _mouseHandler);
    this.on(Laya.Event.MOUSE_OUT, this, _mouseHandler);
    this.size(this.width, this.height);

    function _mouseHandler(e)
    {
        switch (e.type)
        {
            case Laya.Event.MOUSE_DOWN:
            {
                // JSExtern.log("-->MOUSE_DOWN");
                
                this.touchInArea = true;

                this.touchBegan.x = e.stageX;
                this.touchBegan.y = e.stageY;
                this.touchEnd.x = e.stageX;
                this.touchEnd.y = e.stageY;  
                this._showSelectFlag(); 
            }
            break;

            case Laya.Event.MOUSE_MOVE:
                if (this.touchInArea == false)
                {
                    return;
                }
                this.touchEnd.x = e.stageX;
                this.touchEnd.y = e.stageY;  
                this._showSelectFlag();  
            break;

            case Laya.Event.MOUSE_UP:
            {
                if (this.touchInArea == false)
                {
                    return;
                }
                this.touchInArea = false;
                this.touchEnd.x = e.stageX;
                this.touchEnd.y = e.stageY;                
                this._touchHandle();
            }
            break;

            case Laya.Event.MOUSE_OUT:
                this.touchInArea = false;
                for (var i = 0; i < this.cards.length; ++i)
                {
                    this.cards[i].hideSelectFlag();
                }
            break;

            default:
            break;
        }
    }
} 

HandPanel.prototype.clearSelected = function()
{
    for (var i = 0; i < this.cards.length; ++i)
    {
        this.cards[i].setSelect(false);
    }
}

HandPanel.prototype._showSelectFlag = function()
{
    if (this.canTouch == false)
    {
        return;
    }

    for (var i = 0; i < this.cards.length; ++i)
    {
        this.cards[i].hideSelectFlag();
    }

    var touchRect = MathClient.getRect(this.touchBegan, this.touchEnd);
    var indexs = MathClient.getIndexRange(touchRect, this.rects);
    if (indexs.length == 0)
    {
        return;
    } 

    for (var i = 0; i < indexs.length; ++i)
    {
        this.cards[indexs[i]].showSelectFlag();
    }
}

//手牌选取处理
HandPanel.prototype._touchHandle = function()
{
    if (this.canTouch == false)
    {
        return;
    }

    for (var i = 0; i < this.cards.length; ++i)
    {
        this.cards[i].hideSelectFlag();
    }

    var touchRect = MathClient.getRect(this.touchBegan, this.touchEnd);
    var indexs = MathClient.getIndexRange(touchRect, this.rects);
    if (indexs.length == 0)
    {
        return;
    }

    var startIndex = indexs[0];
    var endIndex = indexs[indexs.length - 1];

    var allSelect = true;
    for (var i = startIndex; i <= endIndex; ++i)
    {
        var card = this.cards[i];
        if (card.isSelect() == false)
        {
            allSelect = false;
            break;
        }   
    }

    if (allSelect == false)
    {
        for (var i = startIndex; i <= endIndex; ++i)
        {
            var card = this.cards[i];
            if (card.isSelect() == false)
            {
                card.setSelect(true);
                if (this._convexMoveTime > 0)
                {
                    Laya.Tween.to(card, {y:card.y - this._convex * card.scaleX}, this._convexMoveTime);
                }
            }
        }
    }
    else
    {
        for (var i = startIndex; i <= endIndex; ++i)
        {
            var card = this.cards[i];
            card.setSelect(false);
            if (this._convexMoveTime > 0)
            {
                Laya.Tween.to(card, {y:card.y + this._convex * card.scaleX}, this._convexMoveTime);
            }
        }
    }

    var selected = this.getSelectedIDs();
    this.selectCards = selected;

    if (this.caller)
    {
        this.caller._selectedCallback(this, selected);
    }   

    this.canTouch = false;
    Laya.timer.once(this._convexMoveTime + 50,
        this,
        function()
        {
            this._freshCardsRect();
            this.canTouch = true;
        }
    );
}
