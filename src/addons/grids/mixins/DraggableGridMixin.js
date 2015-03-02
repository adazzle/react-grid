/* TODO@flow mixins */
/**
 * @jsx React.DOM


 */
"use strict";

var React                    = require('react/addons');
var PropTypes                = React.PropTypes;
var SelectableGridMixin          = require('./SelectableGridMixin');


type DraggedType = {
  idx: number;
  rowIdx: number;
};

var DraggableGridMixin = {



  propTypes : {
    onCellsDragged : React.PropTypes.func,
    rows : React.PropTypes.array.isRequired
  },
  dragEnabled: function(): boolean {
    return this.props.onCellsDragged !== null;
  },
  getInitialState: function(): {dragged: ?DraggedType } {
    return {dragged : null };
  },

  handleDragStart(dragged: DraggedType){
    if(!this.dragEnabled()) { return; }
    var idx = dragged.idx;
    var rowIdx = dragged.rowIdx;
    if (
      idx >= 0
      && rowIdx >= 0
      && idx < this.getColumns().length
      && rowIdx < this.props.rows.length
    ) {
      this.setState({dragged: dragged});
    }
  },

  handleDragEnter(row: any){
    if(!this.dragEnabled()) { return; }
    var selected = this.state.selected;
    var dragged = this.state.dragged;
    dragged.overRowIdx = row;
   this.setState({dragged : dragged});
  },

  handleDragEnd(){
    if(!this.dragEnabled()) { return; }
    var fromRow, toRow;
    var selected = this.state.selected;
    var dragged = this.state.dragged;
    var cellKey = this.getColumns()[this.state.selected.idx].key;
    fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
    toRow   = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
    if(this.props.onCellsDragged) { this.props.onCellsDragged({cellKey: cellKey , fromRow: fromRow, toRow : toRow, value : dragged.copiedText}); }
    this.setState({dragged : {complete : true}});
  },

  handleTerminateDrag(){
    if(!this.dragEnabled()) { return; }
    this.setState({dragged: null});
  }
}


module.exports = DraggableGridMixin;
