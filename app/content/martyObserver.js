(function (window) {
  var TIMEOUT = 10000;

  var MartyDevTools = {
    serializers: {
      immutable: {
        canSerialize: function (obj) {
          return !!obj.toJS;
        },
        serialize: function (obj) {
          return obj.toJS();
        }
      }
    },
    registerSerializer: function (serializer) {
      if (!serializer.id) {
        throw new Error('Serializer must have an Id');
      }

      if (!serializer.serialize) {
        throw new Error('Serializer must have a `serialize` function');
      }

      if (!serializer.canSerialize) {
        throw new Error('Serializer must have a `canSerialize` function');
      }

      this.serializers[serializer.id] = serializer;
    }
  };

  window.MartyDevTools = MartyDevTools;

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

  function serialize(obj) {
    var result;
    var serialized = false;

    Object.keys(MartyDevTools.serializers).forEach(function (id) {
      var serializer = MartyDevTools.serializers[id];

      try {
        if (serializer.canSerialize(obj)) {
          result = serializer.serializer(obj);
          serialized = true;
        }
      } catch (e) {
        console.error('The', id, 'serializer failed to serialize', obj, e);
      }
    });

    if (!serialized) {
      result = defaultSerializer(obj);
    }

    return result;
  }

  function defaultSerializer(obj) {
    return JSON.parse(JSON.stringify(obj));
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
      source: 'marty-extension',
      payload: payload ? serialize(payload) : {}
    };
  }
})(window);