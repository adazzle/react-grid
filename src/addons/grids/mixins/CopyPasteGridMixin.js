/* @flow */
/**
 * @jsx React.DOM


 */
"use strict";

var React               = require('react/addons');
var PropTypes           = React.PropTypes;

var CopyPasteGridMixin = {

  propTypes : {
    onCellCopyPaste : React.PropTypes.func
  },

  getInitialState: function(): any {
    return {copied : null};
  },


  handleCopy(args: {value: string}){
    var textToCopy = args.value;
    var selected = this.state.selected;
    var copied = {idx : selected.idx, rowIdx : selected.rowIdx};
    this.setState({textToCopy:textToCopy, copied : copied});
  },

  handlePaste(){
    var selected = this.state.selected;
    var cellKey = this.getColumns()[selected.idx].key;
    this.props.onCellCopyPaste({cellKey: cellKey , rowIdx: selected.rowIdx, value : this.state.textToCopy, fromRow : this.state.copied.rowIdx, toRow : selected.rowIdx});
    this.setState({copied : null});
  }
}

module.exports = CopyPasteGridMixin;
