/* global game */
'use strict';

var Game = {};

Game.Boot = function() {
   this.game = game;
};

Game.Boot.prototype = {
  preload: function () {
    this.game.input.maxPointers = 1;
  	this.load.image('background', 'img/background3.png');
    this.load.image('splash', 'img/splash.png');
  },

  create: function () {
    this.game.state.start('load');
  }
};
