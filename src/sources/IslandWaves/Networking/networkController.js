var networkControllers = {};

var networkKeyEvent = {
    KEYUP: 'key up',
    KEYDOWN: 'key down',
}

function keyPressed (key) {
    if (key === true) return true;
    for (i in key)
        if (game.input.keyboard.isDown(key[i]))
            return true;
    return false;
}

function addNetworkController(player_number) {
    if (!isPlayer(player_number)) return;
    nc = Controller();
    // Set all controls to `false` initially
    for (var key in nc.options) {
        if (nc.options.hasOwnProperty(key)) {
            nc.options[key] = false;
        }
    }

    // Add to network controllers
    networkControllers[player_number] = nc;
}