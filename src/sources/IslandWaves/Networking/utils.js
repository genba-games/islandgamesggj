// Helper functions
function isMaster(player_number) {
    var player_number = player_number || socket.player_number;
    return player_number == 1;
}

function isPlayer(player_number) {
    var player_number = player_number || socket.player_number;
    return 1 <= player_number <= 4;
}

function isSpectator(player_number) {
    var player_number = player_number || socket.player_number;
    return player_number > 4;
}

function isMe(player_number) {
    return player_number === socket.player_number;
}

function isNotMe(player_number) {
    return !isMe();
}