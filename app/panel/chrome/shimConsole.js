var _ = require('lodash');

function shimConsole(console) {
  if (!window.chrome.devtools) {
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    ['log', 'info', 'warn', 'error'].forEach(function (type) {
      var func = console[type];

      console[type] = function () {
        var args = JSON.stringify(_.toArray(arguments));
        var code = 'console.' + type + '.apply(console, ' + args + ')';

        chrome.devtools.inspectedWindow.eval(code); // jshint ignore:line

        func.apply(console, arguments);
      };
    });
  }
}

module.exports = shimConsole;