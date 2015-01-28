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
      && rowIdx < this.props.rows.length
    ) {
      if(this.props.onSelect){
        this.props.onSelect({selected: selected});
      }
      this.setState({selected: selected});

    }
  }
}

module.exports = SelectableGridMixin;
