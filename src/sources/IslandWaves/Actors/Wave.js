/*
 * Creates a wave.
 * :param object: Target object.
 * :param sprite: Target sprite for island. Anchor is automatically set to the middle.
 */

WaveFactory = function (group, object, pointer, sprite) {
    wave = group.create(object.x, object.y, sprite)
    wave.anchor.set(0.5)
    wave.tint = object.tint

    game.physics.arcade.enable([wave]);
    game.physics.arcade.moveToPointer(wave, 200, pointer)
    wave.body.collideWorldBounds = true;
    wave.update = function () {
    };


}