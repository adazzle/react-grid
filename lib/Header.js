/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = require('react/addons');
var cx                  = React.addons.classSet;
var shallowCloneObject  = require('./shallowCloneObject');
var ColumnMetrics       = require('./ColumnMetrics');
var HeaderRow           = require('./HeaderRow');

var Header = React.createClass({

  propTypes: {
    columns: React.PropTypes.object.isRequired,
    totalWidth: React.PropTypes.number,
    height: React.PropTypes.number.isRequired,
    headerRows : React.PropTypes.array.isRequired
  },

  render() {
    var state = this.state.resizing || this.props;

    var className = cx({
      'react-grid-Header': true,
      'react-grid-Header--resizing': !!this.state.resizing
    });


    return this.transferPropsTo(
      <div style={this.getStyle()} className={className}>
        <this.renderHeaderRows/>
      </div>
    );
  },

  renderHeaderRows(){
    var state = this.state.resizing || this.props;
    var headerRows = []
    this.props.headerRows.forEach((function(row, index){
      var headerRowStyle = {
        position: 'absolute',
        top: this.props.height * index,
        left: 0,
        width: this.props.totalWidth
      };

      headerRows.push(<HeaderRow
        key={row.ref}
        ref={row.ref}
        style={headerRowStyle}
        onColumnResize={this.onColumnResize}
        onColumnResizeEnd={this.onColumnResizeEnd}
        width={state.columns.width}
        height={row.height || this.props.height}
        columns={state.columns.columns}
        resizing={state.column}
        headerCellRenderer={row.headerCellRenderer}
        />)
    }).bind(this));
    return headerRows;
  },

  getInitialState() {
    return {resizing: null};
  },

  componentWillReceiveProps() {
    this.setState({resizing: null});
  },

  onColumnResize(column, width) {
    var state = this.state.resizing || this.props;

    var pos = this.getColumnPosition(column);

    if (pos !== null) {
      var resizing = {
        columns: shallowCloneObject(state.columns)
      };
      resizing.columns = ColumnMetrics.resizeColumn(
          resizing.columns, pos, width);

      // we don't want to influence scrollLeft while resizing
      if (resizing.columns.width < state.columns.width) {
        resizing.columns.width = state.columns.width;
      }

      resizing.column = resizing.columns.columns[pos];
      this.setState({resizing});
    }
  },

  getColumnPosition(column) {
    var state = this.state.resizing || this.props;
    var pos = state.columns.columns.indexOf(column);
    return pos === -1 ? null : pos;
  },

  onColumnResizeEnd(column, width) {
    var pos = this.getColumnPosition(column);
    if (pos !== null && this.props.onColumnResize) {
      this.props.onColumnResize(pos, width || column.width);
    }
  },

  setScrollLeft(scrollLeft) {
    var node = this.refs.row.getDOMNode();
    node.scrollLeft = scrollLeft;
    this.refs.row.setScrollLeft(scrollLeft);
  },

  getStyle() {
    return {
      position: 'relative',
      height: this.props.height
    };
  },
});


module.exports = Header;
