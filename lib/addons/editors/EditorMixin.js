/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;

var EditorMixin = {

  checkMethodExtendedAndCall(methodName, args){
    if(this.extended && (typeof this.extended[methodName] === 'function')){
      return this.extended[methodName].call(this, args);
    }
  },

  checkMethodImplementedAndCall(methodName, args){
    if(this.implemented && (typeof this.implemented[methodName] === 'function')){
      return this.implemented[methodName].call(this, args);
    }
  },

  isMethodOverridden(methodName){
    return this.overrides && (typeof this.overrides[methodName] === 'function');
  },

  callOverriddenMethod(methodName, args){
    return this.overrides[methodName].call(this, args);
  },

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
      this.checkMethodImplementedAndCall('onBeforeEnter', e);
      this.props.onCommit({value : this.getValue(), key : e.key});
    }else if(e.key === 'Tab'){
      e.stopPropagation();
      e.preventDefault();
      this.props.onCommit({value : this.getValue(), key : e.key});
    }
    this.checkMethodExtendedAndCall('handleKeyDown', e);
  },

  getValue(){
    if(this.isMethodOverridden('getValue')){
      return this.callOverriddenMethod('getValue');
    }else{
      return this.getDOMNode().value;
    }
  },

  setValue(value){
    if(this.isMethodOverridden('setValue')){
      this.callOverriddenMethod('setValue', value);
    }else{
      this.getDOMNode().value = value;
    }
  },

  componentDidMount: function() {
    this.checkFocus();
  },


  checkFocus(){
    if(this.isMethodOverridden('checkFocus')){
      this.callOverriddenMethod('checkFocus');
    }else{
      this.getDOMNode().focus();
    }
    this.checkMethodImplementedAndCall('onFocus');
  }
}

module.exports = EditorMixin;
