/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                = require('react/addons');
var cx                   = React.addons.classSet;
var cloneWithProps       = React.addons.cloneWithProps;
var BaseCell             = require('../../Cell');
var SelectableMixin      = require('./mixins/SelectableMixin');
var EditableMixin        = require('./mixins/EditableMixin');
var CopyableMixin        = require('./mixins/CopyableMixin');
var MixinHelper          = require('../utils/MixinHelper');
var KeyboardHandlerMixin = require('./mixins/KeyboardHandlerMixin');


var CopyableCell = React.createClass({

  mixins : MixinHelper.mix([KeyboardHandlerMixin, SelectableMixin, CopyableMixin]),

  render: function() {
    return this.transferPropsTo(<BaseCell
      className={this.getCellClass()}
      onKeyDown={this.onKeyDown}
      onClick={this.onClick}
      />)
  }

});

module.exports = CopyableCell;
