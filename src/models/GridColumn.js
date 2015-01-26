'use strict';
/* @flow */

var merge = require('react/lib/mergeInto');

class GridColumn {

  constructor(serverCol){
    this.editable = true;
    this.sortable = true;
    this.resizeable = true;
    this.width = 200;
    if(serverCol){
      merge(this, serverCol);
      this.key = serverCol.ItemDataId;
      this.name = serverCol.HeaderText;
    }
  }

}


module.exports = GridColumn;
