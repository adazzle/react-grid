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

  mixins : MixinHelper.mix([keyboardHandlerMixin, EditorMixin]),

  render(){
    var style = {
      height: this.props.height
    }

    return (
      <select style={style} defaultValue={this.props.value} onClick={this.onClick} onChange={this.onChange}>
        {this.props.children}
      </select>);
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
