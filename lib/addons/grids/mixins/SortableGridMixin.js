/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = require('react');
var PropTypes           = React.PropTypes;
var SortableHeaderCell  = require('../../cells/headerCells/SortableHeaderCell');
var shallowCloneObject  = require('../../../shallowCloneObject');

var SortableGridMixin = {

  getInitialState: function() {
    return {sortDirection: null, sortColumn: null};
  },

  getDecoratedColumns: function(columns) {
    return this.props.columns.map(function(column) {
      column = shallowCloneObject(column);
      if (column.sortable) {
        column.headerRenderer = SortableHeaderCell;
        column.sortBy = this.sortBy;
        if (this.state.sortColumn === column.id) {
          column.sorted = this.state.sortDirection;
        }
      }
      return column
    }, this);
  },

  sortBy: function(column, direction) {
    direction = direction === 'asc' ? 'desc' : 'asc'
    this.setState({sortDirection: direction, sortColumn: column.id});
  },

  rows: function(start, end) {
    return this.props.rows(
      start, end,
      this.props.length,
      this.state.sortColumn,
      this.state.sortDirection);
  }

}

module.exports = SortableGridMixin;
