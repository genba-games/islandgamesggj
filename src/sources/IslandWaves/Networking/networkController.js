var networkControllers = {};

var networkKeyEvent = {
    KEYUP: 'key up',
    KEYDOWN: 'key down',
}

function keyPressed (controller, key) {
    key = controller.keys[key];
    if (key === true) return true;
    if (key === false) return false;
    for (i in key)
        if (game.input.keyboard.isDown(key[i]))
            return true;
    return false;
}

function emitKeyPressed(key) {
    data = {
        key: key,
        event: networkKeyEvent.KEYDOWN,
    }
    socket.emit('player key', data);
}

function emitKeyReleased(key) {
    data = {
        key: key,
        event: networkKeyEvent.KEYUP,
    }
    socket.emit('player key', data);
}

function createNetworkPointer(x, y) {
    pointer = {
        worldX: x,
        worldY: y,
    }
    return pointer
}

function addNetworkController(player_number) {
    if (!isPlayer(player_number)) return;
    nc = Controller();
    
    /// Initial settings
    // Set all keys to `false` initially
    keys = nc.keys
    for (var key in keys) {
        if (keys.hasOwnProperty(key)) {
            keys[key] = false;
        }
    }
    // Set pointer to the center of the screen
    nc['pointer'] = createNetworkPointer(game.width / 2, game.height / 2);

    // Add to network controllers
    networkControllers[player_number] = nc;

    return nc;
}