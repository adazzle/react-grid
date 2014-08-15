/**
 * @jsx React.DOM
 */
var Grid = require('../lib/addons/CopyPasteGrid');

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


var component = React.createClass({
  render: function() {
    return (
      <div>
        <div className="well well-lg" >
          <p>This shows a grid with fixed width columns and the first column frozen.</p>
          <p>In this example, we set the width of the grid's container div to 1000px, but have columns of 1200px, so you will always see the horizontal scrollbar.</p>
          <p>Alternatively, leave off the width on your container and the grid will use 100% of the window width, meaning your scrollbar will depend on your screen dimensions</p>
        </div>
        <div>
        <Grid
        columns={columns}
        length={1000}
        rows={rows} /></div>
      </div>);
  }
});
module.exports = component;
