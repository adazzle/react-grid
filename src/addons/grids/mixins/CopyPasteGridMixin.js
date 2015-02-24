/* TODO@flow mixins */
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

  getInitialState: function(): { copied: ?{idx: number; rowIdx: number} } {
    return {copied : null };
  },
  copyPasteEnabled: function(): boolean {
    return this.props.onCellCopyPaste !== null;
  },

  handleCopy(args: {value: string}){
    if(!this.copyPasteEnabled()) { return; }
    var textToCopy = args.value;
    var selected = this.state.selected;
    var copied = {idx : selected.idx, rowIdx : selected.rowIdx};
    this.setState({textToCopy:textToCopy, copied : copied});
  },

  handlePaste(){
    if(!this.copyPasteEnabled()) { return; }
    var selected = this.state.selected;
    var cellKey = this.getColumns()[selected.idx].key;
    if(this.props.onCellCopyPaste) { this.props.onCellCopyPaste({cellKey: cellKey , rowIdx: selected.rowIdx, value : this.state.textToCopy, fromRow : this.state.copied.rowIdx, toRow : selected.rowIdx}); }
    this.setState({copied : null});

  }
}

module.exports = CopyPasteGridMixin;
