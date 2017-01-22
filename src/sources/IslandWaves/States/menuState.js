// The menu state handles the server connection
var menuState = function () { };
menuState.prototype =
    {
        preload: function () {
            // Load assets
            game.load.image('title_screen', 'src/graphics/title_screen.png');
            game.load.image('bomb', 'src/graphics/bomb.png');
        },

        create: function () {
            // Set background
            game.add.sprite(0, 0, 'title_screen');

            // host = game.add.button(game.world.centerX - 95, 400, 'bomb', start_game, this);
            // host_address
            // host_connection_indicator
            // connect = game.add.button(game.world.centerX - 95, 400, 'bomb', start_game, this);

            // FIXME Placeholder
            bomb = game.add.button(game.width / 2, game.height / 2 - 90, 'bomb', this.connect, this);
        },

        /**
         * Tries to connect to a server and creates the game.
         */
        connect: function () {
            function start_game() {
                game.state.start('play');
            }

            // TODO Setup input to define host
            // socket = open_connection('192.168.0.207:3000', start_game);
            socket = open_connection('localhost:3000', start_game);

        },
    };