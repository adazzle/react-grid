/* @flow  */
/**
 * @jsx React.DOM


 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var Cell           = require('./Cell');
var cloneWithProps = React.addons.cloneWithProps;
var ColumnMetrics    = require('./ColumnMetrics');

type RowPropsType = {
  rowHeight: number;
  idx: number;
  columns: any;
  row: any;
  cellRenderer: ?any;
  isSelected: ?boolean;
};

var Row = React.createClass({

  propTypes: {
    height: React.PropTypes.number.isRequired,
    idx: React.PropTypes.number.isRequired,
    columns: React.PropTypes.array.isRequired,
    row: React.PropTypes.object.isRequired,
    cellRenderer: React.PropTypes.func,
    isSelected: React.PropTypes.bool
  },

  render(): ?ReactElement {
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

  getCells(): Array<ReactElement> {
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
        cellMetaData : this.props.cellMetaData,
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

  getRowHeight(): number {
    if(this.props.expandedRows && this.props.key) {
      var row = this.props.expandedRows[this.props.key] || null;
      if(row) {
        return row.height;
      }
    }
    return this.props.height;
  },

  getCellValue(key: number | string): any {
    if(key === 'select-row'){
      return this.props.isSelected;
    }else{
      return this.props.row[key]
    }
  },

  renderCell(props: any): ReactElement {
    if(typeof this.props.cellRenderer == 'function') {
      this.props.cellRenderer.call(this, props);
    }
    if (React.isValidElement(this.props.cellRenderer)) {
      return cloneWithProps(this.props.cellRenderer, props);
    } else {
      return this.props.cellRenderer(props);
    }
  },

  getDefaultProps(): {cellRenderer: Cell} {
    return {
      cellRenderer: Cell
    };
  },


  setScrollLeft(scrollLeft: number) {
    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      if (this.props.columns[i].locked) {
        this.refs[i].setScrollLeft(scrollLeft);
      }
    }
  },

  doesRowContainSelectedCell(): boolean{
    var cell = this.props.cellRenderer;
    if(cell.props.selected && cell.props.selected.rowIdx === this.props.idx){
      return true;
    }else{
      return false;
    }
  },

  willRowBeDraggedOver(props: any): boolean{
    var dragged = props.cellRenderer.props.dragged;
    return  dragged != null && (dragged.rowIdx || dragged.complete === true);
  },

  hasRowBeenCopied(): boolean{
    var cell = this.props.cellRenderer;
    return cell.props.copied != null && cell.props.copied.rowIdx === this.props.idx;
  }


});

module.exports = Row;
