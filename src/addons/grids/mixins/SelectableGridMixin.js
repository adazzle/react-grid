/* TODO@flow */
"use strict";
var ExcelRow = require('../../rows/ExcelRow');

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var KeyboardHandlerMixin = require('../../cells/mixins/KeyboardHandlerMixin');
var MixinHelper    = require('../../utils/MixinHelper');

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
  },

  isSelected: function() {
    return (
      this.props.selected
      && this.props.selected.rowIdx === this.props.rowIdx
      && this.props.selected.idx === this.props.idx
    );
  },

  onCellClick: function(cell) {
    this.onSelect({rowIdx: cell.rowIdx, idx: cell.idx});
  },

  onPressArrowUp(e){
    this.moveSelectedCell(e, -1, 0);
  },

  onPressArrowDown(e){
    this.moveSelectedCell(e, 1, 0);
  },

  onPressArrowLeft(e){
    this.moveSelectedCell(e, 0, -1);
  },

  onPressArrowRight(e){
    this.moveSelectedCell(e, 0, 1);
  },

  onPressTab(e){
    this.moveSelectedCell(e, 0, 1);
  },

  onPressEnter(e){
    this.setActive(e.key);
  },

  onPressDelete(e){
    this.setActive(e.key);
  },

  onPressEscape(e){
    this.setInactive(e.key);
  },

  onPressBackspace(e){
    this.setActive(e.key);
  },

  onPressChar(e){
    if(this.isKeyPrintable(e.keyCode)){
      this.setActive(e.keyCode);
    }
  },

  moveSelectedCell(e, rowDelta, cellDelta){
    e.stopPropagation();
    e.preventDefault();
    var rowIdx = this.state.selected.rowIdx + rowDelta;
    var idx = this.state.selected.idx + cellDelta;
    this.onSelect({idx: idx, rowIdx: rowIdx});
  },

  setActive(keyPressed){
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

  onCellCommit(commit){
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

  canEdit(idx){
    return (this.props.columns[idx].editor != null) || this.props.columns[idx].editable;
  },

  isActive(){
    return this.state.selected.active === true;
  }


})





module.exports = SelectableGridMixin;
