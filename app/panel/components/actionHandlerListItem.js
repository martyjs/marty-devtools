/** @jsx React.DOM */

var React = require('react');
var ListItem = require('./listItem');
var ActionActionCreators = require('../actions/actionActionCreators');

var ActionHandlerListItem = React.createClass({
  render: function () {
    var handler = this.props.handler;
    var id = handler.store + '#' + handler.name;

    return (
      <ListItem className='action-handler-list-item' active={handler.selected} onClick={this.onClick}>
        <div ref='id' className='action-handler-id'>{id}</div>
      </ListItem>
    );
  },
  onClick: function () {
    ActionActionCreators.toggleActionHandler(this.props.action.id, this.props.handler.id);
  }
});

module.exports = ActionHandlerListItem;