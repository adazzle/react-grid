/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var MixinHelper             = require('../utils/MixinHelper');
var EditorMixin             = require('./mixins/EditorMixin');
var TextInputMixin          = require('./mixins/TextInputMixin');
var keyboardHandlerMixin    = require('../cells/mixins/keyboardHandlerMixin');
var DateRangeFilter         = require('./widgets/DateRangeFilter');

var DateRangeEditor = React.createClass({

  mixins : MixinHelper.mix([keyboardHandlerMixin, EditorMixin, TextInputMixin]),

  getDefaultProps(){
    return {
      format   : "YYYY-MM-DD",
      ranges   : []
    }
  },

  overrides : {
      checkFocus : function(){
          this.setTextInputFocus();
      },
      getInputNode(){
        return this.refs.datepicker.getDOMNode();
      }
    },

  render(){
    return (
      <div style={this.getStyle()} onKeyDown={this.onKeyDown}>
        <DateRangeFilter ref="datepicker" format={this.props.format} ranges={this.props.ranges} startDate={this.props.value.startDate} endDate={this.props.value.endDate} />
      </div>
    );
  }


});

module.exports = DateRangeEditor;
