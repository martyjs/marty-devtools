function ObjectSidebarPane(name, emptyPlaceholder) {
  this._emptyPlaceholder = emptyPlaceholder;
  WebInspector.SidebarPane.call(this, name);
}

ObjectSidebarPane.prototype = {
  update: function (object) {
    var body = this.bodyElement;
    body.removeChildren();

    if (!object) {
      return;
    }

    var section = new WebInspector.ObjectPropertiesSection(
      WebInspector.RemoteObject.fromLocalObject(object),
      '',
      '',
      this._emptyPlaceholder,
      false,
      null
    );

    section.expanded = true;
    section.editable = false;
    section.headerElement.addStyleClass('hidden');
    body.appendChild(section.element);
  },

  __proto__: WebInspector.SidebarPane.prototype
};

TreeElement.prototype.isEventWithinDisclosureTriangle = function (event) {
  var paddingLeftValue = window.getComputedStyle(this._listItemNode).paddingLeft;
  var computedLeftPadding = parseFloat(paddingLeftValue);
  var left = this._listItemNode.totalOffsetLeft() + computedLeftPadding;
  return event.pageX >= left && event.pageX <= left + TreeElement._ArrowToggleWidth && this._expandable;
};

module.exports = ObjectSidebarPane;