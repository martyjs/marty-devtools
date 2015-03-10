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
    if (Marty.Diagnostics) {
      Marty.Diagnostics.devtoolsEnabled = true;
    }

    postMessage('PAGE_LOADED', {
      martyFound: true,
      stores: Marty.dehydrate().toJSON()
    });

    var Dispatcher = Marty.Dispatcher.getDefault();

    Marty.addStoreChangeListener(onStoreChanged);
    Dispatcher.onActionDispatched(onActionDispatched);

    function onActionDispatched(action) {
      postMessage('ACTION_DISPATCHED', action.toJSON());
    }

    function onStoreChanged(state, store) {
      var state = (store.dehydrate || store.getState).call(store)

      postMessage('STORE_CHANGED', {
        id: store.id,
        state: state,
        displayName: store.displayName
      });
    }
  }

  function postMessage(type, payload) {
    try {
      window.postMessage(message(type, payload), '*');
    } catch (e) {
      console.error('failed to post message', payload, e);
    }
  }

  function message(type, payload) {
    return {
      type: type,
      payload: payload || {},
      source: 'marty-extension'
    };
  }
})(window);