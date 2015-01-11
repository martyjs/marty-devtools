var NAME = "Stores";
var EMPTY_PLACEHOLDER = "No Stores";

function StoresSidePanel() {
  WebInspector.SidebarPane.call(this, NAME);
};

StoresSidePanel.prototype = {

  update: function(object) {
    var body = this.bodyElement;
    body.removeChildren();

    if (!object) {
      return;
    }

    var section = new WebInspector.ObjectPropertiesSection(
      WebInspector.RemoteObject.fromLocalObject(object),
      NAME,
      '',
      EMPTY_PLACEHOLDER,
      false,
      null
    );

    section.headerElement.addStyleClass("hidden");
    section.expanded = true;
    section.editable = true;

    body.appendChild(section.element);
  },

  __proto__: WebInspector.SidebarPane.prototype
};

module.exports = StoresSidePanel;