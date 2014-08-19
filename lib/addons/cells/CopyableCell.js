/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var BaseCell       = require('../../Cell');
var SelectableMixin = require('../mixins/SelectableMixin');
var EditableMixin  = require('../mixins/EditableMixin');
var MixinHelper            = require('../utils/MixinHelper');
var KeyboardHandlerMixin = require('../mixins/KeyboardHandlerMixin');

var CopyableCellMixin = {

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
    if(e.keyCode == this.KeyCode_c || e.keyCode == this.KeyCode_C){
      this.props.handleCopy({value : this.props.value});
    }else if(e.keyCode == this.KeyCode_v || e.keyCode == this.KeyCode_V){
      this.props.handlePaste({value : this.props.value});
    }
  }
};

var CopyableCell = React.createClass({

  mixins : MixinHelper.mix([KeyboardHandlerMixin, SelectableMixin, CopyableCellMixin]),

  render: function() {
    return this.transferPropsTo(<BaseCell
      className={this.getCellClass()}
      onKeyDown={this.onKeyDown}
      onClick={this.onClick}
      />)
  }

});

module.exports = {Cell : CopyableCell, Mixin : CopyableCellMixin}
