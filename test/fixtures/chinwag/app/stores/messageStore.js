var _ = require('lodash');
var Marty = require('marty');
var MessageConstants = require('../constants').Messages;

var MessageStore = Marty.createStore({
  name: 'Messages',
  handlers: {
    addMessage: MessageConstants.SEND_MESSAGE
  },
  getInitialState: function () {
    return {};
  },
  addMessage: function (message) {
    this.state[message.cid] = message
    this.hasChanged();
  },
  getMessages: function () {
    return _.values(this.state);
  }
});

module.exports = MessageStore;