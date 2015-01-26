;(function(DELPHIC, $) {

	var ace = $.ace;

	ace.extensions.scroll = function(opts){

		var $window = $(window),
		    cache = [],
		    $elms = $('[data-delphic-scroll-event]');

		$.fn.inView = function(){
			var viewport = { top : $window.scrollTop(), left : $window.scrollLeft() },
			    height = this.height(),
			    width = this.width(),
			    bounds = this.offset();

			viewport.right = viewport.left + $window.width();
			viewport.bottom = viewport.top + $window.height();

			if(!width || !height){ return false;}

			bounds.right = bounds.left + width;
			bounds.bottom = bounds.top + height;

			var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

			if(!visible){
				return false;
			}

			return true;
		}

		/*
     * Throttle function borrowed from:
     * Underscore.js 1.5.2
     * http://underscorejs.org
     * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Underscore may be freely distributed under the MIT license.
     */

    function throttle(func, wait) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      var later = function() {
        previous = new Date;
        timeout = null;
        result = func.apply(context, args);
      };
      return function() {
        var now = new Date;
        if (!previous) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
        } else if (!timeout) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }

      $window.on('scroll.ace', throttle(function() {

      	$elms.each(function(){
      		var $this = $(this),
      		    inView = $this.inView();
      		if(inView && !$this.data('fired')){
      			//console.log($this.data());
      			$.ace('jeff')
      			$this.data('fired', true)
      		}
      	})
      }, 300));


		//$.ace()

		//console.log($('.external-link').inView());
	}

} (DELPHIC = window.DELPHIC || {}, window.jQuery || window.Zepto));