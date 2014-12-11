/**
 * @jsx React.DOM
 */
var Grid = require('../../lib/addons/grids/GridWithKeyboardNav');

var React = require('react');

'use strict';

var columns = [
  {
    key: 'id',
    name: 'ID',
    width: '20%'
  },
  {
    key: 'title',
    name: 'Title'
  },
  {
    key: 'count',
    name: 'Count',
    width: '20%'
  },
]

var rows = function(start, end) {
  var result = []
  for (var i = start; i < end; i++) {
    result.push({
      id: i,
      title: 'Title ' + i,
      count: i * 1000
    });
  }
  return result;
}




var Component = React.createClass({
  render: function() {
    return (
      <div>
        <div className="well well-lg" >
          <p>This shows a grid with full keyboard navigation. </p>
        </div>
        <Grid
        columns={columns}
        length={1000}
        rows={rows}/>
      </div>);
  }
});
module.exports = Component;
