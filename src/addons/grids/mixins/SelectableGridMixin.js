/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var KeyboardHandlerMixin = require('../../cells/mixins/KeyboardHandlerMixin');
var MixinHelper    = require('../../utils/MixinHelper');

var SelectableGridMixin = MixinHelper.createDependency({KeyboardHandlerMixin : KeyboardHandlerMixin}).assignTo({

  getDefaultProps() {
    return {
      enableCellSelect : false,
      tabIndex : -1,
      ref : "cell"
    };
  },

  getColumns : function(){
    return this.props.columns
  },

  getInitialState: function() {
    if(this.props.enableCellSelect){
      return {selected: {rowIdx: 0, idx: 0}};
    }else{
      return {selected: {rowIdx: -1, idx: -1}};
    }
  },

  onSelect: function(selected) {
    if(this.props.enableCellSelect){
      var idx = selected.idx;
      var rowIdx = selected.rowIdx;
      if (
        idx >= 0
        && rowIdx >= 0
        && idx < this.getColumns().length
        && rowIdx < this.props.rows.length
      ) {
        if(this.props.onSelect){
          this.props.onSelect({selected: selected});
        }
        this.setState({selected: selected});
      }
    }
  },

  isSelected: function() {
    return (
      this.props.selected
      && this.props.selected.rowIdx === this.props.rowIdx
      && this.props.selected.idx === this.props.idx
    );
  },

  onCellClick: function(cell) {
    this.onSelect({rowIdx: cell.rowIdx, idx: cell.idx});
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
    var rowIdx = this.state.selected.rowIdx + rowDelta;
    var idx = this.state.selected.idx + cellDelta;
    this.onSelect({idx: idx, rowIdx: rowIdx});
  }
})





module.exports = SelectableGridMixin;
