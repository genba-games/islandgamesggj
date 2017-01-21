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
            game.load.spritesheet('kaboom', 'src/graphics/explode.png', 128, 128);
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

            music = game.add.audio('main_audio');
            music.play();

            islands = game.add.group();
            IslandFactory(islands, 0, 0, 'island_placeholder', 'wave', gondrols);
            IslandFactory(islands, Math.random() * 800, Math.random() * 600, 'island_placeholder', 'wave');
            
            powerups = game.add.group()
            

            function setupInvader (island) {

                island.anchor.x = 0.5;
                island.anchor.y = 0.5;
                island.animations.add('kaboom');

            }

            //  An explosion pool
            explosions = game.add.group();
            explosions.createMultiple(30, 'kaboom');
            explosions.forEach(setupInvader, this);

            mute_key = game.input.keyboard.addKey(Phaser.Keyboard.M);
            mute_key.onDown.add(mute, this);

            powerups = game.add.group()
        },

        update: function () {
            function collisionHandler (bullet, island) {
                //  When a bullet hits an alien we kill them both
                //bullet.kill();
                //alien.kill();

                //  Increase the score
                //score += 20;
                //scoreText.text = scoreString + score;

                //  And create an explosion :)
                var explosion = explosions.getFirstExists(false);
                explosion.reset(bullet.x, bullet.y);
                explosion.play('kaboom', 30, false, true);
              
            }
          
            game.physics.arcade.collide(islands, islands);
            for(var i in islands.children){
                    game.physics.arcade.collide(islands, islands.children[i].weapon.bullets, collisionHandler, null, this);
            }
            
            // game.physics.arcade.overlap(islands, powerups, overlapCallback);

           
        },
        render: function () {
            // game.debug.text('Active waves: ' + waves.countLiving() + ' / ' + waves.total, 32, 32);
        }
    };

function mute () {
    if(music.isPlaying){
        music.pause()
    }
    else{
        music.resume();
    }
}
