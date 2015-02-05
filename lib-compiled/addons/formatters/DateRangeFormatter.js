/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var moment         = require('moment');
var PropTypes = React.PropTypes;

var DateRangeFormatter = React.createClass({displayName: "DateRangeFormatter",

  propTypes : {
      value : PropTypes.shape({
      startDate : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      endDate   : PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    }).isRequired
  },

  getDefaultProps:function(){
    return {
      inputFormat : 'YYYY-MM-DD',
      displayFormat : 'YYYY-MM-DD',
      value : {startDate : null, endDate : null}
    }
  },

  formatDate:function(date){
    if(moment.isMoment(date)){
      return date.format(this.props.displayFormat);
    }else{
      return moment(date, this.props.inputFormat).format(this.props.displayFormat);
    }
  },

  render:function(){
    var startDate = this.props.value.startDate;
    var endDate = this.props.value.endDate;
    return (React.createElement("span", null, startDate, " to ", endDate));
  }
});

module.exports = DateRangeFormatter;
