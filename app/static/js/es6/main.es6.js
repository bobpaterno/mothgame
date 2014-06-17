/* global Game, Phaser */

var game;

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

    game.state.add('boot', Game.Boot);
    game.state.add('load', Game.Load);
    game.state.add('menu', Game.Menu);
    game.state.add('play', Game.Play);

    game.state.start('boot');
  }

})();
