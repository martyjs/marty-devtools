/** @jsx React.DOM */

var React = require('react');

var Column = React.createClass({
  render: function () {
    return (
      <div className={this.props.name + '-column column'}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Column;