/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React              = require('react/addons');

var SortableHeaderCell = React.createClass({

  onClick: function() {
    this.props.column.sortBy(
      this.props.column,
      this.props.column.sorted);
  },

  render: function() {
    var sorted = this.props.column.sorted;
    return (
      <div
        onClick={this.onClick}
        style={{cursor: 'pointer'}}>
        {this.props.column.name}
        <span style={{position: 'absolute', right: 8}}>
          {sorted ?
            ' ' + (sorted === 'asc' ? '↓' : '↑') :
            ''}
        </span>
      </div>
    );
  }
});
