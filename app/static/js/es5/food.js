/* global Phaser */

'use strict';

var Food = function(game, x, y, key) {
  this.amtFood = 5;
  this.count = 0;
  Phaser.Sprite.call(this, game, x, y, key, 1);
  this.game.physics.arcade.enableBody(this);
  this.anchor.setTo(0.5,0.5);
  this.body.immovable = true;

};

Food.prototype = Object.create(Phaser.Sprite.prototype);
Food.prototype.constructor = Food;

Food.prototype.update = function() {
  // console.log(this);
  // debugger;

};


Food.prototype.eatFood = function() {
  console.log('here');
};
