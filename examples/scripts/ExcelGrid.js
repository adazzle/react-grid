/**
 * @jsx React.DOM
 */
(function(){
  var Grid                = ReactGrid.Grid;
  var Column              = ReactGrid.Column;
  var Editors             = ReactGrid.Editors;
  var Toolbar             = ReactGrid.Toolbar;
  var AutoCompleteEditor  = Editors.AutoComplete;
  var DropDownEditor      = Editors.DropDownEditor;
  var cx                  = React.addons.classSet;
  var cloneWithProps      = React.addons.cloneWithProps;
  var FakeObjectDataStoreList = require('./FakeObjectDataStoreList');
  var developers = ['Conor','Curtis','Danny','Joao','Mo','Rich'];
  var counties = [{id : 0, title : 'Bedfordshire'}, { id : 1, title : 'Berkshire'}, { id : 2, title : 'Buckinghamshire'}, { id : 3, title : 'Cambridgeshire'}, { id : 4, title : 'Cheshire'}, { id : 5, title :'Cornwall'}, {id : 6, title : 'Cumbria, (Cumberland)'}, {id : 7, title : 'Derbyshire'}, { id : 8, title :'Devon'}, { id : 9, title :'Dorset'},
   { id : 10, title :'Durham'},
   { id : 11, title :'Essex'},
   { id : 12, title :'Gloucestershire'},
   { id : 13, title :'Hampshire'},
   { id : 14, title :'Hertfordshire'},
   { id : 15, title :'Huntingdonshire'},
   { id : 16, title :'Kent'},
   { id : 17, title :'Lancashire'},
   { id : 18, title :'Leicestershire'},
   { id : 19, title :'Lincolnshire'},
   { id : 20, title :'Middlesex'},
   { id : 21, title :'Norfolk'},
   { id : 22, title :'Northamptonshire'},
   { id : 23, title :'Northumberland'},
   { id : 24, title :'Nottinghamshire'},
   { id : 25, title :'Northamptonshire'},
   { id : 26, title :'Oxfordshire'},
   { id : 27, title :'Northamptonshire'},
   { id : 28, title :'Rutland'},
   { id : 29, title :'Shropshire'},
   { id : 30, title :'Somerset'},
   { id : 31, title :'Staffordshire'},
   { id : 32, title :'Suffolk'},
   { id : 33, title :'Surrey'},
   { id : 34, title :'Sussex'},
   { id : 35, title :'Warwickshire'},
   { id : 36, title :'Westmoreland'},
   { id : 37, title :'Wiltshire'},
   { id : 38, title :'Worcestershire'},
   { id : 39, title :'Yorkshire'}]

var titles = ['Mr.', 'Mrs.', 'Miss', 'Ms.'];

  function renderImage(cellData) {
    var ImageFormatter = ReactGrid.Formatters.ImageFormatter;
    return <ImageFormatter src={cellData.value} />;
  }

  var columns = [
    Column({
      key: 'id',
      label: 'ID',
      width : 80
    }),
    Column({
      key: 'avatar',
      label: 'Avatar',
      width : 60,
      formatter : renderImage
    }),
    Column({
      key: 'county',
      label: 'County',
      editor: <AutoCompleteEditor options={counties}/>,
      width : 200
    }),
    Column({
      key: 'title',
      name: 'Title',
      editor : <DropDownEditor options={titles}/>,
      width : 200
    }),
    Column({
      key: 'firstName',
      name: 'First Name',
      editable:true,
      width : 200
    }),
    Column({
      key: 'lastName',
      name: 'Last Name',
      editable:true,
      width : 200
    }),
    Column({
      key: 'email',
      name: 'Email',
      editable:true,
      width : 200
    }),
    Column({
      key: 'street',
      name: 'Street',
      editable:true,
      width : 200
    }),
    Column({
      key: 'zipCode',
      name: 'ZipCode',
      editable:true,
      width : 200
    }),
    Column({
      key: 'date',
      name: 'Date',
      editable:true,
      width : 200
    }),
    Column({
      key: 'bs',
      name: 'bs',
      editable:true,
      width : 200
    }),
    Column({
      key: 'catchPhrase',
      name: 'Catch Phrase',
      editable:true,
      width : 200
    }),
    Column({
      key: 'companyName',
      name: 'Company Name',
      editable:true,
      width : 200
    }),
    Column({
      key: 'words',
      name: 'Words',
      editable:true,
      width : 200
    }),
    Column({
      key: 'sentence',
      label: 'Sentence',
      editable:true,
      width : 200
    })
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
              rowHeight={50}
              minHeight={600}
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
