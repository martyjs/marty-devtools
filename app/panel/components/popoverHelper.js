function PopoverHelper(panelElement, getAnchor, queryObject, onHide, disableOnClick) {
  WebInspector.ObjectPopoverHelper.call(this, panelElement, getAnchor, queryObject, onHide, disableOnClick);
}

PopoverHelper.prototype = {
  dispose: function () {
    console.log('disposing popover', this._popover.disposed);
    this._resetHoverTimer();
    this._popover.dispose();

    console.log('popover disposed', this._popover.disposed);
  },
  hide: function () {
    this._popover.hide();
  },
  // _mouseHover: function () {
  //   console.log('PopoverHelper._mouseHover', this._popover.disposed);
  //   if (!this._popover.disposed) {
  //     WebInspector.ObjectPopoverHelper.prototype._mouseHover.apply(this, arguments);
  //   }
  // },
  _mouseMove: function() {
    console.log('PopoverHelper._mouseMove', this._popover.disposed);
    if (!this._popover.disposed) {
      WebInspector.ObjectPopoverHelper.prototype._mouseMove.apply(this, arguments);
    }
  },
  _onHideObjectPopover: function() { },
  __proto__: WebInspector.ObjectPopoverHelper.prototype
}

module.exports = PopoverHelper;