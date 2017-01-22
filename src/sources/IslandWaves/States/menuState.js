// The menu state handles the server connection

var menuState = function () { };
menuState.prototype =
    {
        preload: function () {
            // Load assets
            game.load.image('title_screen', 'src/graphics/title_screen.png');
            game.load.spritesheet('logo', 'src/graphics/logoSprite.png', 370, 388);
            game.load.audio('beach_sound', 'src/audio/beach.wav')
            game.load.image('hermit_crab', 'src/graphics/hermit.png')
        },

        create: function () {
            game.add.plugin(PhaserInput.Plugin);
            // Set background
            game.add.sprite(0, 0, 'title_screen');
            crab = game.add.sprite(570, 330, 'hermit_crab');
            

            music = game.add.audio('beach_sound');
            music.loop = true;
            music.play();
            // host = game.add.button(game.world.centerX - 95, 400, 'bomb', start_game, this);
            // host_address
            // host_connection_indicator
            // connect = game.add.button(game.world.centerX - 95, 400, 'bomb', start_game, this);

            // FIXME Placeholder
            logo = game.add.button(175, 25, 'logo', this.connect, this);
            var animate = logo.animations.add('animate');
            logo.animations.play('animate', 7, true);

            ipInput = game.add.inputField(600 / 2 - 20, 450, {
                fillAlpha: 0,
                width: 200,
                font: '18px JinxedWizards',
                placeHolder: '10.10.5.69:3000',
                placeHolderColor: '#000000',
            });
        },
        update: function () {

        },
        /**
         * Tries to connect to a server and creates the game.
         */
        connect: function () {
            function start_game() {
                this.music.stop();
                game.state.start('play');
            }

            // TODO Setup input to define host
            // socket = open_connection('192.168.0.207:3000', start_game);
            socket = open_connection(ipInput.text._text, start_game);
        },
    };