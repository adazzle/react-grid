/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React                    = require('react');
var PropTypes                = React.PropTypes;


var DraggableGridMixin = {

  propTypes : {
    onCellsDragged : React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {dragged : null};
  },

  handleDragStart(dragged){
    var idx = dragged.idx;
    var rowIdx = dragged.rowIdx;
    if (
      idx >= 0
      && rowIdx >= 0
      && idx < this.props.columns.length
      && rowIdx < this.props.length
    ) {
      this.setState({dragged: dragged});
    }
  },

  handleDragEnter(row){
    var selected = this.state.selected;
    var dragged = this.state.dragged;
    dragged.overRowIdx = row;
   this.setState({dragged : dragged});
  },

  handleDragEnd(){
    var fromRow, toRow;
    var selected = this.state.selected;
    var dragged = this.state.dragged;
    var cellKey = this.props.columns[this.state.selected.idx].key;
    fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
    toRow   = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
    this.props.onCellsDragged({cellKey: cellKey , fromRow: fromRow, toRow : toRow, value : dragged.copiedText});
    this.setState({dragged : {complete : true}});
  },

  handleTerminateDrag(){
    this.setState({dragged: null});
  }
}


module.exports = DraggableGridMixin;
