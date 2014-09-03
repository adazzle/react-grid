/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React              = require('react/addons');
var cx             = React.addons.classSet;

var FilterableHeaderCell = React.createClass({

  onClick: function() {
    this.props.column.sortBy(
      this.props.column,
      this.props.column.sorted);
  },

  render: function() {

    return (
      <div>
        <div className="form-group">
            <input type="text" className="form-control input-sm" placeholder="Search"/>
        </div>
      </div>
    );
  }
});

module.exports = FilterableHeaderCell;
