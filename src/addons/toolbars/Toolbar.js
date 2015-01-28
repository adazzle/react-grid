/**
* @jsx React.DOM
* @copyright Prometheus Research, LLC 2014
*/
'use strict';

var React                   = require('react/addons');
var Toolbar = React.createClass({

  onAddRow(){
    if(this.props.onAddRow){
      this.props.onAddRow({newRowIndex : this.props.rows.length});
    }
  },

  render(){
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