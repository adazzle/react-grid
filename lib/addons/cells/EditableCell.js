/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var SelectableMixin = require('./mixins/SelectableMixin');
var EditableMixin  = require('./mixins/EditableMixin');
var BaseCell       = require('../../Cell');
var MixinHelper            = require('../utils/MixinHelper');
var KeyboardHandlerMixin = require('./mixins/KeyboardHandlerMixin');
var PropTypes = React.PropTypes;



var EditableCell = React.createClass({

  mixins : [EditableMixin],

  getCellClass : function(){
      return cx({
      'editing' : this.isActive(),
      'selected' : this.isSelected() && !this.isActive()
      });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.column.width !== nextProps.column.width
    || this.props.value !== nextProps.value
    || this.props.height !== nextProps.height
    || this.props.rowIdx !== nextProps.rowIdx
    || this.isCellSelectionChanging(nextProps);
  },

  render: function() {
    return this.transferPropsTo(
      <BaseCell
        className={this.getCellClass()}
        formatter={this.getFormatter()}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
        />
    )
  }

})

module.exports = EditableCell;
