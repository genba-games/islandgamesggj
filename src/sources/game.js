// Initialize Phaser, and creates a 800x800px game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div');
var game_state = {};
// Creates a new 'main' state that wil contain the game
game_state.main = function () { };
game_state.main.prototype =
    {
        preload: function () {
            // Function called first to load all the assets
            game.load.image('island_placeholder', 'src/graphics/PLACEHOLDER.png');
        },

        create: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE);
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
            

            waves = game.add.group();
            powerups = game.add.group()

        },

        update: function () {
            game.physics.arcade.collide(islands, islands);
        },

    };

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);
game.state.start('main');