/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;

var SelectableMixin = {

  getDefaultProps : function(){
    return {
      tabIndex : -1,
      ref : "cell"
    }
  },

  isSelected: function() {
    var selected = this.props.cellMetaData.selected;
    return (
      selected
      && selected.rowIdx === this.props.rowIdx
      && selected.idx === this.props.idx
    );
  },

  componentDidMount: function() {
    this.checkFocus();
  },

  componentDidUpdate: function() {
    this.checkFocus();
  },

  isCellSelectionChanging(nextProps){
    var selected     = this.props.cellMetaData.selected;
    var nextSelected = nextProps.cellMetaData.selected;
    if(selected && nextSelected){
      return this.props.idx === nextSelected.idx || this.props.idx === selected.idx;
    }else{
      return true;
    }
  },

  checkFocus: function() {
    if (this.isSelected()) {
      this.getDOMNode().focus();
    }
  }
}



module.exports = SelectableMixin;
