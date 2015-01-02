/** @jsx React.DOM */

var React = require('react');
var List = require('./list');
var Column = require('./column');
var ActionHandlerListItem = require('./actionHandlerListItem');

var ActionHandlersColumn = React.createClass({
  render: function () {
    var action = this.props.action;

    return (
      <Column name='action-handlers'>
        <List ref='list'>
          {this.handlers().map(function (handler) {
            return <ActionHandlerListItem action={action} handler={handler} />;
          })}
        </List>
      </Column>
    );
  },
  handlers: function () {
    if (this.props.action) {
      return this.props.action.handlers;
    }

    return [];
  }
});

module.exports = ActionHandlersColumn;