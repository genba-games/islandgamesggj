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
            game.load.image('background', 'src/graphics/water.png');

            game.load.spritesheet('wave', 'src/graphics/wave.png', 20, 63);
            game.load.audio('main_audio', 'src/audio/test.mp3')
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
                    'shoot':[
                        Phaser.Keyboard.SPACEBAR
                    ]
                };

            music = game.add.audio('main_audio');
            music.play();

            islands = game.add.group();
            IslandFactory(islands, 0, 0, 'island_placeholder', 'wave', gondrols);
            IslandFactory(islands, Math.random()*800, Math.random()*600, 'island_placeholder', 'wave');
            
            powerups = game.add.group()

        },

        update: function () {
            game.physics.arcade.collide(islands, islands);
            for(var i in islands.children){
                    game.physics.arcade.collide(islands, islands.children[i].weapon.bullets);
            }
            
            // game.physics.arcade.overlap(islands, powerups, overlapCallback);

           
        },
        render: function(){
            // game.debug.text('Active waves: ' + waves.countLiving() + ' / ' + waves.total, 32, 32);
        }
    };
