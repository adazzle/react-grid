/* TODO@flow mixins */
"use strict";
var ExcelRow = require('../../rows/ExcelRow');
var ExcelColumn = require('../ExcelColumn');

type SelectedType = {
  rowIdx: number;
  idx: number;
};

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
      tabIndex : -1,
      ref : "cell"
    };
  },

  getColumns : function(): Array<ExcelColumn> {
    return this.props.columns
  },

  getInitialState: function(): {selected: SelectedType } {
    if(this.props.enableCellSelect){
      return {selected: {rowIdx: 0, idx: 0}};
    }else{
      return {selected: {rowIdx: -1, idx: -1}};
    }
  },

  onSelect: function(selected: SelectedType) {
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
  },

  isSelected: function(): boolean {
    return (
      this.props.selected
      && this.props.selected.rowIdx === this.props.rowIdx
      && this.props.selected.idx === this.props.idx
    );
  },

  onCellClick: function(cell: SelectedType) {
    this.onSelect({rowIdx: cell.rowIdx, idx: cell.idx});
  },

  onPressArrowUp(e: SyntheticEvent){
    this.moveSelectedCell(e, -1, 0);
  },

  onPressArrowDown(e: SyntheticEvent){
    this.moveSelectedCell(e, 1, 0);
  },

  onPressArrowLeft(e: SyntheticEvent){
    this.moveSelectedCell(e, 0, -1);
  },

  onPressArrowRight(e: SyntheticEvent){
    this.moveSelectedCell(e, 0, 1);
  },

  onPressTab(e: SyntheticEvent){
    this.moveSelectedCell(e, 0, 1);
  },

  onPressEnter(e: SyntheticKeyboardEvent){
    this.setActive(e.key);
  },

  onPressDelete(e: SyntheticKeyboardEvent){
    this.setActive(e.key);
  },

  onPressEscape(e: SyntheticKeyboardEvent){
    this.setInactive(e.key);
  },

  onPressBackspace(e: SyntheticKeyboardEvent){
    this.setActive(e.key);
  },

  onPressChar(e: SyntheticKeyboardEvent){
    if(this.isKeyPrintable(e.keyCode)){
      this.setActive(e.keyCode);
    }
  },

  moveSelectedCell(e: SyntheticEvent, rowDelta: number, cellDelta: number){
    e.stopPropagation();
    e.preventDefault();
    var rowIdx = this.state.selected.rowIdx + rowDelta;
    var idx = this.state.selected.idx + cellDelta;
    this.onSelect({idx: idx, rowIdx: rowIdx});
  },

  setActive(keyPressed: string){
    var rowIdx = this.state.selected.rowIdx;
    var idx = this.state.selected.idx;
    if(this.props.columns[idx].key === 'select-row' && this.props.columns[idx].onRowSelect){
      this.props.column.onRowSelect(rowIdx);
    }
    else if(this.canEdit(idx) && !this.isActive()){
      var selected = Object.assign(this.state.selected, {idx: idx, rowIdx: rowIdx, active : true, initialKeyCode : keyPressed});
      this.setState({selected: selected});
    }
  },

  onCellCommit(commit: {keyCode: string}){
    var selected = this.state.selected;
    selected.active = false;
    if(commit.keyCode === 'Tab'){
      selected.idx += 1;
    }
    this.setState({selected : selected});
    this.props.onRowUpdate(commit);
  },

  setInactive(){
    var rowIdx = this.state.selected.rowIdx;
    var idx =this.state.selected.idx;
    if(this.canEdit(idx) && this.isActive()){
      var selected = Object.assign(this.state.selected, {idx: idx, rowIdx: rowIdx, active : false});
      this.setState({selected: selected});
    }
  },

  canEdit(idx: number): boolean{
    return (this.props.columns[idx].editor != null) || this.props.columns[idx].editable;
  },

  isActive(): boolean{
    return this.state.selected.active === true;
  }


};

module.exports = SelectableGridMixin;
