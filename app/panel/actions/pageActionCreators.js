var Marty = require('marty');
var autoDispatch = require('marty/autoDispatch');
var PageConstants = require('../constants/pageConstants');

var PageActionCreators = Marty.createActionCreators({
  displayName: 'Page',
  pageLoaded: autoDispatch(PageConstants.PAGE_LOADED),
  pageUnloaded: autoDispatch(PageConstants.PAGE_UNLOADED)
});

module.exports = PageActionCreators;