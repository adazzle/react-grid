/* @flow */
/**
* @jsx React.DOM

*/
'use strict';

var React = require('react/addons');
var ExcelRow = require('../rows/ExcelRow');

var Toolbar = React.createClass({
  propTypes: {
    onAddRow : React.PropTypes.func.isRequired,
    onToggleFilter : React.PropTypes.func.isRequired,
    numberOfRows : React.PropTypes.number.isRequired
  },
  onAddRow(){
    if(this.props.onAddRow){
      this.props.onAddRow({newRowIndex : this.props.numberOfRows});
    }
  },

  getDefaultProps(): {enableAddRow: boolean}{
    return {
      enableAddRow : true
    }
  },

  getAddRowButton(): ReactElement{
    if(this.props.enableAddRow){
      return(<button type="button" className="btn" onClick={this.onAddRow}>
        Add Row
      </button>)
    }
  },

  render(): ?ReactElement{
    return (
      <div className="react-grid-Toolbar">
        <div className="tools">
          {this.getAddRowButton()}
          <button type="button" className="btn" onClick={this.props.onToggleFilter}>
            Filter Rows
          </button>
        </div>
      </div>)
      }
});

module.exports = Toolbar;
