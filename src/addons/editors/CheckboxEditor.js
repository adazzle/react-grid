/**
 * @jsx React.DOM
 
 * @flow
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;

var CheckBoxEditor = React.createClass({


  PropTypes : {
    value : React.PropTypes.bool.isRequired
  },

  render(){
    return (<input className="react-grid-CheckBox" type="checkbox" checked={this.props.value} onChange={this.handleChange} />);
  },

  handleChange(e){
    this.props.column.onRowSelect(this.props.rowIdx)
  },

  shouldComponentUpdate(nextProps, nextState){
    return this.props.value != nextProps.value;
  }

});

module.exports = CheckBoxEditor;
