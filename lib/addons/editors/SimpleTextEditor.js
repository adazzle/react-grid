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
    var keyCode = this.props.initialKeyCode;
    if(keyCode === 'Delete' || keyCode === 'Backspace'){
      return '';
    }else if(keyCode === 'Enter'){
      return this.props.value;
    }else{
      return keyCode ? String.fromCharCode(keyCode) : this.props.value;
    }
  },

  render(){
    var style = {
      height: this.props.height
    }
    return (<input type="text" defaultValue={this.getDefaultValue()}  style={style} onKeyDown={this.handleKeyDown} />);
  },

  checkFocus(){
    this.getDOMNode().select();
  }

});

module.exports = SimpleTextEditor;
