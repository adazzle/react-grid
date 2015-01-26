/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React                    = require('react');
var PropTypes                = React.PropTypes;
var BaseGrid                 = require('../../Grid');
var DraggableCell            = require('../cells/DraggableCell');
var SelectableGridMixin      = require('./mixins/SelectableGridMixin');
var DraggableGridMixin      = require('./mixins/DraggableGridMixin');

var DraggableCellGrid = React.createClass({

  mixins : [SelectableGridMixin, DraggableGridMixin],

  render: function() {
    var cellRenderer = (
      <DraggableCell
        selected={this.state.selected}
        dragged={this.state.dragged}
        onSelect={this.onSelect}
        onClick={this.onSelect}
        handleDragStart={this.handleDragStart}
        handleDragEnter={this.handleDragEnter}
        handleDragEnd={this.handleDragEnd}
        handleTerminateDrag={this.handleTerminateDrag}
        />
    );
    return (
      <BaseGrid {...this.props} cellRenderer={cellRenderer} />
    )
  }

})


module.exports = DraggableCellGrid;
