// The boot state initializes the arcade and networking subsystems
var bootState = function () { };
bootState.prototype =
    {
        create: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.stage.disableVisibilityChange = true;

            // Start the menu state
            game.state.start('menu');
        }
    };
