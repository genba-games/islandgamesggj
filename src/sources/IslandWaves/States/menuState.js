// The menu state handles the server connection
var menuState = function () { };
menuState.prototype =
    {
        preload: function() {
            // Load assets
            game.load.image('title_screen', 'src/graphics/title_screen.png')
            game.load.image('bomb', 'src/graphics/bomb.png');
        },

        create: function () {
            // Set background
            game.add.tileSprite(0, 0, 800, 600, 'title_screen');

            // host = game.add.button(game.world.centerX - 95, 400, 'bomb', start_game, this);
            // host_address
            // host_connection_indicator
            // connect = game.add.button(game.world.centerX - 95, 400, 'bomb', start_game, this);

            // FIXME Placeholder
            bomb = game.add.button(game.width / 2, game.height / 2 - 90, 'bomb', this.host, this);
        },

        /**
         * Hosts a new game.
         */
        host: function() {
            game.state.start('play');
        },

        /**
         * Tries to connect to a server.
         */
        server_connect: function() {

        },

        /**
         * Connects to a game.
         */
        game_connect: function() {

        },
    };