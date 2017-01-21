// Initialize Phaser, and creates a 800x800px game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div');
var game_state = {};

// Creates a new 'main' state that wil contain the game
game_state.main = function () {};
game_state.main.prototype = 
{
    preload: function() 
    {
        // Function called first to load all the assets
        game.load.image('island_placeholder', 'src/graphics/PLACEHOLDER.png');
    },

    create: function() 
    {
        Island(game, 0, 0, 'island_placeholder');
    },

    update: function() 
    {
        
    },

};

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);
game.state.start('main');