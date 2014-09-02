/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;

var SelectableMixin = {

  getDefaultProps : function(){
    return {
      tabIndex : -1,
      ref : "cell"
    }
  },

  getCellClass : function(){
    return this.isSelected() ? 'selected' : null;
  },

  isSelected: function() {
    return (
      this.props.selected
      && this.props.selected.rowIdx === this.props.rowIdx
      && this.props.selected.idx === this.props.idx
    );
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
    var rowIdx = this.props.rowIdx + rowDelta;
    var idx = this.props.idx + cellDelta;
    this.props.onSelect({idx: idx, rowIdx: rowIdx});
  },

  setScrollLeft: function(scrollLeft) {
    this.refs.row.setScrollLeft(scrollLeft);
  },

  componentDidMount: function() {
    this.checkFocus();
  },

  componentDidUpdate: function() {
    this.checkFocus();
  },

  checkFocus: function() {
    if (this.isSelected()) {
      this.getDOMNode().focus();
    }
  }
};

module.exports = SelectableMixin;
