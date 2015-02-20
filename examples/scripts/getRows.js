/* @flow */
var ExcelRow = require('../build/ReactGrid').ExcelRow;
module.exports = function(start: number, end: number): Array<ExcelRow> {
  var result = []
  for (var i = start; i < end; i++) {
    result.push({
      id: i,
      title: 'Title ' + i,
      count: i * 1000
    });
  }
  return result;
};
