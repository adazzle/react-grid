/**
 * @jsx React.DOM
 */
(function(){

  var React = (typeof window !== "undefined" && window.React) ? window.React : require('react');
  var Grid = (typeof window !== "undefined" && window.ReactGrid) ? window.ReactGrid.Grid : require('../../index');

  function rows(start, end) {
    var rows = [];
    for (var i = start; i < end; i++) {
      rows.push([i, 'Name ' + i, 'Surname ' + i]);
    }
    return rows;
  }

  var columns = [
    {
      name: '№',
      width: '10%',
      key: 0
    },
    {
      name: 'Name',
      width: '40%',
      resizeable: true,
      key: 1
    },
    {
      name: 'Surname',
      width: '50%',
      resizeable: true,
      key: 2
    }
  ];

var Component = React.createClass({

    render: function() {
      return (<Grid
        columns={columns}
        length={30000}
        rows={rows}
        rowHeight={40}/>)
    }
  });

  if(typeof module != 'undefined' && module.exports){
    module.exports = Component;
  }else{
    this.BasicGrid = Component;
  }

}).call(this);
