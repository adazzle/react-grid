/* @flow */
'use strict';

var GridRow = require('./GridRow');
var GridColumn = require('./GridColumn');
var Immutable = require('Immutable');

class GridDataModel extends Immutable.Record({ rows: Immutable.List(), columns : Immutable.List() }) {

  fromServerModel(serverData) {
    if(serverData){
      var [rows, cols] = [[], []];
      serverData.Rows.forEach(r => {
        rows.push(new GridRow(r, serverData.Columns));
      });
      serverData.Columns.forEach(c => {
        cols.push(new GridColumn(c));
      });
      return this.set('rows', Immutable.fromJS(rows)).set('columns', Immutable.fromJS(cols));
    }
  }

  getHiddenColumns(){
    return this.columns.filter(c => { return c.Hidden !== true ;}).toJSON();
  }



}

module.exports = GridDataModel;
