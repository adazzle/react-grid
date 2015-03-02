/* TODO@flow mixins, getHeaderRows */
/**
 * @jsx React.DOM


 */
"use strict";

var React               = require('react/addons');
var PropTypes           = React.PropTypes;
var FilterableHeaderCell = require('../../cells/headerCells/FilterableHeaderCell');
var Row = require('../../../Row');

var FilterableGridMixin = {
  propTypes : {
    onFilter : React.PropTypes.func,
    rows : React.PropTypes.array.isRequired,
    rowHeight : React.PropTypes.number.isRequired
  },

  getInitialState : function(): {canFilter: boolean; columnFilters: any}{
    return {canFilter : false, columnFilters : {}};
  },

  filterRows(): Array<Row>{
    var rows = this.props.rows;
    if(this.state.sortColumn){
      rows = this.sortRows(rows);
    }

    if(this.hasFilters()){
      rows = rows.map((r, i) => {r.key = i;return r;}).filter(this.isRowDisplayed);
      if(this.props.onFilter){
        this.props.onFilter(rows);
      }
    }
    return rows;
  },

  hasFilters(): boolean{
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

  isRowDisplayed(row: Row): boolean{
    var isRowDisplayed = null;
    Object.keys(this.state.columnFilters).every(function(key){
      var filter = this.state.columnFilters[key].toLowerCase();
      var cellValue = row[key].toString().toLowerCase();
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

  onToggleFilter(){
    this.setState({canFilter : !this.state.canFilter});
  },

  handleAddFilter(filter: {columnKey: string; filterTerm: string }){
    var columnFilters = this.state.columnFilters;
    columnFilters[filter.columnKey] = filter.filterTerm;
    this.setState({columnFilters : columnFilters, selected : null});
  },

  getHeaderRows(): Array<ReactElement> {
    var rows = [{ref:"row", height: this.props.rowHeight}];
    if(this.state.canFilter === true){
      rows.push({
        ref:"filterRow",
        headerCellRenderer : <FilterableHeaderCell onChange={this.handleAddFilter} column={this.props.column}/>,
        height : 45
      });
    }
    return rows;
  },

  getRowOffsetHeight(): number{
    var offsetHeight = 0;
    this.getHeaderRows().forEach((row) => offsetHeight += row.height );
    return offsetHeight;
  }

}

module.exports = FilterableGridMixin;
