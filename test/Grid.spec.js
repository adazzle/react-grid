'use strict';
var React = require('react/addons');

describe('Grid', () => {
  var Grid, component;

  beforeEach(() => {
    Grid = require('../lib/Grid.js');
    component= new Grid();
  });

  it('should create a new instance of Grid', () => {
    expect(component).toBeDefined();
  });
});
