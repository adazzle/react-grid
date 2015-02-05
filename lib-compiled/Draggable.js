/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React         = require('react');
var PropTypes     = React.PropTypes;
var emptyFunction = require('./emptyFunction');

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
