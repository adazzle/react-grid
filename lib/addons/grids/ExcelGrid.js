/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React                 = require('react');
var PropTypes             = React.PropTypes;
var BaseGrid              = require('../../Grid');
var ExcelCell             = require('../cells/ExcelCell');
var merge                 = require('../../merge');
var SelectableGridMixin   = require('./mixins/SelectableGridMixin');
var DraggableGridMixin    = require('./mixins/DraggableGridMixin');
var CopyPasteGridMixin    = require('./mixins/CopyPasteGridMixin');
var EditableGridMixin     = require('./mixins/EditableGridMixin');
var SortableGridMixin     = require('./mixins/SortableGridMixin');

var ExcelGrid = React.createClass({

  mixins : [SelectableGridMixin, EditableGridMixin, DraggableGridMixin, CopyPasteGridMixin],

  render: function() {
    var cellRenderer = (
      <ExcelCell
        selected={this.state.selected}
        copied={this.state.copied}
        dragged={this.state.dragged}
        onSelect={this.onSelect}
        onClick={this.onSelect}
        onSetActive={this.onSetActive}
        onCommit={this.onCellChanged}
        handleCopy={this.handleCopy}
        handlePaste={this.handlePaste}
        handleDragStart={this.handleDragStart}
        handleDragEnter={this.handleDragEnter}
        handleDragEnd={this.handleDragEnd}
        handleTerminateDrag={this.handleTerminateDrag}
        />
    );
    return this.transferPropsTo(
      <BaseGrid
        cellRenderer={cellRenderer}/>
    )
  }


})


module.exports = ExcelGrid;
