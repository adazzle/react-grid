/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React                = require('react');
var PropTypes            = React.PropTypes;
var Header               = require('./Header');
var Viewport             = require('./Viewport');
var ColumnMetrics        = require('./ColumnMetrics');
var DOMMetrics           = require('./DOMMetrics');


var GridScrollMixin = {

  componentDidMount:function() {
    this._scrollLeft = this.refs.viewport.getScroll().scrollLeft;
    this._onScroll();
  },

  componentDidUpdate:function() {
    this._onScroll();
  },

  componentWillMount:function() {
    this._scrollLeft = undefined;
  },

  componentWillUnmount:function() {
    this._scrollLeft = undefined;
  },

  onScroll:function($__0) {var scrollLeft=$__0.scrollLeft;
    if (this._scrollLeft !== scrollLeft) {
      this._scrollLeft = scrollLeft;
      this._onScroll();
    }
  },

  _onScroll:function() {
    if (this._scrollLeft !== undefined) {
      this.refs.header.setScrollLeft(this._scrollLeft);
      this.refs.viewport.setScrollLeft(this._scrollLeft);
    }
  }
};

var Grid = React.createClass({displayName: "Grid",
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

  render:function() {
    var headerRows = this.props.headerRows || [{ref : 'row'}];
    return (
      React.createElement("div", React.__spread({},  this.props, {style: this.getStyle(), className: "react-grid-Grid"}), 
        React.createElement(Header, {
          ref: "header", 
          columns: this.state.columns, 
          onColumnResize: this.onColumnResize, 
          height: this.props.rowHeight, 
          totalWidth: this.DOMMetrics.gridWidth(), 
          headerRows: headerRows}
          ), 
        React.createElement(Viewport, {
          ref: "viewport", 
          width: this.state.columns.width, 
          rowHeight: this.props.rowHeight, 
          rowRenderer: this.props.rowRenderer, 
          cellRenderer: this.props.cellRenderer, 
          rows: this.props.rows, 
          selectedRows: this.props.selectedRows, 
          expandedRows: this.props.expandedRows, 
          length: this.props.length, 
          columns: this.state.columns, 
          totalWidth: this.DOMMetrics.gridWidth(), 
          onScroll: this.onScroll, 
          onRows: this.props.onRows, 
          rowOffsetHeight: this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length}
          )
      )
    );
  },

  getDefaultProps:function() {
    return {
      rowHeight: 35,
      minHeight: 350
    };
  },
});

module.exports = Grid;
