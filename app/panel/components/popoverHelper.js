function PopoverHelper(panelElement, getAnchor, queryObject, onHide, disableOnClick) {
  WebInspector.ObjectPopoverHelper.call(this, panelElement, getAnchor, queryObject, onHide, disableOnClick);
}

PopoverHelper.prototype = {
  dispose: function () {
    this._resetHoverTimer();
    this._popover.dispose();
  },
  hide: function () {
    this._popover.hide();
  },
  _mouseMove: function() {
    if (!this._popover.disposed) {
      WebInspector.ObjectPopoverHelper.prototype._mouseMove.apply(this, arguments);
    }
  },
  _onHideObjectPopover: function() { },
  __proto__: WebInspector.ObjectPopoverHelper.prototype
}

module.exports = PopoverHelper;