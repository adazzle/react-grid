/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var keyboardHandlerMixin    = require('../../KeyboardHandlerMixin');

var SimpleTextEditor = React.createClass({

  propTypes : {
    onKeyDown : React.PropTypes.func.isRequired,
    value : React.PropTypes.any.isRequired,
    commit : React.PropTypes.func.isRequired,
    height : React.PropTypes.number.isRequired
  },

  getValue(){
    return this.refs.text.value;
  },

  render(): ?ReactElement {
    return (<input type="text" onBlur={this.props.commit} className="form-control" defaultValue={this.props.value} onKeyDown={this.props.onKeyDown} />);
  }

});

module.exports = SimpleTextEditor;
