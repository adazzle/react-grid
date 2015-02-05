/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 * @flow
 */
"use strict";

var SelectableGridMixin = {

  getDefaultProps() {
    return {
      enableCellSelect : false,
    };
  },

  getColumns : function(){
    return this.props.columns
  },

  getInitialState: function() {
    if(this.props.enableCellSelect){
      return {selected: {rowIdx: 0, idx: 0}};
    }else{
      return {selected: {rowIdx: -1, idx: -1}};
    }
  },

  onSelect: function(selected) {
    if(this.props.enableCellSelect){
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
}

module.exports = SelectableGridMixin;
