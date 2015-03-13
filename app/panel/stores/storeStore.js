var _ = require('lodash');
var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');
var ActionConstants = require('../constants/actionConstants');

var StoreStore = Marty.createStore({
  id: 'Stores',
  handlers: {
    pageLoaded: PageConstants.PAGE_LOADED,
    clearStores: PageConstants.PAGE_UNLOADED,
    updateStores: ActionConstants.ACTION_DISPATCHED
  },
  getInitialState: function () {
    return {};
  },
  updateStores: function (dispatch) {
    _.each(dispatch.stores, function (store, storeId) {
      this.state[storeId] = store.state;
    }, this);

    this.hasChanged();
  },
  clearStores: function () {
    this.clear();
    this.hasChanged();
  },
  pageLoaded: function (sow) {
    var latestAction = _.last(_.sortBy(sow.actions, function (dispatch) {
      return dispatch.action.timestamp;
    }));

    if (latestAction) {
      this.updateStores(latestAction);
    }
  },
  getStoreStates: function () {
    return this.state;
  }
});

module.exports = StoreStore;