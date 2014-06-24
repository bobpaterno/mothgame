/* global game, Game, Phaser */
'use strict';

Game.Victory = function() {
   this.game = game;
};

Game.Victory.prototype = {
  create: function () {
    this.add.image(0,0,'background');
    this.add.image(0,0,'glow');
    this.add.sprite(350,0,'zapperON');

    this.victoryAni = this.add.sprite(this.world.width/2-70,this.world.height/2,'victory');
    this.victoryAni.animations.add('victoryDance');

    this.victorySound = this.game.add.sound('aud_victory');
    this.victorySound.volume = 0.3;

    this.victorySound.play();

    this.victoryAni.animations.play('victoryDance', 5, true);

    this.time.events.loop(Phaser.Timer.SECOND*3, this.doContinue, this);

  },


  update: function() {
    var style = { font: '42px Arial', fill: '#aaaaff', align: 'left' };
    this.txtYouWin = this.add.text(this.world.width/2-80, 150, 'Winner!!', style);
    this.txtScore = this.add.text(this.world.width/2 -140, 210, 'Total Rugs: '+game.mothScore.totalEaten, style);
    var pctEaten = (100 * game.mothScore.totalEaten / game.mothScore.totalRugs).toFixed(2);
    this.add.text(this.world.width/2 -240, 275, '% Rugs Devoured: '+pctEaten, style);

    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('menu');
    }


  },


  doContinue: function() {
    var style = { font: '24px Courier', fill: '#aaaaff', align: 'center' };
    this.add.text(this.world.width/2 -140, 465, 'Level Reached: '+game.mothBelts[game.mothScore.totalEaten], style);
    this.txtClickContinue = this.add.text(this.world.width/2-105, 500, 'click to continue', style);

  }

};
