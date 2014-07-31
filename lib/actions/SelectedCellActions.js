"use strict";

var GridDispatcher = require('../dispatcher/GridDispatcher');
var ActionTypes = require('../constants/GridActions').ActionTypes;

module.exports = {

  selectCell: function(args) {
    GridDispatcher.handleViewAction({
      type: ActionTypes.SELECT_CELL,
      col: args.col,
      row: args.row,
      multiSelect: args.multiSelect
    });
    //TODO focus?
  },

};
