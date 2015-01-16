/** @jsx React.DOM */

var React = require('react');

var Column = React.createClass({
  render: function () {
    return (
      <div className={this.props.name + '-column column'}>
        <div className='sidebar-pane-title column-title'>
          {this.props.title}
        </div>
        <div className='column-body'>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Column;