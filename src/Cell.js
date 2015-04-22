/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;

var Cell = React.createClass({

  render() {
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
      <div {...this.props} className={className} style={style}>
          {cellContent}
          <div className="drag-handle" draggable="true" onDragStart={this.props.handleDragStart}>
          </div>
      </div>
    );
  },

  renderCellContent(props) {
    var formatter = React.isValidElement(this.props.formatter) ? cloneWithProps(this.props.formatter, props) : this.props.formatter(props);
    return (<div
      className="react-grid-Cell__value" title={this.props.value}>{formatter} {this.props.cellControls}</div>)

  },

  getDefaultProps() {
    return {
      formatter: simpleCellFormatter
    };
  },

  getStyle() {
    var style = {
      position: 'absolute',
      width: this.props.column.width,
      height: this.props.height,
      left: this.props.column.left
    };
    return style;
  },

  setScrollLeft(scrollLeft) {
    if (this.isMounted()) {
      var node = this.getDOMNode();
      var transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  }
});

function simpleCellFormatter(props) {
  return props.value;
}

module.exports = Cell;
