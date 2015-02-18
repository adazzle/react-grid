/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var KeyboardHandlerMixin = require('./KeyboardHandlerMixin');
var MixinHelper    = require('../../utils/MixinHelper');

var SelectableMixin = MixinHelper.createDependency({KeyboardHandlerMixin : KeyboardHandlerMixin}).assignTo({

  getDefaultProps : function(){
    return {
      tabIndex : -1,
      ref : "cell"
    }
  },

  isSelected: function() {
    if(this.props.cellEvents){
      var selected = this.props.cellEvents.selected;
      return (
        selected
        && selected.rowIdx === this.props.rowIndex
        && selected.idx === this.props.cellIndex
      );
    }else{
      return false;
    }

  },

  onClick: function() {
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    this.props.onClick({rowIdx: rowIdx, idx: idx});
  },

  onPressArrowUp(e){
    this.moveSelectedCell(e, -1, 0);
  },

  onPressArrowDown(e){
    this.moveSelectedCell(e, 1, 0);
  },

  onPressArrowLeft(e){
    this.moveSelectedCell(e, 0, -1);
  },

  onPressArrowRight(e){
    this.moveSelectedCell(e, 0, 1);
  },

  onPressTab(e){
    this.moveSelectedCell(e, 0, 1);
  },

  moveSelectedCell(e, rowDelta, cellDelta){
    e.stopPropagation();
    e.preventDefault();
    var rowIdx = this.props.rowIndex + rowDelta;
    var idx = this.props.cellIndex + cellDelta;
    this.props.cellEvents.onSelect({idx: idx, rowIdx: rowIdx});
  },

  componentDidMount: function() {
    this.checkFocus();
  },

  componentDidUpdate: function() {
    this.checkFocus();
  },

  isCellSelectionChanging(nextProps){
    if(this.props.selected && nextProps.selected){
      return this.props.idx === nextProps.selected.idx || this.props.idx === this.props.selected.idx;
    }else{
      return true;
    }
  },

  checkFocus: function() {
    if (this.isSelected()) {
      this.getDOMNode().focus();
    }
  }
})



module.exports = SelectableMixin;
