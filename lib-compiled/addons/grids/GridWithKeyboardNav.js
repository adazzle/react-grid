/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = require('react');
var PropTypes           = React.PropTypes;
var BaseGrid            = require('../../Grid');
var SelectableGridMixin = require('./mixins/SelectableGridMixin');
var SelectableCell      = require('../cells/SelectableCell');

var GridWithKeyboardNav = React.createClass({displayName: "GridWithKeyboardNav",

  mixins : [SelectableGridMixin],

  render: function() {
    var cellRenderer = (
      React.createElement(SelectableCell, {
        selected: this.state.selected, 
        onSelect: this.onSelect, 
        onClick: this.onSelect}
        )
    );
    return (
      React.createElement(BaseGrid, React.__spread({},  this.props, {cellRenderer: cellRenderer}))
    )
  }
})


module.exports = GridWithKeyboardNav;
