debugCSS = true;
loadScript = function () {};
window.removeEventListener('DOMContentLoaded', windowLoaded, false); // jshint ignore:line

var view = WebInspector.View.prototype;

view._registerRequiredCSS = view.registerRequiredCSS;

view.registerRequiredCSS = function(cssFile) {
  this._registerRequiredCSS('../../blink/Source/devtools/front_end/' + cssFile);
};