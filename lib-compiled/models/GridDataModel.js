'use strict';

var GridRow = require('./GridRow');
var GridColumn = require('./GridColumn');
var Immutable = require('Immutable');

var ____Class0=Immutable.Record({ rows: Immutable.List(), columns : Immutable.List() });for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){GridDataModel[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;GridDataModel.prototype=Object.create(____SuperProtoOf____Class0);GridDataModel.prototype.constructor=GridDataModel;GridDataModel.__superConstructor__=____Class0;function GridDataModel(){if(____Class0!==null){____Class0.apply(this,arguments);}}

  GridDataModel.prototype.fromServerModel=function(serverData) {
    if(serverData){
      var $__0=   [[], []],rows=$__0[0],cols=$__0[1];
      serverData.Rows.forEach(function(r)  {
        rows.push(new GridRow(r, serverData.Columns));
      });
      serverData.Columns.forEach(function(c)  {
        cols.push(new GridColumn(c));
      });
      return this.set('rows', Immutable.fromJS(rows)).set('columns', Immutable.fromJS(cols));
    }
  };

  GridDataModel.prototype.getHiddenColumns=function(){
    return this.columns.filter(function(c)  { return c.Hidden !== true ;}).toJSON();
  };





module.exports = GridDataModel;
