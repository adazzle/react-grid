/**
 * @jsx React.DOM
 */
(function(){
  var Grid                = ReactGrid.Grid;
  var Editors             = ReactGrid.GridAddons.Editors;
  var Toolbar             = ReactGrid.GridAddons.Toolbar;
  var AutoCompleteEditor  = Editors.AutoComplete;
  var DropDownEditor      = Editors.DropDownEditor;
  var cx                  = React.addons.classSet;
  var cloneWithProps      = React.addons.cloneWithProps;

  var developers = ['Conor','Curtis','Danny','Joao','Mo','Rich'];
  var epics = [{id : 0, title : 'Unification Of Media'}, { id : 1, title : 'Trading Desk'}, { id : 2, title : 'Tech Costs'}, { id : 3, title : 'Tactical'}, { id : 4, title : 'Barter'}, { id : 5, title :'Lego'}, {id : 6, title : 'Media Plan'}, {id : 7, title : 'Infrastructure'}];

  var columns = [
    {
      key: 'id',
      name: 'ID',
      width : 80
    },
    {
      key: 'userStory',
      name: 'User Story',
      editable : true,
      sortable : true,
      resizeable : true,
      showCellControls : true,
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
      sortable : true,
      resizeable : true
    },
    {
      key: 'epic',
      name: 'Epic',
      editor : <AutoCompleteEditor options={epics}/>,
      sortable : true
    }

  ]

  var getRows = function(start, end) {
    var result = []
    for (var i = start; i < end; i++) {
      result.push({
        id: i,
        userStory: 'User Story ' + i,
        developer : developers[i%6],
        epic : epics[i%8].title
      });
    }
    return result;
  }


 var Component = React.createClass({displayName: 'component',

    getInitialState : function(){
      return {rows : getRows(0, 1000)};
    },

    handleRowUpdated : function(commit){
      //merge the updated row values with the existing row
      var rows = this.state.rows;
      var updatedRow = React.addons.update(rows[commit.rowIdx], {$merge : commit.updated});
      rows[commit.rowIdx] = updatedRow;
      this.setState({rows:rows});
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

    handleCellCopyPaste : function(e){
      var rows = this.state.rows;
      rows[e.toRow][e.cellKey] = e.value;
      this.setState({rows:rows});
    },

    handleAddRow : function(e){
      var newRow = {
        id: e.newRowIndex,
        userStory: '',
        developer : '',
        epic : ''};
        var rows = React.addons.update(this.state.rows, {$push : [newRow]});
        this.setState({rows : rows});
    },
    render: function() {
      return (
            <Grid
              enableCellSelect={true}
              columns={columns}
              rows={this.state.rows}
              onRowUpdated={this.handleRowUpdated}
              onCellsDragged={this.handleCellDrag}
              onCellCopyPaste={this.handleCellCopyPaste}
              toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
              />
      );
    }
  });

  if(typeof module !== 'undefined' && module.exports){
    module.exports = Component;
  }else{
    this.ExcelGrid = Component;
  }


}).call(this);
