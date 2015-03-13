var React = require("react");
var ActionActionCreators = require('../actions/actionActionCreators');

module.exports = {
  componentDidMount: function () {
    var action = this.props.action;
    var el = React.findDOMNode(this);

    el.addEventListener("contextmenu", (event) => {
      var contextMenu = new WebInspector.ContextMenu(event);
     
      contextMenu.appendItem("Revert to action", () => {
        ActionActionCreators.revertToAction(this.props.action.id);
      });

      contextMenu.show();
    }, true);
  },
};