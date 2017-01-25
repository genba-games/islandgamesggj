function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return 0;
}

$(function () {
    var socket = io.connect('localhost:3000');

    var addMessage = function(msg){
        $('#message-list').append($('<li>').text(msg));
    };

    $('#reset-server').click(function () {
        // TODO send more stuff to the server to select which game to
        // reset and that kind of stuff
        req = {
            game: 0
        };
        socket.emit('reset server', req);
        return false;
    });

    socket.on('connect', function () {
        req = {
            type: 'control'
        }
        socket.emit('server control', req);
        addMessage('connected to server');
    });

    socket.on('server info', function (msg) {
        console.log('server-info', msg);
    });
});

