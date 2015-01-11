var Marty = require('marty');
var _ = require('underscore');
var PageConstants = require('../constants/pageConstants');
var StoreConstants = require('../constants/storeConstants');

var StoreStore = Marty.createStore({
  displayName: 'Stores',
  handlers: {
    pageLoaded: PageConstants.PAGE_LOADED,
    upsertStore: StoreConstants.UPSERT_STORE,
    clearStores: PageConstants.PAGE_UNLOADED,
  },
  getInitialState: function () {
    return {};
  },
  upsertStore: function (store) {
    this.state[store.displayName] = store;
    this.hasChanged();
  },
  clearStores: function () {
    this.clear();
    this.hasChanged();
  },
  pageLoaded: function (sow) {
    console.log("STORE PAGE LOADED", sow);
    this.state = sow.stores;

    this.hasChanged();
  },
  getStoreStates: function () {
    var states = {};

    _.each(this.state, function (store, displayName) {
      states[displayName] = store.state;
    });

    return states;
  }
});

module.exports = StoreStore;