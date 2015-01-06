var _ = require('lodash');
var util = require('util');
var Marty = require('marty');
var ActionConstants = require('../constants/actionConstants');
var statusMap = {
  'ACTION_STARTING': 'Pending',
  'ACTION_FAILED': 'Failed',
  'ACTION_DONE': 'Done'
};

var ActionStore = Marty.createStore({
  name: 'Actions',
  handlers: {
    upsertAction: ActionConstants.UPSERT_ACTION,
    clearActionsForTab: ActionConstants.CLEAR_ACTIONS
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
    var subject = action.arguments[0];
    var currentState = this.state[subject.id];

    if (_.keys(statusMap).indexOf(action.type) === -1) {
      return;
    }

    if (subject.timestamp) {
      subject.timestamp = new Date(subject.timestamp);
    }

    if (action.type !== 'ACTION_STARTING' && !currentState) {
      throw new Error(util.format('Unknown action %s (%s)', subject.id, subject.type));
    }

    this.state[subject.id] = _.extend(currentState || {}, subject, {
      tabId: tabId,
      status: statusMap[action.type]
    });

    this.hasChanged(this.state[subject.id]);
  }
});

module.exports = ActionStore;