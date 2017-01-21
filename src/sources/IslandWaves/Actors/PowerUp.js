/*
 * Creates a wave.
 * :param object: Target object.
 * :param sprite: Target sprite for island. Anchor is automatically set to the middle.
 */

PowerUpFactory = function (group, sprite) {
    pUp = group.create(Math.random() * 700, Math.random() * 500, sprite);
    game.physics.arcade.enable([pUp]);
    pUp.config = islandPowerUp[0]
    return pUp;
}
//Array of dictionaries
//index = a powerup 
//info in each array element corresponds to a island variable
islandPowerUp = [
    {
        time: 2,
        add: {
            'body.drag.x': 5000000000000,
            'body.drag.y': 5000000000000,
        },
        tint: 0x0000ff
    },
    {
        time: 2000,
        add: {
            'tint': -0x888888,
        },
    }
]