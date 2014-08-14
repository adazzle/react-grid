/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;

var EditorMixin = {

  propTypes : {
    onCommit : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      height : 35
    }
  },

  handleKeyDown(e){
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      this.callImplementedMethod(this.onBeforeEnter);
      this.props.onCommit({value : this.getValue(), key : e.key});
    }else if(e.key === 'Tab'){
      e.stopPropagation();
      e.preventDefault();
      this.props.onCommit({value : this.getValue(), key : e.key});
    }
    this.callImplementedMethod(this.handleCustomKeyDown, e);
  },

  getValue(){
    if(this.isOverridden('getValue')){
      return this.callOverriddenMethod('getValue');
    }else{
      return this.getDOMNode().value;
    }
  },

  setValue(value){
    if(this.isOverridden('setValue')){
      this.callOverriddenMethod('setValue', value);
    }else{
      this.getDOMNode().value = value;
    }
  },

  isOverridden(methodName){
    return this.overrides && (typeof this.overrides[methodName] === 'function');
  },

  callOverriddenMethod(methodName, args){
    return this.overrides[methodName].call(this, args);
  },

  //checks if method has been implemented in component that uses this mixin
  callImplementedMethod(method, args){
    if(typeof method === 'function'){
      method(args);
    }
  },

  componentDidMount: function() {
    if(typeof this.checkFocus === 'function'){
      this.checkFocus();
    }
  }
}

module.exports = EditorMixin;
