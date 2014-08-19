/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var EditorMixins             = require('./EditorMixin');
var ReactAutocomplete = require('ron-react-autocomplete');

var options = [
  {id: 'banana', title: 'Banana'},
  {id: 'apple', title: 'Apple'},
  {id: 'pineapple', title: 'Pineapple'},
  {id: 'strawberry', title: 'Strawberry'}
]

var AutoCompleteEditor = React.createClass({

  render(){
    var style = {
      height: this.props.height
    }
    return ( <ReactAutocomplete options={options} />);
  }

});

module.exports = AutoCompleteEditor;
