/** @jsx React.DOM */

var React = require('react');
var List = require('./list');
var _ = require('underscore');
var Column = require('./column');
var Section = require('./section');
var ObjectTree = require('./objectTree');
var DataFlowError = require('./dataFlowError');
var ActionHandlerListItem = require('./actionHandlerListItem');

var ActionColumn = React.createClass({
  render: function () {
    var action = this.props.action;
    var error = action ? action.error : null;

    return (
      <Column name='action'>
        <Section title='Action'>
          <ObjectTree object={this.displayObject()} />
        </Section>
        <Section title='Action Handlers'>
          <DataFlowError error={error} />
          <List ref='list'>
            {this.handlers().map(function (handler) {
              return <ActionHandlerListItem action={action} handler={handler} />;
            })}
          </List>
        </Section>
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