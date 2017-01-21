var uuid = require('node-uuid');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var valid_sessions = [];

app.use(express.static('static'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //  console.log(socket.handshake);
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('hello', function(iosession){
        console.log('validating session:',iosession);
        if(valid_sessions.includes(iosession)){
            //reconnect    
            console.log('user', iosession, 'reconnected');
            socket.emit('session',{type:'reconnection'});
        }else{
            //new connection 
            console.log('session', iosession, 'not valid');
            var iosession = uuid.v4(); // generate a new session id
            console.log('new user', iosession, 'connected');
            valid_sessions.push(iosession);
            socket.emit(
                'session',
                { type:'new connection', iosession:iosession }
            );
        }
        
    });
    socket.on('shoot', function(msg){
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
