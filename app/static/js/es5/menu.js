/* global game, Game, Phaser */
'use strict';

Game.Menu = function() {
   this.game = game;
   this.zapperOff = null;
   this.alphaVal = 0;
   this.zapOn = false;
};

Game.Menu.prototype = {
  create: function () {
    this.add.image(0,0,'background');
    this.zapperOff = this.add.sprite(350,0,'zapperOFF');
    this.lighting = this.add.group();
    this.lighting.create(0,0,'glow');
    this.lighting.create(350,0,'zapperON');
    this.lighting.setAll('alpha',0);
    this.add.image(0,300, 'instructions');

    this.intromusic = this.game.add.sound('aud_musicintro');
    this.intromusic.volume = 0.3;
    this.intromusic.play();


    this.time.events.loop(Phaser.Timer.SECOND*1.5, this.doZap, this);

  },


  update: function() {
    // Wait for player click to proceed to game
    if(this.game.input.activePointer.justPressed()) {
      this.intromusic.stop();

      this.game.state.start('play');
    }

    // Calculate a sinusoidal alpha value for the glow lighting and zapperON images
    if(this.alphaVal % 315 === 0) {
      this.alphaVal = 0;
    }
    this.lighting.setAll('alpha', Math.sin(0.01*this.alphaVal++));

  },


  doZap: function() {
    // when zapper is bright enough, do a zap animation
    if(Math.sin(0.01*this.alphaVal) > 0.9) {
      if(this.zapOn){
        this.zapFlash.destroy();
        this.zapOn = false;
      }
      this.zapFlash = this.add.sprite(425-(100*Math.random()),(80-(40*Math.random())),'bugzap');
      this.zapFlash.animations.add('zzzt', ['zapFlash2.png', 'zapFlash1.png', 'zapFlash3.png'], 3, false, false);
      this.zapFlash.animations.play('zzzt', 14, false, true);
      this.zapOn = true;
    }
  }

};
