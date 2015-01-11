/** @jsx React.DOM */

var React = require('react');
var StoresStore = require('../stores/storeStore');
var StoresSidePanel = require('./storesSidePanel');
var DataFlowExplorer = require('./dataFlowExplorer');

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

  this.splitView = createSplitView(this.element);
  this.sidebarPaneView = new WebInspector.SidebarPaneStack();
  this.storesPane = createStoresPane(this.sidebarPaneView);
  this.sidebarPaneView.show(this.splitView.sidebarElement);

  React.render(<DataFlowExplorer />, this.splitView.mainElement);

  function createStoresPane(parent) {
    var storesPane = new StoresSidePanel("Stores", "No stores");

    updateStorePane();
    StoresStore.addChangeListener(updateStorePane);
    storesPane.expand();
    parent.addPane(storesPane);

    return storesPane;

    function updateStorePane() {
      storesPane.update(StoresStore.getStoreStates());
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