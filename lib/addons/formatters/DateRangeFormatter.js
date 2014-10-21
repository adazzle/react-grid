/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var moment         = require('moment');
var PropTypes = React.PropTypes;

var DateRangeFormatter = React.createClass({

  propTypes : {
      value : PropTypes.shape({
      startDate : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      endDate   : PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    }).isRequired
  },

  getDefaultProps(){
    return {
      inputFormat : 'YYYY-MM-DD',
      displayFormat : 'YYYY-MM-DD',
      value : {startDate : null, endDate : null}
    }
  },

  formatDate(date){
    if(moment.isMoment(date)){
      return date.format(this.props.displayFormat);
    }else{
      return moment(date, this.props.inputFormat).format(this.props.displayFormat);
    }
  },

  render(){
    var startDate = this.props.value.startDate;
    var endDate = this.props.value.endDate;
    return (<span>{startDate} to {endDate}</span>);
  },

  shouldComponentUpdate : function(nextProps, nextState){
    return this.props.value.startDate !== nextProps.value.startDate && this.props.value.endDate !== nextProps.value.endDate;
  }
});

module.exports = DateRangeFormatter;
