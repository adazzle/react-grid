/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = require('react');
var PropTypes           = React.PropTypes;
var merge               = require('../../../merge');

var EditableGridMixin = {

  propTypes : {
    onCellChanged : React.PropTypes.func.isRequired
  },

  onCellChanged:function(commit){
    var selected = this.state.selected;
    selected.active = false;
    if(commit.keyCode === 'Tab'){
      selected.idx += 1;
    }
    this.setState({selected : selected});
    this.props.onCellChanged(commit);
  },

  onSetActive:function(activeCell) {
    var selected = merge(this.state.selected, activeCell);
    this.setState({selected: selected});
  }

};


module.exports = EditableGridMixin;
