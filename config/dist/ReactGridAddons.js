(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react/addons"));
	else if(typeof define === 'function' && define.amd)
		define(["react/addons"], factory);
	else if(typeof exports === 'object')
		exports["GridAddons"] = factory(require("react/addons"));
	else
		root["ReactGrid"] = root["ReactGrid"] || {}, root["ReactGrid"]["GridAddons"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	/* @flow */
	module.exports = {
	  Editors    : __webpack_require__(188),
	  Formatters : __webpack_require__(189),
	  Toolbar    : __webpack_require__(196),
	  Mixins : {
	    EditorMixin          : __webpack_require__(33),
	    TextInputMixin       : __webpack_require__(41),
	    KeyboardHandlerMixin : __webpack_require__(11)
	  }
	}


/***/ },

/***/ 1:
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

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 3:
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	                    
	               
	              
	                
	                                                                                                                                      
	  

	/* @flow */
	function ExcelColumn(){"use strict";}
	               
	              
	                
	                                                                                                                                      


	module.exports = ExcelColumn;


/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	"use strict";

	var keyMirror  = __webpack_require__(18);
	var isFunction = __webpack_require__(34)
	var React      = __webpack_require__(2);
	if (!Object.assign) {
	  Object.assign = __webpack_require__(52);
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

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	/**
	 * @jsx React.DOM


	 */

	'use strict';

	var React = __webpack_require__(2);
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

/***/ 18:
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

	var invariant = __webpack_require__(3);

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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var $__0=   __webpack_require__(2),PropTypes=$__0.PropTypes,isValidElement=$__0.isValidElement;
	var shallowCloneObject            = __webpack_require__(27);
	var DOMMetrics                    = __webpack_require__(39);
	var merge                         = __webpack_require__(43);

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

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React          = __webpack_require__(2);
	var cx             = React.addons.classSet;
	var BaseRow       = __webpack_require__(40);
	var ColumnMetrics = __webpack_require__(22);
	var ExcelColumn = __webpack_require__(8);

	                  
	          
	                               
	                                              
	                              
	   
	  

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

	  getRowHeight:function(props     )                       {
	    if(props.expandedRows && props.expandedRows[props.key]){
	      return props.expandedRows[props.key];
	    }else{
	      return props.height;
	    }
	  },

	  hasRowHeightChanged:function(props     )         {
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

	  shouldComponentUpdate:function(nextProps     )          {
	    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
	      this.doesRowContainSelectedCell(this.props)          ||
	      this.doesRowContainSelectedCell(nextProps) ||
	      this.willRowBeDraggedOver(nextProps)       ||
	      this.hasRowBeenCopied(this.props)          ||
	      this.hasRowBeenCopied(nextProps)           ||
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

/***/ 27:
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

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';
	var React                   = __webpack_require__(2);
	var cx                      = React.addons.classSet;
	var isFunction = __webpack_require__(34);

	var ExcelColumn = __webpack_require__(8);

	var EditorMixin = {

	  propTypes : {
	    height : React.PropTypes.number.isRequired,
	    column : React.PropTypes.shape(ExcelColumn).isRequired,
	    onCommit : React.PropTypes.func.isRequired
	  },

	  getStyle:function()                    {
	    return {
	      height : this.props.height - 1
	    }
	  },

	  getInitialState:function()                       {
	    return {isInvalid : false}
	  },

	  onPressEnter:function(e       ){
	    e.stopPropagation();
	    e.preventDefault();
	    this.commit({key : 'Enter'});
	  },

	  onPressTab:function(e       ){
	    e.stopPropagation();
	    e.preventDefault();
	    this.commit({key : 'Tab'});
	  },

	  commit:function(args               ){
	    var value = this.getValue();
	    var rowDataChanged = {};
	    rowDataChanged[this.props.column.key] = value;
	    if(this.isNewValueValid(value)){
	      this.props.onCommit({updated : rowDataChanged, key : args.key});
	    }
	  },

	  isNewValueValid:function(value        )         {
	    if(isFunction(this.validate)){
	      var isValid = this.validate(value);
	      this.setState({isInvalid : !isValid});
	      return isValid;
	    }else{
	      return true;
	    }
	  },

	  getValue:function()        {
	      return this.getInputNode().value;
	  },

	  setValue:function(value        ){
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

	  getInputNode:function()             {
	    return this.getDOMNode().getElementsByTagName("input")[0];
	  },

	  getContainerClass:function()        {
	    return cx({
	      'has-error' : this.state.isInvalid === true
	    })
	  },

	  renderStatusIcon:function()               {
	    if(this.state.isInvalid === true){
	      return React.createElement("span", {className: "glyphicon glyphicon-remove form-control-feedback"})
	    }
	  },

	  render:function()               {
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

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	var isFunction = function(functionToCheck     )         {
	    var getType = {};
	    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	module.exports = isFunction;


/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 

	 */
	'use strict';

	var React          = __webpack_require__(2);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;

	var Cell = React.createClass({displayName: "Cell",

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

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 

	 */
	'use strict';

	var React               = __webpack_require__(2);
	var emptyFunction       = __webpack_require__(42);
	var shallowCloneObject  = __webpack_require__(27);
	var invariant           = __webpack_require__(70);

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

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React          = __webpack_require__(2);
	var cx             = React.addons.classSet;
	var Cell           = __webpack_require__(38);
	var cloneWithProps = React.addons.cloneWithProps;
	var ColumnMetrics    = __webpack_require__(22);

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
	        //TODO passing the row to the cell??
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
	      
	      nextProps.row !== this.props.row            ||
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

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var TextInputMixin = {

	  propTypes : {
	    initialKeyCode : React.PropTypes.string,
	    value : React.PropTypes.any.isRequired
	  },

	  onPressArrowLeft:function(e       ){
	    //prevent event propogation. this disables left cell navigation
	    e.stopPropagation();
	  },

	  onPressArrowRight:function(e       ){
	    //prevent event propogation. this disables right cell navigation
	    e.stopPropagation();
	  },

	  getDefaultValue:function()        {
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
	      fieldRange.moveStart('character', input.value.length);
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

/***/ 42:
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

	var copyProperties = __webpack_require__(69);

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

/***/ 43:
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

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React                   = __webpack_require__(2);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(10);
	var EditorMixin             = __webpack_require__(33);
	var TextInputMixin          = __webpack_require__(41);
	var keyboardHandlerMixin    = __webpack_require__(11);

	var SimpleTextEditor = React.createClass({displayName: "SimpleTextEditor",

	  mixins : [keyboardHandlerMixin, EditorMixin, TextInputMixin],

	  propTypes : {
	  },

	  overrides : {
	      checkFocus : function(){
	          this.setTextInputFocus();
	      }
	  },

	  renderEditorNode:function()                {
	    return (React.createElement("input", {type: "text", onBlur: this.commit, className: "form-control", defaultValue: this.getDefaultValue(), style: this.getStyle(), onKeyDown: this.onKeyDown}));
	  }


	});

	module.exports = SimpleTextEditor;


/***/ },

/***/ 52:
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

/***/ 69:
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 70:
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(2));
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

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow */
	/**
	 * @jsx React.DOM
	 */
	'use strict';

	var React                   = __webpack_require__(2);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(10);
	var EditorMixin             = __webpack_require__(33);
	var TextInputMixin          = __webpack_require__(41);
	var ReactAutocomplete       = __webpack_require__(170);
	var keyboardHandlerMixin    = __webpack_require__(11);
	var ExcelColumn = __webpack_require__(8);

	var optionPropType = React.PropTypes.shape({
	      id    :   React.PropTypes.required,
	      title :   React.PropTypes.string
	    });

	var AutoCompleteEditor = React.createClass({displayName: "AutoCompleteEditor",

	  propTypes : {
	    onCommit : React.PropTypes.func.isRequired,
	    options : React.PropTypes.arrayOf(optionPropType).isRequired,
	    label : React.PropTypes.string,
	    value : React.PropTypes.any.isRequired,
	    valueParams: React.PropTypes.arrayOf(React.PropTypes.string),
	    column: React.PropTypes.shape(ExcelColumn).isRequired,
	    resultIdentifier : React.PropTypes.string.isRequired,
	    search : React.PropTypes.string.isRequired,

	  },

	  mixins : MixinHelper.mix([keyboardHandlerMixin, EditorMixin, TextInputMixin]),

	  overrides : {
	      checkFocus : function(){
	          this.setTextInputFocus();
	      },
	      getInputNode:function()              {
	        return this.getSearchComponent().getDOMNode();
	      },
	      onPressEnter:function(args     ){
	        var e = args[0];
	        this.handleEnter(e);
	      },
	      onPressTab:function(args     ){
	        var e = args[0];
	        this.handleTab(e);
	      }
	  },

	  handleTab:function(e            ){
	    e.stopPropagation();
	    e.preventDefault();
	    if(!this.isFocusedOnSuggestion()){
	      this.handleChange(null, 'Tab');
	    }else{
	      this.handleChange(this.getFocusedSuggestion(), 'Tab');
	    }
	  },

	  handleEnter:function(e            ){
	    e.stopPropagation();
	    e.preventDefault();
	    if(!this.isFocusedOnSuggestion()){
	      this.props.onCommit({value : this.refs.autoComplete.state.searchTerm, key : 'Enter'});
	    }
	  },

	  getSearchComponent:function()               {
	    return this.refs.autoComplete.refs.search;
	  },

	  isFocusedOnSuggestion:function()         {
	    var autoComplete = this.refs.autoComplete;
	    return autoComplete.state.focusedValue != null;
	  },

	  getFocusedSuggestion:function()        {
	    return this.refs.autoComplete.state.focusedValue;
	  },

	  onPressArrowDown:function(e            ){
	    //prevent event propogation. this disables downwards cell navigation
	    e.stopPropagation();
	    e.preventDefault();
	  },

	  onPressArrowUp:function(e            ){
	    //prevent event propogation. this disables upwards cell navigation
	    e.stopPropagation();
	  },

	  getLabel:function(result                                         )         {
	    var label = this.props.label != null ? this.props.label : 'title';
	    if (typeof label === "function") {
	      return label(result);
	    } else if (typeof label === "string") {
	      return result[label];
	    }
	  },

	  handleChange:function(item     , key        ) {
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

	  constuctValueFromParams:function(obj     , props               )         {
	    var ret = [];
	    for (var i = 0, ii = props.length; i < ii; i++) {
	      ret.push(obj[props[i]]);
	    }
	    return ret.join('|');
	  },

	  renderEditorNode:function()                {
	    var val = {title : this.getDefaultValue()};
	    var label = this.props.label != null ? this.props.label : 'title';
	    return (React.createElement("div", {style: this.getStyle(), onKeyDown: this.onKeyDown}, 
	              React.createElement(ReactAutocomplete, {search: this.props.search, ref: "autoComplete", label: label, resultIdentifier: this.props.resultIdentifier, options: this.props.options, value: val, onChange: this.handleChange})
	            ));
	  }

	});

	module.exports = AutoCompleteEditor;


/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React                   = __webpack_require__(2);
	var cx                      = React.addons.classSet;
	var MixinHelper             = __webpack_require__(10);
	var keyboardHandlerMixin    = __webpack_require__(11);
	var EditorMixin             = __webpack_require__(33);
	var cloneWithProps          = React.addons.cloneWithProps;

	var DropDownEditor = React.createClass({displayName: "DropDownEditor",

	  mixins : [keyboardHandlerMixin, EditorMixin],

	  overrides : {
	    getInputNode : function()              {
	      return this.refs.select.getDOMNode();
	    }
	  },

	  propTypes : {
	    options : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	    value : React.PropTypes.string.isRequired,
	    onCommit : React.PropTypes.func.isRequired
	  },

	  renderEditorNode:function()              {
	    return (
	      React.createElement("select", {ref: "select", style: this.getStyle(), defaultValue: this.props.value, onChange: this.onChange}, 
	        this.renderOptions()
	      ));
	  },

	  renderOptions:function()                     {
	    var options = [];
	    this.props.options.forEach(function(name){
	      options.push(React.createElement("option", {key: name, value: name}, name));
	    }, this);
	    return options;
	  },


	  onChange:function(e     ){ //having to use any to access currentTarget.value which isnt a property of an event
	    this.props.onCommit({value : e.currentTarget.value});
	  },

	  onClick:function(e       ){
	    e.stopPropagation();
	    e.preventDefault();
	  }

	});

	module.exports = DropDownEditor;


/***/ },

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	var Editors = {
	  AutoComplete     : __webpack_require__(185),
	  DropDownEditor   : __webpack_require__(187),
	  SimpleTextEditor : __webpack_require__(51)

	}

	module.exports = Editors;


/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	//not including this
	//it currently requires the whole of moment, which we dont want to take as a dependency
	//var DateRangeFormatter = require('./DateRangeFormatter');
	var Formatters = {
	  //DateRangeFormatter : DateRangeFormatter
	}

	module.exports = Formatters;


/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	* @jsx React.DOM

	*/
	'use strict';

	var React = __webpack_require__(2);
	var ExcelRow = __webpack_require__(26);

	var Toolbar = React.createClass({displayName: "Toolbar",
	  propTypes: {
	    onAddRow : React.PropTypes.func.isRequired,
	    onToggleFilter : React.PropTypes.func.isRequired,
	    rows : React.PropTypes.arrayOf(React.PropTypes.shape(ExcelRow)).isRequired
	  },
	  onAddRow:function(){
	    if(this.props.onAddRow){
	      this.props.onAddRow({newRowIndex : this.props.rows.length});
	    }
	  },

	  render:function()               {
	    return (
	      React.createElement("div", {className: "react-grid-Toolbar"}, 
	        React.createElement("div", {className: "tools"}, 
	          React.createElement("button", {type: "button", className: "btn", onClick: this.onAddRow}, 
	            "Add Row"
	          ), 
	          React.createElement("button", {type: "button", className: "btn", onClick: this.props.onToggleFilter}, 
	            "Filter Rows"
	          )
	        )
	      ))
	      }
	});

	module.exports = Toolbar;


/***/ }

/******/ })
});
