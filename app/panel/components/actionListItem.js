/** @jsx React.DOM */

var React = require('react');
var ListItem = require('./listItem');
var ActionActionCreators = require('../actions/actionActionCreators');

var ActionListItem = React.createClass({
  render: function () {
    var action = this.props.action;
    var classes = [
      'action-list-item',
      'action-' + action.status.toLowerCase()
    ].join(' ');

    return (
      <ListItem className={classes} active={action.selected} onClick={this.onClick}>
        <div ref='type' className='action-type'>{action.type}</div>
        <div ref='status' className='action-status'>{action.status}</div>
      </ListItem>
    );
  },
  onClick: function () {
    ActionActionCreators.toggleAction(this.props.action.id);
  }
});

module.exports = ActionListItem;