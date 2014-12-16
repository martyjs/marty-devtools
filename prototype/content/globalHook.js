var js =
 "(" + (function (window) {
  findMarty();

  function findMarty() {
    if (window.Marty) {
      listenToActions(window.Marty);
    } else {
      setTimeout(findMarty, 1);
    }
  }

  function listenToActions(Marty) {
    var Actions = Marty.Stores.Actions;
    var listener = Actions.addChangeListener(function () {
      var message = {
        type: "ACTIONS_CHANGED",
        target: "devtools-page",
        source: 'marty-extension',
        payload: {
          actions: Actions.getAll()
        }
      };

      console.log('Actions changed', message);

      window.postMessage(message, '*');
    });

  }
}).toString() + ")(window)";

window.addEventListener('message', function(event) {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null || !message.source === 'marty-extension') {
    return;
  }

  chrome.runtime.sendMessage(message);
});


var script = document.createElement('script');
script.textContent = js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);