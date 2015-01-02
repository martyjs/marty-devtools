/** @jsx React.DOM */

var React = require('react');
var List = require('./list');
var Column = require('./column');
var ViewListItem = require('./viewListItem');

var ActionHandlerColumn = React.createClass({
  render: function () {
    return (
      <Column name='action-handler'>
        <List ref='list'>
          {this.props.actionHandler.views.map(function (view) {
            return <ViewListItem view={view} />;
          })}
        </List>
      </Column>
    );
  }
});

module.exports = ActionHandlerColumn;