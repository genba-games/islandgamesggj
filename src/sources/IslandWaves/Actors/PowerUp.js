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
        time: 5,
        add: {
            'body.maxVelocity': 600,
            'powerUpSpeed': 2400,
        },
        tint: 0xffff00,
        sprite:'PUspeed',
        fx: 'good'
    },
    {
        time: 5,
        add: {
            'acceleration':-600,
            'body.drag.x': 5000000000000,
            'body.drag.y': 5000000000000,
        },
        tint: 0x0000ff,
        sprite:'PUslow',
        fx: 'bad'
    },
    {
        time: 5,
        add: {
            'weapon.fireRate': 1000,
        },
        tint: 0x00ff00,
        sprite:'PUcoconut',
        fx: 'bad'
    },
    {
        time: 5,
        add: {
            'weapon.fireRate': -750,
        },
        tint: 0xff0000,
        sprite:'PUangery',
        fx: 'good'
    },
    {
        time: 5,
        scale: 5,
        sprite:'PUbig',
        fx: 'good'
    },
    {
        time: 5,
        scale: 0.3,
        sprite:'PUsmall',
        fx: 'bad'
    },
]
PowerUpFactory = function (group) {
    config = islandPowerUp[game.rnd.integerRange(1,islandPowerUp.length)]
    pUp = group.create(Math.random() * 700, Math.random() * 500, config.sprite);
    game.physics.arcade.enable([pUp]);
    pUp.config = config;
    return pUp;
}
