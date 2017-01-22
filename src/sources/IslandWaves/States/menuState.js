// The menu state handles the server connection
var menuState = function () { };
menuState.prototype =
    {
        preload: function () {
            // Load assets
            game.load.image('title_screen', 'src/graphics/title_screen.png');
            game.load.spritesheet('logo', 'src/graphics/logoSprite.png',370,388);
        },

        create: function () {
            // Set background
            game.add.sprite(0, 0, 'title_screen');

            // host = game.add.button(game.world.centerX - 95, 400, 'bomb', start_game, this);
            // host_address
            // host_connection_indicator
            // connect = game.add.button(game.world.centerX - 95, 400, 'bomb', start_game, this);

            // FIXME Placeholder
            logo = game.add.button(175, 25, 'logo', this.connect, this);
            var animate = logo.animations.add('animate');
            logo.animations.play('animate',10,true);
        },

        /**
         * Tries to connect to a server and creates the game.
         */
        connect: function () {
            function start_game() {
                game.state.start('play');
            }

            // TODO Setup input to define host
            // conn = open_connection('localhost:3000', start_game);
            start_game();
        },
    };