/**
 * @jsx React.DOM
 
 * @flow
 */
"use strict";

var React       = require('react/addons');
var cx          = React.addons.classSet;
var Draggable   = require('./Draggable');
var PropTypes   = React.PropTypes;

var ResizeHandle = React.createClass({

  style: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 6,
    height: '100%'
  },

  render() {
    return (
      <Draggable {...this.props}
        className="react-grid-HeaderCell__resizeHandle"
        style={this.style}
        />
    );
  }
});

var HeaderCell = React.createClass({

  propTypes: {
    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    column: PropTypes.object.isRequired,
    onResize: PropTypes.func
  },

  render() {
    var className = cx({
      'react-grid-HeaderCell': true,
      'react-grid-HeaderCell--resizing': this.state.resizing,
      'react-grid-HeaderCell--locked': this.props.column.locked
    });
    className = cx(className, this.props.className);
    var cell = this.getCell();
    return (
      <div className={className} style={this.getStyle()}>
        {cell}
        {this.props.column.resizeable ?
          <ResizeHandle
            onDrag={this.onDrag}
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
            /> :
          null}
      </div>
    );
  },

  getCell() {
    if (React.isValidElement(this.props.renderer)) {
      return React.addons.cloneWithProps(this.props.renderer, {column : this.props.column});
    } else {
      return this.props.renderer({column: this.props.column});
    }
  },

  getDefaultProps() {
    return {
      renderer: simpleCellRenderer
    };
  },

  getInitialState() {
    return {resizing: false};
  },

  setScrollLeft(scrollLeft) {
    var node = this.getDOMNode();
    node.style.webkitTransform = `translate3d(${scrollLeft}px, 0px, 0px)`;
    node.style.transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
  },

  getStyle() {
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

  onDragStart() {
    this.setState({resizing: true});
  },

  onDrag(e) {
    var width = this.getWidthFromMouseEvent(e);
    if (width > 0 && this.props.onResize) {
      this.props.onResize(this.props.column, width);
    }
  },

  onDragEnd(e) {
    var width = this.getWidthFromMouseEvent(e);
    this.props.onResizeEnd(this.props.column, width);
    this.setState({resizing: false});
  },

  getWidthFromMouseEvent(e) {
    var right = e.pageX;
    var left = this.getDOMNode().getBoundingClientRect().left;
    return right - left;
  }
});

function simpleCellRenderer(props) {
  return <div className="rex-widget-HeaderCell__value">{props.column.name}</div>;
}

module.exports = HeaderCell;
