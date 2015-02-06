/* @flow */
/**
 * @jsx React.DOM


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


  mixins : [CopyableMixin],

  render: function() {
    return (<BaseCell
      {...this.props}
      className={this.getCellClass()}
      onKeyDown={this.onKeyDown}
      onClick={this.onClick}
      />)
  }

});

module.exports = CopyableCell;
