/** @jsx React.DOM */

var List = require('./list');
var React = require('react');
var ActionListItem = require('./actionListItem');

var ActionsColumn = React.createClass({
  render: function () {
    return (
      <div className='actions-column'>
        <List ref="list">
          {this.props.actions.map(function (action) {
            return <ActionListItem key={action.id} action={action} />;
          })}
        </List>
      </div>
    );
  }
});

module.exports = ActionsColumn;