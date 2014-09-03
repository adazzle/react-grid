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
var FilterableHeaderCell = require('../cells/headerCells/FilterableHeaderCell');

var ExcelGrid = React.createClass({

  getInitialState : function(){
    return {canFilter : false};
  },

  getDefaultProps() {
    return {
      rowHeight: 35
    };
  },

  mixins : [SelectableGridMixin, EditableGridMixin, DraggableGridMixin, CopyPasteGridMixin, SortableGridMixin],

  filterRows(){
    var rows = this.props.rows;
    if(this.state.sortColumn){
      rows = this.sortRows(rows);
    }
    return rows;
  },

  toggleFilter(){
    this.setState({canFilter : !this.state.canFilter});
  },

  getHeaderRows(){
    var rows = [{ref:"row", height: this.props.rowHeight}];
    if(this.state.canFilter === true){
      rows.push({ref:"filterRow", headerCellRenderer : FilterableHeaderCell, height : 45});
    }
    return rows;
  },

  getRowOffsetHeight(){
    var offsetHeight = 0;
    this.getHeaderRows().forEach((row) => offsetHeight += row.height );
    return offsetHeight;
  },

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

    var rows = this.filterRows();
    return(
      <div className="container-fluid">
        <div className="navbar navbar-default">
          <div className="navbar-form">
            <div className="form-group">
              <button type="button" className="btn btn-default" onClick={this.toggleFilter}>
                <span className="glyphicon glyphicon-filter"></span> Filter Rows
              </button>
            </div>
          </div>
        </div>

        {this.transferPropsTo(<BaseGrid
          headerRows={this.getHeaderRows()}
          columns={this.getDecoratedColumns(this.props.columns)}
          rows={rows}
          cellRenderer={cellRenderer}
          rowOffsetHeight={this.getRowOffsetHeight()} />)}
      </div>
    )
  }


})


module.exports = ExcelGrid;
