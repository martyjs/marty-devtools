/** @jsx React.DOM */

var React = require('react');
var ListItem = require('./listItem');

var List = React.createClass({
  render: function () {
    ListItem.reset();
    return (
      <div className='list-container'>
        <ul className='list' ref='items'>
          {this.props.children}
        </ul>
      </div>
    );
  }
});

module.exports = List;