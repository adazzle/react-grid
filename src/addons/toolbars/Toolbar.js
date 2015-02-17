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

  getDefaultProps(){
    return {
      enableAddRow : true
    }
  },

  getAddRowButton(){
    if(this.props.enableAddRow){
      return(<button type="button" className="btn" onClick={this.onAddRow}>
        Add Row
      </button>)
    }
  },

  render(){
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
