/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;

var SimpleTextEditor = React.createClass({

  getDefaultProps() {
    return {
      height : 35
    }
  },

  getInitialState(){
    var value = this.props.initialKeyCode ? String.fromCharCode(this.props.initialKeyCode) : this.props.value;
    return {value : value};
  },

  render(){
    var style = {
      height: this.props.height
    }
    return (<input type="text" value={this.state.value}  style={style}  onChange={this.onChange} />);
  },


  onChange(e){
    this.setState({value : e.value});
  },

   componentDidMount: function() {
    this.checkFocus();
  },

  checkFocus(){
    this.getDOMNode().select();
  }

});

module.exports = SimpleTextEditor;
