var app = require('http').createServer();

var io = require('socket.io')(app);

app.listen(5000, function(){
	console.log('listening on *:5000');
});

io.on('connection', function (socket) {
	console.log('client connected')
	
	socket.on('join_room', function (data) {
		console.log(data)
		socket.join(data.room_id)
	})

	socket.on('share_video', function (data) {
		console.log(data)
		io.to(data.room_id).emit('video_shared', data.video_name)
	})
})