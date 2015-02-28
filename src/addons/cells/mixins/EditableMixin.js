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
        onCommit : PropTypes.func.isRequired
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


});



module.exports = EditableMixin;
