/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var MixinHelper             = require('../utils/MixinHelper');
var keyboardHandlerMixin    = require('../cells/mixins/KeyboardHandlerMixin');
var EditorMixin             = require('./mixins/EditorMixin');
var cloneWithProps          = React.addons.cloneWithProps;

var DropDownEditor = React.createClass({displayName: "DropDownEditor",

  mixins : [keyboardHandlerMixin, EditorMixin],

  overrides : {
    getInputNode : function(){
      return this.refs.select.getDOMNode();
    }
  },

  propTypes : {
    options : React.PropTypes.array.isRequired
  },

  renderEditorNode:function(){
    return (
      React.createElement("select", {ref: "select", style: this.getStyle(), defaultValue: this.props.value, onChange: this.onChange}, 
        this.renderOptions()
      ));
  },

  renderOptions:function(){
    var options = [];
    this.props.options.forEach(function(name){
      options.push(React.createElement("option", {key: name, value: name}, name));
    }, this);
    return options;
  },


  onChange:function(e){
    this.props.onCommit({value : e.currentTarget.value});
  },

  onClick:function(e){
    e.stopPropagation();
    e.preventDefault();
  }

});

module.exports = DropDownEditor;
