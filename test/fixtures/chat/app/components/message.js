var React = require('react');
var Marty = require('marty');
var MessageStore = require('../stores/messageStore');

var MessageState = Marty.createStateMixin({
  listenTo: [MessageStore],
  getState: function () {
    return {
      message: MessageStore.getById(this.props.id)
    };
  }
});

var Message = React.createClass({
  mixins: [MessageState],
  render: function () {
    return this.state.message.when({
      pending: function () {
        return <div className='loading'>Loading</div>;
      },
      error: function (error) {
        return <div className='error'>{error.message}</div>;
      },
      done: function (message) {
        return <div className='message'>{message}</div>;
      }
    });
  }
});

module.exports = Message;