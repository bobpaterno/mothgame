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
    this.load.image('zapperSpinner', 'img/zapperSpinner2.png');
    this.load.image('instructions', 'img/instructions.png');
    this.load.image('rugBad', 'img/rugBAD.png');
    this.load.image('rugGood', 'img/rugGOOD.png');
    this.load.image('rugPiece', 'img/rugPiece.png');

    this.load.atlasJSONHash('moth', 'img/moth_animations.png', 'img/moth_animations.json');
    this.load.atlasJSONHash('bugzap', 'img/zapFlash.png', 'img/zapFlash.json');

    this.load.audio('aud_mothPretty', 'audios/pretty.mp3');
    this.load.audio('aud_thelight', 'audios/thelight.mp3');
    this.load.audio('aud_music', 'audios/music.mp3');
    this.load.audio('aud_musicintro', 'audios/gameintro.mp3');
    this.load.audio('aud_zzt1', 'audios/zzt.mp3');
    this.load.audio('aud_zzt2', 'audios/zzt2.mp3');
    this.load.audio('aud_zapperHum', 'audios/zapperOn.mp3');


  },

  create: function () {
    this.add.sprite(0,0, 'background');
    this.add.sprite(0,0, 'splash');
    this.time.events.add(Phaser.Timer.SECOND * 3, this.setReady, this);
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
