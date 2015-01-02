/** @jsx React.DOM */

var React = require('react');
var ActionActionCreators = require('../actions/actionActionCreators');

var ActionListItem = React.createClass({
  render: function () {
    return (
      <div ref='item' className='action-list-item' onClick={this.onClick}>
        <span ref='type' className='action-type'>{this.props.action.type}</span>
      </div>
    );
  },
  onClick: function () {
    ActionActionCreators.toggleAction(this.props.action.id);
  }
});

module.exports = ActionListItem;