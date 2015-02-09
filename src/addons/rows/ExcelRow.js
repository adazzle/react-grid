/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var BaseRow       = require('../../Row');
var ColumnMetrics = require('../../ColumnMetrics');
var ExcelRow = React.createClass({
  propTypes: {
    row : React.PropTypes.shape(ExcelRow).isRequired,
    isSelected : React.PropTypes.boolean,
    height : React.PropTypes.number,
    columns : React.PropTypes.arrayOf(React.PropTypes.shape(ExcelColumn)).isRequired,
    cellRenderer : React.PropTypes.func.isRequired,
    idx : React.PropTypes.number.isRequired
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
        row={row}
        height={this.getRowHeight(this.props)}/>
      );
  },

  getRowHeight(props: any): number | ReactElement{
    if(props.expandedRows && props.expandedRows[props.key]){
      return props.expandedRows[props.key];
    }else{
      return props.height;
    }
  },

  hasRowHeightChanged(props: any): boolean{
    if(props.expandedRows){
      if(typeof props.expandedRows[props.key] !== 'undefined'){
        return this.props.height !== props.expandedRows[props.key]
      }else{
        return false;
      }
    }else{
      return false;
    }
  },

  shouldComponentUpdate(nextProps: any): boolean {
    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
      this.doesRowContainSelectedCell(this.props)          ||
      this.doesRowContainSelectedCell(nextProps) ||
      this.willRowBeDraggedOver(nextProps)       ||
      this.hasRowBeenCopied()                    ||
      nextProps.row !== this.props.row           ||
      this.hasRowHeightChanged(nextProps);
  },

  doesRowContainSelectedCell(props: any): boolean{
    var cell = props.cellRenderer;
    if(cell.props && cell.props.selected && cell.props.selected.rowIdx === props.idx){
      return true;
    }else{
      return false;
    }
  },

  willRowBeDraggedOver(props: any): boolean{
    if(props.cellRenderer.props){
      var dragged = props.cellRenderer.props.dragged;
      return  dragged != null && (dragged.rowIdx || dragged.complete === true);
    }else{
      return false;
    }

  },

  hasRowBeenCopied(): boolean{
    if(this.props.cellRenderer.props){
      var cell = this.props.cellRenderer;
      return cell.props.copied != null && cell.props.copied.rowIdx === this.props.idx;
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
