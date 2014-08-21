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

  rangeSeparatorChar : ' - ',

  overrides : {
      checkFocus : function(){
          this.setTextInputFocus();
      },
      getInputNode(){
        return this.refs.datepicker.getDOMNode();
      },
      getValue(){
        var dateToParse = this.getInputNode().value;
        var dateRanges = dateToParse.split(this.rangeSeparatorChar);
        if(dateRanges.length !== 2){
          throw ("DateRangeEditor.getValue error : " + dateToParse + " is not in the correct format");
        }
        return {startDate : dateRanges[0].trim(), endDate : dateRanges[1].trim()}
      }
  },

  isDateValid(date){
    return moment(date, this.props.format, true).isValid();
  },

  validate(value){
    return this.isDateValid(value.startDate)
    && this.isDateValid(value.endDate)
    && moment(value.startDate, this.props.format).isBefore(value.endDate);
  },

  handleDateFilterApply(startDate, endDate){
    this.commit({value : {startDate : startDate, endDate : endDate}});
  },

  renderEditorNode(){
    return (
      <div style={this.getStyle()} onKeyDown={this.onKeyDown}>
        <DateRangeFilter ref="datepicker" onApply={this.handleDateFilterApply} onblur={this.commit} format={this.props.format} ranges={this.props.ranges} startDate={this.props.value.startDate} endDate={this.props.value.endDate} />
      </div>
    );
  }

});

module.exports = DateRangeEditor;
