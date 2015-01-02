/** @jsx React.DOM */

var React = require('react');
var classSet = require('react/lib/cx');

var List = React.createClass({
  render: function () {
    return (
      <div className='list-container'>
        <ul className='list' ref='items'>
          {this.children()}
        </ul>
      </div>
    );
  },
  children: function () {
    var i = 0;
    return React.Children.map(this.props.children, function (child) {
      var classes = classSet({
        'list-item': true,
        'alt': i % 2 === 0
      });

      i++;

      return <li className={classes}>{child}</li>;
    });
  }
});

module.exports = List;