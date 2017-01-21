/*
 * Creates a wave.
 * :param object: Target object.
 * :param sprite: Target sprite for island. Anchor is automatically set to the middle.
 */
//Array of dictionaries
//index = a powerup 
//info in each array element corresponds to a island variable
islandPowerUp = [
    {
        time: 2,
        add: {
            'body.maxVelocity': 600,
            'acceleration': 2400,
        },
        tint: 0xffff00
    },
    {
        time: 2,
        add: {
            'acceleration':-600,
            'body.drag.x': 5000000000000,
            'body.drag.y': 5000000000000,
        },
        tint: 0x0000ff
    },
    {
        time: 2,
        add: {
            'weapon.fireRate': -750,
        },
        tint: 0xff0000
    },
    {
        time: 4,
        scale: 5
    },
    {
        time: 10,
        scale: 0.3
    },
]
PowerUpFactory = function (group, sprite) {
    pUp = group.create(Math.random() * 700, Math.random() * 500, sprite);
    game.physics.arcade.enable([pUp]);
    pUp.config = islandPowerUp[Math.floor(Math.random()*islandPowerUp.length)];
    return pUp;
}
