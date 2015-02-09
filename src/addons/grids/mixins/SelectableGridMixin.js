/* TODO@flow */
"use strict";
var ExcelRow = require('../../rows/ExcelRow');

var ExcelColumn = require('../ExcelColumn');

type selectedType = {rowIdx: number; idx: number }
var SelectableGridMixin = {

  propTypes : {
    enableCellSelect : React.PropTypes.bool,
    columns : React.PropTypes.arrayOf(React.PropTypes.shape(ExcelColumn)).isRequired,
    rows : React.PropTypes.array.isRequired,
    onSelect : React.PropTypes.func
  },

  getDefaultProps(): {enableCellSelect: boolean} {
    return {
      enableCellSelect : false,
    };
  },

  getColumns : function(): Array<ExcelColumn> {
    return this.props.columns
  },

  getInitialState: function(): {selected: selectedType } {
    if(this.props.enableCellSelect){
      return {selected: {rowIdx: 0, idx: 0}};
    }else{
      return {selected: {rowIdx: -1, idx: -1}};
    }
  },

  onSelect: function(selected: selectedType) {
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
