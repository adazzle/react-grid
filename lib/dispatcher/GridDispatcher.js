"use strict";
var Dispatcher = require('./Dispatcher');

// var merge = require('react/lib/merge');
var copyProperties = require('react/lib/copyProperties');

var GridDispatcher = copyProperties(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction: function(action) {
    var payload = {
      source: 'VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = GridDispatcher;
