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

  var validateDate = function(props, propName, componentName) {
				if(!moment(props).isValid()){
					console.warn(propName + " must be a valid date");
				}
			}

  var DateRangeFilter = React.createClass({

		getInitialState : function(){
			return {dateRange : ''};
		},

		propTypes : {
			format : React.PropTypes.string,
			ranges : React.PropTypes.object,
			onApply : React.PropTypes.func,
			startDate : validateDate,
			endDate : validateDate
		},

		componentDidMount : function(){
			//initialise jQuery date range widget
			var $calendarNode = $(this.refs.calendar.getDOMNode())
			var $calendar = $calendarNode.daterangepicker({ranges : this.props.ranges, format : this.props.format, opens : 'left', locale: { cancelLabel: 'Clear' }, applyClass : 'btn-primary'  });
			this.calendar = $calendar.data('daterangepicker');
			if(this.props.startDate){
				this.calendar.setStartDate(this.props.startDate);
			}
			if(this.props.endDate){
				this.calendar.setEndDate(this.props.endDate);
			}
			$calendar.on('apply.daterangepicker', this.handleApply).on('cancel.daterangepicker', this.handleClear);
		},

		componentWillUnmount : function(){
			//destroy widget on unMount
			this.calendar.remove();
		},

		handleApply : function(ev, picker) {
			if(this.props.onApply){
				//return moment instances for start and end date ranges
				this.props.onApply(picker.startDate, picker.endDate);
			}
			this.setState({dateRange : picker.startDate.format(picker.format) + " - " + picker.endDate.format(picker.format)})
		},

		handleClear : function(){
			this.setState({dateRange : ''});
			if(this.props.onApply){
				//return moment instances for start and end date ranges
				this.props.onApply(null, null);
			}
		},

		getTitle : function(){
			return this.state.dateRange !== '' ? this.state.dateRange : this.props.title;
		},

		render: function() {
			return (
        <input ref="calendar" />
				);
		}
	});

var DateRangeEditor = React.createClass({

  mixins : MixinHelper.mix([keyboardHandlerMixin, EditorMixin, TextInputMixin]),

  getDefaultProps(){
    return {
      format : "YYYY-MM-DD"
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
        <DateRangeFilter ref="datepicker" format={this.props.format} startDate={this.props.value.startDate} endDate={this.props.value.endDate} />
      </div>
    );
  }


});

module.exports = DateRangeEditor;
