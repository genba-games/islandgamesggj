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
            game.load.image('powerup_coconut', 'src/graphics/stupid coconut.png')
            game.load.image('powerup_hermit', 'src/graphics/hermit.png')

            game.load.spritesheet('wave', 'src/graphics/wave.png', 20, 63);
            game.load.audio('main_audio', 'src/audio/battle.wav')
        },

        create: function () {
            game.add.tileSprite(0,0,800,600,'background')
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
            powerupIsland = game.add.group()
            IslandFactory(islands, 0, 0, 'island_placeholder', 'wave', gondrols);
            IslandFactory(islands, Math.random() * 800, Math.random() * 600, 'island_placeholder', 'wave');
            PowerUpFactory(powerupIsland, 'powerup_coconut')

        },
        powerUpCallBack: function (island, pUp) {
            if (pUp.config.tint) {
                var tintOrig = island.tint;
                island.tint = pUp.config.tint;
            }
            if (pUp.config.add) {
                callBack = function () {
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
            if(pUp.config.scale){
                island.scale.x *= pUp.config.scale
                island.scale.y *= pUp.config.scale
                callBack = function () {
                    island.scale.x=1
                    island.scale.y=1
                }
            }
            game.time.events.add(Phaser.Timer.SECOND * pUp.config.time, callBack, this);
            pUp.destroy()
        },

        update: function () {
            game.physics.arcade.collide(islands, islands);
            
            for (var i in islands.children) {
                game.physics.arcade.collide(islands, islands.children[i].weapon.bullets);
                game.physics.arcade.collide(islands.children[i].weapon.bullets, islands.children[i].weapon.bullets);
                
            }
            game.physics.arcade.overlap(islands, powerupIsland, this.powerUpCallBack);
        },
        render: function () {
            // game.debug.text('Active waves: ' + waves.countLiving() + ' / ' + waves.total, 32, 32);
        }
    };
