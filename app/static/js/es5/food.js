/* global Phaser */

'use strict';

var Food = function(game, x, y, key) {
  this.amtFood = 5;
  this.count = 0;
  Phaser.Sprite.call(this, game, x, y, key, 1);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.game.physics.arcade.enableBody(this);
  // this.anchor.setTo(0.5,0.5);
  // this.body.immovable = true;

};

Food.prototype = Object.create(Phaser.Sprite.prototype);
Food.prototype.constructor = Food;

Food.prototype.update = function() {
  // console.log(this);
  // debugger;

};


Food.prototype.eatFood = function(moth,rug) {
  rug.count = rug.count % 59;  // reset every 60 times we hit this function
  rug.count++;
  if(rug.count === 1) {
    if(rug.amtFood) {
      rug.amtFood--;
      moth.willpower++;
      moth.isEating = true;
    }
    else {
      rug.visible = false;
    }
  }
};
