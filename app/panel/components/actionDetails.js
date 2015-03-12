var React = require('react');
var _ = require('lodash');
var ObjectTree = require('./objectTree');

var ActionDetails = React.createClass({
  render: function () {
    if (this.props.action) {
      return this.renderActionDetails();
    } else {
      return this.renderNothing();
    }
  },
  renderActionDetails: function () {
    return (
      <div className="ActionDetails">
        <ObjectTree object={this.getDetails()} />
      </div>
    );
  },

  getDetails: function () {
    var action = this.props.action;

    return {
      General: {
        type: action.type,
        arguments: action.arguments
      },
      Stores: storeDetails(),
      Components: componentDetails()
    };

    function componentDetails() {
      var details = {};

      _.each(action.components, function (handler) {
        var handlerDetails = details[handler.displayName];

        if (!handlerDetails) {
          handlerDetails = details[handler.displayName] = {
            'Total re-rendered': 0,
            'Triggered by': []
          };
        }

        handlerDetails['Total re-rendered']++;

        var triggeredBy = handlerDetails['Triggered by'];

        if (triggeredBy.indexOf(handler.store) === -1) {
          triggeredBy.push(handler.store);
        }
      });

      return details;
    }

    function storeDetails() {
      var details = {};

      _.each(action.stores, function (handler) {
        if (!details[handler.store]) {
          details[handler.store] = {
            handlers: []
          };
        }

        details[handler.store].handlers.push(handler.handler);
      });

      return details;
    }
  },
  renderNothing: function () {
    return <div className="ActionDetails ActionDetails-noAction"></div>;
  }
});

module.exports = ActionDetails;