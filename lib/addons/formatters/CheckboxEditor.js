/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var EditorMixin = require('./EditorMixin');

var CheckBoxEditor = React.createClass({

  mixins : [EditorMixin],

  overrides : {
    getValue : function(){
      return this.getDOMNode().checked;
    },
    setValue : function(value){
      this.getDOMNode().checked = value;
    }
  },

  PropTypes : {
    value : React.PropTypes.bool.isRequired
  },

  render(){
    return (<input type="checkbox" defaultValue={this.props.value}  onKeyDown={this.handleKeyDown}/>);
  },

  onBeforeEnter(e){
    var isChecked = JSON.parse(this.getValue());
    this.setValue(!isChecked);
  },

  checkFocus(){
    this.getDOMNode().focus();
  }

});

module.exports = CheckBoxEditor;
