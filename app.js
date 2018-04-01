var express = require('express');
var io = require('./socketio');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api', function (req, res) {
    res.send('Hello World! api');
});

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

io.getSocketio(server);