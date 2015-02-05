/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React              = require('react/addons');
var cx             = React.addons.classSet;

var FilterableHeaderCell = React.createClass({displayName: "FilterableHeaderCell",

  getInitialState:function(){
    return {filterTerm : ''}
  },

  handleChange:function(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({filterTerm : e.currentTarget.value});
    this.props.onChange({filterTerm : e.currentTarget.value, columnKey : this.props.column.key});
  },

  componentDidUpdate:function(){
    this.getDOMNode().focus();
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "form-group"}, 
          React.createElement(this.renderInput, null)
        )
      )
    );
  },

  renderInput : function(){
    if(this.props.column.filterable === false){
      return React.createElement("span", null);
    }else{
      return (React.createElement("input", {type: "text", className: "form-control input-sm", placeholder: "Search", value: this.state.filterTerm, onChange: this.handleChange}))
    }

  }
});

module.exports = FilterableHeaderCell;
