/** @jsx React.DOM */

var React = require('react');
var Marty = require('marty');
var _ = require('underscore');
var ColumnsStore = require('../stores/columnsStore');
var ColumnActionCreators = require('../actions/columnActionCreators');

var SplitColumnsState = Marty.createStateMixin({
  listenTo: ColumnsStore,
  getInitialState: function () {
    return { dragging: false };
  },
  getState: function () {
    var widths = {};

    React.Children.forEach(this.props.children, function (column) {
      widths[column.ref] = ColumnsStore.getColumnWidth(column.ref);
    });

    return {
      widths: widths
    };
  }
});

var SplitColumns = React.createClass({
  mixins: [SplitColumnsState],
  render: function () {
    return <div className='split-columns'>{this.columns()}</div>;
  },
  columns: function () {
    return React.Children.map(this.props.children, function (column) {
      var width = this.state.widths[column.ref] + 'px';
      var onMouseDown = _.partial(this.onMouseDown, _, column.ref);

      return (
        <div ref={column.ref} className='split-column' style={{width: width}}>
          {column}
          <div className='split-column-resizer' onMouseDown={onMouseDown}></div>
        </div>
      );
    }, this);
  },
  componentDidUpdate: function (props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  },
  onMouseMove: function (e) {
    if (!this.state.dragging) {
      return;
    }

    var width = e.pageX - this.state.left;

    ColumnActionCreators.updateColumnWidth(this.state.column, width);

    e.stopPropagation();
    e.preventDefault();
  },
  onMouseUp: function (e) {
    this.setState({ dragging: false });
    e.stopPropagation();
    e.preventDefault();
  },
  onMouseDown: function (e, column) {
    var width = this.state.widths[column];

    this.setState({
      dragging: true,
      column: column,
      left: e.pageX - width
    });
  }
});

module.exports = SplitColumns;