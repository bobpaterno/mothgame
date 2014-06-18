/* global game, Game */
'use strict';

Game.Play = function() {
   this.game = game;
};

Game.Play.prototype = {
  preload: function () {

  },

  create: function () {
    this.add.image(0,0,'background');
    this.zapperOff = this.add.sprite(350,0,'zapperOFF');
    this.lighting = this.add.group();
    this.lighting.create(0,0,'glow');
    this.lighting.create(350,0,'zapperON');
    this.lighting.setAll('alpha',0);
  }
};
