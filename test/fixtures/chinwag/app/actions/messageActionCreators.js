var uuid = require('uuid').v1;

var MessageActionCreators = Marty.createActionCreators({
  sendMessage: function (fromId, threadId, text) {
    var message = {
      text: text,
      cid: uuid(),
      fromId: fromId,
      threadId: threadId
    };

    this.dispatch(message);
  }
});