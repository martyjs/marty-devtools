var Marty = require('marty');
var ApplicationConstants = require('../constants/applicationConstants');

var ApplicationActionCreators = Marty.createActionCreators({
  applicationLoaded: ApplicationConstants.APPLICATION_LOADED()
});

module.exports = ApplicationActionCreators;