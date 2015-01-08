/** @jsx React.DOM */

var React = require('react');
var StoresStore = require('../stores/storeStore');
var StoresSidePanel = require('./storesSidePanel');
var DataFlowExplorer = require('./dataFlowExplorer');


function MartyPanel() {
  WebInspector.View.call(this);

  this.element.addStyleClass('panel');

  var initialSidebarWidth = 325;
  var minimumContentWidthPercent = 0.34;
  var initialSidebarHeight = 325;
  var minimumContentHeightPercent = 0.34;

  this.element.classList.add('vbox', 'fill');
  this.registerRequiredCSS('networkLogView.css');
  this.registerRequiredCSS('filter.css');
  this.createSidebarView(
    this.element,
    WebInspector.SidebarView.SidebarPosition.End,
    initialSidebarWidth,
    initialSidebarHeight
  );

  this.splitView.setSidebarElementConstraints(
    Preferences.minElementsSidebarWidth,
    Preferences.minElementsSidebarHeight
  );

  this.splitView.setMainElementConstraints(
    minimumContentWidthPercent,
    minimumContentHeightPercent
  );

  this.splitView.addEventListener(
    WebInspector.SidebarView.EventTypes.Resized,
    this.sidebarResized.bind(this)
  );


  this.sidebarPaneView = new WebInspector.SidebarPaneStack();
  this.sidebarPanes = {
    stores: new StoresSidePanel("Stores", "No stores", this.forceUpdate.bind(this))
  };

  this.sidebarPanes.stores.update({});
  StoresStore.addChangeListener(function () {
    this.sidebarPanes.stores.update(StoresStore.getState());
  })

  this.sidebarPanes.stores.expand();

  for (var pane in this.sidebarPanes) {
    this.sidebarPaneView.addPane(this.sidebarPanes[pane]);
  }
  this.sidebarPaneView.show(this.splitView.sidebarElement);

  React.render(<DataFlowExplorer />, this.splitView.mainElement);
}

MartyPanel.prototype = {
  forceUpdate: function () {

  },
  sidebarResized: function () {
  },
  createSidebarView: function (parentElement, position, defaultWidth, defaultHeight) {
    if (this.splitView) {
      return;
    }

    if (!parentElement) {
      parentElement = this.element;
    }

    this.splitView = new WebInspector.SidebarView(
      position,
      this._sidebarWidthSettingName(),
      defaultWidth,
      defaultHeight
    );

    this.splitView.show(parentElement);
    this.splitView.addEventListener(
      WebInspector.SidebarView.EventTypes.Resized,
      this.sidebarResized.bind(this)
    );

    this.sidebarElement = this.splitView.sidebarElement;
  },
  _sidebarWidthSettingName: function () {
    return 'ElementsSidebarWidth';
  },
  __proto__: WebInspector.View.prototype // jshint ignore:line
};

module.exports = MartyPanel;