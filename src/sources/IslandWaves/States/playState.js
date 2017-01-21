// Creates a new 'play' state that wil contain the game
var playState = function () { };

// configurations depending on who I am

var initial_position = undefined;
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
            
            initial_position = {
                1: {x: game.width/2, y: 0},
                2: {x: game.width, y: game.height/2},
                3: {x: game.width/2, y: game.height},
                4: {x: 0, y: game.height/2},
            }

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

            // networking
            socket.on('player connected', function(new_player){
                console.log('new player');
                IslandFactory(
                    islands, 
                    initial_position[new_player.player_number].x, 
                    initial_position[new_player.player_number].y, 
                    'island_placeholder', 
                    'wave'
                );
            });

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
            var island = IslandFactory(islands, initial_position[socket.player_number].x, initial_position[socket.player_number].y, 'island_placeholder', 'wave', gondrols);
            //IslandFactory(islands, Math.random() * 800, Math.random() * 600, 'island_placeholder', 'wave');

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
            // Connection is contained in the `conn` object.
            // socket.on()
            data = {x:island.x, y:island.y};
            socket.emit('sync', data);
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
