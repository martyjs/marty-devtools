function ActionPanel() {
  this._actions = [];
  this._actionsById = {};
  this._actionsByURL = {};
  this._staleActions = {};
  this._actionGridNodes = {};
  this._lastActionGridNodeId = 0;
  this._mainActionLoadTime = -1;
  this._mainActionDOMContentLoadedTime = -1;
  this._matchedActions = [];
  this._highlightedSubstringChanges = [];
  this._filteredOutActions = new Map();

  this._matchedActionsMap = {};
  this._currentMatchedActionIndex = -1;

  var columns = [];

  columns.push({
    id: "action-type",
    titleDOMFragment: this.makeHeaderFragment("Action Type", ""),
    title: "Action Type",
    sortable: true,
    weight: 6,
    align: WebInspector.DataGrid.Align.Left
  });

  columns.push({
    id: "source",
    titleDOMFragment: this.makeHeaderFragment("Source", ""),
    title: "Source",
    sortable: true,
    weight: 6,
    align: WebInspector.DataGrid.Align.Left
  });

  this._dataGrid = new WebInspector.DataGrid(columns);
  this._dataGrid.setName("marty-actions");
  this._dataGrid.resizeMethod = WebInspector.DataGrid.ResizeMethod.Last
  this._dataGrid.renderInline();
  this._dataGrid.element.addStyleClass("network-log-grid");

  this.refresh();
}

ActionPanel.prototype = {
  addAction: function (action) {
    this._staleActions[action.id] = action;
  },
  // _refreshAction: function(action) {
  //   if (!this._actionsById[action.id])
  //       return;
  //   this._staleActions[action.id] = action;
  //   this._scheduleRefresh();
  // },

  // _scheduleRefresh: function() {
  //   if (this._needsRefresh) {
  //     return;
  //   }

  //   this._needsRefresh = true;
  //   console.log("_scheduleRefresh")
  //   if (this.isShowing() && !this._refreshTimeout) {
  //     this._refreshTimeout = setTimeout(this.refresh.bind(this), 500);
  //   }
  // },
  _removeAllNodeHighlights: function() {
    if (this._highlightedNode) {
      this._highlightedNode.element.removeStyleClass("highlighted-row");
      delete this._highlightedNode;
    }
  },
  _actionGridNode: function(action) {
    return this._actionGridNodes[action.__gridNodeId];
  },
  _createActionGridNode: function(action) {
      var node = new ActionPanelNode(this, action);
      action.__gridNodeId = this._lastActionGridNodeId++;
      this._actionGridNodes[action.__gridNodeId] = node;
      return node;
  },
  _invalidateAllItems: function() {
    for (var i = 0; i < this._actions.length; ++i) {
        var action = this._actions[i];
        this._staleActions[action.id] = action;
    }
  },
  refresh: function() {
    try {
      this._needsRefresh = false;
      if (this._refreshTimeout) {
          clearTimeout(this._refreshTimeout);
          delete this._refreshTimeout;
      }

      this._removeAllNodeHighlights();
      var wasScrolledToLastRow = this._dataGrid.isScrolledToLastRow();
      var boundariesChanged = false;


      for (var actionId in this._staleActions) {
        var action = this._staleActions[actionId];
        var node = this._actionGridNode(action);
        if (!node) {
            // Create the timeline tree element and graph.

            node = this._createActionGridNode(action);
            this._dataGrid.rootNode().appendChild(node);
        }

        node.refreshAction();
        // this._applyFilter(node);

        // if (!node.isFilteredOut())
        //     this._updateHighlightIfMatched(action);
      }

      // if (boundariesChanged) {
      //     // The boundaries changed, so all item graphs are stale.
      //     this._invalidateAllItems();
      // }

      // for (var actionId in this._staleActions)
      //     this._actionGridNode(this._staleActions[actionId]).refreshGraph(this.calculator);

      this._staleActions = {};
      // this._sortItems();
      // this._updateSummaryBar();
      this._dataGrid.updateWidths();
      // FIXME: evaluate performance impact of moving this before a call to sortItems()
      if (wasScrolledToLastRow)
          this._dataGrid.scrollToLastRow();


      console.log(this._dataGrid.element.outerHTML)
    } catch (e) {
      console.log("failed to refresh: " + e);
    }
  },
  _updateOffscreenRows: function() {
      var dataTableBody = this._dataGrid.dataTableBody;
      var rows = dataTableBody.children;
      var recordsCount = rows.length;
      if (recordsCount < 2)
          return;  // Filler row only.

      var visibleTop = this._dataGrid.scrollContainer.scrollTop;
      var visibleBottom = visibleTop + this._dataGrid.scrollContainer.offsetHeight;

      var rowHeight = 0;

      // Filler is at recordsCount - 1.
      var unfilteredRowIndex = 0;
      for (var i = 0; i < recordsCount - 1; ++i) {
          var row = rows[i];

          var dataGridNode = this._dataGrid.dataGridNodeFromNode(row);
          if (dataGridNode.isFilteredOut()) {
              row.removeStyleClass("offscreen");
              continue;
          }

          if (!rowHeight)
              rowHeight = row.offsetHeight;

          var rowIsVisible = unfilteredRowIndex * rowHeight < visibleBottom && (unfilteredRowIndex + 1) * rowHeight > visibleTop;
          if (rowIsVisible !== row.rowIsVisible) {
              row.enableStyleClass("offscreen", !rowIsVisible);
              row.rowIsVisible = rowIsVisible;
          }
          unfilteredRowIndex++;
      }
  },
  makeHeaderFragment: function(title, subtitle) {
    var fragment = document.createDocumentFragment();
    fragment.createTextChild(title);
    var subtitleDiv = fragment.createChild("div", "network-header-subtitle");
    subtitleDiv.createTextChild(subtitle);
    return fragment;
  },
  show: function (element) {
    this._dataGrid.show(element);
  }
};