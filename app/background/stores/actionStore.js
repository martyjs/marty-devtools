var _ = require('lodash');
var util = require('util');
var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');
var ActionConstants = require('../constants/actionConstants');

var ActionStore = Marty.createStore({
  displayName: 'Actions',
  handlers: {
    upsertAction: ActionConstants.UPSERT_ACTION,
    clearActionsForTab: PageConstants.PAGE_UNLOADED
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
  upsertAction: function (tabId, action) {
    action.tabId = tabId;

    if (action.timestamp) {
      action.timestamp = new Date(action.timestamp);
    }

    this.state[action.id] = action;
    this.hasChanged();
  }
});

module.exports = ActionStore;