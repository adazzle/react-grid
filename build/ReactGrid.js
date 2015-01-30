(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react/addons"));
	else if(typeof define === 'function' && define.amd)
		define(["react/addons"], factory);
	else if(typeof exports === 'object')
		exports["Grid"] = factory(require("react/addons"));
	else
		root["ReactGrid"] = root["ReactGrid"] || {}, root["ReactGrid"]["Grid"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__) {
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
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var Grid = __webpack_require__(4);
	var Row  = __webpack_require__(5);
	var Cell = __webpack_require__(6);

	module.exports = Grid;
	module.exports.Row = Row;
	module.exports.Cell = Cell;


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';
	var React                   = __webpack_require__(9);
	var cx                      = React.addons.classSet;
	var isFunction = __webpack_require__(27);

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
	      this.props.onCommit({updated : rowDataChanged, key : args.key});
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
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React                 = __webpack_require__(9);
	var PropTypes             = React.PropTypes;
	var BaseGrid              = __webpack_require__(11);
	var ExcelCell             = __webpack_require__(12);
	var ExcelRow              = __webpack_require__(13);
	var merge                 = __webpack_require__(14);
	var SelectableGridMixin   = __webpack_require__(15);
	var DraggableGridMixin    = __webpack_require__(16);
	var CopyPasteGridMixin    = __webpack_require__(17);
	var EditableGridMixin     = __webpack_require__(18);
	var SortableGridMixin     = __webpack_require__(19);
	var FilterableGridMixin   = __webpack_require__(20);
	var CheckboxEditor        = __webpack_require__(21);
	var MixinHelper           = __webpack_require__(22);

	var cloneWithProps = React.addons.cloneWithProps;

	var ExcelGrid = React.createClass({displayName: 'ExcelGrid',

	  mixins : [SelectableGridMixin, EditableGridMixin, DraggableGridMixin, CopyPasteGridMixin, SortableGridMixin, FilterableGridMixin],

	  getInitialState:function(){
	    return {selectedRows : [], expandedRows : []};
	  },

	  overrides : {
	    onCellCommit:function(commit                ){
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
	      this.props.onRowUpdated(committed);
	    },
	    getColumns : function(){
	      var cols = this.getDecoratedColumns(this.props.columns)
	      if(this.props.enableRowSelect){
	          cols.unshift({
	            key: 'select-row',
	            name: '',
	            formatter : React.createElement(CheckboxEditor, null),
	            onRowSelect :this.handleRowSelect,
	            filterable : false,
	            headerRenderer : React.createElement("input", {type: "checkbox", onChange: this.handleCheckboxChange}),
	            width : 60
	          });
	        }
	        return cols;
	    }
	  },

	  getDefaultProps:function() {
	    return {
	      rowHeight: 35,
	      enableRowSelect : false,
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

	  addRow:function(){

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

	  onAfterAddRow:function(numberOfRows){
	    this.setState({selected : {idx : 1, rowIdx : numberOfRows - 2}});
	    //cheeky
	    this.refs.base.refs.viewport.refs.canvas.getDOMNode().scrollTop = numberOfRows * this.props.rowHeight;
	  },

	  componentWillReceiveProps:function(nextProps){
	    if(nextProps.rows.length  === this.props.rows.length + 1){
	      this.onAfterAddRow(nextProps.rows.length + 1);
	    }
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
	        onCommit: this.onCellCommit, 
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
	    var toolbar = this.renderToolbar();
	    return(
	      React.createElement("div", {className: "react-grid-Container"}, 
	        toolbar, 
	        React.createElement("div", {className: "react-grid-Main"}, 
	        (React.createElement(BaseGrid, React.__spread({
	          ref: "base"}, 
	          this.props, 
	          {length: this.props.rows.length, 
	          headerRows: this.getHeaderRows(), 
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
	    )
	  },

	  renderToolbar:function(){
	    var Toolbar = this.props.toolbar;
	    if(React.isValidElement(Toolbar)){
	      return( React.addons.cloneWithProps(Toolbar, {onToggleFilter : this.onToggleFilter, rows : this.props.rows}));
	    }

	  }


	})


	module.exports = ExcelGrid;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(9);
	var cx             = React.addons.classSet;
	var Cell           = __webpack_require__(6);
	var cloneWithProps = React.addons.cloneWithProps;
	var ColumnMetrics    = __webpack_require__(10);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(9);
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
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var $__0=   __webpack_require__(9),PropTypes=$__0.PropTypes,isValidElement=$__0.isValidElement;
	var shallowCloneObject            = __webpack_require__(29);
	var DOMMetrics                    = __webpack_require__(30);
	var merge                         = __webpack_require__(14);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React                = __webpack_require__(9);
	var PropTypes            = React.PropTypes;
	var Header               = __webpack_require__(31);
	var Viewport             = __webpack_require__(32);
	var ColumnMetrics        = __webpack_require__(10);
	var DOMMetrics           = __webpack_require__(30);


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

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                = __webpack_require__(9);
	var BaseCell             = __webpack_require__(6);
	var SelectableMixin      = __webpack_require__(33);
	var EditableMixin        = __webpack_require__(34);
	var CopyableMixin        = __webpack_require__(35);
	var DraggableMixin       = __webpack_require__(36);
	var MixinHelper          = __webpack_require__(22);
	var KeyboardHandlerMixin = __webpack_require__(37);
	var isFunction           = __webpack_require__(27);
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(9);
	var cx             = React.addons.classSet;
	var BaseRow       = __webpack_require__(5);
	var ColumnMetrics = __webpack_require__(10);
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var SelectableGridMixin = {

	  getDefaultProps:function() {
	    return {
	      enableCellSelect : false,
	    };
	  },

	  getColumns : function(){
	    return this.props.columns
	  },

	  getInitialState: function() {
	    if(this.props.enableCellSelect){
	      return {selected: {rowIdx: 0, idx: 0}};
	    }else{
	      return {selected: {rowIdx: -1, idx: -1}};
	    }
	  },

	  onSelect: function(selected) {
	    if(this.props.enableCellSelect){
	      var idx = selected.idx;
	      var rowIdx = selected.rowIdx;
	      if (
	        idx >= 0
	        && rowIdx >= 0
	        && idx < this.getColumns().length
	        && rowIdx < this.props.rows.length
	      ) {
	        if(this.props.onSelect){
	          this.props.onSelect({selected: selected});
	        }
	        this.setState({selected: selected});
	      }
	    }
	  }
	}

	module.exports = SelectableGridMixin;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React                    = __webpack_require__(9);
	var PropTypes                = React.PropTypes;
	var MixinHelper              = __webpack_require__(22);
	var SelectableGridMixin          = __webpack_require__(15);

	MixinHelper.addAlias('SelectableGridMixin');

	var DraggableGridMixin = {

	  mixinDependencies : ['SelectableGridMixin'],

	  propTypes : {
	    onCellsDragged : React.PropTypes.func
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
	      && rowIdx < this.props.rows.length
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(9);
	var PropTypes           = React.PropTypes;

	var CopyPasteGridMixin = {

	  propTypes : {
	    onCellCopyPaste : React.PropTypes.func
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(9);
	var PropTypes           = React.PropTypes;
	var merge               = __webpack_require__(14);

	var EditableGridMixin = {

	  propTypes : {
	    onRowUpdated : React.PropTypes.func
	  },

	  onCellCommit:function(commit){
	    var selected = this.state.selected;
	    selected.active = false;
	    if(commit.keyCode === 'Tab'){
	      selected.idx += 1;
	    }
	    this.setState({selected : selected});
	    this.props.onRowUpdate(commit);
	  },

	  onSetActive:function(activeCell) {
	    var selected = merge(this.state.selected, activeCell);
	    this.setState({selected: selected});
	  }

	};


	module.exports = EditableGridMixin;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(9);
	var PropTypes           = React.PropTypes;
	var SortableHeaderCell  = __webpack_require__(38);
	var shallowCloneObject  = __webpack_require__(29);

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(9);
	var PropTypes           = React.PropTypes;
	var FilterableHeaderCell = __webpack_require__(39);

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

	    onToggleFilter:function(){
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(9);
	var cx                      = React.addons.classSet;

	var CheckBoxEditor = React.createClass({displayName: 'CheckBoxEditor',


	  PropTypes : {
	    value : React.PropTypes.bool.isRequired
	  },

	  render:function(){
	    return (React.createElement("input", {className: "react-grid-CheckBox", type: "checkbox", checked: this.props.value, onChange: this.handleChange}));
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	
	"use strict";

	var keyMirror  = __webpack_require__(42);
	var isFunction = __webpack_require__(27)
	var React      = __webpack_require__(9);
	if (!Object.assign) {
	  Object.assign = __webpack_require__(40);
	}

	/**
	 * Policies that describe methods in Adazzle React Mixins
	 * Any methods that do not confirm to one of these policies will be treated as a custom method
	 * All custom methods will be wrapped to potentially allow override/extension as defined on a component
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods are React Lifecycle methods and should be mixed into any components
	   * according to their default behviour as specified in React srcrary
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
	      Object.assign(primary, MixinAliasCache[dependencies[d]]);
	    }
	    wrapEachMethodInObject(primary, results);

	    mixins.forEach(function(obj){
	      //clone the object so that original methods are not overwritten
	      var clone = {};
	      //check if mixin was created using Mixin Helper
	      //If it is then merge the properties object
	      if(obj instanceof Mixin){
	        Object.assign(clone, obj.base);
	      }else{
	        Object.assign(clone, obj);
	      }

	      wrapEachMethodInObject(clone, results);

	      Object.assign(primary, clone);
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
/* 23 */,
/* 24 */,
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(9);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(22);
	var EditorMixin             = __webpack_require__(2);
	var TextInputMixin          = __webpack_require__(3);
	var keyboardHandlerMixin    = __webpack_require__(37);

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
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	
	"use strict";

	var isFunction = function(functionToCheck){
	    var getType = {};
	    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	module.exports = isFunction;


/***/ },
/* 28 */,
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React               = __webpack_require__(9);
	var emptyFunction       = __webpack_require__(43);
	var shallowCloneObject  = __webpack_require__(29);
	var invariant           = __webpack_require__(44);

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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(9);
	var cx                  = React.addons.classSet;
	var shallowCloneObject  = __webpack_require__(29);
	var ColumnMetrics       = __webpack_require__(10);
	var HeaderRow           = __webpack_require__(45);
	var ColumnMetrics = __webpack_require__(10);

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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React             = __webpack_require__(9);
	var getWindowSize     = __webpack_require__(46);
	var DOMMetrics        = __webpack_require__(30);
	var Canvas            = __webpack_require__(47);

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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(9);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var KeyboardHandlerMixin = __webpack_require__(37);
	var MixinHelper    = __webpack_require__(22);

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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React            = __webpack_require__(9);
	var cx               = React.addons.classSet;
	var cloneWithProps   = React.addons.cloneWithProps;
	var SimpleTextEditor = __webpack_require__(25);
	var PropTypes        = React.PropTypes;
	var MixinHelper      = __webpack_require__(22);
	var SelectableMixin  = __webpack_require__(33);
	var KeyboardHandlerMixin = __webpack_require__(37);

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
	      this.props.onCommit({cellKey: cellKey, rowIdx: this.props.filterRowIdx || rowIdx, updated : commit.updated, keyCode : commit.key});
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(9);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var PropTypes      = React.PropTypes;
	var SimpleTextEditor = __webpack_require__(25);
	var MixinHelper      = __webpack_require__(22);
	var SelectableMixin  = __webpack_require__(33);
	var KeyboardHandlerMixin = __webpack_require__(37);

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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(9);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var PropTypes      = React.PropTypes;
	var MixinHelper      = __webpack_require__(22);
	var SelectableMixin  = __webpack_require__(33);
	var KeyboardHandlerMixin = __webpack_require__(37);

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
	    if(this.props.dragged){
	      return (nextProps.dragged && this.props.idx === nextProps.dragged.idx)
	      || (this.props.dragged && this.props.idx === this.props.dragged.idx);
	    }else{
	      return false;
	    }
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */

	'use strict';

	var React = __webpack_require__(9);
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React              = __webpack_require__(9);
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React              = __webpack_require__(9);
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 41 */,
/* 42 */
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

	var invariant = __webpack_require__(53);

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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ },
/* 43 */
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

	var copyProperties = __webpack_require__(48);

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
/* 44 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React             = __webpack_require__(9);
	var PropTypes         = React.PropTypes;
	var shallowEqual      = __webpack_require__(49);
	var HeaderCell        = __webpack_require__(50);
	var getScrollbarSize  = __webpack_require__(51);

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
/* 46 */
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React          = __webpack_require__(9);
	var cx             = React.addons.classSet;
	var PropTypes      = React.PropTypes;
	var cloneWithProps = React.addons.cloneWithProps;
	var shallowEqual   = __webpack_require__(49);
	var emptyFunction  = __webpack_require__(43);
	var ScrollShim     = __webpack_require__(52);
	var Row            = __webpack_require__(5);

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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ },
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React       = __webpack_require__(9);
	var cx          = React.addons.classSet;
	var Draggable   = __webpack_require__(55);
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
/* 51 */
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
/* 52 */
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
/* 53 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ },
/* 54 */
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React         = __webpack_require__(9);
	var PropTypes     = React.PropTypes;
	var emptyFunction = __webpack_require__(43);

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
});
