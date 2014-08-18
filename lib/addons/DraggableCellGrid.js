/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = require('react');
var PropTypes           = React.PropTypes;
var BaseGrid            = require('../Grid');
var DraggableCell                = require('./cells/DraggableCell');

var CopyPasteGrid = React.createClass({

  propTypes : {
    onCellChanged : React.PropTypes.func.isRequired
  },

  render: function() {
    var cellRenderer = (
      <DraggableCell
        selected={this.state.selected}
        copied={this.state.copied}
        onSelect={this.onSelect}
        onClick={this.onSelect}
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
  }
})


module.exports = CopyPasteGrid;
