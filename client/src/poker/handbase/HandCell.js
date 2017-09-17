
//牌
function HandCell(id)
{
    Laya.Sprite.call(this);

    this.id = id;
    this.select = false;
    this.flag = false;
}

JSExtern.inherits(HandCell, Laya.Sprite);

HandCell.prototype.getID = function()
{
    return this.id;
}

HandCell.prototype.isSelect = function()
{
    return this.select;
}

HandCell.prototype.setSelect = function(v)
{
    this.select = v;
}

HandCell.prototype.isFlag = function()
{
    return this.flag;
}

HandCell.prototype.setFlag = function(v)
{
    this.flag = v;
}
