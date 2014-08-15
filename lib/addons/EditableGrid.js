/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = require('react');
var PropTypes           = React.PropTypes;
var BaseGrid            = require('../Grid');
var EditableCell        = require('./cells/EditableCell').Cell;
var merge               = require('../merge');

var EditableGrid = React.createClass({

  propTypes : {
    onCellChanged : React.PropTypes.func.isRequired
  },

  render: function() {
    var cellRenderer = (
      <EditableCell
        selected={this.state.selected}
        onSelect={this.onSelect}
        onClick={this.onSelect}
        onSetActive={this.onSetActive}
        onCommit={this.onCellChanged}
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
  }

})


module.exports = EditableGrid;
