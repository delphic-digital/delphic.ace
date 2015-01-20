;(function(DELPHIC, $) {

	var ace = $.ace;

	ace.extensions.scroll = function(opts){

		$.fn.isOnScreen = function(){
			var win = $(window);

			var viewport = {
				top : win.scrollTop(),
				left : win.scrollLeft()
			};

			viewport.right = viewport.left + win.width();
			viewport.bottom = viewport.top + win.height();

			var height = this.height();
			var width = this.width();

			if(!width || !height){ return false;}

			var bounds = this.offset();
			bounds.right = bounds.left + width;
			bounds.bottom = bounds.top + height;

			var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

			if(!visible){
				return false;
			}

			return true;
		}

		console.log($('.external-link').isOnScreen());
	}

} (DELPHIC = window.DELPHIC || {}, window.jQuery || window.Zepto));