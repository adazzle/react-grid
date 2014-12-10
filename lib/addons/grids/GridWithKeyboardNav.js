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

var GridWithKeyboardNav = React.createClass({

  mixins : [SelectableGridMixin],

  render: function() {
    var cellRenderer = (
      <SelectableCell
        selected={this.state.selected}
        onSelect={this.onSelect}
        onClick={this.onSelect}
        />
    );
    return (
      <BaseGrid {...this.props} cellRenderer={cellRenderer} />
    )
  }
})


module.exports = GridWithKeyboardNav;
