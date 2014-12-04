/** @jsx React.DOM */

var React = require('react');
var MessageActionCreators = require('../actions/messageActionCreators');

var MessageBox = React.createClass({
  getInitialState: function () {
    return {
      message: ''
    };
  },
  render: function () {
    return (
      <div className="message-box">
        <textarea ref="message" value={this.state.message}</textarea>
        <button onClick={this.sendMessage}>Send</button>
      </div>
    )
  },
  sendMessage: function () {
    var message = this.refs.message.getDOMNode().value;

    MessageActionCreators.sendMessage('foo', 'bar', message);
  }
});

module.exports = MessageBox;