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

var DropDownEditor = React.createClass({

  mixins : [keyboardHandlerMixin, EditorMixin],

  overrides : {
    getInputNode : function(){
      return this.refs.select.getDOMNode();
    }
  },

  propTypes : {
    options : React.PropTypes.array.isRequired
  },

  renderEditorNode(){
    return (
      <select ref="select" style={this.getStyle()} defaultValue={this.props.value} onChange={this.onChange} >
        {this.renderOptions()}
      </select>);
  },

  renderOptions(){
    var options = [];
    this.props.options.forEach(function(name){
      options.push(<option key={name} value={name}  >{name}</option>);
    }, this);
    return options;
  },


  onChange(e){
    this.commit({key : 'Enter'});
  },

  onClick(e){
    e.stopPropagation();
    e.preventDefault();
  }

});

module.exports = DropDownEditor;
