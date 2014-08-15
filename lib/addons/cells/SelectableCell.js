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
var KeyboardHandlerMixin = require('../mixins/KeyboardHandlerMixin');
var MixinHelper            = require('../utils/MixinHelper');

var SelectableCellMixin = MixinHelper.mix([KeyboardHandlerMixin, SelectableMixin]);

var SelectableCell = React.createClass({

  mixins : [SelectableCellMixin],

  render: function() {
    var selected = this.isSelected();
    return this.transferPropsTo(
      <BaseCell
        tabIndex={-1}
        ref="cell"
        className={selected ? 'selected' : null}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        />
    )
  }

})

module.exports = {Cell : SelectableCell, Mixin : SelectableCellMixin};
