/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var BaseRow       = require('../../Row');
var ColumnMetrics = require('../../ColumnMetrics');
var ExcelColumn = require('../grids/ExcelColumn');

type cellProps = {
  props: {
    selected: {rowIdx: number};
    dragged: {complete: bool; rowIdx: number};
    copied: { rowIdx: number};
  }
};

var ExcelRow = React.createClass({
  propTypes: {
    row : React.PropTypes.shape(ExcelRow).isRequired,
    isSelected : React.PropTypes.bool,
    height : React.PropTypes.number,
    columns : React.PropTypes.arrayOf(React.PropTypes.shape(ExcelColumn)).isRequired,
    cellRenderer : React.PropTypes.func.isRequired,
    idx : React.PropTypes.number.isRequired,
    expandedRows : React.PropTypes.arrayOf(ExcelRow)
  },

  getDefaultProps(): any {
    return {
      isSelected: false,
      height : 35
    };
  },
  render(): ?ReactElement {
    var row = React.addons.update(this.props.row,  {$merge : {'select-row' : this.props.isSelected}});
    return (
      <BaseRow
        {... this.props}
        idx={this.props.idx}
        columns={this.props.columns}
        row={row}
        rowHeight={this.getRowHeight(this.props)}/>
      );
  },

  getRowHeight(): number {
    var rows = this.props.expandedRows || null;
    if(rows && this.props.key) {
      var row = rows[this.props.key] || null;
      if(row) {
        return row.rowHeight;
      }
    }
    return this.props.rowHeight;
  },

  hasRowHeightChanged(props: any): boolean{
    if(props.expandedRows){
      if(typeof props.expandedRows[props.idx] !== 'undefined'){
        return this.props.height !== props.expandedRows[props.idx]
      }else{
        return false;
      }
    }else{
      return false;
    }
  },

  shouldComponentUpdate(nextProps: any): boolean {
    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
      this.doesRowContainSelectedCell(this.props)     ||
      this.doesRowContainSelectedCell(nextProps)      ||
      this.willRowBeDraggedOver(nextProps)            ||
      this.hasRowBeenCopied(this.props)               ||
      nextProps.row !== this.props.row                ||
      this.props.isSelected !== nextProps.isSelected  ||
      this.hasRowHeightChanged(nextProps);
  },

  doesRowContainSelectedCell(propsToCheck: any): boolean{
    var props = propsToCheck || this.props;
    var cell = cell || props.cellRenderer;
    if(cell.props && cell.props.selected && cell.props.selected.rowIdx === props.idx){
      return true;
    }else{
      return false;
    }
  },

  willRowBeDraggedOver(props: {cellRenderer: cellProps}): boolean{
    if(props.cellRenderer.props){
      var dragged = props.cellRenderer.props.dragged;
      return  dragged != null && (dragged.rowIdx != null || dragged.complete === true);
    }else{
      return false;
    }

  },

  hasRowBeenCopied(props: {cellRenderer: cellProps}): boolean{
    if(this.props.cellRenderer.props){
      var cell = this.props.cellRenderer;
      return cell.props.copied && cell.props.copied.rowIdx === this.props.idx;
    }else{
      return false;
    }

  },

  setScrollLeft(scrollLeft: number) {
    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      if (this.props.columns[i].locked) {
        this.refs[i].setScrollLeft(scrollLeft);
      }
    }
  }


});

module.exports = ExcelRow;
