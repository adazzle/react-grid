/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var BaseCell       = require('../../Cell');
var SelectableMixin = require('./mixins/SelectableMixin');
var MixinHelper            = require('../utils/MixinHelper');

var SelectableCell = React.createClass({

  mixins : [SelectableMixin],

  getCellClass : function(): ?string{
    return this.isSelected() ? 'selected' : null;
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
        onKeyDown={this.onKeyDown}
        onClick={this.onClick} />)
  }

})

module.exports = SelectableCell;
