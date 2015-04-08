/* ==========================================================
 *
 * Delphic.ace.js
 * Version: 2.0.0 (Tues, 13 Jan 2015)
 * Delphic Digital
 *
 * ========================================================== */


//https://developers.google.com/analytics/devguides/collection/analyticsjs/events#implementation
//https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
//http://www.comicvine.com/ace-the-bat-hound/4005-31302/

(function(DELPHIC, $) {
	"use strict";

	function Ace($elms,options) {
		this.init($elms,options);
	}

	Ace.prototype = {
		init: function($elms,options){
			this.attach($elms,options);
		},

		attach: function($elms, options){
			var self = this;
			if(typeof $elms === 'object'){
				$($elms).on('click.ace', function(e){
					self.click(options,this)
				});
			}else if(typeof $elms === 'string'){
				$(document).on('click.ace', $elms , function(e){
					self.click(options, this)
				});
			}

		},

		click: function(options, elm){
			var self = this;
			var $this = $(elm),
				    data = self.getData(options, $this);

				self.push(data, $this);
		},

		getData: function(options, elm){
			var $target = $(elm),
				url = $target.attr("href"),
				data = $target.data("track-event") || options;

			data = data.split(",");

			for (var i in data) {
				if (data.hasOwnProperty(i)) {
					data[i] = $.trim(data[i]);
				}
			}
			return data;
		},

		push: function(data, $target){

			//category, action, label, value, noninteraction, $target
			if($target) {
				var url = $target.attr("href")
			}

			var category = data[0],
			    action = data[1],
			    label = data[2] || url,
			    value = data[3],
			    noninteraction = data[4];


			if (typeof window.ga === "function") {
				var event = {
					"hitType": "event",
					"location": String(window.location),
					"title": String(window.document.title)
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

				//window.ga("send", event);
			}
		}
	}

	var myAce = new Ace("*[data-track-event]");

	$.ace = function (options) {
		var data = myAce.getData(options);
		myAce.push(data);
	}

	$.fn.ace = function (options) {
		return this.each(function () {
				myAce.attach(this, options );
		});
	};



} (DELPHIC = window.DELPHIC || {}, window.jQuery));
