function MartyPanel() {
  WebInspector.View.call(this);

  this.element.addStyleClass("panel");;

  const initialSidebarWidth = 325;
  const minimumContentWidthPercent = 0.34;
  const initialSidebarHeight = 325;
  const minimumContentHeightPercent = 0.34;

  this.element.classList.add("vbox", "fill");
  this.registerRequiredCSS("networkLogView.css");
  this.registerRequiredCSS("filter.css");

  this.createSidebarView(this.element, WebInspector.SidebarView.SidebarPosition.End, initialSidebarWidth, initialSidebarHeight);
  this.splitView.setSidebarElementConstraints(Preferences.minElementsSidebarWidth, Preferences.minElementsSidebarHeight);
  this.splitView.setMainElementConstraints(minimumContentWidthPercent, minimumContentHeightPercent);
  this.splitView.addEventListener(WebInspector.SidebarView.EventTypes.Resized, this.sidebarResized.bind(this));

  var log = document.createElement("div");
  log.id = "log";

  this.splitView.sidebarElement.appendChild(log);

  var _log = console.log;

  console.log = function (text) {
    var message = document.createElement("div");
    message.className = "message";
    message.textContent = text;
    log.appendChild(message);
  }

  this.actionPanel = new ActionPanel();
  this.actionPanel.show(this.splitView.mainElement);
}

MartyPanel.prototype = {
  sidebarResized: function() {
  },
  createSidebarView: function(parentElement, position, defaultWidth, defaultHeight) {
    if (this.splitView) {
      return;
    }

    if (!parentElement) {
      parentElement = this.element;
    }

    this.splitView = new WebInspector.SidebarView(position, this._sidebarWidthSettingName(), defaultWidth, defaultHeight);
    this.splitView.show(parentElement);
    this.splitView.addEventListener(WebInspector.SidebarView.EventTypes.Resized, this.sidebarResized.bind(this));

    this.sidebarElement = this.splitView.sidebarElement;
  },
  _sidebarWidthSettingName: function() {
    return "ElementsSidebarWidth";
  },
  __proto__: WebInspector.View.prototype
}