'use strict';



  function GridRow(serverRow, columns){
    this.FlightingItems = [];
    this.FormatOptions = [];
    this.Value = '';
    if(serverRow && columns){
      this.Id = serverRow.Id;
      serverRow.Items.forEach(function(item)  {
        var col = columns.filter(function(c)  {return c.ItemDataType === item.ItemDataType;})[0];
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
      }.bind(this));
    }
  }



module.exports = GridRow;
