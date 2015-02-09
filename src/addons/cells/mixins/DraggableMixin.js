/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var PropTypes      = React.PropTypes;
var MixinHelper      = require('../../utils/MixinHelper');
var SelectableMixin  = require('./SelectableMixin');
var KeyboardHandlerMixin = require('./KeyboardHandlerMixin');

var DraggableMixin = MixinHelper.createDependency({

  KeyboardHandlerMixin : KeyboardHandlerMixin,

  SelectableMixin : SelectableMixin

}).assignTo({

getCellClass : function(){
  return cx({
    'selected-draggable' : this.isSelected(),
    'active-drag-cell' : this.isSelected() || this.isDraggedOver(),
    'is-dragged-over-up' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < this.props.dragged.rowIdx,
    'is-dragged-over-down' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > this.props.dragged.rowIdx,
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
    handleTerminateDrag : React.PropTypes.func.isRequired,
    onDragEnter : React.PropTypes.func,
    onDragEnd : React.PropTypes.func,
    rowIdx: React.PropTypes.number.isRequired,
    idx: React.PropTypes.number.isRequired,
    value: React.PropTypes.any.isRequired,
    dragged: React.PropTyes.shape({
        overRowIdx: React.PropTypes.number.isRequired,
        idx: React.PropTypes.number.isRequired,
        complete: React.PropTypes.boolean
    }),
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
      && ((this.props.dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < this.props.dragged.rowIdx)
      ||  (this.props.dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > this.props.dragged.rowIdx))
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

  isDraggedCellChanging(nextProps){
    if(this.props.dragged){
      return (nextProps.dragged && this.props.idx === nextProps.dragged.idx)
      || (this.props.dragged && this.props.idx === this.props.dragged.idx);
    }else{
      return false;
    }
  },

  componentDidUpdate(){
    var dragged = this.props.dragged;
    if(dragged && dragged.complete === true){
      this.props.handleTerminateDrag();
    }
  }

});



module.exports = DraggableMixin;
