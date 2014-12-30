/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');
var classSet = require('react/lib/cx');

var ActionList = React.createClass({
  render: function () {
    return (
      <div className='action-list-container'>
        <ul className={'action-list ' + this.props.className}>
          {this.items()}
        </ul>
      </div>
    );
  },
  items: function () {
    var items = [];

    _.each(this.props.items, function (item, i) {
      var onClick = _.partial(this.props.onClick, item);
      var classes = classSet({
        'alt': i % 2 === 0,
        'action-list-item': true,
        'selected': item.selected
      });

      var Template = this.props.template;
      var body = <Template item={item} />;

      items.push((
        <li onClick={onClick} className={classes}>
          {body}
        </li>
      ));
    }, this);

    return items;
  }
});

module.exports = ActionList;