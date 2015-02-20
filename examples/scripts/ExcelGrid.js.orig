/**
 * @jsx React.DOM
 */
(function(){
  var Grid                = ReactGrid.Grid;
  var Editors             = ReactGrid.Editors;
  var Toolbar             = ReactGrid.Toolbar;
  var AutoCompleteEditor  = Editors.AutoComplete;
  var DropDownEditor      = Editors.DropDownEditor;
  var cx                  = React.addons.classSet;
  var cloneWithProps      = React.addons.cloneWithProps;
  var FakeObjectDataStoreList = require('./FakeObjectDataStoreList');
  var developers = ['Conor','Curtis','Danny','Joao','Mo','Rich'];
  var epics = [{id : 0, title : 'Unification Of Media'}, { id : 1, title : 'Trading Desk'}, { id : 2, title : 'Tech Costs'}, { id : 3, title : 'Tactical'}, { id : 4, title : 'Barter'}, { id : 5, title :'Lego'}, {id : 6, title : 'Media Plan'}, {id : 7, title : 'Infrastructure'}];

  var columns = [
    {
      key: 'id',
      name: 'ID',
      width : 80
    },
    {
      key: 'avartar',
      name: 'Avartar',
      width : 200

    },
    {
      key: 'city',
      name: 'City',
      editable:true,
      width : 200
    },
    {
      key: 'email',
      name: 'Email',
      editable:true,
      width : 200
    },
    {
      key: 'firstName',
      name: 'First Name',
      editable:true,
      width : 200
    },
    {
      key: 'lastName',
      name: 'Last Name',
      editable:true,
      width : 200
    },
    {
      key: 'street',
      name: 'Street',
      editable:true,
      width : 200
    },
    {
      key: 'zipCode',
      name: 'ZipCode',
      editable:true,
      width : 200
    },
    {
      key: 'date',
      name: 'Date',
      editable:true,
      width : 200
    },
    {
      key: 'bs',
      name: 'bs',
      editable:true,
      width : 200
    },
    {
      key: 'catchPhrase',
      name: 'Catch Phrase',
      editable:true,
      width : 200
    },
    {
      key: 'companyName',
      name: 'Company Name',
      editable:true,
      width : 200
    },
    {
      key: 'words',
      name: 'Words',
      editable:true,
      width : 200
    },
    {
      key: 'sentence',
      name: 'Sentence',
      editable:true,
      width : 200
    }
  ]

 var Component = React.createClass({displayName: 'component',

    getInitialState : function(){
      return {rows : FakeObjectDataStoreList.getRows(1000)};
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
              enableRowSelect={true}

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
