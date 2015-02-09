/**
 * @jsx React.DOM


 */
"use strict";

var React                = require('react/addons');
var PropTypes            = React.PropTypes;
var Header               = require('./Header');
var Viewport             = require('./Viewport');
var ColumnMetrics        = require('./ColumnMetrics');
var DOMMetrics           = require('./DOMMetrics');


var GridScrollMixin = {

  componentDidMount() {
    this._scrollLeft = this.refs.viewport.getScroll().scrollLeft;
    this._onScroll();
  },

  componentDidUpdate() {
    this._onScroll();
  },

  componentWillMount() {
    this._scrollLeft = undefined;
  },

  componentWillUnmount() {
    this._scrollLeft = undefined;
  },

  onScroll({scrollLeft}) {
    if (this._scrollLeft !== scrollLeft) {
      this._scrollLeft = scrollLeft;
      this._onScroll();
    }
  },

  _onScroll() {
    if (this._scrollLeft !== undefined) {
      this.refs.header.setScrollLeft(this._scrollLeft);
      this.refs.viewport.setScrollLeft(this._scrollLeft);
    }
  }
};

var Grid = React.createClass({
  mixins: [
    GridScrollMixin,
    ColumnMetrics.Mixin,
    DOMMetrics.MetricsComputatorMixin
  ],

  propTypes: {
    rows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    columns: PropTypes.array.isRequired
  },

  getStyle: function(){
    return{
      overflow: 'hidden',
      outline: 0,
      position: 'relative',
      minHeight: this.props.minHeight
    }
  },

  render() {
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
          cellRenderer={this.props.cellRenderer}
          rows={this.props.rows}
          selectedRows={this.props.selectedRows}
          expandedRows={this.props.expandedRows}
          length={this.props.length}
          columns={this.state.columns}
          totalWidth={this.DOMMetrics.gridWidth()}
          onScroll={this.onScroll}
          onRows={this.props.onRows}
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
