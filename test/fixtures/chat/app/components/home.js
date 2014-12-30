/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var Message = require('./message');
var MessagesStore = require('../stores/messageStore');
var MessageActionCreators = require('../actions/messageActionCreators');

var HomeState = Marty.createStateMixin({
  listenTo: [MessagesStore],
  getState: function () {
    return {
      messages: MessagesStore.getAll()
    };
  }
});

var Home = React.createClass({
  name: 'Home',
  mixins: [HomeState],
  render: function () {
    return (
      <div className="home">
        <button onClick={this.createAction}>Create action</button>

        <div className="messages">
          {this.state.messages.map(function (message) {
            return <Message id={message.id} />;
          })}
        </div>
      </div>
    );
  },
  createAction: function () {
    MessageActionCreators.sendMessage({
      id: _.uniqueId(),
      message: "Hello world"
    });
  }
});

module.exports = Home;