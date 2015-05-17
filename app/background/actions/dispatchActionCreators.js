var Marty = require('marty');
var DispatchConstants = require('../constants/dispatchConstants');

var DispatchActionCreators = Marty.createActionCreators({
  id: 'DispatchActionCreators',
  receiveDispatch: function (tabId, dispatch) {
    this.dispatch(DispatchConstants.RECEIVE_DISPATCH, tabId, dispatch);

    this.connections.Devtools.send(tabId, {
      type: 'RECEIVE_DISPATCH',
      payload: dispatch
    });
  }
});

module.exports = DispatchActionCreators;