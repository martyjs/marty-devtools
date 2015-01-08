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

    var section = new WebInspector.ObjectPropertiesSection(WebInspector.RemoteObject.fromPrimitiveValue([
      {
        name: "Test",
        value: "FOo"
      }])
      ,
      "Title",
      '',
      EMPTY_PLACEHOLDER,
      false,
      null,
      WebInspector.ObjectPropertyTreeElement
    );

    section.expanded = true;
    section.editable = true;

    body.appendChild(section.element);
  },

  __proto__: WebInspector.SidebarPane.prototype

};

module.exports = StoresSidePanel;