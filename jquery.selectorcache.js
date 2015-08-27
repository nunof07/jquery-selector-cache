/*!
 * jQuery Selector Cache Plugin
 * https://github.com/nunof07/jquery-selector-cache
 * @version 0.1.0
 * @author Nuno Freitas (nunofreitas@gmail.com)
 * @license https://raw.githubusercontent.com/nunof07/jquery-selector-cache/master/LICENSE
 */
/**
 * Extends jQuery to allow for caching of jQuery objects.
 * Helps avoiding unnecessary selector lookups or having to use extra variables to store them.
 * Supports contexts and cache refreshes.
 */
/* global jQuery */
;(function ($) {
	"use strict";
	
	$.extend({
		/**
		 * Expose the cache, allowing more control.
		 * E.g. clearing entire cache, manually adding to cache.
		 */
		selectorCache: {},
		
		/**
		 * Cache a jQuery object by its selector.
		 * @param {String} selector - A jQuery selector expression.
		 * @param {String|jQuery Object} context - (optional) Either a jQuery selector expression or a jQuery object to use as a context.
		 * @param {Boolean} refresh - (optional) Indicates whether to refresh the cache for this particular selector/context.
		 * @returns {jQuery Object}
		 */
		q: function (selector, context, refresh) {
			if (!selector
				|| (typeof selector !== "string")	// selector must be a string
				|| (context							// context is optional
					&& typeof context !== "string"	//  but must be a string
					&& typeof context !== "boolean"	// 	a boolean (assume refresh parameter)
					&& !context.jquery)) {			// 	or a jquery object
				// ignore cache when selector or context is not supported
				return $(selector, context);
			} else {
				var key = selector,
					hasContext = context && (typeof context === "string" || context.jquery);
					
				if (hasContext) {
					// include context selector in cache key
					var contextSelector = context.jquery ? context.selector : context;
					key = contextSelector + " " + selector;
				} else if (typeof context === "boolean") {
					// second argument was a boolean so update refresh argument
					refresh = context;
				}
				
				if ($.selectorCache[key] === undefined || refresh === true) {
					// update cache
					$.selectorCache[key] = hasContext ? $(selector, context) : $(selector);
				}
				
				return $.selectorCache[key];
			}
		}
	});
}(jQuery));