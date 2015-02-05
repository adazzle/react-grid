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
var keyboardHandlerMixin    = require('../cells/mixins/KeyboardHandlerMixin');
var DateRangeFilter         = require('./widgets/DateRangeFilter');

var DateRangeEditor = React.createClass({displayName: "DateRangeEditor",

  mixins : [keyboardHandlerMixin, EditorMixin, TextInputMixin],

  getDefaultProps:function(){
    return {
      format   : "YYYY-MM-DD",
      ranges   : []
    }
  },

  rangeSeparatorChar : ' - ',

  overrides : {
      checkFocus : function(){
          this.setTextInputFocus();
      },
      getInputNode:function(){
        return this.refs.datepicker.getDOMNode();
      },
      getValue:function(){
        var dateToParse = this.getInputNode().value;
        var dateRanges = dateToParse.split(this.rangeSeparatorChar);
        if(dateRanges.length !== 2){
          throw ("DateRangeEditor.getValue error : " + dateToParse + " is not in the correct format");
        }
        return {startDate : dateRanges[0].trim(), endDate : dateRanges[1].trim()}
      }
  },

  isDateValid:function(date){
    return moment(date, this.props.format, true).isValid();
  },

  validate:function(value){
    return this.isDateValid(value.startDate)
    && this.isDateValid(value.endDate)
    && (moment(value.startDate, this.props.format).isBefore(value.endDate)
    || moment(value.startDate, this.props.format).isSame(value.endDate));
  },

  handleDateFilterApply:function(startDate, endDate){
    this.commit({value : {startDate : startDate, endDate : endDate}});
  },

  renderEditorNode:function(){
    return (
      React.createElement("div", {style: this.getStyle(), onKeyDown: this.onKeyDown}, 
        React.createElement(DateRangeFilter, {ref: "datepicker", onApply: this.handleDateFilterApply, format: this.props.format, ranges: this.props.ranges, startDate: this.props.value.startDate, endDate: this.props.value.endDate})
      )
    );
  }

});

module.exports = DateRangeEditor;
