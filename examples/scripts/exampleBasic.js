var ReactGrid = require('./build/ReactGrid.Grid');
var getRows   = require('./getRows');

var columns = [
{
  key: 'id',
  name: 'ID'
},
{
  key: 'title',
  name: 'Title'
},
{
  key: 'count',
  name: 'Count'
}
]

module.exports = React.createClass({

  render:function(){
    return(<ReactGrid rows={getRows(0,100)} columns={columns}/>)
  }

});
