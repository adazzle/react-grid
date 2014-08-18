/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var BaseCell       = require('../../Cell');
var SelectableCellMixin = require('./SelectableCell').Mixin;


var DraggableCell = React.createClass({

  propTypes : {
    handleCopy : React.PropTypes.func.isRequired,
    handlePaste : React.PropTypes.func.isRequired
  },

  mixins : [SelectableCellMixin],

  getCellClass(){
    return cx({
      'selected-draggable' : this.isSelected()
    });
  },

  render: function() {

    return this.transferPropsTo(
      <BaseCell
        tabIndex={-1}
        ref="cell"
        className={this.getCellClass()}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        />
    )
  }

})

module.exports = DraggableCell;
