/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React              = require('react/addons');
var cx             = React.addons.classSet;

var FilterableHeaderCell = React.createClass({

  getInitialState(){
    return {filterTerm : ''}
  },

  handleChange(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({filterTerm : e.currentTarget.value});
    this.props.onChange({filterTerm : e.currentTarget.value, columnKey : this.props.column.key});
  },

  componentDidUpdate(){
    this.getDOMNode().focus();
  },

  render: function() {
    var disabled = this.props.column.filterable === false ? true : false;
    return (
      <div>
        <div className="form-group">
            <input type="text" disabled={disabled} className="form-control input-sm" placeholder="Search" value={this.state.filterTerm} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
});

module.exports = FilterableHeaderCell;
