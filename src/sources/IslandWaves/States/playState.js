// Creates a new 'play' state that wil contain the game
var playState = function () { };
playState.prototype =
    {
        preload: function () {
            // Load assets
            game.load.image('island_placeholder', 'src/graphics/PLACEHOLDER.png');
        },

        create: function () {
            gondrols =
                {
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
                };

            
            islands = game.add.group();
            waves = game.add.group();
            powerups = game.add.group()
            
            IslandFactory(islands, 0, 0, 'island_placeholder', gondrols);
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder');
        },

        update: function () {
            // Collision
            game.physics.arcade.collide(islands, islands);

            // Networking
            // -
        },

    };
