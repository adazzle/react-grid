/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var SelectableCellMixin = require('./SelectableCellMixin');
var MixinHelper = require('../utils/MixinHelper')
var SimpleTextEditor = require('../editors/SimpleTextEditor');

var EditableCellMixin = MixinHelper.mix(SelectableCellMixin,{

  canEdit(){
    return (this.props.column.editor != null) || this.props.column.editable;
  },

  isActive(){
    return this.isSelected() && this.props.selected.active === true;
  },

  getEditor(){
    var editorProps = {height : this.props.height, onCommit : this.onCommit, initialKeyCode : this.props.selected.initialKeyCode};
    var customEditor = this.props.column.editor;
    if(customEditor && React.isValidComponent(customEditor())){
      //return custom column editor or SimpleEditor if none specified
      return cloneWithProps(customEditor(), editorProps);
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

  onClick() {
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    console.log(document.activeElement);
    this.props.onClick({rowIdx: rowIdx, idx: idx, active : this.canEdit()});
console.log(document.activeElement);
  },

  onKeyDown: function(e) {

  },

  onCommit(commit){
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    this.props.onCommit({cellKey: this.props.column.key, rowIdx: rowIdx, value : commit.value, keyCode : commit.key});
  },

  isPrintable(keycode){
    var valid =
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)

    return valid;
  },

  checkFocus: function() {
    if (this.isSelected() && !this.isActive()) {
      this.getDOMNode().focus();
      console.log(document.activeElement);
    }

  }
}, ['onKeyDown']);



module.exports = EditableCellMixin;
