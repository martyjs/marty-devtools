var _ = require('lodash');
var util = require('util');
var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');
var ActionConstants = require('../constants/actionConstants');

var ActionStore = Marty.createStore({
  displayName: 'Actions',
  handlers: {
    clearActionsForTab: PageConstants.PAGE_UNLOADED,
    addDispatch: ActionConstants.ACTION_DISPATCHED
  },
  getInitialState: function () {
    return {};
  },
  getActionsForTab: function (tabId) {
    return _.where(_.values(this.state), {
      tabId: tabId
    });
  },
  getActionById: function (actionId) {
    return this.state[actionId];
  },
  clearActionsForTab: function (tabId) {
    _.each(this.state, function (action, id) {
      if (action.tabId === tabId) {
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

module.exports = ActionStore;