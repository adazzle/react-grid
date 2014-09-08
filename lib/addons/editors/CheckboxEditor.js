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
    return (<input type="checkbox" defaultValue={this.props.value}  />);
  },

  onBeforeEnter(e){
    var isChecked = JSON.parse(this.getValue());
    this.setValue(!isChecked);
  },

  handleCustomKeyDown : function(e){
    e.stopPropagation();
    e.preventDefault();
  }

});

module.exports = CheckBoxEditor;
