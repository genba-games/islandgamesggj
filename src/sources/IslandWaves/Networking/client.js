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

var iosession = localStorage.getItem('iosession');
var conn = undefined;
function open_connection(address, connectionCallback) {
    var conn = io.connect(address);

    conn.on('connect', function () {
        console.log('IO Session:', iosession);
        console.log('LS:', localStorage);
        console.log('Connected... initiating handshake with session:', iosession);
        conn.emit('hello', iosession);

        connectionCallback();
    });

    conn.on('session', function (msg) {
        console.log('session', msg);
        if (msg.type == 'reconnection') {
            console.log('reconnection', 'reconnected with session:', iosession);
        } else {
            console.log('new connection', 'iosession: ', msg.iosession);
            localStorage.setItem('iosession', msg.iosession);
        }
    });

    conn.on('chat', function (msg) {
        console.log(msg);
    });

    return conn;
};

