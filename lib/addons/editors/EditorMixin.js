/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var MixinHelper             = require('../utils/MixinHelper');
var keyboardHandlerMixin    = require('../mixins/keyboardHandlerMixin');

var EditorMixin = MixinHelper.mix([keyboardHandlerMixin, {

  propTypes : {
    onCommit : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      height : 35
    }
  },

  onPressEnter(e){
    e.stopPropagation();
    e.preventDefault();
    this.checkMethodImplementedAndCall('onBeforeCommit', e);
    this.props.onCommit({value : this.getValue(), key : e.key});
  },

  onPressTab(e){
    e.stopPropagation();
    e.preventDefault();
    this.props.onCommit({value : this.getValue(), key : e.key});
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
}]);

module.exports = EditorMixin;
