var uuid = require('node-uuid');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var valid_sessions = []; //valid session IDs
var socket_session_map = {}; 
var session_socket_map = {};

app.use(express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    //  console.log(socket.handshake);
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('hello', function (iosession) {
        console.log('validating session:', iosession);

        var response = {};

        if (valid_sessions.includes(iosession)) {
            //reconnect
            console.log('user', iosession, 'reconnected');
            response.type = 'reconnection';
        } else {
            //new connection 
            console.log('session', iosession, 'not valid');
            iosession = uuid.v4(); // generate a new session id
            console.log('new user', iosession, 'connected');
            valid_sessions.push(iosession);
            response.type = 'new connection';
            response.iosession = iosession;
        }
        // handle the sesison map: 
        // update the socket id to session map
        socket_session_map[socket.id] = iosession;
        session_socket_map[iosession] = socket.id;
        response.player_number = valid_sessions.indexOf(iosession) + 1;
        socket.emit('session', response);
        socket.broadcast.emit('player connected', response);
        io.emit('player connected', response);
    });
    socket.on('sync', function (response) {
        response.player_number = valid_sessions.indexOf(socket_session_map[socket.id]) + 1;
        if(response.player_number == 1){// message from master
            console.log('socket_session_map[socket.id]', socket_session_map[socket.id]);
            console.log('valid_sessions[1]',valid_sessions[0]);
            socket.broadcast.emit('player update', response);
        } else {// message from slave
            socket.broadcast
                .to(session_socket_map[valid_sessions[0]]) // send only to master client
                .emit('player update', response); 
        }
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
