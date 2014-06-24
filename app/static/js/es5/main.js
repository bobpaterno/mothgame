/* global Game, Phaser */

var game;

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'mothgame');


    game.state.add('boot', Game.Boot);
    game.state.add('load', Game.Load);
    game.state.add('menu', Game.Menu);
    game.state.add('play', Game.Play);
    game.state.add('killmoth', Game.Killmoth);
    game.state.add('victory', Game.Victory);

    game.mothScore = {totalRugs:0, totalEaten:0};

    game.mothBelts = ['Egg','Larva','Nymph','Pupa','Chew-baca',
                      'Motha Trucker','Moth-tastic','Moth-nificent','Mothasaurus','MOTHRA!', 'MOTHRA!'];

    game.state.start('boot');
  }

})();
