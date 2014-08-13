/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var EditableCellMixin = require('./mixins/EditableCellMixin');
var BaseCell       = require('../Cell');
var SimpleTextEditor = require('./editors/SimpleTextEditor');
var PropTypes = React.PropTypes;

var EditableCell = React.createClass({

  propTypes : {
      onCommit : PropTypes.func.isRequired
  },

  mixins : [EditableCellMixin],


  onCommit(commit){
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    this.props.onCommit({cellKey: this.props.column.key, rowIdx: rowIdx, value : commit.value, keyCode : commit.key});
  },


  getEditor(){
    var editorProps = {height : this.props.height, onCommit : this.onCommit, initialKeyCode : this.props.selected.initialKeyCode};
    var customEditor = this.props.column.editor;
    if(customEditor && React.isValidComponent(customEditor())){
      //return custom column editor or SimpleEditor if none specified
      return cloneWithProps(customEditor(), editorProps);
    }else{
      return cloneWithProps(SimpleTextEditor(), editorProps);
    }
  },

  getFormatter(){
    var col = this.props.column;
    if(this.isActive()){
      return this.getEditor();
    }else{
      return this.props.column.formatter;
    }
  },

  render: function() {
    var selected = this.isSelected();

    var className = cx({
      'editing' : this.isActive(),
      'selected' : selected
      });

    return this.transferPropsTo(
      <BaseCell
        tabIndex={-1}
        ref="cell"
        className={className}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        formatter={this.getFormatter()}
        />
    )
  }

})

module.exports = EditableCell;