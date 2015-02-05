/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';
var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var isFunction = require('../../utils/isFunction');

var EditorMixin = {

  propTypes : {
    onCommit : React.PropTypes.func.isRequired
  },

  getStyle:function(){
    return {
      height : this.props.height - 1
    }
  },

  getInitialState:function(){
    return {isInvalid : false}
  },

  onPressEnter:function(e){
    e.stopPropagation();
    e.preventDefault();
    this.commit({key : 'Enter'});
  },

  onPressTab:function(e){
    e.stopPropagation();
    e.preventDefault();
    this.commit({key : 'Tab'});
  },

  commit:function(args){
    var value = this.getValue();
    var rowDataChanged = {};
    rowDataChanged[this.props.column.key] = value;
    if(this.isNewValueValid(value)){
      this.props.onCommit({value : value, key : args.key, rowDataChanged : rowDataChanged});
    }
  },

  isNewValueValid:function(value){
    if(isFunction(this.validate)){
      var isValid = this.validate(value);
      this.setState({isInvalid : !isValid});
      return isValid;
    }else{
      return true;
    }
  },

  getValue:function(){
      return this.getInputNode().value;
  },

  setValue:function(value){
      this.getInputNode().value = value;
  },

  componentDidMount: function() {
    if(this.getInputNode() !== undefined){
      this.checkFocus();
      this.getInputNode().className += ' editor-main';
    }
  },

  checkFocus:function(){
    this.getInputNode().focus();
  },

  getInputNode:function(){
    return this.getDOMNode().getElementsByTagName("input")[0];
  },

  getContainerClass:function(){
    return cx({
      'has-error' : this.state.isInvalid === true
    })
  },

  renderStatusIcon:function(){
    if(this.state.isInvalid === true){
      return React.createElement("span", {className: "glyphicon glyphicon-remove form-control-feedback"})
    }
  },

  render:function(){
    if(!isFunction(this.renderEditorNode)){
        throw "Editor Mixin Error : " + this.displayName + " component must implement method renderEditorNode";
    }
    var editorNode = this.renderEditorNode();
    return (
      React.createElement("div", {className: this.getContainerClass()}, 
        editorNode, 
        this.renderStatusIcon()
      )
    )
  }
};

module.exports = EditorMixin;
