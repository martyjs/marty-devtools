var _ = require('lodash');
var util = require('util');
var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');
var ActionConstants = require('../constants/actionConstants');
var DispatchConstants = require('../constants/dispatchConstants');
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
    receiveDispatch: DispatchConstants.RECEIVE_DISPATCH,
    unselectAllActions: ActionConstants.UNSELECT_ALL_ACTIONS,
    clearActions: [ActionConstants.CLEAR_ACTIONS, PageConstants.PAGE_UNLOADED]
  },
  getInitialState() {
    return {};
  },
  clearActions() {
    this.clear();
    this.hasChanged();
  },
  pageLoaded(sow) {
    var actions = {};
    _.each(sow.dispatches, function (dispatch) {
      var action = dispatch.action;
      actions[action.id] = action;
    });

    this.state = actions;
    this.hasChanged();
  },
  getAll() {
    return _.sortBy(_.values(this.state), 'timestamp').reverse();
  },
  getActionById(id) {
    return this.state[id];
  },
  getLatestAction() {
    return _.first(this.getAll());
  },
  getSelectedAction() {
    return _.find(this.state, {
      selected: true
    });
  },
  revertToAction(actionId) {
    var subject = this.state[actionId];

    _.each(this.state, (action) => {
      if (action.timestamp > subject.timestamp) {
        delete this.state[action.id];
      }
    });

    this.hasChanged();
  },
  receiveDispatch(dispatch) {
    var action = dispatch.action;

    if (!action) {
      throw new Error('Action must be defined');
    }

    this.state[action.id] = action;
    this.hasChanged();
  },
  unselectAllActions() {
    _.each(this.state, function (action) {
      action.selected = false;
    });
    this.hasChanged();
  },
  toggleAction(actionId) {
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