var Marty = require('marty');
var DispatchConstants = require('../constants/dispatchConstants');

var DispatchActionCreators = Marty.createActionCreators({
  id: 'DispatchActionCreators',
  receiveDispatch: function (dispatch) {
    this.dispatch(DispatchConstants.RECEIVE_DISPATCH, dispatch);
  }
});

module.exports = DispatchActionCreators;