/*
 * Creates a wave.
 * :param object: Target object.
 * :param sprite: Target sprite for island. Anchor is automatically set to the middle.
 */

WaveFactory = function (object, sprite) {
    wave = game.add.weapon(200, sprite);

    wave.addBulletAnimation('wave', [0, 1, 2, 3, 4], 12, true);

    wave.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    wave.bulletLifespan = 1300;
    wave.bulletSpeed = 600;
    wave.fireRate = 1000;
    wave.bulletWorldWrap=true
    wave.damage = 10
    wave.trackSprite(object, 0, 0, true);
    return wave;
}