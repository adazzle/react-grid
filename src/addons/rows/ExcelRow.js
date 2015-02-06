/**
 * @jsx React.DOM
 

 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var BaseRow       = require('../../Row');
var ColumnMetrics = require('../../ColumnMetrics');
var ExcelRow = React.createClass({

  render() {
    var row = React.addons.update(this.props.row,  {$merge : {'select-row' : this.props.isSelected}});

    return (
      <BaseRow
        {... this.props}
        row={row}
        height={this.getRowHeight(this.props)}/>
      );
  },

  getRowHeight(props){
    if(props.expandedRows && props.expandedRows[props.key]){
      return props.expandedRows[props.key];
    }else{
      return props.height;
    }
  },

  hasRowHeightChanged(props){
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

  shouldComponentUpdate(nextProps) {
    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
      this.doesRowContainSelectedCell()          ||
      this.doesRowContainSelectedCell(nextProps) ||
      this.willRowBeDraggedOver(nextProps)       ||
      this.hasRowBeenCopied()                    ||
      nextProps.row !== this.props.row           ||
      this.hasRowHeightChanged(nextProps);
  },

  doesRowContainSelectedCell(propsToCheck){
    var props = propsToCheck || this.props;
    var cell = cell || props.cellRenderer;
    if(cell.props && cell.props.selected && cell.props.selected.rowIdx === props.idx){
      return true;
    }else{
      return false;
    }
  },

  willRowBeDraggedOver(props){
    if(props.cellRenderer.props){
      var dragged = props.cellRenderer.props.dragged;
      return  dragged != null && (dragged.rowIdx || dragged.complete === true);
    }else{
      return false;
    }

  },

  hasRowBeenCopied(){
    if(this.props.cellRenderer.props){
      var cell = this.props.cellRenderer;
      return cell.props.copied != null && cell.props.copied.rowIdx === this.props.idx;
    }else{
      return false;
    }

  },

  setScrollLeft(scrollLeft) {
    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      if (this.props.columns[i].locked) {
        this.refs[i].setScrollLeft(scrollLeft);
      }
    }
  }


});

module.exports = ExcelRow;
