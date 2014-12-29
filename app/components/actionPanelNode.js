function ActionPanelNode(parentView, action)
{
    WebInspector.DataGridNode.call(this, {});
    this._parentView = parentView;
    this._action = action;
    this._linkifier = new WebInspector.Linkifier();
}

ActionPanelNode.prototype = {
    /** override */
    createCells: function()
    {
        this._actionTypeCell = this._createDivInTD('action-type');
    },

    wasDetached: function()
    {
        this._linkifier.reset();
    },

    isFilteredOut: function()
    {
        return !!this._parentView._filteredOutRequests.get(this._action);
    },

    _onClick: function()
    {
        if (!this._parentView._allowRequestSelection)
            this.select();
    },

    select: function()
    {
        this._parentView.dispatchEventToListeners(WebInspector.NetworkLogView.EventTypes.RequestSelected, this._action);
        WebInspector.DataGridNode.prototype.select.apply(this, arguments);

        WebInspector.notifications.dispatchEventToListeners(WebInspector.UserMetrics.UserAction, {
            action: WebInspector.UserMetrics.UserActionNames.NetworkRequestSelected,
            url: this._action.url
        });
    },

    _openInNewTab: function()
    {
        InspectorFrontendHost.openInNewTab(this._action.url);
    },

    get selectable()
    {
        return this._parentView._allowRequestSelection && !this.isFilteredOut();
    },

    _createDivInTD: function(columnIdentifier)
    {
        var td = this.createTD(columnIdentifier);
        var div = td.createChild('div');
        this._element.appendChild(td);
        return div;
    },

    refreshAction: function()
    {
        console.log('refresh action: ' + JSON.stringify(this._action));
        this._refreshActionType();
    },

    _refreshActionType: function()
    {
        this._actionTypeCell.removeChildren();
        this._actionTypeCell.appendChild(document.createTextNode(this._action.type));

    },

    __proto__: WebInspector.DataGridNode.prototype
};
