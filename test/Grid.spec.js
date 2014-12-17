'use strict';
var React = require('react/addons');
var BaseGrid = require('../lib/Grid');
var TestUtils = React.addons.TestUtils;

var columns = [
{
  key: 'id',
  name: 'ID',
  width: '20%'
},
{
  key: 'title',
  name: 'Title'
},
{
  key: 'count',
  name: 'Count',
  width: '20%'
},
]

var getRows = function(start, end) {
  var result = []
  for (var i = start; i < end; i++) {
    result.push({
      id: i,
      title: 'Title ' + i,
      count: i * 1000
    });
  }
  return result;
}

describe('Grid', () => {
  var Grid, component;

  beforeEach(() => {
    Grid = require('../lib/addons/grids/ExcelGrid.js');
    component = TestUtils.renderIntoDocument(<Grid
      columns={columns}
      length={1000}
      rows={getRows(0, 1000)}/>);
  });

  it('should create a new instance of Grid', () => {
    expect(component).toBeDefined();
  });

  it("should render a base grid with relevant props", () => {
    var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGrid);
    expect(baseGrid).toBeDefined();

  });
});
