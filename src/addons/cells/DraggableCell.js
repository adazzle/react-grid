/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 * @flow
 */
'use strict';

var React                = require('react/addons');
var cx                   = React.addons.classSet;
var cloneWithProps       = React.addons.cloneWithProps;
var BaseCell             = require('../../Cell');
var SelectableMixin      = require('./mixins/SelectableMixin');
var MixinHelper          = require('../utils/MixinHelper');
var KeyboardHandlerMixin = require('./mixins/KeyboardHandlerMixin');
var DraggableMixin       = require('./mixins/DraggableMixin');

var DraggableCell = React.createClass({


  mixins : [DraggableMixin],

  render: function() {
    return (
      <BaseCell
        {...this.props}
        className={this.getCellClass()}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        handleDragStart={this.handleDragStart}
        onDragEnter={this.handleDragEnter}
        onDragEnd={this.props.handleDragEnd}
      />)
  }

})

module.exports = DraggableCell;
