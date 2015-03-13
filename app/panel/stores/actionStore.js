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
    toggleAction: ActionConstants.TOGGLE_ACTION,
    revertToAction: ActionConstants.REVERT_TO_ACTION,
    addDispatchedAction: ActionConstants.ACTION_DISPATCHED,
    unselectAllActions: ActionConstants.UNSELECT_ALL_ACTIONS,
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
    _.each(sow.actions, function (dispatch) {
      var action = dispatch.action;
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
  getLatestAction: function () {
    return _.first(this.getAll());
  },
  getSelectedAction: function () {
    return _.find(this.state, {
      selected: true
    });
  },
  revertToAction: function (actionId) {
    var subject = this.state[actionId];

    _.each(this.state, (action) => {
      if (action.timestamp > subject.timestamp) {
        delete this.state[action.id];
      }
    });

    this.hasChanged();
  },
  addDispatchedAction: function (dispatch) {
    var action = dispatch.action;

    if (!action) {
      throw new Error('Action must be defined');
    }

    this.state[action.id] = action;
    this.hasChanged();
  },
  unselectAllActions: function () {
    _.each(this.state, function (action) {
      action.selected = false;
    });
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