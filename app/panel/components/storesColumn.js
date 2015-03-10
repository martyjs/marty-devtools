/** @jsx React.DOM */

var React = require('react');
var List = require('./list');
var _ = require('underscore');
var Column = require('./column');
var ObjectTree = require('./objectTree');
var DataFlowError = require('./dataFlowError');
var StoreListItem = require('./storeListItem');

var ActionColumn = React.createClass({
  render: function () {
    var action = this.props.action;
    var error = action ? action.error : null;

    return (
      <Column name='stores' title='Stores'>
        <List ref='list'>
          {this.handlers().map(function (handler) {
            return <StoreListItem action={action} handler={handler} />;
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

module.exports = ActionColumn;