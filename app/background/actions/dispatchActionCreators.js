var Marty = require('marty');
var Devtools = require('../stateSources/connections').Devtools;
var DispatchConstants = require('../constants/dispatchConstants');

var DispatchActionCreators = Marty.createActionCreators({
  displayName: 'DispatchActionCreators',
  receiveDispatch: function (tabId, dispatch) {
    this.dispatch(DispatchConstants.RECEIVE_DISPATCH, tabId, dispatch);

    Devtools.send(tabId, {
      type: 'RECEIVE_DISPATCH',
      payload: dispatch
    });
  }
});

module.exports = DispatchActionCreators;