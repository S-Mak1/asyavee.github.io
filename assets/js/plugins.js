// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Place any jQuery/helper plugins in here.

"use strict";

/* global document */

var htmlRatioResizeTimeout = null;
var htmlRatioComponentHelper = {
    initialize: function initialize(domElement) {
        domElement.initialized = true;

        var ratioValue = domElement.getAttribute("ratio").split("x");
        var ratioWidth = parseInt(ratioValue[0], 10);
        var ratioHeight = parseInt(ratioValue[1], 10);

        var width = domElement.clientWidth;
        var height = width / ratioWidth * ratioHeight;
        domElement.style.height = height + "px";
    },
    documentResize: function documentResize() {
        if (htmlRatioResizeTimeout) {
            clearTimeout(htmlRatioResizeTimeout);
        }
        htmlRatioResizeTimeout = setTimeout(htmlRatioComponentHelper.initializeAll, 0);
    },
    initializeAll: function initializeAll() {
        var domElements = document.querySelectorAll("[ratio]");

        if (domElements.length > 0) {
            for (var i = 0; i < domElements.length; i++) {
                htmlRatioComponentHelper.initialize(domElements[i]);
            }
        }
    },
    nodeInserted: function nodeInserted(event) {
        if (event.animationName !== "htmlRatioComponentNodeInserted") {
            return;
        }

        if (!event.target.initialized) {
            htmlRatioComponentHelper.initialize(event.target);
        }
    }
};
/* global window, document, htmlRatioComponentHelper */
document.addEventListener("animationstart", htmlRatioComponentHelper.nodeInserted, false);
document.addEventListener("MSAnimationStart", htmlRatioComponentHelper.nodeInserted, false);
document.addEventListener("webkitAnimationStart", htmlRatioComponentHelper.nodeInserted, false);

document.addEventListener("DOMContentLoaded", htmlRatioComponentHelper.initializeAll, false);

window.addEventListener("resize", htmlRatioComponentHelper.documentResize);
