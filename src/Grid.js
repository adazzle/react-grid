/* @flow */
/**
 * @jsx React.DOM
 */
"use strict";

var React                = require('react/addons');
var PropTypes            = React.PropTypes;
Object.assign = require('object-assign');
var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var Grid = React.createClass({


  propTypes: {
    rows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    columns: PropTypes.arrayOf(React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      width: React.PropTypes.number.isRequired,
      cellRenderer: React.PropTypes.func,
    })).isRequired
  },

  getStyle: function(){
    return{
      overflow: 'hidden',
      outline: 0,
      position: 'relative',
      minHeight: this.props.minHeight
    }
  },

  rowGetter: function (rowIndex) {
    return this.props.rows[rowIndex];
  },
  render() {
var columns = this.props.columns.map((col) => {
  var colProps =  {
    label: col.name,
    width: col.width || 100,
    dataKey: col.key
  }
  if(col.cellRenderer) {colProps.cellRenderer = col.cellRenderer}
  return new Column(colProps);;
});
    return (

      <Table
        {...this.props}
        rowHeight={50}
        rowGetter={this.rowGetter}
        rowsCount={this.props.rows.length}
        width={500}
        height={500}
        headerHeight={50}>
        {columns}
      </Table>
      // <div {...this.props} style={this.getStyle()} className="react-grid-Grid">
      //   <Header
      //     ref="header"
      //     columns={this.state.columns}
      //     onColumnResize={this.onColumnResize}
      //     height={this.props.rowHeight}
      //     totalWidth={this.DOMMetrics.gridWidth()}
      //     headerRows={headerRows}
      //     />
      //   <Viewport
      //     ref="viewport"
      //     width={this.state.columns.width}
      //     rowHeight={this.props.rowHeight}
      //     rowRenderer={this.props.rowRenderer}
      //     cellRenderer={this.props.cellRenderer}
      //     rows={this.props.rows}
      //     selectedRows={this.props.selectedRows}
      //     expandedRows={this.props.expandedRows}
      //     length={this.props.length}
      //     columns={this.state.columns}
      //     totalWidth={this.DOMMetrics.gridWidth()}
      //     onScroll={this.onScroll}
      //     onRows={this.props.onRows}
      //     rowOffsetHeight={this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length}
      //     />
      // </div>
    );
  },

  getDefaultProps() {
    return {
      rowHeight: 35,
      minHeight: 350
    };
  },
});

module.exports = Grid;
