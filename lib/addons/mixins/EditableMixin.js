/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var SimpleTextEditor = require('../editors/SimpleTextEditor');
var PropTypes      = React.PropTypes;

var EditableMixin = {

  propTypes : {
      onCommit : PropTypes.func.isRequired
  },

  canEdit(){
    return (this.props.column.editor != null) || this.props.column.editable;
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

  onCommit(commit){
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    this.props.onCommit({cellKey: this.props.column.key, rowIdx: rowIdx, value : commit.value, keyCode : commit.key});
  },

  checkFocus: function() {
    if (this.isSelected() && !this.isActive()) {
      this.getDOMNode().focus();
    }

  }
};



module.exports = EditableMixin;
