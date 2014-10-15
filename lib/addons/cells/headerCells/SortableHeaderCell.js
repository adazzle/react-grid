/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React              = require('react/addons');
var cx             = React.addons.classSet;

var SortableHeaderCell = React.createClass({

  onClick: function() {
    this.props.column.sortBy(
      this.props.column,
      this.props.column.sorted);
  },

  getSortByClass : function(){
    var sorted = this.props.column.sorted;
    return cx({
      'pull-right' : true,
      'glyphicon glyphicon-arrow-up' : sorted === 'ASC',
      'glyphicon glyphicon-arrow-down' : sorted === 'DESC'
    });
  },

  render: function() {

    return (
      <div
        onClick={this.onClick}
        style={{cursor: 'pointer'}}>
        {this.props.column.name}
        <span className={this.getSortByClass()}/>
      </div>
    );
  }
});

module.exports = SortableHeaderCell;
