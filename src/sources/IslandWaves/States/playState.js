// The play state contains the game
var playState = function () { };

// configurations depending on who I am

var initial_position = undefined;
playState.prototype =
    {
        // Setup functions
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

            this.initial_position = {
                1: { x: game.width / 2, y: 0 },
                2: { x: game.width, y: game.height / 2 },
                3: { x: game.width / 2, y: game.height },
                4: { x: 0, y: game.height / 2 },
            }

            this.player_number = socket.player_number;
            this.players = {};
        },
        create: function () {
            game.add.tileSprite(0, 0, 800, 600, 'background')
            game.physics.startSystem(Phaser.Physics.ARCADE);

            self = this;
            /// Networking
            // Player events
            // Master
            if (isMaster()) {
                socket.on('player connected', function (new_player) {
                    if (self.players[new_player.player_number] === undefined)
                        self.addPlayer(new_player.player_number);
                });

                socket.on('player update', function (data) {
                    if (!isMe(data.player_number) && isPlayer(data.player_number)) {
                        var c = {
                            keys: data.keys,
                            pointer: data.pointer,
                        }
                        updateNetworkController(data.player_number, c)
                    }
                });
            }
            // Slaves 
            else {
                socket.on('player update', function (data) {
                    // Update the position of the player
                    for (var p in data.players) {
                        p = data.players[p];
                        // Add the player if it's new
                        if (self.players[p.player_number] === undefined) {
                            self.addPlayer(p.player_number);
                        }
                        // Update existing players
                        if (p.player_number in self.players) {
                            self.players[p.player_number].position.set(p.x, p.y);
                            updateNetworkController(p.player_number, p.controller)
                        }
                    }
                });
            }

            // Scoring definitions
            this.score = 0;
            this.scoreString = '';
            this.scoreText;
            var lives;

            //  Music
            music = game.add.audio('main_audio');
            music.loop = true;
            music.play();
            // Music controls
            mute_key = game.input.keyboard.addKey(Phaser.Keyboard.M);
            mute_key.onDown.add(mute, this);

            // Group definitions
            islands = game.add.group();
            powerupIsland = game.add.group()
            //IslandFactory(islands, Math.random() * 800, Math.random() * 600, 'crab_island', 'wave', winni1);
            //IslandFactory(islands, Math.random() * 800, Math.random() * 600, 'treasure_island', 'wave', winni2);

            // Create own island
            this.addPlayer(this.player_number);

            // Score
            this.scoreString = 'Score : ';
            this.scoreText = game.add.text(10, 10, this.scoreString + this.score, { font: '34px Arial', fill: '#fff' });

            // Lives
            lives = game.add.group();
            game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

            // Explosion pool
            explosions = game.add.group();
            explosions.createMultiple(300, 'kaboom');
            explosions.forEach(explosion, this);
            function explosion(island) {
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

            /// Networking
            // Instance information
            data = {
                x: island.x,
                y: island.y
            };
            // Controller
            if (!isMaster() && isPlayer()) {
                // Keys
                keys = {};
                var controller = this.players[this.player_number].controls;
                for (var k in controller.keys) {
                    keys[k] = keyPressed(controller, k);
                }
                data['keys'] = keys;
                // Controller
                pointer = this.players[this.player_number].controls.pointer;
                pointer = {
                    worldX: pointer.worldX,
                    worldY: pointer.worldY,
                };
                data['pointer'] = pointer;
            }
            if (isMaster()) {
                data.players = this.getPlayersInfo();
            }
            socket.emit('sync', data);
        },

        // Helper Functions
        addPlayer: function (player_number) {

            var sprites = [
                'crab_island',
                'treasure_island'
            ];

            var sprite = sprites[game.rnd.integerInRange(0, sprites.length - 1)];

            if (!isPlayer(player_number)) return;

            // Define controller
            console.log('Adding player:', player_number);
            if (isMe(player_number))
                controller = Controller();
            else
                controller = addNetworkController(player_number);

            // Create island
            var new_island = IslandFactory(
                islands,
                this.initial_position[player_number].x,
                this.initial_position[player_number].y,
                sprite,
                'wave',
                controller
            );
            // Add the island player to the list of players
            this.players[player_number] = new_island;
        },

        getPlayersInfo: function () {
            var info = [];
            for (player_number in this.players) {
                var player = this.players[player_number];
                var data = {};
                data.player_number = player_number;
                data.x = player.x;
                data.y = player.y;
                data.controller = {
                    pointer: {
                        worldX: player.controls.pointer.worldX,
                        worldY: player.controls.pointer.worldY,
                    },
                    keys: {
                        shoot: player.controls.keys[controllerKeys.SHOOT]
                    }
                };
                info.push(data);
            }
            return info;
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
