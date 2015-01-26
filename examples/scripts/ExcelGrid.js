/**
 * @jsx React.DOM
 */
(function(){
  var React = (typeof window !== "undefined" && window.React) ? window.React : require('react');
  var ReactGrid = (typeof window !== "undefined" && window.ReactGrid) ? window.ReactGrid.WithAddons : require('../../addons');
  var Editors =  (typeof window !== "undefined" && window.ReactGrid) ? window.ReactGrid.Editors : require('../../editors');
  var Formatters = (typeof window !== "undefined" && window.ReactGrid) ? window.ReactGrid.Formatters : require('../../formatters');
  var CheckboxEditor      = Editors.CheckboxEditor;
  var AutoCompleteEditor  = Editors.AutoComplete;
  var DateRangeEditor     = Editors.DateRangeEditor;
  var DropDownEditor      = Editors.DropDownEditor;
  var DateRangeFormatter  = Formatters.DateRangeFormatter;
  var cx                  = React.addons.classSet;
  var cloneWithProps      = React.addons.cloneWithProps;

  var developers = ['Conor','Curtis','Danny','Joao','Mo','Rich'];
  var epics = [{id : 0, title : 'Unification Of Media'}, { id : 1, title : 'Trading Desk'}, { id : 2, title : 'Tech Costs'}, { id : 3, title : 'Tactical'}, { id : 4, title : 'Barter'}, { id : 5, title :'Lego'}, {id : 6, title : 'Media Plan'}, {id : 7, title : 'Infrastructure'}];

  var dateRanges  = {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }

  var columns = [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'userStory',
      name: 'User Story',
      editable : true,
      sortable : true,
      showCellControls : true,
      width : 200,
      getExpandedHeight : function(value){
        if(value === 'User Story 1'){
          return 60;
        }else{
          return null;
        }
      }
    },
    {
      key: 'developer',
      name: 'Developer',
      editor : <DropDownEditor options={developers}/>,
      width : 200,
      sortable : true
    },
    {
      key: 'epic',
      name: 'Epic',
      editor : <AutoCompleteEditor options={epics}/>,
      width : 200,
      sortable : true
    },
    {
      key: 'dateRange',
      name: 'Duration',
      editor : <DateRangeEditor ranges={dateRanges}/>,
      formatter : <DateRangeFormatter/>,
      width : 200,
      filterable : false
    }

  ]

  var getRows = function(start, end) {
    var result = []
    for (var i = start; i < end; i++) {
      result.push({
        id: i,
        userStory: 'User Story ' + i,
        developer : developers[i%6],
        epic : epics[i%8].title,

        dateRange: {startDate : '2013-01-01', endDate : '2013-02-01'}
      });
    }
    return result;
  }


 var Component = React.createClass({displayName: 'component',

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
        for (var i = e.fromRow; i <= e.toRow; i++){
          var rowToChange = rows[i];
          if(rowToChange){
            rowToChange[e.cellKey] = e.value;
          }
        }
        this.setState({rows:rows});
    },

    cancelSort:function(){
      this.render();
    },

    render: function() {
      return (
        <div>
          <div className="well well-lg" >
            <ReactGrid
              columns={columns}
              length={1000}
              rows={this.state.rows}
              onCellChanged={this.updateCell}
              onCellsDragged={this.handleCellDrag}
              />
            </div>
        </div>
      );
    }
  });

  if(typeof module !== 'undefined' && module.exports){
    module.exports = Component;
  }else{
    this.ExcelGrid = Component;
  }


}).call(this);
