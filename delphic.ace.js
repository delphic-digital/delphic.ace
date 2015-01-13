/* ==========================================================
 *
 * Delphic.gatracking.js
 * Version: 2.0.0 (Tues, 13 Jan 2015)
 * Delphic Digital
 *
 * ========================================================== */


//https://developers.google.com/analytics/devguides/collection/analyticsjs/events#implementation
//https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
//http://www.comicvine.com/ace-the-bat-hound/4005-31302/

;(function(DELPHIC, $) {
	var $body,
	    initialized = false,
	    options = {
		  	delay: 100,
		  	extensions: {},
	    };

	function _init(opts) {
		if (!initialized) {
			initialized = true;
			$body = $("body");
			$.extend(options, opts || {});

			$body.on("click.ace", "*[data-delphic-event]", _track);

			// Extentions for future use
			for (var i in $.ace.extensions) {
				if ($.ace.extensions.hasOwnProperty(i)) {
					$.ace.extensions[i]( options.extensions[i] || null );
				}
			}
		}
	}

	function _track(e) {
		// Universal Analytics
		if (typeof window.ga === "function") {
			e.preventDefault();

			var $target = $(this),
				url = $target.attr("href"),
				data = $target.data("delphic-event").split(",");

			for (var i in data) {
				if (data.hasOwnProperty(i)) {
					data[i] = $.trim(data[i]);
				}
			}

			// Push data
			_push(data[0], data[1], (data[2] || url), data[3], data[4], $target);
		}
	}

	function _push(category, action, label, value, noninteraction, $target) {
		if (typeof window.ga === "function") {
			var event = {
				"hitType": "event",
				"location": window.location,
				"title": window.document.title
			};
			if (category) {
				event["eventCategory"] = category;
			}
			if (action) {
				event["eventAction"] = action;
			}
			if (label) {
				event["eventLabel"] = label;
			}
			if (value) {
				event["eventValue"] = value;
			}
			if (noninteraction) {
				event["nonInteraction"] = noninteraction;
			}

			if (typeof $target !== "undefined") {
				var href = (typeof $target[0].href !== "undefined") ? $target[0].href : "",
				    url = (href.indexOf(":") < 0) ? window.location.protocol + "//" + window.location.hostname + "/" + href : href;

				if (href !== "") {
					// Check window target
					if ($target.attr("target")) {
						window.open(url, $target.attr("target"));
					} else {
						event["hitCallback"] = function() {
							document.location = url;
						};
					}
				}
			}

			DEBUG && console.info(event);

			window.ga("send", event);
		}
	}

	$.ace = function() {
		if (arguments.length && typeof arguments[0] !== "object") {
			_push.apply(this, arguments);
		} else {
			_init.apply(this, arguments);
		}
	};

	$.ace.extensions = {};

} (DELPHIC = window.DELPHIC || {}, window.jQuery || window.Zepto));
