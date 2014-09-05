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
    return {canFilter : false, columnFilters : {}};
  },

  getDefaultProps() {
    return {
      rowHeight: 35,
      shouldDisplayToolbar : true
    };
  },

  mixins : [SelectableGridMixin, EditableGridMixin, DraggableGridMixin, CopyPasteGridMixin, SortableGridMixin],

  filterRows(){
    var rows = this.props.rows;
    if(this.state.sortColumn){
      rows = this.sortRows(rows);
    }
    if(this.hasFilters()){
      rows = rows.filter(this.isRowDisplayed);
    }
    return rows;
  },

  hasFilters(){
    var hasFilters = false;
    Object.keys(this.state.columnFilters).every(function(key){
      var filter = this.state.columnFilters[key];
      if(filter != null && filter != undefined && filter != ''){
        hasFilters = true;
        return false;
      }
        return true;
    }, this);
    return hasFilters;
  },

  isRowDisplayed(row){
    var isRowDisplayed = null;
    Object.keys(this.state.columnFilters).every(function(key){
      var filter = this.state.columnFilters[key].toLowerCase();
      var cellValue = row[key].toLowerCase();
      if(filter != null && filter != undefined && filter != '' && typeof cellValue === 'string'){
        if(cellValue.indexOf(filter) > -1){
          isRowDisplayed = true;
        }else{
          isRowDisplayed = false;
          return false;
        }
      }
      return true;
    }, this);
    return isRowDisplayed == null ? false : isRowDisplayed;
  },

  toggleFilter(){
    this.setState({canFilter : !this.state.canFilter});
  },

  handleAddFilter(filter){
    var columnFilters = this.state.columnFilters;
    columnFilters[filter.columnKey] = filter.filterTerm;
    this.setState({columnFilters : columnFilters, selected : null});
  },

  getHeaderRows(){
    var rows = [{ref:"row", height: this.props.rowHeight}];
    if(this.state.canFilter === true){
      rows.push({ref:"filterRow", headerCellRenderer : <FilterableHeaderCell onChange={this.handleAddFilter}/>, height : 45});
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
        <this.renderToolbar/>
        {this.transferPropsTo(<BaseGrid
          headerRows={this.getHeaderRows()}
          columns={this.getDecoratedColumns(this.props.columns)}
          rows={rows}
          cellRenderer={cellRenderer}
          rowOffsetHeight={this.getRowOffsetHeight()} />)}
      </div>
    )
  },

  renderToolbar(){
    if(this.props.shouldDisplayToolbar === true){
      return(<div className="navbar navbar-default">
        <div className="navbar-form">
          <div className="form-group">
            <button type="button" className="btn btn-default" onClick={this.toggleFilter}>
              <span className="glyphicon glyphicon-filter"></span> Filter Rows
            </button>
          </div>
        </div>
      </div>)
    }

  }


})


module.exports = ExcelGrid;
