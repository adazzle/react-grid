(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], factory);
  } else {
    root.ReactGrid = factory(root.React);
  }
})(window, function(React) {
  return require('../lib/addons/grids/ExcelGrid.js');
});

},{"../lib/addons/grids/ExcelGrid.js":26}],2:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React          = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var cx             = React.addons.classSet;
var PropTypes      = React.PropTypes;
var cloneWithProps = React.addons.cloneWithProps;
var shallowEqual   = require('./shallowEqual');
var emptyFunction  = require('./emptyFunction');
var ScrollShim     = require('./ScrollShim');
var Row            = require('./Row');

var Canvas = React.createClass({displayName: 'Canvas',
  mixins: [ScrollShim],

  propTypes: {
    cellRenderer: PropTypes.component,
    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.component]),
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
          cellRenderer: this.props.cellRenderer
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
      React.DOM.div({
        style: style,
        onScroll: this.onScroll,
        className: cx("react-grid-Canvas", this.props.className)},
        React.DOM.div({style: {width: this.props.width, overflow: 'hidden'}},
          rows
        )
      )
    );
  },

  renderRow:function(props) {
    if (React.isValidComponent(this.props.rowRenderer)) {
      return cloneWithProps(this.props.rowRenderer, props);
    } else {
      return this.props.rowRenderer(props);
    }
  },

  renderPlaceholder:function(key, height) {
    return (
      React.DOM.div({key: key, style: {height: height}},
        this.props.columns.map(
          function(column, idx)  {return React.DOM.div({style: {width: column.width}, key: idx});})
      )
    );
  },

  getDefaultProps:function() {
    return {
      rowRenderer: Row,
      onRows: emptyFunction
    };
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Row":11,"./ScrollShim":12,"./emptyFunction":35,"./shallowEqual":41}],3:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
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
    return this.transferPropsTo(
      React.DOM.div({className: className, style: style},
        this.renderCellContent({
          value: this.props.value,
          column: this.props.column}
          ),
          React.DOM.div({className: "drag-handle", draggable: "true", onDragStart: this.props.handleDragStart}
          )
      )
    );
  },

  renderCellContent:function(props) {
    if (React.isValidComponent(this.props.formatter)) {
      return cloneWithProps(this.props.formatter, props);
    } else {
      return this.props.formatter(props);
    }
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
  return React.DOM.div({className: "react-grid-Cell__value"}, props.value);
}

