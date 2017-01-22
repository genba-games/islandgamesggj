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
                1: {x: game.width/2, y: 0},
                2: {x: game.width, y: game.height/2},
                3: {x: game.width/2, y: game.height},
                4: {x: 0, y: game.height/2},
            }

            this.player_number = socket.player_number;
            this.players = {};
        },
        

        create: function () {
            /// Define controllers
            // Create controllers for other players
            addNetworkController(2);
            addNetworkController(3);
            addNetworkController(4);

            // networking ============================================

            if( this.isMaster() ){
                socket.on('player connected', function(new_player){
                    this.addPlayer(new_player);
                    socket.emit('player info', new_player);
                });
            }
            
            socket.on('player info', function(player){
                this.addPlayer(player);
            /// Setup controls
            var controls = undefined;
            // Host
            if (this.isMaster()) {
                controls = Controller();
            } 
            // Player
            else if (this.isPlayer()) {
                controls = networkControllers[player_number];
            }
            // Spectator
            else {
                controls = undefined;
            }

            // Networking
            socket.on('player key', function(key) {
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
            socket.on('player connected', function (new_player) {
                IslandFactory(
                    islands,
                    initial_position[new_player.player_number].x,
                    initial_position[new_player.player_number].y,
                    'island_placeholder',
                    'wave'
                );
            });

            socket.on('player update', function(player){
                // update the position of the player
                this.players[player.player_number].x = player.x;
                this.players[player.player_number].y = player.y;
            });

            socket.on('player key', function(player_key){
                
            });

            // Scoring def    
            var starfield;
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

            //Group def
            islands = game.add.group();
            var island = IslandFactory(islands, initial_position[socket.player_number].x, initial_position[socket.player_number].y, 'island_placeholder', 'wave', gondrols);
                
            // add myself to the list of players
            this.players[this.player_number] = island;


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
            data = { x: island.x, y: island.y };
            socket.emit('sync', data);
        },
        //Helper Functions
        addPlayer: function (player){
            var new_island = IslandFactory(
                islands, 
                initial_position[player.player_number].x, 
                initial_position[player.player_number].y, 
                'island_placeholder', 
                'wave'
            );
            //add the new player to the list of players
            this.players[player.player_number] = new_island;
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
