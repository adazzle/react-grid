/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var SelectableCellMixin = require('./SelectableCellMixin');
var BaseCell       = require('../Cell');
var MixinHelper = require('./utils/MixinHelper')

var SimpleEditor = React.createClass({

  getDefaultProps() {
    return {
      height : 35
    }
  },

  render(){
    var style = {
      height: this.props.height
    }
    return (<input defaultValue={this.props.value} style={style}/>);
  },

  componentDidMount: function() {
    this.checkFocus();
  },

  componentDidUpdate: function() {
    this.checkFocus();
  },

  checkFocus: function() {
      this.getDOMNode().focus();
  }

});



var EditableCellMixin = MixinHelper.mix(SelectableCellMixin,{

  someFunction : function(){

  },

  onClick: function() {
    console.log("editor")
  },

  onKeyDown: function(e) {
    console.log("on key down editor");
  }
}, ['onClick', 'onKeyDown']);



var EditableCell = React.createClass({

  mixins : [EditableCellMixin],

  canEdit(){
    return this.props.column.editor || this.props.column.editable;
  },

  isEditing(){
    return this.isSelected() && this.canEdit();
  },

  getEditor(){
    if(React.isValidComponent(this.props.column.editor)){
      //return custom column editor or SimpleEditor if none specified
      return this.props.column.editor;
    }else{
      return cloneWithProps(SimpleEditor(), {height : this.props.height});
    }
  },

  getFormatter(){
    var col = this.props.column;
    if(this.isEditing()){
      return this.getEditor();
    }else{
      return this.props.column.formatter;
    }
  },

  render: function() {
    var selected = this.isSelected();

    var className = cx({
      'editing' : this.isEditing(),
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
