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

  getInitialState(){
    //every editor must implement getDefaultValue
    var value;
    if(typeof this.getDefaultValue === 'function'){
      value = this.getDefaultValue();
    }else{
      value = this.props.value;
    }
    return {value : value};
  },

  handleKeyDown(e){
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.stopPropagation();
      e.preventDefault();
      this.props.onCommit({value : this.state.value, key : e.key});
    }
    if(typeof this.handleCustomKeyDown === 'function'){
      this.handleCustomKeyDown(e);
    }
  },

  componentDidMount: function() {
    if(typeof this.checkFocus === 'function'){
      this.checkFocus();
    }
  }
}

module.exports = EditorMixin;
