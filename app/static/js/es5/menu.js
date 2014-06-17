/* global game, Game, Phaser */
'use strict';

Game.Menu = function() {
   this.game = game;
   this.zapperOff = null;
   this.alphaVal = 0;
   this.zapOn = false;
};

Game.Menu.prototype = {
  preload: function () {
    this.game.load.image('ready', 'img/ready.png');

  },

  create: function () {
    this.add.image(0,0,'background');
    this.zapperOff = this.add.sprite(350,0,'zapperOFF');
    this.lighting = this.add.group();
    this.lighting.create(0,0,'glow');
    this.lighting.create(350,0,'zapperON');
    this.lighting.setAll('alpha',0);
    game.add.sprite(300,300,'ready');


    this.time.events.loop(Phaser.Timer.SECOND*(5*Math.random()), this.doZap, this);

  },

  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
    if(this.alphaVal % 315 === 0) {
      this.alphaVal = 0;
    }
    this.lighting.setAll('alpha', Math.sin(0.01*this.alphaVal++));
  },

  doZap: function() {
    if(this.zapOn){
      this.zapFlash.destroy();
      this.zapOn = false;
    }
    this.zapFlash = this.add.sprite(425-(100*Math.random()),(80-(40*Math.random())),'bugzap');
    this.zapFlash.animations.add('zzzt', ['zapFlash2.png', 'zapFlash1.png', 'zapFlash3.png'], 3, false, false);
    this.zapFlash.animations.play('zzzt', 14, false, true);
    this.zapOn = true;
  }

};
