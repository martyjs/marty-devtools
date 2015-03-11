/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');
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
        if (!details[handler.displayName]) {
          details[handler.displayName] = 0;
        }

        details[handler.displayName]++;
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