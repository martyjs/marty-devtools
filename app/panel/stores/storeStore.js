var _ = require('lodash');
var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');
var DispatchConstants = require('../constants/dispatchConstants');

var StoreStore = Marty.createStore({
  id: 'Stores',
  handlers: {
    pageLoaded: PageConstants.PAGE_LOADED,
    clearStores: PageConstants.PAGE_UNLOADED,
    updateStores: DispatchConstants.RECEIVE_DISPATCH
  },
  getInitialState() {
    return {};
  },
  updateStores(dispatch) {
    if (dispatch) {
      _.each(dispatch.stores, function (store, storeId) {
        this.state[storeId] = store.state;
      }, this);

      this.hasChanged();
    }
  },
  clearStores() {
    this.clear();
    this.hasChanged();
  },
  pageLoaded(sow) {
    this.updateStores(latestDispatch());

    function latestDispatch() {
      return _.last(_.sortBy(sow.dispatches, function (dispatch) {
        return dispatch.action.timestamp;
      }));
    }
  },
  getStoreStates() {
    return this.state;
  }
});

module.exports = StoreStore;