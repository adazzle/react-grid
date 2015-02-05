/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                = require('react/addons');
var BaseCell             = require('../../Cell');
var SelectableMixin      = require('./mixins/SelectableMixin');
var EditableMixin        = require('./mixins/EditableMixin');
var CopyableMixin        = require('./mixins/CopyableMixin');
var DraggableMixin       = require('./mixins/DraggableMixin');
var MixinHelper          = require('../utils/MixinHelper');
var KeyboardHandlerMixin = require('./mixins/KeyboardHandlerMixin');
var isFunction           = require('../utils/isFunction');
var PropTypes            = React.PropTypes;
var cx                   = React.addons.classSet;
var cloneWithProps       = React.addons.cloneWithProps;



var CellControls = React.createClass({displayName: "CellControls",

  onClickEdit : function(e){
    e.stopPropagation();
    e.preventDefault();
    this.props.onClickEdit();
  },

  onShowMore : function(e){
    e.stopPropagation();
    e.preventDefault();
    var newHeight = this.props.column.getExpandedHeight(this.props.value);
    this.props.onShowMore(this.props.rowIdx, newHeight);
  },

  onShowLess : function(e){
    e.stopPropagation();
    e.preventDefault();
    this.props.onShowLess(this.props.rowIdx);
  },

  shouldComponentUpdate:function(nextProps, nextState){
    return this.props.height != nextProps.height;
  },

  renderShowMoreButton:function(){
    if(isFunction(this.props.column.getExpandedHeight) && this.props.column.getExpandedHeight(this.props.value) > 0){
      var newHeight = this.props.column.getExpandedHeight(this.props.value);
      if(newHeight > this.props.height){
        return React.createElement("button", {type: "button", className: "btn btn-link btn-xs", onClick: this.onShowMore}, "Show More")
      }else{
        return React.createElement("button", {type: "button", className: "btn btn-link btn-xs", onClick: this.onShowLess}, "Show Less")
      }
    }else{
      return null;
    }
  },

  render : function(){
    return (React.createElement("div", {className: "pull-right btn-group"}, 
              this.renderShowMoreButton, 
              React.createElement("button", {onClick: this.onClickEdit, type: "button", className: "btn btn-link btn-xs"}, "Edit")
            ))
  }

})


var ExcelCell = React.createClass({displayName: "ExcelCell",

  mixins : [EditableMixin, CopyableMixin, DraggableMixin],

  overrides : {
    getCellClass : function(){
      return cx({
        'selected' : this.isSelected() && !this.isCopied() && !this.isActive(),
        'editing' : this.isActive(),
        'copied' : this.isCopied(),
        'selected-draggable' : this.isSelected() && !this.isActive() && this.canEdit(),
        'active-drag-cell' : this.isActiveDragCell() && this.canEdit(),
        'is-dragged-over-up' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < this.props.dragged.rowIdx,
        'is-dragged-over-down' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > this.props.dragged.rowIdx,
        'was-dragged-over' : this.wasDraggedOver() && this.canEdit()
      });
    }
  },

  isActiveDragCell : function(){
    return (this.isSelected() || this.isDraggedOver()) && !this.isActive();
  },

  isExpanded : function(){
    var isExpanded = false;
    if(isFunction(this.props.column.getExpandedHeight) && this.props.column.getExpandedHeight(this.props.value) > 0){
      var newHeight = this.props.column.getExpandedHeight(this.props.value);
      if(this.props.height >= newHeight){
        isExpanded = true;
      }else{
        isExpanded = false;
      }
    }
    return isExpanded;
  },


  shouldComponentUpdate:function(nextProps, nextState) {
    return this.props.column.width !== nextProps.column.width
    || this.props.value !== nextProps.value
    || this.props.height !== nextProps.height
    || this.props.rowIdx !== nextProps.rowIdx
    || this.isCellSelectionChanging(nextProps)
    || this.isDraggedCellChanging(nextProps);
  },


  render: function() {
    return (
      React.createElement(BaseCell, React.__spread({}, 
        this.props, 
        {className: this.getCellClass(), 
        onKeyDown: this.onKeyDown, 
        onClick: this.onClick, 
        onDoubleClick: this.onDoubleClick, 
        formatter: this.getFormatter(), 
        handleDragStart: this.handleDragStart, 
        onDragEnter: this.handleDragEnter, 
        onDragEnd: this.props.handleDragEnd, 
        cellControls: this.props.column.showCellControls && !this.isActive() ? React.createElement(CellControls, {height: this.props.height, value: this.props.value, rowIdx: this.props.rowIdx, column: this.props.column, onShowMore: this.props.onShowMore, onShowLess: this.props.onShowLess, onClickEdit: this.setActive}) : null, 
        isExpanded: this.isExpanded()})
      ))
  }

})

module.exports = ExcelCell;
