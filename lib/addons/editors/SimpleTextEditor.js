/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var EditorMixin             = require('./EditorMixin');

var SimpleTextEditor = React.createClass({

  mixins : [EditorMixin],

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

  onPressArrowLeft(e){
    //prevent event propogation. this disables left cell navigation
    e.stopPropagation();
  },

  onPressArrowRight(e){
    //prevent event propogation. this disables right cell navigation
    e.stopPropagation();
  },

  getDefaultValue(){
    var keyCode = this.props.initialKeyCode;
    if(keyCode === 'Delete' || keyCode === 'Backspace'){
      return '';
    }else if(keyCode === 'Enter'){
      return this.props.value;
    }else{
      var text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
      return text;
    }

  },

  render(){
    var style = {
      height: this.props.height
    }
    return (<input type="text" defaultValue={this.getDefaultValue()}  style={style} onKeyDown={this.onKeyDown} />);
  },

  setCaretAtEndOfInput(){
    var input = this.getDOMNode();
    //taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
    var txtLength = this.getValue().length;
    if(input.setSelectionRange){
      input.setSelectionRange(txtLength, txtLength);
    }else if(input.createTextRange){
      var fieldRange = input.createTextRange();
      fieldRange.moveStart('character', txt.value.length);
      fieldRange.collapse();
      fieldRange.select();
    }
  }



});

module.exports = SimpleTextEditor;
