/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var BaseCell       = require('../../Cell');
var SelectableCellMixin = require('./SelectableCell').Mixin;


var DraggableCell = React.createClass({

  propTypes : {
    handleDragEnter : React.PropTypes.func.isRequired,
    handleDragStart : React.PropTypes.func.isRequired
  },

  mixins : [SelectableCellMixin],

  isDraggedOver(){
      return (
        this.props.dragged &&
        this.props.dragged.overRowIdx === this.props.rowIdx
        && this.props.dragged.idx === this.props.idx
      )
  },

  wasDraggedOver(){
    return (
      !this.isSelected()
      && this.props.dragged
      && this.props.dragged.overRowIdx > this.props.rowIdx
      && this.props.dragged.idx === this.props.idx
    );
  },

  handleDragStart(e){
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    this.props.handleDragStart({rowIdx : rowIdx, idx : idx, copiedText : this.props.value});
  },

  handleDragEnter(){
    console.log(this.props.rowIdx);
    this.props.handleDragEnter(this.props.rowIdx);
  },

  getCellClass(){
    return cx({
      'selected-draggable' : this.isSelected(),
      'active-drag-cell' : this.isSelected() || this.isDraggedOver(),
      'is-dragged-over' : this.isDraggedOver(),
      'was-dragged-over' : this.wasDraggedOver()
    });
  },

  render: function() {

    return this.transferPropsTo(
      <BaseCell
        tabIndex={-1}
        ref="cell"
        className={this.getCellClass()}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        handleDragStart={this.handleDragStart}
        onDragEnter={this.handleDragEnter}
        formatter={this.getFormatter}
        />
    )
  }

})

module.exports = DraggableCell;
