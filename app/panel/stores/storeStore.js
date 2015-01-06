var Marty = require('marty');
var StoreConstants = require('../constants/storeConstants');

var StoreStore = Marty.createStore({
  displayName: 'Stores',
  handlers: {
    upsertStore: StoreConstants.UPSERT_STORE
  },
  upsertStore: function (store) {
    this.state[store.displayName] = store;
    this.hasChanged();
  }
});

module.exports = StoreStore;