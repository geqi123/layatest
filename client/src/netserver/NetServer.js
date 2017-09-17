

function NetServer(name)
{
    this.socket = null;
    this.receiveTime = 0; //毫秒 接受到报文的时间 如果太久没收到，就说明断线了
    this.receiveTimeout = 5000; //超时时间
    this.serverIndex = 0;
    Laya.timer.loop(2000, this, this.checkNet);
}

NetServer.prototype.init = function()
{
    this.socket = new laya.net.Socket();
    this.socket.timeout = 3000;
    // this.socket.connect("192.168.1.102", 9000);
    // this.socket.connect("39.108.188.159", 9000);
    // this.socket.connect("geqi99.com", 9000);
    // this.socket.connectByUrl("ws://www.geqi99.com:9000");
    if (this.serverIndex == 0)
    {
        this.socket.connect("192.168.1.155", 9000);
        // this.serverIndex = 1;
    }

    this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
    this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
    this.socket.on(Laya.Event.ERROR, this, this.onSocketError);
    this.socket.on(Laya.Event.MESSAGE, this, this.onSocketReceiveMsg);
}

NetServer.prototype.onSocketOpen = function(e)
{
    this.receiveTime = new Date().getTime();
    JSExtern.log("socket open");
}

NetServer.prototype.onSocketClose = function(e)
{
    JSExtern.log("socket close");
};

NetServer.prototype.onSocketError = function(e)
{
    JSExtern.log("socket error");        
};

NetServer.prototype.onSocketReceiveMsg = function(e)
{
    this.receiveTime = new Date().getTime();
};

NetServer.prototype.sendMsg = function(e)
{
    var str = JSON.stringify(e);
    if (this.socket && this.socket.connected == true)
    {
        this.socket.send(str);
    }
}

NetServer.prototype.checkNet = function()
{
    if (new Date().getTime() - this.receiveTime > this.receiveTimeout)
    {
        this.receiveTime = new Date().getTime();
        JSExtern.log("socket timeout, reconnect...");
        if (this.socket)
        {
            this.socket.close();
        }
        this.init();            
        return;
    }

    if (this.socket)
    {
        //this.socket.connected 为true并不表示网络可用，手工断线，这个就是true
        if (this.socket.connected == true)
        {
            var msg = {};
            msg.cmd = 0;
            msg.player = 100000;
            this.sendMsg(msg);
            return ;
        }
        JSExtern.log("socket close, reconnect...");
        this.socket.close();
        this.init();
    }
}

