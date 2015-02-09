/* TODO@flow */
/**
 * @jsx React.DOM


 */
"use strict";

var React               = require('react/addons');
var PropTypes           = React.PropTypes;
var merge               = require('../../../merge');

var EditableGridMixin = {

  propTypes : {
    onRowUpdated : React.PropTypes.func
  },

  onCellCommit(commit: {keyCode: string | number}){
    var selected = this.state.selected;
    selected.active = false;
    if(commit.keyCode === 'Tab'){
      selected.idx += 1;
    }
    this.setState({selected : selected});
    this.props.onRowUpdate(commit);
  },

  onSetActive(activeCell: any) {
    var selected = merge(this.state.selected, activeCell);
    this.setState({selected: selected});
  }

};


module.exports = EditableGridMixin;
