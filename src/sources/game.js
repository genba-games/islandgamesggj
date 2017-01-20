// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(500, 500, Phaser.AUTO, 'game_div');
var game_state = {};

// Creates a new 'main' state that wil contain the game
game_state.main = function () {};
game_state.main.prototype = 
{

    preload: function() 
    {
        // Function called first to load all the assets
        game.load.image('red_ship', 'src/graphics/ship.png');
    },

    create: function() 
    {
        controls1 = 
        {
            'up' : 
            [
                Phaser.Keyboard.W
            ],
            'down' : 
            [
                Phaser.Keyboard.S
            ],
            'left' : 
            [
                Phaser.Keyboard.A
            ],
            'right' : 
            [
                Phaser.Keyboard.D
            ],
        };

        controls2 = 
        {
            'up' : 
            [
                Phaser.Keyboard.UP
            ],
            'down' : 
            [
                Phaser.Keyboard.DOWN
            ],
            'left' : 
            [
                Phaser.Keyboard.LEFT
            ],
            'right' : 
            [
                Phaser.Keyboard.RIGHT
            ],
        };
        
        game.add.sprite(0, 0, 'red_ship');

    },

    update: function() 
    {
        
    },

};

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);
game.state.start('main');