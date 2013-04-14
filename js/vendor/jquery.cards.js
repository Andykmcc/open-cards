(function( $ ){

  var styles = {
    perspective : { '-webkit-perspective': '3000px', '-moz-perspective': '3000px', 'perspective': '3000px' },
    layer : { 'width': '100%', 'height': '100%', 'position' : 'absolute', 'top': 0, 'left': 0 },
    animated : { "-webkit-transform-style": "preserve-3d", "-moz-transform-style": "preserve-3d", 'transform-style': 'preserve-3d', '-webkit-backface-visibility': 'hidden', '-moz-backface-visibility': 'hidden', 'backface-visibility': 'hidden', '-moz-transition': 'all .8s ease-in-out', '-webkit-transition': 'all .8s ease-in-out', 'transition': 'all .8s ease-in-out'},
    openleft : { "-webkit-transform-origin": 'left center', "-moz-transform-origin": 'left center', 'transform-origin': "left center" },
    openright : { "-webkit-transform-origin": "right center", '-moz-transform-origin': 'right center', 'transform-origin': 'right center' },
    layerlast : { "z-index": 700 },
    layerleftfront : { "z-index": 900, '-webkit-transform': 'rotateY(0deg) translateX(0%)', '-moz-transform': 'rotateY(0deg) translateX(0%)', 'transform': 'rotateY(0deg) translateX(0%)' },
    layerleftback : { "z-index": 800, '-webkit-transform': 'rotateY(180deg) translateX(-100%)', '-moz-transform': 'rotateY(180deg) translateX(-100%)', 'transform': 'rotateY(180deg) translateX(-100%)' },
    layerrightfront : { "z-index": 900, '-webkit-transform': 'rotateY(0deg) translateX(0%)', '-moz-transform': 'rotateY(0deg) translateX(0%)', 'transform': 'rotateY(0deg) translateX(0%)' },
    layerrightback : { "z-index": 800, '-webkit-transform': 'rotateY(180deg) translateX(100%)', '-moz-transform': 'rotateY(180deg) translateX(100%)', 'transform': 'rotateY(180deg) translateX(100%)' },
    animaterightfront : { "z-index" : 800, '-webkit-transform': 'rotateY(180deg) translateX(0%)', '-moz-transform': 'rotateY(180deg) translateX(0%)', 'transform': 'rotateY(180deg) translateX(0%)' },
    animaterightback : { "z-index": 900, '-webkit-transform': 'rotateY(360deg) translateX(100%)', '-moz-transform': 'rotateY(360deg) translateX(100%)', 'transform': 'rotateY(360deg) translateX(100%)' },
    animateleftfront : { "z-index": 800, '-webkit-transform': 'rotateY(-180deg) translateX(0%)', '-moz-transform': 'rotateY(-180deg) translateX(0%)', 'transform': 'rotateY(-180deg) translateX(0%)' },
    animateleftback : { "z-index": 900, "-webkit-transform": "rotateY(0deg) translateX(-100%)", "-moz-transform": "rotateY(0deg) translateX(-100%)", 'transform': 'rotateY(0deg) translateX(-100%)' }
  },
  methods = {
    init : function( options ) {
      var docwidth = document.width;
      return this.each(function(i, el){
        var $el = $(el),
            elWidth = $el.width(),
            elLeft = $el.position().left,
            isRight = elLeft + (2 * elWidth) < docwidth ? 1 : 0,
            opendirection = isRight ? styles.openright : styles.openleft,
            layers = $el.children('div');
        
        $el.css(styles.perspective).css(opendirection);

        layers.each(function(i, layer){
          if( i === 0){
            if(isRight){
              $(layer).css(styles.layerrightfront);
            }
            else{
              $(layer).css(styles.layerleftfront);
            }
            $(layer).css(styles.layer).css(styles.animated);
          }
          else if( i === layers.length ){
            $(layer).css(styles.layer).css(styles.layerlast);
          }
          else{
            if(isRight){
              $(layer).css(styles.layerrightback);
            }
            else{
              $(layer).css(styles.layerleftback);
            }
            $(layer).css(styles.layer).css(styles.animated);
          }
        });
      });
    },
  };

  $.fn.cards = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.cards' );
    }

  };

})( jQuery );