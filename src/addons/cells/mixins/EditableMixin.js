/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React            = require('react/addons');
var cx               = React.addons.classSet;
var cloneWithProps   = React.addons.cloneWithProps;
var SimpleTextEditor = require('../../editors/SimpleTextEditor');
var PropTypes        = React.PropTypes;
var MixinHelper      = require('../../utils/MixinHelper');
var SelectableMixin  = require('./SelectableMixin');
var KeyboardHandlerMixin = require('./KeyboardHandlerMixin');
var ExcelColumn = require('../../grids/ExcelColumn');
var ExcelRow = require('../../rows/ExcelRow');

var EditableMixin = MixinHelper.createDependency({

  KeyboardHandlerMixin : KeyboardHandlerMixin,

  SelectableMixin : SelectableMixin

  }).assignTo({

    propTypes : {
        onCommit : PropTypes.func.isRequired,
        column : PropTypes.shape(ExcelColumn).isRequired,
        height : PropTypes.number.isRequired,
        selected : PropTypes.shape({
          initialKeyCode: PropTypes.string,
          active: PropTypes.bool,
        }),
        //TODO this mixin is used on a Cell. means that now all cells MUST have access to the row??
        //see Row.js line 52
        rowData : PropTypes.object.isRequired,
        rowIdx : PropTypes.number.isRequired,
        idx : PropTypes.number.isRequired,
        filterRowIdx : PropTypes.number,
        onClick : PropTypes.func.isRequired,
        onSetActive : PropTypes.func.isRequired

    },
    getDefaultProps: function() {
      return {
        selected: {
          initialKeyCode: '',
          active: false
        }
      }
    },

    canEdit(){
      return (this.props.column.editor != null) || this.props.column.editable;
    },


    getEditor(){

      var editorProps = {height : this.props.height, onPressEscape : this.onPressEscape,  onCommit : this.onCommit, initialKeyCode : this.props.selected.initialKeyCode, editorRowMetaData : this.getEditorRowMetaData()};
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
      this.props.onCommit({cellKey: cellKey, rowIdx: this.props.filterRowIdx || rowIdx, updated : commit.updated, keyCode : commit.key});
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
    },

    setActive(keyPressed){
      var rowIdx = this.props.rowIdx;
      var idx = this.props.idx;
      if(this.props.column.key === 'select-row' && this.props.column.onRowSelect){
        this.props.column.onRowSelect(rowIdx);
      }
      else if(this.canEdit() && !this.isActive()){
        this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : true, initialKeyCode : keyPressed});
      }
    },

    setInactive(){
      if(this.canEdit() && this.isActive()){
        var rowIdx = this.props.rowIdx;
        var idx = this.props.idx;
        this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : false});
      }
    },

    isActive(){
      return this.isSelected() && this.props.selected.active === true;
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
    }
});



module.exports = EditableMixin;
