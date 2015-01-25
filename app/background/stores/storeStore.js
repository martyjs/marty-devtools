var _ = require('lodash');
var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');
var StoreConstants = require('../constants/storeConstants');

var StoreStore = Marty.createStore({
  displayName: 'Store',
  handlers: {
    pageLoaded: PageConstants.PAGE_LOADED,
    upsertStore: StoreConstants.UPSERT_STORE,
    clearStoreForTab: PageConstants.PAGE_UNLOADED,
  },
  getInitialState: function () {
    return {};
  },
  getStoresForTab: function (tabId) {
    return this.state[tabId] || {};
  },
  clearStoreForTab: function (tabId) {
    delete this.state[tabId];
    this.hasChanged();
  },
  pageLoaded: function (tabId, sow) {
    if (sow.stores) {
      this.state[tabId] = sow.stores;
      this.hasChanged();
    }
  },
  upsertStore: function (tabId, store) {
    if (!this.state[tabId]) {
      this.state[tabId] = {};
    }

    this.state[tabId][store.displayName] = store;
    this.hasChanged();
  }
});

module.exports = StoreStore;