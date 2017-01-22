controllerKeys = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    SHOOT: 'shoot',
}

function Controller() {
    return {
        'keys': {
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
        },
        'pointer': game.input.activePointer,
    };
};
// gondrols =
//     {
//         'up':
//         [
//             Phaser.Keyboard.W,
//             Phaser.Keyboard.UP
//         ],
//         'down':
//         [
//             Phaser.Keyboard.S,
//             Phaser.Keyboard.DOWN
//         ],
//         'left':
//         [
//             Phaser.Keyboard.A,
//             Phaser.Keyboard.LEFT
//         ],
//         'right':
//         [
//             Phaser.Keyboard.D,
//             Phaser.Keyboard.RIGHT
//         ],
//         'shoot': [
//             Phaser.Keyboard.SPACEBAR
//         ]
//     };
// winni1 =
//     {
//         'up':
//         [
//             Phaser.Keyboard.Q
//         ],
//         'down':
//         [
//             Phaser.Keyboard.R
//         ],
//         'left':
//         [
//             Phaser.Keyboard.W
//         ],
//         'right':
//         [
//             Phaser.Keyboard.E
//         ],
//         'shoot': [
//             Phaser.Keyboard.T,
//             Phaser.Keyboard.Y,
//             Phaser.Keyboard.U,
//             Phaser.Keyboard.I,
//             Phaser.Keyboard.O,
//             Phaser.Keyboard.P,
//             Phaser.Keyboard.A,
//             Phaser.Keyboard.S,
//         ]
//     };
// winni2 =
//     {
//         'up':
//         [
//             Phaser.Keyboard.F
//         ],
//         'down':
//         [
//             Phaser.Keyboard.J
//         ],
//         'left':
//         [
//             Phaser.Keyboard.G
//         ],
//         'right':
//         [
//             Phaser.Keyboard.H
//         ],
//         'shoot': [
//             Phaser.Keyboard.K,
//             Phaser.Keyboard.L,
//             Phaser.Keyboard.Z,
//             Phaser.Keyboard.X,
//             Phaser.Keyboard.C,
//             Phaser.Keyboard.V,
//             Phaser.Keyboard.B,
//             Phaser.Keyboard.N
//         ]
//     };