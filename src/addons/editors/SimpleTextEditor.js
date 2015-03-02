/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var keyboardHandlerMixin    = require('../../KeyboardHandlerMixin');

var SimpleTextEditor = React.createClass({

  getStyle(){
    return {
      height : this.props.height - 1
    }
  },

  render(): ?ReactElement {
    return (<input type="text" style={this.getStyle()} onBlur={this.props.commit} className="form-control" defaultValue={this.props.value} onKeyDown={this.props.onKeyDown} />);
  }

});

module.exports = SimpleTextEditor;
