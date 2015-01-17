function PopoverHelper(panelElement, getAnchor, queryObject, onHide, disableOnClick) {
  WebInspector.ObjectPopoverHelper.call(this, panelElement, getAnchor, queryObject, onHide, disableOnClick);
}

PopoverHelper.prototype = {
    _onHideObjectPopover: function() { },
    __proto__: WebInspector.ObjectPopoverHelper.prototype
}

module.exports = PopoverHelper;