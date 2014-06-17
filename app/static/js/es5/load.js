/* global Game, game, Phaser */
'use strict';

Game.Load = function() {
  this.game = game;
  this.isReady = false;
};

Game.Load.prototype = {

  preload: function () {
  	// load everything
    this.load.image('glow', 'img/glow.png');
    this.load.image('zapperON', 'img/zapper.png');
    this.load.image('zapperOFF', 'img/zapperOFF.png');
    this.load.image('zapperSpinner2', 'img/zapperSpinner2.png');
    this.load.atlasJSONHash('moth', 'img/moth_animation.png', 'img/moth_animation.json');
    this.load.atlasJSONHash('bugzap', 'img/zapFlash.png', 'img/zapFlash.json');

    // this.load.image('zapFlash', 'img/zapFlash.png');

  },

  create: function () {
    this.add.sprite(0,0, 'background');
    this.add.sprite(0,0, 'splash');
    this.time.events.add(Phaser.Timer.SECOND * 2, this.setReady, this);
  },

  setReady: function() {
    this.isReady = true;
  },

  update: function() {
    if(this.isReady) {
      game.state.start('menu');
    }
  }

};
