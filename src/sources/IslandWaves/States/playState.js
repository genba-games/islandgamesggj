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

            game.load.image('crab_island', 'src/graphics/crab island.png')
            game.load.image('treasure_island', 'src/graphics/treasure chest island.png')

            game.load.image('PUbig', 'src/graphics/PU bigger size.png')
            game.load.image('PUsmall', 'src/graphics/PU smaller size.png')
            game.load.image('PUslow', 'src/graphics/PU bigger size.png')
            game.load.image('PUspeed', 'src/graphics/PU bigger size.png')
            game.load.image('PUangery', 'src/graphics/hermit.png')

            game.load.spritesheet('wave', 'src/graphics/wave.png', 20, 63);
            game.load.audio('main_audio', 'src/audio/battle.wav')
            game.load.spritesheet('kaboom', 'src/graphics/explode.png', 128, 128);
        },

        create: function () {
            game.add.tileSprite(0, 0, 800, 600, 'background')
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
            winni1 =
                {
                    'up':
                    [
                        Phaser.Keyboard.Q
                    ],
                    'down':
                    [
                        Phaser.Keyboard.R
                    ],
                    'left':
                    [
                        Phaser.Keyboard.W
                    ],
                    'right':
                    [
                        Phaser.Keyboard.E
                    ],
                    'shoot': [
                        Phaser.Keyboard.T,
                        Phaser.Keyboard.Y,
                        Phaser.Keyboard.U,
                        Phaser.Keyboard.I,
                        Phaser.Keyboard.O,
                        Phaser.Keyboard.P,
                        Phaser.Keyboard.A,
                        Phaser.Keyboard.S,
                    ]
                };
            winni2 =
                {
                    'up':
                    [
                        Phaser.Keyboard.F
                    ],
                    'down':
                    [
                        Phaser.Keyboard.J
                    ],
                    'left':
                    [
                        Phaser.Keyboard.G
                    ],
                    'right':
                    [
                        Phaser.Keyboard.H
                    ],
                    'shoot': [
                        Phaser.Keyboard.K,
                        Phaser.Keyboard.L,
                        Phaser.Keyboard.Z,
                        Phaser.Keyboard.X,
                        Phaser.Keyboard.C,
                        Phaser.Keyboard.V,
                        Phaser.Keyboard.B,
                        Phaser.Keyboard.N
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
            music.loop = true;
            music.play();

            mute_key = game.input.keyboard.addKey(Phaser.Keyboard.M);
            mute_key.onDown.add(mute, this);

            //Group def
            islands = game.add.group();
            powerupIsland = game.add.group()
            // IslandFactory(islands, 0, 0, 'crab_island', 'wave', gondrols);
            IslandFactory(islands, Math.random() * 800, Math.random() * 600, 'crab_island', 'wave', winni1);
            IslandFactory(islands, Math.random() * 800, Math.random() * 600, 'treasure_island', 'wave', winni2);
            PowerUpFactory(powerupIsland)
            PowerUpFactory(powerupIsland)
            PowerUpFactory(powerupIsland)
            PowerUpFactory(powerupIsland)
            PowerUpFactory(powerupIsland)


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
        powerUpCallback: function (island, pUp) {
            if (pUp.config.tint) {
                var tintOrig = island.tint;
                island.tint = pUp.config.tint;
            }
            if (pUp.config.add) {
                callback = function () {
                    island.tint = tintOrig
                    for (var conf in pUp.config.add) {
                        valueBuff = _.get(island, conf)
                        value = valueBuff - pUp.config.add[conf]
                        _.set(island, conf, value)
                    };
                };
                for (var conf in pUp.config.add) {
                    valueOrig = _.get(island, conf)
                    value = valueOrig + pUp.config.add[conf]
                    _.set(island, conf, value)
                };
            };
            if (pUp.config.scale) {
                island.scale.x *= pUp.config.scale
                island.scale.y *= pUp.config.scale
                callback = function () {
                    island.scale.x = 1
                    island.scale.y = 1
                }
            }
            game.time.events.add(Phaser.Timer.SECOND * pUp.config.time, callback, this);
            pUp.destroy()
        },
        bulletIslandCollitionCallback: function (island, bullet) {
            callback = function () {
                island.invulnerable = false
                island.alpha = 1
            };
            if (!island.invulnerable) {
                island.alpha = 0.5
                island.health -= Math.abs(bullet.body.velocity.x) + Math.abs(bullet.body.velocity.y)
                if (0 > island.health) {
                    island.kill()
                };
                island.invulnerable = true
                game.time.events.add(Phaser.Timer.SECOND * 2, callback, this)
            };
        },
        update: function () {
            // Collision          
            game.physics.arcade.collide(islands, islands);

            for (var i in islands.children) {
                game.physics.arcade.collide(islands, islands.children[i].weapon.bullets, this.bulletIslandCollitionCallback);
                for (var j in islands.children) {
                    game.physics.arcade.collide(islands.children[i].weapon.bullets, islands.children[j].weapon.bullets);

                }
            }
            game.physics.arcade.overlap(islands, powerupIsland, this.powerUpCallback);
        },
        render: function () {
        }
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
