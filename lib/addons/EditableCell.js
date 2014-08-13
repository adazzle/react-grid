/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var EditableCellMixin = require('./EditableCellMixin');
var BaseCell       = require('../Cell');
var SimpleTextEditor = require('./editors/SimpleTextEditor');
var PropTypes = React.PropTypes;

var EditableCell = React.createClass({

  propTypes : {
      onCommit : PropTypes.func.isRequired
  },

  mixins : [EditableCellMixin],


  onCommit(newValue){
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    this.props.onCommit({key: this.props.column.key, rowIdx: rowIdx, value : newValue});
  },


  getEditor(){
    var editorProps = {height : this.props.height, onCommit : this.onCommit, initialKeyCode : this.props.selected.initialKeyCode};
    if(React.isValidComponent(this.props.column.editor)){
      //return custom column editor or SimpleEditor if none specified
      return cloneWithProps(this.props.column.editor, editorProps);
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
