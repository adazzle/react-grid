/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var EditorMixin = {

  getInputNode(){
    return this.getDOMNode();
  },

  propTypes : {
    onCommit : React.PropTypes.func.isRequired
  },

  getStyle(){
    return {
      height : this.props.height - 1
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
      return this.getInputNode().value;
  },

  setValue(value){
      this.getInputNode().value = value;
  },

  componentDidMount: function() {
    this.checkFocus();
  },

  checkFocus(){
    this.getInputNode().focus();
  }
};

module.exports = EditorMixin;
