/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var EditableCellMixin = require('./mixins/EditableCellMixin');
var BaseCell       = require('../Cell');
var PropTypes = React.PropTypes;

var EditableCell = React.createClass({

  propTypes : {
      onCommit : PropTypes.func.isRequired
  },

  mixins : [EditableCellMixin],

  render: function() {
    var selected = this.isSelected();

    var className = cx({
      'editing' : this.isActive(),
      'selected' : selected
      });

    return this.transferPropsTo(
      <BaseCell
        tabIndex={-1}
        ref="cell"
        className={className}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        formatter={this.getFormatter()}
        />
    )
  }

})

module.exports = EditableCell;
