/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var MixinHelper             = require('../utils/MixinHelper');
var EditorMixin             = require('./mixins/EditorMixin');
var TextInputMixin          = require('./mixins/TextInputMixin');
var keyboardHandlerMixin    = require('../cells/mixins/KeyboardHandlerMixin');

var SimpleTextEditor = React.createClass({

  mixins : [keyboardHandlerMixin, EditorMixin, TextInputMixin],

  overrides : {
      checkFocus : function(){
        if(!this.isKeyPrintable(this.props.initialKeyCode)){
          this.getDOMNode().focus();
          this.setCaretAtEndOfInput();
        }else{
          this.getDOMNode().select();
        }
      }
  },

  render(){
    return (<input type="text" defaultValue={this.getDefaultValue()}  style={this.getStyle()} onKeyDown={this.onKeyDown} />);
  }


});

module.exports = SimpleTextEditor;
