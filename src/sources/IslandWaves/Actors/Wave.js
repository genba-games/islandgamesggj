/*
 * Creates a wave.
 * :param object: Target object.
 * :param sprite: Target sprite for island. Anchor is automatically set to the middle.
 */

WaveFactory = function (group, object, pointer, sprite) {
    wave = game.add.weapon(50, sprite);
    wave.tint = object.tint;

    wave.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    wave.bulletSpeed = 600;
    wave.fireRate = 100;
    wave.trackSprite(object, 0, 0, true);
    wave.update = function () {
        this.fire();
    };
}
