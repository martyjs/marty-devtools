var React = require('react');

var Column = React.createClass({
  render: function () {
    var style = {
      height: this.state.height + 'px'
    };

    return (
      <div className={this.props.name + '-column column'}>
        <div className='sidebar-pane-title column-title'>
          {this.props.title}
        </div>
        <div className='column-body' style={style} onClick={this.props.onClick}>
          {this.props.children}
        </div>
      </div>
    );
  },
  componentDidMount: function () {
    window.addEventListener('resize', this.updateBodyHeight);
  },
  getInitialState: function () {
    return this.getState();
  },
  getState: function () {
    return {
      height: window.innerHeight - 20
    };
  },
  getDefaultProps: function () {
    return { onClick: function () {} };
  },
  updateBodyHeight: function () {
    this.setState(this.getState());
  }
});

module.exports = Column;