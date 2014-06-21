/* global game, Game, Phaser, Food */
'use strict';


Game.Play = function() {
  window.play = this;
   this.game = game;
   this.MAX_VELOCITY_X = 150;
   this.MAX_VELOCITY_Y = 200;
   this.ACCELERATION = 1500;
   this.PULL_RADIUS = 500;
   this.WPWARN = 20;
   this.zapperPull = 1;  // 1 means none, 0 means you can't move: one when zapper light is off
   this.escapeStrength = 45;
   this.zapperStrength = 500;
   this.zapperGravityX = 0;
   this.zapperGravityY= 50;
   this.pullStrength = 0.0001;
};

Game.Play.prototype = {
  preload: function () {
    this.isZapperOn = false;
  },


  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Render background and zapper
    this.add.image(0,0,'background');
    this.hypno = this.add.sprite(400,70, 'zapperSpinner');
    this.hypno.anchor.setTo(0.5,0.5);
    this.hypno.visible = false;
    this.zapperOff = this.add.sprite(350,0,'zapperOFF');
    this.lighting = this.add.group();
    this.lighting.create(0,0,'glow');
    this.zapper = this.lighting.create(350,0,'zapperON');
    this.lighting.setAll('visible',false);


    // Render some items
    this.rugB = this.renderFood('rugBad');
    this.rugG = this.renderFood('rugGood');
    this.rugB.x = this.rugG.x;
    this.rugB.y = this.rugG.y;

    // Render moth
    this.moth = this.game.add.sprite(200,300,'moth');
    this.game.physics.enable(this.moth, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enableBody(this.moth);

    this.moth.body.gravity.y = 30;
    this.moth.body.collideWorldBounds = true;
    this.moth.body.maxVelocity.setTo(this.MAX_VELOCITY_X, this.MAX_VELOCITY_Y);
    this.moth.body.drag.setTo(100,0);
    this.moth.animations.add('mothleft', ['mothL1.png', 'mothL2.png', 'mothL3.png', 'mothL2.png'], 20, true, false);
    this.moth.animations.add('mothright', ['mothR5.png', 'mothR6.png'], 10, true, false);
    this.moth.animations.add('mothsweatL', ['moth1L1_sweat.png', 'moth1L2_sweat.png', 'moth1L3_sweat.png', 'moth1L4_sweat.png'], 8, true, false);
    this.moth.animations.add('mothsweatR', ['moth1R1_sweat.png', 'moth1R2_sweat.png', 'moth1R3_sweat.png', 'moth1R4_sweat.png'], 8, true, false);
    this.moth.animations.add('mothloveL', ['mothLOVE_L1.png','mothLOVE_L2.png'], 8, true, false);
    this.moth.animations.add('mothloveR', ['mothLOVE_R1.png','mothLOVE_R2.png'], 8, true, false);

    this.moth.animations.play('mothright');

    this.emitter = game.add.emitter(0, 0, 10);
    this.emitter.makeParticles('rugPiece');
    this.emitter.gravity = 200;


    // Initialize cursor control
    this.cursors = this.input.keyboard.createCursorKeys();

    this.moth.willpower = 2;
    this.moth.isEating = false;

    this.time.events.loop(Phaser.Timer.SECOND*10, this.toggleZapper, this);
    this.rugTimer = this.time.events.loop(Phaser.Timer.SECOND*14, this.rugTimerHandler, this);


    var style = { font: '18px Arial', fill: '#ff0044', align: 'center' };
    this.text = this.add.text(60, 20, 'Willpower: '+this.moth.willpower, style);

    this.text.anchor.set(0.5);

  },


  update: function () {
    this.text.setText('Willpower: '+this.moth.willpower);

    this.moth.bringToTop();
    this.checkIfEating();
    if(!this.rugG.health) {
      this.rugB.visible = true;
    }

    this.game.physics.arcade.overlap(this.moth,this.rugG, this.rugG.eatFood, this.ok2Eat);

    this.setZapperPull();
    this.setMothMovement();
    if(this.isZapperOn) {
      this.rotateHypno();
    }

    this.checkMothKill();
  },


  setMothMovement: function() {
    if(this.isZapperOn && this.moth.willpower === 0) {
      if(this.moth.body.x < (this.world.width / 2)-50) { //
        this.moth.animations.play('mothloveR');
        this.moth.body.acceleration.x = this.ACCELERATION * this.zapperPull;
      }
      else {
        this.moth.animations.play('mothloveL');
        this.moth.body.acceleration.x = -this.ACCELERATION * this.zapperPull;
      }
      this.moth.body.acceleration.y = 0;
      this.moth.body.gravity.y = -100;
    }
    else{
      if(this.cursors.left.isDown) {
        this.moth.animations.play('mothleft');
        this.moth.body.acceleration.x = -this.ACCELERATION * this.zapperPull;
      }
      else if(this.cursors.right.isDown) {
        this.moth.animations.play('mothright');
        this.moth.body.acceleration.x = this.ACCELERATION * this.zapperPull;
      }
      else if(this.cursors.up.isDown) {
        this.setUpwardsAcceleration();
      }
      else if(this.cursors.down.isDown) {
        this.setDownwardsAcceleration();
      }
      else {
        this.moth.body.acceleration.x = this.zapperGravityX;
        this.moth.body.acceleration.y = 10;
        this.moth.body.gravity.y = this.zapperGravityY;
      }
    }

  },


  setUpwardsAcceleration: function () {
    if(this.moth.body.acceleration.y > 0) {
      this.moth.body.acceleration.y = -this.ACCELERATION;
    }
    else {
      this.moth.body.acceleration.y = -200;
    }
  },


  setDownwardsAcceleration: function () {
    this.moth.body.acceleration.y = Math.round(90*(1-this.pullStrength));
    if(this.isZapperOn) {
      this.moth.body.gravity.y = -1* Math.round((this.moth.body.acceleration.y)*this.pullStrength);
    }
    else {
      this.moth.body.gravity.y = this.zapperGravityY;
    }
  },


  turnZapperOn: function() {
    this.isZapperOn = true;
    this.moth.body.drag.setTo(300,0);

  },


  turnZapperOff: function() {
    this.isZapperOn = false;
    this.moth.body.drag.setTo(100,0);

  },


  toggleZapper: function () {
    this.moth.willpower = this.moth.willpower <= 0 ? 0 : this.moth.willpower-1;
    this.text.setText('Willpower: '+this.moth.willpower);
    this.isZapperOn = !this.isZapperOn;
    this.lighting.setAll('visible',this.isZapperOn);
    if(this.moth.willpower < this.WPWARN && this.isZapperOn) {
      this.hypno.visible = true;
    }
    else {
      this.hypno.visible = false;
    }
  },


  setZapperGravity: function () {
    var newGravity = (this.zapperStrength - this.zapperStrength*this.zapperPull);

    if(this.isZapperOn) {
      this.zapperGravityY = -newGravity;

      if(this.moth.body.x < (this.world.width / 2)-50) {
        this.zapperGravityX = newGravity;
      }
      else if(this.moth.body.x > this.world.width / 2) {
        this.zapperGravityX = -newGravity;
      }
      else {
        this.zapperGravityX = 0;
      }
      this.moth.body.maxVelocity.setTo(this.pullStrength*this.MAX_VELOCITY_X, this.pullStrength*this.MAX_VELOCITY_Y);

    }
    else {
      this.zapperGravityY = 50;
      this.zapperGravityX = 0;
      this.moth.body.maxVelocity.setTo(this.MAX_VELOCITY_X, this.MAX_VELOCITY_Y);
    }
  },


  setZapperPull: function () {  // sets zapperPull and zapperGravity-X&Y values
    if(this.isZapperOn) {
      this.PULL_RADIUS = 500;
      var dist = this.physics.arcade.distanceBetween(this.moth, this.zapper);
      dist = dist < 70 ? this.escapeStrength : dist;  // don't want it to be zero
      this.zapperPull = dist > this.PULL_RADIUS ? 1 : dist/this.PULL_RADIUS/2;
      this.pullStrength = Math.sin(0.005*dist/this.PULL_RADIUS*314); // farther away, less pull from zapper

    }
    else {
      this.zapperPull = 1;
      this.pullStrength = 0;
    }
    this.setZapperGravity();

  },


  randXY: function(w,h) { // checks that it isn't an xy pair on bug zapper
    var x = w * Math.random();
    var y = h * Math.random();

    while( (x>=this.zapper.x && x<=this.zapper.x+this.zapper.width) ) {
      x = w * Math.random();
    }
    while( (y>=this.zapper.y && y<=this.zapper.y+this.zapper.height) ) {
      y = h * Math.random();
    }
    return {x:Math.floor(x), y:Math.floor(y)};

  },

  renderFood: function(name) {
    var obj = this.randXY(650,500);
    var rug = new Food(this.game, obj.x, obj.y, name);
    this.game.add.existing(rug);
    return rug;

  },


  rugTimerHandler: function() {
    var obj = this.randXY(650,500);
    this.rugB.resetFood(obj.x, obj.y);
    this.rugG.resetFood(obj.x, obj.y);

  },


  ok2Eat: function(moth,rug) {
    var dist = Math.floor(window.play.physics.arcade.distanceBetween(moth,rug));
    return (dist < 35 ? true : false);
  },


  checkIfEating: function() {
    if(this.moth.isEating) {
      this.moth.isEating = false;
      this.emitter.on = true;
      this.emitter.x = this.moth.body.x +48;
      this.emitter.y = this.moth.body.y +10;
      this.emitter.start(true, 2000, 20,100);
    }
    else {
      this.emitter.on = false;
    }

  },


  rotateHypno: function () {
    if(this.hypno.visible) {
      this.hypno.rotation += 0.005;
    }
  },


  checkMothKill: function() {
    if(this.isZapperOn) {
      var dist = this.physics.arcade.distanceBetween(this.moth, this.zapper);
      if(dist < 70) {
        this.game.state.start('killmoth');
      }
    }
  }

};
