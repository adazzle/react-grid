/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var BaseCell       = require('../../Cell');
var SelectableCellMixin = require('./SelectableCell').Mixin;

var KeyCode_c = '99';
var KeyCode_C = '67';
var KeyCode_V = '86';
var KeyCode_v = '118';


var CopyableCell = React.createClass({

  propTypes : {
    handleCopy : React.PropTypes.func.isRequired,
    handlePaste : React.PropTypes.func.isRequired
  },

  mixins : [SelectableCellMixin],

  isCopied : function(){
    return (
      this.props.copied
      && this.props.copied.rowIdx === this.props.rowIdx
      && this.props.copied.idx === this.props.idx
    );
  },

  onPressKeyWithCtrl(e){
    if(e.keyCode == KeyCode_c || e.keyCode == KeyCode_C){
      this.props.handleCopy({value : this.props.value});
    }else if(e.keyCode == KeyCode_v || e.keyCode == KeyCode_V){
      this.props.handlePaste({value : this.props.value});
    }
  },

  render: function() {
    var className = cx({
      'selected' : this.isSelected() && !this.isCopied(),
      'copied' : this.isCopied()
    });
    return this.transferPropsTo(
      <BaseCell
        tabIndex={-1}
        ref="cell"
        className={className}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        />
    )
  }

})

module.exports = CopyableCell;
