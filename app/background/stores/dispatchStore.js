var _ = require('lodash');
var util = require('util');
var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');
var DispatchConstants = require('../constants/dispatchConstants');

var DispatchStore = Marty.createStore({
  displayName: 'DispatchStore',
  handlers: {
    addDispatch: DispatchConstants.RECEIVE_DISPATCH,
    clearDispatchesForTab: PageConstants.PAGE_UNLOADED,
  },
  getInitialState: function () {
    return {};
  },
  getDispatchesForTab: function (tabId) {
    return _.where(_.values(this.state), {
      tabId: tabId
    });
  },
  getDispatchById: function (dispatchId) {
    return this.state[dispatchId];
  },
  clearDispatchesForTab: function (tabId) {
    _.each(this.state, function (dispatch, id) {
      if (dispatch.tabId === tabId) {
        delete this.state[id];
      }
    }, this);

    this.hasChanged();
  },
  addDispatch: function (tabId, dispatch) {
    dispatch.tabId = tabId;
    this.state[dispatch.id] = dispatch;
    this.hasChanged();
  }
});

module.exports = DispatchStore;