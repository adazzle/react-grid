
var { Route, RouteHandler, Link } = ReactRouter;

var basicExample = require('./scripts/exampleBasic');
var editableExample = require('./scripts/exampleEditable');

var App = React.createClass({
  render: function () {
    return (
      <div>
      <ol>
        HELLO I AM AN EXAMPLE
      </ol>
      <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
      <Route name="basic" handler={basicExample}/>
      <Route name="editable" handler={editableExample}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('example'));
});
