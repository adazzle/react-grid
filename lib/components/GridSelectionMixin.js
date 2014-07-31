/**
 * @jsx React.DOM
 */
'use strict';
var React = require('React');
var utils = require('./utils');

var SelectableCell = function(state, existingCell) {
  var isSelected = function(row,col) {
return state && state.SelectedCells && state.SelectedCells[row] && state.SelectedCells[row][col];
  }
  return React.createClass({
    render: function() {
      var child = existingCell ?
      transferPropsTo(existingCell)
      : this.props.value;
      var style = isSelected(this.props.row, this.props.column.idx) ?
        {
          textWeight: "bold",
          backgroundColor: "#ccc"
        } : {};

      return (<div style={style}>{child}</div>);
    }
  });
}

var GridSelectionMixin = {
  getInitialState: function() {
  this.setCellRender(this.props.columns);
    return {
      SelectedCells:[],
      ActiveCell: {row:0,col:0}
    };
  },
  getSelectedCells: function() {
    return this.state.SelectedCells;
  },
  selectedRowClicked: function(ev, row, cell) {
    this.navigateTo({col:cell.column.idx, row:row.key, ev:ev});
  },
  componentWillMount: function() {
      utils.wrap(this, 'onRowClick', this.selectedRowClicked);
      //relying on the user of the mixin to transferProps onto a DOM node
      //not the best, so might be better to fallback here and attache to the dom manually in componentDidMount?
      this.props.onKeyDown = this.handleKeyUp;
  },
  setCellRender: function(cols) {
    cols.map((col, idx) =>
      col.renderer = SelectableCell(this.state, col.renderer)
    );
  },
// render: function() {
//MIXIN - default
//   var grid = this.transferPropsTo(<Grid
//   ref="gridComponent"
//     columns={this.props.columns}
//     rows={this.props.rows}
//     SelectedCells={this.state.SelectedCells}
//     length={this.props.length}
//     rowHeight={this.state.rowHeight}
//     onRowClick={this.onRowClick}
//     initialRow={this.state.initialRow}
//     />);
//   return (
//     <div tabIndex="0"
//       onDoubleClick={this.handleGridDoubleClick}
//       onKeyDown={this.handleKeyUp}
//       >
//         {grid}
//       </div>
//     );
//
// },
  handleKeyUp: function(ev) {
    var key = ev.key;

    if(key === 'ArrowUp') {
      this.navigateTo({rowDelta:-1, ev:ev});
    }
    else if(key === 'ArrowDown') {
      this.navigateTo({rowDelta:1, ev:ev});
    }
    else if(key === 'ArrowLeft') {
      this.navigateTo({colDelta:-1, ev:ev});
    }
    else if(key === 'ArrowRight') {
      this.navigateTo({colDelta:1, ev:ev});
    }
  },
  navigateTo: function(args) {
    //TODO validate args

    //select the cell
    var SelectedCells = this.state.SelectedCells;
    if(!args.ev || !args.ev.shiftKey) {
      //clear selection
      SelectedCells=[];
    }

    var	row = this.state.ActiveCell.row;
    var	col = this.state.ActiveCell.col;
    if(args.rowDelta) {
      row += args.rowDelta;
    }
    if(args.colDelta) {
      col += args.colDelta;
    }
    if(isFinite(args.col)) {
      col=args.col;
    }
    if(isFinite(args.row)) {
      row=args.row;
    }
    SelectedCells[row]=SelectedCells[row] || [];
    SelectedCells[row][col]=SelectedCells[row][col] ? false : true; //toggle if it was already selected
    //need to adjust the viewport too
    //this happens through the native events for keys
    //but we will need to focus the element, unless we clicked it
    //so we set focus in componentDidUpdate
    //focus if its anythig other than a click, or we dont have an event
    var focus = !args.ev || !args.ev.type || args.ev.type!=='click'
    this.setState({
      SelectedCells:SelectedCells,
      ActiveCell:{row:row,col:col},
      FocusCell:focus
    });

  },
  getActiveCell: function() {
    var cells = this.getDOMNode().getElementsByClassName('active-cell');
    return cells && cells.length ? cells[0] : null;
  },
  componentDidUpdate: function() {
    if(this.state.FocusCell) {
      var active=this.getActiveCell();
      if(active) { active.focus(); }
    }
  }
};


module.exports = GridSelectionMixin;
