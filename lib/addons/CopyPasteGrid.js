/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = require('react');
var PropTypes           = React.PropTypes;
var BaseGrid            = require('../Grid');
var CopyableCell                = require('./cells/CopyableCell').Cell;

var CopyPasteGrid = React.createClass({

  propTypes : {
    onCellChanged : React.PropTypes.func.isRequired
  },

  render: function() {
    var cellRenderer = (
      <CopyableCell
        selected={this.state.selected}
        copied={this.state.copied}
        onSelect={this.onSelect}
        onClick={this.onSelect}
        handleCopy={this.handleCopy}
        handlePaste={this.handlePaste}
        />
    );
    return this.transferPropsTo(
      <BaseGrid cellRenderer={cellRenderer} />
    )
  },

  getInitialState: function() {
    return {selected: {idx : 0, rowIdx : 0}, copied : null};
  },

  onSelect: function(selected) {
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

  handleCopy(args){
    var textToCopy = args.value;
    var selected = this.state.selected;
    var copied = {idx : selected.idx, rowIdx : selected.rowIdx};
    this.setState({textToCopy:textToCopy, copied : copied});
  },

  handlePaste(){
    var selected = this.state.selected;
    var cellKey = this.props.columns[selected.idx].key;
    this.props.onCellChanged({cellKey: cellKey , rowIdx: selected.rowIdx, value : this.state.textToCopy});
    this.setState({copied : null});
  }
})


module.exports = CopyPasteGrid;
