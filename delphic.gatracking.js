// https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide

;(function(DELPHIC, $) {

	$.fn.trackMe = function(opts) {

		$(this).click(function(e){
			e.preventDefault();

			var $this = $(this),
			    href = $this.attr('href'),
			    target = $this.attr('target'),
			    category = $this.attr('track-event'),
			    action = $this.attr('track-action'),
			    label = $this.attr('track-label'),
			    value = $this.attr('track-value'),
			    nonInteraction = $this.attr('track-nonInteraction');

			action = action?action:'Click';
			label = label?label:window.location.pathname;

			ga('send', 'event', category, action, label, value, nonInteraction);

			if(href){
				setTimeout(function() {
					if(target == '_blank'){
						window.open(href);
					}else{
						document.location.href = href;
					}
				}, 80);
			}

		});

	}

	$('[data-track-event]').trackMe();

} (DELPHIC = window.DELPHIC || {}, jQuery));
