/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var MixinHelper             = require('../utils/MixinHelper');
var EditorMixin             = require('./mixins/EditorMixin');
var keyboardHandlerMixin    = require('../cells/mixins/keyboardHandlerMixin');

var CheckBoxEditor = React.createClass({

  mixins : MixinHelper.mix([keyboardHandlerMixin, EditorMixin]),

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

  renderEditorNode(){
    return (<input type="checkbox" defaultValue={this.props.value}  onKeyDown={this.onKeyDown}/>);
  },

  onBeforeEnter(e){
    var isChecked = JSON.parse(this.getValue());
    this.setValue(!isChecked);
  },

  handleCustomKeyDown : function(e){
    e.stopPropagation();
    e.preventDefault();
  }

});

module.exports = CheckBoxEditor;
