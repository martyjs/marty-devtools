/** @jsx React.DOM */

var React = require('react');

var Error = React.createClass({
  render: function () {
    var error = this.props.error;

    if (!error) {
      return <div className="no-error"></div>;
    }

    return (
      <div className="dataflow-error source-code">
        <div className="dataflow-error-message">{error.message}</div>
        <div className="dataflow-error-callstack">{error.stack}</div>
      </div>
    );
  }
});

module.exports = Error;