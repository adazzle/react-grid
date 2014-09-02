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

  mixins : MixinHelper.mix([KeyboardHandlerMixin, SelectableMixin, EditableMixin]),

  render: function() {

    return this.transferPropsTo(
      <BaseCell
        className={this.getCellClass()}
        formatter={this.getFormatter()}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        />
    )
  }

})

module.exports = EditableCell;
