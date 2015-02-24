/* @flow */
/**
 * @jsx React.DOM


 */
"use strict";

var React                = require('react/addons');
var PropTypes            = React.PropTypes;
var Header               = require('./Header');
var Viewport             = require('./Viewport');
var DOMMetrics           = require('./DOMMetrics');
var GridScrollMixin      = require('./GridScrollMixin');
var ColumnMetricsMixin      = require('./ColumnMetricsMixin');


var Grid = React.createClass({
  mixins: [
    GridScrollMixin,
    ColumnMetricsMixin,
    DOMMetrics.MetricsComputatorMixin
  ],

  propTypes: {
    rows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    columns: PropTypes.array.isRequired,
    minHeight: PropTypes.number,
    headerRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    rowHeight: PropTypes.number,
    rowRenderer: PropTypes.func.isRequired,
    expandedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    selectedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    totalRows: PropTypes.number,
    onRows: PropTypes.func,
    rowOffsetHeight: PropTypes.number.isRequired
  },

  getStyle: function(): { overflow: string; outline: number; position: string; minHeight: number } {
    return{
      overflow: 'hidden',
      outline: 0,
      position: 'relative',
      minHeight: this.props.minHeight
    }
  },

  render(): ?ReactElement {
    var headerRows = this.props.headerRows || [{ref : 'row'}];
    return (
      <div {...this.props} style={this.getStyle()} className="react-grid-Grid">
        <Header
          ref="header"
          columns={this.state.columns}
          onColumnResize={this.onColumnResize}
          height={this.props.rowHeight}
          totalWidth={this.DOMMetrics.gridWidth()}
          headerRows={headerRows}
          />
        <Viewport
          ref="viewport"
          width={this.state.columns.width}
          rowHeight={this.props.rowHeight}
          rowRenderer={this.props.rowRenderer}
          rows={this.props.rows}
          selectedRows={this.props.selectedRows}
          expandedRows={this.props.expandedRows}
          totalRows={this.props.totalRows || this.props.rows.length}
          columns={this.state.columns}
          totalWidth={this.DOMMetrics.gridWidth()}
          onScroll={this.onScroll}
          onRows={this.props.onRows}
          cellMetaData={this.props.cellMetaData}
          rowOffsetHeight={this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length}
          />
      </div>
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
