/* TODO@flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var Cell           = require('./Cell');
var cloneWithProps = React.addons.cloneWithProps;
var ColumnMetrics    = require('./ColumnMetrics');

var Row = React.createClass({

  render() {
    var className = cx(
      'react-grid-Row',
      `react-grid-Row--${this.props.idx % 2 === 0 ? 'even' : 'odd'}`
    );

    var style = {
      height: this.getRowHeight(),
      overflow: 'hidden'
    };

    var cells = this.getCells();
    return (
      <div {...this.props} className={className} style={style}>
        {React.isValidElement(this.props.row) ?
          this.props.row : cells}
      </div>
    );
  },

  getCells() {
    var cells = [];
    var lockedCells = [];

    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      var column = this.props.columns[i];
      var cell = this.renderCell({
        ref:i,
        key:i,
        idx:i,
        rowIdx:this.props.idx,
        filterRowIdx:this.props.row.key,
        value:this.getCellValue(column.key || i),
        column:column,
        height:this.getRowHeight(),
        formatter:column.formatter,
        //TODO passing the row to the cell??
        rowData : this.props.row});
      if (column.locked) {
        lockedCells.push(cell);
      } else {
        cells.push(cell);
      }
    }

    return cells.concat(lockedCells);
  },

  getRowHeight(){
    if(this.props.expandedRows && this.props.expandedRows[this.props.key]){
      return this.props.expandedRows[this.props.key];
    }else{
      return this.props.height;
    }
  },

  getCellValue(key){
    if(key === 'select-row'){
      return this.props.isSelected;
    }else{
      return this.props.row[key]
    }
  },

  renderCell(props) {
    if(typeof this.props.cellRenderer == 'function') {
      this.props.cellRenderer.call(this, props);
    }
    if (React.isValidElement(this.props.cellRenderer)) {
      return cloneWithProps(this.props.cellRenderer, props);
    } else {
      return this.props.cellRenderer(props);
    }
  },

  getDefaultProps() {
    return {
      cellRenderer: Cell
    };
  },

  shouldComponentUpdate(nextProps) {
    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||

      nextProps.row !== this.props.row            ||
      nextProps.height !== this.props.height;
  },

  setScrollLeft(scrollLeft) {
    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      if (this.props.columns[i].locked) {
        this.refs[i].setScrollLeft(scrollLeft);
      }
    }
  }

});

module.exports = Row;
