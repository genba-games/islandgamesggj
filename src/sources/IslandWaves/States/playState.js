// Creates a new 'play' state that wil contain the game
var playState = function () { };
playState.prototype =
    {
        preload: function () {
            // Load assets
            game.load.image('island_placeholder', 'src/graphics/PLACEHOLDER.png');
            game.load.image('wave', 'src/graphics/beach_ball.png')
            game.load.image('background', 'src/graphics/water.png');
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

            // Set background
            game.add.tileSprite(0, 0, 64, 64, "background");

            // Spawn actors            
            IslandFactory(islands, waves, 0, 0, 'island_placeholder', 'wave', gondrols);
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            IslandFactory(islands, waves, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
        },

        update: function () {
            // Collision
            game.physics.arcade.collide(islands, islands);

            // Networking
            // -
        },

    };
