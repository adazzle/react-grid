/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var Cell           = require('./Cell');
var cloneWithProps = React.addons.cloneWithProps;
var ColumnMetrics    = require('./ColumnMetrics');

var Row = React.createClass({displayName: "Row",

  render:function() {
    var className = cx(
      'react-grid-Row',
      ("react-grid-Row--" + (this.props.idx % 2 === 0 ? 'even' : 'odd'))
    );

    var style = {
      height: this.getRowHeight(),
      overflow: 'hidden'
    };

    var cells = this.getCells();
    return (
      React.createElement("div", React.__spread({},  this.props, {className: className, style: style}), 
        React.isValidElement(this.props.row) ?
          this.props.row : cells
      )
    );
  },

  getCells:function() {
    var cells = [];
    var lockedCells = [];

    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      var column = this.props.columns[i];
      var cell = this.renderCell({
        ref:i,
        key:i,
        idx:i,
        rowIdx:this.props.idx,
        filterRowIdx:this.props.row.key,
        value:this.getCellValue(column.key || i),
        column:column,
        height:this.getRowHeight(),
        formatter:column.formatter,
        rowData : this.props.row});
      if (column.locked) {
        lockedCells.push(cell);
      } else {
        cells.push(cell);
      }
    }

    return cells.concat(lockedCells);
  },

  getRowHeight:function(){
    if(this.props.expandedRows && this.props.expandedRows[this.props.key]){
      return this.props.expandedRows[this.props.key];
    }else{
      return this.props.height;
    }
  },

  getCellValue:function(key){
    if(key === 'select-row'){
      return this.props.isSelected;
    }else{
      return this.props.row[key]
    }
  },

  renderCell:function(props) {
    if (React.isValidElement(this.props.cellRenderer)) {
      return cloneWithProps(this.props.cellRenderer, props);
    } else {
      return this.props.cellRenderer(props);
    }
  },

  getDefaultProps:function() {
    return {
      cellRenderer: Cell
    };
  },

  shouldComponentUpdate:function(nextProps) {
    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
      this.doesRowContainSelectedCell()          ||
      this.doesRowContainSelectedCell(nextProps) ||
      this.willRowBeDraggedOver(nextProps)       ||
      this.hasRowBeenCopied()                    ||
      nextProps.row !== this.props.row           ||
      nextProps.height !== this.props.height;
  },

  setScrollLeft:function(scrollLeft) {
    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      if (this.props.columns[i].locked) {
        this.refs[i].setScrollLeft(scrollLeft);
      }
    }
  },

  doesRowContainSelectedCell:function(propsToCheck){
    var props = propsToCheck || this.props;
    var cell = cell || props.cellRenderer;
    if(cell.props.selected && cell.props.selected.rowIdx === props.idx){
      return true;
    }else{
      return false;
    }
  },

  willRowBeDraggedOver:function(props){
    var dragged = props.cellRenderer.props.dragged;
    return  dragged != null && (dragged.rowIdx || dragged.complete === true);
  },

  hasRowBeenCopied:function(){
    var cell = this.props.cellRenderer;
    return cell.props.copied != null && cell.props.copied.rowIdx === this.props.idx;
  }


});

module.exports = Row;
