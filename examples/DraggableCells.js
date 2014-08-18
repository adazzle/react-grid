/**
 * @jsx React.DOM
 */
var Grid = require('../lib/addons/DraggableCellGrid');
var React = require('react');
var cx = React.addons.classSet;

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

var getRows = function(start, end) {
  var result = []
  for (var i = start; i < end; i++) {
    result.push({
      id: i,
      title: 'Title ' + i,
      count: i * 1000
    });
  }
  return result;
};


var component = React.createClass({

  getInitialState : function(){
    return {rows : getRows(0, 1000)};
  },

  handleCellDrag : function(e){
      var rows = this.state.rows;
      for (var i = e.initialRowIdx; i <= e.lastRowIdx; i++){
        var rowToChange = rows[i];
        if(rowToChange){
          rowToChange[e.cellKey] = e.value;
        }
      }
      this.setState({rows:rows});
  },

  render: function() {
    return (
      <div>
        <div className="well well-lg" >
          <p>This shows a grid with copy/paste functionlity and keyboard navigation.</p>
          <p>Hold Ctrl + C to copy a cells contents and Ctrl + V to paste</p>

        </div>
        <div>
        <Grid
        columns={columns}
        length={1000}
        rows={this.state.rows}
        onCellsDragged={this.handleCellDrag} /></div>
      </div>);
  }
});
module.exports = component;
