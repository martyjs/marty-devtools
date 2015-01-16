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
      <ListItem
        popover={action}
        className={classes}
        onClick={this.onClick}
        active={action.selected}>
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