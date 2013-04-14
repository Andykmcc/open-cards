(function( $ ){

  methods = {
    init : function( options ) {
      var docwidth = document.width || window.width - 15;
      return this.each(function(i, el){
        var $el = $(el),
            elWidth = $el.width(),
            elLeft = $el.position().left,
            isRight = elLeft + (2 * elWidth) < docwidth ? 1 : 0,
            opendirection = isRight ? 'cards-openRight' : 'cards-openLeft',
            layers = $el.children('div');
        
        $el.addClass('cards-container '+opendirection);

        layers.each(function(i, layer){
          if( i === 0){
            $(layer).addClass('cards-layer cards-animated cards-front');
          }
          else if( i === layers.length-1 ){
            $(layer).addClass('cards-layer cards-last');
          }
          else{
            $(layer).addClass('cards-layer cards-animated cards-back');
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