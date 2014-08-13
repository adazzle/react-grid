/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var EditorMixin = require('./EditorMixin');

var SimpleTextEditor = React.createClass({

  mixins : [EditorMixin],

  PropTypes : {
    value : React.PropTypes.bool.isRequired
  },

  render(){
    var style = {
      height: this.props.height
    }
    return (<input type="checkbox" value={this.state.value}  onKeyDown={this.onKeyDown}/>);
  },

  beforeCommit(e){
    var checked = e.currentTarget.checked;
    this.setState({value : !checked});
  },

  checkFocus(){
    this.getDOMNode().focus();
  }

});

module.exports = SimpleTextEditor;
