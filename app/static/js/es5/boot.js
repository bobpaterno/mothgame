/* global game */
'use strict';

var Game = {};

Game.Boot = function() {
   this.game = game;
};

Game.Boot.prototype = {
  preload: function () {
    this.game.input.maxPointers = 1;
  	this.game.load.image('loadbar', 'img/loadbar.png');
  },

  create: function () {
    this.game.state.start('Load');
  }
};
