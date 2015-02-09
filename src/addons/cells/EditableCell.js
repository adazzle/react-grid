/* @flow */
/**
 * @jsx React.DOM


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

  propTypes : {
    column : React.PropTypes.shape(ExcelColumn).isRequired,
    value : React.PropTypes.any.isRequired,
    height : React.PropTypes.number.isRequired,
    rowIdx : React.PropTypes.number.isRequired,
  },

  getCellClass : function(): string{
      return cx({
      'editing' : this.isActive(),
      'selected' : this.isSelected() && !this.isActive()
      });
  },

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    return this.props.column.width !== nextProps.column.width
    || this.props.value !== nextProps.value
    || this.props.height !== nextProps.height
    || this.props.rowIdx !== nextProps.rowIdx
    || this.isCellSelectionChanging(nextProps);
  },

  render: function(): ?ReactElement {
    return (
      <BaseCell
        {...this.props}
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
