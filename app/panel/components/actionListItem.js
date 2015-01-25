/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');
var ListItem = require('./listItem');
var ActionActionCreators = require('../actions/actionActionCreators');

var ActionListItem = React.createClass({
  render: function () {
    var action = this.props.action;
    var classes = [
      'action-list-item',
      'action-' + action.status.toLowerCase(),
      action.handlers.length ? 'has-children' : ''
    ].join(' ');

    return (
      <ListItem
        className={classes}
        onClick={this.onClick}
        active={action.selected}
        popover={popoverAction(action)}>
        <div ref='type' className='action-type'>{action.type}</div>
        <span ref='status' className='action-status'>{action.status}</span>
      </ListItem>
    );
  },
  onClick: function () {
    ActionActionCreators.toggleAction(this.props.action.id);
  }
});

function popoverAction(action) {
  var popover = _.pick(action, 'id', 'status', 'type');

  if (action.error) {
    popover.error = action.error;
  }

  return popover;
}

module.exports = ActionListItem;