function Controller() {
    return {
        'up':
        [
            Phaser.Keyboard.W,
            Phaser.Keyboard.UP
        ],
        'down':
        [
            Phaser.Keyboard.S,
            Phaser.Keyboard.DOWN
        ],
        'left':
        [
            Phaser.Keyboard.A,
            Phaser.Keyboard.LEFT
        ],
        'right':
        [
            Phaser.Keyboard.D,
            Phaser.Keyboard.RIGHT
        ],
        'shoot': [
            Phaser.Keyboard.SPACEBAR
        ]
    };
};