/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var BaseCell       = require('../Cell');
var EditableCellMixin = require('./mixins/EditableCellMixin');

var CopyKeyCode = 99;

var CopyableCell = React.createClass({

  mixins : [EditableCellMixin],

  isCopied : function(){
    return (
      this.props.copied
      && this.props.copied.rowIdx === this.props.rowIdx
      && this.props.copied.idx === this.props.idx
    );
  },

  copy : function(){
    console.log('dsfdsfsd')
  },

  render: function() {
    var className = cx({
      'selected' : this.isSelected() && !this.isCopied(),
      'copied' : this.isCopied()
    });
    return this.transferPropsTo(
      <BaseCell
        tabIndex={-1}
        ref="cell"
        className={className}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        onCopy={this.copy}
        />
    )
  }

})

module.exports = CopyableCell;
