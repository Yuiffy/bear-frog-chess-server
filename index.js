const WebSocket = require('ws');
var WebSocketServer = WebSocket.Server
var http = require("http")
var url = require("url");
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

// var wss = new WebSocketServer({server: server})
const wss1 = new WebSocket.Server({noServer: true});
const wss2 = new WebSocket.Server({noServer: true});
console.log("websocket server created")

wss1.on("connection", function (ws) {
    // var id = setInterval(function () {
    //     ws.send(JSON.stringify(new Date()), function () {
    //     })
    // }, 1000);

    console.log("websocket connection open, ws=", ws);

    // 发送消息
    ws.on('message', (message) => {
        console.log(message);
        // Broadcast to everyone else.
        wss1.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", function () {
        // console.log("websocket connection close", id);
        // clearInterval(id)
    })
});

server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;

    if (pathname === '/foo') {
        wss1.handleUpgrade(request, socket, head, function done(ws) {
            wss1.emit('connection', ws);
        });
    } else if (pathname === '/bar') {
        wss2.handleUpgrade(request, socket, head, function done(ws) {
            wss2.emit('connection', ws);
        });
    } else {
        socket.destroy();
    }
});
