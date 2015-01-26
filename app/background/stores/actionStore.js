var _ = require('lodash');
var util = require('util');
var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');
var ActionConstants = require('../constants/actionConstants');
var statusMap = {
  'ACTION_STARTING': 'Pending',
  'ACTION_FAILED': 'Failed',
  'ACTION_DONE': 'Done'
};

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
    var id, newState;

    if (action.internal) {
      var subject = action.arguments[0];

      if (_.keys(statusMap).indexOf(action.type) === -1) {
        return;
      }

      if (subject.timestamp) {
        subject.timestamp = new Date(subject.timestamp);
      }

      if (action.type !== 'ACTION_STARTING' && !this.state[subject.id]) {
        throw new Error(util.format('Unknown action %s (%s)', subject.id, subject.type));
      }

      id = subject.id;
      newState = _.extend(subject, {
        tabId: tabId,
        status: statusMap[action.type]
      });
    } else {
      id = action.id;
      newState = {
        arguments: action.arguments
      };
    }

    this.state[id] = _.extend({}, this.state[id], newState);
    this.hasChanged();
  }
});

module.exports = ActionStore;