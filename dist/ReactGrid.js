(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react/addons"));
	else if(typeof define === 'function' && define.amd)
		define(["react/addons"], factory);
	else if(typeof exports === 'object')
		exports["ReactGrid"] = factory(require("react/addons"));
	else
		root["ReactGrid"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__) {
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

	/* @flow */
	'use strict';

	var Grid = __webpack_require__(1);
	var Row  = __webpack_require__(5);
	var Cell = __webpack_require__(6);

	module.exports = Grid;
	module.exports.Row = Row;
	module.exports.Cell = Cell;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM

	 */
	"use strict";

	var React                 = __webpack_require__(29);
	var PropTypes             = React.PropTypes;
	var BaseGrid              = __webpack_require__(16);
	var ExcelCell             = __webpack_require__(17);
	var ExcelRow              = __webpack_require__(18);
	var merge                 = __webpack_require__(19);
	var SelectableGridMixin   = __webpack_require__(20);
	var DraggableGridMixin    = __webpack_require__(21);
	var CopyPasteGridMixin    = __webpack_require__(22);
	var EditableGridMixin     = __webpack_require__(23);
	var SortableGridMixin     = __webpack_require__(24);
	var FilterableGridMixin   = __webpack_require__(25);
	var CheckboxEditor        = __webpack_require__(26);
	var MixinHelper           = __webpack_require__(27);

	var ExcelGrid = React.createClass({displayName: "ExcelGrid",

	  propTypes: {
	    rowHeight: React.PropTypes.number.isRequired,
	    minHeight: React.PropTypes.number.isRequired,
	    enableRowSelect: React.PropTypes.bool,
	    onRowUpdated:React.PropTypes.func,
	    columns:React.PropTypes.arrayOf(ExcelColumn).isRequired,
	    rows:React.PropTypes.arrayOf(ExcelRow).isRequired,
	    toolbar:React.PropTypes.element
	  },

	  mixins : [SelectableGridMixin, DraggableGridMixin, CopyPasteGridMixin, SortableGridMixin, FilterableGridMixin],

	  getInitialState:function()                                                                 {
	    return {selectedRows : [], expandedRows : []};
	  },

	  overrides : {
	    onCellCommit:function(commit                       ){
	      var committed = commit[0];
	      var selected = Object.assign({}, this.state.selected);
	      selected.active = false;
	      if (committed.keyCode === 'Tab') {
	        selected.idx += 1;
	      }
	      var expandedRows = this.state.expandedRows;
	      if(committed.updated && committed.updated.expandedHeight){
	        expandedRows = this.expandRow(committed.rowIdx, committed.updated.expandedHeight);
	      }
	      this.setState({selected : selected, expandedRows : expandedRows});
	      this.props.onRowUpdated(committed);
	    },
	    getColumns : function()            {
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

	  handleCheckboxChange : function(e                                     ){
	    if(e.currentTarget.checked === true){
	      var selectedRows = this.props.rows.map(function()  {return true;});
	      this.setState({selectedRows : selectedRows});
	    }else{
	      var selectedRows = this.props.rows.map(function()  {return false;});
	      this.setState({selectedRows : selectedRows});
	    }
	  },

	  handleRowSelect:function(row          ){
	    var selectedRows = this.state.selectedRows;
	    if(selectedRows[row] == null || selectedRows[row] == false){
	      selectedRows[row] = true;
	    }else{
	      selectedRows[row] = false;
	    }
	    this.setState({selectedRows : selectedRows});
	  },

	  expandRow:function(row          , newHeight        )                 {
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

	  handleShowMore:function(row          , newHeight        ) {
	    var expandedRows = this.expandRow(row, newHeight);
	    this.setState({expandedRows : expandedRows});
	  },

	  handleShowLess:function(row          ){
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

	  onAfterAddRow:function(numberOfRows        ){
	    this.setState({selected : {idx : 1, rowIdx : numberOfRows - 2}});
	    //cheeky
	    this.refs.base.refs.viewport.refs.canvas.getDOMNode().scrollTop = numberOfRows * this.props.rowHeight;
	  },

	  componentWillReceiveProps:function(nextProps     ){
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

	    var getRowRenderer = function(props                                                           )               {
	      return (React.createElement(ExcelRow, {idx: props.idx, row: props.row, columns: props.columns, cellRenderer: getCellRenderer}));
	    }
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
	          minHeight: this.props.minHeight, 
	          onKeyDown: this.onKeyDown, 
	          onClick: this.onClick})))
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
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';
	var React                   = __webpack_require__(10);
	var cx                      = React.addons.classSet;
	var isFunction = __webpack_require__(13);

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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React          = __webpack_require__(10);
	var cx             = React.addons.classSet;
	var Cell           = __webpack_require__(6);
	var cloneWithProps = React.addons.cloneWithProps;
	var ColumnMetrics    = __webpack_require__(11);

	var Row = React.createClass({displayName: "Row",

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
	    if(typeof this.props.cellRenderer == 'function') {
	      this.props.cellRenderer.call(this, props);
	    }
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
	  }

	});

	module.exports = Row;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 

	 */
	'use strict';

	var React          = __webpack_require__(10);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var SelectableMixin      = __webpack_require__(12);

	var Cell = React.createClass({displayName: "Cell",

	  mixins : [SelectableMixin],

	  shouldComponentUpdate:function(nextProps, nextState) {
	    return this.props.column.width !== nextProps.column.width
	    || this.props.value !== nextProps.value
	    || this.props.height !== nextProps.height
	    || this.props.rowIdx !== nextProps.rowIdx
	    || this.isCellSelectionChanging(nextProps);
	  },

	  getCellClass : function(){

	    var className = cx(
	      'react-grid-Cell',
	      this.props.className,
	      this.props.column.locked ? 'react-grid-Cell--locked' : null
	    );

	    var extraClasses = cx({
	      'selected' : this.isSelected(),
	      'editing' : this.isActive()
	    })
	    
	    return className + ' ' + extraClasses;
	  },

	  onCellClick:function(){
	    this.props.cellMetaData.onCellClick({rowIdx : this.props.rowIdx, idx : this.props.idx});
	  },

	  render:function() {
	    var style = this.getStyle();

	    var className = this.getCellClass();

	    var cellContent = this.renderCellContent({
	      value : this.props.value,
	      column : this.props.column,
	      rowIdx : this.props.rowIdx,
	      isExpanded : this.props.isExpanded
	    });

	    return (
	      React.createElement("div", React.__spread({},  this.props, {className: className, style: style, onClick: this.onCellClick}), 
	          cellContent, 
	          React.createElement("div", {className: "drag-handle", draggable: "true", onDragStart: this.props.handleDragStart}
	          )
	      )
	    );
	  },

	  renderCellContent:function(props) {
	    var formatter = this.getFormatter() || this.props.formatter;
	    var formatterTag = React.isValidElement(formatter) ? cloneWithProps(formatter, props) : this.props.formatter(props);
	    return (React.createElement("div", {
	      className: "react-grid-Cell__value"}, formatterTag, " ", this.props.cellControls))

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
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';
	var React                   = __webpack_require__(10);
	var cx                      = React.addons.classSet;
	var isFunction = __webpack_require__(12);

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
/* 6 */
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
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	/**
	 * @jsx React.DOM


	 */

	'use strict';

	var React = __webpack_require__(10);
	var Perf = React.addons.Perf;

	var hasPerfStarted = false;

	var KeyboardHandlerMixin = {

	  propTypes : {
	  },
	  
	  onKeyDown:function(e       ){
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
	  isKeyPrintable:function(keycode        ){
	    var valid =
	        (keycode > 47 && keycode < 58)   || // number keys
	        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
	        (keycode > 64 && keycode < 91)   || // letter keys
	        (keycode > 95 && keycode < 112)  || // numpad keys
	        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
	        (keycode > 218 && keycode < 223);   // [\]' (in order)

	    return valid;
	  },

	  isKeyIdentified:function(key        )         {
	    return key !== "Unidentified";
	  },

	  isCtrlKeyHeldDown:function(e       )         {
	    return e.ctrlKey === true && e.key !== "Control";
	  },

	  checkAndCall:function(methodName        , args     ){
	    if(typeof this[methodName] === 'function'){
	      this[methodName](args);
	    }
	  }
	}



	module.exports = KeyboardHandlerMixin;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var $__0=   __webpack_require__(10),PropTypes=$__0.PropTypes,isValidElement=$__0.isValidElement;
	var shallowCloneObject            = __webpack_require__(28);
	var DOMMetrics                    = __webpack_require__(29);
	var merge                         = __webpack_require__(19);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React          = __webpack_require__(10);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var SimpleTextEditor = __webpack_require__(16);

	var SelectableMixin = {

	  getDefaultProps : function(){
	    return {
	      tabIndex : -1,
	      ref : "cell"
	    }
	  },

	  isSelected: function() {
	    var selected = this.props.cellMetaData.selected;
	    return (
	      selected
	      && selected.rowIdx === this.props.rowIdx
	      && selected.idx === this.props.idx
	    );
	  },

	  isActive:function(){
	    var selected = this.props.cellMetaData.selected;
	    return this.isSelected() && selected.active === true;
	  },

	  componentDidMount: function() {
	    this.checkFocus();
	  },

	  componentDidUpdate: function() {
	    this.checkFocus();
	  },

	  isCellSelectionChanging:function(nextProps){
	    var selected     = this.props.cellMetaData.selected;
	    var nextSelected = nextProps.cellMetaData.selected;
	    if(selected && nextSelected){
	      return this.props.idx === nextSelected.idx || this.props.idx === selected.idx;
	    }else{
	      return true;
	    }
	  },

	  getEditor:function(){
	    var selected     = this.props.cellMetaData.selected;
	    var editorProps = {height : this.props.height, onPressEscape : this.onPressEscape,  onCommit : this.onCommit, initialKeyCode : selected.initialKeyCode, editorRowMetaData : this.getEditorRowMetaData()};
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
	    this.props.cellMetaData.onCommit({cellKey: cellKey, rowIdx: this.props.filterRowIdx || rowIdx, updated : commit.updated, keyCode : commit.key});
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
	  }
	}



	module.exports = SelectableMixin;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	"use strict";

	var isFunction = function(functionToCheck){
	    var getType = {};
	    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	module.exports = isFunction;


/***/ },
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(10);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(27);
	var EditorMixin             = __webpack_require__(3);
	var TextInputMixin          = __webpack_require__(4);
	var keyboardHandlerMixin    = __webpack_require__(9);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var React                = __webpack_require__(10);
	var PropTypes            = React.PropTypes;
	var Header               = __webpack_require__(32);
	var Viewport             = __webpack_require__(33);
	var ColumnMetrics        = __webpack_require__(11);
	var DOMMetrics           = __webpack_require__(31);


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

	var Grid = React.createClass({displayName: "Grid",
	  mixins: [
	    GridScrollMixin,
	    ColumnMetrics.Mixin,
	    DOMMetrics.MetricsComputatorMixin
	  ],

	  propTypes: {
	    rows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    columns: PropTypes.array.isRequired,
	    minHeight: PropTypes.number,
	    headerRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    rowHeight: PropTypes.number,
	    rowRenderer: PropTypes.func.isRequired,
	    expandedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    selectedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    length: PropTypes.number.isRequired,
	    onRows: PropTypes.func,
	    rowOffsetHeight: PropTypes.number.isRequired
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
	          rows: this.props.rows, 
	          selectedRows: this.props.selectedRows, 
	          expandedRows: this.props.expandedRows, 
	          length: this.props.length, 
	          columns: this.state.columns, 
	          totalWidth: this.DOMMetrics.gridWidth(), 
	          onScroll: this.onScroll, 
	          onRows: this.props.onRows, 
	          cellMetaData: this.props.cellMetaData, 
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React                = __webpack_require__(10);
	var BaseCell             = __webpack_require__(3);
	var SelectableMixin      = __webpack_require__(32);
	var EditableMixin        = __webpack_require__(33);
	var CopyableMixin        = __webpack_require__(34);
	var DraggableMixin       = __webpack_require__(35);
	var MixinHelper          = __webpack_require__(27);
	var KeyboardHandlerMixin = __webpack_require__(9);
	var isFunction           = __webpack_require__(12);
	var PropTypes            = React.PropTypes;
	var cx                   = React.addons.classSet;
	var cloneWithProps       = React.addons.cloneWithProps;
	var ExcelColumn          = __webpack_require__(24);


	var CellControls = React.createClass({displayName: "CellControls",

	  propTypes : {
	    column : React.PropTypes.shape(ExcelColumn).isRequired,
	    onClickEdit : React.PropTypes.func.isRequired,
	    onShowMore : React.PropTypes.func.isRequired,
	    onShowLess : React.PropTypes.func.isRequired,
	    height : React.PropTypes.number.isRequired,
	    value : React.PropTypes.any.isRequired,
	    rowIdx : React.PropTypes.number.isRequired
	  },

	  onClickEdit : function(e       ){
	    e.stopPropagation();
	    e.preventDefault();
	    this.props.onClickEdit();
	  },

	  onShowMore : function(e       ){
	    e.stopPropagation();
	    e.preventDefault();
	    var newHeight = this.props.column.getExpandedHeight(this.props.value);
	    this.props.onShowMore(this.props.rowIdx, newHeight);
	  },

	  onShowLess : function(e       ){
	    e.stopPropagation();
	    e.preventDefault();
	    this.props.onShowLess(this.props.rowIdx);
	  },

	  shouldComponentUpdate:function(nextProps     , nextState     ){
	    return this.props.height != nextProps.height;
	  },

	  renderShowMoreButton:function()                {
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

	  render : function()                {
	    return (React.createElement("div", {className: "pull-right btn-group"}, 
	              this.renderShowMoreButton(), 
	              React.createElement("button", {onClick: this.onClickEdit, type: "button", className: "btn btn-link btn-xs"}, "Edit")
	            ))
	  }

	})


	var ExcelCell = React.createClass({displayName: "ExcelCell",

	    mixins : [SelectableMixin],

	  overrides : {
	    getCellClass : function(){
	      return cx({
	        'selected' : this.isSelected()
	      });
	    },

	  isActiveDragCell : function(){
	    return (this.isSelected() || this.isDraggedOver()) && !this.isActive();
	  },

	  isExpanded : function()         {
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


	  shouldComponentUpdate:function(nextProps     , nextState     )          {
	    return this.props.column.width !== nextProps.column.width
	    || this.props.value !== nextProps.value
	    || this.props.height !== nextProps.height
	    || this.props.rowIdx !== nextProps.rowIdx
	    || this.isCellSelectionChanging(nextProps);
	  },


	  render: function()                {
	    return (
	      React.createElement(BaseCell, React.__spread({}, 
	        this.props, 
	        {className: this.getCellClass(), 
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React          = __webpack_require__(10);
	var cx             = React.addons.classSet;
	var BaseRow       = __webpack_require__(5);
	var ColumnMetrics = __webpack_require__(11);
	var ExcelColumn = __webpack_require__(24);

	                  
	          
	                               
	                                              
	                              
	   
	  

	var ExcelRow = React.createClass({displayName: "ExcelRow",
	  propTypes: {
	    row : React.PropTypes.shape(ExcelRow).isRequired,
	    isSelected : React.PropTypes.bool,
	    height : React.PropTypes.number,
	    columns : React.PropTypes.arrayOf(React.PropTypes.shape(ExcelColumn)).isRequired,
	    cellRenderer : React.PropTypes.func.isRequired,
	    idx : React.PropTypes.number.isRequired
	  },

	  getDefaultProps:function()      {
	    return {
	      isSelected: false,
	      height : 35
	    };
	  },
	  render:function()                {
	    var row = React.addons.update(this.props.row,  {$merge : {'select-row' : this.props.isSelected}});
	    return (
	      React.createElement(BaseRow, React.__spread({}, 
	         this.props, 
	        {row: row, 
	        iam: "excelRow", 
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

	  hasRowHeightChanged:function(props     )         {
	    if(props.expandedRows){
	      if(typeof props.expandedRows[props.idx] !== 'undefined'){
	        return this.props.height !== props.expandedRows[props.idx]
	      }else{
	        return false;
	      }
	    }else{
	      return false;
	    }
	  },

	  shouldComponentUpdate:function(nextProps     )          {
	    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
	      this.doesRowContainSelectedCell()          ||
	      this.doesRowContainSelectedCell(nextProps) ||
	      this.willRowBeDraggedOver(nextProps)       ||
	      this.hasRowBeenCopied()                    ||
	      nextProps.row !== this.props.row           ||
	      this.hasRowHeightChanged(nextProps);
	  },

	  doesRowContainSelectedCell:function(props                           )         {
	    var cell = props.cellRenderer;
	    if(cell.props && cell.props.selected && cell.props.selected.rowIdx === this.props.idx){
	      return true;
	    }else{
	      return false;
	    }
	  },

	  willRowBeDraggedOver:function(props                           )         {
	    if(props.cellRenderer.props){
	      var dragged = props.cellRenderer.props.dragged;
	      return  dragged != null && (dragged.rowIdx != null || dragged.complete === true);
	    }else{
	      return false;
	    }

	  },

	  hasRowBeenCopied:function(props                           )         {
	    if(this.props.cellRenderer.props){
	      var cell = this.props.cellRenderer;
	      return cell.props.copied && cell.props.copied.rowIdx === this.props.idx;
	    }else{
	      return false;
	    }

	  },

	  setScrollLeft:function(scrollLeft        ) {
	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      if (this.props.columns[i].locked) {
	        this.refs[i].setScrollLeft(scrollLeft);
	      }
	    }
	  }


	});

	module.exports = ExcelRow;


/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	"use strict";

	var SelectableGridMixin = {

	  propTypes : {
	    enableCellSelect : React.PropTypes.bool,
	    columns : React.PropTypes.arrayOf(React.PropTypes.shape(ExcelColumn)).isRequired,
	    rows : React.PropTypes.array.isRequired,
	    onSelect : React.PropTypes.func
	  },

	  getDefaultProps:function()                              {
	    return {
	      enableCellSelect : false,
	      tabIndex : -1,
	      ref : "cell"
	    };
	  },

	  getColumns : function()                     {
	    return this.props.columns
	  },

	  getInitialState: function()                            {
	    if(this.props.enableCellSelect){
	      return {selected: {rowIdx: 0, idx: 0}};
	    }else{
	      return {selected: {rowIdx: -1, idx: -1}};
	    }
	  },

	  onSelect: function(selected              ) {
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
	  },

	  isSelected: function() {
	    return (
	      this.props.selected
	      && this.props.selected.rowIdx === this.props.rowIdx
	      && this.props.selected.idx === this.props.idx
	    );
	  },

	  onCellClick: function(cell) {
	    this.onSelect({rowIdx: cell.rowIdx, idx: cell.idx});
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
	  },

	  moveSelectedCell:function(e, rowDelta, cellDelta){
	    e.stopPropagation();
	    e.preventDefault();
	    var rowIdx = this.state.selected.rowIdx + rowDelta;
	    var idx = this.state.selected.idx + cellDelta;
	    this.onSelect({idx: idx, rowIdx: rowIdx});
	  },

	  setActive:function(keyPressed){
	    var rowIdx = this.state.selected.rowIdx;
	    var idx = this.state.selected.idx;
	    if(this.props.columns[idx].key === 'select-row' && this.props.columns[idx].onRowSelect){
	      this.props.column.onRowSelect(rowIdx);
	    }
	    else if(this.canEdit(idx) && !this.isActive()){
	      var selected = Object.assign(this.state.selected, {idx: idx, rowIdx: rowIdx, active : true, initialKeyCode : keyPressed});
	      this.setState({selected: selected});
	    }
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

	  setInactive:function(){
	    var rowIdx = this.state.selected.rowIdx;
	    var idx =this.state.selected.idx;
	    if(this.canEdit(idx) && this.isActive()){
	      var selected = Object.assign(this.state.selected, {idx: idx, rowIdx: rowIdx, active : false});
	      this.setState({selected: selected});
	    }
	  },

	  canEdit:function(idx){
	    return (this.props.columns[idx].editor != null) || this.props.columns[idx].editable;
	  },

	  isActive:function(){
	    return this.state.selected.active === true;
	  }


	})





	module.exports = SelectableGridMixin;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var React                    = __webpack_require__(10);
	var PropTypes                = React.PropTypes;
	var MixinHelper              = __webpack_require__(27);
	var SelectableGridMixin          = __webpack_require__(21);

	MixinHelper.addAlias('SelectableGridMixin');

	var DraggableGridMixin = {

	  mixinDependencies : ['SelectableGridMixin'],

	  propTypes : {
	    onCellsDragged : React.PropTypes.func,
	    rows : React.PropTypes.array.isRequired
	  },
	  dragEnabled: function() {
	    return this.props.onCellsDragged !== null;
	  },
	  getInitialState: function() {
	    return {dragged : null };
	  },

	  handleDragStart:function(dragged){
	    if(!this.dragEnabled()) { return; }
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
	    if(!this.dragEnabled()) { return; }
	    var selected = this.state.selected;
	    var dragged = this.state.dragged;
	    dragged.overRowIdx = row;
	   this.setState({dragged : dragged});
	  },

	  handleDragEnd:function(){
	    if(!this.dragEnabled()) { return; }
	    var fromRow, toRow;
	    var selected = this.state.selected;
	    var dragged = this.state.dragged;
	    var cellKey = this.getColumns()[this.state.selected.idx].key;
	    fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    toRow   = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    if(this.props.onCellsDragged) { this.props.onCellsDragged({cellKey: cellKey , fromRow: fromRow, toRow : toRow, value : dragged.copiedText}); }
	    this.setState({dragged : {complete : true}});
	  },

	  handleTerminateDrag:function(){
	    if(!this.dragEnabled()) { return; }
	    this.setState({dragged: null});
	  }
	}


	module.exports = DraggableGridMixin;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var React               = __webpack_require__(10);
	var PropTypes           = React.PropTypes;

	var CopyPasteGridMixin = {
	  propTypes : {
	    onCellCopyPaste : React.PropTypes.func
	  },

	  getInitialState: function()      {
	    return {copied : null };
	  },
	  copyPasteEnabled: function() {
	    return this.props.onCellCopyPaste !== null;
	  },

	  handleCopy:function(args                 ){
	    if(!this.copyPasteEnabled()) { return; }
	    var textToCopy = args.value;
	    var selected = this.state.selected;
	    var copied = {idx : selected.idx, rowIdx : selected.rowIdx};
	    this.setState({textToCopy:textToCopy, copied : copied});
	  },

	  handlePaste:function(){
	    if(!this.copyPasteEnabled()) { return; }
	    var selected = this.state.selected;
	    var cellKey = this.getColumns()[selected.idx].key;
	    if(this.props.onCellCopyPaste) { this.props.onCellCopyPaste({cellKey: cellKey , rowIdx: selected.rowIdx, value : this.state.textToCopy, fromRow : this.state.copied.rowIdx, toRow : selected.rowIdx}); }
	    this.setState({copied : null});

	  }
	}

	module.exports = CopyPasteGridMixin;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React               = __webpack_require__(10);
	var PropTypes           = React.PropTypes;
	var merge               = __webpack_require__(19);

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var React               = __webpack_require__(10);
	var PropTypes           = React.PropTypes;
	var SortableHeaderCell  = __webpack_require__(36);
	var shallowCloneObject  = __webpack_require__(28);

	var DEFINE_SORT = {
	  ASC : 'ASC',
	  DESC : 'DESC'
	}
	Object.freeze(DEFINE_SORT);

	var SortableGridMixin = {
	  propTypes : {
	    columns : React.PropTypes.arrayOf(React.PropTypes.shape(ExcelColumn)).isRequired
	  },

	  getInitialState: function()      {
	    return {sortDirection: null, sortColumn: null};
	  },

	   getDecoratedColumns: function(columns                    )                     {
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

	    sortBy: function(column             , direction          ) {
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

	    sortRows: function(rows                 )                  {
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var React               = __webpack_require__(10);
	var PropTypes           = React.PropTypes;
	var FilterableHeaderCell = __webpack_require__(37);

	var FilterableGridMixin = {
	  propTypes : {
	    onFilter : React.PropTypes.func,
	    rows : React.PropTypes.array.isRequired,
	    rowHeight : React.PropTypes.number.isRequired
	  },

	  getInitialState : function()                                          {
	    return {canFilter : false, columnFilters : {}};
	  },

	  filterRows:function()                 {
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

	  hasFilters:function()         {
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

	  isRowDisplayed:function(row          )         {
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

	  handleAddFilter:function(filter                                          ){
	    var columnFilters = this.state.columnFilters;
	    columnFilters[filter.columnKey] = filter.filterTerm;
	    this.setState({columnFilters : columnFilters, selected : null});
	  },

	  getHeaderRows:function()                      {
	    var rows = [{ref:"row", height: this.props.rowHeight}];
	    if(this.state.canFilter === true){
	      rows.push({ref:"filterRow", headerCellRenderer : React.createElement(FilterableHeaderCell, {onChange: this.handleAddFilter}), height : 45});
	    }
	    return rows;
	  },

	  getRowOffsetHeight:function()        {
	    var offsetHeight = 0;
	    this.getHeaderRows().forEach(function(row)  {return offsetHeight += row.height;} );
	    return offsetHeight;
	  }

	}

	module.exports = FilterableGridMixin;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM
	 */
	'use strict';

	var React                   = __webpack_require__(10);
	var cx                      = React.addons.classSet;

	var CheckBoxEditor = React.createClass({displayName: "CheckBoxEditor",


	  PropTypes : {
	    value : React.PropTypes.bool.isRequired,
	    rowIdx : React.PropTypes.number.isRequired
	  },

	  render:function()               {
	    return (React.createElement("input", {className: "react-grid-CheckBox", type: "checkbox", checked: this.props.value, onChange: this.handleChange}));
	  },

	  handleChange:function(e       ){
	    this.props.column.onRowSelect(this.props.rowIdx)
	  },

	  shouldComponentUpdate:function(nextProps     , nextState     )         {
	    return this.props.value != nextProps.value;
	  }

	});

	module.exports = CheckBoxEditor;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	"use strict";

	var keyMirror  = __webpack_require__(42);
	var isFunction = __webpack_require__(12)
	var React      = __webpack_require__(10);
	if (!Object.assign) {
	  Object.assign = __webpack_require__(38);
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
	  mix : function(mixins            )            {

	    var results = [];
	    var primary = {};

	    var dependencies = mixinUtils.getUniqueDependencies(mixins);
	    for (var i=0, ii=dependencies.length;i < ii; i++){
	      Object.assign(primary, MixinAliasCache[dependencies[i]]);
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


	  createDependency : function(deps     )            {
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

	  addAlias : function(key                 , object     ){
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

	  getUniqueDependencies : function(mixins)                    {
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	
	"use strict";

	var isFunction = function(functionToCheck){
	    var getType = {};
	    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	module.exports = isFunction;


/***/ },
/* 25 */,
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React                   = __webpack_require__(10);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(23);
	var EditorMixin             = __webpack_require__(5);
	var TextInputMixin          = __webpack_require__(6);
	var keyboardHandlerMixin    = __webpack_require__(9);

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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 

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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 

	 */
	'use strict';

	var React               = __webpack_require__(10);
	var emptyFunction       = __webpack_require__(40);
	var shallowCloneObject  = __webpack_require__(28);
	var invariant           = __webpack_require__(41);

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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 

	 */
	"use strict";

	var React               = __webpack_require__(10);
	var cx                  = React.addons.classSet;
	var shallowCloneObject  = __webpack_require__(30);
	var ColumnMetrics       = __webpack_require__(11);
	var HeaderRow           = __webpack_require__(45);
	var ColumnMetrics = __webpack_require__(11);

	var Header = React.createClass({displayName: "Header",

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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React             = __webpack_require__(10);
	var getWindowSize     = __webpack_require__(44);
	var DOMMetrics        = __webpack_require__(29);
	var Canvas            = __webpack_require__(45);

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

	var Viewport = React.createClass({displayName: "Viewport",
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
	          rowRenderer: this.props.rowRenderer, 

	          visibleStart: this.state.visibleStart, 
	          visibleEnd: this.state.visibleEnd, 
	          displayStart: this.state.displayStart, 
	          displayEnd: this.state.displayEnd, 
	          cellMetaData: this.props.cellMetaData, 
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React          = __webpack_require__(10);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var KeyboardHandlerMixin = __webpack_require__(9);
	var MixinHelper    = __webpack_require__(27);

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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	'use strict';

	var React            = __webpack_require__(10);
	var cx               = React.addons.classSet;
	var cloneWithProps   = React.addons.cloneWithProps;
	var SimpleTextEditor = __webpack_require__(15);
	var PropTypes        = React.PropTypes;
	var MixinHelper      = __webpack_require__(27);
	var SelectableMixin  = __webpack_require__(32);
	var KeyboardHandlerMixin = __webpack_require__(9);
	var ExcelColumn = __webpack_require__(24);
	var ExcelRow = __webpack_require__(14);

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


	});



	module.exports = EditableMixin;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React                = __webpack_require__(10);
	var cx                   = React.addons.classSet;
	var cloneWithProps       = React.addons.cloneWithProps;
	var PropTypes            = React.PropTypes;
	var SimpleTextEditor     = __webpack_require__(15);
	var MixinHelper          = __webpack_require__(27);
	var SelectableMixin      = __webpack_require__(32);
	var KeyboardHandlerMixin = __webpack_require__(9);

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
	    copied: React.PropTypes.shape({
	        rowIdx: React.PropTypes.number.isRequired,
	        idx: React.PropTypes.number.isRequired
	    }),
	    rowIdx: React.PropTypes.number.isRequired,
	    idx: React.PropTypes.number.isRequired,
	    value: React.PropTypes.any.isRequired,
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React          = __webpack_require__(10);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var PropTypes      = React.PropTypes;
	var MixinHelper      = __webpack_require__(27);
	var SelectableMixin  = __webpack_require__(32);
	var KeyboardHandlerMixin = __webpack_require__(9);

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
	    handleTerminateDrag : React.PropTypes.func.isRequired,
	    onDragEnter : React.PropTypes.func,
	    onDragEnd : React.PropTypes.func,
	    rowIdx: React.PropTypes.number.isRequired,
	    idx: React.PropTypes.number.isRequired,
	    value: React.PropTypes.any.isRequired,
	    dragged: React.PropTypes.shape({
	        overRowIdx: React.PropTypes.number.isRequired,
	        idx: React.PropTypes.number.isRequired,
	        complete: React.PropTypes.bool
	    }),
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React              = __webpack_require__(10);
	var cx             = React.addons.classSet;
	var ExcelColumn = __webpack_require__(24);

	var SortableHeaderCell = React.createClass({displayName: "SortableHeaderCell",
	  propTypes: {
	    column: React.PropTypes.shape(ExcelColumn).isRequired
	  },
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

	  render: function()                {

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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React              = __webpack_require__(10);
	var cx             = React.addons.classSet;
	var ExcelColumn = __webpack_require__(24);

	var FilterableHeaderCell = React.createClass({displayName: "FilterableHeaderCell",

	  propTypes: {
	    onChange: React.PropTypes.func.isRequired,
	    column: React.PropTypes.shape(ExcelColumn)
	  },

	  getInitialState:function()                      {
	    return {filterTerm : ''}
	  },

	  handleChange:function(e       ){
	    e.preventDefault();
	    e.stopPropagation();
	    this.setState({filterTerm : e.currentTarget.value});
	    this.props.onChange({filterTerm : e.currentTarget.value, columnKey : this.props.column.key});
	  },

	  componentDidUpdate:function()         {
	    this.getDOMNode().focus();
	  },

	  render: function()                {
	    return (
	      React.createElement("div", null, 
	        React.createElement("div", {className: "form-group"}, 
	          React.createElement(this.renderInput, null)
	        )
	      )
	    );
	  },

	  renderInput : function()                {
	    if(this.props.column.filterable === false){
	      return React.createElement("span", null);
	    }else{
	      return (React.createElement("input", {type: "text", className: "form-control input-sm", placeholder: "Search", value: this.state.filterTerm, onChange: this.handleChange}))
	    }

	  }
	});

	module.exports = FilterableHeaderCell;


/***/ },
/* 38 */
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
/* 39 */,
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React             = __webpack_require__(10);
	var PropTypes         = React.PropTypes;
	var shallowEqual      = __webpack_require__(45);
	var HeaderCell        = __webpack_require__(46);
	var getScrollbarSize  = __webpack_require__(47);

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
	      React.createElement("div", React.__spread({},  this.props, {className: "react-grid-HeaderRow"}), 
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
/* 41 */
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

	var copyProperties = __webpack_require__(46);

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
/* 41 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
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

	var invariant = __webpack_require__(51);

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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 43 */,
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 


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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var React          = __webpack_require__(10);
	var cx             = React.addons.classSet;
	var PropTypes      = React.PropTypes;
	var cloneWithProps = React.addons.cloneWithProps;
	var shallowEqual   = __webpack_require__(47);
	var emptyFunction  = __webpack_require__(40);
	var ScrollShim     = __webpack_require__(48);
	var Row            = __webpack_require__(2);

	var Canvas = React.createClass({displayName: "Canvas",
	  mixins: [ScrollShim],

	  propTypes: {
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
	          isSelected : this.isRowSelected(displayStart + idx),
	          expandedRows : this.props.expandedRows,
	          cellMetaData : this.props.cellMetaData
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
	    if(typeof this.props.rowRenderer === 'function') {
	      return this.props.rowRenderer.call(this,props);
	    }
	    else if (React.isValidElement(this.props.rowRenderer)) {
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
/* 46 */
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
	"use strict";

	var React             = __webpack_require__(10);
	var PropTypes         = React.PropTypes;
	var shallowEqual      = __webpack_require__(47);
	var HeaderCell        = __webpack_require__(49);
	var getScrollbarSize  = __webpack_require__(50);

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
	      React.createElement("div", React.__spread({},  this.props, {className: "react-grid-HeaderRow"}), 
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 47 */
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
/* 48 */
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 * @copyright Prometheus Research, LLC 2014
	 */
	"use strict";

	var React       = __webpack_require__(10);
	var cx          = React.addons.classSet;
	var Draggable   = __webpack_require__(53);
	var PropTypes   = React.PropTypes;

	var ResizeHandle = React.createClass({displayName: "ResizeHandle",

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

	var HeaderCell = React.createClass({displayName: "HeaderCell",

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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DOMProperty
	 * @typechecks static-only
	 */

	/*jslint bitwise: true */

	"use strict";

	var invariant = __webpack_require__(49);

	function checkMask(value, bitmask) {
	  return (value & bitmask) === bitmask;
	}

	var DOMPropertyInjection = {
	  /**
	   * Mapping from normalized, camelcased property names to a configuration that
	   * specifies how the associated DOM property should be accessed or rendered.
	   */
	  MUST_USE_ATTRIBUTE: 0x1,
	  MUST_USE_PROPERTY: 0x2,
	  HAS_SIDE_EFFECTS: 0x4,
	  HAS_BOOLEAN_VALUE: 0x8,
	  HAS_NUMERIC_VALUE: 0x10,
	  HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
	  HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,

	  /**
	   * Inject some specialized knowledge about the DOM. This takes a config object
	   * with the following properties:
	   *
	   * isCustomAttribute: function that given an attribute name will return true
	   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
	   * attributes where it's impossible to enumerate all of the possible
	   * attribute names,
	   *
	   * Properties: object mapping DOM property name to one of the
	   * DOMPropertyInjection constants or null. If your attribute isn't in here,
	   * it won't get written to the DOM.
	   *
	   * DOMAttributeNames: object mapping React attribute name to the DOM
	   * attribute name. Attribute names not specified use the **lowercase**
	   * normalized name.
	   *
	   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
	   * Property names not specified use the normalized name.
	   *
	   * DOMMutationMethods: Properties that require special mutation methods. If
	   * `value` is undefined, the mutation method should unset the property.
	   *
	   * @param {object} domPropertyConfig the config as described above.
	   */
	  injectDOMPropertyConfig: function(domPropertyConfig) {
	    var Properties = domPropertyConfig.Properties || {};
	    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
	    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
	    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

	    if (domPropertyConfig.isCustomAttribute) {
	      DOMProperty._isCustomAttributeFunctions.push(
	        domPropertyConfig.isCustomAttribute
	      );
	    }

	    for (var propName in Properties) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        !DOMProperty.isStandardName.hasOwnProperty(propName),
	        'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' +
	        '\'%s\' which has already been injected. You may be accidentally ' +
	        'injecting the same DOM property config twice, or you may be ' +
	        'injecting two configs that have conflicting property names.',
	        propName
	      ) : invariant(!DOMProperty.isStandardName.hasOwnProperty(propName)));

	      DOMProperty.isStandardName[propName] = true;

	      var lowerCased = propName.toLowerCase();
	      DOMProperty.getPossibleStandardName[lowerCased] = propName;

	      if (DOMAttributeNames.hasOwnProperty(propName)) {
	        var attributeName = DOMAttributeNames[propName];
	        DOMProperty.getPossibleStandardName[attributeName] = propName;
	        DOMProperty.getAttributeName[propName] = attributeName;
	      } else {
	        DOMProperty.getAttributeName[propName] = lowerCased;
	      }

	      DOMProperty.getPropertyName[propName] =
	        DOMPropertyNames.hasOwnProperty(propName) ?
	          DOMPropertyNames[propName] :
	          propName;

	      if (DOMMutationMethods.hasOwnProperty(propName)) {
	        DOMProperty.getMutationMethod[propName] = DOMMutationMethods[propName];
	      } else {
	        DOMProperty.getMutationMethod[propName] = null;
	      }

	      var propConfig = Properties[propName];
	      DOMProperty.mustUseAttribute[propName] =
	        checkMask(propConfig, DOMPropertyInjection.MUST_USE_ATTRIBUTE);
	      DOMProperty.mustUseProperty[propName] =
	        checkMask(propConfig, DOMPropertyInjection.MUST_USE_PROPERTY);
	      DOMProperty.hasSideEffects[propName] =
	        checkMask(propConfig, DOMPropertyInjection.HAS_SIDE_EFFECTS);
	      DOMProperty.hasBooleanValue[propName] =
	        checkMask(propConfig, DOMPropertyInjection.HAS_BOOLEAN_VALUE);
	      DOMProperty.hasNumericValue[propName] =
	        checkMask(propConfig, DOMPropertyInjection.HAS_NUMERIC_VALUE);
	      DOMProperty.hasPositiveNumericValue[propName] =
	        checkMask(propConfig, DOMPropertyInjection.HAS_POSITIVE_NUMERIC_VALUE);
	      DOMProperty.hasOverloadedBooleanValue[propName] =
	        checkMask(propConfig, DOMPropertyInjection.HAS_OVERLOADED_BOOLEAN_VALUE);

	      ("production" !== process.env.NODE_ENV ? invariant(
	        !DOMProperty.mustUseAttribute[propName] ||
	          !DOMProperty.mustUseProperty[propName],
	        'DOMProperty: Cannot require using both attribute and property: %s',
	        propName
	      ) : invariant(!DOMProperty.mustUseAttribute[propName] ||
	        !DOMProperty.mustUseProperty[propName]));
	      ("production" !== process.env.NODE_ENV ? invariant(
	        DOMProperty.mustUseProperty[propName] ||
	          !DOMProperty.hasSideEffects[propName],
	        'DOMProperty: Properties that have side effects must use property: %s',
	        propName
	      ) : invariant(DOMProperty.mustUseProperty[propName] ||
	        !DOMProperty.hasSideEffects[propName]));
	      ("production" !== process.env.NODE_ENV ? invariant(
	        !!DOMProperty.hasBooleanValue[propName] +
	          !!DOMProperty.hasNumericValue[propName] +
	          !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1,
	        'DOMProperty: Value can be one of boolean, overloaded boolean, or ' +
	        'numeric value, but not a combination: %s',
	        propName
	      ) : invariant(!!DOMProperty.hasBooleanValue[propName] +
	        !!DOMProperty.hasNumericValue[propName] +
	        !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1));
	    }
	  }
	};
	var defaultValueCache = {};

	/**
	 * DOMProperty exports lookup objects that can be used like functions:
	 *
	 *   > DOMProperty.isValid['id']
	 *   true
	 *   > DOMProperty.isValid['foobar']
	 *   undefined
	 *
	 * Although this may be confusing, it performs better in general.
	 *
	 * @see http://jsperf.com/key-exists
	 * @see http://jsperf.com/key-missing
	 */
	var DOMProperty = {

	  ID_ATTRIBUTE_NAME: 'data-reactid',

	  /**
	   * Checks whether a property name is a standard property.
	   * @type {Object}
	   */
	  isStandardName: {},

	  /**
	   * Mapping from lowercase property names to the properly cased version, used
	   * to warn in the case of missing properties.
	   * @type {Object}
	   */
	  getPossibleStandardName: {},

	  /**
	   * Mapping from normalized names to attribute names that differ. Attribute
	   * names are used when rendering markup or with `*Attribute()`.
	   * @type {Object}
	   */
	  getAttributeName: {},

	  /**
	   * Mapping from normalized names to properties on DOM node instances.
	   * (This includes properties that mutate due to external factors.)
	   * @type {Object}
	   */
	  getPropertyName: {},

	  /**
	   * Mapping from normalized names to mutation methods. This will only exist if
	   * mutation cannot be set simply by the property or `setAttribute()`.
	   * @type {Object}
	   */
	  getMutationMethod: {},

	  /**
	   * Whether the property must be accessed and mutated as an object property.
	   * @type {Object}
	   */
	  mustUseAttribute: {},

	  /**
	   * Whether the property must be accessed and mutated using `*Attribute()`.
	   * (This includes anything that fails `<propName> in <element>`.)
	   * @type {Object}
	   */
	  mustUseProperty: {},

	  /**
	   * Whether or not setting a value causes side effects such as triggering
	   * resources to be loaded or text selection changes. We must ensure that
	   * the value is only set if it has changed.
	   * @type {Object}
	   */
	  hasSideEffects: {},

	  /**
	   * Whether the property should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasBooleanValue: {},

	  /**
	   * Whether the property must be numeric or parse as a
	   * numeric and should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasNumericValue: {},

	  /**
	   * Whether the property must be positive numeric or parse as a positive
	   * numeric and should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasPositiveNumericValue: {},

	  /**
	   * Whether the property can be used as a flag as well as with a value. Removed
	   * when strictly equal to false; present without a value when strictly equal
	   * to true; present with a value otherwise.
	   * @type {Object}
	   */
	  hasOverloadedBooleanValue: {},

	  /**
	   * All of the isCustomAttribute() functions that have been injected.
	   */
	  _isCustomAttributeFunctions: [],

	  /**
	   * Checks whether a property name is a custom attribute.
	   * @method
	   */
	  isCustomAttribute: function(attributeName) {
	    for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
	      var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
	      if (isCustomAttributeFn(attributeName)) {
	        return true;
	      }
	    }
	    return false;
	  },

	  /**
	   * Returns the default property value for a DOM property (i.e., not an
	   * attribute). Most default values are '' or false, but not all. Worse yet,
	   * some (in particular, `type`) vary depending on the type of element.
	   *
	   * TODO: Is it better to grab all the possible properties when creating an
	   * element to avoid having to create the same element twice?
	   */
	  getDefaultValueForProperty: function(nodeName, prop) {
	    var nodeDefaults = defaultValueCache[nodeName];
	    var testElement;
	    if (!nodeDefaults) {
	      defaultValueCache[nodeName] = nodeDefaults = {};
	    }
	    if (!(prop in nodeDefaults)) {
	      testElement = document.createElement(nodeName);
	      nodeDefaults[prop] = testElement[prop];
	    }
	    return nodeDefaults[prop];
	  },

	  injection: DOMPropertyInjection
	};

	module.exports = DOMProperty;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule escapeTextForBrowser
	 * @typechecks static-only
	 */

	"use strict";

	var ESCAPE_LOOKUP = {
	  "&": "&amp;",
	  ">": "&gt;",
	  "<": "&lt;",
	  "\"": "&quot;",
	  "'": "&#x27;"
	};

	var ESCAPE_REGEX = /[&><"']/g;

	function escaper(match) {
	  return ESCAPE_LOOKUP[match];
	}

	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */
	function escapeTextForBrowser(text) {
	  return ('' + text).replace(ESCAPE_REGEX, escaper);
	}

	module.exports = escapeTextForBrowser;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule memoizeStringOnly
	 * @typechecks static-only
	 */

	"use strict";

	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 *
	 * @param {function} callback
	 * @return {function}
	 */
	function memoizeStringOnly(callback) {
	  var cache = {};
	  return function(string) {
	    if (cache.hasOwnProperty(string)) {
	      return cache[string];
	    } else {
	      return cache[string] = callback.call(this, string);
	    }
	  };
	}

	module.exports = memoizeStringOnly;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */

	"use strict";

	var emptyFunction = __webpack_require__(133);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if ("production" !== process.env.NODE_ENV) {
	  warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      console.warn('Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];}));
	    }
	  };
	}

	module.exports = warning;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventConstants
	 */

	"use strict";

	var keyMirror = __webpack_require__(40);

	var PropagationPhases = keyMirror({bubbled: null, captured: null});

	/**
	 * Types of raw signals from the browser caught at the top level.
	 */
	var topLevelTypes = keyMirror({
	  topBlur: null,
	  topChange: null,
	  topClick: null,
	  topCompositionEnd: null,
	  topCompositionStart: null,
	  topCompositionUpdate: null,
	  topContextMenu: null,
	  topCopy: null,
	  topCut: null,
	  topDoubleClick: null,
	  topDrag: null,
	  topDragEnd: null,
	  topDragEnter: null,
	  topDragExit: null,
	  topDragLeave: null,
	  topDragOver: null,
	  topDragStart: null,
	  topDrop: null,
	  topError: null,
	  topFocus: null,
	  topInput: null,
	  topKeyDown: null,
	  topKeyPress: null,
	  topKeyUp: null,
	  topLoad: null,
	  topMouseDown: null,
	  topMouseMove: null,
	  topMouseOut: null,
	  topMouseOver: null,
	  topMouseUp: null,
	  topPaste: null,
	  topReset: null,
	  topScroll: null,
	  topSelectionChange: null,
	  topSubmit: null,
	  topTextInput: null,
	  topTouchCancel: null,
	  topTouchEnd: null,
	  topTouchMove: null,
	  topTouchStart: null,
	  topWheel: null
	});

	var EventConstants = {
	  topLevelTypes: topLevelTypes,
	  PropagationPhases: PropagationPhases
	};

	module.exports = EventConstants;


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
	 * @providesModule PooledClass
	 */

	"use strict";

	var invariant = __webpack_require__(49);

	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function(copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function(a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function(a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
	  }
	};

	var standardReleaser = function(instance) {
	  var Klass = this;
	  ("production" !== process.env.NODE_ENV ? invariant(
	    instance instanceof Klass,
	    'Trying to release an instance into a pool of a different type.'
	  ) : invariant(instance instanceof Klass));
	  if (instance.destructor) {
	    instance.destructor();
	  }
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;

	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances (optional).
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function(CopyConstructor, pooler) {
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};

	module.exports = PooledClass;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule traverseAllChildren
	 */

	"use strict";

	var ReactElement = __webpack_require__(59);
	var ReactInstanceHandles = __webpack_require__(64);

	var invariant = __webpack_require__(49);

	var SEPARATOR = ReactInstanceHandles.SEPARATOR;
	var SUBSEPARATOR = ':';

	/**
	 * TODO: Test that:
	 * 1. `mapChildren` transforms strings and numbers into `ReactTextComponent`.
	 * 2. it('should fail when supplied duplicate key', function() {
	 * 3. That a single child and an array with one item have the same key pattern.
	 * });
	 */

	var userProvidedKeyEscaperLookup = {
	  '=': '=0',
	  '.': '=1',
	  ':': '=2'
	};

	var userProvidedKeyEscapeRegex = /[=.:]/g;

	function userProvidedKeyEscaper(match) {
	  return userProvidedKeyEscaperLookup[match];
	}

	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  if (component && component.key != null) {
	    // Explicit key
	    return wrapUserProvidedKey(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}

	/**
	 * Escape a component key so that it is safe to use in a reactid.
	 *
	 * @param {*} key Component key to be escaped.
	 * @return {string} An escaped string.
	 */
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(
	    userProvidedKeyEscapeRegex,
	    userProvidedKeyEscaper
	  );
	}

	/**
	 * Wrap a `key` value explicitly provided by the user to distinguish it from
	 * implicitly-generated keys generated by a component's index in its parent.
	 *
	 * @param {string} key Value of a user-provided `key` attribute
	 * @return {string}
	 */
	function wrapUserProvidedKey(key) {
	  return '$' + escapeUserProvidedKey(key);
	}

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!number} indexSoFar Number of children encountered until this point.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	var traverseAllChildrenImpl =
	  function(children, nameSoFar, indexSoFar, callback, traverseContext) {
	    var nextName, nextIndex;
	    var subtreeCount = 0;  // Count of children found in the current subtree.
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; i++) {
	        var child = children[i];
	        nextName = (
	          nameSoFar +
	          (nameSoFar ? SUBSEPARATOR : SEPARATOR) +
	          getComponentKey(child, i)
	        );
	        nextIndex = indexSoFar + subtreeCount;
	        subtreeCount += traverseAllChildrenImpl(
	          child,
	          nextName,
	          nextIndex,
	          callback,
	          traverseContext
	        );
	      }
	    } else {
	      var type = typeof children;
	      var isOnlyChild = nameSoFar === '';
	      // If it's the only child, treat the name as if it was wrapped in an array
	      // so that it's consistent if the number of children grows
	      var storageName =
	        isOnlyChild ? SEPARATOR + getComponentKey(children, 0) : nameSoFar;
	      if (children == null || type === 'boolean') {
	        // All of the above are perceived as null.
	        callback(traverseContext, null, storageName, indexSoFar);
	        subtreeCount = 1;
	      } else if (type === 'string' || type === 'number' ||
	                 ReactElement.isValidElement(children)) {
	        callback(traverseContext, children, storageName, indexSoFar);
	        subtreeCount = 1;
	      } else if (type === 'object') {
	        ("production" !== process.env.NODE_ENV ? invariant(
	          !children || children.nodeType !== 1,
	          'traverseAllChildren(...): Encountered an invalid child; DOM ' +
	          'elements are not valid children of React components.'
	        ) : invariant(!children || children.nodeType !== 1));
	        for (var key in children) {
	          if (children.hasOwnProperty(key)) {
	            nextName = (
	              nameSoFar + (nameSoFar ? SUBSEPARATOR : SEPARATOR) +
	              wrapUserProvidedKey(key) + SUBSEPARATOR +
	              getComponentKey(children[key], 0)
	            );
	            nextIndex = indexSoFar + subtreeCount;
	            subtreeCount += traverseAllChildrenImpl(
	              children[key],
	              nextName,
	              nextIndex,
	              callback,
	              traverseContext
	            );
	          }
	        }
	      }
	    }
	    return subtreeCount;
	  };

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', 0, callback, traverseContext);
	}

	module.exports = traverseAllChildren;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactOwner
	 */

	"use strict";

	var emptyObject = __webpack_require__(137);
	var invariant = __webpack_require__(49);

	/**
	 * ReactOwners are capable of storing references to owned components.
	 *
	 * All components are capable of //being// referenced by owner components, but
	 * only ReactOwner components are capable of //referencing// owned components.
	 * The named reference is known as a "ref".
	 *
	 * Refs are available when mounted and updated during reconciliation.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return (
	 *         <div onClick={this.handleClick}>
	 *           <CustomComponent ref="custom" />
	 *         </div>
	 *       );
	 *     },
	 *     handleClick: function() {
	 *       this.refs.custom.handleClick();
	 *     },
	 *     componentDidMount: function() {
	 *       this.refs.custom.initialize();
	 *     }
	 *   });
	 *
	 * Refs should rarely be used. When refs are used, they should only be done to
	 * control data that is not handled by React's data flow.
	 *
	 * @class ReactOwner
	 */
	var ReactOwner = {

	  /**
	   * @param {?object} object
	   * @return {boolean} True if `object` is a valid owner.
	   * @final
	   */
	  isValidOwner: function(object) {
	    return !!(
	      object &&
	      typeof object.attachRef === 'function' &&
	      typeof object.detachRef === 'function'
	    );
	  },

	  /**
	   * Adds a component by ref to an owner component.
	   *
	   * @param {ReactComponent} component Component to reference.
	   * @param {string} ref Name by which to refer to the component.
	   * @param {ReactOwner} owner Component on which to record the ref.
	   * @final
	   * @internal
	   */
	  addComponentAsRefTo: function(component, ref, owner) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      ReactOwner.isValidOwner(owner),
	      'addComponentAsRefTo(...): Only a ReactOwner can have refs. This ' +
	      'usually means that you\'re trying to add a ref to a component that ' +
	      'doesn\'t have an owner (that is, was not created inside of another ' +
	      'component\'s `render` method). Try rendering this component inside of ' +
	      'a new top-level component which will hold the ref.'
	    ) : invariant(ReactOwner.isValidOwner(owner)));
	    owner.attachRef(ref, component);
	  },

	  /**
	   * Removes a component by ref from an owner component.
	   *
	   * @param {ReactComponent} component Component to dereference.
	   * @param {string} ref Name of the ref to remove.
	   * @param {ReactOwner} owner Component on which the ref is recorded.
	   * @final
	   * @internal
	   */
	  removeComponentAsRefFrom: function(component, ref, owner) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      ReactOwner.isValidOwner(owner),
	      'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. This ' +
	      'usually means that you\'re trying to remove a ref to a component that ' +
	      'doesn\'t have an owner (that is, was not created inside of another ' +
	      'component\'s `render` method). Try rendering this component inside of ' +
	      'a new top-level component which will hold the ref.'
	    ) : invariant(ReactOwner.isValidOwner(owner)));
	    // Check that `component` is still the current ref because we do not want to
	    // detach the ref if another component stole it.
	    if (owner.refs[ref] === component) {
	      owner.detachRef(ref);
	    }
	  },

	  /**
	   * A ReactComponent must mix this in to have refs.
	   *
	   * @lends {ReactOwner.prototype}
	   */
	  Mixin: {

	    construct: function() {
	      this.refs = emptyObject;
	    },

	    /**
	     * Lazily allocates the refs object and stores `component` as `ref`.
	     *
	     * @param {string} ref Reference name.
	     * @param {component} component Component to store as `ref`.
	     * @final
	     * @private
	     */
	    attachRef: function(ref, component) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        component.isOwnedBy(this),
	        'attachRef(%s, ...): Only a component\'s owner can store a ref to it.',
	        ref
	      ) : invariant(component.isOwnedBy(this)));
	      var refs = this.refs === emptyObject ? (this.refs = {}) : this.refs;
	      refs[ref] = component;
	    },

	    /**
	     * Detaches a reference name.
	     *
	     * @param {string} ref Name to dereference.
	     * @final
	     * @private
	     */
	    detachRef: function(ref) {
	      delete this.refs[ref];
	    }

	  }

	};

	module.exports = ReactOwner;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactUpdates
	 */

	"use strict";

	var CallbackQueue = __webpack_require__(138);
	var PooledClass = __webpack_require__(85);
	var ReactCurrentOwner = __webpack_require__(58);
	var ReactPerf = __webpack_require__(68);
	var Transaction = __webpack_require__(139);

	var assign = __webpack_require__(72);
	var invariant = __webpack_require__(49);
	var warning = __webpack_require__(83);

	var dirtyComponents = [];
	var asapCallbackQueue = CallbackQueue.getPooled();
	var asapEnqueued = false;

	var batchingStrategy = null;

	function ensureInjected() {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    ReactUpdates.ReactReconcileTransaction && batchingStrategy,
	    'ReactUpdates: must inject a reconcile transaction class and batching ' +
	    'strategy'
	  ) : invariant(ReactUpdates.ReactReconcileTransaction && batchingStrategy));
	}

	var NESTED_UPDATES = {
	  initialize: function() {
	    this.dirtyComponentsLength = dirtyComponents.length;
	  },
	  close: function() {
	    if (this.dirtyComponentsLength !== dirtyComponents.length) {
	      // Additional updates were enqueued by componentDidUpdate handlers or
	      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
	      // these new updates so that if A's componentDidUpdate calls setState on
	      // B, B will update before the callback A's updater provided when calling
	      // setState.
	      dirtyComponents.splice(0, this.dirtyComponentsLength);
	      flushBatchedUpdates();
	    } else {
	      dirtyComponents.length = 0;
	    }
	  }
	};

	var UPDATE_QUEUEING = {
	  initialize: function() {
	    this.callbackQueue.reset();
	  },
	  close: function() {
	    this.callbackQueue.notifyAll();
	  }
	};

	var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];

	function ReactUpdatesFlushTransaction() {
	  this.reinitializeTransaction();
	  this.dirtyComponentsLength = null;
	  this.callbackQueue = CallbackQueue.getPooled();
	  this.reconcileTransaction =
	    ReactUpdates.ReactReconcileTransaction.getPooled();
	}

	assign(
	  ReactUpdatesFlushTransaction.prototype,
	  Transaction.Mixin, {
	  getTransactionWrappers: function() {
	    return TRANSACTION_WRAPPERS;
	  },

	  destructor: function() {
	    this.dirtyComponentsLength = null;
	    CallbackQueue.release(this.callbackQueue);
	    this.callbackQueue = null;
	    ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
	    this.reconcileTransaction = null;
	  },

	  perform: function(method, scope, a) {
	    // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
	    // with this transaction's wrappers around it.
	    return Transaction.Mixin.perform.call(
	      this,
	      this.reconcileTransaction.perform,
	      this.reconcileTransaction,
	      method,
	      scope,
	      a
	    );
	  }
	});

	PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);

	function batchedUpdates(callback, a, b) {
	  ensureInjected();
	  batchingStrategy.batchedUpdates(callback, a, b);
	}

	/**
	 * Array comparator for ReactComponents by owner depth
	 *
	 * @param {ReactComponent} c1 first component you're comparing
	 * @param {ReactComponent} c2 second component you're comparing
	 * @return {number} Return value usable by Array.prototype.sort().
	 */
	function mountDepthComparator(c1, c2) {
	  return c1._mountDepth - c2._mountDepth;
	}

	function runBatchedUpdates(transaction) {
	  var len = transaction.dirtyComponentsLength;
	  ("production" !== process.env.NODE_ENV ? invariant(
	    len === dirtyComponents.length,
	    'Expected flush transaction\'s stored dirty-components length (%s) to ' +
	    'match dirty-components array length (%s).',
	    len,
	    dirtyComponents.length
	  ) : invariant(len === dirtyComponents.length));

	  // Since reconciling a component higher in the owner hierarchy usually (not
	  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
	  // them before their children by sorting the array.
	  dirtyComponents.sort(mountDepthComparator);

	  for (var i = 0; i < len; i++) {
	    // If a component is unmounted before pending changes apply, ignore them
	    // TODO: Queue unmounts in the same list to avoid this happening at all
	    var component = dirtyComponents[i];
	    if (component.isMounted()) {
	      // If performUpdateIfNecessary happens to enqueue any new updates, we
	      // shouldn't execute the callbacks until the next render happens, so
	      // stash the callbacks first
	      var callbacks = component._pendingCallbacks;
	      component._pendingCallbacks = null;
	      component.performUpdateIfNecessary(transaction.reconcileTransaction);

	      if (callbacks) {
	        for (var j = 0; j < callbacks.length; j++) {
	          transaction.callbackQueue.enqueue(
	            callbacks[j],
	            component
	          );
	        }
	      }
	    }
	  }
	}

	var flushBatchedUpdates = ReactPerf.measure(
	  'ReactUpdates',
	  'flushBatchedUpdates',
	  function() {
	    // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
	    // array and perform any updates enqueued by mount-ready handlers (i.e.,
	    // componentDidUpdate) but we need to check here too in order to catch
	    // updates enqueued by setState callbacks and asap calls.
	    while (dirtyComponents.length || asapEnqueued) {
	      if (dirtyComponents.length) {
	        var transaction = ReactUpdatesFlushTransaction.getPooled();
	        transaction.perform(runBatchedUpdates, null, transaction);
	        ReactUpdatesFlushTransaction.release(transaction);
	      }

	      if (asapEnqueued) {
	        asapEnqueued = false;
	        var queue = asapCallbackQueue;
	        asapCallbackQueue = CallbackQueue.getPooled();
	        queue.notifyAll();
	        CallbackQueue.release(queue);
	      }
	    }
	  }
	);

	/**
	 * Mark a component as needing a rerender, adding an optional callback to a
	 * list of functions which will be executed once the rerender occurs.
	 */
	function enqueueUpdate(component, callback) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !callback || typeof callback === "function",
	    'enqueueUpdate(...): You called `setProps`, `replaceProps`, ' +
	    '`setState`, `replaceState`, or `forceUpdate` with a callback that ' +
	    'isn\'t callable.'
	  ) : invariant(!callback || typeof callback === "function"));
	  ensureInjected();

	  // Various parts of our code (such as ReactCompositeComponent's
	  // _renderValidatedComponent) assume that calls to render aren't nested;
	  // verify that that's the case. (This is called by each top-level update
	  // function, like setProps, setState, forceUpdate, etc.; creation and
	  // destruction of top-level components is guarded in ReactMount.)
	  ("production" !== process.env.NODE_ENV ? warning(
	    ReactCurrentOwner.current == null,
	    'enqueueUpdate(): Render methods should be a pure function of props ' +
	    'and state; triggering nested component updates from render is not ' +
	    'allowed. If necessary, trigger nested updates in ' +
	    'componentDidUpdate.'
	  ) : null);

	  if (!batchingStrategy.isBatchingUpdates) {
	    batchingStrategy.batchedUpdates(enqueueUpdate, component, callback);
	    return;
	  }

	  dirtyComponents.push(component);

	  if (callback) {
	    if (component._pendingCallbacks) {
	      component._pendingCallbacks.push(callback);
	    } else {
	      component._pendingCallbacks = [callback];
	    }
	  }
	}

	/**
	 * Enqueue a callback to be run at the end of the current batching cycle. Throws
	 * if no updates are currently being performed.
	 */
	function asap(callback, context) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    batchingStrategy.isBatchingUpdates,
	    'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' +
	    'updates are not being batched.'
	  ) : invariant(batchingStrategy.isBatchingUpdates));
	  asapCallbackQueue.enqueue(callback, context);
	  asapEnqueued = true;
	}

	var ReactUpdatesInjection = {
	  injectReconcileTransaction: function(ReconcileTransaction) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      ReconcileTransaction,
	      'ReactUpdates: must provide a reconcile transaction class'
	    ) : invariant(ReconcileTransaction));
	    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
	  },

	  injectBatchingStrategy: function(_batchingStrategy) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      _batchingStrategy,
	      'ReactUpdates: must provide a batching strategy'
	    ) : invariant(_batchingStrategy));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      typeof _batchingStrategy.batchedUpdates === 'function',
	      'ReactUpdates: must provide a batchedUpdates() function'
	    ) : invariant(typeof _batchingStrategy.batchedUpdates === 'function'));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      typeof _batchingStrategy.isBatchingUpdates === 'boolean',
	      'ReactUpdates: must provide an isBatchingUpdates boolean attribute'
	    ) : invariant(typeof _batchingStrategy.isBatchingUpdates === 'boolean'));
	    batchingStrategy = _batchingStrategy;
	  }
	};

	var ReactUpdates = {
	  /**
	   * React references `ReactReconcileTransaction` using this property in order
	   * to allow dependency injection.
	   *
	   * @internal
	   */
	  ReactReconcileTransaction: null,

	  batchedUpdates: batchedUpdates,
	  enqueueUpdate: enqueueUpdate,
	  flushBatchedUpdates: flushBatchedUpdates,
	  injection: ReactUpdatesInjection,
	  asap: asap
	};

	module.exports = ReactUpdates;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactEmptyComponent
	 */

	"use strict";

	var ReactElement = __webpack_require__(59);

	var invariant = __webpack_require__(49);

	var component;
	// This registry keeps track of the React IDs of the components that rendered to
	// `null` (in reality a placeholder such as `noscript`)
	var nullComponentIdsRegistry = {};

	var ReactEmptyComponentInjection = {
	  injectEmptyComponent: function(emptyComponent) {
	    component = ReactElement.createFactory(emptyComponent);
	  }
	};

	/**
	 * @return {ReactComponent} component The injected empty component.
	 */
	function getEmptyComponent() {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    component,
	    'Trying to return null from a render, but no null placeholder component ' +
	    'was injected.'
	  ) : invariant(component));
	  return component();
	}

	/**
	 * Mark the component as having rendered to null.
	 * @param {string} id Component's `_rootNodeID`.
	 */
	function registerNullComponentID(id) {
	  nullComponentIdsRegistry[id] = true;
	}

	/**
	 * Unmark the component as having rendered to null: it renders to something now.
	 * @param {string} id Component's `_rootNodeID`.
	 */
	function deregisterNullComponentID(id) {
	  delete nullComponentIdsRegistry[id];
	}

	/**
	 * @param {string} id Component's `_rootNodeID`.
	 * @return {boolean} True if the component is rendered to null.
	 */
	function isNullComponentID(id) {
	  return nullComponentIdsRegistry[id];
	}

	var ReactEmptyComponent = {
	  deregisterNullComponentID: deregisterNullComponentID,
	  getEmptyComponent: getEmptyComponent,
	  injection: ReactEmptyComponentInjection,
	  isNullComponentID: isNullComponentID,
	  registerNullComponentID: registerNullComponentID
	};

	module.exports = ReactEmptyComponent;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactErrorUtils
	 * @typechecks
	 */

	"use strict";

	var ReactErrorUtils = {
	  /**
	   * Creates a guarded version of a function. This is supposed to make debugging
	   * of event handlers easier. To aid debugging with the browser's debugger,
	   * this currently simply returns the original function.
	   *
	   * @param {function} func Function to be executed
	   * @param {string} name The name of the guard
	   * @return {function}
	   */
	  guard: function(func, name) {
	    return func;
	  }
	};

	module.exports = ReactErrorUtils;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTransferer
	 */

	"use strict";

	var assign = __webpack_require__(72);
	var emptyFunction = __webpack_require__(133);
	var invariant = __webpack_require__(49);
	var joinClasses = __webpack_require__(140);
	var warning = __webpack_require__(83);

	var didWarn = false;

	/**
	 * Creates a transfer strategy that will merge prop values using the supplied
	 * `mergeStrategy`. If a prop was previously unset, this just sets it.
	 *
	 * @param {function} mergeStrategy
	 * @return {function}
	 */
	function createTransferStrategy(mergeStrategy) {
	  return function(props, key, value) {
	    if (!props.hasOwnProperty(key)) {
	      props[key] = value;
	    } else {
	      props[key] = mergeStrategy(props[key], value);
	    }
	  };
	}

	var transferStrategyMerge = createTransferStrategy(function(a, b) {
	  // `merge` overrides the first object's (`props[key]` above) keys using the
	  // second object's (`value`) keys. An object's style's existing `propA` would
	  // get overridden. Flip the order here.
	  return assign({}, b, a);
	});

	/**
	 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
	 * NOTE: if you add any more exceptions to this list you should be sure to
	 * update `cloneWithProps()` accordingly.
	 */
	var TransferStrategies = {
	  /**
	   * Never transfer `children`.
	   */
	  children: emptyFunction,
	  /**
	   * Transfer the `className` prop by merging them.
	   */
	  className: createTransferStrategy(joinClasses),
	  /**
	   * Transfer the `style` prop (which is an object) by merging them.
	   */
	  style: transferStrategyMerge
	};

	/**
	 * Mutates the first argument by transferring the properties from the second
	 * argument.
	 *
	 * @param {object} props
	 * @param {object} newProps
	 * @return {object}
	 */
	function transferInto(props, newProps) {
	  for (var thisKey in newProps) {
	    if (!newProps.hasOwnProperty(thisKey)) {
	      continue;
	    }

	    var transferStrategy = TransferStrategies[thisKey];

	    if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
	      transferStrategy(props, thisKey, newProps[thisKey]);
	    } else if (!props.hasOwnProperty(thisKey)) {
	      props[thisKey] = newProps[thisKey];
	    }
	  }
	  return props;
	}

	/**
	 * ReactPropTransferer are capable of transferring props to another component
	 * using a `transferPropsTo` method.
	 *
	 * @class ReactPropTransferer
	 */
	var ReactPropTransferer = {

	  TransferStrategies: TransferStrategies,

	  /**
	   * Merge two props objects using TransferStrategies.
	   *
	   * @param {object} oldProps original props (they take precedence)
	   * @param {object} newProps new props to merge in
	   * @return {object} a new object containing both sets of props merged.
	   */
	  mergeProps: function(oldProps, newProps) {
	    return transferInto(assign({}, oldProps), newProps);
	  },

	  /**
	   * @lends {ReactPropTransferer.prototype}
	   */
	  Mixin: {

	    /**
	     * Transfer props from this component to a target component.
	     *
	     * Props that do not have an explicit transfer strategy will be transferred
	     * only if the target component does not already have the prop set.
	     *
	     * This is usually used to pass down props to a returned root component.
	     *
	     * @param {ReactElement} element Component receiving the properties.
	     * @return {ReactElement} The supplied `component`.
	     * @final
	     * @protected
	     */
	    transferPropsTo: function(element) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        element._owner === this,
	        '%s: You can\'t call transferPropsTo() on a component that you ' +
	        'don\'t own, %s. This usually means you are calling ' +
	        'transferPropsTo() on a component passed in as props or children.',
	        this.constructor.displayName,
	        typeof element.type === 'string' ?
	        element.type :
	        element.type.displayName
	      ) : invariant(element._owner === this));

	      if ("production" !== process.env.NODE_ENV) {
	        if (!didWarn) {
	          didWarn = true;
	          ("production" !== process.env.NODE_ENV ? warning(
	            false,
	            'transferPropsTo is deprecated. ' +
	            'See http://fb.me/react-transferpropsto for more information.'
	          ) : null);
	        }
	      }

	      // Because elements are immutable we have to merge into the existing
	      // props object rather than clone it.
	      transferInto(element.props, this.props);

	      return element;
	    }

	  }
	};

	module.exports = ReactPropTransferer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocations
	 */

	"use strict";

	var keyMirror = __webpack_require__(40);

	var ReactPropTypeLocations = keyMirror({
	  prop: null,
	  context: null,
	  childContext: null
	});

	module.exports = ReactPropTypeLocations;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocationNames
	 */

	"use strict";

	var ReactPropTypeLocationNames = {};

	if ("production" !== process.env.NODE_ENV) {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}

	module.exports = ReactPropTypeLocationNames;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule instantiateReactComponent
	 * @typechecks static-only
	 */

	"use strict";

	var warning = __webpack_require__(83);

	var ReactElement = __webpack_require__(59);
	var ReactLegacyElement = __webpack_require__(65);
	var ReactNativeComponent = __webpack_require__(141);
	var ReactEmptyComponent = __webpack_require__(89);

	/**
	 * Given an `element` create an instance that will actually be mounted.
	 *
	 * @param {object} element
	 * @param {*} parentCompositeType The composite type that resolved this.
	 * @return {object} A new instance of the element's constructor.
	 * @protected
	 */
	function instantiateReactComponent(element, parentCompositeType) {
	  var instance;

	  if ("production" !== process.env.NODE_ENV) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      element && (typeof element.type === 'function' ||
	                     typeof element.type === 'string'),
	      'Only functions or strings can be mounted as React components.'
	    ) : null);

	    // Resolve mock instances
	    if (element.type._mockedReactClassConstructor) {
	      // If this is a mocked class, we treat the legacy factory as if it was the
	      // class constructor for future proofing unit tests. Because this might
	      // be mocked as a legacy factory, we ignore any warnings triggerd by
	      // this temporary hack.
	      ReactLegacyElement._isLegacyCallWarningEnabled = false;
	      try {
	        instance = new element.type._mockedReactClassConstructor(
	          element.props
	        );
	      } finally {
	        ReactLegacyElement._isLegacyCallWarningEnabled = true;
	      }

	      // If the mock implementation was a legacy factory, then it returns a
	      // element. We need to turn this into a real component instance.
	      if (ReactElement.isValidElement(instance)) {
	        instance = new instance.type(instance.props);
	      }

	      var render = instance.render;
	      if (!render) {
	        // For auto-mocked factories, the prototype isn't shimmed and therefore
	        // there is no render function on the instance. We replace the whole
	        // component with an empty component instance instead.
	        element = ReactEmptyComponent.getEmptyComponent();
	      } else {
	        if (render._isMockFunction && !render._getMockImplementation()) {
	          // Auto-mocked components may have a prototype with a mocked render
	          // function. For those, we'll need to mock the result of the render
	          // since we consider undefined to be invalid results from render.
	          render.mockImplementation(
	            ReactEmptyComponent.getEmptyComponent
	          );
	        }
	        instance.construct(element);
	        return instance;
	      }
	    }
	  }

	  // Special case string values
	  if (typeof element.type === 'string') {
	    instance = ReactNativeComponent.createInstanceForTag(
	      element.type,
	      element.props,
	      parentCompositeType
	    );
	  } else {
	    // Normal case for non-mocks and non-strings
	    instance = new element.type(element.props);
	  }

	  if ("production" !== process.env.NODE_ENV) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      typeof instance.construct === 'function' &&
	      typeof instance.mountComponent === 'function' &&
	      typeof instance.receiveComponent === 'function',
	      'Only React Components can be mounted.'
	    ) : null);
	  }

	  // This actually sets up the internal instance. This will become decoupled
	  // from the public instance in a future diff.
	  instance.construct(element);

	  return instance;
	}

	module.exports = instantiateReactComponent;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyOf
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without loosing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};


	module.exports = keyOf;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule monitorCodeUse
	 */

	"use strict";

	var invariant = __webpack_require__(49);

	/**
	 * Provides open-source compatible instrumentation for monitoring certain API
	 * uses before we're ready to issue a warning or refactor. It accepts an event
	 * name which may only contain the characters [a-z0-9_] and an optional data
	 * object with further information.
	 */

	function monitorCodeUse(eventName, data) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    eventName && !/[^a-z0-9_]/.test(eventName),
	    'You must provide an eventName using only the characters [a-z0-9_]'
	  ) : invariant(eventName && !/[^a-z0-9_]/.test(eventName)));
	}

	module.exports = monitorCodeUse;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule mapObject
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object and constructs a new object from the results. The `callback` is
	 * invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `mapObject` will not be visited
	 * by `callback`. If the values of existing properties are changed, the value
	 * passed to `callback` will be the value at the time `mapObject` visits them.
	 * Properties that are deleted before being visited are not visited.
	 *
	 * @grep function objectMap()
	 * @grep function objMap()
	 *
	 * @param {?object} object
	 * @param {function} callback
	 * @param {*} context
	 * @return {?object}
	 */
	function mapObject(object, callback, context) {
	  if (!object) {
	    return null;
	  }
	  var result = {};
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      result[name] = callback.call(context, object[name], name, object);
	    }
	  }
	  return result;
	}

	module.exports = mapObject;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shouldUpdateReactComponent
	 * @typechecks static-only
	 */

	"use strict";

	/**
	 * Given a `prevElement` and `nextElement`, determines if the existing
	 * instance should be updated as opposed to being destroyed or replaced by a new
	 * instance. Both arguments are elements. This ensures that this logic can
	 * operate on stateless trees without any backing instance.
	 *
	 * @param {?object} prevElement
	 * @param {?object} nextElement
	 * @return {boolean} True if the existing instance should be updated.
	 * @protected
	 */
	function shouldUpdateReactComponent(prevElement, nextElement) {
	  if (prevElement && nextElement &&
	      prevElement.type === nextElement.type &&
	      prevElement.key === nextElement.key &&
	      prevElement._owner === nextElement._owner) {
	    return true;
	  }
	  return false;
	}

	module.exports = shouldUpdateReactComponent;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSPropertyOperations
	 * @typechecks static-only
	 */

	"use strict";

	var CSSProperty = __webpack_require__(142);
	var ExecutionEnvironment = __webpack_require__(75);

	var camelizeStyleName = __webpack_require__(143);
	var dangerousStyleValue = __webpack_require__(144);
	var hyphenateStyleName = __webpack_require__(145);
	var memoizeStringOnly = __webpack_require__(82);
	var warning = __webpack_require__(83);

	var processStyleName = memoizeStringOnly(function(styleName) {
	  return hyphenateStyleName(styleName);
	});

	var styleFloatAccessor = 'cssFloat';
	if (ExecutionEnvironment.canUseDOM) {
	  // IE8 only supports accessing cssFloat (standard) as styleFloat
	  if (document.documentElement.style.cssFloat === undefined) {
	    styleFloatAccessor = 'styleFloat';
	  }
	}

	if ("production" !== process.env.NODE_ENV) {
	  var warnedStyleNames = {};

	  var warnHyphenatedStyleName = function(name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;
	    ("production" !== process.env.NODE_ENV ? warning(
	      false,
	      'Unsupported style property ' + name + '. Did you mean ' +
	      camelizeStyleName(name) + '?'
	    ) : null);
	  };
	}

	/**
	 * Operations for dealing with CSS properties.
	 */
	var CSSPropertyOperations = {

	  /**
	   * Serializes a mapping of style properties for use as inline styles:
	   *
	   *   > createMarkupForStyles({width: '200px', height: 0})
	   *   "width:200px;height:0;"
	   *
	   * Undefined values are ignored so that declarative programming is easier.
	   * The result should be HTML-escaped before insertion into the DOM.
	   *
	   * @param {object} styles
	   * @return {?string}
	   */
	  createMarkupForStyles: function(styles) {
	    var serialized = '';
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      if ("production" !== process.env.NODE_ENV) {
	        if (styleName.indexOf('-') > -1) {
	          warnHyphenatedStyleName(styleName);
	        }
	      }
	      var styleValue = styles[styleName];
	      if (styleValue != null) {
	        serialized += processStyleName(styleName) + ':';
	        serialized += dangerousStyleValue(styleName, styleValue) + ';';
	      }
	    }
	    return serialized || null;
	  },

	  /**
	   * Sets the value for multiple styles on a node.  If a value is specified as
	   * '' (empty string), the corresponding style property will be unset.
	   *
	   * @param {DOMElement} node
	   * @param {object} styles
	   */
	  setValueForStyles: function(node, styles) {
	    var style = node.style;
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      if ("production" !== process.env.NODE_ENV) {
	        if (styleName.indexOf('-') > -1) {
	          warnHyphenatedStyleName(styleName);
	        }
	      }
	      var styleValue = dangerousStyleValue(styleName, styles[styleName]);
	      if (styleName === 'float') {
	        styleName = styleFloatAccessor;
	      }
	      if (styleValue) {
	        style[styleName] = styleValue;
	      } else {
	        var expansion = CSSProperty.shorthandPropertyExpansions[styleName];
	        if (expansion) {
	          // Shorthand property that IE8 won't like unsetting, so unset each
	          // component to placate it
	          for (var individualStyleName in expansion) {
	            style[individualStyleName] = '';
	          }
	        } else {
	          style[styleName] = '';
	        }
	      }
	    }
	  }

	};

	module.exports = CSSPropertyOperations;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactBrowserComponentMixin
	 */

	"use strict";

	var ReactEmptyComponent = __webpack_require__(89);
	var ReactMount = __webpack_require__(66);

	var invariant = __webpack_require__(49);

	var ReactBrowserComponentMixin = {
	  /**
	   * Returns the DOM node rendered by this component.
	   *
	   * @return {DOMElement} The root node of this component.
	   * @final
	   * @protected
	   */
	  getDOMNode: function() {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      this.isMounted(),
	      'getDOMNode(): A component must be mounted to have a DOM node.'
	    ) : invariant(this.isMounted()));
	    if (ReactEmptyComponent.isNullComponentID(this._rootNodeID)) {
	      return null;
	    }
	    return ReactMount.getNode(this._rootNodeID);
	  }
	};

	module.exports = ReactBrowserComponentMixin;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 

	 */
	'use strict';

	var React         = __webpack_require__(10);
	var PropTypes     = React.PropTypes;
	var emptyFunction = __webpack_require__(40);

	var Draggable = React.createClass({displayName: "Draggable",

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
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyObject
	 */

	"use strict";

	var emptyObject = {};

	if ("production" !== process.env.NODE_ENV) {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CallbackQueue
	 */

	"use strict";

	var PooledClass = __webpack_require__(85);

	var assign = __webpack_require__(72);
	var invariant = __webpack_require__(49);

	/**
	 * A specialized pseudo-event module to help keep track of components waiting to
	 * be notified when their DOM representations are available for use.
	 *
	 * This implements `PooledClass`, so you should never need to instantiate this.
	 * Instead, use `CallbackQueue.getPooled()`.
	 *
	 * @class ReactMountReady
	 * @implements PooledClass
	 * @internal
	 */
	function CallbackQueue() {
	  this._callbacks = null;
	  this._contexts = null;
	}

	assign(CallbackQueue.prototype, {

	  /**
	   * Enqueues a callback to be invoked when `notifyAll` is invoked.
	   *
	   * @param {function} callback Invoked when `notifyAll` is invoked.
	   * @param {?object} context Context to call `callback` with.
	   * @internal
	   */
	  enqueue: function(callback, context) {
	    this._callbacks = this._callbacks || [];
	    this._contexts = this._contexts || [];
	    this._callbacks.push(callback);
	    this._contexts.push(context);
	  },

	  /**
	   * Invokes all enqueued callbacks and clears the queue. This is invoked after
	   * the DOM representation of a component has been created or updated.
	   *
	   * @internal
	   */
	  notifyAll: function() {
	    var callbacks = this._callbacks;
	    var contexts = this._contexts;
	    if (callbacks) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        callbacks.length === contexts.length,
	        "Mismatched list of contexts in callback queue"
	      ) : invariant(callbacks.length === contexts.length));
	      this._callbacks = null;
	      this._contexts = null;
	      for (var i = 0, l = callbacks.length; i < l; i++) {
	        callbacks[i].call(contexts[i]);
	      }
	      callbacks.length = 0;
	      contexts.length = 0;
	    }
	  },

	  /**
	   * Resets the internal queue.
	   *
	   * @internal
	   */
	  reset: function() {
	    this._callbacks = null;
	    this._contexts = null;
	  },

	  /**
	   * `PooledClass` looks for this.
	   */
	  destructor: function() {
	    this.reset();
	  }

	});

	PooledClass.addPoolingTo(CallbackQueue);

	module.exports = CallbackQueue;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Transaction
	 */

	"use strict";

	var invariant = __webpack_require__(49);

	/**
	 * `Transaction` creates a black box that is able to wrap any method such that
	 * certain invariants are maintained before and after the method is invoked
	 * (Even if an exception is thrown while invoking the wrapped method). Whoever
	 * instantiates a transaction can provide enforcers of the invariants at
	 * creation time. The `Transaction` class itself will supply one additional
	 * automatic invariant for you - the invariant that any transaction instance
	 * should not be run while it is already being run. You would typically create a
	 * single instance of a `Transaction` for reuse multiple times, that potentially
	 * is used to wrap several different methods. Wrappers are extremely simple -
	 * they only require implementing two methods.
	 *
	 * <pre>
	 *                       wrappers (injected at creation time)
	 *                                      +        +
	 *                                      |        |
	 *                    +-----------------|--------|--------------+
	 *                    |                 v        |              |
	 *                    |      +---------------+   |              |
	 *                    |   +--|    wrapper1   |---|----+         |
	 *                    |   |  +---------------+   v    |         |
	 *                    |   |          +-------------+  |         |
	 *                    |   |     +----|   wrapper2  |--------+   |
	 *                    |   |     |    +-------------+  |     |   |
	 *                    |   |     |                     |     |   |
	 *                    |   v     v                     v     v   | wrapper
	 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
	 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
	 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | +---+ +---+   +---------+   +---+ +---+ |
	 *                    |  initialize                    close    |
	 *                    +-----------------------------------------+
	 * </pre>
	 *
	 * Use cases:
	 * - Preserving the input selection ranges before/after reconciliation.
	 *   Restoring selection even in the event of an unexpected error.
	 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
	 *   while guaranteeing that afterwards, the event system is reactivated.
	 * - Flushing a queue of collected DOM mutations to the main UI thread after a
	 *   reconciliation takes place in a worker thread.
	 * - Invoking any collected `componentDidUpdate` callbacks after rendering new
	 *   content.
	 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
	 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
	 * - (Future use case): Layout calculations before and after DOM upates.
	 *
	 * Transactional plugin API:
	 * - A module that has an `initialize` method that returns any precomputation.
	 * - and a `close` method that accepts the precomputation. `close` is invoked
	 *   when the wrapped process is completed, or has failed.
	 *
	 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
	 * that implement `initialize` and `close`.
	 * @return {Transaction} Single transaction for reuse in thread.
	 *
	 * @class Transaction
	 */
	var Mixin = {
	  /**
	   * Sets up this instance so that it is prepared for collecting metrics. Does
	   * so such that this setup method may be used on an instance that is already
	   * initialized, in a way that does not consume additional memory upon reuse.
	   * That can be useful if you decide to make your subclass of this mixin a
	   * "PooledClass".
	   */
	  reinitializeTransaction: function() {
	    this.transactionWrappers = this.getTransactionWrappers();
	    if (!this.wrapperInitData) {
	      this.wrapperInitData = [];
	    } else {
	      this.wrapperInitData.length = 0;
	    }
	    this._isInTransaction = false;
	  },

	  _isInTransaction: false,

	  /**
	   * @abstract
	   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
	   */
	  getTransactionWrappers: null,

	  isInTransaction: function() {
	    return !!this._isInTransaction;
	  },

	  /**
	   * Executes the function within a safety window. Use this for the top level
	   * methods that result in large amounts of computation/mutations that would
	   * need to be safety checked.
	   *
	   * @param {function} method Member of scope to call.
	   * @param {Object} scope Scope to invoke from.
	   * @param {Object?=} args... Arguments to pass to the method (optional).
	   *                           Helps prevent need to bind in many cases.
	   * @return Return value from `method`.
	   */
	  perform: function(method, scope, a, b, c, d, e, f) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !this.isInTransaction(),
	      'Transaction.perform(...): Cannot initialize a transaction when there ' +
	      'is already an outstanding transaction.'
	    ) : invariant(!this.isInTransaction()));
	    var errorThrown;
	    var ret;
	    try {
	      this._isInTransaction = true;
	      // Catching errors makes debugging more difficult, so we start with
	      // errorThrown set to true before setting it to false after calling
	      // close -- if it's still set to true in the finally block, it means
	      // one of these calls threw.
	      errorThrown = true;
	      this.initializeAll(0);
	      ret = method.call(scope, a, b, c, d, e, f);
	      errorThrown = false;
	    } finally {
	      try {
	        if (errorThrown) {
	          // If `method` throws, prefer to show that stack trace over any thrown
	          // by invoking `closeAll`.
	          try {
	            this.closeAll(0);
	          } catch (err) {
	          }
	        } else {
	          // Since `method` didn't throw, we don't want to silence the exception
	          // here.
	          this.closeAll(0);
	        }
	      } finally {
	        this._isInTransaction = false;
	      }
	    }
	    return ret;
	  },

	  initializeAll: function(startIndex) {
	    var transactionWrappers = this.transactionWrappers;
	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      try {
	        // Catching errors makes debugging more difficult, so we start with the
	        // OBSERVED_ERROR state before overwriting it with the real return value
	        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
	        // block, it means wrapper.initialize threw.
	        this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
	        this.wrapperInitData[i] = wrapper.initialize ?
	          wrapper.initialize.call(this) :
	          null;
	      } finally {
	        if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
	          // The initializer for wrapper i threw an error; initialize the
	          // remaining wrappers but silence any exceptions from them to ensure
	          // that the first error is the one to bubble up.
	          try {
	            this.initializeAll(i + 1);
	          } catch (err) {
	          }
	        }
	      }
	    }
	  },

	  /**
	   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
	   * them the respective return values of `this.transactionWrappers.init[i]`
	   * (`close`rs that correspond to initializers that failed will not be
	   * invoked).
	   */
	  closeAll: function(startIndex) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      this.isInTransaction(),
	      'Transaction.closeAll(): Cannot close transaction when none are open.'
	    ) : invariant(this.isInTransaction()));
	    var transactionWrappers = this.transactionWrappers;
	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      var initData = this.wrapperInitData[i];
	      var errorThrown;
	      try {
	        // Catching errors makes debugging more difficult, so we start with
	        // errorThrown set to true before setting it to false after calling
	        // close -- if it's still set to true in the finally block, it means
	        // wrapper.close threw.
	        errorThrown = true;
	        if (initData !== Transaction.OBSERVED_ERROR) {
	          wrapper.close && wrapper.close.call(this, initData);
	        }
	        errorThrown = false;
	      } finally {
	        if (errorThrown) {
	          // The closer for wrapper i threw an error; close the remaining
	          // wrappers but silence any exceptions from them to ensure that the
	          // first error is the one to bubble up.
	          try {
	            this.closeAll(i + 1);
	          } catch (e) {
	          }
	        }
	      }
	    }
	    this.wrapperInitData.length = 0;
	  }
	};

	var Transaction = {

	  Mixin: Mixin,

	  /**
	   * Token to look for to determine if an error occured.
	   */
	  OBSERVED_ERROR: {}

	};

	module.exports = Transaction;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */

	"use strict";

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	function joinClasses(className/*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNativeComponent
	 */

	"use strict";

	var assign = __webpack_require__(72);
	var invariant = __webpack_require__(49);

	var genericComponentClass = null;
	// This registry keeps track of wrapper classes around native tags
	var tagToComponentClass = {};

	var ReactNativeComponentInjection = {
	  // This accepts a class that receives the tag string. This is a catch all
	  // that can render any kind of tag.
	  injectGenericComponentClass: function(componentClass) {
	    genericComponentClass = componentClass;
	  },
	  // This accepts a keyed object with classes as values. Each key represents a
	  // tag. That particular tag will use this class instead of the generic one.
	  injectComponentClasses: function(componentClasses) {
	    assign(tagToComponentClass, componentClasses);
	  }
	};

	/**
	 * Create an internal class for a specific tag.
	 *
	 * @param {string} tag The tag for which to create an internal instance.
	 * @param {any} props The props passed to the instance constructor.
	 * @return {ReactComponent} component The injected empty component.
	 */
	function createInstanceForTag(tag, props, parentType) {
	  var componentClass = tagToComponentClass[tag];
	  if (componentClass == null) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      genericComponentClass,
	      'There is no registered component for the tag %s',
	      tag
	    ) : invariant(genericComponentClass));
	    return new genericComponentClass(tag, props);
	  }
	  if (parentType === tag) {
	    // Avoid recursion
	    ("production" !== process.env.NODE_ENV ? invariant(
	      genericComponentClass,
	      'There is no registered component for the tag %s',
	      tag
	    ) : invariant(genericComponentClass));
	    return new genericComponentClass(tag, props);
	  }
	  // Unwrap legacy factories
	  return new componentClass.type(props);
	}

	var ReactNativeComponent = {
	  createInstanceForTag: createInstanceForTag,
	  injection: ReactNativeComponentInjection
	};

	module.exports = ReactNativeComponent;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSProperty
	 */

	"use strict";

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexShrink: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,

	  // SVG-related properties
	  fillOpacity: true,
	  strokeOpacity: true
	};

	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}

	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber).forEach(function(prop) {
	  prefixes.forEach(function(prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});

	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */
	var shorthandPropertyExpansions = {
	  background: {
	    backgroundImage: true,
	    backgroundPosition: true,
	    backgroundRepeat: true,
	    backgroundColor: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  }
	};

	var CSSProperty = {
	  isUnitlessNumber: isUnitlessNumber,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};

	module.exports = CSSProperty;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelizeStyleName
	 * @typechecks
	 */

	"use strict";

	var camelize = __webpack_require__(182);

	var msPattern = /^-ms-/;

	/**
	 * Camelcases a hyphenated CSS property name, for example:
	 *
	 *   > camelizeStyleName('background-color')
	 *   < "backgroundColor"
	 *   > camelizeStyleName('-moz-transition')
	 *   < "MozTransition"
	 *   > camelizeStyleName('-ms-transition')
	 *   < "msTransition"
	 *
	 * As Andi Smith suggests
	 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	 * is converted to lowercase `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	}

	module.exports = camelizeStyleName;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule dangerousStyleValue
	 * @typechecks static-only
	 */

	"use strict";

	var CSSProperty = __webpack_require__(142);

	var isUnitlessNumber = CSSProperty.isUnitlessNumber;

	/**
	 * Convert a value into the proper css writable value. The style name `name`
	 * should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} name CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @return {string} Normalized style value with dimensions applied.
	 */
	function dangerousStyleValue(name, value) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901

	  var isEmpty = value == null || typeof value === 'boolean' || value === '';
	  if (isEmpty) {
	    return '';
	  }

	  var isNonNumeric = isNaN(value);
	  if (isNonNumeric || value === 0 ||
	      isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
	    return '' + value; // cast to string
	  }

	  if (typeof value === 'string') {
	    value = value.trim();
	  }
	  return value + 'px';
	}

	module.exports = dangerousStyleValue;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule hyphenateStyleName
	 * @typechecks
	 */

	"use strict";

	var hyphenate = __webpack_require__(185);

	var msPattern = /^ms-/;

	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, '-ms-');
	}

	module.exports = hyphenateStyleName;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventPluginHub
	 */

	"use strict";

	var EventPluginRegistry = __webpack_require__(147);
	var EventPluginUtils = __webpack_require__(53);

	var accumulateInto = __webpack_require__(183);
	var forEachAccumulated = __webpack_require__(184);
	var invariant = __webpack_require__(49);

	/**
	 * Internal store for event listeners
	 */
	var listenerBank = {};

	/**
	 * Internal queue of events that have accumulated their dispatches and are
	 * waiting to have their dispatches executed.
	 */
	var eventQueue = null;

	/**
	 * Dispatches an event and releases it back into the pool, unless persistent.
	 *
	 * @param {?object} event Synthetic event to be dispatched.
	 * @private
	 */
	var executeDispatchesAndRelease = function(event) {
	  if (event) {
	    var executeDispatch = EventPluginUtils.executeDispatch;
	    // Plugins can provide custom behavior when dispatching events.
	    var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
	    if (PluginModule && PluginModule.executeDispatch) {
	      executeDispatch = PluginModule.executeDispatch;
	    }
	    EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);

	    if (!event.isPersistent()) {
	      event.constructor.release(event);
	    }
	  }
	};

	/**
	 * - `InstanceHandle`: [required] Module that performs logical traversals of DOM
	 *   hierarchy given ids of the logical DOM elements involved.
	 */
	var InstanceHandle = null;

	function validateInstanceHandle() {
	  var invalid = !InstanceHandle||
	    !InstanceHandle.traverseTwoPhase ||
	    !InstanceHandle.traverseEnterLeave;
	  if (invalid) {
	    throw new Error('InstanceHandle not injected before use!');
	  }
	}

	/**
	 * This is a unified interface for event plugins to be installed and configured.
	 *
	 * Event plugins can implement the following properties:
	 *
	 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
	 *     Required. When a top-level event is fired, this method is expected to
	 *     extract synthetic events that will in turn be queued and dispatched.
	 *
	 *   `eventTypes` {object}
	 *     Optional, plugins that fire events must publish a mapping of registration
	 *     names that are used to register listeners. Values of this mapping must
	 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
	 *
	 *   `executeDispatch` {function(object, function, string)}
	 *     Optional, allows plugins to override how an event gets dispatched. By
	 *     default, the listener is simply invoked.
	 *
	 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
	 *
	 * @public
	 */
	var EventPluginHub = {

	  /**
	   * Methods for injecting dependencies.
	   */
	  injection: {

	    /**
	     * @param {object} InjectedMount
	     * @public
	     */
	    injectMount: EventPluginUtils.injection.injectMount,

	    /**
	     * @param {object} InjectedInstanceHandle
	     * @public
	     */
	    injectInstanceHandle: function(InjectedInstanceHandle) {
	      InstanceHandle = InjectedInstanceHandle;
	      if ("production" !== process.env.NODE_ENV) {
	        validateInstanceHandle();
	      }
	    },

	    getInstanceHandle: function() {
	      if ("production" !== process.env.NODE_ENV) {
	        validateInstanceHandle();
	      }
	      return InstanceHandle;
	    },

	    /**
	     * @param {array} InjectedEventPluginOrder
	     * @public
	     */
	    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

	    /**
	     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	     */
	    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

	  },

	  eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,

	  registrationNameModules: EventPluginRegistry.registrationNameModules,

	  /**
	   * Stores `listener` at `listenerBank[registrationName][id]`. Is idempotent.
	   *
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @param {?function} listener The callback to store.
	   */
	  putListener: function(id, registrationName, listener) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !listener || typeof listener === 'function',
	      'Expected %s listener to be a function, instead got type %s',
	      registrationName, typeof listener
	    ) : invariant(!listener || typeof listener === 'function'));

	    var bankForRegistrationName =
	      listenerBank[registrationName] || (listenerBank[registrationName] = {});
	    bankForRegistrationName[id] = listener;
	  },

	  /**
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @return {?function} The stored callback.
	   */
	  getListener: function(id, registrationName) {
	    var bankForRegistrationName = listenerBank[registrationName];
	    return bankForRegistrationName && bankForRegistrationName[id];
	  },

	  /**
	   * Deletes a listener from the registration bank.
	   *
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   */
	  deleteListener: function(id, registrationName) {
	    var bankForRegistrationName = listenerBank[registrationName];
	    if (bankForRegistrationName) {
	      delete bankForRegistrationName[id];
	    }
	  },

	  /**
	   * Deletes all listeners for the DOM element with the supplied ID.
	   *
	   * @param {string} id ID of the DOM element.
	   */
	  deleteAllListeners: function(id) {
	    for (var registrationName in listenerBank) {
	      delete listenerBank[registrationName][id];
	    }
	  },

	  /**
	   * Allows registered plugins an opportunity to extract events from top-level
	   * native browser events.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @internal
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var events;
	    var plugins = EventPluginRegistry.plugins;
	    for (var i = 0, l = plugins.length; i < l; i++) {
	      // Not every plugin in the ordering may be loaded at runtime.
	      var possiblePlugin = plugins[i];
	      if (possiblePlugin) {
	        var extractedEvents = possiblePlugin.extractEvents(
	          topLevelType,
	          topLevelTarget,
	          topLevelTargetID,
	          nativeEvent
	        );
	        if (extractedEvents) {
	          events = accumulateInto(events, extractedEvents);
	        }
	      }
	    }
	    return events;
	  },

	  /**
	   * Enqueues a synthetic event that should be dispatched when
	   * `processEventQueue` is invoked.
	   *
	   * @param {*} events An accumulation of synthetic events.
	   * @internal
	   */
	  enqueueEvents: function(events) {
	    if (events) {
	      eventQueue = accumulateInto(eventQueue, events);
	    }
	  },

	  /**
	   * Dispatches all synthetic events on the event queue.
	   *
	   * @internal
	   */
	  processEventQueue: function() {
	    // Set `eventQueue` to null before processing it so that we can tell if more
	    // events get enqueued while processing.
	    var processingEventQueue = eventQueue;
	    eventQueue = null;
	    forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !eventQueue,
	      'processEventQueue(): Additional events were enqueued while processing ' +
	      'an event queue. Support for this has not yet been implemented.'
	    ) : invariant(!eventQueue));
	  },

	  /**
	   * These are needed for tests only. Do not use!
	   */
	  __purge: function() {
	    listenerBank = {};
	  },

	  __getListenerBank: function() {
	    return listenerBank;
	  }

	};

	module.exports = EventPluginHub;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventPluginRegistry
	 * @typechecks static-only
	 */

	"use strict";

	var invariant = __webpack_require__(49);

	/**
	 * Injectable ordering of event plugins.
	 */
	var EventPluginOrder = null;

	/**
	 * Injectable mapping from names to event plugin modules.
	 */
	var namesToPlugins = {};

	/**
	 * Recomputes the plugin list using the injected plugins and plugin ordering.
	 *
	 * @private
	 */
	function recomputePluginOrdering() {
	  if (!EventPluginOrder) {
	    // Wait until an `EventPluginOrder` is injected.
	    return;
	  }
	  for (var pluginName in namesToPlugins) {
	    var PluginModule = namesToPlugins[pluginName];
	    var pluginIndex = EventPluginOrder.indexOf(pluginName);
	    ("production" !== process.env.NODE_ENV ? invariant(
	      pluginIndex > -1,
	      'EventPluginRegistry: Cannot inject event plugins that do not exist in ' +
	      'the plugin ordering, `%s`.',
	      pluginName
	    ) : invariant(pluginIndex > -1));
	    if (EventPluginRegistry.plugins[pluginIndex]) {
	      continue;
	    }
	    ("production" !== process.env.NODE_ENV ? invariant(
	      PluginModule.extractEvents,
	      'EventPluginRegistry: Event plugins must implement an `extractEvents` ' +
	      'method, but `%s` does not.',
	      pluginName
	    ) : invariant(PluginModule.extractEvents));
	    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
	    var publishedEvents = PluginModule.eventTypes;
	    for (var eventName in publishedEvents) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        publishEventForPlugin(
	          publishedEvents[eventName],
	          PluginModule,
	          eventName
	        ),
	        'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',
	        eventName,
	        pluginName
	      ) : invariant(publishEventForPlugin(
	        publishedEvents[eventName],
	        PluginModule,
	        eventName
	      )));
	    }
	  }
	}

	/**
	 * Publishes an event so that it can be dispatched by the supplied plugin.
	 *
	 * @param {object} dispatchConfig Dispatch configuration for the event.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @return {boolean} True if the event was successfully published.
	 * @private
	 */
	function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName),
	    'EventPluginHub: More than one plugin attempted to publish the same ' +
	    'event name, `%s`.',
	    eventName
	  ) : invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)));
	  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

	  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
	  if (phasedRegistrationNames) {
	    for (var phaseName in phasedRegistrationNames) {
	      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
	        var phasedRegistrationName = phasedRegistrationNames[phaseName];
	        publishRegistrationName(
	          phasedRegistrationName,
	          PluginModule,
	          eventName
	        );
	      }
	    }
	    return true;
	  } else if (dispatchConfig.registrationName) {
	    publishRegistrationName(
	      dispatchConfig.registrationName,
	      PluginModule,
	      eventName
	    );
	    return true;
	  }
	  return false;
	}

	/**
	 * Publishes a registration name that is used to identify dispatched events and
	 * can be used with `EventPluginHub.putListener` to register listeners.
	 *
	 * @param {string} registrationName Registration name to add.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @private
	 */
	function publishRegistrationName(registrationName, PluginModule, eventName) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !EventPluginRegistry.registrationNameModules[registrationName],
	    'EventPluginHub: More than one plugin attempted to publish the same ' +
	    'registration name, `%s`.',
	    registrationName
	  ) : invariant(!EventPluginRegistry.registrationNameModules[registrationName]));
	  EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
	  EventPluginRegistry.registrationNameDependencies[registrationName] =
	    PluginModule.eventTypes[eventName].dependencies;
	}

	/**
	 * Registers plugins so that they can extract and dispatch events.
	 *
	 * @see {EventPluginHub}
	 */
	var EventPluginRegistry = {

	  /**
	   * Ordered list of injected plugins.
	   */
	  plugins: [],

	  /**
	   * Mapping from event name to dispatch config
	   */
	  eventNameDispatchConfigs: {},

	  /**
	   * Mapping from registration name to plugin module
	   */
	  registrationNameModules: {},

	  /**
	   * Mapping from registration name to event name
	   */
	  registrationNameDependencies: {},

	  /**
	   * Injects an ordering of plugins (by plugin name). This allows the ordering
	   * to be decoupled from injection of the actual plugins so that ordering is
	   * always deterministic regardless of packaging, on-the-fly injection, etc.
	   *
	   * @param {array} InjectedEventPluginOrder
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginOrder}
	   */
	  injectEventPluginOrder: function(InjectedEventPluginOrder) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !EventPluginOrder,
	      'EventPluginRegistry: Cannot inject event plugin ordering more than ' +
	      'once. You are likely trying to load more than one copy of React.'
	    ) : invariant(!EventPluginOrder));
	    // Clone the ordering so it cannot be dynamically mutated.
	    EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
	    recomputePluginOrdering();
	  },

	  /**
	   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
	   * in the ordering injected by `injectEventPluginOrder`.
	   *
	   * Plugins can be injected as part of page initialization or on-the-fly.
	   *
	   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginsByName}
	   */
	  injectEventPluginsByName: function(injectedNamesToPlugins) {
	    var isOrderingDirty = false;
	    for (var pluginName in injectedNamesToPlugins) {
	      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
	        continue;
	      }
	      var PluginModule = injectedNamesToPlugins[pluginName];
	      if (!namesToPlugins.hasOwnProperty(pluginName) ||
	          namesToPlugins[pluginName] !== PluginModule) {
	        ("production" !== process.env.NODE_ENV ? invariant(
	          !namesToPlugins[pluginName],
	          'EventPluginRegistry: Cannot inject two different event plugins ' +
	          'using the same name, `%s`.',
	          pluginName
	        ) : invariant(!namesToPlugins[pluginName]));
	        namesToPlugins[pluginName] = PluginModule;
	        isOrderingDirty = true;
	      }
	    }
	    if (isOrderingDirty) {
	      recomputePluginOrdering();
	    }
	  },

	  /**
	   * Looks up the plugin for the supplied event.
	   *
	   * @param {object} event A synthetic event.
	   * @return {?object} The plugin that created the supplied event.
	   * @internal
	   */
	  getPluginModuleForEvent: function(event) {
	    var dispatchConfig = event.dispatchConfig;
	    if (dispatchConfig.registrationName) {
	      return EventPluginRegistry.registrationNameModules[
	        dispatchConfig.registrationName
	      ] || null;
	    }
	    for (var phase in dispatchConfig.phasedRegistrationNames) {
	      if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
	        continue;
	      }
	      var PluginModule = EventPluginRegistry.registrationNameModules[
	        dispatchConfig.phasedRegistrationNames[phase]
	      ];
	      if (PluginModule) {
	        return PluginModule;
	      }
	    }
	    return null;
	  },

	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _resetEventPlugins: function() {
	    EventPluginOrder = null;
	    for (var pluginName in namesToPlugins) {
	      if (namesToPlugins.hasOwnProperty(pluginName)) {
	        delete namesToPlugins[pluginName];
	      }
	    }
	    EventPluginRegistry.plugins.length = 0;

	    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
	    for (var eventName in eventNameDispatchConfigs) {
	      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
	        delete eventNameDispatchConfigs[eventName];
	      }
	    }

	    var registrationNameModules = EventPluginRegistry.registrationNameModules;
	    for (var registrationName in registrationNameModules) {
	      if (registrationNameModules.hasOwnProperty(registrationName)) {
	        delete registrationNameModules[registrationName];
	      }
	    }
	  }

	};

	module.exports = EventPluginRegistry;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactEventEmitterMixin
	 */

	"use strict";

	var EventPluginHub = __webpack_require__(146);

	function runEventQueueInBatch(events) {
	  EventPluginHub.enqueueEvents(events);
	  EventPluginHub.processEventQueue();
	}

	var ReactEventEmitterMixin = {

	  /**
	   * Streams a fired top-level event to `EventPluginHub` where plugins have the
	   * opportunity to create `ReactEvent`s to be dispatched.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {object} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native environment event.
	   */
	  handleTopLevel: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var events = EventPluginHub.extractEvents(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent
	    );

	    runEventQueueInBatch(events);
	  }
	};

	module.exports = ReactEventEmitterMixin;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ViewportMetrics
	 */

	"use strict";

	var getUnboundedScrollPosition = __webpack_require__(166);

	var ViewportMetrics = {

	  currentScrollLeft: 0,

	  currentScrollTop: 0,

	  refreshScrollValues: function() {
	    var scrollPosition = getUnboundedScrollPosition(window);
	    ViewportMetrics.currentScrollLeft = scrollPosition.x;
	    ViewportMetrics.currentScrollTop = scrollPosition.y;
	  }

	};

	module.exports = ViewportMetrics;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventPropagators
	 */

	"use strict";

	var EventConstants = __webpack_require__(84);
	var EventPluginHub = __webpack_require__(146);

	var accumulateInto = __webpack_require__(183);
	var forEachAccumulated = __webpack_require__(184);

	var PropagationPhases = EventConstants.PropagationPhases;
	var getListener = EventPluginHub.getListener;

	/**
	 * Some event types have a notion of different registration names for different
	 * "phases" of propagation. This finds listeners by a given phase.
	 */
	function listenerAtPhase(id, event, propagationPhase) {
	  var registrationName =
	    event.dispatchConfig.phasedRegistrationNames[propagationPhase];
	  return getListener(id, registrationName);
	}

	/**
	 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
	 * here, allows us to not have to bind or create functions for each event.
	 * Mutating the event's members allows us to not have to create a wrapping
	 * "dispatch" object that pairs the event with the listener.
	 */
	function accumulateDirectionalDispatches(domID, upwards, event) {
	  if ("production" !== process.env.NODE_ENV) {
	    if (!domID) {
	      throw new Error('Dispatching id must not be null');
	    }
	  }
	  var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
	  var listener = listenerAtPhase(domID, event, phase);
	  if (listener) {
	    event._dispatchListeners =
	      accumulateInto(event._dispatchListeners, listener);
	    event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
	  }
	}

	/**
	 * Collect dispatches (must be entirely collected before dispatching - see unit
	 * tests). Lazily allocate the array to conserve memory.  We must loop through
	 * each event and perform the traversal for each one. We can not perform a
	 * single traversal for the entire collection of events because each event may
	 * have a different target.
	 */
	function accumulateTwoPhaseDispatchesSingle(event) {
	  if (event && event.dispatchConfig.phasedRegistrationNames) {
	    EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(
	      event.dispatchMarker,
	      accumulateDirectionalDispatches,
	      event
	    );
	  }
	}


	/**
	 * Accumulates without regard to direction, does not look for phased
	 * registration names. Same as `accumulateDirectDispatchesSingle` but without
	 * requiring that the `dispatchMarker` be the same as the dispatched ID.
	 */
	function accumulateDispatches(id, ignoredDirection, event) {
	  if (event && event.dispatchConfig.registrationName) {
	    var registrationName = event.dispatchConfig.registrationName;
	    var listener = getListener(id, registrationName);
	    if (listener) {
	      event._dispatchListeners =
	        accumulateInto(event._dispatchListeners, listener);
	      event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
	    }
	  }
	}

	/**
	 * Accumulates dispatches on an `SyntheticEvent`, but only for the
	 * `dispatchMarker`.
	 * @param {SyntheticEvent} event
	 */
	function accumulateDirectDispatchesSingle(event) {
	  if (event && event.dispatchConfig.registrationName) {
	    accumulateDispatches(event.dispatchMarker, null, event);
	  }
	}

	function accumulateTwoPhaseDispatches(events) {
	  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
	}

	function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
	  EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(
	    fromID,
	    toID,
	    accumulateDispatches,
	    leave,
	    enter
	  );
	}


	function accumulateDirectDispatches(events) {
	  forEachAccumulated(events, accumulateDirectDispatchesSingle);
	}



	/**
	 * A small set of propagation patterns, each of which will accept a small amount
	 * of information, and generate a set of "dispatch ready event objects" - which
	 * are sets of events that have already been annotated with a set of dispatched
	 * listener functions/ids. The API is designed this way to discourage these
	 * propagation strategies from actually executing the dispatches, since we
	 * always want to collect the entire set of dispatches before executing event a
	 * single one.
	 *
	 * @constructor EventPropagators
	 */
	var EventPropagators = {
	  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
	  accumulateDirectDispatches: accumulateDirectDispatches,
	  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
	};

	module.exports = EventPropagators;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticInputEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticEvent = __webpack_require__(152);

	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
	 *      /#events-inputevents
	 */
	var InputEventInterface = {
	  data: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticInputEvent(
	  dispatchConfig,
	  dispatchMarker,
	  nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticEvent.augmentClass(
	  SyntheticInputEvent,
	  InputEventInterface
	);

	module.exports = SyntheticInputEvent;



/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticEvent
	 * @typechecks static-only
	 */

	"use strict";

	var PooledClass = __webpack_require__(85);

	var assign = __webpack_require__(72);
	var emptyFunction = __webpack_require__(133);
	var getEventTarget = __webpack_require__(165);

	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var EventInterface = {
	  type: null,
	  target: getEventTarget,
	  // currentTarget is set when dispatching; no use in copying it here
	  currentTarget: emptyFunction.thatReturnsNull,
	  eventPhase: null,
	  bubbles: null,
	  cancelable: null,
	  timeStamp: function(event) {
	    return event.timeStamp || Date.now();
	  },
	  defaultPrevented: null,
	  isTrusted: null
	};

	/**
	 * Synthetic events are dispatched by event plugins, typically in response to a
	 * top-level event delegation handler.
	 *
	 * These systems should generally use pooling to reduce the frequency of garbage
	 * collection. The system should check `isPersistent` to determine whether the
	 * event should be released into the pool after being dispatched. Users that
	 * need a persisted event should invoke `persist`.
	 *
	 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
	 * normalizing browser quirks. Subclasses do not necessarily have to implement a
	 * DOM interface; custom application-specific events can also subclass this.
	 *
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 */
	function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  this.dispatchConfig = dispatchConfig;
	  this.dispatchMarker = dispatchMarker;
	  this.nativeEvent = nativeEvent;

	  var Interface = this.constructor.Interface;
	  for (var propName in Interface) {
	    if (!Interface.hasOwnProperty(propName)) {
	      continue;
	    }
	    var normalize = Interface[propName];
	    if (normalize) {
	      this[propName] = normalize(nativeEvent);
	    } else {
	      this[propName] = nativeEvent[propName];
	    }
	  }

	  var defaultPrevented = nativeEvent.defaultPrevented != null ?
	    nativeEvent.defaultPrevented :
	    nativeEvent.returnValue === false;
	  if (defaultPrevented) {
	    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
	  } else {
	    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
	  }
	  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
	}

	assign(SyntheticEvent.prototype, {

	  preventDefault: function() {
	    this.defaultPrevented = true;
	    var event = this.nativeEvent;
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
	  },

	  stopPropagation: function() {
	    var event = this.nativeEvent;
	    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
	  },

	  /**
	   * We release all dispatched `SyntheticEvent`s after each event loop, adding
	   * them back into the pool. This allows a way to hold onto a reference that
	   * won't be added back into the pool.
	   */
	  persist: function() {
	    this.isPersistent = emptyFunction.thatReturnsTrue;
	  },

	  /**
	   * Checks if this event should be released back into the pool.
	   *
	   * @return {boolean} True if this should not be released, false otherwise.
	   */
	  isPersistent: emptyFunction.thatReturnsFalse,

	  /**
	   * `PooledClass` looks for `destructor` on each instance it releases.
	   */
	  destructor: function() {
	    var Interface = this.constructor.Interface;
	    for (var propName in Interface) {
	      this[propName] = null;
	    }
	    this.dispatchConfig = null;
	    this.dispatchMarker = null;
	    this.nativeEvent = null;
	  }

	});

	SyntheticEvent.Interface = EventInterface;

	/**
	 * Helper to reduce boilerplate when creating subclasses.
	 *
	 * @param {function} Class
	 * @param {?object} Interface
	 */
	SyntheticEvent.augmentClass = function(Class, Interface) {
	  var Super = this;

	  var prototype = Object.create(Super.prototype);
	  assign(prototype, Class.prototype);
	  Class.prototype = prototype;
	  Class.prototype.constructor = Class;

	  Class.Interface = assign({}, Super.Interface, Interface);
	  Class.augmentClass = Super.augmentClass;

	  PooledClass.addPoolingTo(Class, PooledClass.threeArgumentPooler);
	};

	PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);

	module.exports = SyntheticEvent;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isTextInputElement
	 */

	"use strict";

	/**
	 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
	 */
	var supportedInputTypes = {
	  'color': true,
	  'date': true,
	  'datetime': true,
	  'datetime-local': true,
	  'email': true,
	  'month': true,
	  'number': true,
	  'password': true,
	  'range': true,
	  'search': true,
	  'tel': true,
	  'text': true,
	  'time': true,
	  'url': true,
	  'week': true
	};

	function isTextInputElement(elem) {
	  return elem && (
	    (elem.nodeName === 'INPUT' && supportedInputTypes[elem.type]) ||
	    elem.nodeName === 'TEXTAREA'
	  );
	}

	module.exports = isTextInputElement;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInputSelection
	 */

	"use strict";

	var ReactDOMSelection = __webpack_require__(186);

	var containsNode = __webpack_require__(129);
	var focusNode = __webpack_require__(187);
	var getActiveElement = __webpack_require__(167);

	function isInDocument(node) {
	  return containsNode(document.documentElement, node);
	}

	/**
	 * @ReactInputSelection: React input selection module. Based on Selection.js,
	 * but modified to be suitable for react and has a couple of bug fixes (doesn't
	 * assume buttons have range selections allowed).
	 * Input selection module for React.
	 */
	var ReactInputSelection = {

	  hasSelectionCapabilities: function(elem) {
	    return elem && (
	      (elem.nodeName === 'INPUT' && elem.type === 'text') ||
	      elem.nodeName === 'TEXTAREA' ||
	      elem.contentEditable === 'true'
	    );
	  },

	  getSelectionInformation: function() {
	    var focusedElem = getActiveElement();
	    return {
	      focusedElem: focusedElem,
	      selectionRange:
	          ReactInputSelection.hasSelectionCapabilities(focusedElem) ?
	          ReactInputSelection.getSelection(focusedElem) :
	          null
	    };
	  },

	  /**
	   * @restoreSelection: If any selection information was potentially lost,
	   * restore it. This is useful when performing operations that could remove dom
	   * nodes and place them back in, resulting in focus being lost.
	   */
	  restoreSelection: function(priorSelectionInformation) {
	    var curFocusedElem = getActiveElement();
	    var priorFocusedElem = priorSelectionInformation.focusedElem;
	    var priorSelectionRange = priorSelectionInformation.selectionRange;
	    if (curFocusedElem !== priorFocusedElem &&
	        isInDocument(priorFocusedElem)) {
	      if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
	        ReactInputSelection.setSelection(
	          priorFocusedElem,
	          priorSelectionRange
	        );
	      }
	      focusNode(priorFocusedElem);
	    }
	  },

	  /**
	   * @getSelection: Gets the selection bounds of a focused textarea, input or
	   * contentEditable node.
	   * -@input: Look up selection bounds of this input
	   * -@return {start: selectionStart, end: selectionEnd}
	   */
	  getSelection: function(input) {
	    var selection;

	    if ('selectionStart' in input) {
	      // Modern browser with input or textarea.
	      selection = {
	        start: input.selectionStart,
	        end: input.selectionEnd
	      };
	    } else if (document.selection && input.nodeName === 'INPUT') {
	      // IE8 input.
	      var range = document.selection.createRange();
	      // There can only be one selection per document in IE, so it must
	      // be in our element.
	      if (range.parentElement() === input) {
	        selection = {
	          start: -range.moveStart('character', -input.value.length),
	          end: -range.moveEnd('character', -input.value.length)
	        };
	      }
	    } else {
	      // Content editable or old IE textarea.
	      selection = ReactDOMSelection.getOffsets(input);
	    }

	    return selection || {start: 0, end: 0};
	  },

	  /**
	   * @setSelection: Sets the selection bounds of a textarea or input and focuses
	   * the input.
	   * -@input     Set selection bounds of this input or textarea
	   * -@offsets   Object of same form that is returned from get*
	   */
	  setSelection: function(input, offsets) {
	    var start = offsets.start;
	    var end = offsets.end;
	    if (typeof end === 'undefined') {
	      end = start;
	    }

	    if ('selectionStart' in input) {
	      input.selectionStart = start;
	      input.selectionEnd = Math.min(end, input.value.length);
	    } else if (document.selection && input.nodeName === 'INPUT') {
	      var range = input.createTextRange();
	      range.collapse(true);
	      range.moveStart('character', start);
	      range.moveEnd('character', end - start);
	      range.select();
	    } else {
	      ReactDOMSelection.setOffsets(input, offsets);
	    }
	  }
	};

	module.exports = ReactInputSelection;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticCompositionEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticEvent = __webpack_require__(152);

	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
	 */
	var CompositionEventInterface = {
	  data: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticCompositionEvent(
	  dispatchConfig,
	  dispatchMarker,
	  nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticEvent.augmentClass(
	  SyntheticCompositionEvent,
	  CompositionEventInterface
	);

	module.exports = SyntheticCompositionEvent;



/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getTextContentAccessor
	 */

	"use strict";

	var ExecutionEnvironment = __webpack_require__(75);

	var contentKey = null;

	/**
	 * Gets the key used to access text content on a DOM node.
	 *
	 * @return {?string} Key used to access text content.
	 * @internal
	 */
	function getTextContentAccessor() {
	  if (!contentKey && ExecutionEnvironment.canUseDOM) {
	    // Prefer textContent to innerText because many browsers support both but
	    // SVG <text> elements don't support innerText even when <div> does.
	    contentKey = 'textContent' in document.documentElement ?
	      'textContent' :
	      'innerText';
	  }
	  return contentKey;
	}

	module.exports = getTextContentAccessor;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticMouseEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticUIEvent = __webpack_require__(174);
	var ViewportMetrics = __webpack_require__(149);

	var getEventModifierState = __webpack_require__(189);

	/**
	 * @interface MouseEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var MouseEventInterface = {
	  screenX: null,
	  screenY: null,
	  clientX: null,
	  clientY: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  getModifierState: getEventModifierState,
	  button: function(event) {
	    // Webkit, Firefox, IE9+
	    // which:  1 2 3
	    // button: 0 1 2 (standard)
	    var button = event.button;
	    if ('which' in event) {
	      return button;
	    }
	    // IE<9
	    // which:  undefined
	    // button: 0 0 0
	    // button: 1 4 2 (onmouseup)
	    return button === 2 ? 2 : button === 4 ? 1 : 0;
	  },
	  buttons: null,
	  relatedTarget: function(event) {
	    return event.relatedTarget || (
	      event.fromElement === event.srcElement ?
	        event.toElement :
	        event.fromElement
	    );
	  },
	  // "Proprietary" Interface.
	  pageX: function(event) {
	    return 'pageX' in event ?
	      event.pageX :
	      event.clientX + ViewportMetrics.currentScrollLeft;
	  },
	  pageY: function(event) {
	    return 'pageY' in event ?
	      event.pageY :
	      event.clientY + ViewportMetrics.currentScrollTop;
	  }
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);

	module.exports = SyntheticMouseEvent;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMIDOperations
	 * @typechecks static-only
	 */

	/*jslint evil: true */

	"use strict";

	var CSSPropertyOperations = __webpack_require__(99);
	var DOMChildrenOperations = __webpack_require__(188);
	var DOMPropertyOperations = __webpack_require__(52);
	var ReactMount = __webpack_require__(66);
	var ReactPerf = __webpack_require__(68);

	var invariant = __webpack_require__(49);
	var setInnerHTML = __webpack_require__(160);

	/**
	 * Errors for properties that should not be updated with `updatePropertyById()`.
	 *
	 * @type {object}
	 * @private
	 */
	var INVALID_PROPERTY_ERRORS = {
	  dangerouslySetInnerHTML:
	    '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
	  style: '`style` must be set using `updateStylesByID()`.'
	};

	/**
	 * Operations used to process updates to DOM nodes. This is made injectable via
	 * `ReactComponent.BackendIDOperations`.
	 */
	var ReactDOMIDOperations = {

	  /**
	   * Updates a DOM node with new property values. This should only be used to
	   * update DOM properties in `DOMProperty`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} name A valid property name, see `DOMProperty`.
	   * @param {*} value New value of the property.
	   * @internal
	   */
	  updatePropertyByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'updatePropertyByID',
	    function(id, name, value) {
	      var node = ReactMount.getNode(id);
	      ("production" !== process.env.NODE_ENV ? invariant(
	        !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
	        'updatePropertyByID(...): %s',
	        INVALID_PROPERTY_ERRORS[name]
	      ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));

	      // If we're updating to null or undefined, we should remove the property
	      // from the DOM node instead of inadvertantly setting to a string. This
	      // brings us in line with the same behavior we have on initial render.
	      if (value != null) {
	        DOMPropertyOperations.setValueForProperty(node, name, value);
	      } else {
	        DOMPropertyOperations.deleteValueForProperty(node, name);
	      }
	    }
	  ),

	  /**
	   * Updates a DOM node to remove a property. This should only be used to remove
	   * DOM properties in `DOMProperty`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} name A property name to remove, see `DOMProperty`.
	   * @internal
	   */
	  deletePropertyByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'deletePropertyByID',
	    function(id, name, value) {
	      var node = ReactMount.getNode(id);
	      ("production" !== process.env.NODE_ENV ? invariant(
	        !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
	        'updatePropertyByID(...): %s',
	        INVALID_PROPERTY_ERRORS[name]
	      ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
	      DOMPropertyOperations.deleteValueForProperty(node, name, value);
	    }
	  ),

	  /**
	   * Updates a DOM node with new style values. If a value is specified as '',
	   * the corresponding style property will be unset.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {object} styles Mapping from styles to values.
	   * @internal
	   */
	  updateStylesByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'updateStylesByID',
	    function(id, styles) {
	      var node = ReactMount.getNode(id);
	      CSSPropertyOperations.setValueForStyles(node, styles);
	    }
	  ),

	  /**
	   * Updates a DOM node's innerHTML.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} html An HTML string.
	   * @internal
	   */
	  updateInnerHTMLByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'updateInnerHTMLByID',
	    function(id, html) {
	      var node = ReactMount.getNode(id);
	      setInnerHTML(node, html);
	    }
	  ),

	  /**
	   * Updates a DOM node's text content set by `props.content`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} content Text content.
	   * @internal
	   */
	  updateTextContentByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'updateTextContentByID',
	    function(id, content) {
	      var node = ReactMount.getNode(id);
	      DOMChildrenOperations.updateTextContent(node, content);
	    }
	  ),

	  /**
	   * Replaces a DOM node that exists in the document with markup.
	   *
	   * @param {string} id ID of child to be replaced.
	   * @param {string} markup Dangerous markup to inject in place of child.
	   * @internal
	   * @see {Danger.dangerouslyReplaceNodeWithMarkup}
	   */
	  dangerouslyReplaceNodeWithMarkupByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'dangerouslyReplaceNodeWithMarkupByID',
	    function(id, markup) {
	      var node = ReactMount.getNode(id);
	      DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
	    }
	  ),

	  /**
	   * Updates a component's children by processing a series of updates.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @param {array<string>} markup List of markup strings.
	   * @internal
	   */
	  dangerouslyProcessChildrenUpdates: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'dangerouslyProcessChildrenUpdates',
	    function(updates, markup) {
	      for (var i = 0; i < updates.length; i++) {
	        updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
	      }
	      DOMChildrenOperations.processUpdates(updates, markup);
	    }
	  )
	};

	module.exports = ReactDOMIDOperations;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactReconcileTransaction
	 * @typechecks static-only
	 */

	"use strict";

	var CallbackQueue = __webpack_require__(138);
	var PooledClass = __webpack_require__(85);
	var ReactBrowserEventEmitter = __webpack_require__(101);
	var ReactInputSelection = __webpack_require__(154);
	var ReactPutListenerQueue = __webpack_require__(180);
	var Transaction = __webpack_require__(139);

	var assign = __webpack_require__(72);

	/**
	 * Ensures that, when possible, the selection range (currently selected text
	 * input) is not disturbed by performing the transaction.
	 */
	var SELECTION_RESTORATION = {
	  /**
	   * @return {Selection} Selection information.
	   */
	  initialize: ReactInputSelection.getSelectionInformation,
	  /**
	   * @param {Selection} sel Selection information returned from `initialize`.
	   */
	  close: ReactInputSelection.restoreSelection
	};

	/**
	 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
	 * high level DOM manipulations (like temporarily removing a text input from the
	 * DOM).
	 */
	var EVENT_SUPPRESSION = {
	  /**
	   * @return {boolean} The enabled status of `ReactBrowserEventEmitter` before
	   * the reconciliation.
	   */
	  initialize: function() {
	    var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
	    ReactBrowserEventEmitter.setEnabled(false);
	    return currentlyEnabled;
	  },

	  /**
	   * @param {boolean} previouslyEnabled Enabled status of
	   *   `ReactBrowserEventEmitter` before the reconciliation occured. `close`
	   *   restores the previous value.
	   */
	  close: function(previouslyEnabled) {
	    ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
	  }
	};

	/**
	 * Provides a queue for collecting `componentDidMount` and
	 * `componentDidUpdate` callbacks during the the transaction.
	 */
	var ON_DOM_READY_QUEUEING = {
	  /**
	   * Initializes the internal `onDOMReady` queue.
	   */
	  initialize: function() {
	    this.reactMountReady.reset();
	  },

	  /**
	   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
	   */
	  close: function() {
	    this.reactMountReady.notifyAll();
	  }
	};

	var PUT_LISTENER_QUEUEING = {
	  initialize: function() {
	    this.putListenerQueue.reset();
	  },

	  close: function() {
	    this.putListenerQueue.putListeners();
	  }
	};

	/**
	 * Executed within the scope of the `Transaction` instance. Consider these as
	 * being member methods, but with an implied ordering while being isolated from
	 * each other.
	 */
	var TRANSACTION_WRAPPERS = [
	  PUT_LISTENER_QUEUEING,
	  SELECTION_RESTORATION,
	  EVENT_SUPPRESSION,
	  ON_DOM_READY_QUEUEING
	];

	/**
	 * Currently:
	 * - The order that these are listed in the transaction is critical:
	 * - Suppresses events.
	 * - Restores selection range.
	 *
	 * Future:
	 * - Restore document/overflow scroll positions that were unintentionally
	 *   modified via DOM insertions above the top viewport boundary.
	 * - Implement/integrate with customized constraint based layout system and keep
	 *   track of which dimensions must be remeasured.
	 *
	 * @class ReactReconcileTransaction
	 */
	function ReactReconcileTransaction() {
	  this.reinitializeTransaction();
	  // Only server-side rendering really needs this option (see
	  // `ReactServerRendering`), but server-side uses
	  // `ReactServerRenderingTransaction` instead. This option is here so that it's
	  // accessible and defaults to false when `ReactDOMComponent` and
	  // `ReactTextComponent` checks it in `mountComponent`.`
	  this.renderToStaticMarkup = false;
	  this.reactMountReady = CallbackQueue.getPooled(null);
	  this.putListenerQueue = ReactPutListenerQueue.getPooled();
	}

	var Mixin = {
	  /**
	   * @see Transaction
	   * @abstract
	   * @final
	   * @return {array<object>} List of operation wrap proceedures.
	   *   TODO: convert to array<TransactionWrapper>
	   */
	  getTransactionWrappers: function() {
	    return TRANSACTION_WRAPPERS;
	  },

	  /**
	   * @return {object} The queue to collect `onDOMReady` callbacks with.
	   */
	  getReactMountReady: function() {
	    return this.reactMountReady;
	  },

	  getPutListenerQueue: function() {
	    return this.putListenerQueue;
	  },

	  /**
	   * `PooledClass` looks for this, and will invoke this before allowing this
	   * instance to be resused.
	   */
	  destructor: function() {
	    CallbackQueue.release(this.reactMountReady);
	    this.reactMountReady = null;

	    ReactPutListenerQueue.release(this.putListenerQueue);
	    this.putListenerQueue = null;
	  }
	};


	assign(ReactReconcileTransaction.prototype, Transaction.Mixin, Mixin);

	PooledClass.addPoolingTo(ReactReconcileTransaction);

	module.exports = ReactReconcileTransaction;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule setInnerHTML
	 */

	"use strict";

	var ExecutionEnvironment = __webpack_require__(75);

	var WHITESPACE_TEST = /^[ \r\n\t\f]/;
	var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;

	/**
	 * Set the innerHTML property of a node, ensuring that whitespace is preserved
	 * even in IE8.
	 *
	 * @param {DOMElement} node
	 * @param {string} html
	 * @internal
	 */
	var setInnerHTML = function(node, html) {
	  node.innerHTML = html;
	};

	if (ExecutionEnvironment.canUseDOM) {
	  // IE8: When updating a just created node with innerHTML only leading
	  // whitespace is removed. When updating an existing node with innerHTML
	  // whitespace in root TextNodes is also collapsed.
	  // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html

	  // Feature detection; only IE8 is known to behave improperly like this.
	  var testElement = document.createElement('div');
	  testElement.innerHTML = ' ';
	  if (testElement.innerHTML === '') {
	    setInnerHTML = function(node, html) {
	      // Magic theory: IE8 supposedly differentiates between added and updated
	      // nodes when processing innerHTML, innerHTML on updated nodes suffers
	      // from worse whitespace behavior. Re-adding a node like this triggers
	      // the initial and more favorable whitespace behavior.
	      // TODO: What to do on a detached node?
	      if (node.parentNode) {
	        node.parentNode.replaceChild(node, node);
	      }

	      // We also implement a workaround for non-visible tags disappearing into
	      // thin air on IE8, this only happens if there is no visible text
	      // in-front of the non-visible tags. Piggyback on the whitespace fix
	      // and simply check if any non-visible tags appear in the source.
	      if (WHITESPACE_TEST.test(html) ||
	          html[0] === '<' && NONVISIBLE_TEST.test(html)) {
	        // Recover leading whitespace by temporarily prepending any character.
	        // \uFEFF has the potential advantage of being zero-width/invisible.
	        node.innerHTML = '\uFEFF' + html;

	        // deleteData leaves an empty `TextNode` which offsets the index of all
	        // children. Definitely want to avoid this.
	        var textNode = node.firstChild;
	        if (textNode.data.length === 1) {
	          node.removeChild(textNode);
	        } else {
	          textNode.deleteData(0, 1);
	        }
	      } else {
	        node.innerHTML = html;
	      }
	    };
	  }
	}

	module.exports = setInnerHTML;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule AutoFocusMixin
	 * @typechecks static-only
	 */

	"use strict";

	var focusNode = __webpack_require__(187);

	var AutoFocusMixin = {
	  componentDidMount: function() {
	    if (this.props.autoFocus) {
	      focusNode(this.getDOMNode());
	    }
	  }
	};

	module.exports = AutoFocusMixin;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule LocalEventTrapMixin
	 */

	"use strict";

	var ReactBrowserEventEmitter = __webpack_require__(101);

	var accumulateInto = __webpack_require__(183);
	var forEachAccumulated = __webpack_require__(184);
	var invariant = __webpack_require__(49);

	function remove(event) {
	  event.remove();
	}

	var LocalEventTrapMixin = {
	  trapBubbledEvent:function(topLevelType, handlerBaseName) {
	    ("production" !== process.env.NODE_ENV ? invariant(this.isMounted(), 'Must be mounted to trap events') : invariant(this.isMounted()));
	    var listener = ReactBrowserEventEmitter.trapBubbledEvent(
	      topLevelType,
	      handlerBaseName,
	      this.getDOMNode()
	    );
	    this._localEventListeners =
	      accumulateInto(this._localEventListeners, listener);
	  },

	  // trapCapturedEvent would look nearly identical. We don't implement that
	  // method because it isn't currently needed.

	  componentWillUnmount:function() {
	    if (this._localEventListeners) {
	      forEachAccumulated(this._localEventListeners, remove);
	    }
	  }
	};

	module.exports = LocalEventTrapMixin;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule LinkedValueUtils
	 * @typechecks static-only
	 */

	"use strict";

	var ReactPropTypes = __webpack_require__(69);

	var invariant = __webpack_require__(49);

	var hasReadOnlyValue = {
	  'button': true,
	  'checkbox': true,
	  'image': true,
	  'hidden': true,
	  'radio': true,
	  'reset': true,
	  'submit': true
	};

	function _assertSingleLink(input) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    input.props.checkedLink == null || input.props.valueLink == null,
	    'Cannot provide a checkedLink and a valueLink. If you want to use ' +
	    'checkedLink, you probably don\'t want to use valueLink and vice versa.'
	  ) : invariant(input.props.checkedLink == null || input.props.valueLink == null));
	}
	function _assertValueLink(input) {
	  _assertSingleLink(input);
	  ("production" !== process.env.NODE_ENV ? invariant(
	    input.props.value == null && input.props.onChange == null,
	    'Cannot provide a valueLink and a value or onChange event. If you want ' +
	    'to use value or onChange, you probably don\'t want to use valueLink.'
	  ) : invariant(input.props.value == null && input.props.onChange == null));
	}

	function _assertCheckedLink(input) {
	  _assertSingleLink(input);
	  ("production" !== process.env.NODE_ENV ? invariant(
	    input.props.checked == null && input.props.onChange == null,
	    'Cannot provide a checkedLink and a checked property or onChange event. ' +
	    'If you want to use checked or onChange, you probably don\'t want to ' +
	    'use checkedLink'
	  ) : invariant(input.props.checked == null && input.props.onChange == null));
	}

	/**
	 * @param {SyntheticEvent} e change event to handle
	 */
	function _handleLinkedValueChange(e) {
	  /*jshint validthis:true */
	  this.props.valueLink.requestChange(e.target.value);
	}

	/**
	  * @param {SyntheticEvent} e change event to handle
	  */
	function _handleLinkedCheckChange(e) {
	  /*jshint validthis:true */
	  this.props.checkedLink.requestChange(e.target.checked);
	}

	/**
	 * Provide a linked `value` attribute for controlled forms. You should not use
	 * this outside of the ReactDOM controlled form components.
	 */
	var LinkedValueUtils = {
	  Mixin: {
	    propTypes: {
	      value: function(props, propName, componentName) {
	        if (!props[propName] ||
	            hasReadOnlyValue[props.type] ||
	            props.onChange ||
	            props.readOnly ||
	            props.disabled) {
	          return;
	        }
	        return new Error(
	          'You provided a `value` prop to a form field without an ' +
	          '`onChange` handler. This will render a read-only field. If ' +
	          'the field should be mutable use `defaultValue`. Otherwise, ' +
	          'set either `onChange` or `readOnly`.'
	        );
	      },
	      checked: function(props, propName, componentName) {
	        if (!props[propName] ||
	            props.onChange ||
	            props.readOnly ||
	            props.disabled) {
	          return;
	        }
	        return new Error(
	          'You provided a `checked` prop to a form field without an ' +
	          '`onChange` handler. This will render a read-only field. If ' +
	          'the field should be mutable use `defaultChecked`. Otherwise, ' +
	          'set either `onChange` or `readOnly`.'
	        );
	      },
	      onChange: ReactPropTypes.func
	    }
	  },

	  /**
	   * @param {ReactComponent} input Form component
	   * @return {*} current value of the input either from value prop or link.
	   */
	  getValue: function(input) {
	    if (input.props.valueLink) {
	      _assertValueLink(input);
	      return input.props.valueLink.value;
	    }
	    return input.props.value;
	  },

	  /**
	   * @param {ReactComponent} input Form component
	   * @return {*} current checked status of the input either from checked prop
	   *             or link.
	   */
	  getChecked: function(input) {
	    if (input.props.checkedLink) {
	      _assertCheckedLink(input);
	      return input.props.checkedLink.value;
	    }
	    return input.props.checked;
	  },

	  /**
	   * @param {ReactComponent} input Form component
	   * @return {function} change callback either from onChange prop or link.
	   */
	  getOnChange: function(input) {
	    if (input.props.valueLink) {
	      _assertValueLink(input);
	      return _handleLinkedValueChange;
	    } else if (input.props.checkedLink) {
	      _assertCheckedLink(input);
	      return _handleLinkedCheckChange;
	    }
	    return input.props.onChange;
	  }
	};

	module.exports = LinkedValueUtils;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 164 */
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
	 * @providesModule EventListener
	 * @typechecks
	 */

	var emptyFunction = __webpack_require__(133);

	/**
	 * Upstream version of event listener. Does not take into account specific
	 * nature of platform.
	 */
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  },

	  /**
	   * Listen to DOM events during the capture phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  capture: function(target, eventType, callback) {
	    if (!target.addEventListener) {
	      if ("production" !== process.env.NODE_ENV) {
	        console.error(
	          'Attempted to listen to events during the capture phase on a ' +
	          'browser that does not support the capture phase. Your application ' +
	          'will not receive some events.'
	        );
	      }
	      return {
	        remove: emptyFunction
	      };
	    } else {
	      target.addEventListener(eventType, callback, true);
	      return {
	        remove: function() {
	          target.removeEventListener(eventType, callback, true);
	        }
	      };
	    }
	  },

	  registerDefault: function() {}
	};

	module.exports = EventListener;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getEventTarget
	 * @typechecks static-only
	 */

	"use strict";

	/**
	 * Gets the target node from a native browser event by accounting for
	 * inconsistencies in browser DOM APIs.
	 *
	 * @param {object} nativeEvent Native browser event.
	 * @return {DOMEventTarget} Target node.
	 */
	function getEventTarget(nativeEvent) {
	  var target = nativeEvent.target || nativeEvent.srcElement || window;
	  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
	  // @see http://www.quirksmode.org/js/events_properties.html
	  return target.nodeType === 3 ? target.parentNode : target;
	}

	module.exports = getEventTarget;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getUnboundedScrollPosition
	 * @typechecks
	 */

	"use strict";

	/**
	 * Gets the scroll position of the supplied element or window.
	 *
	 * The return values are unbounded, unlike `getScrollPosition`. This means they
	 * may be negative or exceed the element boundaries (which is possible using
	 * inertial scrolling).
	 *
	 * @param {DOMWindow|DOMElement} scrollable
	 * @return {object} Map with `x` and `y` keys.
	 */
	function getUnboundedScrollPosition(scrollable) {
	  if (scrollable === window) {
	    return {
	      x: window.pageXOffset || document.documentElement.scrollLeft,
	      y: window.pageYOffset || document.documentElement.scrollTop
	    };
	  }
	  return {
	    x: scrollable.scrollLeft,
	    y: scrollable.scrollTop
	  };
	}

	module.exports = getUnboundedScrollPosition;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getActiveElement
	 * @typechecks
	 */

	/**
	 * Same as document.activeElement but wraps in a try-catch block. In IE it is
	 * not safe to call document.activeElement if there is nothing focused.
	 *
	 * The activeElement will be null only if the document body is not yet defined.
	 */
	function getActiveElement() /*?DOMElement*/ {
	  try {
	    return document.activeElement || document.body;
	  } catch (e) {
	    return document.body;
	  }
	}

	module.exports = getActiveElement;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 */

	"use strict";

	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) &&
	        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = shallowEqual;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticClipboardEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticEvent = __webpack_require__(152);

	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/clipboard-apis/
	 */
	var ClipboardEventInterface = {
	  clipboardData: function(event) {
	    return (
	      'clipboardData' in event ?
	        event.clipboardData :
	        window.clipboardData
	    );
	  }
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);

	module.exports = SyntheticClipboardEvent;



