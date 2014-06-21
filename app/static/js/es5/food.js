/* global Phaser */

'use strict';

var Food = function(game, x, y, key) {
  this.MAX_HEALTH = 5;
  this.count = 0;
  Phaser.Sprite.call(this, game, x, y, key, 1);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.reset(x,y,5);

  this.game.physics.arcade.enableBody(this);

};

Food.prototype = Object.create(Phaser.Sprite.prototype);
Food.prototype.constructor = Food;

Food.prototype.update = function() {

};

Food.prototype.resetFood = function(x,y) {
  this.revive(this.MAX_HEALTH);
  this.reset(x,y,this.MAX_HEALTH);
  this.count = 0;
};

Food.prototype.eatFood = function(moth,rug) {
  rug.count = rug.count % 59;  // reset every 60 times we hit this function
  rug.count++;
  if(rug.count === 1) {
    if(rug.health) {
      rug.damage(1);
      moth.willpower++;
      moth.isEating = true;
      if(!rug.alive) {
        moth.totalRugsEaten++;
      }
    }
  }

};
