/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var TextInputMixin = {

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

  setCaretAtEndOfInput(){
    var input = this.getInputNode();
    //taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
    var txtLength = input.value.length;
    if(input.setSelectionRange){
      input.setSelectionRange(txtLength, txtLength);
    }else if(input.createTextRange){
      var fieldRange = input.createTextRange();
      fieldRange.moveStart('character', txt.value.length);
      fieldRange.collapse();
      fieldRange.select();
    }
  },

  setTextInputFocus(){
    if(!this.isKeyPrintable(this.props.initialKeyCode)){
      this.getInputNode().focus();
      this.setCaretAtEndOfInput();
    }else{
      this.getInputNode().select();
    }
  }


};

module.exports = TextInputMixin;
