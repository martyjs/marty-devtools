var React = require('react');
var StoresStore = require('../stores/storeStore');
var DataFlowExplorer = require('./dataFlowExplorer');
var ObjectSidebarPane = require('./objectSidebarPane');

var DEFAULT_SIDEBAR_WIDTH = 325;
var DEFAULT_SIDEBAR_HEIGHT = 325;
var MINIMUM_CONTENT_WIDTH_PERCENT = 0.34;
var MINIMUM_CONTENT_HEIGHT_PERCENT = 0.34;

function MartyPanel() {
  WebInspector.View.call(this);

  this.element.addStyleClass('panel');
  this.element.classList.add('vbox', 'fill');
  this.registerRequiredCSS('networkLogView.css');
  this.registerRequiredCSS('filter.css');
  this.registerRequiredCSS('resourceView.css');


  this.splitView = createSplitView(this.element);
  this.sidebarPaneView = new WebInspector.SidebarPaneStack();
  this.storesPane = createStoresPane(this.sidebarPaneView);
  this.sidebarPaneView.show(this.splitView.sidebarElement);

  this.sidebarPanes = {};
  this.sidebarPanes.stores = createStoresPane();

  this.sidebarPaneView.addPane(this.sidebarPanes.stores);



  React.render(<DataFlowExplorer />, this.splitView.mainElement);

  function createGeneralPanel() {
    var pane = new ObjectSidebarPane('General', '', edit);

    pane.update({
      State: {}
    });

    pane.expand();

    return pane;
  }

  function createStoresPane() {
    var pane = new ObjectSidebarPane('Stores', 'No stores');

    updatePane();
    StoresStore.addChangeListener(updatePane);
    pane.expand();

    return pane;

    function updatePane() {
      pane.update(StoresStore.getStoreStates());
    }
  }

  function createSplitView(parent) {
    var splitView = new WebInspector.SidebarView(
      WebInspector.SidebarView.SidebarPosition.End,
      function () { return 'ElementsSidebarWidth' },
      DEFAULT_SIDEBAR_WIDTH,
      DEFAULT_SIDEBAR_HEIGHT
    );

    splitView.show(parent);

    splitView.setSidebarElementConstraints(
      Preferences.minElementsSidebarWidth,
      Preferences.minElementsSidebarHeight
    );

    splitView.setMainElementConstraints(
      MINIMUM_CONTENT_WIDTH_PERCENT,
      MINIMUM_CONTENT_HEIGHT_PERCENT
    )

    return splitView;
  }
}

MartyPanel.prototype = {
  __proto__: WebInspector.View.prototype // jshint ignore:line
};

module.exports = MartyPanel;