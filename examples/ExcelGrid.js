/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var Grid = require('../lib/addons/grids/ExcelGrid');
var DropDownEditor = require('../lib/addons/editors/DropDownEditor');
var CheckboxEditor = require('../lib/addons/editors/CheckboxEditor');
var AutoCompleteEditor = require('../lib/addons/editors/AutoCompleteEditor');

'use strict';
var developers = ['Conor','Curtis','Danny','Joao','Mo','Rich'];
var epics = [{id : 0, title : 'Unification Of Media'}, { id : 1, title : 'Trading Desk'}, { id : 2, title : 'Tech Costs'}, { id : 3, title : 'Tactical'}, { id : 4, title : 'Barter'}, { id : 5, title :'Lego'}, {id : 6, title : 'Media Plan'}, {id : 7, title : 'Infrastructure'}];

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
    key: 'epic',
    name: 'Epic',
    editor : <AutoCompleteEditor options={epics} />
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
      epic : epics[i%8].title,
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
          <h4>Excel Style Grid</h4>
          <ul>
            <li>Keyboard navigation</li>
            <li>Editable cells</li>
            <li>Copy/Paste cells</li>
            <li>Cell Dragdown</li>
          </ul>
        </div>
        <div>
        <Grid
        columns={columns}
        length={1000}
        rows={this.state.rows}
        onCellChanged={this.updateCell}
        onCellsDragged={this.handleCellDrag}  /></div>
      </div>);
  }
});
module.exports = component;
