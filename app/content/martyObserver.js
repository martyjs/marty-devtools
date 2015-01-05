(function (window) {
  var TIMEOUT = 10000;

  tryAndFindMarty(1);

  function tryAndFindMarty(time) {
    if (window.Marty) {
      listenToMarty(window.Marty);
    } else {
      if (time > TIMEOUT) {
        return;
      }

      setTimeout(function () {
        tryAndFindMarty(time * 2);
      }, time);
    }
  }

  function listenToMarty(Marty) {
    postMessage('MARTY_FOUND');

    Marty.Dispatcher.register(onActionDispatched);

    function onActionDispatched(action) {
      postMessage('ACTION_DISPATCHED', {
        action: action.toJSON()
      });
    }
  }

  function postMessage(type, payload) {
    window.postMessage(message(type, payload), '*');
  }

  function message(type, payload) {
    return {
      type: type,
      payload: payload || {},
      source: 'marty-extension'
    };
  }
})(window);