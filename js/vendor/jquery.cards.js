(function( $ ){
  var Cards = [],
      activate = null,
      resizeHappened  = false,
      newscreensize = 0;

  methods = {
    init : function( options ) {
      var docwidth = document.width || window.width - 15,
          activate = options ? options.activate : 'mouseenter mouseleave',
          Cards = this;

      setTimeout(function(){
        if(resizeHappened){
          resizeHappened = false;

          return Cards.each(function(i, el){
            methods.setup(i, el, newscreensize, activate);
          });
        }
        setTimeout(arguments.callee, 10);
      }, 10);

      $(window).resize(function(){ resizeHappened = true; newscreensize = this.document.width; });

      return Cards.each(function(i, el){
        methods.setup(i, el, docwidth, activate);
      });

    },
    setup : function(i, el, documentwidth, activateevent){
      var $el = $(el),
            elWidth = $el.width(),
            elLeft = $el.position().left,
            isRight = elLeft + (2 * elWidth) < documentwidth ? 1 : 0,
            opendirection = isRight ? 'cards-openRight' : 'cards-openLeft',
            layers = $el.children('div');

        
        $el.addClass('cards-container '+opendirection).on( activateevent, methods.toggle ).css({'z-index': ++i*100 }).data('org-zindex', ++i*100);

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
    },
    resizeAdjust : function( newWidth ){

      return Cards.each(function(i, el){
        methods.setup(i, el, newWidth, activate);
      });

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