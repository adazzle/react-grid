/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = require('react');
var PropTypes           = React.PropTypes;
var BaseGrid            = require('../Grid');
var ExcelCell        = require('./cells/ExcelCell');
var merge               = require('../merge');

var ExcelGrid = React.createClass({

  propTypes : {
    onCellChanged : React.PropTypes.func.isRequired
  },

  render: function() {
    var cellRenderer = (
      <ExcelCell
        selected={this.state.selected}
        copied={this.state.copied}
        onSelect={this.onSelect}
        onClick={this.onSelect}
        onSetActive={this.onSetActive}
        onCommit={this.onCellChanged}
        handleCopy={this.handleCopy}
        handlePaste={this.handlePaste}
        handleDragStart={this.handleDragStart}
        handleDragEnter={this.handleDragEnter}
        handleDragEnd={this.handleDragEnd}
        />
    );
    return this.transferPropsTo(
      <BaseGrid cellRenderer={cellRenderer} />
    )
  },

  getInitialState() {
    return {selected: {rowIdx: 0, idx: 0}};
  },

  onCellChanged(commit){
    var selected = this.state.selected;
    selected.active = false;
    if(commit.keyCode === 'Tab'){
      selected.idx += 1;
    }
    this.setState({selected : selected});
    this.props.onCellChanged(commit);
  },

  onSelect(selected) {
    var idx = selected.idx;
    var rowIdx = selected.rowIdx;
    if (
      idx >= 0
      && rowIdx >= 0
      && idx < this.props.columns.length
      && rowIdx < this.props.length
    ) {
      this.setState({selected: selected});
    }
  },

  onSetActive(activeCell) {
    var selected = merge(this.state.selected, activeCell);
    this.setState({selected: selected});
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
    if(row > selected.rowIdx){
      dragged.overRowIdx = row;
      this.setState({dragged : dragged});
    }
  },

  handleDragEnd(){
    var selected = this.state.selected;
    var dragged = this.state.dragged;
    var cellKey = this.props.columns[this.state.selected.idx].key;
    this.props.onCellsDragged({cellKey: cellKey , initialRowIdx: selected.rowIdx, lastRowIdx : dragged.overRowIdx, value : dragged.copiedText});
    this.setState({dragged : null});
  }

})


module.exports = ExcelGrid;
