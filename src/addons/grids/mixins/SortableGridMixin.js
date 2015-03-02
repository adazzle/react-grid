/* TODO@flow mixins */
/**
 * @jsx React.DOM


 */
"use strict";

var React               = require('react/addons');
var PropTypes           = React.PropTypes;
var SortableHeaderCell  = require('../../cells/headerCells/SortableHeaderCell');
var shallowCloneObject  = require('../../../shallowCloneObject');
var Row = require('../../../Row');
var ExcelColumn = require('../ExcelColumn');

type SortType = {ASC: string; DESC: string};
var DEFINE_SORT = {
  ASC : 'ASC',
  DESC : 'DESC'
}
Object.freeze(DEFINE_SORT);

var SortableGridMixin = {
  propTypes : {
    columns : React.PropTypes.arrayOf(React.PropTypes.shape(ExcelColumn)).isRequired
  },

  getInitialState: function(): any {
    return {sortDirection: null, sortColumn: null};
  },

   getDecoratedColumns: function(columns: Array<ExcelColumn>): Array<ExcelColumn> {
      return this.props.columns.map(function(column) {
        column = shallowCloneObject(column);
        if (column.sortable) {
          column.headerRenderer = <SortableHeaderCell column={column}/>;
          column.sortBy = this.sortBy;
          if (this.state.sortColumn === column.key) {
            column.sorted = this.state.sortDirection;
          }else{
            column.sorted = DEFINE_SORT.NONE;
          }
        }
        return column
      }, this);
    },

    sortBy: function(column: ExcelColumn, direction: SortType) {
      switch(direction){
        case null:
        case undefined:
          direction = DEFINE_SORT.ASC;
        break;
        case DEFINE_SORT.ASC:
          direction = DEFINE_SORT.DESC;
        break;
        case DEFINE_SORT.DESC:
          direction = null;
        break;
      }
      this.setState({sortDirection: direction, sortColumn: column.key});
    },

    sortRows: function(rows: Array<Row>): Array<Row> {
      //feels naughty
      rows = [].concat(rows);
      var sortColumn = this.state.sortColumn;
      var sortDirection = this.state.sortDirection;
      if(sortColumn != null && sortDirection !== null){
        return rows.sort(function(row1, row2){
           var k1 = row1[sortColumn], k2 = row2[sortColumn];
           if(sortDirection === DEFINE_SORT.ASC){
             return (k1 > k2) ? 1 : ( (k2 > k1) ? -1 : 0 );
           }else if(sortDirection === DEFINE_SORT.DESC){
             return (k1 > k2) ? -1 : ( (k2 > k1) ? 1 : 0 );
           }
        });
      }else{
        return rows;
      }

    }

}

module.exports = SortableGridMixin;
