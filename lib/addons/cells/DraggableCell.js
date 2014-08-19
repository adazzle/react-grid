/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var BaseCell       = require('../../Cell');
var SelectableMixin = require('../mixins/SelectableMixin');
var MixinHelper            = require('../utils/MixinHelper');
var KeyboardHandlerMixin = require('../mixins/KeyboardHandlerMixin');

var DraggableCellMixin = {

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
    handleDragEnd : React.PropTypes.func.isRequired
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
  }

};

var DraggableCell = React.createClass({

  mixins : MixinHelper.mix([KeyboardHandlerMixin, SelectableMixin, DraggableCellMixin]),

  overrides : {
    getCellClass : function(){
      return cx({
        'selected-draggable' : this.isSelected(),
        'active-drag-cell' : this.isSelected() || this.isDraggedOver(),
        'is-dragged-over' :  !this.isSelected() && this.isDraggedOver(),
        'was-dragged-over' : this.wasDraggedOver()
      });
    }
  },

  render: function() {
    if(this.props.idx === 1 && this.props.rowIdx ===2){
      console.log("was dragged over = " + this.wasDraggedOver());
      console.log("dragged = " + this.props.dragged);
    }
    return this.transferPropsTo(
      <BaseCell
        className={this.getCellClass()}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        handleDragStart={this.handleDragStart}
        onDragEnter={this.handleDragEnter}
        onDragEnd={this.props.handleDragEnd}
      />)
  }

})

module.exports = {Cell : DraggableCell, Mixin : DraggableCellMixin};
