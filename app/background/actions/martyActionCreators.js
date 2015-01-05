var Marty = require('marty');
var MartyConstants = require('../constants/martyConstants');

var MartyActionCreators = Marty.createActionCreators({
  displayName: 'Actions',
  martyFoundInTab: MartyConstants.MARTY_FOUND_IN_TAB()
});

module.exports = MartyActionCreators;