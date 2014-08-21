/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;

var validateDate = function(props, propName, componentName) {
			if(!moment(props).isValid()){
				throw(propName + " must be a valid date");
			}
		}

var DateRangeFilter = React.createClass({

	getInitialState : function(){
		return {dateRange : ''};
	},

  getDefaultProps() {
    return  {hideRangeInputs : true}
  },

	propTypes : {
		format    : React.PropTypes.string,
		ranges    : React.PropTypes.object,
		onApply   : React.PropTypes.func,
		startDate : validateDate,
		endDate   : validateDate
	},

	componentDidMount : function(){
		//initialise jQuery date range widget -
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
    if(this.props.hideRangeInputs === true){
      $('div.daterangepicker').find('.range_inputs').hide();
    }
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


module.exports = DateRangeFilter;
