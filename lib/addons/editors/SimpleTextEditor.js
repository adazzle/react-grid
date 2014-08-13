/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;

var SimpleTextEditor = React.createClass({

  getDefaultProps() {
    return {
      height : 35
    }
  },

  render(){
    var style = {
      height: this.props.height
    }
    return (<input defaultValue={this.props.value} style={style} onKeyDown={this.onKeyDown}/>);
  },

  onKeyDown(e){
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      this.props.onCommit(this.getValue());
    }
  },

  getValue(){
    return this.getDOMNode().value;
  },

  componentDidMount: function() {
    this.checkFocus();
  },

  componentDidUpdate: function() {
    this.checkFocus();
  },

  checkFocus: function() {
      this.getDOMNode().select();
  }

});

module.exports = SimpleTextEditor;
