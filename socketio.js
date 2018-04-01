/**
 * Created by yuiff on 2018/4/2.
 */
/*
 封装socket.io,为了获取server以便监听.
 2016年8月8日10:28:24
 */
var socketio = {};
var socket_io = require('socket.io');

//获取io
socketio.getSocketio = function(server){

    var io = socket_io.listen(server);

    io.sockets.on('connection', function (socket) {
        console.log('连接成功');
        socket.on('click1',function(){
            console.log('监听点击事件');
            var datas = [1,2,3,4,5];
            socket.emit('click2', {datas: datas});
            socket.broadcast.emit('click2',  {datas: datas});
        })
    })
};

module.exports = socketio;