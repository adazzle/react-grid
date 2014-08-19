/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var BaseCell       = require('../../Cell');
var SelectableMixin = require('./mixins/SelectableMixin');
var KeyboardHandlerMixin = require('./mixins/KeyboardHandlerMixin');
var MixinHelper            = require('../utils/MixinHelper');

var SelectableCellMixins = MixinHelper.mix([KeyboardHandlerMixin, SelectableMixin]);

var SelectableCell = React.createClass({

  mixins : SelectableCellMixins,

  render: function() {
    return this.transferPropsTo(
      <BaseCell
        className={this.getCellClass()}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick} />)
  }

})

module.exports = SelectableCell;
