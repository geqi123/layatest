var LayaExtend = 
{
    "swallowAllTouch": function(node)
    {
        Laya.timer.frameOnce(1, null, function(){
            var Event = laya.events.Event;
            var sprite = new Laya.Sprite();
            sprite.zOrder = -2;
            node.addChild(sprite);

            var pos = node.globalToLocal(new laya.maths.Point(0, 0));
            sprite.pos(pos.x, pos.y);

            sprite.size(window.screenWidth, window.screenHeight);
            sprite.on(Event.CLICK, null, function(e)
            {
                e.stopPropagation();       
            });       
        });
    },

    //将from的位置转为to的局部坐标
    "convertPos": function(from, to)
    {
        var fromInWorld = from.parent.localToGlobal(new laya.maths.Point(from.x, from.y));
        return to.globalToLocal(fromInWorld);
    },

    //将对象从原节点中移除，添加到新的节点上
    "changeParent": function(child, newParent)
    {
        var pos = LayaExtend.convertPos(child, newParent);
        child.removeSelf();
        child.pos(pos.x, pos.y);
        newParent.addChild(child);
    },

    //将局部区域转化为全局区域
    //target：对象
    //leftTop: 左上点
    //rightBottom: 右下点
    //outRect：输出
    "getRectInWorld": function(target, leftTop, rightBottom, outRect)
    {
        var leftTopInWorld = target.localToGlobal(leftTop);
        var rightBottomInWorld = target.localToGlobal(rightBottom);
        outRect.x = leftTopInWorld.x;
        outRect.y = leftTopInWorld.y;
        outRect.width = rightBottomInWorld.x - leftTopInWorld.x;
        outRect.height = rightBottomInWorld.y - leftTopInWorld.y;       
    }  
}