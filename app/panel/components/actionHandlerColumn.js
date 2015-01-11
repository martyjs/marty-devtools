/** @jsx React.DOM */

var React = require('react');
var List = require('./list');
var Column = require('./column');
var Section = require('./section');
var ObjectTree = require('./objectTree');
var ViewListItem = require('./viewListItem');

var ActionHandlerColumn = React.createClass({
  render: function () {
    return (
      <Column name='action-handler'>
        <Section title='Action Handler'>
          <ObjectTree object={this.props.actionHandler} />
        </Section>
        <Section title='Views'>
          <List ref='list'>
            {this.views().map(function (view) {
              return <ViewListItem view={view} />;
            })}
          </List>
        </Section>
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

module.exports = ActionHandlerColumn;