/**
 * @jsx React.DOM
 */
var Grid = require('../lib/addons/grids/EditableGrid');
var DropDownEditor = require('../lib/addons/editors/DropDownEditor');
var CheckboxEditor = require('../lib/addons/editors/CheckboxEditor');
var React = require('react');
var cx = React.addons.classSet;

'use strict';
var developers = ['Conor','Curtis','Danny','Joao','Mo','Rich'];

var TrueFalseFormatter = React.createClass({
  render : function(){
    var className = cx({
      'glyphicon' : true,
      'glyphicon-ok' : this.props.value === true,
      'glyphicon-remove' : this.props.value === false

    })

    return (<span className={className}></span>)
  }
});



var EpicFormatter

var columns = [
{
  key: 'taskComplete',
  name: 'Complete',
  formatter : TrueFalseFormatter,
  width : '5%'
},
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
    editor : <DropDownEditor options={developers} />
  },
  {
    key: 'count',
    name: 'Count',
    width: '10%'
  },
]

var getRows = function(start, end) {
  var result = []
  for (var i = start; i < end; i++) {
    result.push({
      taskComplete : false,
      id: i,
      userStory: 'User Story ' + i,
      developer : developers[i%6],
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
          <p>This shows a grid with editing capabilities as well as keyboard navigation.</p>
          <p>A cell can be configured editable by either setting column.editable == true. In this instance, the editor will default to a SimpleTextEditor as in the User Story column</p>
          <p>Alternatively, you can specify column.editor and pass it a valid React component that either implements the Editor Mixin or wraps one of the default editors. The Developer Column wraps the DropDownEditor and passes its available options as children</p>
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
