/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;

var CheckBoxEditor = React.createClass({displayName: "CheckBoxEditor",


  PropTypes : {
    value : React.PropTypes.bool.isRequired
  },

  render:function(){
    return (React.createElement("input", {type: "checkbox", checked: this.props.value, onChange: this.handleChange}));
  },

  handleChange:function(e){
    this.props.column.onRowSelect(this.props.rowIdx)
  },

  shouldComponentUpdate:function(nextProps, nextState){
    return this.props.value != nextProps.value;
  }

});

module.exports = CheckBoxEditor;
