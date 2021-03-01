var app = require('http').createServer();

//CORS TRIALS
 var app = require('http').createServer(function(req,res){
 	// Set CORS headers
 	res.setHeader('Access-Control-Allow-Origin', 'http://dad.p6.dev');
 	res.setHeader('Access-Control-Request-Method', '*');
 	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
 	res.setHeader('Access-Control-Allow-Credentials', true);
 	res.setHeader('Access-Control-Allow-Headers', req.header.origin);
 	if ( req.method === 'OPTIONS' ) {
 		res.writeHead(200);
 		res.end();
 		return;
 	}
});

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