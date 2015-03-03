/* @flow */
/**
 * @jsx React.DOM

 */
"use strict";

var React                 = require('react/addons');
var PropTypes             = React.PropTypes;
var BaseGrid              = require('../../Grid');
var ExcelCell             = require('../cells/ExcelCell');
var Row                   = require('../../Row');
var ExcelColumn           = require('./ExcelColumn');
var merge                 = require('../../merge');
var SelectableGridMixin   = require('./mixins/SelectableGridMixin');
var DraggableGridMixin    = require('./mixins/DraggableGridMixin');
var KeyboardHandlerMixin  = require('../../KeyboardHandlerMixin');
var CopyPasteGridMixin    = require('./mixins/CopyPasteGridMixin');
var SortableGridMixin     = require('./mixins/SortableGridMixin');
var FilterableGridMixin   = require('./mixins/FilterableGridMixin');
var CheckboxEditor        = require('../editors/CheckboxEditor');


var cloneWithProps = React.addons.cloneWithProps;

type ExcelGridProps = {
  rowHeight: number;
  minHeight: number;
  enableRowSelect: ?boolean;
  onRowUpdated: ?() => void;
  columns: Array<ExcelColumn>;
  rows: Array<Row>;
  toolbar: ?any;
};

type RowUpdateEvent = {
  keyCode: string;
  changed: {expandedHeight: number};
  rowIdx: number;
};

var ExcelGrid = React.createClass({

  propTypes: {
    rowHeight: React.PropTypes.number.isRequired,
    minHeight: React.PropTypes.number.isRequired,
    enableRowSelect: React.PropTypes.bool,
    onRowUpdated:React.PropTypes.func,
    columns:React.PropTypes.arrayOf(ExcelColumn).isRequired,
    rows:React.PropTypes.arrayOf(Row).isRequired,
    toolbar:React.PropTypes.element
  },

  mixins : [KeyboardHandlerMixin, SelectableGridMixin, DraggableGridMixin, CopyPasteGridMixin, SortableGridMixin, FilterableGridMixin],

  getInitialState(): { selectedRows: Array<Row>; expandedRows: Array<Row> } {
    return {selectedRows : [], expandedRows : []};
  },

  onCellCommit(commit: RowUpdateEvent){
    var selected = Object.assign({}, this.state.selected);
    selected.active = false;
    if (commit.keyCode === 'Tab') {
      selected.idx += 1;
    }
    var expandedRows = this.state.expandedRows;
    if(commit.changed && commit.changed.expandedHeight){
      expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
    }
    this.setState({selected : selected, expandedRows : expandedRows});
    this.props.onRowUpdated(commit);

  },
  getColumns : function(): Array<any>{
    var cols = this.getDecoratedColumns(this.props.columns)
    if(this.props.enableRowSelect){
        cols.unshift({
          key: 'select-row',
          name: '',
          formatter : <CheckboxEditor/>,
          onRowSelect :this.handleRowSelect,
          filterable : false,
          headerRenderer : <input type="checkbox" onChange={this.handleCheckboxChange} />,
          width : 60
        });
      }
      return cols;
  },

  getDefaultProps() {
    return {
      rowHeight: 35,
      enableRowSelect : false,
      minHeight : 350
    };
  },

  handleCheckboxChange : function(e: SyntheticEvent){
    if(e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true){
      var selectedRows = this.props.rows.map(() => true);
      this.setState({selectedRows : selectedRows});
    }else{
      var selectedRows = this.props.rows.map(() => false);
      this.setState({selectedRows : selectedRows});
    }
  },

  handleRowSelect(row: Row){
    var selectedRows = this.state.selectedRows;
    if(selectedRows[row] == null || selectedRows[row] == false){
      selectedRows[row] = true;
    }else{
      selectedRows[row] = false;
    }
    this.setState({selectedRows : selectedRows});
  },

  expandRow(row: Row, newHeight: number): Array<Row>{
    var expandedRows = this.state.expandedRows;
    if(expandedRows[row]){
      if(expandedRows[row]== null || expandedRows[row] < newHeight){
        expandedRows[row] = newHeight;
      }
    }else{
      expandedRows[row] = newHeight;
    }
    return expandedRows;
  },

  addRow(){

  },

  handleShowMore(row: Row, newHeight: number) {
    var expandedRows = this.expandRow(row, newHeight);
    this.setState({expandedRows : expandedRows});
  },

  handleShowLess(row: Row){
    var expandedRows = this.state.expandedRows;
    if(expandedRows[row]){
        expandedRows[row] = false;
    }
    this.setState({expandedRows : expandedRows});
  },

  expandAllRows(){

  },

  collapseAllRows(){

  },

  onAfterAddRow:function(numberOfRows: number){
    this.setState({selected : {idx : 1, rowIdx : numberOfRows - 2}});
    //cheeky
    this.refs.base.refs.viewport.refs.canvas.getDOMNode().scrollTop = numberOfRows * this.props.rowHeight;
  },

  componentWillReceiveProps:function(nextProps: ExcelGridProps){
    if(nextProps.rows.length  === this.props.rows.length + 1){
      this.onAfterAddRow(nextProps.rows.length + 1);
    }
  },



  render: function(): ?ReactElement {
    var cellMetaData = {
      selected : this.state.selected,
      onCellClick : this.onCellClick,
      onCommit : this.onCellCommit
    }

    var rows = this.filterRows();
    var toolbar = this.renderToolbar();
    return(
      <div className="react-grid-Container">
        {toolbar}
        <div className="react-grid-Main">
        {(<BaseGrid
          ref="base"
          {...this.props}
          length={this.props.rows.length}
          headerRows={this.getHeaderRows()}
          columns={this.getColumns()}
          rows={rows}
          cellMetaData={cellMetaData}
          selectedRows={this.state.selectedRows}
          expandedRows={this.state.expandedRows}
          rowOffsetHeight={this.getRowOffsetHeight()}
          minHeight={this.props.minHeight}
          onKeyDown={this.onKeyDown} />)}
        </div>
      </div>
    )
  },

  renderToolbar(): ReactElement {
    var Toolbar = this.props.toolbar;
    if(React.isValidElement(Toolbar)){
      return( React.addons.cloneWithProps(Toolbar, {onToggleFilter : this.onToggleFilter, numberOfRows : this.props.rows.length}));
    }

  }


})


module.exports = ExcelGrid;
