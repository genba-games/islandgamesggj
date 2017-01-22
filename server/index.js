var uuid = require('node-uuid');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var valid_sessions = [];
var session_map = {};

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

        var response = {};

        if(valid_sessions.includes(iosession)){
            //reconnect
            console.log('user', iosession, 'reconnected');
            response.type = 'reconnection';
        }else{
            //new connection 
            console.log('session', iosession, 'not valid');
            var iosession = uuid.v4(); // generate a new session id
            console.log('new user', iosession, 'connected');
            valid_sessions.push(iosession);
            response.type = 'new connection';
            response.iosession = iosession;
            // handle the sesison map: 
            // update the socket id to session map
            session_map[socket.id] = iosession;
        }
        response.player_number = valid_sessions.indexOf(iosession) + 1;
        socket.emit('session', response);
        io.emit('player connected',response);
    });
    socket.on('sync', function(response){
        response.player_number = valid_sessions.indexOf(session_map[socket.id]);
        io.emit('sync',msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
