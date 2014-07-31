"use strict";
var GridDispatcher = require('../dispatcher/GridDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var ActionTypes = require('../constants/GridActions').ActionTypes;

var _selectedCells = {};
var CHANGE_EVENT = 'change';

var _selectCell = function(row, col, multiSelect) {
  if(!multiSelect) { _selectedCells = {}; }
  _selectedCells[row] = _selectedCells[row] || {};
  _selectedCells[row][col] = !_selectedCells[row][col] || true;
  _activeCell = {row:row, col:col };
};
var _activeCell = {row:0, cell: 0 };

var SelectedCellsStore = merge(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function(row, col) {
    return _selectedCells[row][col];
  },

  getAll: function() {
    return _selectedCells;
  },
  getAllForRow: function(row) {
    return _selectedCells[row];
  },
  isSelected: function(row, col) {
    return _selectedCells[row] && _selectedCells[row][col];
  },
  getActiveCell: function() { return _activeCell; }
});

SelectedCellsStore.dispatchToken = GridDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.SELECT_CELL:
      _selectCell(action.row, action.col, action.multiSelect);
      SelectedCellsStore.emitChange();
      break;
    default:
      // do nothing
  }

});

module.exports = SelectedCellsStore;
