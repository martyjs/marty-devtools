// var version = '0.7.2';

window.addEventListener('beforeunload', onUnload);
window.addEventListener('message', onMessageFromPage);

var script = document.createElement('script');
script.textContent = jsToInject();
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

function jsToInject() {
  var connectToMarty = function (window) {
    tryAndFindMarty();

    function tryAndFindMarty() {
      if (window.Marty) {
        listenToMarty(window.Marty);
      } else {
        setTimeout(tryAndFindMarty, 1);
      }
    }

    function listenToMarty(Marty) {
      Marty.Dispatcher.register(onActionDispatched);

      function onActionDispatched(action) {
        var message = {
          type: 'ACTION_DISPATCHED',
          target: 'devtools-page',
          source: 'marty-extension',
          payload: {
            action: action.toJSON()
          }
        };

        window.postMessage(message, '*');
      }
    }
  };

  return '(' + connectToMarty.toString() + ')(window)';
}

function onUnload() {
  chrome.runtime.sendMessage({
    target: 'devtools-page',
    source: 'marty-extension',
    type: 'PAGE_UNLOAD'
  });
}

function onMessageFromPage(event) {
  // Only accept messages from the same frame
  if (event && event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null || message.source !== 'marty-extension') {
    return;
  }

  chrome.runtime.sendMessage(message);
}