/* global game, Game, Phaser */
'use strict';

Game.Killmoth = function() {
   this.game = game;
};

Game.Killmoth.prototype = {
  create: function () {
    this.add.image(0,0,'background');
    this.add.image(0,0,'glow');
    this.add.sprite(350,0,'zapperON');

    this.zapFlash = this.add.sprite(405,50,'bugzap');
    this.zapFlash.animations.add('zzzt', ['zapFlash2.png', 'zapFlash1.png', 'zapFlash3.png'], 3, false, false);

    this.defeatAni = this.add.sprite(this.world.width/2-70,this.world.height/2,'defeat');
    this.defeatAni.animations.add('deadMoth');

    var randNum = Math.round(1+ Math.random()).toString();
    this.zztSound = this.game.add.sound('aud_zzt'+randNum);
    this.zztSound.volume = 0.2;

    this.zztSound.play();


    this.time.events.loop(Phaser.Timer.SECOND*1.4, this.doAnimation, this);

  },


  update: function() {
    this.zapFlash.animations.play('zzzt', 14, false, true);

    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('menu');
    }

  },


  doAnimation: function() {
    this.defeatAni.animations.play('deadMoth', 10, true);
    var style = { font: '42px Arial', fill: '#ff8888', align: 'left' };
    this.txtYouLose = this.add.text(this.world.width/2-70, 150, 'Loser!!', style);
    style = { font: '42px Arial', fill: '#aaaaff', align: 'left' };
    this.txtScore = this.add.text(this.world.width/2 -140, 225, 'Total Rugs: '+game.mothScore.totalEaten, style);
    var pctEaten = (100 * game.mothScore.totalEaten / game.mothScore.totalRugs).toFixed(2);
    this.add.text(this.world.width/2 -240, 275, '% Rugs Devoured: '+pctEaten, style);

    style = { font: '24px Courier', fill: '#aaaaff', align: 'center' };
    this.add.text(this.world.width/2 -140, 465, 'Level Reached: '+game.mothBelts[game.mothScore.totalEaten], style);
    this.txtClickContinue = this.add.text(this.world.width/2-105, 500, 'click to continue', style);

  }


};
