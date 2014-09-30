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



var CellControls = React.createClass({

  onClickEdit : function(e){
    e.stopPropagation();
    e.preventDefault();
    this.props.onClickEdit();
    console.log('edit');
  },

  onShowMore : function(e){
    e.stopPropagation();
    e.preventDefault();
    var newHeight = this.props.column.getExpandedHeight(this.props.value);
    console.log(this.props.rowIdx);
    console.log(newHeight);
    this.props.onShowMore(this.props.rowIdx, newHeight);
  },

  renderShowMoreButton(){
    if(isFunction(this.props.column.getExpandedHeight) && this.props.column.getExpandedHeight(this.props.value) > 0){
      return <button type="button" className="btn btn-link btn-xs" onClick={this.onShowMore}>Show More</button>
    }else{
      return null;
    }
  },

  render : function(){
    return (<div className="pull-right btn-group">
              <this.renderShowMoreButton/><button onClick={this.onClickEdit} type="button" className="btn btn-link btn-xs">Edit</button>
            </div>)
  }

})


var ExcelCell = React.createClass({

  mixins : MixinHelper.mix([KeyboardHandlerMixin, SelectableMixin, EditableMixin, DraggableMixin, CopyableMixin ]),

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


  render: function() {
    return this.transferPropsTo(
      <BaseCell
        className={this.getCellClass()}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
        formatter={this.getFormatter()}
        handleDragStart={this.handleDragStart}
        onDragEnter={this.handleDragEnter}
        onDragEnd={this.props.handleDragEnd}
        cellControls={this.props.column.showCellControls && !this.isActive() ? <CellControls value={this.props.value} rowIdx={this.props.rowIdx} column={this.props.column} onShowMore={this.props.onShowMore} onClickEdit={this.setActive}/> : null}
      />)
  }

})

module.exports = ExcelCell;
