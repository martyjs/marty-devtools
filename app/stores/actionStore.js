var _ = require('lodash');
var Marty = require('marty');
var ActionConstants = require('../constants/actionConstants');

var ActionStore = Marty.createStore({
  name: 'Actions',
  handlers: {
    clearActions: ActionConstants.CLEAR_ACTIONS,
    upsertAction: ActionConstants.UPSERT_ACTION,
    toggleAction: ActionConstants.TOGGLE_ACTION,
    toggleViewHandler: ActionConstants.TOGGLE_VIEW_HANDLER,
    toggleActionHandler: ActionConstants.TOGGLE_ACTION_HANDLER
  },
  getInitialState: function () {
    return {};
  },
  clearActions: function () {
    this.clear();
    this.hasChanged();
  },
  getAll: function () {
    return _.where(_.values(this.state), {
      verbose: false
    });
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
    action.timestamp = new Date(action.timestamp);
    this.state[action.id] = action;
    this.hasChanged();
  },
  getSelectedActionHandler: function () {
    var selectedAction = this.getSelectedAction();

    if (selectedAction) {
      return _.find(selectedAction.handlers, {
        selected: true
      });
    }
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
  },
  toggleViewHandler: function () {
  },
  toggleActionHandler: function (actionId, handlerId) {
    var action = this.state[actionId];

    if (!action) {
      return;
    }

    _.each(action.handlers, function (handler) {
      if (handler.id === handlerId) {
        handler.selected = !handler.selected;
      } else {
        handler.selected = false;
      }
    });

    this.hasChanged();
  }
});

module.exports = ActionStore;