/** @jsx React.DOM */

var React = require('react');
var List = require('./list');
var Column = require('./column');
var ObjectTree = require('./objectTree');
var ViewListItem = require('./viewListItem');

var ViewsColumn = React.createClass({
  render: function () {
    return (
      <Column name='action-handler' title='Views'>
        <List ref='list'>
          {this.views().map(function (view) {
            return <ViewListItem view={view} />;
          })}
        </List>
      </Column>
    );
  },
  views: function () {
    var handler = this.props.actionHandler;

    if (handler) {
      return handler.views;
    }

    return [];
  }
});

module.exports = ViewsColumn;