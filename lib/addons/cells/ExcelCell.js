/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var EditableCellMixin = require('../EditableCell').Mixin;
var CopyableCellMixin = require('../CopyableCell').Mixin;
var DraggableCellMixin = require('../DraggableCell').Mixin;
var BaseCell       = require('../../Cell');
var PropTypes = React.PropTypes;


var ExcelCell = React.createClass({

  mixins : [EditableCellMixin, CopyableCellMixin, DraggableCellMixin],

  render: function() {

    var className = cx({
      'editing' : this.isActive(),
      'selected' : this.isSelected()
      });

    return this.transferPropsTo(
      <BaseCell/>
    )
  }

})

module.exports = ExcelCell;
