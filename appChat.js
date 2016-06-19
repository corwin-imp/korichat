var express = require('express');
var app = express();
var port = Number(process.env.PORT || 8008);

var options = {
//    'log level': 0
};


var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server, options);
server.listen(port);


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.use('/static', express.static(__dirname + '/static'));

io.sockets.on('connection', function (client) {
    client.on('message', function (message) {
        try {
            client.emit('message', message);
            client.broadcast.emit('message', message);
        } catch (e) {
            console.log(e);
            client.disconnect();
        }
    });
});