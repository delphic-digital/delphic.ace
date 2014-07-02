// https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide

;(function(DELPHIC, MINI) {
	
	var $ = MINI.$, $$=MINI.$$, EE=MINI.EE;

	MINI.M.prototype.trackMe = function(opts) { 

		var elms = $(this);

		elms.on('click', function(e, index, selectedIndex){
			var $this = $(elms[index]);

			var href = $this.get('@href'),
			    target = $this.get('@target'),
			    category = $this.get('%track-event'),
			    action = $this.get('%track-action'),
			    label = $this.get('%track-label'),
			    value = $this.get('%track-value'),
			    nonInteraction = $this.get('%track-nonInteraction');

			action = action?action:'Click';
			label = label?label:window.location.pathname;

			_gaq.push(['_trackEvent', category, action, label, value, nonInteraction]);


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
	
} (DELPHIC = window.DELPHIC || {}, MINI));
