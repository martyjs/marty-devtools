var Marty = require('marty');
var MessageConstants = require('../constants/messageConstants');

var MessageActionCreators = Marty.createActionCreators({
  sendMessage: MessageConstants.ADD_MESSAGE(function (message) {
    this.dispatch(message);
  })
});

module.exports = MessageActionCreators;