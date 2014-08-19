/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var MixinHelper             = require('../utils/MixinHelper');
var keyboardHandlerMixin    = require('../cells/mixins/keyboardHandlerMixin');

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
    this.props.onCommit({value : this.getValue(), key : e.key});
  },

  onPressTab(e){
    e.stopPropagation();
    e.preventDefault();
    this.props.onCommit({value : this.getValue(), key : e.key});
  },

  getValue(){
      return this.getDOMNode().value;
  },

  setValue(value){
      this.getDOMNode().value = value;
  },

  componentDidMount: function() {
    this.checkFocus();
  },

  checkFocus(){
    this.getDOMNode().focus();
  }
}]);

module.exports = EditorMixin;
