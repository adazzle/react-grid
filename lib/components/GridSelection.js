/**
 * @jsx React.DOM
 */
 "use strict";

var SelectedCellsStore = require('../stores/SelectedCellsStore');
var SelectedCellsActions = require('../actions/SelectedCellActions');
var utils = require('./utils');
var React = require('React');
var Perf = require('React/addons').addons.Perf;
window.ReactPerf = Perf;
Perf.start();
function getStateFromStores() {
  return {
    SelectedCells:SelectedCellsStore.getAll(),
    ActiveCell: SelectedCellsStore.getActiveCell()
  };
}


var SelectableCell = function(existingCell) {
  return React.createClass({
    getInitialState: function() {
      return getStateFromStores();
    },
    componentDidMount: function() {
      SelectedCellsStore.addChangeListener(this._onChange);
    },
    componentDidUpdate: function() {
      if(this.isActiveCell()) {
        this.getDOMNode().focus();
      }
    },
    componentWillUnmount: function() {
      SelectedCellsStore.removeChangeListener(this._onChange);
    },
     /**
     * Event handler for 'change' events coming from the stores
     */
    _onChange: function() {
      this.setState(getStateFromStores());
    },
    isSelected: function(row,col) {
      return this.state
        && this.state.SelectedCells
        && this.state.SelectedCells[row]
        && this.state.SelectedCells[row][col];
    },
    isActiveCell: function() {
      return this.state
        && this.state.ActiveCell
        && this.state.ActiveCell.row === this.props.row
        && this.state.ActiveCell.col === this.props.column.idx;
    },
    render: function() {
      var child = existingCell ?
      this.transferPropsTo(existingCell)
      : this.props.value;
      var style = this.isSelected(this.props.row, this.props.column.idx) ?
        {
          textWeight: "bold",
          backgroundColor: "#ccc"
        } : {};
        var cx="";
      if(this.isActiveCell()) {
        cx="active-cell";
      }
      return (<div tabIndex={this.props.column.idx} class={cx} style={style}>{child}</div>);
    }
  });
};

var GridSelection = {
  getInitialState: function() {
    this.setCellRender(this.props.columns);
    return getStateFromStores();
  },
  componentDidMount: function() {
    SelectedCellsStore.addChangeListener(this._onChange);
    this.getDOMNode().addEventListener('keydown', this.handleKeyDown);
  },

  componentWillUnmount: function() {
    SelectedCellsStore.removeChangeListener(this._onChange);
    this.getDOMNode().removeEventListener('keydown', this.handleKeyDown);
  },
   /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  },
  getSelectedCells: function() {
    return this.state.SelectedCells;
  },
  selectedRowClicked: function(ev, row, cell) {
    this.navigateTo({col:cell.column.idx, row:row.key, ev:ev});
  },
  componentWillMount: function() {
      //hook onto row clicked
      //be much nicer to use es6 classes, etc but thats for react-future
      //could also easily use an event bus
      //but trying to keep this as a react-only component
      //so we are wrapping it instead
      utils.wrap(this, 'onRowClick', this.selectedRowClicked);
  },
  setCellRender: function(cols) {
    cols.map((col, idx) =>
      col.renderer = SelectableCell(col.renderer)
    );
  },
  handleKeyDown: function(ev) {
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

    var multiSelect = false;
    if(args.ev && args.ev.shiftKey) {
      multiSelect= true;
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

    //need to adjust the viewport too
    //this happens through the native events for keys
    //but we will need to focus the element, unless we clicked it
    //so we set focus in componentDidUpdate
    //focus if its anythig other than a click, or we dont have an event
    var focus = !args.ev || !args.ev.type || args.ev.type!=='click';
    SelectedCellsActions.selectCell({
      row: row,
      col: col,
      multiSelect: multiSelect
    });
//TODO scroll?

  },
  // getActiveCell: function() {
  //   var cells = this.getDOMNode().getElementsByClassName('active-cell');
  //   return cells && cells.length ? cells[0] : null;
  // },
  // componentDidUpdate: function() {
  //   if(this.state.FocusCell) {
  //     var active=this.getActiveCell();
  //     if(active) { active.focus(); }
  //   }
  // }
};


module.exports = GridSelection;
