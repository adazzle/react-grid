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
    rows : React.PropTypes.arrayOf(React.PropTypes.shape(ExcelRow)).isRequired
  },
  onAddRow(){
    if(this.props.onAddRow){
      this.props.onAddRow({newRowIndex : this.props.rows.length});
    }
  },

  render(): ?ReactElement{
    return (
      <div className="react-grid-Toolbar">
        <div className="tools">
          <button type="button" className="btn" onClick={this.onAddRow}>
            Add Row
          </button>
          <button type="button" className="btn" onClick={this.props.onToggleFilter}>
            Filter Rows
          </button>
        </div>
      </div>)
      }
});

module.exports = Toolbar;
