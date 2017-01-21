function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return 0;
}

var iosession = localStorage.getItem('iosession');
$(function() {
    var socket = io.connect();

    $('form').submit(function(){
        console.log('sending: '+$('#m').val());
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('connect', function(){
        console.log('ios', iosession);
        console.log('LS', localStorage);
        console.log('connected... initiating handshake with session', iosession);
        socket.emit('hello',iosession);
    });

    socket.on('session', function(msg){
        console.log('session',msg);
        if(msg.type == 'reconnection'){
            console.log('reconnection','reconnected with session '+iosession);
        }else{
            console.log('new connection', 'iosession: ', msg.iosession);
            localStorage.setItem('iosession',msg.iosession);
        }
    });

    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
});

