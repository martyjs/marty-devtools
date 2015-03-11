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
  id: 'Actions',
  handlers: {
    pageLoaded: PageConstants.PAGE_LOADED,
    upsertAction: ActionConstants.UPSERT_ACTION,
    toggleAction: ActionConstants.TOGGLE_ACTION,
    clearActions: [ActionConstants.CLEAR_ACTIONS, PageConstants.PAGE_UNLOADED]
  },
  getInitialState: function () {
    return {};
  },
  clearActions: function () {
    this.clear();
    this.hasChanged();
  },
  pageLoaded: function (sow) {
    var actions = {};
    _.each(sow.actions, function (action) {
      actions[action.id] = action;
    });

    this.state = actions;
    this.hasChanged();
  },
  getAll: function () {
    return _.sortBy(_.values(this.state), 'timestamp').reverse();
  },
  getActionById: function (id) {
    return this.state[id];
  },
  getSelectedAction: function () {
    return _.find(this.state, {
      selected: true
    });
  },
  upsertAction: function (action) {
    if (!action) {
      throw new Error('Action must be defined');
    }

    this.state[action.id] = action;
    this.hasChanged();
  },
  toggleAction: function (actionId) {
    _.each(this.state, function (action) {
      if (action.id === actionId) {
        action.selected = !action.selected;
      } else {
        action.selected = false;
      }
    });
    this.hasChanged();
  }
});

module.exports = ActionStore;