/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;

var CheckBoxEditor = React.createClass({


  PropTypes : {
    value : React.PropTypes.bool.isRequired
  },

  render(){
    return (<input type="checkbox" checked={this.props.value} onChange={this.handleChange} />);
  },

  handleChange(e){
    this.props.column.onRowSelect(this.props.rowIdx)
  }

});

module.exports = CheckBoxEditor;
