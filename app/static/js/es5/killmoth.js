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

    this.time.events.loop(Phaser.Timer.SECOND*3, this.doRestart, this);

  },


  update: function() {
    this.zapFlash.animations.play('zzzt', 14, false, true);

  },


  doRestart: function() {
    this.game.state.start('menu');

  }

};
