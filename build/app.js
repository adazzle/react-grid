/******/ (function(modules) { // webpackBootstrap
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */
	"use strict";

	var React          = __webpack_require__(1);
	var Perf = React.addons.Perf;
	var perfStarted = false;

	//globally expose React
	//makes dev tools (among other things) work
	if(window) { window.React = window.React || React; }

	var components = [];
	//register our component examples
	//the files need to module.export a react component
	components.push({id:'Basic', module:__webpack_require__(2) });
	components.push({id:'Frozen Columns', module:__webpack_require__(3) });
	components.push({id:'Keyboard Nav', module:__webpack_require__(4) });
	components.push({id:'Editable Cells', module:__webpack_require__(5) });
	components.push({id:'Copyable Cells', module:__webpack_require__(6) });
	components.push({id:'Draggable Cells', module:__webpack_require__(7) });
	components.push({id:'Excel Style Grid', module:__webpack_require__(8) });
	components.push({id:'Immutable Data', module:__webpack_require__(9) });

	//creates a simple nav menu and viewer
	var Examples = React.createClass({displayName: 'Examples',

	 onMenuClick: function(Component) {
	   this.setState({exampleToShow: React.createElement(Component, null)});
	 },

	 getInitialState: function(){
	   return { exampleToShow: null, perfOn : false };
	 },

	 renderPerfTools : function(){
	   var startClass = this.state.perfOn === true ? 'btn btn-danger' : 'btn btn-default';
	   return (React.createElement("div", null, 
	               React.createElement("h5", null, React.createElement("b", null, "Performance Monitoring: Print Perf Info to Browser Console")), 
	                 React.createElement("span", {className: "btn-group"}, 
	                   React.createElement("button", {type: "button", className: startClass, onClick: this.startPerf}, React.createElement("span", {className: "glyphicon glyphicon-record"})), 
	                   React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.stopPerf}, React.createElement("span", {className: "glyphicon glyphicon-stop"}))
	                )
	            ))
	 },

	 startPerf: function(){
	   Perf.start();
	   this.setState({perfOn : true});
	 },

	 stopPerf: function(){
	   Perf.stop();
	   //Perf.printDOM();
	   Perf.printWasted();
	   //Perf.printInclusive();
	  // Perf.printExclusive();
	   this.setState({perfOn : false});
	 },

	 render: function() {
	   var detail =this.state.exampleToShow ? this.state.exampleToShow : '';
	   var perfTools = this.state.exampleToShow ? this.renderPerfTools() : '';
	  return (React.createElement("div", null, 
	            React.createElement("nav", {className: "navbar navbar-inverse navbar-static-top", role: "navigation"}, 
	              React.createElement("div", {className: "container-fluid"}, 
	                React.createElement(Menu, {onMenuClick: this.onMenuClick})
	              )
	            ), 
	            React.createElement("div", {className: "container-fluid"}, 
	            React.createElement("div", {clasName: "page-header"}, 
	              React.createElement("h1", null, "React Grid Examples"), 
	              React.createElement("p", null, "Unless otherwise stated these examples are all compiled using webpack and referencing the lib-compiled folder," + ' ' +
	                "which is the js-compiled folder that would be available when downloading ReactGrid from npm. For examples using standalone library, please see the ", React.createElement("a", {href: "./examples/dist-basic.html"}, "ReactGrid.js"), " and ", React.createElement("a", {href: "./examples/dist-addons.html"}, "ReactGrid.WithAddons.js"), " examples")
	            ), 
	            perfTools, 
	            detail
	          )
	          ))
	 },

	});
	//loops the components and puts out a menu item, wired to pass up the component
	var Menu = React.createClass({displayName: 'Menu',
	 render: function() {
	   var children = components.map(function(comp, idx) 
	     {return React.createElement(MenuItem, {
	       key: idx, 
	       id: comp.id, 
	       module: comp.module, 
	       onClick: this.props.onMenuClick});}.bind(this));
	   return (
	     React.createElement("ul", {className: "nav navbar-nav"}, children, 
	        React.createElement("li", null, React.createElement("a", {href: "./examples/dist-basic.html"}, "Dist- ReactGrid.js")), 
	        React.createElement("li", null, React.createElement("a", {href: "./examples/dist-addons.html"}, "Dist - ReactGrid.WithAddons.js"))
	     ));
	 },
	});

	var MenuItem = React.createClass({displayName: 'MenuItem',
	  handleClick: function() {
	    if (this.props.onClick) { this.props.onClick(this.props.module); }
	  },
	   render: function() {
	     return (React.createElement("li", {onClick: this.handleClick}, React.createElement("a", {href: "#"}, this.props.id)));
	   }

	 });

	 React.render(React.createElement(Examples, null), document.body);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */
	(function(){

	  var React = (typeof window !== "undefined" && window.React) ? window.React : __webpack_require__(1);
	  var Grid = (typeof window !== "undefined" && window.ReactGrid) ? window.ReactGrid.Grid : __webpack_require__(10);

	  function rows(start, end) {
	    var rows = [];
	    for (var i = start; i < end; i++) {
	      rows.push([i, 'Name ' + i, 'Surname ' + i]);
	    }
	    return rows;
	  }

	  var columns = [
	    {
	      name: '№',
	      width: '10%',
	      key: 0
	    },
	    {
	      name: 'Name',
	      width: '40%',
	      resizeable: true,
	      key: 1
	    },
	    {
	      name: 'Surname',
	      width: '50%',
	      resizeable: true,
	      key: 2
	    }
	  ];

	var Component = React.createClass({displayName: 'Component',

	    render: function() {
	      return (React.createElement(Grid, {
	        columns: columns, 
	        length: 30000, 
	        rows: rows, 
	        rowHeight: 40}))
	    }
	  });

	  if(typeof module != 'undefined' && module.exports){
	    module.exports = Component;
	  }else{
	    this.BasicGrid = Component;
	  }

	}).call(this);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */


	var Grid = __webpack_require__(11);

	var React = __webpack_require__(1);

	function rows(start, end) {
	  var rows = [];
	  for (var i = start; i < end; i++) {
	    rows.push([i, 'Name ' + i, 'Surname ' + i]);
	  }
	  return rows;
	}

	var columns = [
	  {
	    name: 'No',
	    width: 300,
	    key: 0,
	    locked:true
	  },
	  {
	    name: 'Name',
	    width: 400,
	    resizeable: true,
	    key: 1
	  },
	  {
	    name: 'Surname',
	    width: 500,
	    resizeable: true,
	    key: 2
	  },
	];

	var Component = React.createClass({displayName: 'Component',
	  render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement("div", {className: "well well-lg", style: {width:"80%"}}, 
	          React.createElement("p", null, "This shows a grid with fixed width columns and the first column frozen."), 
	          React.createElement("p", null, "In this example, we set the width of the grids container div to 1000px, but have columns of 1200px, so you will always see the horizontal scrollbar."), 
	          React.createElement("p", null, "Alternatively, leave off the width on your container and the grid will use 100% of the window width, meaning your scrollbar will depend on your screen dimensions")
	        ), 
	        React.createElement("div", {style: {width:1000}}, React.createElement(Grid, {
	        columns: columns, 
	        length: 30000, 
	        rows: rows, 
	        rowHeight: 40}))
	      ));
	  }
	});


	module.exports = Component;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */
	var Grid = __webpack_require__(16);

	var React = __webpack_require__(1);

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

	var rows = function(start, end) {
	  var result = []
	  for (var i = start; i < end; i++) {
	    result.push({
	      id: i,
	      title: 'Title ' + i,
	      count: i * 1000
	    });
	  }
	  return result;
	}




	var Component = React.createClass({displayName: 'Component',
	  render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement("div", {className: "well well-lg"}, 
	          React.createElement("p", null, "This shows a grid with full keyboard navigation. ")
	        ), 
	        React.createElement(Grid, {
	        columns: columns, 
	        length: 1000, 
	        rows: rows})
	      ));
	  }
	});
	module.exports = Component;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */

	var React = __webpack_require__(1);
	var Grid = __webpack_require__(15)
	var DropDownEditor = __webpack_require__(19);
	var CheckboxEditor = __webpack_require__(20);
	var cx = React.addons.classSet;


	var developers = ['Conor','Curtis','Danny','Joao','Mo','Rich'];

	var TrueFalseFormatter = React.createClass({displayName: 'TrueFalseFormatter',
	  render : function(){
	    var className = cx({
	      'glyphicon' : true,
	      'glyphicon-ok' : this.props.value === true,
	      'glyphicon-remove' : this.props.value === false

	    })

	    return (React.createElement("span", {className: className}))
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
	    editor : React.createElement(DropDownEditor, {options: developers})
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
	      id: i,
	      userStory:
	       'User Story ' + i,
	      developer : developers[i%6],
	      count: i * 1000
	    });
	  }
	  return result;
	}


	var Component = React.createClass({displayName: 'Component',

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
	      React.createElement("div", null, 
	        React.createElement("div", {className: "well well-lg"}, 
	          React.createElement("p", null, "This shows a grid with editing capabilities as well as keyboard navigation."), 
	          React.createElement("p", null, "A cell can be configured editable by either setting column.editable == true. In this instance, the editor will default to a SimpleTextEditor as in the User Story column"), 
	          React.createElement("p", null, "Alternatively, you can specify column.editor and pass it a valid React component that either implements the Editor Mixin or wraps one of the default editors. The Developer Column wraps the DropDownEditor and passes its available options as children")
	        ), 
	        React.createElement("div", null, 
	        React.createElement(Grid, {
	        columns: columns, 
	        length: 1000, 
	        rows: this.state.rows, 
	        onCellChanged: this.updateCell}))
	      ));
	  }
	});

	module.exports = Component;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */

	var React = __webpack_require__(1);
	var Grid = __webpack_require__(18);
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
	}


	var Component = React.createClass({displayName: 'Component',

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
	      React.createElement("div", null, 
	        React.createElement("div", {className: "well well-lg"}, 
	          React.createElement("p", null, "This shows a grid with copy/paste functionlity and keyboard navigation."), 
	          React.createElement("p", null, "Hold Ctrl + C to copy a cells contents and Ctrl + V to paste")

	        ), 
	        React.createElement("div", null, 
	        React.createElement(Grid, {
	        columns: columns, 
	        length: 1000, 
	        rows: this.state.rows, 
	        onCellChanged: this.updateCell}))
	      ));
	  }
	});
	module.exports = Component;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */

	var React = __webpack_require__(1);
	var Grid = __webpack_require__(17);
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
	  }
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


	var Component = React.createClass({displayName: 'Component',

	  getInitialState : function(){
	    return {rows : getRows(0, 1000)};
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

	  render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement("div", {className: "well well-lg"}, 
	          React.createElement("p", null, "This shows a grid with dragdown to copy functionality and keyboard navigation.")

	        ), 
	        React.createElement("div", null, 
	        React.createElement(Grid, {
	        columns: columns, 
	        length: 1000, 
	        rows: this.state.rows, 
	        onCellsDragged: this.handleCellDrag}))
	      ));
	  }
	});
	module.exports = Component;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */
	(function(){
	  var React = (typeof window !== "undefined" && window.React) ? window.React : __webpack_require__(1);
	  var ReactGrid = (typeof window !== "undefined" && window.ReactGrid) ? window.ReactGrid.WithAddons : __webpack_require__(12);
	  var Editors =  (typeof window !== "undefined" && window.ReactGrid) ? window.ReactGrid.Editors : __webpack_require__(13);
	  var Formatters = (typeof window !== "undefined" && window.ReactGrid) ? window.ReactGrid.Formatters : __webpack_require__(14);
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
	      editor : React.createElement(DropDownEditor, {options: developers}),
	      width : 200,
	      sortable : true
	    },
	    {
	      key: 'epic',
	      name: 'Epic',
	      editor : React.createElement(AutoCompleteEditor, {options: epics}),
	      width : 200,
	      sortable : true
	    },
	    {
	      key: 'dateRange',
	      name: 'Duration',
	      editor : React.createElement(DateRangeEditor, {ranges: dateRanges}),
	      formatter : React.createElement(DateRangeFormatter, null),
	      width : 200,
	      filterable : false
	    },
	    {
	      key: 'flight1',
	      width : 200,
	      name: 'flight1'
	    },
	    {
	      key: 'flight2',
	      width : 200,
	      name: 'flight2'
	    },
	    {
	      key: 'flight3',
	      width : 200,
	      name: 'flight3'
	    },
	    {
	      key: 'flight4',
	      width : 200,
	      name: 'flight4'
	    },
	    {
	      key: 'flight5',
	      width : 200,
	      name: 'flight5'
	    },
	    {
	      key: 'flight6',
	      width : 200,
	      name: 'flight6'
	    },
	    {
	      key: 'flight7',
	      width : 200,
	      name: 'flight7'
	    },
	    {
	      key: 'flight7',
	      width : 200,
	      name: 'flight7'
	    },
	    {
	      key: 'flight8',
	      width : 200,
	      name: 'flight8'
	    },
	    {
	      key: 'flight9',
	      width : 200,
	      name: 'flight9'
	    },
	    {
	      key: 'flight10',
	      width : 200,
	      name: 'flight10'
	    },
	    {
	      key: 'flight11',
	      width : 200,
	      name: 'flight11'
	    },
	    {
	      key: 'flight12',
	      width : 200,
	      name: 'flight12'
	    },
	    {
	      key: 'flight13',
	      width : 200,
	      name: 'flight13'
	    },
	    {
	      key: 'flight14',
	      width : 200,
	      name: 'flight14'
	    },{
	      key: 'flight15',
	      width : 200,
	      name: 'flight15'
	    },
	    {
	      key: 'flight16',
	      width : 200,
	      name: 'flight16'
	    },{
	      key: 'flight17',
	      width : 200,
	      name: 'flight17'
	    },
	    {
	      key: 'flight18',
	      width : 200,
	      name: 'flight18'
	    },
	    {
	      key: 'flight19',
	      width : 200,
	      name: 'flight19'
	    },
	    {
	      key: 'flight20',
	      width : 200,
	      name: 'flight20'
	    },
	    {
	      key: 'flight21',
	      width : 200,
	      name: 'flight21'
	    },{
	      key: 'flight22',
	      width : 200,
	      name: 'flight22'
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

	        dateRange: {startDate : '2013-01-01', endDate : '2013-02-01'},
	        flight1: '',
	        flight2: '1',
	        flight3: '2',
	        flight4: '3',
	        flight5: '4',
	        flight6: 'fdgfdgdfg',
	        flight7: '5',
	        flight8: 'bnm',
	        flight9: '6',
	        flight10: 'khjkhjk',
	        flight11: 'tryyr',
	        flight12: 'bvnbvn',
	        flight13: 'vbnvbn',
	        flight14: ',kj,j',
	        flight15: 'tyu',
	        flight16: 'rty',
	        flight17: 'wer',
	        flight18: 'wqe',
	        flight19: 'sdf',

	        flight20: 'vbn',
	        flight21: 'hgj',
	        flight22: 'rty',
	        flight23: 'rty'
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
	        React.createElement("div", null, 
	          React.createElement("div", {className: "well well-lg"}, 
	            React.createElement(ReactGrid, {
	              columns: columns, 
	              length: 1000, 
	              rows: this.state.rows, 
	              onCellChanged: this.updateCell, 
	              onCellsDragged: this.handleCellDrag}
	              )
	            )
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */
	(function(){
	  var React = (typeof window !== "undefined" && window.React) ? window.React : __webpack_require__(1);
	  var ReactGrid = (typeof window !== "undefined" && window.ReactGrid) ? window.ReactGrid.WithAddons : __webpack_require__(12);
	  var Editors =  (typeof window !== "undefined" && window.ReactGrid) ? window.ReactGrid.Editors : __webpack_require__(13);
	  var Formatters = (typeof window !== "undefined" && window.ReactGrid) ? window.ReactGrid.Formatters : __webpack_require__(14);
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
	      editor : React.createElement(DropDownEditor, {options: developers}),
	      width : 200,
	      sortable : true
	    },
	    {
	      key: 'epic',
	      name: 'Epic',
	      editor : React.createElement(AutoCompleteEditor, {options: epics}),
	      width : 200,
	      sortable : true
	    },
	    {
	      key: 'dateRange',
	      name: 'Duration',
	      editor : React.createElement(DateRangeEditor, {ranges: dateRanges}),
	      formatter : React.createElement(DateRangeFormatter, null),
	      width : 200,
	      filterable : false
	    },
	    {
	      key: 'flight1',
	      width : 200,
	      name: 'flight1'
	    },
	    {
	      key: 'flight2',
	      width : 200,
	      name: 'flight2'
	    },
	    {
	      key: 'flight3',
	      width : 200,
	      name: 'flight3'
	    },
	    {
	      key: 'flight4',
	      width : 200,
	      name: 'flight4'
	    },
	    {
	      key: 'flight5',
	      width : 200,
	      name: 'flight5'
	    },
	    {
	      key: 'flight6',
	      width : 200,
	      name: 'flight6'
	    },
	    {
	      key: 'flight7',
	      width : 200,
	      name: 'flight7'
	    },
	    {
	      key: 'flight7',
	      width : 200,
	      name: 'flight7'
	    },
	    {
	      key: 'flight8',
	      width : 200,
	      name: 'flight8'
	    },
	    {
	      key: 'flight9',
	      width : 200,
	      name: 'flight9'
	    },
	    {
	      key: 'flight10',
	      width : 200,
	      name: 'flight10'
	    },
	    {
	      key: 'flight11',
	      width : 200,
	      name: 'flight11'
	    },
	    {
	      key: 'flight12',
	      width : 200,
	      name: 'flight12'
	    },
	    {
	      key: 'flight13',
	      width : 200,
	      name: 'flight13'
	    },
	    {
	      key: 'flight14',
	      width : 200,
	      name: 'flight14'
	    },{
	      key: 'flight15',
	      width : 200,
	      name: 'flight15'
	    },
	    {
	      key: 'flight16',
	      width : 200,
	      name: 'flight16'
	    },{
	      key: 'flight17',
	      width : 200,
	      name: 'flight17'
	    },
	    {
	      key: 'flight18',
	      width : 200,
	      name: 'flight18'
	    },
	    {
	      key: 'flight19',
	      width : 200,
	      name: 'flight19'
	    },
	    {
	      key: 'flight20',
	      width : 200,
	      name: 'flight20'
	    },
	    {
	      key: 'flight21',
	      width : 200,
	      name: 'flight21'
	    },{
	      key: 'flight22',
	      width : 200,
	      name: 'flight22'
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

	        dateRange: {startDate : '2013-01-01', endDate : '2013-02-01'},
	        flight1: '',
	        flight2: '1',
	        flight3: '2',
	        flight4: '3',
	        flight5: '4',
	        flight6: 'fdgfdgdfg',
	        flight7: '5',
	        flight8: 'bnm',
	        flight9: '6',
	        flight10: 'khjkhjk',
	        flight11: 'tryyr',
	        flight12: 'bvnbvn',
	        flight13: 'vbnvbn',
	        flight14: ',kj,j',
	        flight15: 'tyu',
	        flight16: 'rty',
	        flight17: 'wer',
	        flight18: 'wqe',
	        flight19: 'sdf',

	        flight20: 'vbn',
	        flight21: 'hgj',
	        flight22: 'rty',
	        flight23: 'rty'
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
	        React.DOM.div(null,
	          React.DOM.div({className: "well well-lg"},
	            React.DOM.h4(null, "Excel Style Grid"),
	            React.DOM.ul(null,
	              React.DOM.li(null, "Keyboard navigation"),
	              React.DOM.li(null, "Editable cells"),
	              React.DOM.ul(null,
	                React.DOM.li(null, "Simple Text Editor (User story column)"),
	                React.DOM.li(null, "Drop Down Editor (Developer column)"),
	                React.DOM.li(null, "Autocomplete Editor (Epic column)"),
	                React.DOM.li(null, "Date Range Editor (Duration column)")
	              ),
	              React.DOM.li(null, "Editable validation"),
	              React.DOM.li(null, "Custom Formatters"),
	                React.DOM.ul(null,
	                  "Date Range Formatter (Duration Column)"
	                ),
	              React.DOM.li(null, "Copy/Paste cells"),
	              React.DOM.li(null, "Cell Dragdown")
	            )
	          ),
	          React.DOM.div(null,
	          ReactGrid({
	          columns: columns,
	          length: 1000,
	          rows: this.state.rows,
	          onCellChanged: this.updateCell,
	          onCellsDragged: this.handleCellDrag}))
	        ));
	    }
	  });

	  if(typeof module !== 'undefined' && module.exports){
	    module.exports = Component;
	  }else{
	    this.ExcelGrid = Component;
	  }


	}).call(this);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React                = __webpack_require__(1);
	var PropTypes            = React.PropTypes;
	var Header               = __webpack_require__(21);
	var Viewport             = __webpack_require__(22);
	var ColumnMetrics        = __webpack_require__(23);
	var DOMMetrics           = __webpack_require__(24);


	var GridScrollMixin = {

	  componentDidMount:function() {
	    this._scrollLeft = this.refs.viewport.getScroll().scrollLeft;
	    this._onScroll();
	  },

	  componentDidUpdate:function() {
	    this._onScroll();
	  },

	  componentWillMount:function() {
	    this._scrollLeft = undefined;
	  },

	  componentWillUnmount:function() {
	    this._scrollLeft = undefined;
	  },

	  onScroll:function($__0) {var scrollLeft=$__0.scrollLeft;
	    if (this._scrollLeft !== scrollLeft) {
	      this._scrollLeft = scrollLeft;
	      this._onScroll();
	    }
	  },

	  _onScroll:function() {
	    if (this._scrollLeft !== undefined) {
	      this.refs.header.setScrollLeft(this._scrollLeft);
	      this.refs.viewport.setScrollLeft(this._scrollLeft);
	    }
	  }
	};

	var Grid = React.createClass({displayName: 'Grid',
	  mixins: [
	    GridScrollMixin,
	    ColumnMetrics.Mixin,
	    DOMMetrics.MetricsComputatorMixin
	  ],

	  propTypes: {
	    rows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    columns: PropTypes.array.isRequired
	  },

	  getStyle: function(){
	    return{
	      overflow: 'hidden',
	      outline: 0,
	      position: 'relative',
	      minHeight: this.props.minHeight
	    }
	  },

	  render:function() {
	    var headerRows = this.props.headerRows || [{ref : 'row'}];
	    return (
	      React.createElement("div", React.__spread({},  this.props, {style: this.getStyle(), className: "react-grid-Grid"}), 
	        React.createElement(Header, {
	          ref: "header", 
	          columns: this.state.columns, 
	          onColumnResize: this.onColumnResize, 
	          height: this.props.rowHeight, 
	          totalWidth: this.DOMMetrics.gridWidth(), 
	          headerRows: headerRows}
	          ), 
	        React.createElement(Viewport, {
	          ref: "viewport", 
	          width: this.state.columns.width, 
	          rowHeight: this.props.rowHeight, 
	          rowRenderer: this.props.rowRenderer, 
	          cellRenderer: this.props.cellRenderer, 
	          rows: this.props.rows, 
	          selectedRows: this.props.selectedRows, 
	          expandedRows: this.props.expandedRows, 
	          length: this.props.length, 
	          columns: this.state.columns, 
	          totalWidth: this.DOMMetrics.gridWidth(), 
	          onScroll: this.onScroll, 
	          onRows: this.props.onRows, 
	          rowOffsetHeight: this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length}
	          )
	      )
	    );
	  },

	  getDefaultProps:function() {
	    return {
	      rowHeight: 35,
	      minHeight: 350
	    };
	  },
	});

	module.exports = Grid;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(37);
	module.exports.Row = __webpack_require__(30);
	module.exports.Cell = __webpack_require__(31);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(38);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(39);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React                    = __webpack_require__(1);
	var PropTypes                = React.PropTypes;
	var BaseGrid                 = __webpack_require__(11);
	var EditableCell             = __webpack_require__(26);
	var EditableGridMixin        = __webpack_require__(27);
	var SelectableGridMixin      = __webpack_require__(28);
	var merge                    = __webpack_require__(29);

	var EditableGrid = React.createClass({displayName: 'EditableGrid',

	  mixins : [SelectableGridMixin, EditableGridMixin],

	  propTypes : {
	    onCellChanged : React.PropTypes.func.isRequired
	  },

	  render: function() {
	    var cellRenderer = (
	      React.createElement(EditableCell, {
	        selected: this.state.selected, 
	        onSelect: this.onSelect, 
	        onClick: this.onSelect, 
	        onSetActive: this.onSetActive, 
	        onCommit: this.onCellChanged}
	        )
	    );
	    return(
	      React.createElement(BaseGrid, React.__spread({},  this.props, {cellRenderer: cellRenderer}))
	    )
	  }


	})


	module.exports = EditableGrid;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(1);
	var PropTypes           = React.PropTypes;
	var BaseGrid            = __webpack_require__(11);
	var SelectableGridMixin = __webpack_require__(28);
	var SelectableCell      = __webpack_require__(32);

	var GridWithKeyboardNav = React.createClass({displayName: 'GridWithKeyboardNav',

	  mixins : [SelectableGridMixin],

	  render: function() {
	    var cellRenderer = (
	      React.createElement(SelectableCell, {
	        selected: this.state.selected, 
	        onSelect: this.onSelect, 
	        onClick: this.onSelect}
	        )
	    );
	    return (
	      React.createElement(BaseGrid, React.__spread({},  this.props, {cellRenderer: cellRenderer}))
	    )
	  }
	})


	module.exports = GridWithKeyboardNav;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React                    = __webpack_require__(1);
	var PropTypes                = React.PropTypes;
	var BaseGrid                 = __webpack_require__(11);
	var DraggableCell            = __webpack_require__(35);
	var SelectableGridMixin      = __webpack_require__(28);
	var DraggableGridMixin      = __webpack_require__(36);

	var DraggableCellGrid = React.createClass({displayName: 'DraggableCellGrid',

	  mixins : [SelectableGridMixin, DraggableGridMixin],

	  render: function() {
	    var cellRenderer = (
	      React.createElement(DraggableCell, {
	        selected: this.state.selected, 
	        dragged: this.state.dragged, 
	        onSelect: this.onSelect, 
	        onClick: this.onSelect, 
	        handleDragStart: this.handleDragStart, 
	        handleDragEnter: this.handleDragEnter, 
	        handleDragEnd: this.handleDragEnd, 
	        handleTerminateDrag: this.handleTerminateDrag}
	        )
	    );
	    return (
	      React.createElement(BaseGrid, React.__spread({},  this.props, {cellRenderer: cellRenderer}))
	    )
	  }

	})


	module.exports = DraggableCellGrid;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React                   = __webpack_require__(1);
	var PropTypes               = React.PropTypes;
	var BaseGrid                = __webpack_require__(11);
	var CopyableCell            = __webpack_require__(33);
	var SelectableGridMixin     = __webpack_require__(28);
	var CopyPasteGridMixin      = __webpack_require__(34);

	var CopyPasteGrid = React.createClass({displayName: 'CopyPasteGrid',

	  mixins : [SelectableGridMixin, CopyPasteGridMixin],

	  render: function() {
	    var cellRenderer = (
	      React.createElement(CopyableCell, {
	        selected: this.state.selected, 
	        copied: this.state.copied, 
	        onSelect: this.onSelect, 
	        onClick: this.onSelect, 
	        handleCopy: this.handleCopy, 
	        handlePaste: this.handlePaste}
	        )
	    );
	    return (
	      React.createElement(BaseGrid, React.__spread({},  this.props, {cellRenderer: cellRenderer}))
	    )
	  }
	})


	module.exports = CopyPasteGrid;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(40);
	var keyboardHandlerMixin    = __webpack_require__(41);
	var EditorMixin             = __webpack_require__(42);
	var cloneWithProps          = React.addons.cloneWithProps;

	var DropDownEditor = React.createClass({displayName: 'DropDownEditor',

	  mixins : [keyboardHandlerMixin, EditorMixin],

	  overrides : {
	    getInputNode : function(){
	      return this.refs.select.getDOMNode();
	    }
	  },

	  propTypes : {
	    options : React.PropTypes.array.isRequired
	  },

	  renderEditorNode:function(){
	    return (
	      React.createElement("select", {ref: "select", style: this.getStyle(), defaultValue: this.props.value, onChange: this.onChange}, 
	        this.renderOptions()
	      ));
	  },

	  renderOptions:function(){
	    var options = [];
	    this.props.options.forEach(function(name){
	      options.push(React.createElement("option", {key: name, value: name}, name));
	    }, this);
	    return options;
	  },


	  onChange:function(e){
	    this.props.onCommit({value : e.currentTarget.value});
	  },

	  onClick:function(e){
	    e.stopPropagation();
	    e.preventDefault();
	  }

	});

	module.exports = DropDownEditor;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;

	var CheckBoxEditor = React.createClass({displayName: 'CheckBoxEditor',


	  PropTypes : {
	    value : React.PropTypes.bool.isRequired
	  },

	  render:function(){
	    return (React.createElement("input", {type: "checkbox", checked: this.props.value, onChange: this.handleChange}));
	  },

	  handleChange:function(e){
	    this.props.column.onRowSelect(this.props.rowIdx)
	  },

	  shouldComponentUpdate:function(nextProps, nextState){
	    return this.props.value != nextProps.value;
	  }

	});

	module.exports = CheckBoxEditor;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(1);
	var cx                  = React.addons.classSet;
	var shallowCloneObject  = __webpack_require__(43);
	var ColumnMetrics       = __webpack_require__(23);
	var HeaderRow           = __webpack_require__(44);
	var ColumnMetrics = __webpack_require__(23);

	var Header = React.createClass({displayName: 'Header',

	  propTypes: {
	    columns: React.PropTypes.object.isRequired,
	    totalWidth: React.PropTypes.number,
	    height: React.PropTypes.number.isRequired,
	    headerRows : React.PropTypes.array.isRequired
	  },

	  render:function() {
	    var state = this.state.resizing || this.props;

	    var className = cx({
	      'react-grid-Header': true,
	      'react-grid-Header--resizing': !!this.state.resizing
	    });
	    var headerRows = this.getHeaderRows();

	    return (

	      React.createElement("div", React.__spread({},  this.props, {style: this.getStyle(), className: className}), 
	        headerRows
	      )
	    );
	  },

	  shouldComponentUpdate : function(nextProps, nextState){
	    return !(ColumnMetrics.sameColumns(this.props.columns.columns, nextProps.columns.columns, ColumnMetrics.sameColumn))
	    || this.props.totalWidth != nextProps.totalWidth
	    || (this.props.headerRows.length != nextProps.headerRows.length)
	    || (this.state.resizing != nextState.resizing)
	  },

	  getHeaderRows:function(){
	    var state = this.state.resizing || this.props;
	    var headerRows = [];
	    this.props.headerRows.forEach((function(row, index){
	      var headerRowStyle = {
	        position: 'absolute',
	        top: this.props.height * index,
	        left: 0,
	        width: this.props.totalWidth
	      };

	      headerRows.push(React.createElement(HeaderRow, {
	        key: row.ref, 
	        ref: row.ref, 
	        style: headerRowStyle, 
	        onColumnResize: this.onColumnResize, 
	        onColumnResizeEnd: this.onColumnResizeEnd, 
	        width: state.columns.width, 
	        height: row.height || this.props.height, 
	        columns: state.columns.columns, 
	        resizing: state.column, 
	        headerCellRenderer: row.headerCellRenderer}
	        ))
	    }).bind(this));
	    return headerRows;
	  },

	  getInitialState:function() {
	    return {resizing: null};
	  },

	  componentWillReceiveProps:function() {
	    this.setState({resizing: null});
	  },

	  onColumnResize:function(column, width) {
	    var state = this.state.resizing || this.props;

	    var pos = this.getColumnPosition(column);

	    if (pos !== null) {
	      var resizing = {
	        columns: shallowCloneObject(state.columns)
	      };
	      resizing.columns = ColumnMetrics.resizeColumn(
	          resizing.columns, pos, width);

	      // we don't want to influence scrollLeft while resizing
	      if (resizing.columns.width < state.columns.width) {
	        resizing.columns.width = state.columns.width;
	      }

	      resizing.column = resizing.columns.columns[pos];
	      this.setState({resizing:resizing});
	    }
	  },

	  getColumnPosition:function(column) {
	    var state = this.state.resizing || this.props;
	    var pos = state.columns.columns.indexOf(column);
	    return pos === -1 ? null : pos;
	  },

	  onColumnResizeEnd:function(column, width) {
	    var pos = this.getColumnPosition(column);
	    if (pos !== null && this.props.onColumnResize) {
	      this.props.onColumnResize(pos, width || column.width);
	    }
	  },

	  setScrollLeft:function(scrollLeft) {
	    var node = this.refs.row.getDOMNode();
	    node.scrollLeft = scrollLeft;
	    this.refs.row.setScrollLeft(scrollLeft);
	  },

	  getStyle:function() {
	    return {
	      position: 'relative',
	      height: this.props.height
	    };
	  },
	});


	module.exports = Header;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React             = __webpack_require__(1);
	var getWindowSize     = __webpack_require__(45);
	var DOMMetrics        = __webpack_require__(24);
	var Canvas            = __webpack_require__(46);

	var min   = Math.min;
	var max   = Math.max;
	var floor = Math.floor;
	var ceil  = Math.ceil;

	var ViewportScroll = {
	  mixins: [DOMMetrics.MetricsMixin],

	  DOMMetrics: {
	    viewportHeight:function() {
	      return this.getDOMNode().offsetHeight;
	    }
	  },

	  propTypes: {
	    rowHeight: React.PropTypes.number,
	    length: React.PropTypes.number.isRequired
	  },

	  getDefaultProps:function() {
	    return {
	      rowHeight: 30
	    };
	  },

	  getInitialState:function() {
	    return this.getGridState(this.props);
	  },

	  getGridState:function(props) {
	    var height = this.state && this.state.height ?
	      this.state.height :
	      getWindowSize().height;
	    var renderedRowsCount = ceil(height / props.rowHeight);
	    return {
	      displayStart: 0,
	      displayEnd: renderedRowsCount * 2,
	      height: height,
	      scrollTop: 0,
	      scrollLeft: 0
	    };
	  },

	  updateScroll:function(scrollTop, scrollLeft, height, rowHeight, length) {
	    var renderedRowsCount = ceil(height / rowHeight);

	    var visibleStart = floor(scrollTop / rowHeight);

	    var visibleEnd = min(
	        visibleStart + renderedRowsCount,
	        length);

	    var displayStart = max(
	        0,
	        visibleStart - renderedRowsCount * 2);

	    var displayEnd = min(
	        visibleStart + renderedRowsCount * 2,
	        length);

	    var nextScrollState = {
	      visibleStart:visibleStart,
	      visibleEnd:visibleEnd,
	      displayStart:displayStart,
	      displayEnd:displayEnd,
	      height:height,
	      scrollTop:scrollTop,
	      scrollLeft:scrollLeft
	    };

	    this.setState(nextScrollState);
	  },

	  metricsUpdated:function() {
	    var height = this.DOMMetrics.viewportHeight();
	    if (height) {
	      this.updateScroll(
	        this.state.scrollTop,
	        this.state.scrollLeft,
	        height,
	        this.props.rowHeight,
	        this.props.length
	      );
	    }
	  },

	  componentWillReceiveProps:function(nextProps) {
	    if (this.props.rowHeight !== nextProps.rowHeight) {
	      this.setState(this.getGridState(nextProps));
	    } else if (this.props.length !== nextProps.length) {
	      this.updateScroll(
	        this.state.scrollTop,
	        this.state.scrollLeft,
	        this.state.height,
	        nextProps.rowHeight,
	        nextProps.length
	      );
	    }
	  }
	};

	var Viewport = React.createClass({displayName: 'Viewport',
	  mixins: [ViewportScroll],

	  render:function() {
	    var style = {
	      padding: 0,
	      bottom: 0,
	      left: 0,
	      right: 0,
	      overflow: 'hidden',
	      position: 'absolute',
	      top: this.props.rowOffsetHeight
	    };
	    return (
	      React.createElement("div", {
	        className: "react-grid-Viewport", 
	        style: style}, 
	        React.createElement(Canvas, {
	          ref: "canvas", 
	          totalWidth: this.props.totalWidth, 
	          width: this.props.columns.width, 
	          rows: this.props.rows, 
	          selectedRows: this.props.selectedRows, 
	          expandedRows: this.props.expandedRows, 
	          columns: this.props.columns.columns, 
	          cellRenderer: this.props.cellRenderer, 
	          rowRenderer: this.props.rowRenderer, 

	          visibleStart: this.state.visibleStart, 
	          visibleEnd: this.state.visibleEnd, 
	          displayStart: this.state.displayStart, 
	          displayEnd: this.state.displayEnd, 

	          length: this.props.length, 
	          height: this.state.height, 
	          rowHeight: this.props.rowHeight, 
	          onScroll: this.onScroll, 
	          onRows: this.props.onRows}
	          )
	      )
	    );
	  },

	  getScroll:function() {
	    return this.refs.canvas.getScroll();
	  },

	  onScroll:function($__0 ) {var scrollTop=$__0.scrollTop,scrollLeft=$__0.scrollLeft;
	    this.updateScroll(
	      scrollTop, scrollLeft,
	      this.state.height,
	      this.props.rowHeight,
	      this.props.length
	    );

	    if (this.props.onScroll) {
	      this.props.onScroll({scrollTop:scrollTop, scrollLeft:scrollLeft});
	    }
	  },

	  setScrollLeft:function(scrollLeft) {
	    this.refs.canvas.setScrollLeft(scrollLeft);
	  }
	});

	module.exports = Viewport;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var $__0=   __webpack_require__(1),PropTypes=$__0.PropTypes,isValidElement=$__0.isValidElement;
	var shallowCloneObject            = __webpack_require__(43);
	var DOMMetrics                    = __webpack_require__(24);
	var merge                         = __webpack_require__(29);

	/**
	 * Update column metrics calculation.
	 *
	 * @param {ColumnMetrics} metrics
	 */
	function calculate(metrics) {
	  var width = 0;
	  var unallocatedWidth = metrics.totalWidth;

	  var deferredColumns = [];
	  var columns = metrics.columns.map(shallowCloneObject);

	  var i, len, column;

	  // compute width for columns which specify width
	  for (i = 0, len = columns.length; i < len; i++) {
	    column = columns[i];

	    if (column.width) {
	      if (/^([0-9]+)%$/.exec(column.width)) {
	        column.width = Math.floor(
	          parseInt(column.width, 10) / 100 * metrics.totalWidth);
	      }
	      unallocatedWidth -= column.width;
	      width += column.width;
	    } else {
	      deferredColumns.push(column);
	    }

	  }

	  // compute width for columns which doesn't specify width
	  for (i = 0, len = deferredColumns.length; i < len; i++) {
	    column = deferredColumns[i];

	    if (unallocatedWidth <= 0) {
	      column.width = metrics.minColumnWidth;
	    } else {
	      column.width = Math.floor(unallocatedWidth / deferredColumns.length);
	    }
	    width += column.width;
	  }

	  // compute left offset
	  var left = 0;
	  for (i = 0, len = columns.length; i < len; i++) {
	    column = columns[i];
	    column.left = left;
	    left += column.width;
	  }

	  return {
	    columns:columns,
	    width:width,
	    totalWidth: metrics.totalWidth,
	    minColumnWidth: metrics.minColumnWidth
	  };
	}

	/**
	 * Update column metrics calculation by resizing a column.
	 *
	 * @param {ColumnMetrics} metrics
	 * @param {Column} column
	 * @param {number} width
	 */
	function resizeColumn(metrics, index, width) {
	  var column = metrics.columns[index];
	  metrics = shallowCloneObject(metrics);
	  metrics.columns = metrics.columns.slice(0);

	  var updatedColumn = shallowCloneObject(column);
	  updatedColumn.width = Math.max(width, metrics.minColumnWidth);

	  metrics.columns.splice(index, 1, updatedColumn);

	  return calculate(metrics);
	}

	var Mixin = {
	  mixins: [DOMMetrics.MetricsMixin],

	  propTypes: {
	    columns: PropTypes.array,
	    minColumnWidth: PropTypes.number,
	    columnEquality: PropTypes.func
	  },

	  DOMMetrics: {
	    gridWidth:function() {
	      return this.getDOMNode().offsetWidth - 2;
	    }
	  },

	  getDefaultProps:function() {
	    return {
	      minColumnWidth: 80,
	      columnEquality: sameColumn
	    };
	  },

	  getInitialState:function() {
	    return this.getColumnMetrics(this.props, true);
	  },

	  componentWillReceiveProps:function(nextProps) {
	    if (nextProps.columns) {
	      if (!sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality)) {
	        this.setState(this.getColumnMetrics(nextProps));
	      } else {
	        var index = {};
	        this.state.columns.columns.forEach(function(c)  {
	          index[c.key] = {width: c.width, left: c.left};
	        });
	        var nextColumns = merge(this.state.columns, {
	          columns: nextProps.columns.map(function(c)  {return merge(c, index[c.key]);})
	        });
	        this.setState({columns: nextColumns});
	      }
	    }
	  },

	  getColumnMetrics:function(props, initial) {
	    var totalWidth = initial ? null : this.DOMMetrics.gridWidth();
	    return {
	      columns: calculate({
	        columns: props.columns,
	        width: null,
	        totalWidth:totalWidth,
	        minColumnWidth: props.minColumnWidth
	      }),
	      gridWidth: totalWidth
	    };
	  },

	  metricsUpdated:function() {
	    this.setState(this.getColumnMetrics(this.props));
	  },

	  onColumnResize:function(index, width) {
	    var columns = resizeColumn(this.state.columns, index, width);
	    this.setState({columns:columns});
	  }
	};

	function sameColumns(prevColumns, nextColumns, sameColumn) {
	  var i, len, column;
	  var prevColumnsByKey = {};
	  var nextColumnsByKey = {};


	  if(prevColumns.length !== nextColumns.length){
	    return false;
	  }

	  for (i = 0, len = prevColumns.length; i < len; i++) {
	    column = prevColumns[i];
	    prevColumnsByKey[column.key] = column;
	  }

	  for (i = 0, len = nextColumns.length; i < len; i++) {
	    column = nextColumns[i];
	    nextColumnsByKey[column.key] = column;
	    var prevColumn = prevColumnsByKey[column.key];
	    if (prevColumn === undefined || !sameColumn(prevColumn, column)) {
	      return false;
	    }
	  }

	  for (i = 0, len = prevColumns.length; i < len; i++) {
	    column = prevColumns[i];
	    var nextColumn = nextColumnsByKey[column.key];
	    if (nextColumn === undefined) {
	      return false;
	    }
	  }

	  return true;
	}

	function sameColumn(a, b) {
	  var k;

	  for (k in a) {
	    if (a.hasOwnProperty(k)) {
	      if ((typeof a[k] === 'function' && typeof b[k] === 'function') || (isValidElement(a[k]) && isValidElement(b[k]))) {
	        continue;
	      }
	      if (!b.hasOwnProperty(k) || a[k] !== b[k]) {
	        return false;
	      }
	    }
	  }

	  for (k in b) {
	    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = {Mixin:Mixin, calculate:calculate, resizeColumn:resizeColumn, sameColumns:sameColumns, sameColumn:sameColumn};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React               = __webpack_require__(1);
	var emptyFunction       = __webpack_require__(47);
	var shallowCloneObject  = __webpack_require__(43);
	var invariant           = __webpack_require__(48);

	var contextTypes = {
	  metricsComputator: React.PropTypes.object
	};

	var MetricsComputatorMixin = {

	  childContextTypes: contextTypes,

	  getChildContext:function() {
	    return {metricsComputator: this};
	  },

	  getMetricImpl:function(name) {
	    return this._DOMMetrics.metrics[name].value;
	  },

	  registerMetricsImpl:function(component, metrics) {
	    var getters = {};
	    var s = this._DOMMetrics;

	    for (var name in metrics) {
	      invariant(
	          s.metrics[name] === undefined,
	          'DOM metric ' + name + ' is already defined'
	      );
	      s.metrics[name] = {component:component, computator: metrics[name].bind(component)};
	      getters[name] = this.getMetricImpl.bind(null, name);
	    }

	    if (s.components.indexOf(component) === -1) {
	      s.components.push(component);
	    }

	    return getters;
	  },

	  unregisterMetricsFor:function(component) {
	    var s = this._DOMMetrics;
	    var idx = s.components.indexOf(component);

	    if (idx > -1) {
	      s.components.splice(idx, 1);

	      var name;
	      var metricsToDelete = {};

	      for (name in s.metrics) {
	        if (s.metrics[name].component === component) {
	          metricsToDelete[name] = true;
	        }
	      }

	      for (name in metricsToDelete) {
	        delete s.metrics[name];
	      }
	    }
	  },

	  updateMetrics:function() {
	    var s = this._DOMMetrics;

	    var needUpdate = false;

	    for (var name in s.metrics) {
	      var newMetric = s.metrics[name].computator();
	      if (newMetric !== s.metrics[name].value) {
	        needUpdate = true;
	      }
	      s.metrics[name].value = newMetric;
	    }

	    if (needUpdate) {
	      for (var i = 0, len = s.components.length; i < len; i++) {
	        if (s.components[i].metricsUpdated) {
	          s.components[i].metricsUpdated();
	        }
	      }
	    }
	  },

	  componentWillMount:function() {
	    this._DOMMetrics = {
	      metrics: {},
	      components: []
	    };
	  },

	  componentDidMount:function() {
	    if(window.addEventListener){
	      window.addEventListener('resize', this.updateMetrics);
	    }else{
	      window.attachEvent('resize', this.updateMetrics);
	    }
	    this.updateMetrics();
	  },

	  componentWillUnmount:function() {
	    window.removeEventListener('resize', this.updateMetrics);
	  }

	};

	var MetricsMixin = {

	  contextTypes: contextTypes,

	  componentWillMount:function() {
	    if (this.DOMMetrics) {
	      this._DOMMetricsDefs = shallowCloneObject(this.DOMMetrics);

	      this.DOMMetrics = {};
	      for (var name in this._DOMMetricsDefs) {
	        this.DOMMetrics[name] = emptyFunction;
	      }
	    }
	  },

	  componentDidMount:function() {
	    if (this.DOMMetrics) {
	      this.DOMMetrics = this.registerMetrics(this._DOMMetricsDefs);
	    }
	  },

	  componentWillUnmount:function() {
	    if (!this.registerMetricsImpl) {
	      return this.context.metricsComputator.unregisterMetricsFor(this);
	    }
	    if (this.hasOwnProperty('DOMMetrics')) {
	        delete this.DOMMetrics;
	    }
	  },

	  registerMetrics:function(metrics) {
	    if (this.registerMetricsImpl) {
	      return this.registerMetricsImpl(this, metrics);
	    } else {
	      return this.context.metricsComputator.registerMetricsImpl(this, metrics);
	    }
	  },

	  getMetric:function(name) {
	    if (this.getMetricImpl) {
	      return this.getMetricImpl(name);
	    } else {
	      return this.context.metricsComputator.getMetricImpl(name);
	    }
	  }
	};

	module.exports = {
	  MetricsComputatorMixin:MetricsComputatorMixin,
	  MetricsMixin:MetricsMixin
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var Grid = __webpack_require__(49);
	var Row  = __webpack_require__(30);
	var Cell = __webpack_require__(31);

	module.exports = Grid;
	module.exports.Row = Row;
	module.exports.Cell = Cell;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var SelectableMixin = __webpack_require__(50);
	var EditableMixin  = __webpack_require__(51);
	var BaseCell       = __webpack_require__(52);
	var MixinHelper            = __webpack_require__(40);
	var KeyboardHandlerMixin = __webpack_require__(41);
	var PropTypes = React.PropTypes;



	var EditableCell = React.createClass({displayName: 'EditableCell',

	  mixins : [EditableMixin],

	  getCellClass : function(){
	      return cx({
	      'editing' : this.isActive(),
	      'selected' : this.isSelected() && !this.isActive()
	      });
	  },

	  shouldComponentUpdate:function(nextProps, nextState) {
	    return this.props.column.width !== nextProps.column.width
	    || this.props.value !== nextProps.value
	    || this.props.height !== nextProps.height
	    || this.props.rowIdx !== nextProps.rowIdx
	    || this.isCellSelectionChanging(nextProps);
	  },

	  render: function() {
	    return (
	      React.createElement(BaseCell, React.__spread({}, 
	        this.props, 
	        {className: this.getCellClass(), 
	        formatter: this.getFormatter(), 
	        onKeyDown: this.onKeyDown, 
	        onClick: this.onClick, 
	        onDoubleClick: this.onDoubleClick})
	        )
	    )
	  }

	})

	module.exports = EditableCell;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(1);
	var PropTypes           = React.PropTypes;
	var merge               = __webpack_require__(29);

	var EditableGridMixin = {

	  propTypes : {
	    onCellChanged : React.PropTypes.func.isRequired
	  },

	  onCellChanged:function(commit){
	    var selected = this.state.selected;
	    selected.active = false;
	    if(commit.keyCode === 'Tab'){
	      selected.idx += 1;
	    }
	    this.setState({selected : selected});
	    this.props.onCellChanged(commit);
	  },

	  onSetActive:function(activeCell) {
	    var selected = merge(this.state.selected, activeCell);
	    this.setState({selected: selected});
	  }

	};


	module.exports = EditableGridMixin;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var SelectableGridMixin = {

	  getColumns : function(){
	    return this.props.columns
	  },

	  getInitialState: function() {
	    return {selected: {rowIdx: 0, idx: 0}};
	  },

	  onSelect: function(selected) {
	    var idx = selected.idx;
	    var rowIdx = selected.rowIdx;
	    if (
	      idx >= 0
	      && rowIdx >= 0
	      && idx < this.getColumns().length
	      && rowIdx < this.props.length
	    ) {
	      if(this.props.onSelect){
	        this.props.onSelect({selected: selected});
	      }
	      this.setState({selected: selected});

	    }
	  }
	}

	module.exports = SelectableGridMixin;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule merge
	 */

	"use strict";

	/**
	 * Shallow merges two structures into a return value, without mutating either.
	 *
	 * @param {?object} one Optional object with properties to merge from.
	 * @param {?object} two Optional object with properties to merge from.
	 * @return {object} The shallow extension of one by two.
	 */
	var merge = function(one, two) {
	  var result = {};
	  if (one != null) {
	    Object.assign(result, one);
	  }
	  if (two != null) {
	    Object.assign(result, two);
	  }
	  return result;
	};

	function mergeFallback(obj1,obj2){
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    return obj3;
	}

	module.exports = Object.assign ? merge : mergeFallback;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var Cell           = __webpack_require__(31);
	var cloneWithProps = React.addons.cloneWithProps;
	var ColumnMetrics    = __webpack_require__(53);

	var Row = React.createClass({displayName: 'Row',

	  render:function() {
	    var className = cx(
	      'react-grid-Row',
	      ("react-grid-Row--" + (this.props.idx % 2 === 0 ? 'even' : 'odd'))
	    );

	    var style = {
	      height: this.getRowHeight(),
	      overflow: 'hidden'
	    };

	    var cells = this.getCells();
	    return (
	      React.createElement("div", React.__spread({},  this.props, {className: className, style: style}), 
	        React.isValidElement(this.props.row) ?
	          this.props.row : cells
	      )
	    );
	  },

	  getCells:function() {
	    var cells = [];
	    var lockedCells = [];

	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      var column = this.props.columns[i];
	      var cell = this.renderCell({
	        ref:i,
	        key:i,
	        idx:i,
	        rowIdx:this.props.idx,
	        filterRowIdx:this.props.row.key,
	        value:this.getCellValue(column.key || i),
	        column:column,
	        height:this.getRowHeight(),
	        formatter:column.formatter,
	        rowData : this.props.row});
	      if (column.locked) {
	        lockedCells.push(cell);
	      } else {
	        cells.push(cell);
	      }
	    }

	    return cells.concat(lockedCells);
	  },

	  getRowHeight:function(){
	    if(this.props.expandedRows && this.props.expandedRows[this.props.key]){
	      return this.props.expandedRows[this.props.key];
	    }else{
	      return this.props.height;
	    }
	  },

	  getCellValue:function(key){
	    if(key === 'select-row'){
	      return this.props.isSelected;
	    }else{
	      return this.props.row[key]
	    }
	  },

	  renderCell:function(props) {
	    if (React.isValidElement(this.props.cellRenderer)) {
	      return cloneWithProps(this.props.cellRenderer, props);
	    } else {
	      return this.props.cellRenderer(props);
	    }
	  },

	  getDefaultProps:function() {
	    return {
	      cellRenderer: Cell
	    };
	  },

	  shouldComponentUpdate:function(nextProps) {
	    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
	      this.doesRowContainSelectedCell()          ||
	      this.doesRowContainSelectedCell(nextProps) ||
	      this.willRowBeDraggedOver(nextProps)       ||
	      this.hasRowBeenCopied()                    ||
	      nextProps.row !== this.props.row           ||
	      nextProps.height !== this.props.height;
	  },

	  setScrollLeft:function(scrollLeft) {
	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      if (this.props.columns[i].locked) {
	        this.refs[i].setScrollLeft(scrollLeft);
	      }
	    }
	  },

	  doesRowContainSelectedCell:function(propsToCheck){
	    var props = propsToCheck || this.props;
	    var cell = cell || props.cellRenderer;
	    if(cell.props.selected && cell.props.selected.rowIdx === props.idx){
	      return true;
	    }else{
	      return false;
	    }
	  },

	  willRowBeDraggedOver:function(props){
	    var dragged = props.cellRenderer.props.dragged;
	    return  dragged != null && (dragged.rowIdx || dragged.complete === true);
	  },

	  hasRowBeenCopied:function(){
	    var cell = this.props.cellRenderer;
	    return cell.props.copied != null && cell.props.copied.rowIdx === this.props.idx;
	  }


	});

	module.exports = Row;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;

	var Cell = React.createClass({displayName: 'Cell',

	  render:function() {
	    var style = this.getStyle();
	    var className = cx(
	      'react-grid-Cell',
	      this.props.className,
	      this.props.column.locked ? 'react-grid-Cell--locked' : null
	    );

	    var cellContent = this.renderCellContent({
	      value : this.props.value,
	      column : this.props.column,
	      rowIdx : this.props.rowIdx,
	      isExpanded : this.props.isExpanded
	    });

	    return (
	      React.createElement("div", React.__spread({},  this.props, {className: className, style: style}), 
	          cellContent, 
	          React.createElement("div", {className: "drag-handle", draggable: "true", onDragStart: this.props.handleDragStart}
	          )
	      )
	    );
	  },

	  renderCellContent:function(props) {
	    var formatter = React.isValidElement(this.props.formatter) ? cloneWithProps(this.props.formatter, props) : this.props.formatter(props);
	    return (React.createElement("div", {
	      className: "react-grid-Cell__value"}, formatter, " ", this.props.cellControls))

	  },

	  getDefaultProps:function() {
	    return {
	      formatter: simpleCellFormatter
	    };
	  },

	  getStyle:function() {
	    var style = {
	      position: 'absolute',
	      width: this.props.column.width,
	      height: this.props.height,
	      left: this.props.column.left
	    };
	    return style;
	  },

	  setScrollLeft:function(scrollLeft) {
	    if (this.isMounted()) {
	      var node = this.getDOMNode();
	      var transform = ("translate3d(" + scrollLeft + "px, 0px, 0px)");
	      node.style.webkitTransform = transform;
	      node.style.transform = transform;
	    }
	  }
	});

	function simpleCellFormatter(props) {
	  return props.value;
	}

	module.exports = Cell;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var BaseCell       = __webpack_require__(52);
	var SelectableMixin = __webpack_require__(50);
	var MixinHelper            = __webpack_require__(40);

	var SelectableCell = React.createClass({displayName: 'SelectableCell',

	  mixins : [SelectableMixin],

	  getCellClass : function(){
	    return this.isSelected() ? 'selected' : null;
	  },

	  shouldComponentUpdate:function(nextProps, nextState) {
	    return this.props.column.width !== nextProps.column.width
	    || this.props.value !== nextProps.value
	    || this.props.height !== nextProps.height
	    || this.props.rowIdx !== nextProps.rowIdx
	    || this.isCellSelectionChanging(nextProps);
	  },

	  render: function() {
	    return (
	      React.createElement(BaseCell, React.__spread({}, 
	        this.props, 
	        {className: this.getCellClass(), 
	        onKeyDown: this.onKeyDown, 
	        onClick: this.onClick})))
	  }

	})

	module.exports = SelectableCell;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                = __webpack_require__(1);
	var cx                   = React.addons.classSet;
	var cloneWithProps       = React.addons.cloneWithProps;
	var BaseCell             = __webpack_require__(52);
	var SelectableMixin      = __webpack_require__(50);
	var EditableMixin        = __webpack_require__(51);
	var CopyableMixin        = __webpack_require__(54);
	var MixinHelper          = __webpack_require__(40);
	var KeyboardHandlerMixin = __webpack_require__(41);


	var CopyableCell = React.createClass({displayName: 'CopyableCell',


	  mixins : [CopyableMixin],

	  render: function() {
	    return (React.createElement(BaseCell, React.__spread({}, 
	      this.props, 
	      {className: this.getCellClass(), 
	      onKeyDown: this.onKeyDown, 
	      onClick: this.onClick})
	      ))
	  }

	});

	module.exports = CopyableCell;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(1);
	var PropTypes           = React.PropTypes;

	var CopyPasteGridMixin = {

	  propTypes : {
	    onCellChanged : React.PropTypes.func.isRequired
	  },

	  getInitialState: function() {
	    return {copied : null};
	  },


	  handleCopy:function(args){
	    var textToCopy = args.value;
	    var selected = this.state.selected;
	    var copied = {idx : selected.idx, rowIdx : selected.rowIdx};
	    this.setState({textToCopy:textToCopy, copied : copied});
	  },

	  handlePaste:function(){
	    var selected = this.state.selected;
	    var cellKey = this.getColumns()[selected.idx].key;
	    this.props.onCellCopyPaste({cellKey: cellKey , rowIdx: selected.rowIdx, value : this.state.textToCopy, fromRow : this.state.copied.rowIdx, toRow : selected.rowIdx});
	    this.setState({copied : null});
	  }
	}

	module.exports = CopyPasteGridMixin;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                = __webpack_require__(1);
	var cx                   = React.addons.classSet;
	var cloneWithProps       = React.addons.cloneWithProps;
	var BaseCell             = __webpack_require__(52);
	var SelectableMixin      = __webpack_require__(50);
	var MixinHelper          = __webpack_require__(40);
	var KeyboardHandlerMixin = __webpack_require__(41);
	var DraggableMixin       = __webpack_require__(55);

	var DraggableCell = React.createClass({displayName: 'DraggableCell',


	  mixins : [DraggableMixin],

	  render: function() {
	    return (
	      React.createElement(BaseCell, React.__spread({}, 
	        this.props, 
	        {className: this.getCellClass(), 
	        onKeyDown: this.onKeyDown, 
	        onClick: this.onClick, 
	        handleDragStart: this.handleDragStart, 
	        onDragEnter: this.handleDragEnter, 
	        onDragEnd: this.props.handleDragEnd})
	      ))
	  }

	})

	module.exports = DraggableCell;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React                    = __webpack_require__(1);
	var PropTypes                = React.PropTypes;
	var MixinHelper              = __webpack_require__(40);
	var SelectableGridMixin          = __webpack_require__(28);

	MixinHelper.addAlias('SelectableGridMixin');

	var DraggableGridMixin = {

	  mixinDependencies : ['SelectableGridMixin'],

	  propTypes : {
	    onCellsDragged : React.PropTypes.func.isRequired
	  },

	  getInitialState: function() {
	    return {dragged : null};
	  },

	  handleDragStart:function(dragged){
	    var idx = dragged.idx;
	    var rowIdx = dragged.rowIdx;
	    if (
	      idx >= 0
	      && rowIdx >= 0
	      && idx < this.getColumns().length
	      && rowIdx < this.props.length
	    ) {
	      this.setState({dragged: dragged});
	    }
	  },

	  handleDragEnter:function(row){
	    var selected = this.state.selected;
	    var dragged = this.state.dragged;
	    dragged.overRowIdx = row;
	   this.setState({dragged : dragged});
	  },

	  handleDragEnd:function(){
	    var fromRow, toRow;
	    var selected = this.state.selected;
	    var dragged = this.state.dragged;
	    var cellKey = this.getColumns()[this.state.selected.idx].key;
	    fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    toRow   = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    this.props.onCellsDragged({cellKey: cellKey , fromRow: fromRow, toRow : toRow, value : dragged.copiedText});
	    this.setState({dragged : {complete : true}});
	  },

	  handleTerminateDrag:function(){
	    this.setState({dragged: null});
	  }
	}


	module.exports = DraggableGridMixin;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React                 = __webpack_require__(1);
	var PropTypes             = React.PropTypes;
	var BaseGrid              = __webpack_require__(49);
	var ExcelCell             = __webpack_require__(56);
	var ExcelRow              = __webpack_require__(57);
	var merge                 = __webpack_require__(58);
	var SelectableGridMixin   = __webpack_require__(59);
	var DraggableGridMixin    = __webpack_require__(60);
	var CopyPasteGridMixin    = __webpack_require__(61);
	var EditableGridMixin     = __webpack_require__(62);
	var SortableGridMixin     = __webpack_require__(63);
	var FilterableGridMixin   = __webpack_require__(64);
	var CheckboxEditor        = __webpack_require__(65);
	var MixinHelper           = __webpack_require__(66);

	var cloneWithProps = React.addons.cloneWithProps;

	var ExcelGrid = React.createClass({displayName: 'ExcelGrid',

	  mixins : [SelectableGridMixin, EditableGridMixin, DraggableGridMixin, CopyPasteGridMixin, SortableGridMixin, FilterableGridMixin],

	  getInitialState:function(){
	    return {selectedRows : [], expandedRows : []};
	  },

	  overrides : {
	    onCellChanged:function(commit){
	      var committed = commit[0];
	      var selected = Object.assign({}, this.state.selected);
	      selected.active = false;
	      if (committed.keyCode === 'Tab') {
	        selected.idx += 1;
	      }
	      var expandedRows = this.state.expandedRows;
	      if(committed.changed && committed.changed.expandedHeight){
	        expandedRows = this.expandRow(committed.rowIdx, committed.changed.expandedHeight);
	      }
	      this.setState({selected : selected, expandedRows : expandedRows});
	      this.props.onCellChanged(committed);
	    },
	    getColumns : function(){
	      var cols = this.getDecoratedColumns(this.props.columns)
	      if(this.props.isRowSelectable){
	          cols.unshift({
	            key: 'select-row',
	            name: '',
	            formatter : React.createElement(CheckboxEditor, null),
	            onRowSelect :this.handleRowSelect,
	            filterable : false,
	            headerRenderer : React.createElement("input", {type: "checkbox", onChange: this.handleCheckboxChange})
	          });
	        }
	        return cols;
	    }
	  },

	  getDefaultProps:function() {
	    return {
	      rowHeight: 35,
	      shouldDisplayToolbar : true,
	      isRowSelectable : true,
	      minHeight : 350
	    };
	  },

	  handleCheckboxChange : function(e){
	    if(e.currentTarget.checked === true){
	      var selectedRows = this.props.rows.map(function()  {return true;});
	      this.setState({selectedRows : selectedRows});
	    }else{
	      var selectedRows = this.props.rows.map(function()  {return false;});
	      this.setState({selectedRows : selectedRows});
	    }
	  },

	  handleRowSelect:function(row){
	    var selectedRows = this.state.selectedRows;
	    if(selectedRows[row] == null || selectedRows[row] == false){
	      selectedRows[row] = true;
	    }else{
	      selectedRows[row] = false;
	    }
	    this.setState({selectedRows : selectedRows});
	  },

	  expandRow:function(row, newHeight){
	    var expandedRows = this.state.expandedRows;
	    if(expandedRows[row]){
	      if(expandedRows[row]== null || expandedRows[row] < newHeight){
	        expandedRows[row] = newHeight;
	      }
	    }else{
	      expandedRows[row] = newHeight;
	    }
	    return expandedRows;
	  },

	  handleShowMore:function(row, newHeight){
	    var expandedRows = this.expandRow(row, newHeight);
	    this.setState({expandedRows : expandedRows});
	  },

	  handleShowLess:function(row){
	    var expandedRows = this.state.expandedRows;
	    if(expandedRows[row]){
	        expandedRows[row] = false;
	    }
	    this.setState({expandedRows : expandedRows});
	  },

	  expandAllRows:function(){

	  },

	  collapseAllRows:function(){

	  },

	  render: function() {
	    var cellRenderer = (
	      React.createElement(ExcelCell, {
	        selected: this.state.selected, 
	        copied: this.state.copied, 
	        dragged: this.state.dragged, 
	        onSelect: this.onSelect, 
	        onClick: this.onSelect, 
	        onSetActive: this.onSetActive, 
	        onCommit: this.onCellChanged, 
	        handleCopy: this.handleCopy, 
	        handlePaste: this.handlePaste, 
	        handleDragStart: this.handleDragStart, 
	        handleDragEnter: this.handleDragEnter, 
	        handleDragEnd: this.handleDragEnd, 
	        handleTerminateDrag: this.handleTerminateDrag, 
	        onShowMore: this.handleShowMore, 
	        onShowLess: this.handleShowLess, 
	        expandedRows: this.state.expandedRows}
	        )
	    );

	    var rows = this.filterRows();

	    return(
	      React.createElement("div", {className: "container-fluid"}, 
	        this.renderToolbar, 
	        (React.createElement(BaseGrid, React.__spread({
	          ref: "base"}, 
	          this.props, 
	          {headerRows: this.getHeaderRows(), 
	          columns: this.getColumns(), 
	          rows: rows, 
	          cellRenderer: cellRenderer, 
	          rowRenderer: React.createElement(ExcelRow, null), 
	          selectedRows: this.state.selectedRows, 
	          expandedRows: this.state.expandedRows, 
	          rowOffsetHeight: this.getRowOffsetHeight(), 
	          minHeight: this.props.minHeight})))
	      )
	    )
	  },

	  renderToolbar:function(){
	    if(this.props.shouldDisplayToolbar === true){
	      return(React.createElement("div", {className: "navbar navbar-default"}, 
	        React.createElement("div", {className: "navbar-form"}, 
	          React.createElement("div", {className: "form-group"}, 
	            React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.toggleFilter}, 
	              React.createElement("span", {className: "glyphicon glyphicon-filter"}), " Filter Rows"
	            )
	          )
	        )
	      ))
	    }

	  }


	})


	module.exports = ExcelGrid;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var Editors = {
	  AutoComplete     : __webpack_require__(67),
	  DateRangeEditor  : __webpack_require__(68),
	  DropDownEditor   : __webpack_require__(69),
	  SimpleTextEditor : __webpack_require__(70)

	}

	module.exports = Editors;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var formatters = {
	  DateRangeFormatter : __webpack_require__(71)
	}

	module.exports = formatters;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	
	"use strict";

	var keyMirror  = __webpack_require__(85);
	var isFunction = __webpack_require__(72)
	var React      = __webpack_require__(1);

	/**
	 * Policies that describe methods in Adazzle React Mixins
	 * Any methods that do not confirm to one of these policies will be treated as a custom method
	 * All custom methods will be wrapped to potentially allow override/extension as defined on a component
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods are React Lifecycle methods and should be mixed into any components
	   * according to their default behviour as specified in React library
	   */
	  DEFINE_LIFE_CYCLE_METHOD : null,
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base ReactCompositeComponent class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null

	});

	var MixinInterface = {


	  getDefaultProps : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  propTypes : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  getInitialState : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  statics : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  displayName : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  componentWillMount : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  componentWillReceiveProps : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  shouldComponentUpdate : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  componentWillUpdate : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  componentDidUpdate : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  componentWillUnmount : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD
	}

	var MixinAliasCache = {};
	var arePropertyDescriptorsSupported = function () {
	    try {
	      Object.defineProperty({}, 'x', {});
	      return true;
	    } catch (e) { /* this is IE 8. */
	      return false;
	    }
	  };

	/**
	 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
	 * @param obj1
	 * @param obj2
	 */
	function IE8_merge(obj1,obj2){
	    for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
	    return obj1;
	}
	//IE 8 does not support Object.assign even with polyfil.
	var merge = arePropertyDescriptorsSupported() ? Object.assign :
	 IE8_merge;

	var Mixin = function(base, dependsOn){
	  this.base = base;
	  this.dependsOn = dependsOn;
	};

	var Dependency = function(dependsOn){
	  this.assignTo = function(base){
	      return new Mixin(base, dependsOn);
	  }
	};


	var wrapEachMethodInObject = function(clone, results){
	  //loop over each property and mix according to its spec policy
	  Object.keys(clone).forEach(function(key){
	    if(mixinUtils.isCustomProperty(key)){
	      //overwrite each function of object with custom functionlity
	      if(isFunction(clone[key])){
	        clone[key] = mixinUtils.wrapCustomMethod(key, clone[key]);
	      }
	    }else{

	      switch(MixinInterface[key]){
	          case SpecPolicy.DEFINE_LIFE_CYCLE_METHOD:
	            var lifeCycleObj = {};
	            lifeCycleObj[key] = clone[key];
	            //add this to mixin result - will be treated as standard
	            results.push(lifeCycleObj);
	            break;
	          case SpecPolicy.DEFINE_MANY_MERGED:
	              //TODO imlplement handlers for other spec policies
	            break;
	      }

	      delete clone[key];
	    }

	  }, this);
	}


	var MixinHelper = {

	  /**
	   * Mix properties and methods from multiple objects, without mutating any of them
	   *
	   * @param {array} array of all mixins to be merged
	   * @return {array} A new array of mixins, the first object being an object of containing all custom methods wrapped
	   * Subsequent object in array will be any extracted lifecycle methods which should be treated as standard
	   */
	  mix : function(mixins){

	    var results = [];
	    var primary = {};

	    var dependencies = mixinUtils.getUniqueDependencies(mixins);
	    for (var d in dependencies){
	      merge(primary, MixinAliasCache[dependencies[d]]);
	    }
	    wrapEachMethodInObject(primary, results);

	    mixins.forEach(function(obj){
	      //clone the object so that original methods are not overwritten
	      var clone = {};
	      //check if mixin was created using Mixin Helper
	      //If it is then merge the properties object
	      if(obj instanceof Mixin){
	        merge(clone, obj.base);
	      }else{
	        merge(clone, obj);
	      }

	      wrapEachMethodInObject(clone, results);

	      merge(primary, clone);
	    }, this);

	    results.push(primary);


	    return results;
	  },


	  createDependency : function(deps){
	    var dependencyList = [];
	    for (var d in deps){
	      if(deps[d] instanceof Mixin){
	        this.addAlias(d, deps[d].base)
	      }else{
	        this.addAlias(d, deps[d])
	      }
	      dependencyList.push(d);
	    }
	    var uniqueDependencyList = dependencyList.filter(function(value, index, self) {
	      return self.indexOf(value) === index;
	    });
	    return new Dependency(uniqueDependencyList);
	  },

	  addAlias : function(key, object){
	    MixinAliasCache[key] = object;
	  }

	};

	// idea borrowed from https://github.com/jhudson8/react-mixin-manager/blob/master/react-mixin-manager.js
	var _createClass = React.createClass;
	React.createClass = function(spec) {
	  if (spec.mixins) {
	    spec.mixins = MixinHelper.mix(spec.mixins);
	  }
	  return _createClass.apply(React, arguments);
	};


	var mixinUtils = {

	  isCustomProperty : function(key){
	    return (!MixinInterface[key]);
	  },

	  wrapCustomMethod : function(methodName, old){
	    return function(){
	      //call overridden method if exists
	      if(mixinUtils.isMethodOverridden.call(this, methodName)){
	        return mixinUtils.callOverriddenMethod.call(this, methodName, arguments);
	      }else{
	        //call the original mixin method
	        return old.apply(this, arguments);
	      }
	    }
	  },

	  checkMethodExtendedAndCall : function(methodName, args){
	    if(this.extended && (typeof this.extended[methodName] === 'function')){
	      return this.extended[methodName].call(this, args);
	    }
	  },

	  checkMethodImplementedAndCall: function(methodName, args){
	    if(this.implemented && (typeof this.implemented[methodName] === 'function')){
	      return this.implemented[methodName].call(this, args);
	    }
	  },

	  isMethodOverridden: function(methodName){
	    return this.overrides && (typeof this.overrides[methodName] === 'function');
	  },

	  callOverriddenMethod: function(methodName, args){
	    return this.overrides[methodName].call(this, args);
	  },

	  getUniqueDependencies : function(mixins){
	    var deps = [];
	    mixins.forEach(function(m){
	      if(m instanceof Mixin){
	        deps = deps.concat(m.dependsOn);
	      }
	    }, this);
	    return deps.filter(function(value, index, self) {
	      return self.indexOf(value) === index;
	    });;
	  }
	}
	module.exports = MixinHelper;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */

	'use strict';

	var React = __webpack_require__(1);
	var Perf = React.addons.Perf;

	var hasPerfStarted = false;

	var KeyboardHandlerMixin = {

	  onKeyDown:function(e){
	    if(this.isCtrlKeyHeldDown(e)){
	      this.checkAndCall('onPressKeyWithCtrl', e);
	    }
	    else if (this.isKeyIdentified(e.key)) {
	      //break up individual keyPress events to have their own specific callbacks
	      //this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	      var callBack = 'onPress' + e.key;
	      this.checkAndCall(callBack, e);
	    }else if(this.isKeyPrintable(e.keyCode)){
	      this.checkAndCall('onPressChar', e);
	    }
	  },

	  //taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	  isKeyPrintable:function(keycode){
	    var valid =
	        (keycode > 47 && keycode < 58)   || // number keys
	        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
	        (keycode > 64 && keycode < 91)   || // letter keys
	        (keycode > 95 && keycode < 112)  || // numpad keys
	        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
	        (keycode > 218 && keycode < 223);   // [\]' (in order)

	    return valid;
	  },

	  isKeyIdentified:function(key){
	    return key !== "Unidentified";
	  },

	  isCtrlKeyHeldDown:function(e){
	    return e.ctrlKey === true && e.key !== "Control";
	  },

	  checkAndCall:function(methodName, args){
	    if(typeof this[methodName] === 'function'){
	      this[methodName](args);
	    }
	  }
	}



	module.exports = KeyboardHandlerMixin;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';
	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;
	var isFunction = __webpack_require__(72);

	var EditorMixin = {

	  propTypes : {
	    onCommit : React.PropTypes.func.isRequired
	  },

	  getStyle:function(){
	    return {
	      height : this.props.height - 1
	    }
	  },

	  getInitialState:function(){
	    return {isInvalid : false}
	  },

	  onPressEnter:function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    this.commit({key : 'Enter'});
	  },

	  onPressTab:function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    this.commit({key : 'Tab'});
	  },

	  commit:function(args){
	    var value = this.getValue();
	    var rowDataChanged = {};
	    rowDataChanged[this.props.column.key] = value;
	    if(this.isNewValueValid(value)){
	      this.props.onCommit({value : value, key : args.key, rowDataChanged : rowDataChanged});
	    }
	  },

	  isNewValueValid:function(value){
	    if(isFunction(this.validate)){
	      var isValid = this.validate(value);
	      this.setState({isInvalid : !isValid});
	      return isValid;
	    }else{
	      return true;
	    }
	  },

	  getValue:function(){
	      return this.getInputNode().value;
	  },

	  setValue:function(value){
	      this.getInputNode().value = value;
	  },

	  componentDidMount: function() {
	    if(this.getInputNode() !== undefined){
	      this.checkFocus();
	      this.getInputNode().className += ' editor-main';
	    }
	  },

	  checkFocus:function(){
	    this.getInputNode().focus();
	  },

	  getInputNode:function(){
	    return this.getDOMNode().getElementsByTagName("input")[0];
	  },

	  getContainerClass:function(){
	    return cx({
	      'has-error' : this.state.isInvalid === true
	    })
	  },

	  renderStatusIcon:function(){
	    if(this.state.isInvalid === true){
	      return React.createElement("span", {className: "glyphicon glyphicon-remove form-control-feedback"})
	    }
	  },

	  render:function(){
	    if(!isFunction(this.renderEditorNode)){
	        throw "Editor Mixin Error : " + this.displayName + " component must implement method renderEditorNode";
	    }
	    var editorNode = this.renderEditorNode();
	    return (
	      React.createElement("div", {className: this.getContainerClass()}, 
	        editorNode, 
	        this.renderStatusIcon()
	      )
	    )
	  }
	};

	module.exports = EditorMixin;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	function shallowCloneObject(obj) {
	  var result = {};
	  for (var k in obj) {
	    if (obj.hasOwnProperty(k)) {
	      result[k] = obj[k];
	    }
	  }
	  return result;
	}

	module.exports = shallowCloneObject;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React             = __webpack_require__(1);
	var PropTypes         = React.PropTypes;
	var shallowEqual      = __webpack_require__(73);
	var HeaderCell        = __webpack_require__(74);
	var getScrollbarSize  = __webpack_require__(75);

	var HeaderRow = React.createClass({displayName: 'HeaderRow',

	  propTypes: {
	    width: PropTypes.number,
	    height: PropTypes.number.isRequired,
	    columns: PropTypes.array.isRequired,
	    onColumnResize: PropTypes.func
	  },

	  render:function() {
	    var cellsStyle = {
	      width: this.props.width ? (this.props.width + getScrollbarSize()) : '100%',
	      height: this.props.height,
	      whiteSpace: 'nowrap',
	      overflowX: 'hidden',
	      overflowY: 'hidden'
	    };

	    var cells = this.getCells();
	    return (
	      React.createElement("div", React.__spread({},  this.props, {style: this.getStyle(), className: "react-grid-HeaderRow"}), 
	        React.createElement("div", {style: cellsStyle}, 
	          cells
	        )
	      )
	    );
	  },

	  getCells:function() {
	    var cells = [];
	    var lockedCells = [];

	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      var column = this.props.columns[i];
	      var cell = (
	        React.createElement(HeaderCell, {
	          ref: i, 
	          key: i, 
	          height: this.props.height, 
	          column: column, 
	          renderer: this.props.headerCellRenderer || column.headerRenderer || this.props.cellRenderer, 
	          resizing: this.props.resizing === column, 
	          onResize: this.props.onColumnResize, 
	          onResizeEnd: this.props.onColumnResizeEnd}
	          )
	      );
	      if (column.locked) {
	        lockedCells.push(cell);
	      } else {
	        cells.push(cell);
	      }
	    }

	    return cells.concat(lockedCells);
	  },

	  setScrollLeft:function(scrollLeft) {
	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      if (this.props.columns[i].locked) {
	        this.refs[i].setScrollLeft(scrollLeft);
	      }
	    }
	  },

	  shouldComponentUpdate:function(nextProps) {
	    return (
	      nextProps.width !== this.props.width
	      || nextProps.height !== this.props.height
	      || nextProps.columns !== this.props.columns
	      || !shallowEqual(nextProps.style, this.props.style)
	    );
	  },

	  getStyle:function() {
	    return {
	      overflow: 'hidden',
	      width: '100%',
	      height: this.props.height,
	      position: 'absolute'
	    };
	  }

	});

	module.exports = HeaderRow;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	/**
	 * Return window's height and width
	 *
	 * @return {Object} height and width of the window
	 */
	function getWindowSize() {
	    var width = window.innerWidth;
	    var height = window.innerHeight;

	    if (!width || !height) {
	        width = document.documentElement.clientWidth;
	        height = document.documentElement.clientHeight;
	    }

	    if (!width || !height) {
	        width = document.body.clientWidth;
	        height = document.body.clientHeight;
	    }

	    return {width:width, height:height};
	}

	module.exports = getWindowSize;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var PropTypes      = React.PropTypes;
	var cloneWithProps = React.addons.cloneWithProps;
	var shallowEqual   = __webpack_require__(73);
	var emptyFunction  = __webpack_require__(47);
	var ScrollShim     = __webpack_require__(76);
	var Row            = __webpack_require__(77);

	var Canvas = React.createClass({displayName: 'Canvas',
	  mixins: [ScrollShim],

	  propTypes: {
	    cellRenderer: PropTypes.element,
	    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
	    rowHeight: PropTypes.number.isRequired,
	    displayStart: PropTypes.number.isRequired,
	    displayEnd: PropTypes.number.isRequired,
	    length: PropTypes.number.isRequired,
	    rows: PropTypes.oneOfType([
	      PropTypes.func.isRequired,
	      PropTypes.array.isRequired
	    ]),
	    onRows: PropTypes.func
	  },

	  render:function() {
	    var displayStart = this.state.displayStart;
	    var displayEnd = this.state.displayEnd;
	    var rowHeight = this.props.rowHeight;
	    var length = this.props.length;

	    var rows = this
	        .getRows(displayStart, displayEnd)
	        .map(function(row, idx)  {return this.renderRow({
	          key: displayStart + idx,
	          ref: idx,
	          idx: displayStart + idx,
	          row: row,
	          height: rowHeight,
	          columns: this.props.columns,
	          cellRenderer: this.props.cellRenderer,
	          isSelected : this.isRowSelected(displayStart + idx),
	          expandedRows : this.props.expandedRows
	        });}.bind(this));

	    this._currentRowsLength = rows.length;

	    if (displayStart > 0) {
	      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
	    }

	    if (length - displayEnd > 0) {
	      rows.push(
	        this.renderPlaceholder('bottom', (length - displayEnd) * rowHeight));
	    }

	    var style = {
	      position: 'absolute',
	      top: 0,
	      left: 0,
	      overflowX: 'auto',
	      overflowY: 'scroll',
	      width: this.props.totalWidth,
	      height: this.props.height,
	      transform: 'translate3d(0, 0, 0)'
	    };

	    return (
	      React.createElement("div", {
	        style: style, 
	        onScroll: this.onScroll, 
	        className: cx("react-grid-Canvas", this.props.className)}, 
	        React.createElement("div", {style: {width: this.props.width, overflow: 'hidden'}}, 
	          rows
	        )
	      )
	    );
	  },

	  renderRow:function(props) {
	    if (React.isValidElement(this.props.rowRenderer)) {
	      return cloneWithProps(this.props.rowRenderer, props);
	    } else {
	      return this.props.rowRenderer(props);
	    }
	  },

	  renderPlaceholder:function(key, height) {
	    return (
	      React.createElement("div", {key: key, style: {height: height}}, 
	        this.props.columns.map(
	          function(column, idx)  {return React.createElement("div", {style: {width: column.width}, key: idx});})
	      )
	    );
	  },

	  getDefaultProps:function() {
	    return {
	      rowRenderer: React.createElement(Row, null),
	      onRows: emptyFunction
	    };
	  },

	  isRowSelected:function(rowIdx){
	   return this.props.selectedRows && this.props.selectedRows[rowIdx] === true;
	  },

	  getInitialState:function() {
	    return {
	      shouldUpdate: true,
	      displayStart: this.props.displayStart,
	      displayEnd: this.props.displayEnd
	    };
	  },

	  componentWillMount:function() {
	    this._currentRowsLength = undefined;
	    this._currentRowsRange = undefined;
	    this._scroll = undefined;
	  },

	  componentDidMount:function() {
	    this.onRows();
	  },

	  componentDidUpdate:function() {
	    if (this._scroll !== undefined) {
	      this.setScrollLeft(this._scroll);
	    }
	    this.onRows();
	  },

	  componentWillUnmount:function() {
	    this._currentRowsLength = undefined;
	    this._currentRowsRange = undefined;
	    this._scroll = undefined;
	  },

	  componentWillReceiveProps:function(nextProps) {
	    var shouldUpdate = !(nextProps.visibleStart > this.state.displayStart
	                        && nextProps.visibleEnd < this.state.displayEnd)
	                        || nextProps.length !== this.props.length
	                        || nextProps.rowHeight !== this.props.rowHeight
	                        || nextProps.columns !== this.props.columns
	                        || nextProps.width !== this.props.width
	                        || !shallowEqual(nextProps.style, this.props.style);

	    if (shouldUpdate) {
	      this.setState({
	        shouldUpdate: true,
	        displayStart: nextProps.displayStart,
	        displayEnd: nextProps.displayEnd
	      });
	    } else {
	      this.setState({shouldUpdate: false});
	    }
	  },

	  shouldComponentUpdate:function(nextProps, nextState) {
	    return nextState.shouldUpdate;
	  },

	  onRows:function() {
	    if (this._currentRowsRange !== undefined) {
	      this.props.onRows(this._currentRowsRange);
	      this._currentRowsRange = undefined;
	    }
	  },

	  getRows:function(displayStart, displayEnd) {
	    this._currentRowsRange = {start: displayStart, end: displayEnd};
	    if (Array.isArray(this.props.rows)) {
	      return this.props.rows.slice(displayStart, displayEnd);
	    } else {
	      return this.props.rows(displayStart, displayEnd);
	    }
	  },

	  setScrollLeft:function(scrollLeft) {
	    if (this._currentRowsLength !== undefined) {
	      for (var i = 0, len = this._currentRowsLength; i < len; i++) {
	        if(this.refs[i]) {
	          this.refs[i].setScrollLeft(scrollLeft);
	        }
	      }
	    }
	  },

	  getScroll:function() {
	    var $__0=   this.getDOMNode(),scrollTop=$__0.scrollTop,scrollLeft=$__0.scrollLeft;
	    return {scrollTop:scrollTop, scrollLeft:scrollLeft};
	  },

	  onScroll:function(e) {
	    this.appendScrollShim();
	    var $__0=   e.target,scrollTop=$__0.scrollTop,scrollLeft=$__0.scrollLeft;
	    var scroll = {scrollTop:scrollTop, scrollLeft:scrollLeft};
	    this._scroll = scroll;
	    this.props.onScroll(scroll);
	  }
	});


	module.exports = Canvas;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule emptyFunction
	 */
	'use strict';

	var copyProperties = __webpack_require__(78);

	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	copyProperties(emptyFunction, {
	  thatReturns: makeEmptyFunction,
	  thatReturnsFalse: makeEmptyFunction(false),
	  thatReturnsTrue: makeEmptyFunction(true),
	  thatReturnsNull: makeEmptyFunction(null),
	  thatReturnsThis: function() { return this; },
	  thatReturnsArgument: function(arg) { return arg; }
	});

	module.exports = emptyFunction;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React                = __webpack_require__(1);
	var PropTypes            = React.PropTypes;
	var Header               = __webpack_require__(79);
	var Viewport             = __webpack_require__(80);
	var ColumnMetrics        = __webpack_require__(53);
	var DOMMetrics           = __webpack_require__(81);


	var GridScrollMixin = {

	  componentDidMount:function() {
	    this._scrollLeft = this.refs.viewport.getScroll().scrollLeft;
	    this._onScroll();
	  },

	  componentDidUpdate:function() {
	    this._onScroll();
	  },

	  componentWillMount:function() {
	    this._scrollLeft = undefined;
	  },

	  componentWillUnmount:function() {
	    this._scrollLeft = undefined;
	  },

	  onScroll:function($__0) {var scrollLeft=$__0.scrollLeft;
	    if (this._scrollLeft !== scrollLeft) {
	      this._scrollLeft = scrollLeft;
	      this._onScroll();
	    }
	  },

	  _onScroll:function() {
	    if (this._scrollLeft !== undefined) {
	      this.refs.header.setScrollLeft(this._scrollLeft);
	      this.refs.viewport.setScrollLeft(this._scrollLeft);
	    }
	  }
	};

	var Grid = React.createClass({displayName: 'Grid',
	  mixins: [
	    GridScrollMixin,
	    ColumnMetrics.Mixin,
	    DOMMetrics.MetricsComputatorMixin
	  ],

	  propTypes: {
	    rows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    columns: PropTypes.array.isRequired
	  },

	  getStyle: function(){
	    return{
	      overflow: 'hidden',
	      outline: 0,
	      position: 'relative',
	      minHeight: this.props.minHeight
	    }
	  },

	  render:function() {
	    var headerRows = this.props.headerRows || [{ref : 'row'}];
	    return (
	      React.createElement("div", React.__spread({},  this.props, {style: this.getStyle(), className: "react-grid-Grid"}), 
	        React.createElement(Header, {
	          ref: "header", 
	          columns: this.state.columns, 
	          onColumnResize: this.onColumnResize, 
	          height: this.props.rowHeight, 
	          totalWidth: this.DOMMetrics.gridWidth(), 
	          headerRows: headerRows}
	          ), 
	        React.createElement(Viewport, {
	          ref: "viewport", 
	          width: this.state.columns.width, 
	          rowHeight: this.props.rowHeight, 
	          rowRenderer: this.props.rowRenderer, 
	          cellRenderer: this.props.cellRenderer, 
	          rows: this.props.rows, 
	          selectedRows: this.props.selectedRows, 
	          expandedRows: this.props.expandedRows, 
	          length: this.props.length, 
	          columns: this.state.columns, 
	          totalWidth: this.DOMMetrics.gridWidth(), 
	          onScroll: this.onScroll, 
	          onRows: this.props.onRows, 
	          rowOffsetHeight: this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length}
	          )
	      )
	    );
	  },

	  getDefaultProps:function() {
	    return {
	      rowHeight: 35,
	      minHeight: 350
	    };
	  },
	});

	module.exports = Grid;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var KeyboardHandlerMixin = __webpack_require__(41);
	var MixinHelper    = __webpack_require__(40);

	var SelectableMixin = MixinHelper.createDependency({KeyboardHandlerMixin : KeyboardHandlerMixin}).assignTo({

	  getDefaultProps : function(){
	    return {
	      tabIndex : -1,
	      ref : "cell"
	    }
	  },

	  isSelected: function() {
	    return (
	      this.props.selected
	      && this.props.selected.rowIdx === this.props.rowIdx
	      && this.props.selected.idx === this.props.idx
	    );
	  },

	  onClick: function() {
	    var rowIdx = this.props.rowIdx;
	    var idx = this.props.idx;
	    this.props.onClick({rowIdx: rowIdx, idx: idx});
	  },

	  onPressArrowUp:function(e){
	    this.moveSelectedCell(e, -1, 0);
	  },

	  onPressArrowDown:function(e){
	    this.moveSelectedCell(e, 1, 0);
	  },

	  onPressArrowLeft:function(e){
	    this.moveSelectedCell(e, 0, -1);
	  },

	  onPressArrowRight:function(e){
	    this.moveSelectedCell(e, 0, 1);
	  },

	  onPressTab:function(e){
	    this.moveSelectedCell(e, 0, 1);
	  },

	  moveSelectedCell:function(e, rowDelta, cellDelta){
	    e.stopPropagation();
	    e.preventDefault();
	    var rowIdx = this.props.rowIdx + rowDelta;
	    var idx = this.props.idx + cellDelta;
	    this.props.onSelect({idx: idx, rowIdx: rowIdx});
	  },

	  setScrollLeft: function(scrollLeft) {
	    this.refs.row.setScrollLeft(scrollLeft);
	  },

	  componentDidMount: function() {
	    this.checkFocus();
	  },

	  componentDidUpdate: function() {
	    this.checkFocus();
	  },

	  isCellSelectionChanging:function(nextProps){
	    if(this.props.selected && nextProps.selected){
	      return this.props.idx === nextProps.selected.idx || this.props.idx === this.props.selected.idx;
	    }else{
	      return true;
	    }
	  },

	  checkFocus: function() {
	    if (this.isSelected()) {
	      this.getDOMNode().focus();
	    }
	  }
	})



	module.exports = SelectableMixin;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React            = __webpack_require__(1);
	var cx               = React.addons.classSet;
	var cloneWithProps   = React.addons.cloneWithProps;
	var SimpleTextEditor = __webpack_require__(82);
	var PropTypes        = React.PropTypes;
	var MixinHelper      = __webpack_require__(40);
	var SelectableMixin  = __webpack_require__(50);
	var KeyboardHandlerMixin = __webpack_require__(41);

	var EditableMixin = MixinHelper.createDependency({

	  KeyboardHandlerMixin : KeyboardHandlerMixin,

	  SelectableMixin : SelectableMixin

	  }).assignTo({

	    propTypes : {
	        onCommit : PropTypes.func.isRequired
	    },

	    canEdit:function(){
	      return (this.props.column.editor != null) || this.props.column.editable;
	    },


	    getEditor:function(){

	      var editorProps = {height : this.props.height, onPressEscape : this.onPressEscape,  onCommit : this.onCommit, initialKeyCode : this.props.selected.initialKeyCode, editorRowMetaData : this.getEditorRowMetaData()};
	      var customEditor = this.props.column.editor;
	      if(customEditor && React.isValidElement(customEditor)){
	        //return custom column editor or SimpleEditor if none specified
	        return cloneWithProps(customEditor, editorProps);
	      }else{
	        return cloneWithProps(SimpleTextEditor(), editorProps);
	      }
	    },

	    getEditorRowMetaData:function(){
	      //clone row data so editor cannot actually change this
	      var columnName = this.props.column.ItemId;
	      //convention based method to get corresponding Id or Name of any Name or Id property
	      if(typeof this.props.column.getEditorRowMetaData === 'function'){
	        return this.props.column.getEditorRowMetaData(this.props.rowData);
	      }
	    },

	    getFormatter:function(){
	      var col = this.props.column;
	      if(this.isActive()){
	        return this.getEditor();
	      }else{
	        return this.props.column.formatter;
	      }
	    },

	    onCommit:function(commit){
	      var rowIdx = this.props.rowIdx;
	      var idx = this.props.idx;
	      var cellKey = this.props.column.key;
	      this.props.onCommit({cellKey: cellKey, rowIdx: this.props.filterRowIdx || rowIdx, value : commit.value, keyCode : commit.key, changed : commit});
	    },

	    checkFocus: function() {
	      if (this.isSelected() && !this.isActive()) {
	        this.getDOMNode().focus();
	      }
	    },

	    onClick:function() {
	      if(!this.isActive()){
	        var rowIdx = this.props.rowIdx;
	        var idx = this.props.idx;
	        this.props.onClick({rowIdx: rowIdx, idx: idx});
	      }

	    },

	    onDoubleClick:function() {
	      var rowIdx = this.props.rowIdx;
	      var idx = this.props.idx;
	      this.props.onClick({rowIdx: rowIdx, idx: idx, active : this.canEdit()});
	    },

	    setActive:function(keyPressed){
	      var rowIdx = this.props.rowIdx;
	      var idx = this.props.idx;
	      if(this.props.column.key === 'select-row' && this.props.column.onRowSelect){
	        this.props.column.onRowSelect(rowIdx);
	      }
	      else if(this.canEdit() && !this.isActive()){
	        this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : true, initialKeyCode : keyPressed});
	      }
	    },

	    setInactive:function(){
	      if(this.canEdit() && this.isActive()){
	        var rowIdx = this.props.rowIdx;
	        var idx = this.props.idx;
	        this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : false});
	      }
	    },

	    isActive:function(){
	      return this.isSelected() && this.props.selected.active === true;
	    },

	    onPressEnter:function(e){
	      this.setActive(e.key);
	    },

	    onPressDelete:function(e){
	      this.setActive(e.key);
	    },

	    onPressEscape:function(e){
	      this.setInactive(e.key);
	    },

	    onPressBackspace:function(e){
	      this.setActive(e.key);
	    },

	    onPressChar:function(e){
	      if(this.isKeyPrintable(e.keyCode)){
	        this.setActive(e.keyCode);
	      }
	    }
	});



	module.exports = EditableMixin;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;

	var Cell = React.createClass({displayName: 'Cell',

	  render:function() {
	    var style = this.getStyle();
	    var className = cx(
	      'react-grid-Cell',
	      this.props.className,
	      this.props.column.locked ? 'react-grid-Cell--locked' : null
	    );

	    var cellContent = this.renderCellContent({
	      value : this.props.value,
	      column : this.props.column,
	      rowIdx : this.props.rowIdx,
	      isExpanded : this.props.isExpanded
	    });

	    return (
	      React.createElement("div", React.__spread({},  this.props, {className: className, style: style}), 
	          cellContent, 
	          React.createElement("div", {className: "drag-handle", draggable: "true", onDragStart: this.props.handleDragStart}
	          )
	      )
	    );
	  },

	  renderCellContent:function(props) {
	    var formatter = React.isValidElement(this.props.formatter) ? cloneWithProps(this.props.formatter, props) : this.props.formatter(props);
	    return (React.createElement("div", {
	      className: "react-grid-Cell__value"}, formatter, " ", this.props.cellControls))

	  },

	  getDefaultProps:function() {
	    return {
	      formatter: simpleCellFormatter
	    };
	  },

	  getStyle:function() {
	    var style = {
	      position: 'absolute',
	      width: this.props.column.width,
	      height: this.props.height,
	      left: this.props.column.left
	    };
	    return style;
	  },

	  setScrollLeft:function(scrollLeft) {
	    if (this.isMounted()) {
	      var node = this.getDOMNode();
	      var transform = ("translate3d(" + scrollLeft + "px, 0px, 0px)");
	      node.style.webkitTransform = transform;
	      node.style.transform = transform;
	    }
	  }
	});

	function simpleCellFormatter(props) {
	  return props.value;
	}

	module.exports = Cell;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var $__0=   __webpack_require__(1),PropTypes=$__0.PropTypes,isValidElement=$__0.isValidElement;
	var shallowCloneObject            = __webpack_require__(83);
	var DOMMetrics                    = __webpack_require__(81);
	var merge                         = __webpack_require__(58);

	/**
	 * Update column metrics calculation.
	 *
	 * @param {ColumnMetrics} metrics
	 */
	function calculate(metrics) {
	  var width = 0;
	  var unallocatedWidth = metrics.totalWidth;

	  var deferredColumns = [];
	  var columns = metrics.columns.map(shallowCloneObject);

	  var i, len, column;

	  // compute width for columns which specify width
	  for (i = 0, len = columns.length; i < len; i++) {
	    column = columns[i];

	    if (column.width) {
	      if (/^([0-9]+)%$/.exec(column.width)) {
	        column.width = Math.floor(
	          parseInt(column.width, 10) / 100 * metrics.totalWidth);
	      }
	      unallocatedWidth -= column.width;
	      width += column.width;
	    } else {
	      deferredColumns.push(column);
	    }

	  }

	  // compute width for columns which doesn't specify width
	  for (i = 0, len = deferredColumns.length; i < len; i++) {
	    column = deferredColumns[i];

	    if (unallocatedWidth <= 0) {
	      column.width = metrics.minColumnWidth;
	    } else {
	      column.width = Math.floor(unallocatedWidth / deferredColumns.length);
	    }
	    width += column.width;
	  }

	  // compute left offset
	  var left = 0;
	  for (i = 0, len = columns.length; i < len; i++) {
	    column = columns[i];
	    column.left = left;
	    left += column.width;
	  }

	  return {
	    columns:columns,
	    width:width,
	    totalWidth: metrics.totalWidth,
	    minColumnWidth: metrics.minColumnWidth
	  };
	}

	/**
	 * Update column metrics calculation by resizing a column.
	 *
	 * @param {ColumnMetrics} metrics
	 * @param {Column} column
	 * @param {number} width
	 */
	function resizeColumn(metrics, index, width) {
	  var column = metrics.columns[index];
	  metrics = shallowCloneObject(metrics);
	  metrics.columns = metrics.columns.slice(0);

	  var updatedColumn = shallowCloneObject(column);
	  updatedColumn.width = Math.max(width, metrics.minColumnWidth);

	  metrics.columns.splice(index, 1, updatedColumn);

	  return calculate(metrics);
	}

	var Mixin = {
	  mixins: [DOMMetrics.MetricsMixin],

	  propTypes: {
	    columns: PropTypes.array,
	    minColumnWidth: PropTypes.number,
	    columnEquality: PropTypes.func
	  },

	  DOMMetrics: {
	    gridWidth:function() {
	      return this.getDOMNode().offsetWidth - 2;
	    }
	  },

	  getDefaultProps:function() {
	    return {
	      minColumnWidth: 80,
	      columnEquality: sameColumn
	    };
	  },

	  getInitialState:function() {
	    return this.getColumnMetrics(this.props, true);
	  },

	  componentWillReceiveProps:function(nextProps) {
	    if (nextProps.columns) {
	      if (!sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality)) {
	        this.setState(this.getColumnMetrics(nextProps));
	      } else {
	        var index = {};
	        this.state.columns.columns.forEach(function(c)  {
	          index[c.key] = {width: c.width, left: c.left};
	        });
	        var nextColumns = merge(this.state.columns, {
	          columns: nextProps.columns.map(function(c)  {return merge(c, index[c.key]);})
	        });
	        this.setState({columns: nextColumns});
	      }
	    }
	  },

	  getColumnMetrics:function(props, initial) {
	    var totalWidth = initial ? null : this.DOMMetrics.gridWidth();
	    return {
	      columns: calculate({
	        columns: props.columns,
	        width: null,
	        totalWidth:totalWidth,
	        minColumnWidth: props.minColumnWidth
	      }),
	      gridWidth: totalWidth
	    };
	  },

	  metricsUpdated:function() {
	    this.setState(this.getColumnMetrics(this.props));
	  },

	  onColumnResize:function(index, width) {
	    var columns = resizeColumn(this.state.columns, index, width);
	    this.setState({columns:columns});
	  }
	};

	function sameColumns(prevColumns, nextColumns, sameColumn) {
	  var i, len, column;
	  var prevColumnsByKey = {};
	  var nextColumnsByKey = {};


	  if(prevColumns.length !== nextColumns.length){
	    return false;
	  }

	  for (i = 0, len = prevColumns.length; i < len; i++) {
	    column = prevColumns[i];
	    prevColumnsByKey[column.key] = column;
	  }

	  for (i = 0, len = nextColumns.length; i < len; i++) {
	    column = nextColumns[i];
	    nextColumnsByKey[column.key] = column;
	    var prevColumn = prevColumnsByKey[column.key];
	    if (prevColumn === undefined || !sameColumn(prevColumn, column)) {
	      return false;
	    }
	  }

	  for (i = 0, len = prevColumns.length; i < len; i++) {
	    column = prevColumns[i];
	    var nextColumn = nextColumnsByKey[column.key];
	    if (nextColumn === undefined) {
	      return false;
	    }
	  }

	  return true;
	}

	function sameColumn(a, b) {
	  var k;

	  for (k in a) {
	    if (a.hasOwnProperty(k)) {
	      if ((typeof a[k] === 'function' && typeof b[k] === 'function') || (isValidElement(a[k]) && isValidElement(b[k]))) {
	        continue;
	      }
	      if (!b.hasOwnProperty(k) || a[k] !== b[k]) {
	        return false;
	      }
	    }
	  }

	  for (k in b) {
	    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = {Mixin:Mixin, calculate:calculate, resizeColumn:resizeColumn, sameColumns:sameColumns, sameColumn:sameColumn};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var PropTypes      = React.PropTypes;
	var SimpleTextEditor = __webpack_require__(82);
	var MixinHelper      = __webpack_require__(40);
	var SelectableMixin  = __webpack_require__(50);
	var KeyboardHandlerMixin = __webpack_require__(41);

	var CopyableMixin = MixinHelper.createDependency({

	  KeyboardHandlerMixin : KeyboardHandlerMixin,

	  SelectableMixin : SelectableMixin

	}).assignTo({

	  getCellClass : function(){
	    return cx({
	      'selected' : this.isSelected() && !this.isCopied(),
	      'copied' : this.isCopied()
	    })
	  },

	  KeyCode_c : '99',

	  KeyCode_C : '67',

	  KeyCode_V : '86',

	  KeyCode_v : '118',

	  propTypes : {
	    handleCopy : React.PropTypes.func.isRequired,
	    handlePaste : React.PropTypes.func.isRequired
	  },

	  isCopied : function(){
	    return (
	      this.props.copied
	      && this.props.copied.rowIdx === this.props.rowIdx
	      && this.props.copied.idx === this.props.idx
	    );
	  },

	  onPressKeyWithCtrl:function(e){
	    if(this.canEdit()){
	      if(e.keyCode == this.KeyCode_c || e.keyCode == this.KeyCode_C){
	        this.props.handleCopy({value : this.props.value});
	      }else if(e.keyCode == this.KeyCode_v || e.keyCode == this.KeyCode_V){
	        this.props.handlePaste({value : this.props.value});
	      }
	    }
	  }
	});



	module.exports = CopyableMixin;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var PropTypes      = React.PropTypes;
	var MixinHelper      = __webpack_require__(40);
	var SelectableMixin  = __webpack_require__(50);
	var KeyboardHandlerMixin = __webpack_require__(41);

	var DraggableMixin = MixinHelper.createDependency({

	  KeyboardHandlerMixin : KeyboardHandlerMixin,

	  SelectableMixin : SelectableMixin

	}).assignTo({

	getCellClass : function(){
	  return cx({
	    'selected-draggable' : this.isSelected(),
	    'active-drag-cell' : this.isSelected() || this.isDraggedOver(),
	    'is-dragged-over-up' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < this.props.dragged.rowIdx,
	    'is-dragged-over-down' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > this.props.dragged.rowIdx,
	    'was-dragged-over' : this.wasDraggedOver()
	  });
	},

	  getDefaultProps : function(){
	    return {
	        handleDragStart: this.handleDragStart,
	        onDragEnter: this.handleDragEnter,
	        onDragEnd: this.handleDragEnd
	    }
	  },

	  propTypes : {
	    handleDragEnter : React.PropTypes.func.isRequired,
	    handleDragStart : React.PropTypes.func.isRequired,
	    handleDragEnd : React.PropTypes.func.isRequired,
	    handleTerminateDrag : React.PropTypes.func.isRequired
	  },

	  isDraggedOver:function(){

	      return (
	        this.props.dragged &&
	        this.props.dragged.overRowIdx === this.props.rowIdx
	        && this.props.dragged.idx === this.props.idx
	      )
	  },

	  wasDraggedOver:function(){
	    return (
	      this.props.dragged
	      && ((this.props.dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < this.props.dragged.rowIdx)
	      ||  (this.props.dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > this.props.dragged.rowIdx))
	      && this.props.dragged.idx === this.props.idx
	    );
	  },

	  handleDragStart:function(e){
	    var rowIdx = this.props.rowIdx;
	    var idx = this.props.idx;
	    this.props.handleDragStart({rowIdx : rowIdx, idx : idx, copiedText : this.props.value});
	  },

	  handleDragEnter:function(){
	    this.props.handleDragEnter(this.props.rowIdx);
	  },

	  handleDragEnd:function(){
	    this.props.handleDragEnd();
	  },

	  isDraggedCellChanging:function(nextProps){
	    return (nextProps.dragged && this.props.idx === nextProps.dragged.idx)
	    || (this.props.dragged && this.props.idx === this.props.dragged.idx);
	  },

	  componentDidUpdate:function(){
	    var dragged = this.props.dragged;
	    if(dragged && dragged.complete === true){
	      this.props.handleTerminateDrag();
	    }
	  }

	});



	module.exports = DraggableMixin;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                = __webpack_require__(1);
	var BaseCell             = __webpack_require__(31);
	var SelectableMixin      = __webpack_require__(86);
	var EditableMixin        = __webpack_require__(87);
	var CopyableMixin        = __webpack_require__(88);
	var DraggableMixin       = __webpack_require__(89);
	var MixinHelper          = __webpack_require__(66);
	var KeyboardHandlerMixin = __webpack_require__(90);
	var isFunction           = __webpack_require__(91);
	var PropTypes            = React.PropTypes;
	var cx                   = React.addons.classSet;
	var cloneWithProps       = React.addons.cloneWithProps;



	var CellControls = React.createClass({displayName: 'CellControls',

	  onClickEdit : function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    this.props.onClickEdit();
	  },

	  onShowMore : function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    var newHeight = this.props.column.getExpandedHeight(this.props.value);
	    this.props.onShowMore(this.props.rowIdx, newHeight);
	  },

	  onShowLess : function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    this.props.onShowLess(this.props.rowIdx);
	  },

	  shouldComponentUpdate:function(nextProps, nextState){
	    return this.props.height != nextProps.height;
	  },

	  renderShowMoreButton:function(){
	    if(isFunction(this.props.column.getExpandedHeight) && this.props.column.getExpandedHeight(this.props.value) > 0){
	      var newHeight = this.props.column.getExpandedHeight(this.props.value);
	      if(newHeight > this.props.height){
	        return React.createElement("button", {type: "button", className: "btn btn-link btn-xs", onClick: this.onShowMore}, "Show More")
	      }else{
	        return React.createElement("button", {type: "button", className: "btn btn-link btn-xs", onClick: this.onShowLess}, "Show Less")
	      }
	    }else{
	      return null;
	    }
	  },

	  render : function(){
	    return (React.createElement("div", {className: "pull-right btn-group"}, 
	              this.renderShowMoreButton, 
	              React.createElement("button", {onClick: this.onClickEdit, type: "button", className: "btn btn-link btn-xs"}, "Edit")
	            ))
	  }

	})


	var ExcelCell = React.createClass({displayName: 'ExcelCell',

	  mixins : [EditableMixin, CopyableMixin, DraggableMixin],

	  overrides : {
	    getCellClass : function(){
	      return cx({
	        'selected' : this.isSelected() && !this.isCopied() && !this.isActive(),
	        'editing' : this.isActive(),
	        'copied' : this.isCopied(),
	        'selected-draggable' : this.isSelected() && !this.isActive() && this.canEdit(),
	        'active-drag-cell' : this.isActiveDragCell() && this.canEdit(),
	        'is-dragged-over-up' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < this.props.dragged.rowIdx,
	        'is-dragged-over-down' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > this.props.dragged.rowIdx,
	        'was-dragged-over' : this.wasDraggedOver() && this.canEdit()
	      });
	    }
	  },

	  isActiveDragCell : function(){
	    return (this.isSelected() || this.isDraggedOver()) && !this.isActive();
	  },

	  isExpanded : function(){
	    var isExpanded = false;
	    if(isFunction(this.props.column.getExpandedHeight) && this.props.column.getExpandedHeight(this.props.value) > 0){
	      var newHeight = this.props.column.getExpandedHeight(this.props.value);
	      if(this.props.height >= newHeight){
	        isExpanded = true;
	      }else{
	        isExpanded = false;
	      }
	    }
	    return isExpanded;
	  },


	  shouldComponentUpdate:function(nextProps, nextState) {
	    return this.props.column.width !== nextProps.column.width
	    || this.props.value !== nextProps.value
	    || this.props.height !== nextProps.height
	    || this.props.rowIdx !== nextProps.rowIdx
	    || this.isCellSelectionChanging(nextProps)
	    || this.isDraggedCellChanging(nextProps);
	  },


	  render: function() {
	    return (
	      React.createElement(BaseCell, React.__spread({}, 
	        this.props, 
	        {className: this.getCellClass(), 
	        onKeyDown: this.onKeyDown, 
	        onClick: this.onClick, 
	        onDoubleClick: this.onDoubleClick, 
	        formatter: this.getFormatter(), 
	        handleDragStart: this.handleDragStart, 
	        onDragEnter: this.handleDragEnter, 
	        onDragEnd: this.props.handleDragEnd, 
	        cellControls: this.props.column.showCellControls && !this.isActive() ? React.createElement(CellControls, {height: this.props.height, value: this.props.value, rowIdx: this.props.rowIdx, column: this.props.column, onShowMore: this.props.onShowMore, onShowLess: this.props.onShowLess, onClickEdit: this.setActive}) : null, 
	        isExpanded: this.isExpanded()})
	      ))
	  }

	})

	module.exports = ExcelCell;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var BaseRow       = __webpack_require__(30);
	var ColumnMetrics = __webpack_require__(53);
	var ExcelRow = React.createClass({displayName: 'ExcelRow',

	  render:function() {
	    var row = React.addons.update(this.props.row,  {$merge : {'select-row' : this.props.isSelected}});

	    return (
	      React.createElement(BaseRow, React.__spread({}, 
	         this.props, 
	        {row: row, 
	        height: this.getRowHeight(this.props)}))
	      );
	  },

	  getRowHeight:function(props){
	    if(props.expandedRows && props.expandedRows[props.key]){
	      return props.expandedRows[props.key];
	    }else{
	      return props.height;
	    }
	  },

	  hasRowHeightChanged:function(props){
	    if(props.expandedRows){
	      if(typeof props.expandedRows[props.key] !== 'undefined'){
	        return this.props.height !== props.expandedRows[props.key]
	      }else{
	        return false;
	      }
	    }else{
	      return false;
	    }
	  },

	  shouldComponentUpdate:function(nextProps) {
	    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
	      this.doesRowContainSelectedCell()          ||
	      this.doesRowContainSelectedCell(nextProps) ||
	      this.willRowBeDraggedOver(nextProps)       ||
	      this.hasRowBeenCopied()                    ||
	      nextProps.row !== this.props.row           ||
	      this.hasRowHeightChanged(nextProps);
	  },

	  doesRowContainSelectedCell:function(propsToCheck){
	    var props = propsToCheck || this.props;
	    var cell = cell || props.cellRenderer;
	    if(cell.props && cell.props.selected && cell.props.selected.rowIdx === props.idx){
	      return true;
	    }else{
	      return false;
	    }
	  },

	  willRowBeDraggedOver:function(props){
	    if(props.cellRenderer.props){
	      var dragged = props.cellRenderer.props.dragged;
	      return  dragged != null && (dragged.rowIdx || dragged.complete === true);
	    }else{
	      return false;
	    }

	  },

	  hasRowBeenCopied:function(){
	    if(this.props.cellRenderer.props){
	      var cell = this.props.cellRenderer;
	      return cell.props.copied != null && cell.props.copied.rowIdx === this.props.idx;
	    }else{
	      return false;
	    }

	  },

	  setScrollLeft:function(scrollLeft) {
	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      if (this.props.columns[i].locked) {
	        this.refs[i].setScrollLeft(scrollLeft);
	      }
	    }
	  }


	});

	module.exports = ExcelRow;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule merge
	 */

	"use strict";

	/**
	 * Shallow merges two structures into a return value, without mutating either.
	 *
	 * @param {?object} one Optional object with properties to merge from.
	 * @param {?object} two Optional object with properties to merge from.
	 * @return {object} The shallow extension of one by two.
	 */
	var merge = function(one, two) {
	  var result = {};
	  if (one != null) {
	    Object.assign(result, one);
	  }
	  if (two != null) {
	    Object.assign(result, two);
	  }
	  return result;
	};

	function mergeFallback(obj1,obj2){
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    return obj3;
	}

	module.exports = Object.assign ? merge : mergeFallback;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var SelectableGridMixin = {

	  getColumns : function(){
	    return this.props.columns
	  },

	  getInitialState: function() {
	    return {selected: {rowIdx: 0, idx: 0}};
	  },

	  onSelect: function(selected) {
	    var idx = selected.idx;
	    var rowIdx = selected.rowIdx;
	    if (
	      idx >= 0
	      && rowIdx >= 0
	      && idx < this.getColumns().length
	      && rowIdx < this.props.length
	    ) {
	      if(this.props.onSelect){
	        this.props.onSelect({selected: selected});
	      }
	      this.setState({selected: selected});

	    }
	  }
	}

	module.exports = SelectableGridMixin;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React                    = __webpack_require__(1);
	var PropTypes                = React.PropTypes;
	var MixinHelper              = __webpack_require__(66);
	var SelectableGridMixin          = __webpack_require__(59);

	MixinHelper.addAlias('SelectableGridMixin');

	var DraggableGridMixin = {

	  mixinDependencies : ['SelectableGridMixin'],

	  propTypes : {
	    onCellsDragged : React.PropTypes.func.isRequired
	  },

	  getInitialState: function() {
	    return {dragged : null};
	  },

	  handleDragStart:function(dragged){
	    var idx = dragged.idx;
	    var rowIdx = dragged.rowIdx;
	    if (
	      idx >= 0
	      && rowIdx >= 0
	      && idx < this.getColumns().length
	      && rowIdx < this.props.length
	    ) {
	      this.setState({dragged: dragged});
	    }
	  },

	  handleDragEnter:function(row){
	    var selected = this.state.selected;
	    var dragged = this.state.dragged;
	    dragged.overRowIdx = row;
	   this.setState({dragged : dragged});
	  },

	  handleDragEnd:function(){
	    var fromRow, toRow;
	    var selected = this.state.selected;
	    var dragged = this.state.dragged;
	    var cellKey = this.getColumns()[this.state.selected.idx].key;
	    fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    toRow   = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    this.props.onCellsDragged({cellKey: cellKey , fromRow: fromRow, toRow : toRow, value : dragged.copiedText});
	    this.setState({dragged : {complete : true}});
	  },

	  handleTerminateDrag:function(){
	    this.setState({dragged: null});
	  }
	}


	module.exports = DraggableGridMixin;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(1);
	var PropTypes           = React.PropTypes;

	var CopyPasteGridMixin = {

	  propTypes : {
	    onCellChanged : React.PropTypes.func.isRequired
	  },

	  getInitialState: function() {
	    return {copied : null};
	  },


	  handleCopy:function(args){
	    var textToCopy = args.value;
	    var selected = this.state.selected;
	    var copied = {idx : selected.idx, rowIdx : selected.rowIdx};
	    this.setState({textToCopy:textToCopy, copied : copied});
	  },

	  handlePaste:function(){
	    var selected = this.state.selected;
	    var cellKey = this.getColumns()[selected.idx].key;
	    this.props.onCellCopyPaste({cellKey: cellKey , rowIdx: selected.rowIdx, value : this.state.textToCopy, fromRow : this.state.copied.rowIdx, toRow : selected.rowIdx});
	    this.setState({copied : null});
	  }
	}

	module.exports = CopyPasteGridMixin;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(1);
	var PropTypes           = React.PropTypes;
	var merge               = __webpack_require__(58);

	var EditableGridMixin = {

	  propTypes : {
	    onCellChanged : React.PropTypes.func.isRequired
	  },

	  onCellChanged:function(commit){
	    var selected = this.state.selected;
	    selected.active = false;
	    if(commit.keyCode === 'Tab'){
	      selected.idx += 1;
	    }
	    this.setState({selected : selected});
	    this.props.onCellChanged(commit);
	  },

	  onSetActive:function(activeCell) {
	    var selected = merge(this.state.selected, activeCell);
	    this.setState({selected: selected});
	  }

	};


	module.exports = EditableGridMixin;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(1);
	var PropTypes           = React.PropTypes;
	var SortableHeaderCell  = __webpack_require__(93);
	var shallowCloneObject  = __webpack_require__(83);

	var DEFINE_SORT = {
	  ASC : 'ASC',
	  DESC : 'DESC'
	}
	Object.freeze(DEFINE_SORT);

	var SortableGridMixin = {

	  getInitialState: function() {
	    return {sortDirection: null, sortColumn: null};
	  },

	   getDecoratedColumns: function(columns) {
	      return this.props.columns.map(function(column) {
	        column = shallowCloneObject(column);
	        if (column.sortable) {
	          column.headerRenderer = React.createElement(SortableHeaderCell, null);
	          column.sortBy = this.sortBy;
	          if (this.state.sortColumn === column.key) {
	            column.sorted = this.state.sortDirection;
	          }else{
	            column.sorted = DEFINE_SORT.NONE;
	          }
	        }
	        return column
	      }, this);
	    },

	    sortBy: function(column, direction) {
	      switch(direction){
	        case null:
	        case undefined:
	          direction = DEFINE_SORT.ASC;
	        break;
	        case DEFINE_SORT.ASC:
	          direction = DEFINE_SORT.DESC;
	        break;
	        case DEFINE_SORT.DESC:
	          direction = null;
	        break;
	      }
	      this.setState({sortDirection: direction, sortColumn: column.key});
	    },

	    sortRows: function(rows) {
	      //feels naughty
	      rows = [].concat(rows);
	      var sortColumn = this.state.sortColumn;
	      var sortDirection = this.state.sortDirection;
	      if(sortColumn != null && sortDirection !== null){
	        return rows.sort(function(row1, row2){
	           var k1 = row1[sortColumn], k2 = row2[sortColumn];
	           if(sortDirection === DEFINE_SORT.ASC){
	             return (k1 > k2) ? 1 : ( (k2 > k1) ? -1 : 0 );
	           }else if(sortDirection === DEFINE_SORT.DESC){
	             return (k1 > k2) ? -1 : ( (k2 > k1) ? 1 : 0 );
	           }
	        });
	      }else{
	        return rows;
	      }

	    }

	}

	module.exports = SortableGridMixin;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(1);
	var PropTypes           = React.PropTypes;
	var FilterableHeaderCell = __webpack_require__(92);

	var FilterableGridMixin = {

	  getInitialState : function(){
	    return {canFilter : false, columnFilters : {}};
	  },

	  filterRows:function(){
	      var rows = this.props.rows;
	      if(this.state.sortColumn){
	        rows = this.sortRows(rows);
	      }

	      if(this.hasFilters()){
	        rows = rows.map(function(r, i)  {r.key = i;return r;}).filter(this.isRowDisplayed);
	        if(this.props.onFilter){
	          this.props.onFilter(rows);
	        }
	      }
	      return rows;
	    },

	    hasFilters:function(){
	      var hasFilters = false;
	      Object.keys(this.state.columnFilters).every(function(key){
	        var filter = this.state.columnFilters[key];
	        if(filter != null && filter != undefined && filter != ''){
	          hasFilters = true;
	          return false;
	        }
	          return true;
	      }, this);
	      return hasFilters;
	    },

	    isRowDisplayed:function(row){
	      var isRowDisplayed = null;
	      Object.keys(this.state.columnFilters).every(function(key){
	        var filter = this.state.columnFilters[key].toLowerCase();
	        var cellValue = row[key].toString().toLowerCase();
	        if(filter != null && filter != undefined && filter != '' && typeof cellValue === 'string'){
	          if(cellValue.indexOf(filter) > -1){
	            isRowDisplayed = true;
	          }else{
	            isRowDisplayed = false;
	            return false;
	          }
	        }
	        return true;
	      }, this);
	      return isRowDisplayed == null ? false : isRowDisplayed;
	    },

	    toggleFilter:function(){
	      this.setState({canFilter : !this.state.canFilter});
	    },

	    handleAddFilter:function(filter){
	      var columnFilters = this.state.columnFilters;
	      columnFilters[filter.columnKey] = filter.filterTerm;
	      this.setState({columnFilters : columnFilters, selected : null});
	    },

	    getHeaderRows:function(){
	      var rows = [{ref:"row", height: this.props.rowHeight}];
	      if(this.state.canFilter === true){
	        rows.push({ref:"filterRow", headerCellRenderer : React.createElement(FilterableHeaderCell, {onChange: this.handleAddFilter}), height : 45});
	      }
	      return rows;
	    },

	    getRowOffsetHeight:function(){
	      var offsetHeight = 0;
	      this.getHeaderRows().forEach(function(row)  {return offsetHeight += row.height;} );
	      return offsetHeight;
	    }

	}

	module.exports = FilterableGridMixin;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;

	var CheckBoxEditor = React.createClass({displayName: 'CheckBoxEditor',


	  PropTypes : {
	    value : React.PropTypes.bool.isRequired
	  },

	  render:function(){
	    return (React.createElement("input", {type: "checkbox", checked: this.props.value, onChange: this.handleChange}));
	  },

	  handleChange:function(e){
	    this.props.column.onRowSelect(this.props.rowIdx)
	  },

	  shouldComponentUpdate:function(nextProps, nextState){
	    return this.props.value != nextProps.value;
	  }

	});

	module.exports = CheckBoxEditor;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	
	"use strict";

	var keyMirror  = __webpack_require__(85);
	var isFunction = __webpack_require__(91)
	var React      = __webpack_require__(1);

	/**
	 * Policies that describe methods in Adazzle React Mixins
	 * Any methods that do not confirm to one of these policies will be treated as a custom method
	 * All custom methods will be wrapped to potentially allow override/extension as defined on a component
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods are React Lifecycle methods and should be mixed into any components
	   * according to their default behviour as specified in React library
	   */
	  DEFINE_LIFE_CYCLE_METHOD : null,
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base ReactCompositeComponent class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null

	});

	var MixinInterface = {


	  getDefaultProps : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  propTypes : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  getInitialState : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  statics : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  displayName : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  componentWillMount : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  componentWillReceiveProps : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  shouldComponentUpdate : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  componentWillUpdate : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  componentDidUpdate : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
	  componentWillUnmount : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD
	}

	var MixinAliasCache = {};
	var arePropertyDescriptorsSupported = function () {
	    try {
	      Object.defineProperty({}, 'x', {});
	      return true;
	    } catch (e) { /* this is IE 8. */
	      return false;
	    }
	  };

	/**
	 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
	 * @param obj1
	 * @param obj2
	 */
	function IE8_merge(obj1,obj2){
	    for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
	    return obj1;
	}
	//IE 8 does not support Object.assign even with polyfil.
	var merge = arePropertyDescriptorsSupported() ? Object.assign :
	 IE8_merge;

	var Mixin = function(base, dependsOn){
	  this.base = base;
	  this.dependsOn = dependsOn;
	};

	var Dependency = function(dependsOn){
	  this.assignTo = function(base){
	      return new Mixin(base, dependsOn);
	  }
	};


	var wrapEachMethodInObject = function(clone, results){
	  //loop over each property and mix according to its spec policy
	  Object.keys(clone).forEach(function(key){
	    if(mixinUtils.isCustomProperty(key)){
	      //overwrite each function of object with custom functionlity
	      if(isFunction(clone[key])){
	        clone[key] = mixinUtils.wrapCustomMethod(key, clone[key]);
	      }
	    }else{

	      switch(MixinInterface[key]){
	          case SpecPolicy.DEFINE_LIFE_CYCLE_METHOD:
	            var lifeCycleObj = {};
	            lifeCycleObj[key] = clone[key];
	            //add this to mixin result - will be treated as standard
	            results.push(lifeCycleObj);
	            break;
	          case SpecPolicy.DEFINE_MANY_MERGED:
	              //TODO imlplement handlers for other spec policies
	            break;
	      }

	      delete clone[key];
	    }

	  }, this);
	}


	var MixinHelper = {

	  /**
	   * Mix properties and methods from multiple objects, without mutating any of them
	   *
	   * @param {array} array of all mixins to be merged
	   * @return {array} A new array of mixins, the first object being an object of containing all custom methods wrapped
	   * Subsequent object in array will be any extracted lifecycle methods which should be treated as standard
	   */
	  mix : function(mixins){

	    var results = [];
	    var primary = {};

	    var dependencies = mixinUtils.getUniqueDependencies(mixins);
	    for (var d in dependencies){
	      merge(primary, MixinAliasCache[dependencies[d]]);
	    }
	    wrapEachMethodInObject(primary, results);

	    mixins.forEach(function(obj){
	      //clone the object so that original methods are not overwritten
	      var clone = {};
	      //check if mixin was created using Mixin Helper
	      //If it is then merge the properties object
	      if(obj instanceof Mixin){
	        merge(clone, obj.base);
	      }else{
	        merge(clone, obj);
	      }

	      wrapEachMethodInObject(clone, results);

	      merge(primary, clone);
	    }, this);

	    results.push(primary);


	    return results;
	  },


	  createDependency : function(deps){
	    var dependencyList = [];
	    for (var d in deps){
	      if(deps[d] instanceof Mixin){
	        this.addAlias(d, deps[d].base)
	      }else{
	        this.addAlias(d, deps[d])
	      }
	      dependencyList.push(d);
	    }
	    var uniqueDependencyList = dependencyList.filter(function(value, index, self) {
	      return self.indexOf(value) === index;
	    });
	    return new Dependency(uniqueDependencyList);
	  },

	  addAlias : function(key, object){
	    MixinAliasCache[key] = object;
	  }

	};

	// idea borrowed from https://github.com/jhudson8/react-mixin-manager/blob/master/react-mixin-manager.js
	var _createClass = React.createClass;
	React.createClass = function(spec) {
	  if (spec.mixins) {
	    spec.mixins = MixinHelper.mix(spec.mixins);
	  }
	  return _createClass.apply(React, arguments);
	};


	var mixinUtils = {

	  isCustomProperty : function(key){
	    return (!MixinInterface[key]);
	  },

	  wrapCustomMethod : function(methodName, old){
	    return function(){
	      //call overridden method if exists
	      if(mixinUtils.isMethodOverridden.call(this, methodName)){
	        return mixinUtils.callOverriddenMethod.call(this, methodName, arguments);
	      }else{
	        //call the original mixin method
	        return old.apply(this, arguments);
	      }
	    }
	  },

	  checkMethodExtendedAndCall : function(methodName, args){
	    if(this.extended && (typeof this.extended[methodName] === 'function')){
	      return this.extended[methodName].call(this, args);
	    }
	  },

	  checkMethodImplementedAndCall: function(methodName, args){
	    if(this.implemented && (typeof this.implemented[methodName] === 'function')){
	      return this.implemented[methodName].call(this, args);
	    }
	  },

	  isMethodOverridden: function(methodName){
	    return this.overrides && (typeof this.overrides[methodName] === 'function');
	  },

	  callOverriddenMethod: function(methodName, args){
	    return this.overrides[methodName].call(this, args);
	  },

	  getUniqueDependencies : function(mixins){
	    var deps = [];
	    mixins.forEach(function(m){
	      if(m instanceof Mixin){
	        deps = deps.concat(m.dependsOn);
	      }
	    }, this);
	    return deps.filter(function(value, index, self) {
	      return self.indexOf(value) === index;
	    });;
	  }
	}
	module.exports = MixinHelper;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(66);
	var EditorMixin             = __webpack_require__(94);
	var TextInputMixin          = __webpack_require__(95);
	var ReactAutocomplete       = __webpack_require__(106);
	var keyboardHandlerMixin    = __webpack_require__(90);

	var optionPropType = React.PropTypes.shape({
	      id    :   React.PropTypes.required,
	      title :   React.PropTypes.string
	    });

	var AutoCompleteEditor = React.createClass({displayName: 'AutoCompleteEditor',

	  propTypes : {
	    options : React.PropTypes.arrayOf(optionPropType)
	  },

	  mixins : MixinHelper.mix([keyboardHandlerMixin, EditorMixin, TextInputMixin]),

	  overrides : {
	      checkFocus : function(){
	          this.setTextInputFocus();
	      },
	      getInputNode:function(){
	        return this.getSearchComponent().getDOMNode();
	      },
	      onPressEnter:function(args){
	        var e = args[0];
	        this.handleEnter(e);
	      },
	      onPressTab:function(args){
	        var e = args[0];
	        this.handleTab(e);
	      }
	  },

	  handleTab:function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    if(!this.isFocusedOnSuggestion()){
	      this.handleChange(null, 'Tab');
	    }else{
	      this.handleChange(this.getFocusedSuggestion(), 'Tab');
	    }
	  },

	  handleEnter:function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    if(!this.isFocusedOnSuggestion()){
	      this.props.onCommit({value : this.refs.autoComplete.state.searchTerm, key : 'Enter'});
	    }
	  },

	  getSearchComponent:function(){
	    return this.refs.autoComplete.refs.search;
	  },

	  isFocusedOnSuggestion:function(){
	    var autoComplete = this.refs.autoComplete;
	    return autoComplete.state.focusedValue != null;
	  },

	  getFocusedSuggestion:function(){
	    return this.refs.autoComplete.state.focusedValue;
	  },

	  onPressArrowDown:function(e){
	    //prevent event propogation. this disables downwards cell navigation
	    e.stopPropagation();
	    e.preventDefault();
	  },

	  onPressArrowUp:function(e){
	    //prevent event propogation. this disables upwards cell navigation
	    e.stopPropagation();
	  },

	  getLabel:function(result) {
	    var label = this.props.label != null ? this.props.label : 'title';
	    if (typeof label === "function") {
	      return label(result);
	    } else if (typeof label === "string") {
	      return result[label];
	    }
	  },

	  handleChange:function(item, key){
	    var rowDataChanged = {};
	    var value = this.props.value;
	    if(item!=null){
	      value = this.getLabel(item);
	      if(this.props.valueParams){
	        value = this.constuctValueFromParams(item, this.props.valueParams);
	      }
	      rowDataChanged[this.props.column.key] = value;
	    }
	    key = key ? key : 'Enter';
	    this.props.onCommit({value : value, key : key, rowDataChanged : rowDataChanged});
	  },

	  constuctValueFromParams:function(obj, props) {
	    var ret = [];
	    for (var i = 0, ii = props.length; i < ii; i++) {
	      ret.push(obj[props[i]]);
	    }
	    return ret.join('|');
	  },

	  renderEditorNode:function(){
	    var val = {title : this.getDefaultValue()};
	    var label = this.props.label != null ? this.props.label : 'title';
	    return (React.createElement("div", {style: this.getStyle(), onKeyDown: this.onKeyDown}, 
	              React.createElement(ReactAutocomplete, {search: this.props.search, ref: "autoComplete", label: label, resultIdentifier: this.props.resultIdentifier, options: this.props.options, value: val, onChange: this.handleChange})
	            ));
	  }

	});

	module.exports = AutoCompleteEditor;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(66);
	var EditorMixin             = __webpack_require__(94);
	var TextInputMixin          = __webpack_require__(95);
	var keyboardHandlerMixin    = __webpack_require__(90);
	var DateRangeFilter         = __webpack_require__(96);

	var DateRangeEditor = React.createClass({displayName: 'DateRangeEditor',

	  mixins : [keyboardHandlerMixin, EditorMixin, TextInputMixin],

	  getDefaultProps:function(){
	    return {
	      format   : "YYYY-MM-DD",
	      ranges   : []
	    }
	  },

	  rangeSeparatorChar : ' - ',

	  overrides : {
	      checkFocus : function(){
	          this.setTextInputFocus();
	      },
	      getInputNode:function(){
	        return this.refs.datepicker.getDOMNode();
	      },
	      getValue:function(){
	        var dateToParse = this.getInputNode().value;
	        var dateRanges = dateToParse.split(this.rangeSeparatorChar);
	        if(dateRanges.length !== 2){
	          throw ("DateRangeEditor.getValue error : " + dateToParse + " is not in the correct format");
	        }
	        return {startDate : dateRanges[0].trim(), endDate : dateRanges[1].trim()}
	      }
	  },

	  isDateValid:function(date){
	    return moment(date, this.props.format, true).isValid();
	  },

	  validate:function(value){
	    return this.isDateValid(value.startDate)
	    && this.isDateValid(value.endDate)
	    && (moment(value.startDate, this.props.format).isBefore(value.endDate)
	    || moment(value.startDate, this.props.format).isSame(value.endDate));
	  },

	  handleDateFilterApply:function(startDate, endDate){
	    this.commit({value : {startDate : startDate, endDate : endDate}});
	  },

	  renderEditorNode:function(){
	    return (
	      React.createElement("div", {style: this.getStyle(), onKeyDown: this.onKeyDown}, 
	        React.createElement(DateRangeFilter, {ref: "datepicker", onApply: this.handleDateFilterApply, format: this.props.format, ranges: this.props.ranges, startDate: this.props.value.startDate, endDate: this.props.value.endDate})
	      )
	    );
	  }

	});

	module.exports = DateRangeEditor;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(66);
	var keyboardHandlerMixin    = __webpack_require__(90);
	var EditorMixin             = __webpack_require__(94);
	var cloneWithProps          = React.addons.cloneWithProps;

	var DropDownEditor = React.createClass({displayName: 'DropDownEditor',

	  mixins : [keyboardHandlerMixin, EditorMixin],

	  overrides : {
	    getInputNode : function(){
	      return this.refs.select.getDOMNode();
	    }
	  },

	  propTypes : {
	    options : React.PropTypes.array.isRequired
	  },

	  renderEditorNode:function(){
	    return (
	      React.createElement("select", {ref: "select", style: this.getStyle(), defaultValue: this.props.value, onChange: this.onChange}, 
	        this.renderOptions()
	      ));
	  },

	  renderOptions:function(){
	    var options = [];
	    this.props.options.forEach(function(name){
	      options.push(React.createElement("option", {key: name, value: name}, name));
	    }, this);
	    return options;
	  },


	  onChange:function(e){
	    this.props.onCommit({value : e.currentTarget.value});
	  },

	  onClick:function(e){
	    e.stopPropagation();
	    e.preventDefault();
	  }

	});

	module.exports = DropDownEditor;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(66);
	var EditorMixin             = __webpack_require__(94);
	var TextInputMixin          = __webpack_require__(95);
	var keyboardHandlerMixin    = __webpack_require__(90);

	var SimpleTextEditor = React.createClass({displayName: 'SimpleTextEditor',

	  mixins : [keyboardHandlerMixin, EditorMixin, TextInputMixin],

	  overrides : {
	      checkFocus : function(){
	          this.setTextInputFocus();
	      }
	  },

	  renderEditorNode:function(){
	    return (React.createElement("input", {type: "text", onBlur: this.commit, className: "form-control", defaultValue: this.getDefaultValue(), style: this.getStyle(), onKeyDown: this.onKeyDown}));
	  }


	});

	module.exports = SimpleTextEditor;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var moment         = __webpack_require__(84);
	var PropTypes = React.PropTypes;

	var DateRangeFormatter = React.createClass({displayName: 'DateRangeFormatter',

	  propTypes : {
	      value : PropTypes.shape({
	      startDate : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	      endDate   : PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	    }).isRequired
	  },

	  getDefaultProps:function(){
	    return {
	      inputFormat : 'YYYY-MM-DD',
	      displayFormat : 'YYYY-MM-DD',
	      value : {startDate : null, endDate : null}
	    }
	  },

	  formatDate:function(date){
	    if(moment.isMoment(date)){
	      return date.format(this.props.displayFormat);
	    }else{
	      return moment(date, this.props.inputFormat).format(this.props.displayFormat);
	    }
	  },

	  render:function(){
	    var startDate = this.props.value.startDate;
	    var endDate = this.props.value.endDate;
	    return (React.createElement("span", null, startDate, " to ", endDate));
	  }
	});

	module.exports = DateRangeFormatter;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	
	"use strict";

	var isFunction = function(functionToCheck){
	    var getType = {};
	    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	module.exports = isFunction;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	function shallowEqual(a, b) {
	  if (a === b) {
	    return true;
	  }

	  var k;

	  for (k in a) {
	    if (a.hasOwnProperty(k) &&
	        (!b.hasOwnProperty(k) || a[k] !== b[k])) {
	      return false;
	    }
	  }

	  for (k in b) {
	    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React       = __webpack_require__(1);
	var cx          = React.addons.classSet;
	var Draggable   = __webpack_require__(98);
	var PropTypes   = React.PropTypes;

	var ResizeHandle = React.createClass({displayName: 'ResizeHandle',

	  style: {
	    position: 'absolute',
	    top: 0,
	    right: 0,
	    width: 6,
	    height: '100%'
	  },

	  render:function() {
	    return (
	      React.createElement(Draggable, React.__spread({},  this.props, 
	        {className: "react-grid-HeaderCell__resizeHandle", 
	        style: this.style})
	        )
	    );
	  }
	});

	var HeaderCell = React.createClass({displayName: 'HeaderCell',

	  propTypes: {
	    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
	    column: PropTypes.object.isRequired,
	    onResize: PropTypes.func
	  },

	  render:function() {
	    var className = cx({
	      'react-grid-HeaderCell': true,
	      'react-grid-HeaderCell--resizing': this.state.resizing,
	      'react-grid-HeaderCell--locked': this.props.column.locked
	    });
	    className = cx(className, this.props.className);
	    var cell = this.getCell();
	    return (
	      React.createElement("div", {className: className, style: this.getStyle()}, 
	        cell, 
	        this.props.column.resizeable ?
	          React.createElement(ResizeHandle, {
	            onDrag: this.onDrag, 
	            onDragStart: this.onDragStart, 
	            onDragEnd: this.onDragEnd}
	            ) :
	          null
	      )
	    );
	  },

	  getCell:function() {
	    if (React.isValidElement(this.props.renderer)) {
	      return React.addons.cloneWithProps(this.props.renderer, {column : this.props.column});
	    } else {
	      return this.props.renderer({column: this.props.column});
	    }
	  },

	  getDefaultProps:function() {
	    return {
	      renderer: simpleCellRenderer
	    };
	  },

	  getInitialState:function() {
	    return {resizing: false};
	  },

	  setScrollLeft:function(scrollLeft) {
	    var node = this.getDOMNode();
	    node.style.webkitTransform = ("translate3d(" + scrollLeft + "px, 0px, 0px)");
	    node.style.transform = ("translate3d(" + scrollLeft + "px, 0px, 0px)");
	  },

	  getStyle:function() {
	    return {
	      width: this.props.column.width,
	      left: this.props.column.left,
	      display: 'inline-block',
	      position: 'absolute',
	      overflow: 'hidden',
	      height: this.props.height,
	      margin: 0,
	      textOverflow: 'ellipsis',
	      whiteSpace: 'nowrap'
	    };
	  },

	  onDragStart:function() {
	    this.setState({resizing: true});
	  },

	  onDrag:function(e) {
	    var width = this.getWidthFromMouseEvent(e);
	    if (width > 0 && this.props.onResize) {
	      this.props.onResize(this.props.column, width);
	    }
	  },

	  onDragEnd:function(e) {
	    var width = this.getWidthFromMouseEvent(e);
	    this.props.onResizeEnd(this.props.column, width);
	    this.setState({resizing: false});
	  },

	  getWidthFromMouseEvent:function(e) {
	    var right = e.pageX;
	    var left = this.getDOMNode().getBoundingClientRect().left;
	    return right - left;
	  }
	});

	function simpleCellRenderer(props) {
	  return React.createElement("div", {className: "rex-widget-HeaderCell__value"}, props.column.name);
	}

	module.exports = HeaderCell;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var size;

	function getScrollbarSize() {
	  if (size === undefined) {

	    var outer = document.createElement('div');
	    outer.style.width = '50px';
	    outer.style.height = '50px';
	    outer.style.overflowY = 'scroll';
	    outer.style.position = 'absolute';
	    outer.style.top = '-200px';
	    outer.style.left = '-200px';

	    var inner = document.createElement('div');
	    inner.style.height = '100px';
	    inner.style.width = '100%';

	    outer.appendChild(inner);
	    document.body.appendChild(outer);

	    var outerWidth = outer.offsetWidth;
	    var innerWidth = inner.offsetWidth;

	    document.body.removeChild(outer);

	    size = outerWidth - innerWidth;
	  }

	  return size;
	}

	module.exports = getScrollbarSize;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var ScrollShim = {

	  appendScrollShim:function() {
	    if (!this._scrollShim) {
	      var size = this._scrollShimSize();
	      var shim = document.createElement('div');
	      shim.classList.add('react-grid-ScrollShim');
	      shim.style.position = 'absolute';
	      shim.style.top = 0;
	      shim.style.left = 0;
	      shim.style.width = (size.width + "px");
	      shim.style.height = (size.height + "px");
	      this.getDOMNode().appendChild(shim);
	      this._scrollShim = shim;
	    }
	    this._scheduleRemoveScrollShim();
	  },

	  _scrollShimSize:function() {
	    return {
	      width: this.props.width,
	      height: this.props.length * this.props.rowHeight
	    };
	  },

	  _scheduleRemoveScrollShim:function() {
	    if (this._scheduleRemoveScrollShimTimer) {
	      clearTimeout(this._scheduleRemoveScrollShimTimer);
	    }
	    this._scheduleRemoveScrollShimTimer = setTimeout(
	      this._removeScrollShim, 200);
	  },

	  _removeScrollShim:function() {
	    if (this._scrollShim) {
	      this._scrollShim.parentNode.removeChild(this._scrollShim);
	      this._scrollShim = undefined;
	    }
	  }
	};

	module.exports = ScrollShim;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var Cell           = __webpack_require__(52);
	var cloneWithProps = React.addons.cloneWithProps;
	var ColumnMetrics    = __webpack_require__(23);

	var Row = React.createClass({displayName: 'Row',

	  render:function() {
	    var className = cx(
	      'react-grid-Row',
	      ("react-grid-Row--" + (this.props.idx % 2 === 0 ? 'even' : 'odd'))
	    );

	    var style = {
	      height: this.getRowHeight(),
	      overflow: 'hidden'
	    };

	    var cells = this.getCells();
	    return (
	      React.createElement("div", React.__spread({},  this.props, {className: className, style: style}), 
	        React.isValidElement(this.props.row) ?
	          this.props.row : cells
	      )
	    );
	  },

	  getCells:function() {
	    var cells = [];
	    var lockedCells = [];

	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      var column = this.props.columns[i];
	      var cell = this.renderCell({
	        ref:i,
	        key:i,
	        idx:i,
	        rowIdx:this.props.idx,
	        filterRowIdx:this.props.row.key,
	        value:this.getCellValue(column.key || i),
	        column:column,
	        height:this.getRowHeight(),
	        formatter:column.formatter,
	        rowData : this.props.row});
	      if (column.locked) {
	        lockedCells.push(cell);
	      } else {
	        cells.push(cell);
	      }
	    }

	    return cells.concat(lockedCells);
	  },

	  getRowHeight:function(){
	    if(this.props.expandedRows && this.props.expandedRows[this.props.key]){
	      return this.props.expandedRows[this.props.key];
	    }else{
	      return this.props.height;
	    }
	  },

	  getCellValue:function(key){
	    if(key === 'select-row'){
	      return this.props.isSelected;
	    }else{
	      return this.props.row[key]
	    }
	  },

	  renderCell:function(props) {
	    if (React.isValidElement(this.props.cellRenderer)) {
	      return cloneWithProps(this.props.cellRenderer, props);
	    } else {
	      return this.props.cellRenderer(props);
	    }
	  },

	  getDefaultProps:function() {
	    return {
	      cellRenderer: Cell
	    };
	  },

	  shouldComponentUpdate:function(nextProps) {
	    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
	      this.doesRowContainSelectedCell()          ||
	      this.doesRowContainSelectedCell(nextProps) ||
	      this.willRowBeDraggedOver(nextProps)       ||
	      this.hasRowBeenCopied()                    ||
	      nextProps.row !== this.props.row           ||
	      nextProps.height !== this.props.height;
	  },

	  setScrollLeft:function(scrollLeft) {
	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      if (this.props.columns[i].locked) {
	        this.refs[i].setScrollLeft(scrollLeft);
	      }
	    }
	  },

	  doesRowContainSelectedCell:function(propsToCheck){
	    var props = propsToCheck || this.props;
	    var cell = cell || props.cellRenderer;
	    if(cell.props.selected && cell.props.selected.rowIdx === props.idx){
	      return true;
	    }else{
	      return false;
	    }
	  },

	  willRowBeDraggedOver:function(props){
	    var dragged = props.cellRenderer.props.dragged;
	    return  dragged != null && (dragged.rowIdx || dragged.complete === true);
	  },

	  hasRowBeenCopied:function(){
	    var cell = this.props.cellRenderer;
	    return cell.props.copied != null && cell.props.copied.rowIdx === this.props.idx;
	  }


	});

	module.exports = Row;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule copyProperties
	 */
	'use strict';

	/**
	 * Copy properties from one or more objects (up to 5) into the first object.
	 * This is a shallow copy. It mutates the first object and also returns it.
	 *
	 * NOTE: `arguments` has a very significant performance penalty, which is why
	 * we don't support unlimited arguments.
	 */
	function copyProperties(obj, a, b, c, d, e, f) {
	  obj = obj || {};

	  if (process.env.NODE_ENV) {
	    if (f) {
	      throw new Error('Too many arguments passed to copyProperties');
	    }
	  }

	  var args = [a, b, c, d, e];
	  var ii = 0, v;
	  while (args[ii]) {
	    v = args[ii++];
	    for (var k in v) {
	      obj[k] = v[k];
	    }

	    // IE ignores toString in object iteration.. See:
	    // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
	    if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
	        (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
	      obj.toString = v.toString;
	    }
	  }

	  return obj;
	}

	module.exports = copyProperties;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(1);
	var cx                  = React.addons.classSet;
	var shallowCloneObject  = __webpack_require__(83);
	var ColumnMetrics       = __webpack_require__(53);
	var HeaderRow           = __webpack_require__(101);
	var ColumnMetrics = __webpack_require__(53);

	var Header = React.createClass({displayName: 'Header',

	  propTypes: {
	    columns: React.PropTypes.object.isRequired,
	    totalWidth: React.PropTypes.number,
	    height: React.PropTypes.number.isRequired,
	    headerRows : React.PropTypes.array.isRequired
	  },

	  render:function() {
	    var state = this.state.resizing || this.props;

	    var className = cx({
	      'react-grid-Header': true,
	      'react-grid-Header--resizing': !!this.state.resizing
	    });
	    var headerRows = this.getHeaderRows();

	    return (

	      React.createElement("div", React.__spread({},  this.props, {style: this.getStyle(), className: className}), 
	        headerRows
	      )
	    );
	  },

	  shouldComponentUpdate : function(nextProps, nextState){
	    return !(ColumnMetrics.sameColumns(this.props.columns.columns, nextProps.columns.columns, ColumnMetrics.sameColumn))
	    || this.props.totalWidth != nextProps.totalWidth
	    || (this.props.headerRows.length != nextProps.headerRows.length)
	    || (this.state.resizing != nextState.resizing)
	  },

	  getHeaderRows:function(){
	    var state = this.state.resizing || this.props;
	    var headerRows = [];
	    this.props.headerRows.forEach((function(row, index){
	      var headerRowStyle = {
	        position: 'absolute',
	        top: this.props.height * index,
	        left: 0,
	        width: this.props.totalWidth
	      };

	      headerRows.push(React.createElement(HeaderRow, {
	        key: row.ref, 
	        ref: row.ref, 
	        style: headerRowStyle, 
	        onColumnResize: this.onColumnResize, 
	        onColumnResizeEnd: this.onColumnResizeEnd, 
	        width: state.columns.width, 
	        height: row.height || this.props.height, 
	        columns: state.columns.columns, 
	        resizing: state.column, 
	        headerCellRenderer: row.headerCellRenderer}
	        ))
	    }).bind(this));
	    return headerRows;
	  },

	  getInitialState:function() {
	    return {resizing: null};
	  },

	  componentWillReceiveProps:function() {
	    this.setState({resizing: null});
	  },

	  onColumnResize:function(column, width) {
	    var state = this.state.resizing || this.props;

	    var pos = this.getColumnPosition(column);

	    if (pos !== null) {
	      var resizing = {
	        columns: shallowCloneObject(state.columns)
	      };
	      resizing.columns = ColumnMetrics.resizeColumn(
	          resizing.columns, pos, width);

	      // we don't want to influence scrollLeft while resizing
	      if (resizing.columns.width < state.columns.width) {
	        resizing.columns.width = state.columns.width;
	      }

	      resizing.column = resizing.columns.columns[pos];
	      this.setState({resizing:resizing});
	    }
	  },

	  getColumnPosition:function(column) {
	    var state = this.state.resizing || this.props;
	    var pos = state.columns.columns.indexOf(column);
	    return pos === -1 ? null : pos;
	  },

	  onColumnResizeEnd:function(column, width) {
	    var pos = this.getColumnPosition(column);
	    if (pos !== null && this.props.onColumnResize) {
	      this.props.onColumnResize(pos, width || column.width);
	    }
	  },

	  setScrollLeft:function(scrollLeft) {
	    var node = this.refs.row.getDOMNode();
	    node.scrollLeft = scrollLeft;
	    this.refs.row.setScrollLeft(scrollLeft);
	  },

	  getStyle:function() {
	    return {
	      position: 'relative',
	      height: this.props.height
	    };
	  },
	});


	module.exports = Header;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React             = __webpack_require__(1);
	var getWindowSize     = __webpack_require__(99);
	var DOMMetrics        = __webpack_require__(81);
	var Canvas            = __webpack_require__(100);

	var min   = Math.min;
	var max   = Math.max;
	var floor = Math.floor;
	var ceil  = Math.ceil;

	var ViewportScroll = {
	  mixins: [DOMMetrics.MetricsMixin],

	  DOMMetrics: {
	    viewportHeight:function() {
	      return this.getDOMNode().offsetHeight;
	    }
	  },

	  propTypes: {
	    rowHeight: React.PropTypes.number,
	    length: React.PropTypes.number.isRequired
	  },

	  getDefaultProps:function() {
	    return {
	      rowHeight: 30
	    };
	  },

	  getInitialState:function() {
	    return this.getGridState(this.props);
	  },

	  getGridState:function(props) {
	    var height = this.state && this.state.height ?
	      this.state.height :
	      getWindowSize().height;
	    var renderedRowsCount = ceil(height / props.rowHeight);
	    return {
	      displayStart: 0,
	      displayEnd: renderedRowsCount * 2,
	      height: height,
	      scrollTop: 0,
	      scrollLeft: 0
	    };
	  },

	  updateScroll:function(scrollTop, scrollLeft, height, rowHeight, length) {
	    var renderedRowsCount = ceil(height / rowHeight);

	    var visibleStart = floor(scrollTop / rowHeight);

	    var visibleEnd = min(
	        visibleStart + renderedRowsCount,
	        length);

	    var displayStart = max(
	        0,
	        visibleStart - renderedRowsCount * 2);

	    var displayEnd = min(
	        visibleStart + renderedRowsCount * 2,
	        length);

	    var nextScrollState = {
	      visibleStart:visibleStart,
	      visibleEnd:visibleEnd,
	      displayStart:displayStart,
	      displayEnd:displayEnd,
	      height:height,
	      scrollTop:scrollTop,
	      scrollLeft:scrollLeft
	    };

	    this.setState(nextScrollState);
	  },

	  metricsUpdated:function() {
	    var height = this.DOMMetrics.viewportHeight();
	    if (height) {
	      this.updateScroll(
	        this.state.scrollTop,
	        this.state.scrollLeft,
	        height,
	        this.props.rowHeight,
	        this.props.length
	      );
	    }
	  },

	  componentWillReceiveProps:function(nextProps) {
	    if (this.props.rowHeight !== nextProps.rowHeight) {
	      this.setState(this.getGridState(nextProps));
	    } else if (this.props.length !== nextProps.length) {
	      this.updateScroll(
	        this.state.scrollTop,
	        this.state.scrollLeft,
	        this.state.height,
	        nextProps.rowHeight,
	        nextProps.length
	      );
	    }
	  }
	};

	var Viewport = React.createClass({displayName: 'Viewport',
	  mixins: [ViewportScroll],

	  render:function() {
	    var style = {
	      padding: 0,
	      bottom: 0,
	      left: 0,
	      right: 0,
	      overflow: 'hidden',
	      position: 'absolute',
	      top: this.props.rowOffsetHeight
	    };
	    return (
	      React.createElement("div", {
	        className: "react-grid-Viewport", 
	        style: style}, 
	        React.createElement(Canvas, {
	          ref: "canvas", 
	          totalWidth: this.props.totalWidth, 
	          width: this.props.columns.width, 
	          rows: this.props.rows, 
	          selectedRows: this.props.selectedRows, 
	          expandedRows: this.props.expandedRows, 
	          columns: this.props.columns.columns, 
	          cellRenderer: this.props.cellRenderer, 
	          rowRenderer: this.props.rowRenderer, 

	          visibleStart: this.state.visibleStart, 
	          visibleEnd: this.state.visibleEnd, 
	          displayStart: this.state.displayStart, 
	          displayEnd: this.state.displayEnd, 

	          length: this.props.length, 
	          height: this.state.height, 
	          rowHeight: this.props.rowHeight, 
	          onScroll: this.onScroll, 
	          onRows: this.props.onRows}
	          )
	      )
	    );
	  },

	  getScroll:function() {
	    return this.refs.canvas.getScroll();
	  },

	  onScroll:function($__0 ) {var scrollTop=$__0.scrollTop,scrollLeft=$__0.scrollLeft;
	    this.updateScroll(
	      scrollTop, scrollLeft,
	      this.state.height,
	      this.props.rowHeight,
	      this.props.length
	    );

	    if (this.props.onScroll) {
	      this.props.onScroll({scrollTop:scrollTop, scrollLeft:scrollLeft});
	    }
	  },

	  setScrollLeft:function(scrollLeft) {
	    this.refs.canvas.setScrollLeft(scrollLeft);
	  }
	});

	module.exports = Viewport;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React               = __webpack_require__(1);
	var emptyFunction       = __webpack_require__(102);
	var shallowCloneObject  = __webpack_require__(83);
	var invariant           = __webpack_require__(103);

	var contextTypes = {
	  metricsComputator: React.PropTypes.object
	};

	var MetricsComputatorMixin = {

	  childContextTypes: contextTypes,

	  getChildContext:function() {
	    return {metricsComputator: this};
	  },

	  getMetricImpl:function(name) {
	    return this._DOMMetrics.metrics[name].value;
	  },

	  registerMetricsImpl:function(component, metrics) {
	    var getters = {};
	    var s = this._DOMMetrics;

	    for (var name in metrics) {
	      invariant(
	          s.metrics[name] === undefined,
	          'DOM metric ' + name + ' is already defined'
	      );
	      s.metrics[name] = {component:component, computator: metrics[name].bind(component)};
	      getters[name] = this.getMetricImpl.bind(null, name);
	    }

	    if (s.components.indexOf(component) === -1) {
	      s.components.push(component);
	    }

	    return getters;
	  },

	  unregisterMetricsFor:function(component) {
	    var s = this._DOMMetrics;
	    var idx = s.components.indexOf(component);

	    if (idx > -1) {
	      s.components.splice(idx, 1);

	      var name;
	      var metricsToDelete = {};

	      for (name in s.metrics) {
	        if (s.metrics[name].component === component) {
	          metricsToDelete[name] = true;
	        }
	      }

	      for (name in metricsToDelete) {
	        delete s.metrics[name];
	      }
	    }
	  },

	  updateMetrics:function() {
	    var s = this._DOMMetrics;

	    var needUpdate = false;

	    for (var name in s.metrics) {
	      var newMetric = s.metrics[name].computator();
	      if (newMetric !== s.metrics[name].value) {
	        needUpdate = true;
	      }
	      s.metrics[name].value = newMetric;
	    }

	    if (needUpdate) {
	      for (var i = 0, len = s.components.length; i < len; i++) {
	        if (s.components[i].metricsUpdated) {
	          s.components[i].metricsUpdated();
	        }
	      }
	    }
	  },

	  componentWillMount:function() {
	    this._DOMMetrics = {
	      metrics: {},
	      components: []
	    };
	  },

	  componentDidMount:function() {
	    if(window.addEventListener){
	      window.addEventListener('resize', this.updateMetrics);
	    }else{
	      window.attachEvent('resize', this.updateMetrics);
	    }
	    this.updateMetrics();
	  },

	  componentWillUnmount:function() {
	    window.removeEventListener('resize', this.updateMetrics);
	  }

	};

	var MetricsMixin = {

	  contextTypes: contextTypes,

	  componentWillMount:function() {
	    if (this.DOMMetrics) {
	      this._DOMMetricsDefs = shallowCloneObject(this.DOMMetrics);

	      this.DOMMetrics = {};
	      for (var name in this._DOMMetricsDefs) {
	        this.DOMMetrics[name] = emptyFunction;
	      }
	    }
	  },

	  componentDidMount:function() {
	    if (this.DOMMetrics) {
	      this.DOMMetrics = this.registerMetrics(this._DOMMetricsDefs);
	    }
	  },

	  componentWillUnmount:function() {
	    if (!this.registerMetricsImpl) {
	      return this.context.metricsComputator.unregisterMetricsFor(this);
	    }
	    if (this.hasOwnProperty('DOMMetrics')) {
	        delete this.DOMMetrics;
	    }
	  },

	  registerMetrics:function(metrics) {
	    if (this.registerMetricsImpl) {
	      return this.registerMetricsImpl(this, metrics);
	    } else {
	      return this.context.metricsComputator.registerMetricsImpl(this, metrics);
	    }
	  },

	  getMetric:function(name) {
	    if (this.getMetricImpl) {
	      return this.getMetricImpl(name);
	    } else {
	      return this.context.metricsComputator.getMetricImpl(name);
	    }
	  }
	};

	module.exports = {
	  MetricsComputatorMixin:MetricsComputatorMixin,
	  MetricsMixin:MetricsMixin
	};


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(40);
	var EditorMixin             = __webpack_require__(42);
	var TextInputMixin          = __webpack_require__(104);
	var keyboardHandlerMixin    = __webpack_require__(41);

	var SimpleTextEditor = React.createClass({displayName: 'SimpleTextEditor',

	  mixins : [keyboardHandlerMixin, EditorMixin, TextInputMixin],

	  overrides : {
	      checkFocus : function(){
	          this.setTextInputFocus();
	      }
	  },

	  renderEditorNode:function(){
	    return (React.createElement("input", {type: "text", onBlur: this.commit, className: "form-control", defaultValue: this.getDefaultValue(), style: this.getStyle(), onKeyDown: this.onKeyDown}));
	  }


	});

	module.exports = SimpleTextEditor;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	function shallowCloneObject(obj) {
	  var result = {};
	  for (var k in obj) {
	    if (obj.hasOwnProperty(k)) {
	      result[k] = obj[k];
	    }
	  }
	  return result;
	}

	module.exports = shallowCloneObject;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = moment;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyMirror
	 * @typechecks static-only
	 */

	"use strict";

	var invariant = __webpack_require__(105);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  ("production" !== process.env.NODE_ENV ? invariant(
	    obj instanceof Object && !Array.isArray(obj),
	    'keyMirror(...): Argument must be an object.'
	  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var KeyboardHandlerMixin = __webpack_require__(90);
	var MixinHelper    = __webpack_require__(66);

	var SelectableMixin = MixinHelper.createDependency({KeyboardHandlerMixin : KeyboardHandlerMixin}).assignTo({

	  getDefaultProps : function(){
	    return {
	      tabIndex : -1,
	      ref : "cell"
	    }
	  },

	  isSelected: function() {
	    return (
	      this.props.selected
	      && this.props.selected.rowIdx === this.props.rowIdx
	      && this.props.selected.idx === this.props.idx
	    );
	  },

	  onClick: function() {
	    var rowIdx = this.props.rowIdx;
	    var idx = this.props.idx;
	    this.props.onClick({rowIdx: rowIdx, idx: idx});
	  },

	  onPressArrowUp:function(e){
	    this.moveSelectedCell(e, -1, 0);
	  },

	  onPressArrowDown:function(e){
	    this.moveSelectedCell(e, 1, 0);
	  },

	  onPressArrowLeft:function(e){
	    this.moveSelectedCell(e, 0, -1);
	  },

	  onPressArrowRight:function(e){
	    this.moveSelectedCell(e, 0, 1);
	  },

	  onPressTab:function(e){
	    this.moveSelectedCell(e, 0, 1);
	  },

	  moveSelectedCell:function(e, rowDelta, cellDelta){
	    e.stopPropagation();
	    e.preventDefault();
	    var rowIdx = this.props.rowIdx + rowDelta;
	    var idx = this.props.idx + cellDelta;
	    this.props.onSelect({idx: idx, rowIdx: rowIdx});
	  },

	  setScrollLeft: function(scrollLeft) {
	    this.refs.row.setScrollLeft(scrollLeft);
	  },

	  componentDidMount: function() {
	    this.checkFocus();
	  },

	  componentDidUpdate: function() {
	    this.checkFocus();
	  },

	  isCellSelectionChanging:function(nextProps){
	    if(this.props.selected && nextProps.selected){
	      return this.props.idx === nextProps.selected.idx || this.props.idx === this.props.selected.idx;
	    }else{
	      return true;
	    }
	  },

	  checkFocus: function() {
	    if (this.isSelected()) {
	      this.getDOMNode().focus();
	    }
	  }
	})



	module.exports = SelectableMixin;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React            = __webpack_require__(1);
	var cx               = React.addons.classSet;
	var cloneWithProps   = React.addons.cloneWithProps;
	var SimpleTextEditor = __webpack_require__(70);
	var PropTypes        = React.PropTypes;
	var MixinHelper      = __webpack_require__(66);
	var SelectableMixin  = __webpack_require__(86);
	var KeyboardHandlerMixin = __webpack_require__(90);

	var EditableMixin = MixinHelper.createDependency({

	  KeyboardHandlerMixin : KeyboardHandlerMixin,

	  SelectableMixin : SelectableMixin

	  }).assignTo({

	    propTypes : {
	        onCommit : PropTypes.func.isRequired
	    },

	    canEdit:function(){
	      return (this.props.column.editor != null) || this.props.column.editable;
	    },


	    getEditor:function(){

	      var editorProps = {height : this.props.height, onPressEscape : this.onPressEscape,  onCommit : this.onCommit, initialKeyCode : this.props.selected.initialKeyCode, editorRowMetaData : this.getEditorRowMetaData()};
	      var customEditor = this.props.column.editor;
	      if(customEditor && React.isValidElement(customEditor)){
	        //return custom column editor or SimpleEditor if none specified
	        return cloneWithProps(customEditor, editorProps);
	      }else{
	        return cloneWithProps(SimpleTextEditor(), editorProps);
	      }
	    },

	    getEditorRowMetaData:function(){
	      //clone row data so editor cannot actually change this
	      var columnName = this.props.column.ItemId;
	      //convention based method to get corresponding Id or Name of any Name or Id property
	      if(typeof this.props.column.getEditorRowMetaData === 'function'){
	        return this.props.column.getEditorRowMetaData(this.props.rowData);
	      }
	    },

	    getFormatter:function(){
	      var col = this.props.column;
	      if(this.isActive()){
	        return this.getEditor();
	      }else{
	        return this.props.column.formatter;
	      }
	    },

	    onCommit:function(commit){
	      var rowIdx = this.props.rowIdx;
	      var idx = this.props.idx;
	      var cellKey = this.props.column.key;
	      this.props.onCommit({cellKey: cellKey, rowIdx: this.props.filterRowIdx || rowIdx, value : commit.value, keyCode : commit.key, changed : commit});
	    },

	    checkFocus: function() {
	      if (this.isSelected() && !this.isActive()) {
	        this.getDOMNode().focus();
	      }
	    },

	    onClick:function() {
	      if(!this.isActive()){
	        var rowIdx = this.props.rowIdx;
	        var idx = this.props.idx;
	        this.props.onClick({rowIdx: rowIdx, idx: idx});
	      }

	    },

	    onDoubleClick:function() {
	      var rowIdx = this.props.rowIdx;
	      var idx = this.props.idx;
	      this.props.onClick({rowIdx: rowIdx, idx: idx, active : this.canEdit()});
	    },

	    setActive:function(keyPressed){
	      var rowIdx = this.props.rowIdx;
	      var idx = this.props.idx;
	      if(this.props.column.key === 'select-row' && this.props.column.onRowSelect){
	        this.props.column.onRowSelect(rowIdx);
	      }
	      else if(this.canEdit() && !this.isActive()){
	        this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : true, initialKeyCode : keyPressed});
	      }
	    },

	    setInactive:function(){
	      if(this.canEdit() && this.isActive()){
	        var rowIdx = this.props.rowIdx;
	        var idx = this.props.idx;
	        this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : false});
	      }
	    },

	    isActive:function(){
	      return this.isSelected() && this.props.selected.active === true;
	    },

	    onPressEnter:function(e){
	      this.setActive(e.key);
	    },

	    onPressDelete:function(e){
	      this.setActive(e.key);
	    },

	    onPressEscape:function(e){
	      this.setInactive(e.key);
	    },

	    onPressBackspace:function(e){
	      this.setActive(e.key);
	    },

	    onPressChar:function(e){
	      if(this.isKeyPrintable(e.keyCode)){
	        this.setActive(e.keyCode);
	      }
	    }
	});



	module.exports = EditableMixin;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var PropTypes      = React.PropTypes;
	var SimpleTextEditor = __webpack_require__(70);
	var MixinHelper      = __webpack_require__(66);
	var SelectableMixin  = __webpack_require__(86);
	var KeyboardHandlerMixin = __webpack_require__(90);

	var CopyableMixin = MixinHelper.createDependency({

	  KeyboardHandlerMixin : KeyboardHandlerMixin,

	  SelectableMixin : SelectableMixin

	}).assignTo({

	  getCellClass : function(){
	    return cx({
	      'selected' : this.isSelected() && !this.isCopied(),
	      'copied' : this.isCopied()
	    })
	  },

	  KeyCode_c : '99',

	  KeyCode_C : '67',

	  KeyCode_V : '86',

	  KeyCode_v : '118',

	  propTypes : {
	    handleCopy : React.PropTypes.func.isRequired,
	    handlePaste : React.PropTypes.func.isRequired
	  },

	  isCopied : function(){
	    return (
	      this.props.copied
	      && this.props.copied.rowIdx === this.props.rowIdx
	      && this.props.copied.idx === this.props.idx
	    );
	  },

	  onPressKeyWithCtrl:function(e){
	    if(this.canEdit()){
	      if(e.keyCode == this.KeyCode_c || e.keyCode == this.KeyCode_C){
	        this.props.handleCopy({value : this.props.value});
	      }else if(e.keyCode == this.KeyCode_v || e.keyCode == this.KeyCode_V){
	        this.props.handlePaste({value : this.props.value});
	      }
	    }
	  }
	});



	module.exports = CopyableMixin;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var PropTypes      = React.PropTypes;
	var MixinHelper      = __webpack_require__(66);
	var SelectableMixin  = __webpack_require__(86);
	var KeyboardHandlerMixin = __webpack_require__(90);

	var DraggableMixin = MixinHelper.createDependency({

	  KeyboardHandlerMixin : KeyboardHandlerMixin,

	  SelectableMixin : SelectableMixin

	}).assignTo({

	getCellClass : function(){
	  return cx({
	    'selected-draggable' : this.isSelected(),
	    'active-drag-cell' : this.isSelected() || this.isDraggedOver(),
	    'is-dragged-over-up' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < this.props.dragged.rowIdx,
	    'is-dragged-over-down' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > this.props.dragged.rowIdx,
	    'was-dragged-over' : this.wasDraggedOver()
	  });
	},

	  getDefaultProps : function(){
	    return {
	        handleDragStart: this.handleDragStart,
	        onDragEnter: this.handleDragEnter,
	        onDragEnd: this.handleDragEnd
	    }
	  },

	  propTypes : {
	    handleDragEnter : React.PropTypes.func.isRequired,
	    handleDragStart : React.PropTypes.func.isRequired,
	    handleDragEnd : React.PropTypes.func.isRequired,
	    handleTerminateDrag : React.PropTypes.func.isRequired
	  },

	  isDraggedOver:function(){

	      return (
	        this.props.dragged &&
	        this.props.dragged.overRowIdx === this.props.rowIdx
	        && this.props.dragged.idx === this.props.idx
	      )
	  },

	  wasDraggedOver:function(){
	    return (
	      this.props.dragged
	      && ((this.props.dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < this.props.dragged.rowIdx)
	      ||  (this.props.dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > this.props.dragged.rowIdx))
	      && this.props.dragged.idx === this.props.idx
	    );
	  },

	  handleDragStart:function(e){
	    var rowIdx = this.props.rowIdx;
	    var idx = this.props.idx;
	    this.props.handleDragStart({rowIdx : rowIdx, idx : idx, copiedText : this.props.value});
	  },

	  handleDragEnter:function(){
	    this.props.handleDragEnter(this.props.rowIdx);
	  },

	  handleDragEnd:function(){
	    this.props.handleDragEnd();
	  },

	  isDraggedCellChanging:function(nextProps){
	    return (nextProps.dragged && this.props.idx === nextProps.dragged.idx)
	    || (this.props.dragged && this.props.idx === this.props.dragged.idx);
	  },

	  componentDidUpdate:function(){
	    var dragged = this.props.dragged;
	    if(dragged && dragged.complete === true){
	      this.props.handleTerminateDrag();
	    }
	  }

	});



	module.exports = DraggableMixin;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */

	'use strict';

	var React = __webpack_require__(1);
	var Perf = React.addons.Perf;

	var hasPerfStarted = false;

	var KeyboardHandlerMixin = {

	  onKeyDown:function(e){
	    if(this.isCtrlKeyHeldDown(e)){
	      this.checkAndCall('onPressKeyWithCtrl', e);
	    }
	    else if (this.isKeyIdentified(e.key)) {
	      //break up individual keyPress events to have their own specific callbacks
	      //this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	      var callBack = 'onPress' + e.key;
	      this.checkAndCall(callBack, e);
	    }else if(this.isKeyPrintable(e.keyCode)){
	      this.checkAndCall('onPressChar', e);
	    }
	  },

	  //taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	  isKeyPrintable:function(keycode){
	    var valid =
	        (keycode > 47 && keycode < 58)   || // number keys
	        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
	        (keycode > 64 && keycode < 91)   || // letter keys
	        (keycode > 95 && keycode < 112)  || // numpad keys
	        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
	        (keycode > 218 && keycode < 223);   // [\]' (in order)

	    return valid;
	  },

	  isKeyIdentified:function(key){
	    return key !== "Unidentified";
	  },

	  isCtrlKeyHeldDown:function(e){
	    return e.ctrlKey === true && e.key !== "Control";
	  },

	  checkAndCall:function(methodName, args){
	    if(typeof this[methodName] === 'function'){
	      this[methodName](args);
	    }
	  }
	}



	module.exports = KeyboardHandlerMixin;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	
	"use strict";

	var isFunction = function(functionToCheck){
	    var getType = {};
	    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	module.exports = isFunction;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React              = __webpack_require__(1);
	var cx             = React.addons.classSet;

	var FilterableHeaderCell = React.createClass({displayName: 'FilterableHeaderCell',

	  getInitialState:function(){
	    return {filterTerm : ''}
	  },

	  handleChange:function(e){
	    e.preventDefault();
	    e.stopPropagation();
	    this.setState({filterTerm : e.currentTarget.value});
	    this.props.onChange({filterTerm : e.currentTarget.value, columnKey : this.props.column.key});
	  },

	  componentDidUpdate:function(){
	    this.getDOMNode().focus();
	  },

	  render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement("div", {className: "form-group"}, 
	          React.createElement(this.renderInput, null)
	        )
	      )
	    );
	  },

	  renderInput : function(){
	    if(this.props.column.filterable === false){
	      return React.createElement("span", null);
	    }else{
	      return (React.createElement("input", {type: "text", className: "form-control input-sm", placeholder: "Search", value: this.state.filterTerm, onChange: this.handleChange}))
	    }

	  }
	});

	module.exports = FilterableHeaderCell;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React              = __webpack_require__(1);
	var cx             = React.addons.classSet;

	var SortableHeaderCell = React.createClass({displayName: 'SortableHeaderCell',

	  onClick: function() {
	    this.props.column.sortBy(
	      this.props.column,
	      this.props.column.sorted);
	  },

	  getSortByClass : function(){
	    var sorted = this.props.column.sorted;
	    return cx({
	      'pull-right' : true,
	      'glyphicon glyphicon-arrow-up' : sorted === 'ASC',
	      'glyphicon glyphicon-arrow-down' : sorted === 'DESC'
	    });
	  },

	  render: function() {

	    return (
	      React.createElement("div", {
	        onClick: this.onClick, 
	        style: {cursor: 'pointer'}}, 
	        this.props.column.name, 
	        React.createElement("span", {className: this.getSortByClass()})
	      )
	    );
	  }
	});

	module.exports = SortableHeaderCell;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';
	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;
	var isFunction = __webpack_require__(91);

	var EditorMixin = {

	  propTypes : {
	    onCommit : React.PropTypes.func.isRequired
	  },

	  getStyle:function(){
	    return {
	      height : this.props.height - 1
	    }
	  },

	  getInitialState:function(){
	    return {isInvalid : false}
	  },

	  onPressEnter:function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    this.commit({key : 'Enter'});
	  },

	  onPressTab:function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    this.commit({key : 'Tab'});
	  },

	  commit:function(args){
	    var value = this.getValue();
	    var rowDataChanged = {};
	    rowDataChanged[this.props.column.key] = value;
	    if(this.isNewValueValid(value)){
	      this.props.onCommit({value : value, key : args.key, rowDataChanged : rowDataChanged});
	    }
	  },

	  isNewValueValid:function(value){
	    if(isFunction(this.validate)){
	      var isValid = this.validate(value);
	      this.setState({isInvalid : !isValid});
	      return isValid;
	    }else{
	      return true;
	    }
	  },

	  getValue:function(){
	      return this.getInputNode().value;
	  },

	  setValue:function(value){
	      this.getInputNode().value = value;
	  },

	  componentDidMount: function() {
	    if(this.getInputNode() !== undefined){
	      this.checkFocus();
	      this.getInputNode().className += ' editor-main';
	    }
	  },

	  checkFocus:function(){
	    this.getInputNode().focus();
	  },

	  getInputNode:function(){
	    return this.getDOMNode().getElementsByTagName("input")[0];
	  },

	  getContainerClass:function(){
	    return cx({
	      'has-error' : this.state.isInvalid === true
	    })
	  },

	  renderStatusIcon:function(){
	    if(this.state.isInvalid === true){
	      return React.createElement("span", {className: "glyphicon glyphicon-remove form-control-feedback"})
	    }
	  },

	  render:function(){
	    if(!isFunction(this.renderEditorNode)){
	        throw "Editor Mixin Error : " + this.displayName + " component must implement method renderEditorNode";
	    }
	    var editorNode = this.renderEditorNode();
	    return (
	      React.createElement("div", {className: this.getContainerClass()}, 
	        editorNode, 
	        this.renderStatusIcon()
	      )
	    )
	  }
	};

	module.exports = EditorMixin;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var TextInputMixin = {

	  onPressArrowLeft:function(e){
	    //prevent event propogation. this disables left cell navigation
	    e.stopPropagation();
	  },

	  onPressArrowRight:function(e){
	    //prevent event propogation. this disables right cell navigation
	    e.stopPropagation();
	  },

	  getDefaultValue:function(){
	    var keyCode = this.props.initialKeyCode;
	    if(keyCode === 'Delete' || keyCode === 'Backspace'){
	      return '';
	    }else if(keyCode === 'Enter'){
	      return this.props.value;
	    }else{
	      var text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
	      return text;
	    }

	  },

	  setCaretAtEndOfInput:function(){
	    var input = this.getInputNode();
	    //taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	    var txtLength = input.value.length;
	    if(input.setSelectionRange){
	      input.setSelectionRange(txtLength, txtLength);
	    }else if(input.createTextRange){
	      var fieldRange = input.createTextRange();
	      fieldRange.moveStart('character', txt.value.length);
	      fieldRange.collapse();
	      fieldRange.select();
	    }
	  },

	  setTextInputFocus:function(){
	    if(!this.isKeyPrintable(this.props.initialKeyCode)){
	      this.getInputNode().focus();
	      this.setCaretAtEndOfInput();
	    }else{
	      this.getInputNode().select();
	    }
	  }


	};

	module.exports = TextInputMixin;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;
	var DateRangePicker = function (element, options, cb) {

			// by default, the daterangepicker element is placed at the bottom of HTML body
			this.parentEl = 'body';

			//element that triggered the date range picker
			this.element = $(element);

			//tracks visible state
			this.isShowing = false;

			//create the picker HTML object
			var DRPTemplate = '<div class="daterangepicker dropdown-menu">' +
							'<div class="calendar left"></div>' +
							'<div class="calendar right"></div>' +
							'<div class="ranges">' +
								'<div class="range_inputs">' +
									'<div class="daterangepicker_start_input">' +
										'<label for="daterangepicker_start"></label>' +
										'<input class="input-mini" type="text" name="daterangepicker_start" value="" />' +
									'</div>' +
									'<div class="daterangepicker_end_input">' +
										'<label for="daterangepicker_end"></label>' +
										'<input class="input-mini" type="text" name="daterangepicker_end" value="" />' +
									'</div>' +
									'<button class="applyBtn" disabled="disabled"></button>&nbsp;' +
									'<button class="cancelBtn"></button>' +
								'</div>' +
							'</div>' +
						'</div>';

			//custom options
			if (typeof options !== 'object' || options === null)
					options = {};

			this.parentEl = (typeof options === 'object' && options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
			this.container = $(DRPTemplate).appendTo(this.parentEl);

			this.setOptions(options, cb);

			//apply CSS classes and labels to buttons
			var c = this.container;
			$.each(this.buttonClasses, function (idx, val) {
					c.find('button').addClass(val);
			});
			this.container.find('.daterangepicker_start_input label').html(this.locale.fromLabel);
			this.container.find('.daterangepicker_end_input label').html(this.locale.toLabel);
			if (this.applyClass.length)
					this.container.find('.applyBtn').addClass(this.applyClass);
			if (this.cancelClass.length)
					this.container.find('.cancelBtn').addClass(this.cancelClass);
			this.container.find('.applyBtn').html(this.locale.applyLabel);
			this.container.find('.cancelBtn').html(this.locale.cancelLabel);

			//event listeners

			this.container.find('.calendar')
					.on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
					.on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
					.on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
					.on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
					.on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
					.on('change.daterangepicker', 'select.yearselect', $.proxy(this.updateMonthYear, this))
					.on('change.daterangepicker', 'select.monthselect', $.proxy(this.updateMonthYear, this))
					.on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.ampmselect', $.proxy(this.updateTime, this));

			this.container.find('.ranges')
					.on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
					.on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
					.on('click.daterangepicker', '.daterangepicker_start_input,.daterangepicker_end_input', $.proxy(this.showCalendars, this))
					.on('change.daterangepicker', '.daterangepicker_start_input,.daterangepicker_end_input', $.proxy(this.inputsChanged, this))
					.on('keydown.daterangepicker', '.daterangepicker_start_input,.daterangepicker_end_input', $.proxy(this.inputsKeydown, this))
					.on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
					.on('mouseenter.daterangepicker', 'li', $.proxy(this.enterRange, this))
					.on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));

			if (this.element.is('input')) {
					this.element.on({
							'click.daterangepicker': $.proxy(this.show, this),
							'focus.daterangepicker': $.proxy(this.show, this),
							'keyup.daterangepicker': $.proxy(this.updateFromControl, this)
					});
			} else {
					this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
			}

	};

	DateRangePicker.prototype = {

			constructor: DateRangePicker,

			setOptions: function(options, callback) {

					this.startDate = moment().startOf('day');
					this.endDate = moment().endOf('day');
					this.minDate = false;
					this.maxDate = false;
					this.dateLimit = false;

					this.showDropdowns = false;
					this.showWeekNumbers = false;
					this.timePicker = false;
					this.timePickerIncrement = 30;
					this.timePicker12Hour = true;
					this.singleDatePicker = false;
					this.ranges = {};

					this.opens = 'right';
					if (this.element.hasClass('pull-right'))
							this.opens = 'left';

					this.buttonClasses = ['btn', 'btn-small btn-sm'];
					this.applyClass = 'btn-success';
					this.cancelClass = 'btn-default';

					this.format = 'MM/DD/YYYY';
					this.separator = ' - ';

					this.locale = {
							applyLabel: 'Apply',
							cancelLabel: 'Cancel',
							fromLabel: 'From',
							toLabel: 'To',
							weekLabel: 'W',
							customRangeLabel: 'Custom Range',
							daysOfWeek: moment.weekdaysMin(),
							monthNames: moment.monthsShort(),
							firstDay: moment.localeData()._week.dow
					};

					this.cb = function () { };

					if (typeof options.format === 'string')
							this.format = options.format;

					if (typeof options.separator === 'string')
							this.separator = options.separator;

					if (typeof options.startDate === 'string')
							this.startDate = moment(options.startDate, this.format);

					if (typeof options.endDate === 'string')
							this.endDate = moment(options.endDate, this.format);

					if (typeof options.minDate === 'string')
							this.minDate = moment(options.minDate, this.format);

					if (typeof options.maxDate === 'string')
							this.maxDate = moment(options.maxDate, this.format);

					if (typeof options.startDate === 'object')
							this.startDate = moment(options.startDate);

					if (typeof options.endDate === 'object')
							this.endDate = moment(options.endDate);

					if (typeof options.minDate === 'object')
							this.minDate = moment(options.minDate);

					if (typeof options.maxDate === 'object')
							this.maxDate = moment(options.maxDate);

					if (typeof options.applyClass === 'string')
							this.applyClass = options.applyClass;

					if (typeof options.cancelClass === 'string')
							this.cancelClass = options.cancelClass;

					if (typeof options.dateLimit === 'object')
							this.dateLimit = options.dateLimit;

					if (typeof options.locale === 'object') {

							if (typeof options.locale.daysOfWeek === 'object') {
									// Create a copy of daysOfWeek to avoid modification of original
									// options object for reusability in multiple daterangepicker instances
									this.locale.daysOfWeek = options.locale.daysOfWeek.slice();
							}

							if (typeof options.locale.monthNames === 'object') {
								this.locale.monthNames = options.locale.monthNames.slice();
							}

							if (typeof options.locale.firstDay === 'number') {
								this.locale.firstDay = options.locale.firstDay;
							}

							if (typeof options.locale.applyLabel === 'string') {
								this.locale.applyLabel = options.locale.applyLabel;
							}

							if (typeof options.locale.cancelLabel === 'string') {
								this.locale.cancelLabel = options.locale.cancelLabel;
							}

							if (typeof options.locale.fromLabel === 'string') {
								this.locale.fromLabel = options.locale.fromLabel;
							}

							if (typeof options.locale.toLabel === 'string') {
								this.locale.toLabel = options.locale.toLabel;
							}

							if (typeof options.locale.weekLabel === 'string') {
								this.locale.weekLabel = options.locale.weekLabel;
							}

							if (typeof options.locale.customRangeLabel === 'string') {
								this.locale.customRangeLabel = options.locale.customRangeLabel;
							}
					}

					if (typeof options.opens === 'string')
							this.opens = options.opens;

					if (typeof options.showWeekNumbers === 'boolean') {
							this.showWeekNumbers = options.showWeekNumbers;
					}

					if (typeof options.buttonClasses === 'string') {
							this.buttonClasses = [options.buttonClasses];
					}

					if (typeof options.buttonClasses === 'object') {
							this.buttonClasses = options.buttonClasses;
					}

					if (typeof options.showDropdowns === 'boolean') {
							this.showDropdowns = options.showDropdowns;
					}

					if (typeof options.singleDatePicker === 'boolean') {
							this.singleDatePicker = options.singleDatePicker;
					}

					if (typeof options.timePicker === 'boolean') {
							this.timePicker = options.timePicker;
					}

					if (typeof options.timePickerIncrement === 'number') {
							this.timePickerIncrement = options.timePickerIncrement;
					}

					if (typeof options.timePicker12Hour === 'boolean') {
							this.timePicker12Hour = options.timePicker12Hour;
					}

					// update day names order to firstDay
					if (this.locale.firstDay != 0) {
							var iterator = this.locale.firstDay;
							while (iterator > 0) {
									this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
									iterator--;
							}
					}

					var start, end, range;

					//if no start/end dates set, check if an input element contains initial values
					if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
							if ($(this.element).is('input[type=text]')) {
									var val = $(this.element).val();
									var split = val.split(this.separator);
									start = end = null;
									if (split.length == 2) {
											start = moment(split[0], this.format);
											end = moment(split[1], this.format);
									} else if (this.singleDatePicker) {
											start = moment(val, this.format);
											end = moment(val, this.format);
									}
									if (start !== null && end !== null) {
											this.startDate = start;
											this.endDate = end;
									}
							}
					}

					if (typeof options.ranges === 'object') {
							for (range in options.ranges) {

									start = moment(options.ranges[range][0]);
									end = moment(options.ranges[range][1]);

									// If we have a min/max date set, bound this range
									// to it, but only if it would otherwise fall
									// outside of the min/max.
									if (this.minDate && start.isBefore(this.minDate))
											start = moment(this.minDate);

									if (this.maxDate && end.isAfter(this.maxDate))
											end = moment(this.maxDate);

									// If the end of the range is before the minimum (if min is set) OR
									// the start of the range is after the max (also if set) don't display this
									// range option.
									if ((this.minDate && end.isBefore(this.minDate)) || (this.maxDate && start.isAfter(this.maxDate))) {
											continue;
									}

									this.ranges[range] = [start, end];
							}

							var list = '<ul>';
							for (range in this.ranges) {
									list += '<li>' + range + '</li>';
							}
							list += '<li>' + this.locale.customRangeLabel + '</li>';
							list += '</ul>';
							this.container.find('.ranges ul').remove();
							this.container.find('.ranges').prepend(list);
					}

					if (typeof callback === 'function') {
							this.cb = callback;
					}

					if (!this.timePicker) {
							this.startDate = this.startDate.startOf('day');
							this.endDate = this.endDate.endOf('day');
					}

					if (this.singleDatePicker) {
							this.opens = 'right';
							this.container.find('.calendar.right').show();
							this.container.find('.calendar.left').hide();
							this.container.find('.ranges').hide();
							if (!this.container.find('.calendar.right').hasClass('single'))
									this.container.find('.calendar.right').addClass('single');
					} else {
							this.container.find('.calendar.right').removeClass('single');
							this.container.find('.ranges').show();
					}

					this.oldStartDate = this.startDate.clone();
					this.oldEndDate = this.endDate.clone();
					this.oldChosenLabel = this.chosenLabel;

					this.leftCalendar = {
							month: moment([this.startDate.year(), this.startDate.month(), 1, this.startDate.hour(), this.startDate.minute()]),
							calendar: []
					};

					this.rightCalendar = {
							month: moment([this.endDate.year(), this.endDate.month(), 1, this.endDate.hour(), this.endDate.minute()]),
							calendar: []
					};

					if (this.opens == 'right') {
							//swap calendar positions
							var left = this.container.find('.calendar.left');
							var right = this.container.find('.calendar.right');

							if (right.hasClass('single')) {
									right.removeClass('single');
									left.addClass('single');
							}

							left.removeClass('left').addClass('right');
							right.removeClass('right').addClass('left');

							if (this.singleDatePicker) {
									left.show();
									right.hide();
							}
					}

					if (typeof options.ranges === 'undefined' && !this.singleDatePicker) {
							this.container.addClass('show-calendar');
					}

					this.container.addClass('opens' + this.opens);

					this.updateView();
					this.updateCalendars();

			},

			setStartDate: function(startDate) {
					if (typeof startDate === 'string')
							this.startDate = moment(startDate, this.format);

					if (typeof startDate === 'object')
							this.startDate = moment(startDate);

					if (!this.timePicker)
							this.startDate = this.startDate.startOf('day');

					this.oldStartDate = this.startDate.clone();

					this.updateView();
					this.updateCalendars();
					this.updateInputText();
			},

			setEndDate: function(endDate) {
					if (typeof endDate === 'string')
							this.endDate = moment(endDate, this.format);

					if (typeof endDate === 'object')
							this.endDate = moment(endDate);

					if (!this.timePicker)
							this.endDate = this.endDate.endOf('day');

					this.oldEndDate = this.endDate.clone();

					this.updateView();
					this.updateCalendars();
					this.updateInputText();
			},

			updateView: function () {
					this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute());
					this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute());
					this.updateFormInputs();
			},

			updateFormInputs: function () {
					this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.format));
					this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.format));

					if (this.startDate.isSame(this.endDate) || this.startDate.isBefore(this.endDate)) {
							this.container.find('button.applyBtn').removeAttr('disabled');
					} else {
							this.container.find('button.applyBtn').attr('disabled', 'disabled');
					}
			},

			updateFromControl: function () {
					if (!this.element.is('input')) return;
					if (!this.element.val().length) return;

					var dateString = this.element.val().split(this.separator),
							start = null,
							end = null;

					if(dateString.length === 2) {
							start = moment(dateString[0], this.format);
							end = moment(dateString[1], this.format);
					}

					if (this.singleDatePicker || start === null || end === null) {
							start = moment(this.element.val(), this.format);
							end = start;
					}

					if (end.isBefore(start)) return;

					this.oldStartDate = this.startDate.clone();
					this.oldEndDate = this.endDate.clone();

					this.startDate = start;
					this.endDate = end;

					if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
							this.notify();

					this.updateCalendars();
			},

			notify: function () {
					this.updateView();
					this.cb(this.startDate, this.endDate, this.chosenLabel);
			},

			move: function () {
					var parentOffset = { top: 0, left: 0 };
					var parentRightEdge = $(window).width();
					if (!this.parentEl.is('body')) {
							parentOffset = {
									top: this.parentEl.offset().top - this.parentEl.scrollTop(),
									left: this.parentEl.offset().left - this.parentEl.scrollLeft()
							};
							parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
					}

					if (this.opens == 'left') {
							this.container.css({
									top: this.element.offset().top + this.element.outerHeight() - parentOffset.top,
									right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
									left: 'auto'
							});
							if (this.container.offset().left < 0) {
									this.container.css({
											right: 'auto',
											left: 9
									});
							}
					} else {
							this.container.css({
									top: this.element.offset().top + this.element.outerHeight() - parentOffset.top,
									left: this.element.offset().left - parentOffset.left,
									right: 'auto'
							});
							if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
									this.container.css({
											left: 'auto',
											right: 0
									});
							}
					}
			},

			toggle: function (e) {
					if (this.element.hasClass('active')) {
							this.hide();
					} else {
							this.show();
					}
			},

			show: function (e) {
					if (this.isShowing) return;

					this.element.addClass('active');
					this.container.show();
					this.move();

					// Create a click proxy that is private to this instance of datepicker, for unbinding
					this._outsideClickProxy = $.proxy(function (e) { this.outsideClick(e); }, this);
					// Bind global datepicker mousedown for hiding and
					$(document)
						.on('mousedown.daterangepicker', this._outsideClickProxy)
						// also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
						.on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
						// and also close when focus changes to outside the picker (eg. tabbing between controls)
						.on('focusin.daterangepicker', this._outsideClickProxy);

					this.isShowing = true;
					this.element.trigger('show.daterangepicker', this);
			},

			outsideClick: function (e) {
					var target = $(e.target);
					// if the page is clicked anywhere except within the daterangerpicker/button
					// itself then call this.hide()
					if (
							target.closest(this.element).length ||
							target.closest(this.container).length ||
							target.closest('.calendar-date').length
							) return;
					this.hide();
			},

			hide: function (e) {
					if (!this.isShowing) return;

					$(document)
						.off('mousedown.daterangepicker')
						.off('click.daterangepicker', '[data-toggle=dropdown]')
						.off('focusin.daterangepicker');

					this.element.removeClass('active');
					this.container.hide();

					if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
							this.notify();

					this.oldStartDate = this.startDate.clone();
					this.oldEndDate = this.endDate.clone();

					this.isShowing = false;
					this.element.trigger('hide.daterangepicker', this);
			},

			enterRange: function (e) {
					// mouse pointer has entered a range label
					var label = e.target.innerHTML;
					if (label == this.locale.customRangeLabel) {
							this.updateView();
					} else {
							var dates = this.ranges[label];
							this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.format));
							this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.format));
					}
			},

			showCalendars: function() {
					this.container.addClass('show-calendar');
					this.move();
					this.element.trigger('showCalendar.daterangepicker', this);
			},

			hideCalendars: function() {
					this.container.removeClass('show-calendar');
					this.element.trigger('hideCalendar.daterangepicker', this);
			},

			// when a date is typed into the start to end date textboxes
			inputsChanged: function (e) {
					var el = $(e.target);
					var date = moment(el.val());
					if (!date.isValid()) return;

					var startDate, endDate;
					if (el.attr('name') === 'daterangepicker_start') {
							startDate = date;
							endDate = this.endDate;
					} else {
							startDate = this.startDate;
							endDate = date;
					}
					this.setCustomDates(startDate, endDate);
			},

			inputsKeydown: function(e) {
					if (e.keyCode === 13) {
							this.inputsChanged(e);
							this.notify();
					}
			},

			updateInputText: function() {
					if (this.element.is('input') && !this.singleDatePicker) {
							this.element.val(this.startDate.format(this.format) + this.separator + this.endDate.format(this.format));
					} else if (this.element.is('input')) {
							this.element.val(this.startDate.format(this.format));
					}
			},

			clickRange: function (e) {
					var label = e.target.innerHTML;
					this.chosenLabel = label;
					if (label == this.locale.customRangeLabel) {
							this.showCalendars();
					} else {
							var dates = this.ranges[label];

							this.startDate = dates[0];
							this.endDate = dates[1];

							if (!this.timePicker) {
									this.startDate.startOf('day');
									this.endDate.endOf('day');
							}

							this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute());
							this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute());
							this.updateCalendars();

							this.updateInputText();

							this.hideCalendars();
							this.hide();
							this.element.trigger('apply.daterangepicker', this);
					}
			},

			clickPrev: function (e) {
					var cal = $(e.target).parents('.calendar');
					if (cal.hasClass('left')) {
							this.leftCalendar.month.subtract(1, 'month');
					} else {
							this.rightCalendar.month.subtract(1, 'month');
					}
					this.updateCalendars();
			},

			clickNext: function (e) {
					var cal = $(e.target).parents('.calendar');
					if (cal.hasClass('left')) {
							this.leftCalendar.month.add(1, 'month');
					} else {
							this.rightCalendar.month.add(1, 'month');
					}
					this.updateCalendars();
			},

			hoverDate: function (e) {
					var title = $(e.target).attr('data-title');
					var row = title.substr(1, 1);
					var col = title.substr(3, 1);
					var cal = $(e.target).parents('.calendar');

					if (cal.hasClass('left')) {
							this.container.find('input[name=daterangepicker_start]').val(this.leftCalendar.calendar[row][col].format(this.format));
					} else {
							this.container.find('input[name=daterangepicker_end]').val(this.rightCalendar.calendar[row][col].format(this.format));
					}
			},

			setCustomDates: function(startDate, endDate) {
					this.chosenLabel = this.locale.customRangeLabel;
					if (startDate.isAfter(endDate)) {
							var difference = this.endDate.diff(this.startDate);
							endDate = moment(startDate).add(difference, 'ms');
					}
					this.startDate = startDate;
					this.endDate = endDate;

					this.updateView();
					this.updateCalendars();
			},

			clickDate: function (e) {
					var title = $(e.target).attr('data-title');
					var row = title.substr(1, 1);
					var col = title.substr(3, 1);
					var cal = $(e.target).parents('.calendar');

					var startDate, endDate;
					if (cal.hasClass('left')) {
							startDate = this.leftCalendar.calendar[row][col];
							endDate = this.endDate;
							if (typeof this.dateLimit === 'object') {
									var maxDate = moment(startDate).add(this.dateLimit).startOf('day');
									if (endDate.isAfter(maxDate)) {
											endDate = maxDate;
									}
							}
					} else {
							startDate = this.startDate;
							endDate = this.rightCalendar.calendar[row][col];
							if (typeof this.dateLimit === 'object') {
									var minDate = moment(endDate).subtract(this.dateLimit).startOf('day');
									if (startDate.isBefore(minDate)) {
											startDate = minDate;
									}
							}
					}

					if (this.singleDatePicker && cal.hasClass('left')) {
							endDate = startDate.clone();
					} else if (this.singleDatePicker && cal.hasClass('right')) {
							startDate = endDate.clone();
					}

					cal.find('td').removeClass('active');

					$(e.target).addClass('active');

					this.setCustomDates(startDate, endDate);

					if (!this.timePicker)
							endDate.endOf('day');

					if (this.singleDatePicker)
							this.clickApply();
			},

			clickApply: function (e) {
					this.updateInputText();
					this.hide();
					this.element.trigger('apply.daterangepicker', this);
			},

			clickCancel: function (e) {
					this.startDate = this.oldStartDate;
					this.endDate = this.oldEndDate;
					this.chosenLabel = this.oldChosenLabel;
					this.updateView();
					this.updateCalendars();
					this.hide();
					this.element.trigger('cancel.daterangepicker', this);
			},

			updateMonthYear: function (e) {
					var isLeft = $(e.target).closest('.calendar').hasClass('left'),
							leftOrRight = isLeft ? 'left' : 'right',
							cal = this.container.find('.calendar.'+leftOrRight);

					// Month must be Number for new moment versions
					var month = parseInt(cal.find('.monthselect').val(), 10);
					var year = cal.find('.yearselect').val();

					this[leftOrRight+'Calendar'].month.month(month).year(year);
					this.updateCalendars();
			},

			updateTime: function(e) {

					var cal = $(e.target).closest('.calendar'),
							isLeft = cal.hasClass('left');

					var hour = parseInt(cal.find('.hourselect').val(), 10);
					var minute = parseInt(cal.find('.minuteselect').val(), 10);

					if (this.timePicker12Hour) {
							var ampm = cal.find('.ampmselect').val();
							if (ampm === 'PM' && hour < 12)
									hour += 12;
							if (ampm === 'AM' && hour === 12)
									hour = 0;
					}

					if (isLeft) {
							var start = this.startDate.clone();
							start.hour(hour);
							start.minute(minute);
							this.startDate = start;
							this.leftCalendar.month.hour(hour).minute(minute);
					} else {
							var end = this.endDate.clone();
							end.hour(hour);
							end.minute(minute);
							this.endDate = end;
							this.rightCalendar.month.hour(hour).minute(minute);
					}

					this.updateCalendars();
			},

			updateCalendars: function () {
					this.leftCalendar.calendar = this.buildCalendar(this.leftCalendar.month.month(), this.leftCalendar.month.year(), this.leftCalendar.month.hour(), this.leftCalendar.month.minute(), 'left');
					this.rightCalendar.calendar = this.buildCalendar(this.rightCalendar.month.month(), this.rightCalendar.month.year(), this.rightCalendar.month.hour(), this.rightCalendar.month.minute(), 'right');
					this.container.find('.calendar.left').empty().html(this.renderCalendar(this.leftCalendar.calendar, this.startDate, this.minDate, this.maxDate));

					var minDate = this.minDate;
					if (!this.singleDatePicker)
							minDate = this.startDate;
					this.container.find('.calendar.right').empty().html(this.renderCalendar(this.rightCalendar.calendar, this.endDate, minDate, this.maxDate));

					this.container.find('.ranges li').removeClass('active');
					var customRange = true;
					var i = 0;
					for (var range in this.ranges) {
							if (this.timePicker) {
									if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
											customRange = false;
											this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')')
													.addClass('active').html();
									}
							} else {
									//ignore times when comparing dates if time picker is not enabled
									if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
											customRange = false;
											this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')')
													.addClass('active').html();
									}
							}
							i++;
					}
					if (customRange) {
							this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
							this.showCalendars();
					}
			},

			buildCalendar: function (month, year, hour, minute, side) {
					var daysInMonth = moment([year, month]).daysInMonth();
					var firstDay = moment([year, month, 1]);
					var lastDay = moment([year, month, daysInMonth]);
					var lastMonth = moment(firstDay).subtract(1, 'month').month();
					var lastYear = moment(firstDay).subtract(1, 'month').year();

					var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();

					var dayOfWeek = firstDay.day();

					var i;

					//initialize a 6 rows x 7 columns array for the calendar
					var calendar = [];
					calendar.firstDay = firstDay;
					calendar.lastDay = lastDay;

					for (i = 0; i < 6; i++) {
							calendar[i] = [];
					}

					//populate the calendar with date objects
					var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
					if (startDay > daysInLastMonth)
							startDay -= 7;

					if (dayOfWeek == this.locale.firstDay)
							startDay = daysInLastMonth - 6;

					var curDate = moment([lastYear, lastMonth, startDay, 12, minute]);
					var col, row;
					for (i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
							if (i > 0 && col % 7 === 0) {
									col = 0;
									row++;
							}
							calendar[row][col] = curDate.clone().hour(hour);
							curDate.hour(12);
					}

					return calendar;
			},

			renderDropdowns: function (selected, minDate, maxDate) {
					var currentMonth = selected.month();
					var monthHtml = '<select class="monthselect">';
					var inMinYear = false;
					var inMaxYear = false;

					for (var m = 0; m < 12; m++) {
							if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
									monthHtml += "<option value='" + m + "'" +
											(m === currentMonth ? " selected='selected'" : "") +
											">" + this.locale.monthNames[m] + "</option>";
							}
					}
					monthHtml += "</select>";

					var currentYear = selected.year();
					var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
					var minYear = (minDate && minDate.year()) || (currentYear - 50);
					var yearHtml = '<select class="yearselect">';

					for (var y = minYear; y <= maxYear; y++) {
							yearHtml += '<option value="' + y + '"' +
									(y === currentYear ? ' selected="selected"' : '') +
									'>' + y + '</option>';
					}

					yearHtml += '</select>';

					return monthHtml + yearHtml;
			},

			renderCalendar: function (calendar, selected, minDate, maxDate) {

					var html = '<div class="calendar-date">';
					html += '<table class="table-condensed">';
					html += '<thead>';
					html += '<tr>';

					// add empty cell for week number
					if (this.showWeekNumbers)
							html += '<th></th>';

					if (!minDate || minDate.isBefore(calendar.firstDay)) {
							html += '<th class="prev available"><i class="fa fa-arrow-left icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>';
					} else {
							html += '<th></th>';
					}

					var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

					if (this.showDropdowns) {
							dateHtml = this.renderDropdowns(calendar[1][1], minDate, maxDate);
					}

					html += '<th colspan="5" class="month">' + dateHtml + '</th>';
					if (!maxDate || maxDate.isAfter(calendar.lastDay)) {
							html += '<th class="next available"><i class="fa fa-arrow-right icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>';
					} else {
							html += '<th></th>';
					}

					html += '</tr>';
					html += '<tr>';

					// add week number label
					if (this.showWeekNumbers)
							html += '<th class="week">' + this.locale.weekLabel + '</th>';

					$.each(this.locale.daysOfWeek, function (index, dayOfWeek) {
							html += '<th>' + dayOfWeek + '</th>';
					});

					html += '</tr>';
					html += '</thead>';
					html += '<tbody>';

					for (var row = 0; row < 6; row++) {
							html += '<tr>';

							// add week number
							if (this.showWeekNumbers)
									html += '<td class="week">' + calendar[row][0].week() + '</td>';

							for (var col = 0; col < 7; col++) {
									var cname = 'available ';
									cname += (calendar[row][col].month() == calendar[1][1].month()) ? '' : 'off';

									if ((minDate && calendar[row][col].isBefore(minDate, 'day')) || (maxDate && calendar[row][col].isAfter(maxDate, 'day'))) {
											cname = ' off disabled ';
									} else if (calendar[row][col].format('YYYY-MM-DD') == selected.format('YYYY-MM-DD')) {
											cname += ' active ';
											if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
													cname += ' start-date ';
											}
											if (calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
													cname += ' end-date ';
											}
									} else if (calendar[row][col] >= this.startDate && calendar[row][col] <= this.endDate) {
											cname += ' in-range ';
											if (calendar[row][col].isSame(this.startDate)) { cname += ' start-date '; }
											if (calendar[row][col].isSame(this.endDate)) { cname += ' end-date '; }
									}

									var title = 'r' + row + 'c' + col;
									html += '<td class="' + cname.replace(/\s+/g, ' ').replace(/^\s?(.*?)\s?$/, '$1') + '" data-title="' + title + '">' + calendar[row][col].date() + '</td>';
							}
							html += '</tr>';
					}

					html += '</tbody>';
					html += '</table>';
					html += '</div>';

					var i;
					if (this.timePicker) {

							html += '<div class="calendar-time">';
							html += '<select class="hourselect">';
							var start = 0;
							var end = 23;
							var selected_hour = selected.hour();
							if (this.timePicker12Hour) {
									start = 1;
									end = 12;
									if (selected_hour >= 12)
											selected_hour -= 12;
									if (selected_hour === 0)
											selected_hour = 12;
							}

							for (i = start; i <= end; i++) {
									if (i == selected_hour) {
											html += '<option value="' + i + '" selected="selected">' + i + '</option>';
									} else {
											html += '<option value="' + i + '">' + i + '</option>';
									}
							}

							html += '</select> : ';

							html += '<select class="minuteselect">';

							for (i = 0; i < 60; i += this.timePickerIncrement) {
									var num = i;
									if (num < 10)
											num = '0' + num;
									if (i == selected.minute()) {
											html += '<option value="' + i + '" selected="selected">' + num + '</option>';
									} else {
											html += '<option value="' + i + '">' + num + '</option>';
									}
							}

							html += '</select> ';

							if (this.timePicker12Hour) {
									html += '<select class="ampmselect">';
									if (selected.hour() >= 12) {
											html += '<option value="AM">AM</option><option value="PM" selected="selected">PM</option>';
									} else {
											html += '<option value="AM" selected="selected">AM</option><option value="PM">PM</option>';
									}
									html += '</select>';
							}

							html += '</div>';

					}

					return html;

			},

			remove: function() {

					this.container.remove();
					this.element.off('.daterangepicker');
					this.element.removeData('daterangepicker');

			}

	};

	$.fn.daterangepicker = function (options, cb) {
			this.each(function () {
					var el = $(this);
					if (el.data('daterangepicker'))
							el.data('daterangepicker').remove();
					el.data('daterangepicker', new DateRangePicker(el, options, cb));
			});
			return this;
	};

	var validateDate = function(props, propName, componentName) {
				if(!moment(props).isValid()){
					throw(propName + " must be a valid date");
				}
			}

	var DateRangeFilter = React.createClass({displayName: 'DateRangeFilter',

		getInitialState : function(){
			return {dateRange : ''};
		},

		propTypes : {
			format    : React.PropTypes.string,
			ranges    : React.PropTypes.object,
			onApply   : React.PropTypes.func,
			startDate : validateDate,
			endDate   : validateDate
		},

		componentDidMount : function(){
			//initialise jQuery date range widget -
			var $calendarNode = $(this.refs.calendar.getDOMNode())
			var $calendar = $calendarNode.daterangepicker({ranges : this.props.ranges, format : this.props.format, opens : 'left', locale: { cancelLabel: 'Clear' }, applyClass : 'btn-primary'  });
			this.calendar = $calendar.data('daterangepicker');
			if(this.props.startDate){
				this.calendar.setStartDate(this.props.startDate);
			}
			if(this.props.endDate){
				this.calendar.setEndDate(this.props.endDate);
			}
			$calendar.on('apply.daterangepicker', this.handleApply).on('cancel.daterangepicker', this.handleClear);
		},

		componentWillUnmount : function(){
			//destroy widget on unMount
			this.calendar.remove();
		},

		handleApply : function(ev, picker) {
			if(this.props.onApply){
				//return moment instances for start and end date ranges
				this.props.onApply(picker.startDate, picker.endDate);
			}
			this.setState({dateRange : picker.startDate.format(picker.format) + " - " + picker.endDate.format(picker.format)})
		},

		handleClear : function(){
			this.setState({dateRange : ''});
			if(this.props.onApply){
				//return moment instances for start and end date ranges
				this.props.onApply(null, null);
			}
		},

		getTitle : function(){
			return this.state.dateRange !== '' ? this.state.dateRange : this.props.title;
		},

		render: function() {
			return (
	      React.createElement("input", {ref: "calendar", onBlur: this.props.onblur})
				);
		}
	});


	module.exports = DateRangeFilter;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};

	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canMutationObserver = typeof window !== 'undefined'
	    && window.MutationObserver;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;

	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }

	    var queue = [];

	    if (canMutationObserver) {
	        var hiddenDiv = document.createElement("div");
	        var observer = new MutationObserver(function () {
	            var queueList = queue.slice();
	            queue.length = 0;
	            queueList.forEach(function (fn) {
	                fn();
	            });
	        });

	        observer.observe(hiddenDiv, { attributes: true });

	        return function nextTick(fn) {
	            if (!queue.length) {
	                hiddenDiv.setAttribute('yes', 'no');
	            }
	            queue.push(fn);
	        };
	    }

	    if (canPost) {
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }

	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React         = __webpack_require__(1);
	var PropTypes     = React.PropTypes;
	var emptyFunction = __webpack_require__(47);

	var Draggable = React.createClass({displayName: 'Draggable',

	  propTypes: {
	    onDragStart: PropTypes.func,
	    onDragEnd: PropTypes.func,
	    onDrag: PropTypes.func,
	    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor])
	  },

	  render:function() {
	    var Component = this.props.component;
	    return (
	      React.createElement(Component, React.__spread({},  this.props, {onMouseDown: this.onMouseDown}))
	    );
	  },

	  getDefaultProps:function() {
	    return {
	      component: React.DOM.div,
	      onDragStart: emptyFunction.thatReturnsTrue,
	      onDragEnd: emptyFunction,
	      onDrag: emptyFunction
	    };
	  },

	  getInitialState:function() {
	    return {
	      drag: null
	    };
	  },

	  onMouseDown:function(e) {
	    var drag = this.props.onDragStart(e);

	    if (drag === null && e.button !== 0) {
	      return;
	    }

	    window.addEventListener('mouseup', this.onMouseUp);
	    window.addEventListener('mousemove', this.onMouseMove);

	    this.setState({drag:drag});
	  },

	  onMouseMove:function(e) {
	    if (this.state.drag === null) {
	      return;
	    }

	    if (e.stopPropagation) {
	      e.stopPropagation();
	    }

	    if (e.preventDefault) {
	      e.preventDefault();
	    }

	    this.props.onDrag(e);
	  },

	  onMouseUp:function(e) {
	    this.cleanUp();
	    this.props.onDragEnd(e, this.state.drag);
	    this.setState({drag: null});
	  },

	  componentWillUnmount:function() {
	    this.cleanUp();
	  },

	  cleanUp:function() {
	    window.removeEventListener('mouseup', this.onMouseUp);
	    window.removeEventListener('mousemove', this.onMouseMove);
	  }
	});

	module.exports = Draggable;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	/**
	 * Return window's height and width
	 *
	 * @return {Object} height and width of the window
	 */
	function getWindowSize() {
	    var width = window.innerWidth;
	    var height = window.innerHeight;

	    if (!width || !height) {
	        width = document.documentElement.clientWidth;
	        height = document.documentElement.clientHeight;
	    }

	    if (!width || !height) {
	        width = document.body.clientWidth;
	        height = document.body.clientHeight;
	    }

	    return {width:width, height:height};
	}

	module.exports = getWindowSize;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var PropTypes      = React.PropTypes;
	var cloneWithProps = React.addons.cloneWithProps;
	var shallowEqual   = __webpack_require__(107);
	var emptyFunction  = __webpack_require__(102);
	var ScrollShim     = __webpack_require__(110);
	var Row            = __webpack_require__(30);

	var Canvas = React.createClass({displayName: 'Canvas',
	  mixins: [ScrollShim],

	  propTypes: {
	    cellRenderer: PropTypes.element,
	    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
	    rowHeight: PropTypes.number.isRequired,
	    displayStart: PropTypes.number.isRequired,
	    displayEnd: PropTypes.number.isRequired,
	    length: PropTypes.number.isRequired,
	    rows: PropTypes.oneOfType([
	      PropTypes.func.isRequired,
	      PropTypes.array.isRequired
	    ]),
	    onRows: PropTypes.func
	  },

	  render:function() {
	    var displayStart = this.state.displayStart;
	    var displayEnd = this.state.displayEnd;
	    var rowHeight = this.props.rowHeight;
	    var length = this.props.length;

	    var rows = this
	        .getRows(displayStart, displayEnd)
	        .map(function(row, idx)  {return this.renderRow({
	          key: displayStart + idx,
	          ref: idx,
	          idx: displayStart + idx,
	          row: row,
	          height: rowHeight,
	          columns: this.props.columns,
	          cellRenderer: this.props.cellRenderer,
	          isSelected : this.isRowSelected(displayStart + idx),
	          expandedRows : this.props.expandedRows
	        });}.bind(this));

	    this._currentRowsLength = rows.length;

	    if (displayStart > 0) {
	      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
	    }

	    if (length - displayEnd > 0) {
	      rows.push(
	        this.renderPlaceholder('bottom', (length - displayEnd) * rowHeight));
	    }

	    var style = {
	      position: 'absolute',
	      top: 0,
	      left: 0,
	      overflowX: 'auto',
	      overflowY: 'scroll',
	      width: this.props.totalWidth,
	      height: this.props.height,
	      transform: 'translate3d(0, 0, 0)'
	    };

	    return (
	      React.createElement("div", {
	        style: style, 
	        onScroll: this.onScroll, 
	        className: cx("react-grid-Canvas", this.props.className)}, 
	        React.createElement("div", {style: {width: this.props.width, overflow: 'hidden'}}, 
	          rows
	        )
	      )
	    );
	  },

	  renderRow:function(props) {
	    if (React.isValidElement(this.props.rowRenderer)) {
	      return cloneWithProps(this.props.rowRenderer, props);
	    } else {
	      return this.props.rowRenderer(props);
	    }
	  },

	  renderPlaceholder:function(key, height) {
	    return (
	      React.createElement("div", {key: key, style: {height: height}}, 
	        this.props.columns.map(
	          function(column, idx)  {return React.createElement("div", {style: {width: column.width}, key: idx});})
	      )
	    );
	  },

	  getDefaultProps:function() {
	    return {
	      rowRenderer: React.createElement(Row, null),
	      onRows: emptyFunction
	    };
	  },

	  isRowSelected:function(rowIdx){
	   return this.props.selectedRows && this.props.selectedRows[rowIdx] === true;
	  },

	  getInitialState:function() {
	    return {
	      shouldUpdate: true,
	      displayStart: this.props.displayStart,
	      displayEnd: this.props.displayEnd
	    };
	  },

	  componentWillMount:function() {
	    this._currentRowsLength = undefined;
	    this._currentRowsRange = undefined;
	    this._scroll = undefined;
	  },

	  componentDidMount:function() {
	    this.onRows();
	  },

	  componentDidUpdate:function() {
	    if (this._scroll !== undefined) {
	      this.setScrollLeft(this._scroll);
	    }
	    this.onRows();
	  },

	  componentWillUnmount:function() {
	    this._currentRowsLength = undefined;
	    this._currentRowsRange = undefined;
	    this._scroll = undefined;
	  },

	  componentWillReceiveProps:function(nextProps) {
	    var shouldUpdate = !(nextProps.visibleStart > this.state.displayStart
	                        && nextProps.visibleEnd < this.state.displayEnd)
	                        || nextProps.length !== this.props.length
	                        || nextProps.rowHeight !== this.props.rowHeight
	                        || nextProps.columns !== this.props.columns
	                        || nextProps.width !== this.props.width
	                        || !shallowEqual(nextProps.style, this.props.style);

	    if (shouldUpdate) {
	      this.setState({
	        shouldUpdate: true,
	        displayStart: nextProps.displayStart,
	        displayEnd: nextProps.displayEnd
	      });
	    } else {
	      this.setState({shouldUpdate: false});
	    }
	  },

	  shouldComponentUpdate:function(nextProps, nextState) {
	    return nextState.shouldUpdate;
	  },

	  onRows:function() {
	    if (this._currentRowsRange !== undefined) {
	      this.props.onRows(this._currentRowsRange);
	      this._currentRowsRange = undefined;
	    }
	  },

	  getRows:function(displayStart, displayEnd) {
	    this._currentRowsRange = {start: displayStart, end: displayEnd};
	    if (Array.isArray(this.props.rows)) {
	      return this.props.rows.slice(displayStart, displayEnd);
	    } else {
	      return this.props.rows(displayStart, displayEnd);
	    }
	  },

	  setScrollLeft:function(scrollLeft) {
	    if (this._currentRowsLength !== undefined) {
	      for (var i = 0, len = this._currentRowsLength; i < len; i++) {
	        if(this.refs[i]) {
	          this.refs[i].setScrollLeft(scrollLeft);
	        }
	      }
	    }
	  },

	  getScroll:function() {
	    var $__0=   this.getDOMNode(),scrollTop=$__0.scrollTop,scrollLeft=$__0.scrollLeft;
	    return {scrollTop:scrollTop, scrollLeft:scrollLeft};
	  },

	  onScroll:function(e) {
	    this.appendScrollShim();
	    var $__0=   e.target,scrollTop=$__0.scrollTop,scrollLeft=$__0.scrollLeft;
	    var scroll = {scrollTop:scrollTop, scrollLeft:scrollLeft};
	    this._scroll = scroll;
	    this.props.onScroll(scroll);
	  }
	});


	module.exports = Canvas;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React             = __webpack_require__(1);
	var PropTypes         = React.PropTypes;
	var shallowEqual      = __webpack_require__(107);
	var HeaderCell        = __webpack_require__(108);
	var getScrollbarSize  = __webpack_require__(109);

	var HeaderRow = React.createClass({displayName: 'HeaderRow',

	  propTypes: {
	    width: PropTypes.number,
	    height: PropTypes.number.isRequired,
	    columns: PropTypes.array.isRequired,
	    onColumnResize: PropTypes.func
	  },

	  render:function() {
	    var cellsStyle = {
	      width: this.props.width ? (this.props.width + getScrollbarSize()) : '100%',
	      height: this.props.height,
	      whiteSpace: 'nowrap',
	      overflowX: 'hidden',
	      overflowY: 'hidden'
	    };

	    var cells = this.getCells();
	    return (
	      React.createElement("div", React.__spread({},  this.props, {style: this.getStyle(), className: "react-grid-HeaderRow"}), 
	        React.createElement("div", {style: cellsStyle}, 
	          cells
	        )
	      )
	    );
	  },

	  getCells:function() {
	    var cells = [];
	    var lockedCells = [];

	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      var column = this.props.columns[i];
	      var cell = (
	        React.createElement(HeaderCell, {
	          ref: i, 
	          key: i, 
	          height: this.props.height, 
	          column: column, 
	          renderer: this.props.headerCellRenderer || column.headerRenderer || this.props.cellRenderer, 
	          resizing: this.props.resizing === column, 
	          onResize: this.props.onColumnResize, 
	          onResizeEnd: this.props.onColumnResizeEnd}
	          )
	      );
	      if (column.locked) {
	        lockedCells.push(cell);
	      } else {
	        cells.push(cell);
	      }
	    }

	    return cells.concat(lockedCells);
	  },

	  setScrollLeft:function(scrollLeft) {
	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      if (this.props.columns[i].locked) {
	        this.refs[i].setScrollLeft(scrollLeft);
	      }
	    }
	  },

	  shouldComponentUpdate:function(nextProps) {
	    return (
	      nextProps.width !== this.props.width
	      || nextProps.height !== this.props.height
	      || nextProps.columns !== this.props.columns
	      || !shallowEqual(nextProps.style, this.props.style)
	    );
	  },

	  getStyle:function() {
	    return {
	      overflow: 'hidden',
	      width: '100%',
	      height: this.props.height,
	      position: 'absolute'
	    };
	  }

	});

	module.exports = HeaderRow;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule emptyFunction
	 */
	'use strict';

	var copyProperties = __webpack_require__(111);

	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	copyProperties(emptyFunction, {
	  thatReturns: makeEmptyFunction,
	  thatReturnsFalse: makeEmptyFunction(false),
	  thatReturnsTrue: makeEmptyFunction(true),
	  thatReturnsNull: makeEmptyFunction(null),
	  thatReturnsThis: function() { return this; },
	  thatReturnsArgument: function(arg) { return arg; }
	});

	module.exports = emptyFunction;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var TextInputMixin = {

	  onPressArrowLeft:function(e){
	    //prevent event propogation. this disables left cell navigation
	    e.stopPropagation();
	  },

	  onPressArrowRight:function(e){
	    //prevent event propogation. this disables right cell navigation
	    e.stopPropagation();
	  },

	  getDefaultValue:function(){
	    var keyCode = this.props.initialKeyCode;
	    if(keyCode === 'Delete' || keyCode === 'Backspace'){
	      return '';
	    }else if(keyCode === 'Enter'){
	      return this.props.value;
	    }else{
	      var text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
	      return text;
	    }

	  },

	  setCaretAtEndOfInput:function(){
	    var input = this.getInputNode();
	    //taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	    var txtLength = input.value.length;
	    if(input.setSelectionRange){
	      input.setSelectionRange(txtLength, txtLength);
	    }else if(input.createTextRange){
	      var fieldRange = input.createTextRange();
	      fieldRange.moveStart('character', txt.value.length);
	      fieldRange.collapse();
	      fieldRange.select();
	    }
	  },

	  setTextInputFocus:function(){
	    if(!this.isKeyPrintable(this.props.initialKeyCode)){
	      this.getInputNode().focus();
	      this.setCaretAtEndOfInput();
	    }else{
	      this.getInputNode().select();
	    }
	  }


	};

	module.exports = TextInputMixin;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if ("production" !== process.env.NODE_ENV) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(1));
		else if(typeof define === 'function' && define.amd)
			define(["react/addons"], factory);
		else if(typeof exports === 'object')
			exports["ReactAutocomplete"] = factory(require("react/addons"));
		else
			root["ReactAutocomplete"] = factory(root["React"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		/**
		 * @jsx React.DOM
		 */
		"use strict";

		var React = __webpack_require__(1);
		var cx = React.addons.classSet;

		var Autocomplete = React.createClass({ displayName: "Autocomplete",

		  propTypes: {
		    options: React.PropTypes.any,
		    search: React.PropTypes.func,
		    resultRenderer: React.PropTypes.oneOfType([React.PropTypes.component, React.PropTypes.func]),
		    value: React.PropTypes.object,
		    onChange: React.PropTypes.func,
		    onError: React.PropTypes.func
		  },

		  getDefaultProps: function () {
		    return { search: searchArray };
		  },

		  getInitialState: function () {
		    var searchTerm = this.props.searchTerm ? this.props.searchTerm : this.props.value ? this.props.value.title : "";
		    return {
		      results: [],
		      showResults: false,
		      showResultsInProgress: false,
		      searchTerm: searchTerm,
		      focusedValue: null
		    };
		  },

		  getResultIdentifier: function (result) {
		    if (this.props.resultIdentifier === undefined) {
		      return result.id;
		    } else {
		      return result[this.props.resultIdentifier];
		    }
		  },


		  render: function () {
		    var className = cx(this.props.className, "react-autocomplete-Autocomplete", this.state.showResults ? "react-autocomplete-Autocomplete--resultsShown" : undefined);
		    var style = {
		      position: "relative",
		      outline: "none"
		    };
		    return React.createElement("div", {
		      tabIndex: "1",
		      className: className,
		      onFocus: this.onFocus,
		      onBlur: this.onBlur,
		      style: style }, React.createElement("input", {
		      ref: "search",
		      className: "react-autocomplete-Autocomplete__search",
		      style: { width: "100%" },
		      onClick: this.showAllResults,
		      onChange: this.onQueryChange,
		      onFocus: this.showAllResults,
		      onBlur: this.onQueryBlur,
		      onKeyDown: this.onQueryKeyDown,
		      value: this.state.searchTerm }), React.createElement(Results, {
		      className: "react-autocomplete-Autocomplete__results",
		      onSelect: this.onValueChange,
		      onFocus: this.onValueFocus,
		      results: this.state.results,
		      focusedValue: this.state.focusedValue,
		      show: this.state.showResults,
		      renderer: this.props.resultRenderer,
		      label: this.props.label,
		      resultIdentifier: this.props.resultIdentifier }));
		  },

		  componentWillReceiveProps: function (nextProps) {
		    var searchTerm = nextProps.searchTerm ? nextProps.searchTerm : nextProps.value ? nextProps.value.title : "";
		    this.setState({ searchTerm: searchTerm });
		  },

		  componentWillMount: function () {
		    this.blurTimer = null;
		  },

		  /**
		    * Show results for a search term value.
		    *
		    * This method doesn't update search term value itself.
		    *
		    * @param {Search} searchTerm
		    */
		  showResults: function (searchTerm) {
		    this.setState({ showResultsInProgress: true });
		    this.props.search(this.props.options, searchTerm.trim(), this.onSearchComplete);
		  },

		  showAllResults: function () {
		    if (!this.state.showResultsInProgress && !this.state.showResults) {
		      this.showResults("");
		    }
		  },

		  onValueChange: function (value) {
		    var state = {
		      value: value,
		      showResults: false
		    };

		    if (value) {
		      state.searchTerm = value.title;
		    }

		    this.setState(state);

		    if (this.props.onChange) {
		      this.props.onChange(value);
		    }
		  },

		  onSearchComplete: function (err, results) {
		    if (err) {
		      if (this.props.onError) {
		        this.props.onError(err);
		      } else {
		        throw err;
		      }
		    }

		    this.setState({
		      showResultsInProgress: false,
		      showResults: true,
		      results: results
		    });
		  },

		  onValueFocus: function (value) {
		    this.setState({ focusedValue: value });
		  },

		  onQueryChange: function (e) {
		    var searchTerm = e.target.value;
		    this.setState({
		      searchTerm: searchTerm,
		      focusedValue: null
		    });
		    this.showResults(searchTerm);
		  },

		  onFocus: function () {
		    if (this.blurTimer) {
		      clearTimeout(this.blurTimer);
		      this.blurTimer = null;
		    }
		    this.refs.search.getDOMNode().focus();
		  },

		  onBlur: function () {
		    // wrap in setTimeout so we can catch a click on results
		    this.blurTimer = setTimeout((function () {
		      if (this.isMounted()) {
		        this.setState({ showResults: false });
		      }
		    }).bind(this), 100);
		  },

		  onQueryKeyDown: function (e) {
		    if (e.key === "Enter") {
		      e.preventDefault();
		      if (this.state.focusedValue) {
		        this.onValueChange(this.state.focusedValue);
		      }
		    } else if (e.key === "ArrowUp" && this.state.showResults) {
		      e.preventDefault();
		      var prevIdx = Math.max(this.focusedValueIndex() - 1, 0);
		      this.setState({
		        focusedValue: this.state.results[prevIdx]
		      });
		    } else if (e.key === "ArrowDown") {
		      e.preventDefault();
		      if (this.state.showResults) {
		        var nextIdx = Math.min(this.focusedValueIndex() + (this.state.showResults ? 1 : 0), this.state.results.length - 1);
		        this.setState({
		          showResults: true,
		          focusedValue: this.state.results[nextIdx]
		        });
		      } else {
		        this.showAllResults();
		      }
		    }
		  },

		  focusedValueIndex: function () {
		    if (!this.state.focusedValue) {
		      return -1;
		    }
		    for (var i = 0,
		        len = this.state.results.length; i < len; i++) {
		      if (this.getResultIdentifier(this.state.results[i]) === this.getResultIdentifier(this.state.focusedValue)) {
		        return i;
		      }
		    }
		    return -1;
		  }
		});

		var Results = React.createClass({ displayName: "Results",

		  getResultIdentifier: function (result) {
		    if (this.props.resultIdentifier === undefined) {
		      if (!result.id) {
		        throw "id property not found on result. You must specify a resultIdentifier and pass as props to autocomplete component";
		      }
		      return result.id;
		    } else {
		      return result[this.props.resultIdentifier];
		    }
		  },

		  render: function () {
		    var style = {
		      display: this.props.show ? "block" : "none",
		      position: "absolute",
		      listStyleType: "none"
		    };
		    var $__0 = this.props,
		        className = $__0.className,
		        props = (function (source, exclusion) {
		      var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {
		        throw new TypeError();
		      }for (var key in source) {
		        if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {
		          rest[key] = source[key];
		        }
		      }return rest;
		    })($__0, { className: 1 });

		    return React.createElement("ul", React.__spread({}, props, { style: style, className: className + " react-autocomplete-Results" }), this.props.results.map(this.renderResult));
		  },

		  renderResult: function (result) {
		    var focused = this.props.focusedValue && this.getResultIdentifier(this.props.focusedValue) === this.getResultIdentifier(result);
		    var renderer = this.props.renderer || Result;
		    return renderer({
		      ref: focused ? "focused" : undefined,
		      key: this.getResultIdentifier(result),
		      result: result,
		      focused: focused,
		      onMouseEnter: this.onMouseEnterResult,
		      onClick: this.props.onSelect,
		      label: this.props.label
		    });
		  },

		  componentDidUpdate: function () {
		    this.scrollToFocused();
		  },

		  componentDidMount: function () {
		    this.scrollToFocused();
		  },

		  componentWillMount: function () {
		    this.ignoreFocus = false;
		  },

		  scrollToFocused: function () {
		    var focused = this.refs && this.refs.focused;
		    if (focused) {
		      var containerNode = this.getDOMNode();
		      var scroll = containerNode.scrollTop;
		      var height = containerNode.offsetHeight;

		      var node = focused.getDOMNode();
		      var top = node.offsetTop;
		      var bottom = top + node.offsetHeight;

		      // we update ignoreFocus to true if we change the scroll position so
		      // the mouseover event triggered because of that won't have an
		      // effect
		      if (top < scroll) {
		        this.ignoreFocus = true;
		        containerNode.scrollTop = top;
		      } else if (bottom - scroll > height) {
		        this.ignoreFocus = true;
		        containerNode.scrollTop = bottom - height;
		      }
		    }
		  },

		  onMouseEnterResult: function (e, result) {
		    // check if we need to prevent the next onFocus event because it was
		    // probably caused by a mouseover due to scroll position change
		    if (this.ignoreFocus) {
		      this.ignoreFocus = false;
		    } else {
		      // we need to make sure focused node is visible
		      // for some reason mouse events fire on visible nodes due to
		      // box-shadow
		      var containerNode = this.getDOMNode();
		      var scroll = containerNode.scrollTop;
		      var height = containerNode.offsetHeight;

		      var node = e.target;
		      var top = node.offsetTop;
		      var bottom = top + node.offsetHeight;

		      if (bottom > scroll && top < scroll + height) {
		        this.props.onFocus(result);
		      }
		    }
		  }
		});

		var Result = React.createClass({ displayName: "Result",

		  getDefaultProps: function () {
		    return {
		      label: function (result) {
		        return result.title;
		      }
		    };
		  },

		  getLabel: function (result) {
		    if (typeof this.props.label === "function") {
		      return this.props.label(result);
		    } else if (typeof this.props.label === "string") {
		      return result[this.props.label];
		    }
		  },

		  render: function () {
		    var className = cx({
		      "react-autocomplete-Result": true,
		      "react-autocomplete-Result--active": this.props.focused
		    });

		    return React.createElement("li", {
		      style: { listStyleType: "none" },
		      className: className,
		      onClick: this.onClick,
		      onMouseEnter: this.onMouseEnter }, React.createElement("a", null, this.getLabel(this.props.result)));
		  },

		  onClick: function () {
		    this.props.onClick(this.props.result);
		  },

		  onMouseEnter: function (e) {
		    if (this.props.onMouseEnter) {
		      this.props.onMouseEnter(e, this.props.result);
		    }
		  },

		  shouldComponentUpdate: function (nextProps) {
		    return nextProps.result.id !== this.props.result.id || nextProps.focused !== this.props.focused;
		  }
		});

		/**
		* Search options using specified search term treating options as an array
		* of candidates.
		*
		* @param {Array.<Object>} options
		* @param {String} searchTerm
		* @param {Callback} cb
		*/
		function searchArray(options, searchTerm, cb) {
		  if (!options) {
		    return cb(null, []);
		  }

		  searchTerm = new RegExp(searchTerm, "i");

		  var results = [];

		  for (var i = 0,
		      len = options.length; i < len; i++) {
		    if (searchTerm.exec(options[i].title)) {
		      results.push(options[i]);
		    }
		  }

		  cb(null, results);
		}

		module.exports = Autocomplete;

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

	/***/ }
	/******/ ])
	});


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	function shallowEqual(a, b) {
	  if (a === b) {
	    return true;
	  }

	  var k;

	  for (k in a) {
	    if (a.hasOwnProperty(k) &&
	        (!b.hasOwnProperty(k) || a[k] !== b[k])) {
	      return false;
	    }
	  }

	  for (k in b) {
	    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React       = __webpack_require__(1);
	var cx          = React.addons.classSet;
	var Draggable   = __webpack_require__(112);
	var PropTypes   = React.PropTypes;

	var ResizeHandle = React.createClass({displayName: 'ResizeHandle',

	  style: {
	    position: 'absolute',
	    top: 0,
	    right: 0,
	    width: 6,
	    height: '100%'
	  },

	  render:function() {
	    return (
	      React.createElement(Draggable, React.__spread({},  this.props, 
	        {className: "react-grid-HeaderCell__resizeHandle", 
	        style: this.style})
	        )
	    );
	  }
	});

	var HeaderCell = React.createClass({displayName: 'HeaderCell',

	  propTypes: {
	    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
	    column: PropTypes.object.isRequired,
	    onResize: PropTypes.func
	  },

	  render:function() {
	    var className = cx({
	      'react-grid-HeaderCell': true,
	      'react-grid-HeaderCell--resizing': this.state.resizing,
	      'react-grid-HeaderCell--locked': this.props.column.locked
	    });
	    className = cx(className, this.props.className);
	    var cell = this.getCell();
	    return (
	      React.createElement("div", {className: className, style: this.getStyle()}, 
	        cell, 
	        this.props.column.resizeable ?
	          React.createElement(ResizeHandle, {
	            onDrag: this.onDrag, 
	            onDragStart: this.onDragStart, 
	            onDragEnd: this.onDragEnd}
	            ) :
	          null
	      )
	    );
	  },

	  getCell:function() {
	    if (React.isValidElement(this.props.renderer)) {
	      return React.addons.cloneWithProps(this.props.renderer, {column : this.props.column});
	    } else {
	      return this.props.renderer({column: this.props.column});
	    }
	  },

	  getDefaultProps:function() {
	    return {
	      renderer: simpleCellRenderer
	    };
	  },

	  getInitialState:function() {
	    return {resizing: false};
	  },

	  setScrollLeft:function(scrollLeft) {
	    var node = this.getDOMNode();
	    node.style.webkitTransform = ("translate3d(" + scrollLeft + "px, 0px, 0px)");
	    node.style.transform = ("translate3d(" + scrollLeft + "px, 0px, 0px)");
	  },

	  getStyle:function() {
	    return {
	      width: this.props.column.width,
	      left: this.props.column.left,
	      display: 'inline-block',
	      position: 'absolute',
	      overflow: 'hidden',
	      height: this.props.height,
	      margin: 0,
	      textOverflow: 'ellipsis',
	      whiteSpace: 'nowrap'
	    };
	  },

	  onDragStart:function() {
	    this.setState({resizing: true});
	  },

	  onDrag:function(e) {
	    var width = this.getWidthFromMouseEvent(e);
	    if (width > 0 && this.props.onResize) {
	      this.props.onResize(this.props.column, width);
	    }
	  },

	  onDragEnd:function(e) {
	    var width = this.getWidthFromMouseEvent(e);
	    this.props.onResizeEnd(this.props.column, width);
	    this.setState({resizing: false});
	  },

	  getWidthFromMouseEvent:function(e) {
	    var right = e.pageX;
	    var left = this.getDOMNode().getBoundingClientRect().left;
	    return right - left;
	  }
	});

	function simpleCellRenderer(props) {
	  return React.createElement("div", {className: "rex-widget-HeaderCell__value"}, props.column.name);
	}

	module.exports = HeaderCell;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var size;

	function getScrollbarSize() {
	  if (size === undefined) {

	    var outer = document.createElement('div');
	    outer.style.width = '50px';
	    outer.style.height = '50px';
	    outer.style.overflowY = 'scroll';
	    outer.style.position = 'absolute';
	    outer.style.top = '-200px';
	    outer.style.left = '-200px';

	    var inner = document.createElement('div');
	    inner.style.height = '100px';
	    inner.style.width = '100%';

	    outer.appendChild(inner);
	    document.body.appendChild(outer);

	    var outerWidth = outer.offsetWidth;
	    var innerWidth = inner.offsetWidth;

	    document.body.removeChild(outer);

	    size = outerWidth - innerWidth;
	  }

	  return size;
	}

	module.exports = getScrollbarSize;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var ScrollShim = {

	  appendScrollShim:function() {
	    if (!this._scrollShim) {
	      var size = this._scrollShimSize();
	      var shim = document.createElement('div');
	      shim.classList.add('react-grid-ScrollShim');
	      shim.style.position = 'absolute';
	      shim.style.top = 0;
	      shim.style.left = 0;
	      shim.style.width = (size.width + "px");
	      shim.style.height = (size.height + "px");
	      this.getDOMNode().appendChild(shim);
	      this._scrollShim = shim;
	    }
	    this._scheduleRemoveScrollShim();
	  },

	  _scrollShimSize:function() {
	    return {
	      width: this.props.width,
	      height: this.props.length * this.props.rowHeight
	    };
	  },

	  _scheduleRemoveScrollShim:function() {
	    if (this._scheduleRemoveScrollShimTimer) {
	      clearTimeout(this._scheduleRemoveScrollShimTimer);
	    }
	    this._scheduleRemoveScrollShimTimer = setTimeout(
	      this._removeScrollShim, 200);
	  },

	  _removeScrollShim:function() {
	    if (this._scrollShim) {
	      this._scrollShim.parentNode.removeChild(this._scrollShim);
	      this._scrollShim = undefined;
	    }
	  }
	};

	module.exports = ScrollShim;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule copyProperties
	 */
	'use strict';

	/**
	 * Copy properties from one or more objects (up to 5) into the first object.
	 * This is a shallow copy. It mutates the first object and also returns it.
	 *
	 * NOTE: `arguments` has a very significant performance penalty, which is why
	 * we don't support unlimited arguments.
	 */
	function copyProperties(obj, a, b, c, d, e, f) {
	  obj = obj || {};

	  if (process.env.NODE_ENV) {
	    if (f) {
	      throw new Error('Too many arguments passed to copyProperties');
	    }
	  }

	  var args = [a, b, c, d, e];
	  var ii = 0, v;
	  while (args[ii]) {
	    v = args[ii++];
	    for (var k in v) {
	      obj[k] = v[k];
	    }

	    // IE ignores toString in object iteration.. See:
	    // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
	    if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
	        (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
	      obj.toString = v.toString;
	    }
	  }

	  return obj;
	}

	module.exports = copyProperties;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React         = __webpack_require__(1);
	var PropTypes     = React.PropTypes;
	var emptyFunction = __webpack_require__(102);

	var Draggable = React.createClass({displayName: 'Draggable',

	  propTypes: {
	    onDragStart: PropTypes.func,
	    onDragEnd: PropTypes.func,
	    onDrag: PropTypes.func,
	    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor])
	  },

	  render:function() {
	    var Component = this.props.component;
	    return (
	      React.createElement(Component, React.__spread({},  this.props, {onMouseDown: this.onMouseDown}))
	    );
	  },

	  getDefaultProps:function() {
	    return {
	      component: React.DOM.div,
	      onDragStart: emptyFunction.thatReturnsTrue,
	      onDragEnd: emptyFunction,
	      onDrag: emptyFunction
	    };
	  },

	  getInitialState:function() {
	    return {
	      drag: null
	    };
	  },

	  onMouseDown:function(e) {
	    var drag = this.props.onDragStart(e);

	    if (drag === null && e.button !== 0) {
	      return;
	    }

	    window.addEventListener('mouseup', this.onMouseUp);
	    window.addEventListener('mousemove', this.onMouseMove);

	    this.setState({drag:drag});
	  },

	  onMouseMove:function(e) {
	    if (this.state.drag === null) {
	      return;
	    }

	    if (e.stopPropagation) {
	      e.stopPropagation();
	    }

	    if (e.preventDefault) {
	      e.preventDefault();
	    }

	    this.props.onDrag(e);
	  },

	  onMouseUp:function(e) {
	    this.cleanUp();
	    this.props.onDragEnd(e, this.state.drag);
	    this.setState({drag: null});
	  },

	  componentWillUnmount:function() {
	    this.cleanUp();
	  },

	  cleanUp:function() {
	    window.removeEventListener('mouseup', this.onMouseUp);
	    window.removeEventListener('mousemove', this.onMouseMove);
	  }
	});

	module.exports = Draggable;


/***/ }
/******/ ])