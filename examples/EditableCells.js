/**
 * @jsx React.DOM
 */
var Grid = require('../lib/addons/grids/EditableGrid');
var DropDownEditor      = require('../lib/addons/editors/DropDownEditor');
var CheckboxEditor      = require('../lib/addons/editors/CheckboxEditor');
var AutoCompleteEditor  = require('../lib/addons/editors/AutoCompleteEditor');
var DateRangeEditor     = require('../lib/addons/editors/DateRangeEditor');
var DateRangeFormatter  = require('../lib/addons/formatters/DateRangeFormatter');
var React = require('react');
var cx = React.addons.classSet;

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

var dateRanges  = {
         'Today': [moment(), moment()],
         'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
         'Last 7 Days': [moment().subtract('days', 6), moment()],
         'Last 30 Days': [moment().subtract('days', 29), moment()],
         'This Month': [moment().startOf('month'), moment().endOf('month')],
         'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
      }

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
    key: 'dateRange',
    name: 'Duration',
    formatter : <DateRangeFormatter/>,
    editor : <DateRangeEditor ranges={dateRanges}/>,
    width : '15%'
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
      dateRange: {startDate : '2013-01-01', endDate : '2013-02-01'}
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
