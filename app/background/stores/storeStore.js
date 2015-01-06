var _ = require('lodash');
var Marty = require('marty');
var StoreConstants = require('../constants/storeConstants');

var StoreStore = Marty.createStore({
  displayName: 'Store',
  handlers: {
    upsertStore: StoreConstants.UPSERT_STORE
  },
  getStoresForTab: function (tabId) {
    return this.state[tabId] || {};
  },
  upsertStore: function (tabId, store) {
    if (!this.state[tabId]) {
      this.state[tabId] = {};
    }

    this.state[tabId][store.displayName] = _.extend(store, {
      tabId: tabId
    });

    this.hasChanged(store);
  }
});

module.exports = StoreStore;