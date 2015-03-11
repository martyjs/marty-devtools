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
    section.editable = false;

    body.appendChild(section.element);
  },

  __proto__: WebInspector.SidebarPane.prototype
};


TreeElement.prototype.isEventWithinDisclosureTriangle = function(event)
{
    var paddingLeftValue = window.getComputedStyle(this._listItemNode).paddingLeft;
    var computedLeftPadding = parseFloat(paddingLeftValue);
    var left = this._listItemNode.totalOffsetLeft() + computedLeftPadding;
    return event.pageX >= left && event.pageX <= left + TreeElement._ArrowToggleWidth && this._expandable;
};

module.exports = StoresSidePanel;