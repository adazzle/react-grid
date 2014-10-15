/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var SelectableGridMixin = {

  getColumns : function(){
    return this.props.columns
  },

  getInitialState: function() {
    return {selected: {rowIdx: 0, idx: 0}};
  },

  onSelect: function(selected) {
    var idx = selected.idx;
    var rowIdx = selected.rowIdx;
    if (
      idx >= 0
      && rowIdx >= 0
      && idx < this.getColumns().length
      && rowIdx < this.props.length
    ) {
      this.setState({selected: selected});
    }
  }
}

module.exports = SelectableGridMixin;
