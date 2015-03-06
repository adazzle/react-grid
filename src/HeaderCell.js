/* @flow unkwon */
/**
 * @jsx React.DOM


 */
"use strict";

var React       = require('react/addons');
var cx          = React.addons.classSet;
var Draggable   = require('./Draggable');
var Column   = require('./Column').ColumnType;
var PropTypes   = React.PropTypes;

var ResizeHandle = React.createClass({

  style: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 6,
    height: '100%'
  },

  render(): ?ReactElement {
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
    renderer: PropTypes.element,
    column: PropTypes.shape(Column).isRequired,
    onResize: PropTypes.func
  },

  render(): ?ReactElement {
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

  getCell(): ReactComponent {
    if (this.props.renderer && React.isValidElement(this.props.renderer)) {
      return React.addons.cloneWithProps(this.props.renderer, {column : this.props.column});
    } else {
      return <SimpleCellRenderer column={this.props.column} />;
    }
  },

  getInitialState(): {resizing: boolean} {
    return {resizing: false};
  },

  setScrollLeft(scrollLeft: number) {
    var node = this.getDOMNode();
    node.style.webkitTransform = `translate3d(${scrollLeft}px, 0px, 0px)`;
    node.style.transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
  },

  getStyle(): {width:number; left: number; display: string; position: string; overflow: string; height: number; margin: number; textOverflow: string; whiteSpace: string } {
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

  onDrag(e: SyntheticMouseEvent) {
    var resize = this.props.onResize || null; //for flows sake, doesnt recognise a null check direct
    if(resize) {
      var width = this.getWidthFromMouseEvent(e);
      if (width > 0) {
        resize(this.props.column, width);
      }
    }
  },

  onDragEnd(e: SyntheticMouseEvent) {
    var width = this.getWidthFromMouseEvent(e);
    this.props.onResizeEnd(this.props.column, width);
    this.setState({resizing: false});
  },

  getWidthFromMouseEvent(e: SyntheticMouseEvent): number {
    var right = e.pageX;
    var left = this.getDOMNode().getBoundingClientRect().left;
    return right - left;
  }
});

var SimpleCellRenderer = React.createClass({
  propTypes: {
    column: PropTypes.shape(Column).isRequired,
    },
  render(): ?ReactElement {
    return <div className="widget-HeaderCell__value">{this.props.column.label}</div>;
  }
});

module.exports = HeaderCell;
