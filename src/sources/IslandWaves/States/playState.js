// Creates a new 'play' state that wil contain the game
var playState = function () { };
playState.prototype =
    {
        preload: function () {
            // Function called first to load all the assets
            game.load.image('island_placeholder', 'src/graphics/PLACEHOLDER.png');
            game.load.image('wave_placeholder1', 'src/graphics/PLACEHOLDERWAVE.png');
            game.load.image('wave_placeholder2', 'src/graphics/bomb.png')
            game.load.image('wave_placeholder3', 'src/graphics/beach_ball.png')
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
                    'shoot': [
                        Phaser.Keyboard.SPACEBAR
                    ]
                };

            islands = game.add.group();
            powerups = game.add.group()
            IslandFactory(islands, 0, 0, 'island_placeholder', 'wave_placeholder1', gondrols);
            IslandFactory(islands, Math.random() * 800, Math.random() * 600, 'island_placeholder', 'wave_placeholder1', gondrols);
            IslandFactory(islands, Math.random() * 800, Math.random() * 600, 'island_placeholder', 'wave_placeholder2', gondrols);
            IslandFactory(islands, Math.random() * 800, Math.random() * 600, 'island_placeholder', 'wave_placeholder3', gondrols);


        },

        update: function () {
            game.physics.arcade.collide(islands, islands);
            for(var i in islands.children){
                    game.physics.arcade.collide(islands, islands.children[i].weapon.bullets);
            }
            
            // game.physics.arcade.overlap(islands, powerups, overlapCallback);


        },
        render: function () {
            // game.debug.text('Active waves: ' + island.weapon.bullets.countLiving() + ' / ' +island.weapon.bullets.total, 32, 32);
        }
    };
