/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var SelectableCellMixin = require('./SelectableCellMixin');
var MixinHelper = require('./utils/MixinHelper')


var EditableCellMixin = MixinHelper.mix(SelectableCellMixin,{

  canEdit(){
    return this.props.column.editor || this.props.column.editable;
  },

  isActive(){
    return this.isSelected() && this.props.selected.active === true;
  },

  onClick() {
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    this.props.onClick({rowIdx: rowIdx, idx: idx, active : this.canEdit()});
  },

  onKeyDown: function(e) {
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      this.props.onSelect({idx: idx, rowIdx: rowIdx, active : this.canEdit()});
    }
  },

  checkFocus: function() {
    if (this.isSelected() && !this.isActive()) {
      this.getDOMNode().focus();
    }
  }
}, ['onKeyDown']);



module.exports = EditableCellMixin;
