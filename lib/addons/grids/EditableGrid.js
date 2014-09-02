/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React                    = require('react');
var PropTypes                = React.PropTypes;
var BaseGrid                 = require('../../Grid');
var EditableCell             = require('../cells/EditableCell');
var EditableGridMixin        = require('./mixins/EditableGridMixin');
var SelectableGridMixin      = require('./mixins/SelectableGridMixin');
var merge                    = require('../../merge');

var EditableGrid = React.createClass({

  mixins : [SelectableGridMixin, EditableGridMixin],

  propTypes : {
    onCellChanged : React.PropTypes.func.isRequired
  },

  render: function() {
    var cellRenderer = (
      <EditableCell
        selected={this.state.selected}
        onSelect={this.onSelect}
        onClick={this.onSelect}
        onSetActive={this.onSetActive}
        onCommit={this.onCellChanged}
        />
    );
    return this.transferPropsTo(
      <BaseGrid cellRenderer={cellRenderer} />
    )
  }


})


module.exports = EditableGrid;
