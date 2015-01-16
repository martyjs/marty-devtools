/** @jsx React.DOM */

var List = require('./list');
var React = require('react');
var _ = require('underscore');
var Column = require('./column');
var ActionListItem = require('./actionListItem');

var ActionsColumn = React.createClass({
  render: function () {
    return (
      <Column name='actions' title='Actions'>
        <List ref='list'>
          {_.map(this.props.actions, function (action) {
            return <ActionListItem key={action.id} action={action} />;
          })}
        </List>
      </Column>
    );
  }
});

module.exports = ActionsColumn;