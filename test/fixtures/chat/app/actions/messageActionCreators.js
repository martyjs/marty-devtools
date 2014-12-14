var Marty = require('marty');

var MessageActionCreators = Marty.createActionCreators({
  sendMessage: ["ADD_MESSAGE", function (message) {
    this.dispatch(message);
  }]
});

module.exports = MessageActionCreators;