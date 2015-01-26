/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React                   = require('react');
var PropTypes               = React.PropTypes;
var BaseGrid                = require('../../Grid');
var CopyableCell            = require('../cells/CopyableCell');
var SelectableGridMixin     = require('./mixins/SelectableGridMixin');
var CopyPasteGridMixin      = require('./mixins/CopyPasteGridMixin');

var CopyPasteGrid = React.createClass({

  mixins : [SelectableGridMixin, CopyPasteGridMixin],

  render: function() {
    var cellRenderer = (
      <CopyableCell
        selected={this.state.selected}
        copied={this.state.copied}
        onSelect={this.onSelect}
        onClick={this.onSelect}
        handleCopy={this.handleCopy}
        handlePaste={this.handlePaste}
        />
    );
    return (
      <BaseGrid {...this.props} cellRenderer={cellRenderer} />
    )
  }
})


module.exports = CopyPasteGrid;
