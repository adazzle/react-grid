/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React          = require('react/addons');
var cx             = React.addons.classSet;
var PropTypes      = React.PropTypes;
var cloneWithProps = React.addons.cloneWithProps;
var shallowEqual   = require('./shallowEqual');
var emptyFunction  = require('./emptyFunction');
var ScrollShim     = require('./ScrollShim');
var Row            = require('./Row');

var Canvas = React.createClass({displayName: "Canvas",
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