/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticFocusEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticUIEvent = __webpack_require__(174);

	/**
	 * @interface FocusEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var FocusEventInterface = {
	  relatedTarget: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);

	module.exports = SyntheticFocusEvent;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticKeyboardEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticUIEvent = __webpack_require__(174);

	var getEventCharCode = __webpack_require__(176);
	var getEventKey = __webpack_require__(190);
	var getEventModifierState = __webpack_require__(189);

	/**
	 * @interface KeyboardEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var KeyboardEventInterface = {
	  key: getEventKey,
	  location: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  repeat: null,
	  locale: null,
	  getModifierState: getEventModifierState,
	  // Legacy Interface
	  charCode: function(event) {
	    // `charCode` is the result of a KeyPress event and represents the value of
	    // the actual printable character.

	    // KeyPress is deprecated, but its replacement is not yet final and not
	    // implemented in any major browser. Only KeyPress has charCode.
	    if (event.type === 'keypress') {
	      return getEventCharCode(event);
	    }
	    return 0;
	  },
	  keyCode: function(event) {
	    // `keyCode` is the result of a KeyDown/Up event and represents the value of
	    // physical keyboard key.

	    // The actual meaning of the value depends on the users' keyboard layout
	    // which cannot be detected. Assuming that it is a US keyboard layout
	    // provides a surprisingly accurate mapping for US and European users.
	    // Due to this, it is left to the user to implement at this time.
	    if (event.type === 'keydown' || event.type === 'keyup') {
	      return event.keyCode;
	    }
	    return 0;
	  },
	  which: function(event) {
	    // `which` is an alias for either `keyCode` or `charCode` depending on the
	    // type of the event.
	    if (event.type === 'keypress') {
	      return getEventCharCode(event);
	    }
	    if (event.type === 'keydown' || event.type === 'keyup') {
	      return event.keyCode;
	    }
	    return 0;
	  }
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);

	module.exports = SyntheticKeyboardEvent;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticDragEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticMouseEvent = __webpack_require__(157);

	/**
	 * @interface DragEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var DragEventInterface = {
	  dataTransfer: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);

	module.exports = SyntheticDragEvent;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticTouchEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticUIEvent = __webpack_require__(174);

	var getEventModifierState = __webpack_require__(189);

	/**
	 * @interface TouchEvent
	 * @see http://www.w3.org/TR/touch-events/
	 */
	var TouchEventInterface = {
	  touches: null,
	  targetTouches: null,
	  changedTouches: null,
	  altKey: null,
	  metaKey: null,
	  ctrlKey: null,
	  shiftKey: null,
	  getModifierState: getEventModifierState
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);

	module.exports = SyntheticTouchEvent;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticUIEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticEvent = __webpack_require__(152);

	var getEventTarget = __webpack_require__(165);

	/**
	 * @interface UIEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var UIEventInterface = {
	  view: function(event) {
	    if (event.view) {
	      return event.view;
	    }

	    var target = getEventTarget(event);
	    if (target != null && target.window === target) {
	      // target is a window object
	      return target;
	    }

	    var doc = target.ownerDocument;
	    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
	    if (doc) {
	      return doc.defaultView || doc.parentWindow;
	    } else {
	      return window;
	    }
	  },
	  detail: function(event) {
	    return event.detail || 0;
	  }
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticEvent}
	 */
	function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

	module.exports = SyntheticUIEvent;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticWheelEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticMouseEvent = __webpack_require__(157);

	/**
	 * @interface WheelEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var WheelEventInterface = {
	  deltaX: function(event) {
	    return (
	      'deltaX' in event ? event.deltaX :
	      // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
	      'wheelDeltaX' in event ? -event.wheelDeltaX : 0
	    );
	  },
	  deltaY: function(event) {
	    return (
	      'deltaY' in event ? event.deltaY :
	      // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
	      'wheelDeltaY' in event ? -event.wheelDeltaY :
	      // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
	      'wheelDelta' in event ? -event.wheelDelta : 0
	    );
	  },
	  deltaZ: null,

	  // Browsers without "deltaMode" is reporting in raw wheel delta where one
	  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
	  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
	  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
	  deltaMode: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticMouseEvent}
	 */
	function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);

	module.exports = SyntheticWheelEvent;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getEventCharCode
	 * @typechecks static-only
	 */

	"use strict";

	/**
	 * `charCode` represents the actual "character code" and is safe to use with
	 * `String.fromCharCode`. As such, only keys that correspond to printable
	 * characters produce a valid `charCode`, the only exception to this is Enter.
	 * The Tab-key is considered non-printable and does not have a `charCode`,
	 * presumably because it does not produce a tab-character in browsers.
	 *
	 * @param {object} nativeEvent Native browser event.
	 * @return {string} Normalized `charCode` property.
	 */
	function getEventCharCode(nativeEvent) {
	  var charCode;
	  var keyCode = nativeEvent.keyCode;

	  if ('charCode' in nativeEvent) {
	    charCode = nativeEvent.charCode;

	    // FF does not set `charCode` for the Enter-key, check against `keyCode`.
	    if (charCode === 0 && keyCode === 13) {
	      charCode = 13;
	    }
	  } else {
	    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
	    charCode = keyCode;
	  }

	  // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
	  // Must not discard the (non-)printable Enter-key.
	  if (charCode >= 32 || charCode === 13) {
	    return charCode;
	  }

	  return 0;
	}

	module.exports = getEventCharCode;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDefaultPerfAnalysis
	 */

	var assign = __webpack_require__(72);

	// Don't try to save users less than 1.2ms (a number I made up)
	var DONT_CARE_THRESHOLD = 1.2;
	var DOM_OPERATION_TYPES = {
	  'mountImageIntoNode': 'set innerHTML',
	  INSERT_MARKUP: 'set innerHTML',
	  MOVE_EXISTING: 'move',
	  REMOVE_NODE: 'remove',
	  TEXT_CONTENT: 'set textContent',
	  'updatePropertyByID': 'update attribute',
	  'deletePropertyByID': 'delete attribute',
	  'updateStylesByID': 'update styles',
	  'updateInnerHTMLByID': 'set innerHTML',
	  'dangerouslyReplaceNodeWithMarkupByID': 'replace'
	};

	function getTotalTime(measurements) {
	  // TODO: return number of DOM ops? could be misleading.
	  // TODO: measure dropped frames after reconcile?
	  // TODO: log total time of each reconcile and the top-level component
	  // class that triggered it.
	  var totalTime = 0;
	  for (var i = 0; i < measurements.length; i++) {
	    var measurement = measurements[i];
	    totalTime += measurement.totalTime;
	  }
	  return totalTime;
	}

	function getDOMSummary(measurements) {
	  var items = [];
	  for (var i = 0; i < measurements.length; i++) {
	    var measurement = measurements[i];
	    var id;

	    for (id in measurement.writes) {
	      measurement.writes[id].forEach(function(write) {
	        items.push({
	          id: id,
	          type: DOM_OPERATION_TYPES[write.type] || write.type,
	          args: write.args
	        });
	      });
	    }
	  }
	  return items;
	}

	function getExclusiveSummary(measurements) {
	  var candidates = {};
	  var displayName;

	  for (var i = 0; i < measurements.length; i++) {
	    var measurement = measurements[i];
	    var allIDs = assign(
	      {},
	      measurement.exclusive,
	      measurement.inclusive
	    );

	    for (var id in allIDs) {
	      displayName = measurement.displayNames[id].current;

	      candidates[displayName] = candidates[displayName] || {
	        componentName: displayName,
	        inclusive: 0,
	        exclusive: 0,
	        render: 0,
	        count: 0
	      };
	      if (measurement.render[id]) {
	        candidates[displayName].render += measurement.render[id];
	      }
	      if (measurement.exclusive[id]) {
	        candidates[displayName].exclusive += measurement.exclusive[id];
	      }
	      if (measurement.inclusive[id]) {
	        candidates[displayName].inclusive += measurement.inclusive[id];
	      }
	      if (measurement.counts[id]) {
	        candidates[displayName].count += measurement.counts[id];
	      }
	    }
	  }

	  // Now make a sorted array with the results.
	  var arr = [];
	  for (displayName in candidates) {
	    if (candidates[displayName].exclusive >= DONT_CARE_THRESHOLD) {
	      arr.push(candidates[displayName]);
	    }
	  }

	  arr.sort(function(a, b) {
	    return b.exclusive - a.exclusive;
	  });

	  return arr;
	}

	function getInclusiveSummary(measurements, onlyClean) {
	  var candidates = {};
	  var inclusiveKey;

	  for (var i = 0; i < measurements.length; i++) {
	    var measurement = measurements[i];
	    var allIDs = assign(
	      {},
	      measurement.exclusive,
	      measurement.inclusive
	    );
	    var cleanComponents;

	    if (onlyClean) {
	      cleanComponents = getUnchangedComponents(measurement);
	    }

	    for (var id in allIDs) {
	      if (onlyClean && !cleanComponents[id]) {
	        continue;
	      }

	      var displayName = measurement.displayNames[id];

	      // Inclusive time is not useful for many components without knowing where
	      // they are instantiated. So we aggregate inclusive time with both the
	      // owner and current displayName as the key.
	      inclusiveKey = displayName.owner + ' > ' + displayName.current;

	      candidates[inclusiveKey] = candidates[inclusiveKey] || {
	        componentName: inclusiveKey,
	        time: 0,
	        count: 0
	      };

	      if (measurement.inclusive[id]) {
	        candidates[inclusiveKey].time += measurement.inclusive[id];
	      }
	      if (measurement.counts[id]) {
	        candidates[inclusiveKey].count += measurement.counts[id];
	      }
	    }
	  }

	  // Now make a sorted array with the results.
	  var arr = [];
	  for (inclusiveKey in candidates) {
	    if (candidates[inclusiveKey].time >= DONT_CARE_THRESHOLD) {
	      arr.push(candidates[inclusiveKey]);
	    }
	  }

	  arr.sort(function(a, b) {
	    return b.time - a.time;
	  });

	  return arr;
	}

	function getUnchangedComponents(measurement) {
	  // For a given reconcile, look at which components did not actually
	  // render anything to the DOM and return a mapping of their ID to
	  // the amount of time it took to render the entire subtree.
	  var cleanComponents = {};
	  var dirtyLeafIDs = Object.keys(measurement.writes);
	  var allIDs = assign({}, measurement.exclusive, measurement.inclusive);

	  for (var id in allIDs) {
	    var isDirty = false;
	    // For each component that rendered, see if a component that triggered
	    // a DOM op is in its subtree.
	    for (var i = 0; i < dirtyLeafIDs.length; i++) {
	      if (dirtyLeafIDs[i].indexOf(id) === 0) {
	        isDirty = true;
	        break;
	      }
	    }
	    if (!isDirty && measurement.counts[id] > 0) {
	      cleanComponents[id] = true;
	    }
	  }
	  return cleanComponents;
	}

	var ReactDefaultPerfAnalysis = {
	  getExclusiveSummary: getExclusiveSummary,
	  getInclusiveSummary: getInclusiveSummary,
	  getDOMSummary: getDOMSummary,
	  getTotalTime: getTotalTime
	};

	module.exports = ReactDefaultPerfAnalysis;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule performanceNow
	 * @typechecks
	 */

	var performance = __webpack_require__(191);

	/**
	 * Detect if we can use `window.performance.now()` and gracefully fallback to
	 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
	 * because of Facebook's testing infrastructure.
	 */
	if (!performance || !performance.now) {
	  performance = Date;
	}

	var performanceNow = performance.now.bind(performance);

	module.exports = performanceNow;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule adler32
	 */

	/* jslint bitwise:true */

	"use strict";

	var MOD = 65521;

	// This is a clean-room implementation of adler32 designed for detecting
	// if markup is not what we expect it to be. It does not need to be
	// cryptographically strong, only reasonably good at detecting if markup
	// generated on the server is different than that on the client.
	function adler32(data) {
	  var a = 1;
	  var b = 0;
	  for (var i = 0; i < data.length; i++) {
	    a = (a + data.charCodeAt(i)) % MOD;
	    b = (b + a) % MOD;
	  }
	  return a | (b << 16);
	}

	module.exports = adler32;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPutListenerQueue
	 */

	"use strict";

	var PooledClass = __webpack_require__(85);
	var ReactBrowserEventEmitter = __webpack_require__(101);

	var assign = __webpack_require__(72);

	function ReactPutListenerQueue() {
	  this.listenersToPut = [];
	}

	assign(ReactPutListenerQueue.prototype, {
	  enqueuePutListener: function(rootNodeID, propKey, propValue) {
	    this.listenersToPut.push({
	      rootNodeID: rootNodeID,
	      propKey: propKey,
	      propValue: propValue
	    });
	  },

	  putListeners: function() {
	    for (var i = 0; i < this.listenersToPut.length; i++) {
	      var listenerToPut = this.listenersToPut[i];
	      ReactBrowserEventEmitter.putListener(
	        listenerToPut.rootNodeID,
	        listenerToPut.propKey,
	        listenerToPut.propValue
	      );
	    }
	  },

	  reset: function() {
	    this.listenersToPut.length = 0;
	  },

	  destructor: function() {
	    this.reset();
	  }
	});

	PooledClass.addPoolingTo(ReactPutListenerQueue);

	module.exports = ReactPutListenerQueue;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isTextNode
	 * @typechecks
	 */

	var isNode = __webpack_require__(192);

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM text node.
	 */
	function isTextNode(object) {
	  return isNode(object) && object.nodeType == 3;
	}

	module.exports = isTextNode;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelize
	 * @typechecks
	 */

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function(_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule accumulateInto
	 */

	"use strict";

	var invariant = __webpack_require__(49);

	/**
	 *
	 * Accumulates items that must not be null or undefined into the first one. This
	 * is used to conserve memory by avoiding array allocations, and thus sacrifices
	 * API cleanness. Since `current` can be null before being passed in and not
	 * null after this function, make sure to assign it back to `current`:
	 *
	 * `a = accumulateInto(a, b);`
	 *
	 * This API should be sparingly used. Try `accumulate` for something cleaner.
	 *
	 * @return {*|array<*>} An accumulation of items.
	 */

	function accumulateInto(current, next) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    next != null,
	    'accumulateInto(...): Accumulated items must not be null or undefined.'
	  ) : invariant(next != null));
	  if (current == null) {
	    return next;
	  }

	  // Both are not empty. Warning: Never call x.concat(y) when you are not
	  // certain that x is an Array (x could be a string with concat method).
	  var currentIsArray = Array.isArray(current);
	  var nextIsArray = Array.isArray(next);

	  if (currentIsArray && nextIsArray) {
	    current.push.apply(current, next);
	    return current;
	  }

	  if (currentIsArray) {
	    current.push(next);
	    return current;
	  }

	  if (nextIsArray) {
	    // A bit too dangerous to mutate `next`.
	    return [current].concat(next);
	  }

	  return [current, next];
	}

	module.exports = accumulateInto;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule forEachAccumulated
	 */

	"use strict";

	/**
	 * @param {array} an "accumulation" of items which is either an Array or
	 * a single item. Useful when paired with the `accumulate` module. This is a
	 * simple utility that allows us to reason about a collection of items, but
	 * handling the case when there is exactly one item (and we do not need to
	 * allocate an array).
	 */
	var forEachAccumulated = function(arr, cb, scope) {
	  if (Array.isArray(arr)) {
	    arr.forEach(cb, scope);
	  } else if (arr) {
	    cb.call(scope, arr);
	  }
	};

	module.exports = forEachAccumulated;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule hyphenate
	 * @typechecks
	 */

	var _uppercasePattern = /([A-Z])/g;

	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}

	module.exports = hyphenate;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMSelection
	 */

	"use strict";

	var ExecutionEnvironment = __webpack_require__(75);

	var getNodeForCharacterOffset = __webpack_require__(193);
	var getTextContentAccessor = __webpack_require__(156);

	/**
	 * While `isCollapsed` is available on the Selection object and `collapsed`
	 * is available on the Range object, IE11 sometimes gets them wrong.
	 * If the anchor/focus nodes and offsets are the same, the range is collapsed.
	 */
	function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
	  return anchorNode === focusNode && anchorOffset === focusOffset;
	}

	/**
	 * Get the appropriate anchor and focus node/offset pairs for IE.
	 *
	 * The catch here is that IE's selection API doesn't provide information
	 * about whether the selection is forward or backward, so we have to
	 * behave as though it's always forward.
	 *
	 * IE text differs from modern selection in that it behaves as though
	 * block elements end with a new line. This means character offsets will
	 * differ between the two APIs.
	 *
	 * @param {DOMElement} node
	 * @return {object}
	 */
	function getIEOffsets(node) {
	  var selection = document.selection;
	  var selectedRange = selection.createRange();
	  var selectedLength = selectedRange.text.length;

	  // Duplicate selection so we can move range without breaking user selection.
	  var fromStart = selectedRange.duplicate();
	  fromStart.moveToElementText(node);
	  fromStart.setEndPoint('EndToStart', selectedRange);

	  var startOffset = fromStart.text.length;
	  var endOffset = startOffset + selectedLength;

	  return {
	    start: startOffset,
	    end: endOffset
	  };
	}

	/**
	 * @param {DOMElement} node
	 * @return {?object}
	 */
	function getModernOffsets(node) {
	  var selection = window.getSelection && window.getSelection();

	  if (!selection || selection.rangeCount === 0) {
	    return null;
	  }

	  var anchorNode = selection.anchorNode;
	  var anchorOffset = selection.anchorOffset;
	  var focusNode = selection.focusNode;
	  var focusOffset = selection.focusOffset;

	  var currentRange = selection.getRangeAt(0);

	  // If the node and offset values are the same, the selection is collapsed.
	  // `Selection.isCollapsed` is available natively, but IE sometimes gets
	  // this value wrong.
	  var isSelectionCollapsed = isCollapsed(
	    selection.anchorNode,
	    selection.anchorOffset,
	    selection.focusNode,
	    selection.focusOffset
	  );

	  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;

	  var tempRange = currentRange.cloneRange();
	  tempRange.selectNodeContents(node);
	  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

	  var isTempRangeCollapsed = isCollapsed(
	    tempRange.startContainer,
	    tempRange.startOffset,
	    tempRange.endContainer,
	    tempRange.endOffset
	  );

	  var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
	  var end = start + rangeLength;

	  // Detect whether the selection is backward.
	  var detectionRange = document.createRange();
	  detectionRange.setStart(anchorNode, anchorOffset);
	  detectionRange.setEnd(focusNode, focusOffset);
	  var isBackward = detectionRange.collapsed;

	  return {
	    start: isBackward ? end : start,
	    end: isBackward ? start : end
	  };
	}

	/**
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */
	function setIEOffsets(node, offsets) {
	  var range = document.selection.createRange().duplicate();
	  var start, end;

	  if (typeof offsets.end === 'undefined') {
	    start = offsets.start;
	    end = start;
	  } else if (offsets.start > offsets.end) {
	    start = offsets.end;
	    end = offsets.start;
	  } else {
	    start = offsets.start;
	    end = offsets.end;
	  }

	  range.moveToElementText(node);
	  range.moveStart('character', start);
	  range.setEndPoint('EndToStart', range);
	  range.moveEnd('character', end - start);
	  range.select();
	}

	/**
	 * In modern non-IE browsers, we can support both forward and backward
	 * selections.
	 *
	 * Note: IE10+ supports the Selection object, but it does not support
	 * the `extend` method, which means that even in modern IE, it's not possible
	 * to programatically create a backward selection. Thus, for all IE
	 * versions, we use the old IE API to create our selections.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */
	function setModernOffsets(node, offsets) {
	  if (!window.getSelection) {
	    return;
	  }

	  var selection = window.getSelection();
	  var length = node[getTextContentAccessor()].length;
	  var start = Math.min(offsets.start, length);
	  var end = typeof offsets.end === 'undefined' ?
	            start : Math.min(offsets.end, length);

	  // IE 11 uses modern selection, but doesn't support the extend method.
	  // Flip backward selections, so we can set with a single range.
	  if (!selection.extend && start > end) {
	    var temp = end;
	    end = start;
	    start = temp;
	  }

	  var startMarker = getNodeForCharacterOffset(node, start);
	  var endMarker = getNodeForCharacterOffset(node, end);

	  if (startMarker && endMarker) {
	    var range = document.createRange();
	    range.setStart(startMarker.node, startMarker.offset);
	    selection.removeAllRanges();

	    if (start > end) {
	      selection.addRange(range);
	      selection.extend(endMarker.node, endMarker.offset);
	    } else {
	      range.setEnd(endMarker.node, endMarker.offset);
	      selection.addRange(range);
	    }
	  }
	}

	var useIEOffsets = ExecutionEnvironment.canUseDOM && document.selection;

	var ReactDOMSelection = {
	  /**
	   * @param {DOMElement} node
	   */
	  getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,

	  /**
	   * @param {DOMElement|DOMTextNode} node
	   * @param {object} offsets
	   */
	  setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
	};

	module.exports = ReactDOMSelection;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule focusNode
	 */

	"use strict";

	/**
	 * @param {DOMElement} node input/textarea to focus
	 */
	function focusNode(node) {
	  // IE8 can throw "Can't move focus to the control because it is invisible,
	  // not enabled, or of a type that does not accept the focus." for all kinds of
	  // reasons that are too expensive and fragile to test.
	  try {
	    node.focus();
	  } catch(e) {
	  }
	}

	module.exports = focusNode;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DOMChildrenOperations
	 * @typechecks static-only
	 */

	"use strict";

	var Danger = __webpack_require__(194);
	var ReactMultiChildUpdateTypes = __webpack_require__(131);

	var getTextContentAccessor = __webpack_require__(156);
	var invariant = __webpack_require__(49);

	/**
	 * The DOM property to use when setting text content.
	 *
	 * @type {string}
	 * @private
	 */
	var textContentAccessor = getTextContentAccessor();

	/**
	 * Inserts `childNode` as a child of `parentNode` at the `index`.
	 *
	 * @param {DOMElement} parentNode Parent node in which to insert.
	 * @param {DOMElement} childNode Child node to insert.
	 * @param {number} index Index at which to insert the child.
	 * @internal
	 */
	function insertChildAt(parentNode, childNode, index) {
	  // By exploiting arrays returning `undefined` for an undefined index, we can
	  // rely exclusively on `insertBefore(node, null)` instead of also using
	  // `appendChild(node)`. However, using `undefined` is not allowed by all
	  // browsers so we must replace it with `null`.
	  parentNode.insertBefore(
	    childNode,
	    parentNode.childNodes[index] || null
	  );
	}

	var updateTextContent;
	if (textContentAccessor === 'textContent') {
	  /**
	   * Sets the text content of `node` to `text`.
	   *
	   * @param {DOMElement} node Node to change
	   * @param {string} text New text content
	   */
	  updateTextContent = function(node, text) {
	    node.textContent = text;
	  };
	} else {
	  /**
	   * Sets the text content of `node` to `text`.
	   *
	   * @param {DOMElement} node Node to change
	   * @param {string} text New text content
	   */
	  updateTextContent = function(node, text) {
	    // In order to preserve newlines correctly, we can't use .innerText to set
	    // the contents (see #1080), so we empty the element then append a text node
	    while (node.firstChild) {
	      node.removeChild(node.firstChild);
	    }
	    if (text) {
	      var doc = node.ownerDocument || document;
	      node.appendChild(doc.createTextNode(text));
	    }
	  };
	}

	/**
	 * Operations for updating with DOM children.
	 */
	var DOMChildrenOperations = {

	  dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,

	  updateTextContent: updateTextContent,

	  /**
	   * Updates a component's children by processing a series of updates. The
	   * update configurations are each expected to have a `parentNode` property.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @param {array<string>} markupList List of markup strings.
	   * @internal
	   */
	  processUpdates: function(updates, markupList) {
	    var update;
	    // Mapping from parent IDs to initial child orderings.
	    var initialChildren = null;
	    // List of children that will be moved or removed.
	    var updatedChildren = null;

	    for (var i = 0; update = updates[i]; i++) {
	      if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING ||
	          update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
	        var updatedIndex = update.fromIndex;
	        var updatedChild = update.parentNode.childNodes[updatedIndex];
	        var parentID = update.parentID;

	        ("production" !== process.env.NODE_ENV ? invariant(
	          updatedChild,
	          'processUpdates(): Unable to find child %s of element. This ' +
	          'probably means the DOM was unexpectedly mutated (e.g., by the ' +
	          'browser), usually due to forgetting a <tbody> when using tables, ' +
	          'nesting tags like <form>, <p>, or <a>, or using non-SVG elements '+
	          'in an <svg> parent. Try inspecting the child nodes of the element ' +
	          'with React ID `%s`.',
	          updatedIndex,
	          parentID
	        ) : invariant(updatedChild));

	        initialChildren = initialChildren || {};
	        initialChildren[parentID] = initialChildren[parentID] || [];
	        initialChildren[parentID][updatedIndex] = updatedChild;

	        updatedChildren = updatedChildren || [];
	        updatedChildren.push(updatedChild);
	      }
	    }

	    var renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);

	    // Remove updated children first so that `toIndex` is consistent.
	    if (updatedChildren) {
	      for (var j = 0; j < updatedChildren.length; j++) {
	        updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
	      }
	    }

	    for (var k = 0; update = updates[k]; k++) {
	      switch (update.type) {
	        case ReactMultiChildUpdateTypes.INSERT_MARKUP:
	          insertChildAt(
	            update.parentNode,
	            renderedMarkup[update.markupIndex],
	            update.toIndex
	          );
	          break;
	        case ReactMultiChildUpdateTypes.MOVE_EXISTING:
	          insertChildAt(
	            update.parentNode,
	            initialChildren[update.parentID][update.fromIndex],
	            update.toIndex
	          );
	          break;
	        case ReactMultiChildUpdateTypes.TEXT_CONTENT:
	          updateTextContent(
	            update.parentNode,
	            update.textContent
	          );
	          break;
	        case ReactMultiChildUpdateTypes.REMOVE_NODE:
	          // Already removed by the for-loop above.
	          break;
	      }
	    }
	  }

	};

	module.exports = DOMChildrenOperations;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getEventModifierState
	 * @typechecks static-only
	 */

	"use strict";

	/**
	 * Translation from modifier key to the associated property in the event.
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
	 */

	var modifierKeyToProp = {
	  'Alt': 'altKey',
	  'Control': 'ctrlKey',
	  'Meta': 'metaKey',
	  'Shift': 'shiftKey'
	};

	// IE8 does not implement getModifierState so we simply map it to the only
	// modifier keys exposed by the event itself, does not support Lock-keys.
	// Currently, all major browsers except Chrome seems to support Lock-keys.
	function modifierStateGetter(keyArg) {
	  /*jshint validthis:true */
	  var syntheticEvent = this;
	  var nativeEvent = syntheticEvent.nativeEvent;
	  if (nativeEvent.getModifierState) {
	    return nativeEvent.getModifierState(keyArg);
	  }
	  var keyProp = modifierKeyToProp[keyArg];
	  return keyProp ? !!nativeEvent[keyProp] : false;
	}

	function getEventModifierState(nativeEvent) {
	  return modifierStateGetter;
	}

	module.exports = getEventModifierState;


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getEventKey
	 * @typechecks static-only
	 */

	"use strict";

	var getEventCharCode = __webpack_require__(176);

	/**
	 * Normalization of deprecated HTML5 `key` values
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
	 */
	var normalizeKey = {
	  'Esc': 'Escape',
	  'Spacebar': ' ',
	  'Left': 'ArrowLeft',
	  'Up': 'ArrowUp',
	  'Right': 'ArrowRight',
	  'Down': 'ArrowDown',
	  'Del': 'Delete',
	  'Win': 'OS',
	  'Menu': 'ContextMenu',
	  'Apps': 'ContextMenu',
	  'Scroll': 'ScrollLock',
	  'MozPrintableKey': 'Unidentified'
	};

	/**
	 * Translation from legacy `keyCode` to HTML5 `key`
	 * Only special keys supported, all others depend on keyboard layout or browser
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
	 */
	var translateToKey = {
	  8: 'Backspace',
	  9: 'Tab',
	  12: 'Clear',
	  13: 'Enter',
	  16: 'Shift',
	  17: 'Control',
	  18: 'Alt',
	  19: 'Pause',
	  20: 'CapsLock',
	  27: 'Escape',
	  32: ' ',
	  33: 'PageUp',
	  34: 'PageDown',
	  35: 'End',
	  36: 'Home',
	  37: 'ArrowLeft',
	  38: 'ArrowUp',
	  39: 'ArrowRight',
	  40: 'ArrowDown',
	  45: 'Insert',
	  46: 'Delete',
	  112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6',
	  118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12',
	  144: 'NumLock',
	  145: 'ScrollLock',
	  224: 'Meta'
	};

	/**
	 * @param {object} nativeEvent Native browser event.
	 * @return {string} Normalized `key` property.
	 */
	function getEventKey(nativeEvent) {
	  if (nativeEvent.key) {
	    // Normalize inconsistent values reported by browsers due to
	    // implementations of a working draft specification.

	    // FireFox implements `key` but returns `MozPrintableKey` for all
	    // printable characters (normalized to `Unidentified`), ignore it.
	    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
	    if (key !== 'Unidentified') {
	      return key;
	    }
	  }

	  // Browser does not implement `key`, polyfill as much of it as we can.
	  if (nativeEvent.type === 'keypress') {
	    var charCode = getEventCharCode(nativeEvent);

	    // The enter-key is technically both printable and non-printable and can
	    // thus be captured by `keypress`, no other non-printable key should.
	    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
	  }
	  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
	    // While user keyboard layout determines the actual meaning of each
	    // `keyCode` value, almost all function keys have a universal value.
	    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
	  }
	  return '';
	}

	module.exports = getEventKey;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule performance
	 * @typechecks
	 */

	"use strict";

	var ExecutionEnvironment = __webpack_require__(75);

	var performance;

	if (ExecutionEnvironment.canUseDOM) {
	  performance =
	    window.performance ||
	    window.msPerformance ||
	    window.webkitPerformance;
	}

	module.exports = performance || {};


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isNode
	 * @typechecks
	 */

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM node.
	 */
	function isNode(object) {
	  return !!(object && (
	    typeof Node === 'function' ? object instanceof Node :
	      typeof object === 'object' &&
	      typeof object.nodeType === 'number' &&
	      typeof object.nodeName === 'string'
	  ));
	}

	module.exports = isNode;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getNodeForCharacterOffset
	 */

	"use strict";

	/**
	 * Given any node return the first leaf node without children.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {DOMElement|DOMTextNode}
	 */
	function getLeafNode(node) {
	  while (node && node.firstChild) {
	    node = node.firstChild;
	  }
	  return node;
	}

	/**
	 * Get the next sibling within a container. This will walk up the
	 * DOM if a node's siblings have been exhausted.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {?DOMElement|DOMTextNode}
	 */
	function getSiblingNode(node) {
	  while (node) {
	    if (node.nextSibling) {
	      return node.nextSibling;
	    }
	    node = node.parentNode;
	  }
	}

	/**
	 * Get object describing the nodes which contain characters at offset.
	 *
	 * @param {DOMElement|DOMTextNode} root
	 * @param {number} offset
	 * @return {?object}
	 */
	function getNodeForCharacterOffset(root, offset) {
	  var node = getLeafNode(root);
	  var nodeStart = 0;
	  var nodeEnd = 0;

	  while (node) {
	    if (node.nodeType == 3) {
	      nodeEnd = nodeStart + node.textContent.length;

	      if (nodeStart <= offset && nodeEnd >= offset) {
	        return {
	          node: node,
	          offset: offset - nodeStart
	        };
	      }

	      nodeStart = nodeEnd;
	    }

	    node = getLeafNode(getSiblingNode(node));
	  }
	}

	module.exports = getNodeForCharacterOffset;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Danger
	 * @typechecks static-only
	 */

	/*jslint evil: true, sub: true */

	"use strict";

	var ExecutionEnvironment = __webpack_require__(75);

	var createNodesFromMarkup = __webpack_require__(195);
	var emptyFunction = __webpack_require__(133);
	var getMarkupWrap = __webpack_require__(196);
	var invariant = __webpack_require__(49);

	var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
	var RESULT_INDEX_ATTR = 'data-danger-index';

	/**
	 * Extracts the `nodeName` from a string of markup.
	 *
	 * NOTE: Extracting the `nodeName` does not require a regular expression match
	 * because we make assumptions about React-generated markup (i.e. there are no
	 * spaces surrounding the opening tag and there is at least one attribute).
	 *
	 * @param {string} markup String of markup.
	 * @return {string} Node name of the supplied markup.
	 * @see http://jsperf.com/extract-nodename
	 */
	function getNodeName(markup) {
	  return markup.substring(1, markup.indexOf(' '));
	}

	var Danger = {

	  /**
	   * Renders markup into an array of nodes. The markup is expected to render
	   * into a list of root nodes. Also, the length of `resultList` and
	   * `markupList` should be the same.
	   *
	   * @param {array<string>} markupList List of markup strings to render.
	   * @return {array<DOMElement>} List of rendered nodes.
	   * @internal
	   */
	  dangerouslyRenderMarkup: function(markupList) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      ExecutionEnvironment.canUseDOM,
	      'dangerouslyRenderMarkup(...): Cannot render markup in a worker ' +
	      'thread. Make sure `window` and `document` are available globally ' +
	      'before requiring React when unit testing or use ' +
	      'React.renderToString for server rendering.'
	    ) : invariant(ExecutionEnvironment.canUseDOM));
	    var nodeName;
	    var markupByNodeName = {};
	    // Group markup by `nodeName` if a wrap is necessary, else by '*'.
	    for (var i = 0; i < markupList.length; i++) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        markupList[i],
	        'dangerouslyRenderMarkup(...): Missing markup.'
	      ) : invariant(markupList[i]));
	      nodeName = getNodeName(markupList[i]);
	      nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
	      markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
	      markupByNodeName[nodeName][i] = markupList[i];
	    }
	    var resultList = [];
	    var resultListAssignmentCount = 0;
	    for (nodeName in markupByNodeName) {
	      if (!markupByNodeName.hasOwnProperty(nodeName)) {
	        continue;
	      }
	      var markupListByNodeName = markupByNodeName[nodeName];

	      // This for-in loop skips the holes of the sparse array. The order of
	      // iteration should follow the order of assignment, which happens to match
	      // numerical index order, but we don't rely on that.
	      for (var resultIndex in markupListByNodeName) {
	        if (markupListByNodeName.hasOwnProperty(resultIndex)) {
	          var markup = markupListByNodeName[resultIndex];

	          // Push the requested markup with an additional RESULT_INDEX_ATTR
	          // attribute.  If the markup does not start with a < character, it
	          // will be discarded below (with an appropriate console.error).
	          markupListByNodeName[resultIndex] = markup.replace(
	            OPEN_TAG_NAME_EXP,
	            // This index will be parsed back out below.
	            '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" '
	          );
	        }
	      }

	      // Render each group of markup with similar wrapping `nodeName`.
	      var renderNodes = createNodesFromMarkup(
	        markupListByNodeName.join(''),
	        emptyFunction // Do nothing special with <script> tags.
	      );

	      for (i = 0; i < renderNodes.length; ++i) {
	        var renderNode = renderNodes[i];
	        if (renderNode.hasAttribute &&
	            renderNode.hasAttribute(RESULT_INDEX_ATTR)) {

	          resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
	          renderNode.removeAttribute(RESULT_INDEX_ATTR);

	          ("production" !== process.env.NODE_ENV ? invariant(
	            !resultList.hasOwnProperty(resultIndex),
	            'Danger: Assigning to an already-occupied result index.'
	          ) : invariant(!resultList.hasOwnProperty(resultIndex)));

	          resultList[resultIndex] = renderNode;

	          // This should match resultList.length and markupList.length when
	          // we're done.
	          resultListAssignmentCount += 1;

	        } else if ("production" !== process.env.NODE_ENV) {
	          console.error(
	            "Danger: Discarding unexpected node:",
	            renderNode
	          );
	        }
	      }
	    }

	    // Although resultList was populated out of order, it should now be a dense
	    // array.
	    ("production" !== process.env.NODE_ENV ? invariant(
	      resultListAssignmentCount === resultList.length,
	      'Danger: Did not assign to every index of resultList.'
	    ) : invariant(resultListAssignmentCount === resultList.length));

	    ("production" !== process.env.NODE_ENV ? invariant(
	      resultList.length === markupList.length,
	      'Danger: Expected markup to render %s nodes, but rendered %s.',
	      markupList.length,
	      resultList.length
	    ) : invariant(resultList.length === markupList.length));

	    return resultList;
	  },

	  /**
	   * Replaces a node with a string of markup at its current position within its
	   * parent. The markup must render into a single root node.
	   *
	   * @param {DOMElement} oldChild Child node to replace.
	   * @param {string} markup Markup to render in place of the child node.
	   * @internal
	   */
	  dangerouslyReplaceNodeWithMarkup: function(oldChild, markup) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      ExecutionEnvironment.canUseDOM,
	      'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' +
	      'worker thread. Make sure `window` and `document` are available ' +
	      'globally before requiring React when unit testing or use ' +
	      'React.renderToString for server rendering.'
	    ) : invariant(ExecutionEnvironment.canUseDOM));
	    ("production" !== process.env.NODE_ENV ? invariant(markup, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(markup));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      oldChild.tagName.toLowerCase() !== 'html',
	      'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the ' +
	      '<html> node. This is because browser quirks make this unreliable ' +
	      'and/or slow. If you want to render to the root you must use ' +
	      'server rendering. See renderComponentToString().'
	    ) : invariant(oldChild.tagName.toLowerCase() !== 'html'));

	    var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
	    oldChild.parentNode.replaceChild(newChild, oldChild);
	  }

	};

	module.exports = Danger;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule createNodesFromMarkup
	 * @typechecks
	 */

	/*jslint evil: true, sub: true */

	var ExecutionEnvironment = __webpack_require__(75);

	var createArrayFrom = __webpack_require__(197);
	var getMarkupWrap = __webpack_require__(196);
	var invariant = __webpack_require__(49);

	/**
	 * Dummy container used to render all markup.
	 */
	var dummyNode =
	  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

	/**
	 * Pattern used by `getNodeName`.
	 */
	var nodeNamePattern = /^\s*<(\w+)/;

	/**
	 * Extracts the `nodeName` of the first element in a string of markup.
	 *
	 * @param {string} markup String of markup.
	 * @return {?string} Node name of the supplied markup.
	 */
	function getNodeName(markup) {
	  var nodeNameMatch = markup.match(nodeNamePattern);
	  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
	}

	/**
	 * Creates an array containing the nodes rendered from the supplied markup. The
	 * optionally supplied `handleScript` function will be invoked once for each
	 * <script> element that is rendered. If no `handleScript` function is supplied,
	 * an exception is thrown if any <script> elements are rendered.
	 *
	 * @param {string} markup A string of valid HTML markup.
	 * @param {?function} handleScript Invoked once for each rendered <script>.
	 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
	 */
	function createNodesFromMarkup(markup, handleScript) {
	  var node = dummyNode;
	  ("production" !== process.env.NODE_ENV ? invariant(!!dummyNode, 'createNodesFromMarkup dummy not initialized') : invariant(!!dummyNode));
	  var nodeName = getNodeName(markup);

	  var wrap = nodeName && getMarkupWrap(nodeName);
	  if (wrap) {
	    node.innerHTML = wrap[1] + markup + wrap[2];

	    var wrapDepth = wrap[0];
	    while (wrapDepth--) {
	      node = node.lastChild;
	    }
	  } else {
	    node.innerHTML = markup;
	  }

	  var scripts = node.getElementsByTagName('script');
	  if (scripts.length) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      handleScript,
	      'createNodesFromMarkup(...): Unexpected <script> element rendered.'
	    ) : invariant(handleScript));
	    createArrayFrom(scripts).forEach(handleScript);
	  }

	  var nodes = createArrayFrom(node.childNodes);
	  while (node.lastChild) {
	    node.removeChild(node.lastChild);
	  }
	  return nodes;
	}

	module.exports = createNodesFromMarkup;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getMarkupWrap
	 */

	var ExecutionEnvironment = __webpack_require__(75);

	var invariant = __webpack_require__(49);

	/**
	 * Dummy container used to detect which wraps are necessary.
	 */
	var dummyNode =
	  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

	/**
	 * Some browsers cannot use `innerHTML` to render certain elements standalone,
	 * so we wrap them, render the wrapped nodes, then extract the desired node.
	 *
	 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
	 */
	var shouldWrap = {
	  // Force wrapping for SVG elements because if they get created inside a <div>,
	  // they will be initialized in the wrong namespace (and will not display).
	  'circle': true,
	  'defs': true,
	  'ellipse': true,
	  'g': true,
	  'line': true,
	  'linearGradient': true,
	  'path': true,
	  'polygon': true,
	  'polyline': true,
	  'radialGradient': true,
	  'rect': true,
	  'stop': true,
	  'text': true
	};

	var selectWrap = [1, '<select multiple="true">', '</select>'];
	var tableWrap = [1, '<table>', '</table>'];
	var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	var svgWrap = [1, '<svg>', '</svg>'];

	var markupWrap = {
	  '*': [1, '?<div>', '</div>'],

	  'area': [1, '<map>', '</map>'],
	  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  'legend': [1, '<fieldset>', '</fieldset>'],
	  'param': [1, '<object>', '</object>'],
	  'tr': [2, '<table><tbody>', '</tbody></table>'],

	  'optgroup': selectWrap,
	  'option': selectWrap,

	  'caption': tableWrap,
	  'colgroup': tableWrap,
	  'tbody': tableWrap,
	  'tfoot': tableWrap,
	  'thead': tableWrap,

	  'td': trWrap,
	  'th': trWrap,

	  'circle': svgWrap,
	  'defs': svgWrap,
	  'ellipse': svgWrap,
	  'g': svgWrap,
	  'line': svgWrap,
	  'linearGradient': svgWrap,
	  'path': svgWrap,
	  'polygon': svgWrap,
	  'polyline': svgWrap,
	  'radialGradient': svgWrap,
	  'rect': svgWrap,
	  'stop': svgWrap,
	  'text': svgWrap
	};

	/**
	 * Gets the markup wrap configuration for the supplied `nodeName`.
	 *
	 * NOTE: This lazily detects which wraps are necessary for the current browser.
	 *
	 * @param {string} nodeName Lowercase `nodeName`.
	 * @return {?array} Markup wrap configuration, if applicable.
	 */
	function getMarkupWrap(nodeName) {
	  ("production" !== process.env.NODE_ENV ? invariant(!!dummyNode, 'Markup wrapping node not initialized') : invariant(!!dummyNode));
	  if (!markupWrap.hasOwnProperty(nodeName)) {
	    nodeName = '*';
	  }
	  if (!shouldWrap.hasOwnProperty(nodeName)) {
	    if (nodeName === '*') {
	      dummyNode.innerHTML = '<link />';
	    } else {
	      dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
	    }
	    shouldWrap[nodeName] = !dummyNode.firstChild;
	  }
	  return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
	}


	module.exports = getMarkupWrap;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule createArrayFrom
	 * @typechecks
	 */

	var toArray = __webpack_require__(198);

	/**
	 * Perform a heuristic test to determine if an object is "array-like".
	 *
	 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
	 *   Joshu replied: "Mu."
	 *
	 * This function determines if its argument has "array nature": it returns
	 * true if the argument is an actual array, an `arguments' object, or an
	 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
	 *
	 * It will return false for other array-like objects like Filelist.
	 *
	 * @param {*} obj
	 * @return {boolean}
	 */
	function hasArrayNature(obj) {
	  return (
	    // not null/false
	    !!obj &&
	    // arrays are objects, NodeLists are functions in Safari
	    (typeof obj == 'object' || typeof obj == 'function') &&
	    // quacks like an array
	    ('length' in obj) &&
	    // not window
	    !('setInterval' in obj) &&
	    // no DOM node should be considered an array-like
	    // a 'select' element has 'length' and 'item' properties on IE8
	    (typeof obj.nodeType != 'number') &&
	    (
	      // a real array
	      (// HTMLCollection/NodeList
	      (Array.isArray(obj) ||
	      // arguments
	      ('callee' in obj) || 'item' in obj))
	    )
	  );
	}

	/**
	 * Ensure that the argument is an array by wrapping it in an array if it is not.
	 * Creates a copy of the argument if it is already an array.
	 *
	 * This is mostly useful idiomatically:
	 *
	 *   var createArrayFrom = require('createArrayFrom');
	 *
	 *   function takesOneOrMoreThings(things) {
	 *     things = createArrayFrom(things);
	 *     ...
	 *   }
	 *
	 * This allows you to treat `things' as an array, but accept scalars in the API.
	 *
	 * If you need to convert an array-like object, like `arguments`, into an array
	 * use toArray instead.
	 *
	 * @param {*} obj
	 * @return {array}
	 */
	function createArrayFrom(obj) {
	  if (!hasArrayNature(obj)) {
	    return [obj];
	  } else if (Array.isArray(obj)) {
	    return obj.slice();
	  } else {
	    return toArray(obj);
	  }
	}

	module.exports = createArrayFrom;


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule toArray
	 * @typechecks
	 */

	var invariant = __webpack_require__(49);

	/**
	 * Convert array-like objects to arrays.
	 *
	 * This API assumes the caller knows the contents of the data type. For less
	 * well defined inputs use createArrayFrom.
	 *
	 * @param {object|function|filelist} obj
	 * @return {array}
	 */
	function toArray(obj) {
	  var length = obj.length;

	  // Some browse builtin objects can report typeof 'function' (e.g. NodeList in
	  // old versions of Safari).
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !Array.isArray(obj) &&
	    (typeof obj === 'object' || typeof obj === 'function'),
	    'toArray: Array-like object expected'
	  ) : invariant(!Array.isArray(obj) &&
	  (typeof obj === 'object' || typeof obj === 'function')));

	  ("production" !== process.env.NODE_ENV ? invariant(
	    typeof length === 'number',
	    'toArray: Object needs a length property'
	  ) : invariant(typeof length === 'number'));

	  ("production" !== process.env.NODE_ENV ? invariant(
	    length === 0 ||
	    (length - 1) in obj,
	    'toArray: Object should have keys for indices'
	  ) : invariant(length === 0 ||
	  (length - 1) in obj));

	  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
	  // without method will throw during the slice call and skip straight to the
	  // fallback.
	  if (obj.hasOwnProperty) {
	    try {
	      return Array.prototype.slice.call(obj);
	    } catch (e) {
	      // IE < 9 does not support Array#slice on collections objects
	    }
	  }

	  // Fall back to copying key by key. This assumes all keys have a value,
	  // so will not preserve sparsely populated inputs.
	  var ret = Array(length);
	  for (var ii = 0; ii < length; ii++) {
	    ret[ii] = obj[ii];
	  }
	  return ret;
	}

	module.exports = toArray;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ }
/******/ ])
});
