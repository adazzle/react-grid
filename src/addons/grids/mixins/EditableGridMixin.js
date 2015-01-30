/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = require('react/addons');
var PropTypes           = React.PropTypes;
var merge               = require('../../../merge');

var EditableGridMixin = {

  propTypes : {
    onRowUpdated : React.PropTypes.func
  },

  onCellCommit(commit){
    var selected = this.state.selected;
    selected.active = false;
    if(commit.keyCode === 'Tab'){
      selected.idx += 1;
    }
    this.setState({selected : selected});
    this.props.onRowUpdate(commit);
  },

  onSetActive(activeCell) {
    var selected = merge(this.state.selected, activeCell);
    this.setState({selected: selected});
  }

};


module.exports = EditableGridMixin;
