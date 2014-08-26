/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var PropTypes      = React.PropTypes;

var DraggableMixin = {

  getCellClass : function(){
    return cx({
      'selected-draggable' : this.isSelected(),
      'active-drag-cell' : this.isSelected() || this.isDraggedOver(),
      'is-dragged-over' :  !this.isSelected() && this.isDraggedOver(),
      'was-dragged-over' : this.wasDraggedOver()
    });
  },

  getDefaultProps : function(){
    return {
        handleDragStart: this.handleDragStart,
        onDragEnter: this.handleDragEnter,
        onDragEnd: this.handleDragEnd
    }
  },

  propTypes : {
    handleDragEnter : React.PropTypes.func.isRequired,
    handleDragStart : React.PropTypes.func.isRequired,
    handleDragEnd : React.PropTypes.func.isRequired,
    handleTerminateDrag : React.PropTypes.func.isRequired
  },

  isDraggedOver(){
      return (
        this.props.dragged &&
        this.props.dragged.overRowIdx === this.props.rowIdx
        && this.props.dragged.idx === this.props.idx
      )
  },

  wasDraggedOver(){
    return (
      this.props.dragged
      && this.props.dragged.overRowIdx > this.props.rowIdx
      && this.props.rowIdx > this.props.dragged.rowIdx
      && this.props.dragged.idx === this.props.idx
    );
  },

  handleDragStart(e){
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    this.props.handleDragStart({rowIdx : rowIdx, idx : idx, copiedText : this.props.value});
  },

  handleDragEnter(){
    this.props.handleDragEnter(this.props.rowIdx);
  },

  handleDragEnd(){
    this.props.handleDragEnd();
  },

  isSelected: function() {
    return (
      this.props.selected
      && this.props.selected.rowIdx === this.props.rowIdx
      && this.props.selected.idx === this.props.idx
    );
  },

  componentDidUpdate(){
    var dragged = this.props.dragged;
    if(dragged && dragged.complete === true){
      this.props.handleTerminateDrag();
    }
  }

};



module.exports = DraggableMixin;
