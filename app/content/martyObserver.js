(function (window) {
  var TIMEOUT = 10000;

  tryAndFindMarty(1);

  function tryAndFindMarty(time) {
    if (window.Marty) {
      listenToMarty(window.Marty);
    } else {
      if (time > TIMEOUT) {
        postMessage('PAGE_LOADED', {
          martyFound: false
        });
        return;
      }

      setTimeout(function () {
        tryAndFindMarty(time * 2);
      }, time);
    }
  }

  function listenToMarty(Marty) {
    Marty.Diagostics.devtoolsEnabled = true;

    postMessage('PAGE_LOADED', {
      martyFound: true,
      stores: Marty.serializeState().toJSON()
    });

    Marty.addStoreChangeListener(onStoreChanged);
    Marty.Dispatcher.register(onActionDispatched);

    function onActionDispatched(action) {
      postMessage('ACTION_DISPATCHED', action.toJSON());
    }

    function onStoreChanged(state, store) {
      if (store.serialize) {
        state = store.serialize();
      }

      postMessage('STORE_CHANGED', {
        displayName: store.displayName,
        state: state
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