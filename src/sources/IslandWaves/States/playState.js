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

            // Scoring def    
            var starfield;
            this.score = 0;
            this.scoreString = '';
            this.scoreText;
            var lives;


            //  Music
            music = game.add.audio('main_audio');
            music.play();

            mute_key = game.input.keyboard.addKey(Phaser.Keyboard.M);
            mute_key.onDown.add(mute, this);

            //Group def
            islands = game.add.group();
            IslandFactory(islands, 0, 0, 'island_placeholder', 'wave', gondrols);
            IslandFactory(islands, Math.random() * 800, Math.random() * 600, 'island_placeholder', 'wave');

            powerups = game.add.group()


            //  The score
            this.scoreString = 'Score : ';
            this.scoreText = game.add.text(10, 10, this.scoreString + this.score, { font: '34px Arial', fill: '#fff' });

            //  Lives
            lives = game.add.group();
            game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });


            //  An explosion pool
            explosions = game.add.group();
            explosions.createMultiple(300, 'kaboom');
            explosions.forEach(setupInvader, this);
            function setupInvader(island) {
                island.anchor.x = 0.5;
                island.anchor.y = 0.5;
                island.animations.add('kaboom');
            }
        },

        update: function () {
            // Collision          
            game.physics.arcade.collide(islands, islands);
            for (var i in islands.children) {
                game.physics.arcade.collide(islands, islands.children[i].weapon.bullets, islandBulletCollisionHandler, null, this);
            }
            
            // Networking
        },
    };

function islandBulletCollisionHandler(island, bullet) {
    //  When a bullet hits an alien we kill them both
    bullet.kill();

    //  Increase the score
    this.score += 1;
    this.scoreText.text = this.scoreString + this.score;

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(island.x, island.y);
    explosion.play('kaboom', 30, false, true);
}

function mute() {
    if (music.isPlaying) {
        music.pause()
    }
    else {
        music.resume();
    }
}
