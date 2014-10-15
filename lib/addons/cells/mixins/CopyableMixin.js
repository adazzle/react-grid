/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var PropTypes      = React.PropTypes;
var SimpleTextEditor = require('../../editors/SimpleTextEditor');
var MixinHelper      = require('../../utils/MixinHelper');
var SelectableMixin  = require('./SelectableMixin');
var KeyboardHandlerMixin = require('./KeyboardHandlerMixin');

var CopyableMixin = MixinHelper.createDependency({

  KeyboardHandlerMixin : KeyboardHandlerMixin,

  SelectableMixin : SelectableMixin

}).assignTo({

  getCellClass : function(){
    return cx({
      'selected' : this.isSelected() && !this.isCopied(),
      'copied' : this.isCopied()
    })
  },

  KeyCode_c : '99',

  KeyCode_C : '67',

  KeyCode_V : '86',

  KeyCode_v : '118',

  propTypes : {
    handleCopy : React.PropTypes.func.isRequired,
    handlePaste : React.PropTypes.func.isRequired
  },

  isCopied : function(){
    return (
      this.props.copied
      && this.props.copied.rowIdx === this.props.rowIdx
      && this.props.copied.idx === this.props.idx
    );
  },

  onPressKeyWithCtrl(e){
    if(this.canEdit()){
      if(e.keyCode == this.KeyCode_c || e.keyCode == this.KeyCode_C){
        this.props.handleCopy({value : this.props.value});
      }else if(e.keyCode == this.KeyCode_v || e.keyCode == this.KeyCode_V){
        this.props.handlePaste({value : this.props.value});
      }
    }
  }
});



module.exports = CopyableMixin;
