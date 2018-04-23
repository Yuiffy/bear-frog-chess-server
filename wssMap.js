const WebSocket = require('ws');

class WssMap {
    // mp: {}

    constructor() {
        this.mp = {};
    }

    get(key) {
        console.log(this);
        if (!this.mp.hasOwnProperty(key))
            this.mp[key] = this.createWss();
        return this.mp[key];
    }


    createWss() {
        const wss = new WebSocket.Server({noServer: true});
        wss.on("connection", function (ws) {
            // var id = setInterval(function () {
            //     ws.send(JSON.stringify(new Date()), function () {
            //     })
            // }, 1000);

            console.log("websocket connection open, ws=", ws);

            // 发送消息
            ws.on('message', (message) => {
                console.log(message);
                // Broadcast to everyone else.
                wss.clients.forEach(function each(client) {
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
        return wss;
    }
};

const wssMap = new WssMap();

module.exports = wssMap;