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
    var keyCode = e.keyCode;
    if (e.key === 'Enter') {
      if(this.canEdit() && !this.isActive()){
        this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : true});
      }
    }else if(this.isPrintable(e.keyCode)){
      if(this.canEdit()){
        this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : true, initialKeyCode : e.keyCode});
      }
    }
  },


  isPrintable(keycode){
    var valid =
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)

    return valid;
  },

  checkFocus: function() {
    if (this.isSelected() && !this.isActive()) {
      this.getDOMNode().focus();
    }
  }
}, ['onKeyDown']);



module.exports = EditableCellMixin;
