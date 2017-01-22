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

            game.load.spritesheet('wave', 'src/graphics/wave.png', 20, 63);
            game.load.audio('main_audio', 'src/audio/test.mp3')
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
            self = this;
            /// Networking
            // Player events
            if (isMaster()) {
                socket.on('player connected', function (new_player) {
                    self.addPlayer(new_player.player_number);
                    console.log('emit player info',self.getPlayersInfo());
                    self.gottaSendPlayersInfo = 60;
                });

                socket.on('player update',function(data){
                    networkControllers[data.player_number] = data.keys;
                });
            } else {
                socket.on('asd', function (players) {
                    console.log('received player info', players);
                    for(var i=0; i < players.data.length; i++){
                        var player = players.data[i];
                        if (isNotMe(player.player_number)){
                            console.log('updates because of player info');
                            self.addPlayer(player);
                        }
                    }
                });

                socket.on('player update', function (player) {
                    // update the position of the player
                    if(player.player_number in self.players)
                        self.players[player.player_number].position.set(player.x, player.y);
                });
            }

            // Scoring definitions
            this.score = 0;
            this.scoreString = '';
            this.scoreText;
            var lives;

            //  Music
            music = game.add.audio('main_audio');
            music.play();
            // Music controls
            mute_key = game.input.keyboard.addKey(Phaser.Keyboard.M);
            mute_key.onDown.add(mute, this);

            // Group definitions
            islands = game.add.group();
            powerups = game.add.group();

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
        update: function () {
            // Collision
            game.physics.arcade.collide(islands, islands);
            for (var i in islands.children) {
                game.physics.arcade.collide(islands, islands.children[i].weapon.bullets, islandBulletCollisionHandler, null, this);
            }

            /// Networking
            // Position sync
            data = {
                x: island.x,
                y: island.y
            };
            if (!isMaster() && isPlayer()) {
                keys = {};
                for (var k in networkControllers[this.player_number]) {
                    v = networkControllers[this.player_number][k];
                    keys[k] = keyPressed(v);
                }
                data['keys'] = keys;
            }
            socket.emit('sync', data);
        },

        // Helper Functions
        addPlayer: function (player_number) {
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
                'island_placeholder',
                'wave',
                controller
            );
            // Add the island player to the list of players
            this.players[player_number] = new_island;
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
