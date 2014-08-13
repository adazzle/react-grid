/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var EditorMixin = require('./EditorMixin');

var SimpleTextEditor = React.createClass({

  mixins : [EditorMixin],

  getDefaultValue(){
    return this.props.initialKeyCode ? String.fromCharCode(this.props.initialKeyCode) : this.props.value;
  },

  render(){
    var style = {
      height: this.props.height
    }
    return (<input type="text" value={this.state.value}  style={style}  onChange={this.onChange} onKeyDown={this.handleKeyDown} />);
  },

  onChange(e){
    this.setState({value : e.currentTarget.value});
  },

  checkFocus(){
    this.getDOMNode().select();
  }

});

module.exports = SimpleTextEditor;
