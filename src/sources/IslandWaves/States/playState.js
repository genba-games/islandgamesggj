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
            this.gottaSendPlayersInfo = false;
        },
        create: function () {
            self = this;
            /// Define controllers
            // Create controllers for other players
            addNetworkController(2);
            addNetworkController(3);
            addNetworkController(4);

            /// Setup controls
            var controls = undefined;
            // Host
            if (isMaster()) {
                controls = Controller();
            }
            // Player
            else if (isPlayer()) {
                controls = networkControllers[this.player_number];
            }
            // Spectator
            else {
                controls = undefined;
            }

            /// Networking
            // Controller events
            socket.on('player key', function (key) {
                player_number = key['player_number'];
                key = key['key']
                event = key['key']
                if (isPlayer(player_number)) {
                    if (event == networkKeyEvent.KEYDOWN)
                        networkControllers[player_number][key] = true;
                    else if (event == networkKeyEvent.KEYUP)
                        networkControllers[player_number][key] = false;
                }
            });

            // Player events
            if (isMaster()) {
                socket.on('player connected', function (new_player) {
                    self.addPlayer(new_player);
                    console.log('emit player info',self.getPlayersInfo());
                    self.gottaSendPlayersInfo = true;
                });
            } else {
                console.log('FUCK');
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
                    self.players[player.player_number].position.set(player.x, player.y);
                    //self.players[player.player_number].y = player.y;
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
            powerups = game.add.group()

            // Create own island
            var island = IslandFactory(
                islands,
                this.initial_position[socket.player_number].x,
                this.initial_position[socket.player_number].y,
                'island_placeholder',
                'wave',
                controls
            );
            // Add myself to the list of players
            console.log('this.player_number', this.player_number);
            this.players[this.player_number] = island;
            console.log('this.players', this.players);

            // Score
            this.scoreString = 'Score : ';
            this.scoreText = game.add.text(10, 10, this.scoreString + this.score, { font: '34px Arial', fill: '#fff' });

            // Lives
            lives = game.add.group();
            game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

            // Explosion pool
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
            data = { 
                x: this.players[this.player_number].position.x, 
                y: this.players[this.player_number].position.y 
            };
            socket.emit('sync', data);
            if(this.gottaSendPlayersInfo){
                this.gottaSendPlayersInfo = false;
                socket.emit('player info', {data:self.getPlayersInfo()});
            }
        },
        // Helper Functions
        addPlayer: function (player) {
            var new_island = IslandFactory(
                islands,
                this.initial_position[player.player_number].x,
                this.initial_position[player.player_number].y,
                'island_placeholder',
                'wave'
            );
            //add the new player to the list of players
            this.players[player.player_number] = new_island;
        },
        getPlayersInfo: function() {
            var info = [];
            for(player_number in this.players){
                var player = this.players[player_number];
                var data = {};
                data.player_number = player_number;
                data.x = player.x;
                data.y = player.y;
                info.push(data);
            }
            return info;
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
