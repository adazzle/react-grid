'use strict';

class GridRow {

  constructor(serverRow, columns){
    this.FlightingItems = [];
    this.FormatOptions = [];
    this.Value = '';
    if(serverRow && columns){
      this.Id = serverRow.Id;
      serverRow.Items.forEach(item => {
        var col = columns.filter(c => c.ItemDataType === item.ItemDataType)[0];
        if (col !== null) {
          this[col.ItemId] = item.Value;
          if (item.FormatOptions !== null && typeof item.FormatOptions !== 'undefined') {
              this.FormatOptions.push({
                  Value: item.FormatOptions,
                  Row: this.Index,
                  Column: col.ItemId
              });
          }
        }
      });
    }
  }

}

module.exports = GridRow;
