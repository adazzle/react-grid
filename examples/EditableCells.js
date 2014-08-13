/**
 * @jsx React.DOM
 */
var Grid = require('../lib/addons/EditableGrid');
var DropDownEditor = require('../lib/addons/editors/DropDownEditor');
var CheckboxEditor = require('../lib/addons/editors/CheckboxEditor');
var React = require('react');

'use strict';
var developers = ['Conor','Curtis','Danny','Joao','Mo','Rich'];

var DeveloperDropDown = React.createClass({

  render : function(){
    var devs = [];
    developers.forEach(function(name){
      devs.push(<option key={name} value={name}>{name}</option>);
    });
    return (
      this.transferPropsTo(<DropDownEditor>
        {devs}
      </DropDownEditor>)
    )
  }
});



var EpicFormatter

var columns = [
  {
    key: 'id',
    name: 'ID',
    width: '5%',
  },
  {
    key: 'userStory',
    name: 'User Story',
    editable : true
  },
  {
    key: 'developer',
    name: 'Developer',
    editor : DeveloperDropDown
  },
  {
    key: 'taskComplete',
    name: 'Task Complete',
    editor : CheckboxEditor,
    width : '5%'
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
      userStory: 'User Story ' + i,
      developer : developers[i%6],
      taskComplete : false,
      count: i * 1000
    });
  }
  return result;
}


var component = React.createClass({

  getInitialState : function(){
    return {rows : getRows(0, 1000)};
  },

  updateCell : function(commit){
      var rows = this.state.rows;
      var rowToChange = rows[commit.rowIdx];
      if(rowToChange){
        rowToChange[commit.cellKey] = commit.value;
        this.setState({rows:rows});
      }
  },

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
        rows={this.state.rows}
        onCellChanged={this.updateCell} /></div>
      </div>);
  }
});
module.exports = component;
