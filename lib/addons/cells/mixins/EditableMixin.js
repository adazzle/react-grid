/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var SimpleTextEditor = require('../../editors/SimpleTextEditor');
var PropTypes      = React.PropTypes;

var EditableMixin = {

  getCellClass : function(){
      return cx({
      'editing' : this.isActive(),
      'selected' : this.isSelected() && !this.isActive()
      });
  },

  propTypes : {
      onCommit : PropTypes.func.isRequired
  },

  canEdit(){
    return (this.props.column.editor != null) || this.props.column.editable;
  },

  getEditor(){
    var editorProps = {height : this.props.height, onCommit : this.onCommit, initialKeyCode : this.props.selected.initialKeyCode};
    var customEditor = this.props.column.editor;
    if(customEditor && React.isValidComponent(customEditor)){
      //return custom column editor or SimpleEditor if none specified
      return cloneWithProps(customEditor, editorProps);
    }else{
      return cloneWithProps(SimpleTextEditor(), editorProps);
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
    this.props.onCommit({cellKey: this.props.column.key, rowIdx: rowIdx, value : commit.value, keyCode : commit.key});
  },

  checkFocus: function() {
    if (this.isSelected() && !this.isActive()) {
      this.getDOMNode().focus();
    }
  },

  onClick() {
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    this.props.onClick({rowIdx: rowIdx, idx: idx, active : this.canEdit()});
  },

  setActive(keyPressed){
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    if(this.canEdit() && !this.isActive()){
      this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : true, initialKeyCode : keyPressed});
    }
  },

  isActive(){
    return this.isSelected() && this.props.selected.active === true;
  },

  isSelected: function() {
    return (
      this.props.selected
      && this.props.selected.rowIdx === this.props.rowIdx
      && this.props.selected.idx === this.props.idx
    );
  },

  onPressEnter(e){
    this.setActive(e.key);
  },

  onPressDelete(e){
    this.setActive(e.key);
  },

  onPressBackspace(e){
    this.setActive(e.key);
  },

  onPressChar(e){
    if(this.isKeyPrintable(e.keyCode)){
      this.setActive(e.keyCode);
    }
  }
};



module.exports = EditableMixin;
