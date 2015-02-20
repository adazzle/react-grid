/**
 * @jsx React.DOM
 

 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var SelectableMixin      = require('./addons/cells/mixins/SelectableMixin');

var Cell = React.createClass({

  mixins : [SelectableMixin],

  shouldComponentUpdate(nextProps, nextState) {
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

  onCellClick(){
    this.props.cellMetaData.onCellClick({rowIdx : this.props.rowIdx, idx : this.props.idx});
  },

  render() {
    var style = this.getStyle();

    var className = this.getCellClass();

    var cellContent = this.renderCellContent({
      value : this.props.value,
      column : this.props.column,
      rowIdx : this.props.rowIdx,
      isExpanded : this.props.isExpanded
    });

    return (
      <div {...this.props} className={className} style={style} onClick={this.onCellClick}>
          {cellContent}
          <div className="drag-handle" draggable="true" onDragStart={this.props.handleDragStart}>
          </div>
      </div>
    );
  },

  renderCellContent(props) {
    var formatter = this.getFormatter() || this.props.formatter;
    var formatterTag = React.isValidElement(formatter) ? cloneWithProps(formatter, props) : this.props.formatter(props);
    return (<div
      className="react-grid-Cell__value">{formatterTag} {this.props.cellControls}</div>)

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
