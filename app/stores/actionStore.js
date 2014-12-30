var _ = require('lodash');
var Marty = require('marty');
var ActionConstants = require('../constants/actionConstants');

var ActionStore = Marty.createStore({
  name: 'Actions',
  handlers: {
    toggleAction: ActionConstants.TOGGLE_ACTION,
    toggleViewHandler: ActionConstants.TOGGLE_VIEW_HANDLER,
    toggleActionHandler: ActionConstants.TOGGLE_ACTION_HANDLER
  },
  getInitialState: function () {
    return mockActions();
  },
  getAll: function () {
    return _.values(this.state);
  },
  getSelectedAction: function () {
    return _.find(this.state, {
      selected: true
    });
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
  toggleViewHandler: function (actionId, handlerId) {
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

function mockActions() {
  var actions = {};

  for (var i = 0; i < 100; i++) {
    var action = mockAction(i);

    actions[action.id] = action;
  }

  return actions;

  function mockAction(id) {
    return {
      id: id,
      type: 'CREATE_FOO',
      handlers: [{
        id: id + '-foo',
        store: 'FooStore',
        name: 'addFoo',
      }, {
        id: id + '-bar',
        store: 'BarStore',
        name: 'addBar',
      }]
    };
  }
}

module.exports = ActionStore;