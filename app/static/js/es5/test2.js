/* global game, Game */
'use strict';

Game.Test2 = function() {
   this.game = game;
};

Game.Test2.prototype = {
  preload: function () {
    this.game.load.image('arrow', 'img/keys-arrows.png');
  },

  create: function () {
    game.add.sprite(500,300,'arrow');
  }
};
