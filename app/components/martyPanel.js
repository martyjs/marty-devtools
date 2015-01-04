/** @jsx React.DOM */

var React = require('react');
var DataFlowExplorer = require('./dataFlowExplorer');

function MartyPanel() {
  WebInspector.View.call(this);

  this.element.addStyleClass('panel');

  var initialSidebarWidth = 325;
  var minimumContentWidthPercent = 0.34;
  var initialSidebarHeight = 325;
  var minimumContentHeightPercent = 0.34;

  this.element.classList.add('vbox', 'fill');
  this.registerRequiredCSS('../blink/Source/devtools/front_end/networkLogView.css');
  this.registerRequiredCSS('../blink/Source/devtools/front_end/filter.css');
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

  React.render(<DataFlowExplorer />, this.splitView.mainElement);
}

MartyPanel.prototype = {
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