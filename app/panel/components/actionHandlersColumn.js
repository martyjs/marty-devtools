/** @jsx React.DOM */

var React = require('react');
var List = require('./list');
var _ = require('underscore');
var Column = require('./column');
var ObjectTree = require('./objectTree');
var DataFlowError = require('./dataFlowError');
var ActionHandlerListItem = require('./actionHandlerListItem');

var ActionHandlersColumn = React.createClass({
  render: function () {
    var action = this.props.action;
    var error = action ? action.error : null;

    return (
      <Column name='action-handlers'>
        <ObjectTree object={this.displayObject()} />
        <DataFlowError error={error} />
        <List ref='list'>
          {this.handlers().map(function (handler) {
            return <ActionHandlerListItem action={action} handler={handler} />;
          })}
        </List>
      </Column>
    );
  },
  displayObject: function () {
    return _.omit(this.props.action, [
      'id',
      'handlers',
      'selected',
      'tabId',
      'properties',
      'error'
    ]);
  },
  handlers: function () {
    if (this.props.action) {
      return this.props.action.handlers;
    }

    return [];
  }
});

module.exports = ActionHandlersColumn;