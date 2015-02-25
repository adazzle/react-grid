var React = require('react/addons');
var ReactRouter = require('react-router');

var BasicExample = require('./scripts/exampleBasic');
var EditableExample = require('./scripts/exampleEditable');

var { Route, RouteHandler, Link } = ReactRouter;

var App = React.createClass({
  render: function () {
    return (
      <div>
      <h1 className="page-header">React Grid Examples</h1>
      <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
      <Route name="basic" handler={BasicExample}/>
      <Route name="editable" handler={EditableExample}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('example'));
});