module.exports = Cell;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var $__0=   (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null),PropTypes=$__0.PropTypes,isValidComponent=$__0.isValidComponent;
var shallowCloneObject            = require('./shallowCloneObject');
var DOMMetrics                    = require('./DOMMetrics');
var merge                         = require('./merge');

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
      if (typeof a[k] === 'function' && typeof b[k] === 'function') {
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./DOMMetrics":5,"./merge":39,"./shallowCloneObject":40}],5:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React               = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var emptyFunction       = require('./emptyFunction');
var shallowCloneObject  = require('./shallowCloneObject');
var invariant           = require('./invariant');

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
    window.addEventListener('resize', this.updateMetrics);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./emptyFunction":35,"./invariant":38,"./shallowCloneObject":40}],6:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React         = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var PropTypes     = React.PropTypes;
var emptyFunction = require('./emptyFunction');

var Draggable = React.createClass({displayName: 'Draggable',

  propTypes: {
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrag: PropTypes.func,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor])
  },

  render:function() {
    var component = this.props.component;
    return this.transferPropsTo(
      component({onMouseDown: this.onMouseDown})
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./emptyFunction":35}],7:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React                = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var PropTypes            = React.PropTypes;
var Header               = require('./Header');
var Viewport             = require('./Viewport');
var ColumnMetrics        = require('./ColumnMetrics');
var DOMMetrics           = require('./DOMMetrics');


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

  style: {
    overflow: 'hidden',
    outline: 0,
    position: 'relative',
    minHeight: 350
  },

  render:function() {
    var headerRows = this.props.headerRows || [{ref : 'row'}];
    return this.transferPropsTo(
      React.DOM.div({style: this.style, className: "react-grid-Grid"},
        Header({
          ref: "header",
          columns: this.state.columns,
          onColumnResize: this.onColumnResize,
          height: this.props.rowHeight,
          totalWidth: this.DOMMetrics.gridWidth(),
          headerRows: headerRows}
          ),
        Viewport({
          ref: "viewport",
          width: this.state.columns.width,
          rowHeight: this.props.rowHeight,
          rowRenderer: this.props.rowRenderer,
          cellRenderer: this.props.cellRenderer,
          rows: this.props.rows,
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
      rowHeight: 35
    };
  },
});

module.exports = Grid;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ColumnMetrics":4,"./DOMMetrics":5,"./Header":8,"./Viewport":13}],8:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var cx                  = React.addons.classSet;
var shallowCloneObject  = require('./shallowCloneObject');
var ColumnMetrics       = require('./ColumnMetrics');
var HeaderRow           = require('./HeaderRow');

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


    return this.transferPropsTo(
      React.DOM.div({style: this.getStyle(), className: className},
        this.renderHeaderRows(null)
      )
    );
  },

  renderHeaderRows:function(){
    var state = this.state.resizing || this.props;
    var headerRows = []
    this.props.headerRows.forEach((function(row, index){
      var headerRowStyle = {
        position: 'absolute',
        top: this.props.height * index,
        left: 0,
        width: this.props.totalWidth
      };

      headerRows.push(HeaderRow({
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ColumnMetrics":4,"./HeaderRow":10,"./shallowCloneObject":40}],9:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React       = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var cx          = React.addons.classSet;
var Draggable   = require('./Draggable');
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
    return this.transferPropsTo(
      Draggable({
        className: "react-grid-HeaderCell__resizeHandle",
        style: this.style}
        )
    );
  }
});

var HeaderCell = React.createClass({displayName: 'HeaderCell',

  propTypes: {
    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.component]).isRequired,
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
    return (
      React.DOM.div({className: className, style: this.getStyle()},
        this.renderCell(null),
        this.props.column.resizeable ?
          ResizeHandle({
            onDrag: this.onDrag,
            onDragStart: this.onDragStart,
            onDragEnd: this.onDragEnd}
            ) :
          null
      )
    );
  },

  renderCell:function() {
    if (React.isValidComponent(this.props.renderer)) {
      return React.addons.cloneWithProps(this.props.renderer, {column : this.props.column});
    } else {
      return this.props.renderer({column: this.props.column})
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
  return React.DOM.div({className: "rex-widget-HeaderCell__value"}, props.column.name);
}

module.exports = HeaderCell;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Draggable":6}],10:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React             = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var PropTypes         = React.PropTypes;
var shallowEqual      = require('./shallowEqual');
var HeaderCell        = require('./HeaderCell');
var getScrollbarSize  = require('./getScrollbarSize');

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

    return this.transferPropsTo(
      React.DOM.div({style: this.getStyle(), className: "react-grid-HeaderRow"},
        React.DOM.div({style: cellsStyle},
          this.renderCells(null)
        )
      )
    );
  },

  renderCells:function() {
    var cells = [];
    var lockedCells = [];

    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      var column = this.props.columns[i];
      var cell = (
        HeaderCell({
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./HeaderCell":9,"./getScrollbarSize":36,"./shallowEqual":41}],11:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var cx             = React.addons.classSet;
var Cell           = require('./Cell');
var cloneWithProps = React.addons.cloneWithProps;
var ColumnMetrics    = require('./ColumnMetrics');

var Row = React.createClass({displayName: 'Row',

  render:function() {
    var className = cx(
      'react-grid-Row',
      ("react-grid-Row--" + (this.props.idx % 2 === 0 ? 'even' : 'odd'))
    );

    var style = {
      height: this.props.height,
      overflow: 'hidden'
    };

    return this.transferPropsTo(
      React.DOM.div({className: className, style: style},
        React.isValidComponent(this.props.row) ?
          this.props.row :
          this.renderCells(null)
      )
    );
  },

  renderCells:function() {
    var cells = [];
    var lockedCells = [];

    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      var column = this.props.columns[i];
      var cell = (
        this.renderCell({
          ref: i,
          key: i,
          idx: i,
          rowIdx: this.props.idx,
          value: this.props.row[column.key || i],
          column: column,
          height: this.props.height,
          formatter: column.formatter}
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

  renderCell:function(props) {
    if (React.isValidComponent(this.props.cellRenderer)) {
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Cell":3,"./ColumnMetrics":4}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React             = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var getWindowSize     = require('./getWindowSize');
var DOMMetrics        = require('./DOMMetrics');
var Canvas            = require('./Canvas');

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
      React.DOM.div({
        className: "react-grid-Viewport",
        style: style},
        Canvas({
          ref: "canvas",
          totalWidth: this.props.totalWidth,
          width: this.props.columns.width,
          rows: this.props.rows,
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Canvas":2,"./DOMMetrics":5,"./getWindowSize":37}],14:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var BaseCell             = require('../../Cell');
var SelectableMixin      = require('./mixins/SelectableMixin');
var EditableMixin        = require('./mixins/EditableMixin');
var CopyableMixin        = require('./mixins/CopyableMixin');
var DraggableMixin       = require('./mixins/DraggableMixin');
var MixinHelper          = require('../utils/MixinHelper');
var KeyboardHandlerMixin = require('./mixins/KeyboardHandlerMixin');
var PropTypes            = React.PropTypes;
var cx                   = React.addons.classSet;
var cloneWithProps       = React.addons.cloneWithProps;

var ExcelCell = React.createClass({displayName: 'ExcelCell',

  mixins : MixinHelper.mix([KeyboardHandlerMixin, SelectableMixin, EditableMixin, DraggableMixin, CopyableMixin ]),

  overrides : {
    getCellClass : function(){
      return cx({
        'selected' : this.isSelected() && !this.isCopied() && !this.isActive(),
        'editing' : this.isActive(),
        'copied' : this.isCopied(),
        'selected-draggable' : this.isSelected() && !this.isActive(),
        'active-drag-cell' : this.isActiveDragCell(),
        'is-dragged-over-up' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < this.props.dragged.rowIdx,
        'is-dragged-over-down' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > this.props.dragged.rowIdx,
        'was-dragged-over' : this.wasDraggedOver()
      });
    }
  },

  isActiveDragCell : function(){
    return (this.isSelected() || this.isDraggedOver()) && !this.isActive();
  },

  render: function() {
    return this.transferPropsTo(
      BaseCell({
        className: this.getCellClass(),
        onKeyDown: this.onKeyDown,
        onClick: this.onClick,
        onDoubleClick: this.onDoubleClick,
        formatter: this.getFormatter(),
        handleDragStart: this.handleDragStart,
        onDragEnter: this.handleDragEnter,
        onDragEnd: this.props.handleDragEnd}
      ))
  }

})

module.exports = ExcelCell;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Cell":3,"../utils/MixinHelper":32,"./mixins/CopyableMixin":17,"./mixins/DraggableMixin":18,"./mixins/EditableMixin":19,"./mixins/KeyboardHandlerMixin":20,"./mixins/SelectableMixin":21}],15:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React              = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
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
    var disabled = this.props.column.filterable === false ? true : false;
    return (
      React.DOM.div(null,
        React.DOM.div({className: "form-group"},
            React.DOM.input({type: "text", disabled: disabled, className: "form-control input-sm", placeholder: "Search", value: this.state.filterTerm, onChange: this.handleChange})
        )
      )
    );
  }
});

module.exports = FilterableHeaderCell;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],16:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React              = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
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
      React.DOM.div({
        onClick: this.onClick,
        style: {cursor: 'pointer'}},
        this.props.column.name,
        React.DOM.span({className: this.getSortByClass()})
      )
    );
  }
});

module.exports = SortableHeaderCell;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var PropTypes      = React.PropTypes;

var CopyableMixin = {

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
    if(e.keyCode == this.KeyCode_c || e.keyCode == this.KeyCode_C){
      this.props.handleCopy({value : this.props.value});
    }else if(e.keyCode == this.KeyCode_v || e.keyCode == this.KeyCode_V){
      this.props.handlePaste({value : this.props.value});
    }
  },

  isSelected: function() {
    return (
      this.props.selected
      && this.props.selected.rowIdx === this.props.rowIdx
      && this.props.selected.idx === this.props.idx
    );
  },
};



module.exports = CopyableMixin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],18:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var PropTypes      = React.PropTypes;


var DraggableMixin = {

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

  isSelected: function() {
    return (
      this.props.selected
      && this.props.selected.rowIdx === this.props.rowIdx
      && this.props.selected.idx === this.props.idx
    );
  },

  componentDidUpdate:function(){
    var dragged = this.props.dragged;
    if(dragged && dragged.complete === true){
      this.props.handleTerminateDrag();
    }
  }

};



module.exports = DraggableMixin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],19:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var SimpleTextEditor = require('../../editors/SimpleTextEditor');
var PropTypes      = React.PropTypes;

var EditableMixin = {

  getCellClass : function(){
      return cx({
      'editing' : this.isActive(),
      'selected' : this.isSelected() && !this.isActive()
      });
  },

  propTypes : {
      onCommit : PropTypes.func.isRequired
  },

  canEdit:function(){
    return (this.props.column.editor != null) || this.props.column.editable;
  },

  getEditor:function(){
    var editorProps = {height : this.props.height, onCommit : this.onCommit, initialKeyCode : this.props.selected.initialKeyCode};
    var customEditor = this.props.column.editor;
    if(customEditor && React.isValidComponent(customEditor)){
      //return custom column editor or SimpleEditor if none specified
      return cloneWithProps(customEditor, editorProps);
    }else{
      return cloneWithProps(SimpleTextEditor(), editorProps);
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
    this.props.onCommit({cellKey: this.props.column.key, rowIdx: rowIdx, value : commit.value, keyCode : commit.key});
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
    if(this.canEdit() && !this.isActive()){
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

  isSelected: function() {
    return (
      this.props.selected
      && this.props.selected.rowIdx === this.props.rowIdx
      && this.props.selected.idx === this.props.idx
    );
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
};



module.exports = EditableMixin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../editors/SimpleTextEditor":23}],20:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */

'use strict';

var React = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],21:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;

var SelectableMixin = {

  getDefaultProps : function(){
    return {
      tabIndex : -1,
      ref : "cell"
    }
  },

  getCellClass : function(){
    return this.isSelected() ? 'selected' : null;
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

  checkFocus: function() {
    if (this.isSelected()) {
      this.getDOMNode().focus();
    }
  }
};

module.exports = SelectableMixin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],22:[function(require,module,exports){
module.exports=require(20)
},{}],23:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var cx                      = React.addons.classSet;
var MixinHelper             = require('../utils/MixinHelper');
var EditorMixin             = require('./mixins/EditorMixin');
var TextInputMixin          = require('./mixins/TextInputMixin');
var keyboardHandlerMixin    = require('../cells/mixins/keyboardHandlerMixin');

var SimpleTextEditor = React.createClass({displayName: 'SimpleTextEditor',

  mixins : MixinHelper.mix([keyboardHandlerMixin, EditorMixin, TextInputMixin]),

  overrides : {
      checkFocus : function(){
          this.setTextInputFocus();
      }
  },

  renderEditorNode:function(){
    return (React.DOM.input({type: "text", onBlur: this.commit, className: "form-control", defaultValue: this.getDefaultValue(), style: this.getStyle(), onKeyDown: this.onKeyDown}));
  }


});

module.exports = SimpleTextEditor;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../cells/mixins/keyboardHandlerMixin":22,"../utils/MixinHelper":32,"./mixins/EditorMixin":24,"./mixins/TextInputMixin":25}],24:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';
var React                   = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var cx                      = React.addons.classSet;
var isFunction = require('../../utils/isFunction');

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
    if(this.isNewValueValid(value)){
      this.props.onCommit({value : value, key : args.key});
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
    this.checkFocus();
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
      return React.DOM.span({className: "glyphicon glyphicon-remove form-control-feedback"})
    }
  },

  render:function(){
    if(!isFunction(this.renderEditorNode)){
        throw "Editor Mixin Error : " + this.displayName + " component must implement method renderEditorNode";
    }
    var editorNode = this.renderEditorNode();
    return (
      React.DOM.div({className: this.getContainerClass()},
        editorNode,
        this.renderStatusIcon()
      )
    )
  }
};

module.exports = EditorMixin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils/isFunction":33}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React                 = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var PropTypes             = React.PropTypes;
var BaseGrid              = require('../../Grid');
var ExcelCell             = require('../cells/ExcelCell');
var merge                 = require('../../merge');
var SelectableGridMixin   = require('./mixins/SelectableGridMixin');
var DraggableGridMixin    = require('./mixins/DraggableGridMixin');
var CopyPasteGridMixin    = require('./mixins/CopyPasteGridMixin');
var EditableGridMixin     = require('./mixins/EditableGridMixin');
var SortableGridMixin     = require('./mixins/SortableGridMixin');
var FilterableHeaderCell = require('../cells/headerCells/FilterableHeaderCell');

var ExcelGrid = React.createClass({displayName: 'ExcelGrid',

  getInitialState : function(){
    return {canFilter : false, columnFilters : {}};
  },

  getDefaultProps:function() {
    return {
      rowHeight: 35,
      shouldDisplayToolbar : true
    };
  },

  mixins : [SelectableGridMixin, EditableGridMixin, DraggableGridMixin, CopyPasteGridMixin, SortableGridMixin],

  filterRows:function(){
    var rows = this.props.rows;
    if(this.state.sortColumn){
      rows = this.sortRows(rows);
    }
    if(this.hasFilters()){
      rows = rows.filter(this.isRowDisplayed);
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
      var cellValue = row[key].toLowerCase();
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
      rows.push({ref:"filterRow", headerCellRenderer : FilterableHeaderCell({onChange: this.handleAddFilter}), height : 45});
    }
    return rows;
  },

  getRowOffsetHeight:function(){
    var offsetHeight = 0;
    this.getHeaderRows().forEach(function(row)  {return offsetHeight += row.height;} );
    return offsetHeight;
  },

  render: function() {
    var cellRenderer = (
      ExcelCell({
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
        handleTerminateDrag: this.handleTerminateDrag}
        )
    );

    var rows = this.filterRows();
    return(
      React.DOM.div({className: "container-fluid"},
        this.renderToolbar(null),
        this.transferPropsTo(BaseGrid({
          headerRows: this.getHeaderRows(),
          columns: this.getDecoratedColumns(this.props.columns),
          rows: rows,
          cellRenderer: cellRenderer,
          rowOffsetHeight: this.getRowOffsetHeight()}))
      )
    )
  },

  renderToolbar:function(){
    if(this.props.shouldDisplayToolbar === true){
      return(React.DOM.div({className: "navbar navbar-default"},
        React.DOM.div({className: "navbar-form"},
          React.DOM.div({className: "form-group"},
            React.DOM.button({type: "button", className: "btn btn-default", onClick: this.toggleFilter},
              React.DOM.span({className: "glyphicon glyphicon-filter"}), " Filter Rows"
            )
          )
        )
      ))
    }

  }


})


module.exports = ExcelGrid;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Grid":7,"../../merge":39,"../cells/ExcelCell":14,"../cells/headerCells/FilterableHeaderCell":15,"./mixins/CopyPasteGridMixin":27,"./mixins/DraggableGridMixin":28,"./mixins/EditableGridMixin":29,"./mixins/SelectableGridMixin":30,"./mixins/SortableGridMixin":31}],27:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
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
    var cellKey = this.props.columns[selected.idx].key;
    this.props.onCellChanged({cellKey: cellKey , rowIdx: selected.rowIdx, value : this.state.textToCopy});
    this.setState({copied : null});
  }
}

module.exports = CopyPasteGridMixin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],28:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React                    = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var PropTypes                = React.PropTypes;


var DraggableGridMixin = {

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
      && idx < this.props.columns.length
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
    var cellKey = this.props.columns[this.state.selected.idx].key;
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],29:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var PropTypes           = React.PropTypes;
var merge               = require('../../../merge');

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../../merge":39}],30:[function(require,module,exports){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var SelectableGridMixin = {

  getInitialState: function() {
    return {selected: {rowIdx: 0, idx: 0}};
  },

  onSelect: function(selected) {
    var idx = selected.idx;
    var rowIdx = selected.rowIdx;
    if (
      idx >= 0
      && rowIdx >= 0
      && idx < this.props.columns.length
      && rowIdx < this.props.length
    ) {
      this.setState({selected: selected});
    }
  }
}

module.exports = SelectableGridMixin;

},{}],31:[function(require,module,exports){
(function (global){
/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = (typeof window !== "undefined" ? window.window.React : typeof global !== "undefined" ? global.window.React : null);
var PropTypes           = React.PropTypes;
var SortableHeaderCell  = require('../../cells/headerCells/SortableHeaderCell');
var shallowCloneObject  = require('../../../shallowCloneObject');

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
          column.headerRenderer = SortableHeaderCell;
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../../shallowCloneObject":40,"../../cells/headerCells/SortableHeaderCell":16}],32:[function(require,module,exports){

"use strict";

var keyMirror  = require('react/lib/keyMirror');
var isFunction = require('./isFunction')
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

    mixins.forEach(function(obj){
      //clone the object so that original methods are not overwritten
      var clone = {};
      Object.assign(clone, obj);

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

      Object.assign(primary, clone);
    }, this);
    results.push(primary);
    return results;
  }

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
  }
}
module.exports = MixinHelper;

},{"./isFunction":33,"react/lib/keyMirror":44}],33:[function(require,module,exports){

"use strict";

var isFunction = function(functionToCheck){
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports = isFunction;

},{}],34:[function(require,module,exports){
(function (process){
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

}).call(this,require('_process'))
},{"_process":42}],35:[function(require,module,exports){
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

var copyProperties = require('./copyProperties');

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

},{"./copyProperties":34}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
(function (process){
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

}).call(this,require('_process'))
},{"_process":42}],39:[function(require,module,exports){
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

module.exports = merge;

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
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
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],43:[function(require,module,exports){
(function (process){
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

}).call(this,require('_process'))
},{"_process":42}],44:[function(require,module,exports){
(function (process){
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
 * @providesModule keyMirror
 * @typechecks static-only
 */

"use strict";

var invariant = require("./invariant");

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

}).call(this,require('_process'))
},{"./invariant":43,"_process":42}]},{},[1]);
