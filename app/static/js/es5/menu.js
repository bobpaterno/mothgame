/* global game, Game, Phaser */
'use strict';

Game.Menu = function() {
   this.game = game;
   this.zapper = null;
};

Game.Menu.prototype = {
  preload: function () {
    this.game.load.image('ready', 'img/ready.png');
  },

  create: function () {
    this.add.image(0,0,'background');
    game.add.sprite(300,300,'ready');
    this.zapper = this.add.sprite(350,0,'zapperOFF');
    this.time.events.add(Phaser.Timer.SECOND * 2, this.doSomething, this);
    this.time.events.add(Phaser.Timer.SECOND * 4, this.doSomethingElse, this);


  },

  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  },

  doSomething: function() {
    this.zapper.kill();
  },

  doSomethingElse: function() {
    // this.zapper.reset(350,0);
    this.zapper.revive();
  }
};
