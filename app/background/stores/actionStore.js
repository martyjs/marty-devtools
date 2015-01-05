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
    upsertAction: ActionConstants.PROCESS_DISPATCHED_ACTION,
  },
  getInitialState: function () {
    return {};
  },
  getActionsForTab: function (tabId) {
    return _.find(_.values(this.state), {
      tabId: tabId
    });
  },
  getActionById: function (actionId) {
    return this.state[actionId];
  },
  upsertAction: function (tabId, action) {
    var subject = action.arguments[0];
    var currentState = this.state[subject.id];

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

    this.hasChanged(action);
  }
});

module.exports = ActionStore;