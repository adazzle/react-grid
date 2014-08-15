/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var SelectableMixin = require('../mixins/SelectableMixin');
var EditableMixin  = require('../mixins/EditableMixin');
var BaseCell       = require('../../Cell');
var MixinHelper            = require('../utils/MixinHelper');
var KeyboardHandlerMixin = require('../mixins/KeyboardHandlerMixin');
var PropTypes = React.PropTypes;


var EditableCellMixin = MixinHelper.mix([KeyboardHandlerMixin, SelectableMixin, EditableMixin,
  {
    onClick() {
      var rowIdx = this.props.rowIdx;
      var idx = this.props.idx;
      this.props.onClick({rowIdx: rowIdx, idx: idx, active : this.canEdit()});
    },

    setActive(keyPressed){
      var rowIdx = this.props.rowIdx;
      var idx = this.props.idx;
      if(this.canEdit() && !this.isActive()){
        this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : true, initialKeyCode : keyPressed});
      }
    },

    isActive(){
      return this.isSelected() && this.props.selected.active === true;
    },

    onPressEnter(e){
      this.setActive(e.key);
    },

    onPressDelete(e){
      this.setActive(e.key);
    },

    onPressBackspace(e){
      this.setActive(e.key);
    },

    onPressChar(e){
      if(this.isKeyPrintable(e.keyCode)){
        this.setActive(e.keyCode);
      }
    }
  }
]);



var EditableCell = React.createClass({

  mixins : [EditableCellMixin],

  render: function() {
    var selected = this.isSelected();

    var className = cx({
      'editing' : this.isActive(),
      'selected' : selected
      });

    return this.transferPropsTo(
      <BaseCell
        tabIndex={-1}
        ref="cell"
        className={className}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        formatter={this.getFormatter()}
        />
    )
  }

})

module.exports = {Cell : EditableCell, Mixin : EditableCellMixin};