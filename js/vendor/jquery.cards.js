(function( $ ){

  methods = {
    init : function( options ) {
      var docwidth = document.width || window.width - 15,
          activate = options ? options.activate : 'mouseenter mouseleave';

      return this.each(function(i, el){
        var $el = $(el),
            elWidth = $el.width(),
            elLeft = $el.position().left,
            isRight = elLeft + (2 * elWidth) < docwidth ? 1 : 0,
            opendirection = isRight ? 'cards-openRight' : 'cards-openLeft',
            layers = $el.children('div');

        
        $el.addClass('cards-container '+opendirection).on( activate, methods.toggle ).css({'z-index': ++i*100 }).data('org-zindex', ++i*100);

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
    toggle : function(){
      var $this = $(this),
          zindex = $this.data('org-zindex');

      if( $this.hasClass('cards-open')){
        $this.removeClass('cards-open').css( { 'z-index' : zindex } );
        $this.trigger('cards-close');
      }
      else{
        $this.addClass('cards-open').css( { 'z-index' : zindex*100 } );
        $this.trigger('cards-open');
      }
    }
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