'use strict';

var merge = require('react/lib/mergeInto');



  function GridColumn(serverCol){
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




module.exports = GridColumn;
