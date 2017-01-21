/*
 * Creates a wave.
 * :param object: Target object.
 * :param sprite: Target sprite for island. Anchor is automatically set to the middle.
 */

PowerUpFactory = function (group, sprite){
    pUp = group.create(Math.random() * 800, Math.random() * 600, sprite);

    return pup;
}
//Array of dictionaries
//index = a powerup 
//info in each array element corresponds to a island variable
islandPowerUps = []