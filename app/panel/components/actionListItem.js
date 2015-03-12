var React = require('react');
var _ = require('lodash');
var ListItem = require('./listItem');
var ActionActionCreators = require('../actions/actionActionCreators');

var ActionListItem = React.createClass({
  render: function () {
    var action = this.props.action;

    return (
      <ListItem
        onClick={this.onClick}
        active={action.selected}>
        <div ref='type' className='action-type'>{action.type}</div>
      </ListItem>
    );
  },
  onClick: function (e) {
    e.preventDefault();
    e.stopPropagation();
    ActionActionCreators.toggleAction(this.props.action.id);
  }
});

function arrayToArguments(arr) {
  return function () {
    return arguments;
  }.apply(null, arr);
}

module.exports = ActionListItem;