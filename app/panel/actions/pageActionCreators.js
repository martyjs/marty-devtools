var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');

var PageActionCreators = Marty.createActionCreators({
  displayName: 'Page',
  pageLoaded: PageConstants.PAGE_LOADED(),
  pageUnloaded: PageConstants.PAGE_UNLOADED()
});

module.exports = PageActionCreators;