// Initialize Phaser, and creates a 800x800px game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div');

socket = undefined;

// Add the game states
game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('play', playState);
//game.state.add('results', playState);

// Start the 'boot' state
game.state.start('boot');
