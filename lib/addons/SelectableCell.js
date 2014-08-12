/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var BaseCell       = require('../Cell');

var SelectableCell = React.createClass({

  render: function() {
    var selected = this.isSelected();
    return this.transferPropsTo(
      <BaseCell
        tabIndex={-1}
        ref="cell"
        className={selected ? 'selected' : null}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        />
    )
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

  onKeyDown: function(e) {
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    if (e.key === 'ArrowUp') {
      e.stopPropagation();
      e.preventDefault();
      this.props.onSelect({idx: idx, rowIdx: rowIdx - 1});
    } else if (e.key === 'ArrowDown') {
      e.stopPropagation();
      e.preventDefault();
      this.props.onSelect({idx: idx, rowIdx: rowIdx + 1});
    } else if (e.key === 'ArrowLeft') {
      e.stopPropagation();
      e.preventDefault();
      this.props.onSelect({idx: idx - 1, rowIdx: rowIdx});
    } else if (e.key === 'ArrowRight') {
      e.stopPropagation();
      e.preventDefault();
      this.props.onSelect({idx: idx + 1, rowIdx: rowIdx});
    }
  },

  setScrollLeft: function(scrollLeft) {
    this.refs.row.setScrollLeft(scrollLeft)
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
})

module.exports = SelectableCell;
