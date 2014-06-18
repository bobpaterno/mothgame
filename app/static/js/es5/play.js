/* global game, Game, Phaser */
'use strict';

Game.Play = function() {
   this.game = game;
   this.MAX_VELOCITY_X = 150;
   this.MAX_VELOCITY_Y = 250;
   this.ACCELERATION = 1500;
};

Game.Play.prototype = {
  preload: function () {
    this.isZapperOn = false;

  },


  create: function () {

    // Render background and zapper
    this.add.image(0,0,'background');
    this.hypno = this.add.sprite(400,70, 'zapperSpinner');
    this.hypno.anchor.setTo(0.5,0.5);
    this.hypno.visible = false;
    this.zapperOff = this.add.sprite(350,0,'zapperOFF');
    this.lighting = this.add.group();
    this.lighting.create(0,0,'glow');
    this.lighting.create(350,0,'zapperON');
    this.lighting.setAll('visible',false);

    // Render moth
    this.moth = this.game.add.sprite(200,300,'moth');
    this.game.physics.enable(this.moth, Phaser.Physics.ARCADE);
    this.moth.body.gravity.y = 30;
    this.moth.body.collideWorldBounds = true;
    this.moth.body.maxVelocity.setTo(this.MAX_VELOCITY_X, this.MAX_VELOCITY_Y);
    this.moth.body.drag.setTo(100,0);
    this.moth.animations.add('mothleft', ['mothL1.png', 'mothL2.png', 'mothL3.png', 'mothL2.png'], 20, true, false);
    this.moth.animations.add('mothright', ['mothR5.png', 'mothR6.png'], 10, true, false);
    this.moth.animations.play('mothright');

    // Initialize cursor control
    this.cursors = this.input.keyboard.createCursorKeys();

  },

  update: function () {
    this.mothSetMovement();
    if(this.isZapperOn) { // zapper is ON
      this.rotateHypno();
    }
  },

  mothSetMovement: function() {
    if(this.cursors.left.isDown) {
      this.moth.body.acceleration.x = -this.ACCELERATION;
      this.moth.animations.play('mothleft');
    }
    else if(this.cursors.right.isDown) {
      this.moth.body.acceleration.x = this.ACCELERATION;
      this.moth.animations.play('mothright');
    }
    else if(this.cursors.up.isDown) {
      this.setUpwardsAcceleration();
    }
    else if(this.cursors.down.isDown) {
      this.setDownwardsAcceleration();
    }
    else {
      this.moth.body.acceleration.x = 0;
      this.moth.body.acceleration.y = 10;
    }


  },

  setUpwardsAcceleration: function () {
    if(this.moth.body.acceleration.y > 0) {
      this.moth.body.acceleration.y = -1500;
    }
    else {
      this.moth.body.acceleration.y = -200;
    }
  },

  setDownwardsAcceleration: function () {
    if(this.moth.body.acceleration.y < 0) {
      this.moth.body.acceleration.y = 100;
    }
    else {
      this.moth.body.acceleration.y = 60;
    }
  },

  rotateHypno: function () {
    if(this.hypno.visible) {
      this.hypno.rotation += 0.01;
    }
  }

};
