/** @jsx React.DOM */

var React = require('react');
var ActionActionCreators = require('../actions/actionActionCreators');

var ActionListItem = React.createClass({
  render: function () {
    var action = this.props.action;
    var classes = [
      'action-list-item',
      'action-' + action.status.toLowerCase()
    ].join(' ');

    return (
      <div ref='item' className={classes} onClick={this.onClick}>
        <div ref='type' className='action-type'>{action.type}</div>
        <div ref='status' className='action-status'>{action.status}</div>
      </div>
    );
  },
  onClick: function () {
    ActionActionCreators.toggleAction(this.props.action.id);
  }
});

module.exports = ActionListItem;