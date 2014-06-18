/* global game, Game */
'use strict';

Game.Play = function() {
   this.game = game;
};

Game.Play.prototype = {
  preload: function () {
    this.game.load.image('arrow', 'img/keys-arrows.png');
  },

  create: function () {
    this.add.sprite(500,300,'arrow');
  }
};
