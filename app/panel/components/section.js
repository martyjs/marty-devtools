/** @jsx React.DOM */

var React = require('react');
var cx = require('react/lib/cx');

var Section = React.createClass({
  getInitialState: function () {
    return {
      expanded: true
    };
  },
  render: function () {
    var children;
    var classes = cx({
      'sidebar-pane-title': true,
      'expanded': this.state.expanded
    });

    if (this.state.expanded) {
      children = this.props.children;
    }

    return (
      <div className='section'>
        <div className={classes} onClick={this.toggleExpanded}>
          {this.props.title}
        </div>
        <div className='section-body'>
          {children}
        </div>
      </div>
    );
  },
  toggleExpanded: function () {
    this.setState({
      expanded: !this.state.expanded
    });
  }
});

module.exports = Section;