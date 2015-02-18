/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                = require('react/addons');
var BaseCell             = require('../../fixedDataGrid/FixedDataTableCell.react');
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

  shouldComponentUpdate(nextProps, nextState){
    return this.props.height != nextProps.height;
  },

  renderShowMoreButton(){
    if(isFunction(this.props.column.getExpandedHeight) && this.props.column.getExpandedHeight(this.props.value) > 0){
      var newHeight = this.props.column.getExpandedHeight(this.props.value);
      if(newHeight > this.props.height){
        return <button type="button" className="btn btn-link btn-xs" onClick={this.onShowMore}>Show More</button>
      }else{
        return <button type="button" className="btn btn-link btn-xs" onClick={this.onShowLess}>Show Less</button>
      }
    }else{
      return null;
    }
  },

  render : function(){
    return (<div className="pull-right btn-group">
              {this.renderShowMoreButton()}
              <button onClick={this.onClickEdit} type="button" className="btn btn-link btn-xs">Edit</button>
            </div>)
  }

})



var ExcelCell = React.createClass({

  mixins : [EditableMixin, CopyableMixin, DraggableMixin],

  render: function() {
    return (
      <BaseCell
        {...this.props}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
      />)
  }

})

module.exports = ExcelCell;
