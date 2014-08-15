/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = require('react');
var PropTypes           = React.PropTypes;
var BaseGrid            = require('../Grid');
var CopyableCell                = require('./cells/CopyableCell');

var GridWithKeyboardNav = React.createClass({

  render: function() {
    var cellRenderer = (
      <CopyableCell
        selected={this.state.selected}
        copied={this.state.copied}
        onSelect={this.onSelect}
        onClick={this.onSelect}
        onCopy={this.onCopy}
        onPaste={this.onPaste}
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

  onCopy(e){
    var textToCopy = e.currentTarget.innerText;
    var selected = this.state.selected;
    var copied = {idx : selected.idx, rowIdx : selected.rowIdx};
    this.setState({textToCopy:textToCopy, copied : copied});
  },

  onPaste(e){
    this.setState({copied : null});
  }
})


module.exports = GridWithKeyboardNav;
