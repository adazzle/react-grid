/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var MixinHelper             = require('../utils/MixinHelper');
var keyboardHandlerMixin    = require('../cells/mixins/keyboardHandlerMixin');
var EditorMixin             = require('./mixins/EditorMixin');
var cloneWithProps          = React.addons.cloneWithProps;

var DropDownEditor = React.createClass({

  mixins : [EditorMixin],

  propTypes : {
    options : React.PropTypes.array.isRequired
  },

  render(){
    return (
      <select style={this.getStyle()} defaultValue={this.props.value} onKeyUp={this.handleKeyUp} onChange={this.onChange} >
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
    this.props.onCommit({value : e.currentTarget.value});
  },

  onClick(e){
    e.stopPropagation();
    e.preventDefault();
  }

});

module.exports = DropDownEditor;
