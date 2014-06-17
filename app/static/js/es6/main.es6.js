/* global Game, Phaser */

var game;

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

    game.state.add('Boot', Game.Boot);
    game.state.add('Load', Game.Load);
    game.state.add('test1', Game.Test1);
    game.state.add('test2', Game.Test2);

    game.state.start('Boot');
  }

})();
