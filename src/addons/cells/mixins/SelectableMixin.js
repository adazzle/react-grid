/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var SimpleTextEditor = require('../../editors/SimpleTextEditor');

var SelectableMixin = {

  getDefaultProps : function(){
    return {
      tabIndex : -1,
      ref : "cell"
    }
  },

  isSelected: function() {
    var selected = this.props.cellMetaData.selected;
    return (
      selected
      && selected.rowIdx === this.props.rowIdx
      && selected.idx === this.props.idx
    );
  },

  isActive(){
    var selected = this.props.cellMetaData.selected;
    return this.isSelected() && selected.active === true;
  },

  componentDidMount: function() {
    this.checkFocus();
  },

  componentDidUpdate: function() {
    this.checkFocus();
  },

  isCellSelectionChanging(nextProps){
    var selected     = this.props.cellMetaData.selected;
    var nextSelected = nextProps.cellMetaData.selected;
    if(selected && nextSelected){
      return this.props.idx === nextSelected.idx || this.props.idx === selected.idx;
    }else{
      return true;
    }
  },

  getEditor(){
    var selected     = this.props.cellMetaData.selected;
    var editorProps = {height : this.props.height, onPressEscape : this.onPressEscape,  onCommit : this.onCommit, initialKeyCode : selected.initialKeyCode, editorRowMetaData : this.getEditorRowMetaData()};
    var customEditor = this.props.column.editor;
    if(customEditor && React.isValidElement(customEditor)){
      //return custom column editor or SimpleEditor if none specified
      return cloneWithProps(customEditor, editorProps);
    }else{
      return cloneWithProps(SimpleTextEditor(), editorProps);
    }
  },

  getEditorRowMetaData(){
    //clone row data so editor cannot actually change this
    var columnName = this.props.column.ItemId;
    //convention based method to get corresponding Id or Name of any Name or Id property
    if(typeof this.props.column.getEditorRowMetaData === 'function'){
      return this.props.column.getEditorRowMetaData(this.props.rowData);
    }
  },

  getFormatter(){
    var col = this.props.column;
    if(this.isActive()){
      return this.getEditor();
    }else{
      return this.props.column.formatter;
    }
  },


  onCommit(commit){
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    var cellKey = this.props.column.key;
    this.props.cellMetaData.onCommit({cellKey: cellKey, rowIdx: this.props.filterRowIdx || rowIdx, updated : commit.updated, keyCode : commit.key});
  },

  checkFocus: function() {
    if (this.isSelected() && !this.isActive()) {
      this.getDOMNode().focus();
    }
  },

  onClick() {
    if(!this.isActive()){
      var rowIdx = this.props.rowIdx;
      var idx = this.props.idx;
      this.props.onClick({rowIdx: rowIdx, idx: idx});
    }

  },

  onDoubleClick() {
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    this.props.onClick({rowIdx: rowIdx, idx: idx, active : this.canEdit()});
  }
}



module.exports = SelectableMixin;
