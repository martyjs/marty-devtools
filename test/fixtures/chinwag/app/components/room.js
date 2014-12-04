/** @jsx React.DOM */

var React = require('react');
var Marty = require('marty');
var MessageStore = require('../stores/messageStore');

var RoomState = Marty.createStateMixin({
  listenTo: MessageStore,
  getState: function () {
    return {
      messages: MessageStore.getMessages()
    }
  }
});

var Room = React.createClass({
  render: function () {
    return (
      <div className="room">
        <ul className="messages">
          {this.state.messages.map(function (message) {
            return <div className="message">{message}</div>
          })}
        </ul>

        <MessageBox />
      </div>
    )
  }
});

module.exports = Room;