var http = require('http');
var server = http.createServer();
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

	var onevent = socket.onevent;
	socket.onevent = function (packet) {
	    var args = packet.data || [];
	    onevent.call (this, packet);
	    packet.data = ["*"].concat(args);
	    onevent.call(this, packet); 
	};

    socket.on('*', function (event, data) {
    	console.log('d', event, data);
	    socket.broadcast.emit(event, data);
	});

});

server.listen(3000);