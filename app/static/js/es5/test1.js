/* global game, Game */
'use strict';

Game.Test1 = function() {
   this.game = game;
};

Game.Test1.prototype = {
  preload: function () {
    this.game.load.image('ready', 'img/ready.png');
  },

  create: function () {
    game.add.sprite(300,300,'ready');
  },

  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      console.log('j');
      debugger;
      this.game.state.start('test2');
    }
  }
};
