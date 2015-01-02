/** @jsx React.DOM */

var List = require('./list');
var React = require('react');
var Column = require('./column');
var ActionListItem = require('./actionListItem');

var ActionsColumn = React.createClass({
  render: function () {
    return (
      <Column name='actions'>
        <List ref='list'>
          {this.props.actions.map(function (action) {
            return <ActionListItem key={action.id} action={action} />;
          })}
        </List>
      </Column>
    );
  }
});

module.exports = ActionsColumn;