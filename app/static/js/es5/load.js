/* global Game, game */
'use strict';

Game.Load = function() {
  this.game = game;
};

Game.Load.prototype = {
  preload: function () {
  	// create loading screen
  	this.stage.backgroundColor = '#229';

  	var bar = this.add.sprite(200, 145, 'loadbar');
  	bar.x -= this.game.world.width/2 / 2 - 5;
  	bar.anchor.setTo(0, 0.5);

  	this.load.setPreloadSprite(bar);

  	// load everything
  	this.load.image('square-green', 'img/square-green.png');

  },

  create: function () {
    game.add.sprite(300,300,'square-green');
    
    game.state.start('test1');
  }
};
