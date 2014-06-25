(function(){
  'use strict';

  $(document).ready(init);

  var index = 0;
  var timer = null;

  function init() {
    var w = $($('.lines span')[index]).width();
    $($('.lines')[index]).animate({width: w}, 700);
    index++;

    clearInterval(timer);
    timer = setInterval(printLine,1700);
  }

  function printLine() {
    var w = $($('.lines span')[index]).width();
    $($('.lines')[index]).animate({width: w}, 700);
    index++;
    if(index > 3) {
      clearInterval(timer);
    }
  }

})();
