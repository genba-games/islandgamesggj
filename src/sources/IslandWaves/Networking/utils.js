// Helper functions
function isMaster(player_number) {
    var player_number = player_number || socket.player_number;
    return player_number == 1;
}

function isPlayer() {
    var player_number = player_number || socket.player_number;
    return 1 <= player_number <= 4;
}

function isSpectator() {
    var player_number = player_number || socket.player_number;
    return player_number > 4;
}
