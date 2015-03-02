/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var MixinHelper             = require('../utils/MixinHelper');
var keyboardHandlerMixin    = require('../../KeyboardHandlerMixin');
var EditorMixin             = require('./mixins/EditorMixin');
var cloneWithProps          = React.addons.cloneWithProps;

var DropDownEditor = React.createClass({

  mixins : [keyboardHandlerMixin, EditorMixin],

  overrides : {
    getInputNode : function(): HTMLElement {
      return this.refs.select.getDOMNode();
    }
  },

  propTypes : {
    options : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    value : React.PropTypes.string.isRequired,
    onCommit : React.PropTypes.func.isRequired
  },

  renderEditorNode(): ReactElement{
    return (
      <select ref="select" style={this.getStyle()} defaultValue={this.props.value} onChange={this.onChange} >
        {this.renderOptions()}
      </select>);
  },

  renderOptions(): Array<ReactElement>{
    var options = [];
    this.props.options.forEach(function(name){
      options.push(<option key={name} value={name}  >{name}</option>);
    }, this);
    return options;
  },


  onChange(){
    this.commit({key : 'Enter'});
  },

  onClick(e: Event){
    e.stopPropagation();
    e.preventDefault();
  }

});

module.exports = DropDownEditor;
