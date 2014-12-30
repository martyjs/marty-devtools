/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var ObjectTree = require('./objectTree');
var ActionList = require('./actionList');
var ActionStore = require('../stores/actionStore');
var ActionHandlerPanel = require('./actionHandlerPanel');
var ActionActionCreators = require('../actions/actionActionCreators');

var ActionPanelState = Marty.createStateMixin({
  listenTo: ActionStore,
  getState: function () {
    return {
      actions: ActionStore.getAll(),
      selectedAction: ActionStore.getSelectedAction(),
      selectedActionHandler: ActionStore.getSelectedActionHandler()
    };
  }
});

var ActionListItem = React.createClass({
  render: function () {
    return (
      <span>
        {this.props.item.type}
      </span>
    );
  }
});

var ActionHandlerListItem = React.createClass({
  render: function () {
    var handler = this.props.item;
    return (
      <span>
        {handler.store}#{handler.name}
      </span>
    );
  }
});


var ActionPanel = React.createClass({
  mixins: [ActionPanelState],
  render: function () {
    return (
      <div className='action-panel hbox fill'>
        {this.actions()}
        {this.actionHandlers()}
        {this.actionHandler()}
      </div>
    );
  },
  actionHandler: function () {
    var actionHandler = this.state.selectedActionHandler;

    if (!actionHandler) {
      return;
    }

    return <ActionHandlerPanel actionHandler={actionHandler} />;
  },
  actionHandlers: function () {
    var action = this.state.selectedAction;

    if (!action) {
      return;
    }

    var handlers = _.map(action.handlers, function (handler) {
      return _.extend({
        action: action
      }, handler)
    });

    return (
      <ActionList
          items={handlers}
          className='action-handlers'
          template={ActionHandlerListItem}
          onClick={this.onClickActionHandler} />
    );
  },
  actions: function () {
    return (
      <ActionList
          className='actions'
          template={ActionListItem}
          items={this.state.actions}
          onClick={this.onClickAction} />
    );
  },
  onClickActionHandler: function (handler) {
    ActionActionCreators.toggleActionHandler(handler.action.id, handler.id)
  },
  onClickAction: function (action) {
    ActionActionCreators.toggleAction(action.id);
  }
});


module.exports = ActionPanel;