// https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide

;(function(DELPHIC, $) {

	var debug = {};
	debug.log = function(){};
	if (window.console && window.console.log)
		debug.log = function(msg) { window.console.log(msg); };

	$.fn.getEvents = function() {
		if (typeof($._data) == 'function') {
			return $._data(this.get(0), 'events') || {};
		} else if (typeof(this.data) == 'function') { // jQuery version < 1.7.?
			return this.data('events') || {};
		}
		return {};
	};


	$.fn.trackMe = function() {

		var $this = $(this),
		    preventDefaultClick;

		//Check for already assigned click events.
		clickEvents = $this.getEvents().click;

		$this.click(function(e){
			if(!clickEvents)
				e.preventDefault();
			var $this = $(this),
			    href = $this.attr('href'),
			    target = $this.attr('target'),
			    category = $this.data('track-event'),
			    action = $this.data('track-action'),
			    label = $this.data('track-label'),
			    value = $this.data('track-value'),
			    nonInteraction = $this.data('track-nonInteraction');

			action = action?action:'Click';
			label = label?label:window.location.pathname;

			debug.log(">>>>>>>>>>> " + "'send','event',"+ category+","+ action+","+ label+","+ value+","+ nonInteraction);
			ga('send', 'event', category, action, label, value, nonInteraction);


			if(!clickEvents){
				if(href){
					setTimeout(function() {
						if(target == '_blank'){
							window.open(href);
						}else{
							document.location.href = href;
						}
					}, 80)
				}
			}

		});

	}

	$('[data-track-event]').trackMe();

} (DELPHIC = window.DELPHIC || {}, jQuery));
