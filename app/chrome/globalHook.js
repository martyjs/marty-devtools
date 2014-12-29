var js =
 '(' + (function (window) {
  findMarty();

  function findMarty() {
    if (window.Marty) {
      listenToActions(window.Marty);
    } else {
      setTimeout(findMarty, 1);
    }
  }

  function listenToActions(Marty) {
    Marty.Stores.Actions.addChangeListener(onActionsChanged);

    function onActionsChanged(state, store, actionToken) {
      var message = {
        type: 'ACTION_CHANGED',
        target: 'devtools-page',
        source: 'marty-extension',
        payload: {
          stores: stateOfStores(),
          action: Marty.getAction(actionToken)
        }
      };

      console.log('action changed', message.payload);

      window.postMessage(message, '*');
    }

    function stateOfStores() {
      var stores = {};

      Marty.getStores().forEach(function (store) {
        stores[store.name] = store.getState();
      });

      return stores;
    }
  }
}).toString() + ')(window)';

window.addEventListener('message', function(event) {
  // Only accept messages from the same frame
  if (event && event.source !== window) {
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