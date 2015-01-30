(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var ExcelGrid = __webpack_require__(5);
	React.render(React.createElement(ExcelGrid, null), document.getElementById('excel-example'));


/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

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
	      editor : React.createElement(DropDownEditor, {options: developers}),
	      sortable : true,
	      resizeable : true
	    },
	    {
	      key: 'epic',
	      name: 'Epic',
	      editor : React.createElement(AutoCompleteEditor, {options: epics}),
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
	            React.createElement(Grid, {
	              columns: columns, 
	              rows: this.state.rows, 
	              onRowUpdated: this.handleRowUpdated, 
	              onCellsDragged: this.handleCellDrag, 
	              onCellCopyPaste: this.handleCellCopyPaste, 
	              toolbar: React.createElement(Toolbar, {onAddRow: this.handleAddRow})}
	              )
	      );
	    }
	  });

	  if(typeof module !== 'undefined' && module.exports){
	    module.exports = Component;
	  }else{
	    this.ExcelGrid = Component;
	  }


	}).call(this);


/***/ }

/******/ })
});
