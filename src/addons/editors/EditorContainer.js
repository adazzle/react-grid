/* @flow */
/**
* @jsx React.DOM


*/
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var keyboardHandlerMixin    = require('../../KeyboardHandlerMixin');
var SimpleTextEditor        = require('./SimpleTextEditor');
var isFunction              = require('../utils/isFunction');

var EditorContainer = React.createClass({

  mixins : [keyboardHandlerMixin],

  propTypes : {
    cellMetaData : React.PropTypes.func.isRequired,
    column : React.PropTypes.object.isRequired
  },

  getStyle(){
    return {
      height : this.props.height - 1
    }
  },

  getInitialState(){
    return {isInvalid : false}
  },

  getEditor(){
    var editorProps = {onKeyDown : this.onKeyDown, value : this.getDefaultValue(), onCommit : this.commit, editorRowMetaData : this.getEditorRowMetaData(), height : this.props.height};
    var customEditor = this.props.column.editor;
    if(customEditor && React.isValidElement(customEditor)){
      //return custom column editor or SimpleEditor if none specified
      return cloneWithProps(customEditor, editorProps);
    }else{
      return <SimpleTextEditor {...editorProps} />;
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

  onPressEnter(e){
    e.stopPropagation();
    e.preventDefault();
    this.commit({key : 'Enter'});
  },

  onPressTab(e){
    e.stopPropagation();
    e.preventDefault();
    this.commit({key : 'Tab'});
  },

  commit(args){
    var value = this.getValue();
    var rowDataChanged = {};
    rowDataChanged[this.props.column.key] = value;
    if(this.isNewValueValid(value)){
      this.props.cellMetaData.onCommit({updated : rowDataChanged, key : args.key});
    }
  },

  isNewValueValid(value){
    if(isFunction(this.validate)){
      var isValid = this.validate(value);
      this.setState({isInvalid : !isValid});
      return isValid;
    }else{
      return true;
    }
  },

  getValue(){
    return this.getInputNode().value;
  },

  setValue(value){
    this.getInputNode().value = value;
  },

  componentDidMount: function() {
    if(this.getInputNode() !== undefined){
      this.setTextInputFocus();
      this.getInputNode().className += ' editor-main';
    }
  },

  getInputNode(){
    return this.getDOMNode().getElementsByTagName("input")[0];
  },

  getDefaultValue(){
    var selected = this.props.cellMetaData.selected;
    var keyCode = selected.initialKeyCode;
    if(keyCode === 'Delete' || keyCode === 'Backspace'){
      return '';
    }else if(keyCode === 'Enter'){
      return this.props.value;
    }else{
      var text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
      return text;
    }

  },

  getContainerClass(){
    return cx({
      'has-error' : this.state.isInvalid === true
    })
  },

  renderStatusIcon(){
    if(this.state.isInvalid === true){
      return <span className="glyphicon glyphicon-remove form-control-feedback"></span>
    }
  },

  render(){
    var Editor = this.getEditor();
    return (
      <div style={this.getStyle()} className={this.getContainerClass()}>
      {Editor}
      {this.renderStatusIcon()}
      </div>
    )
  },

  setCaretAtEndOfInput(){
    var input = this.getInputNode();
    //taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
    var txtLength = input.value.length;
    if(input.setSelectionRange){
      input.setSelectionRange(txtLength, txtLength);
    }else if(input.createTextRange){
      var fieldRange = input.createTextRange();
      fieldRange.moveStart('character', txt.value.length);
      fieldRange.collapse();
      fieldRange.select();
    }
  },

  setTextInputFocus(){
    var selected = this.props.cellMetaData.selected;
    var keyCode = selected.initialKeyCode;
    if(!this.isKeyPrintable(keyCode)){
      this.getInputNode().focus();
      this.setCaretAtEndOfInput();
    }else{
      this.getInputNode().select();
    }
  }

});

module.exports = EditorContainer;
