var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var basicExample = require('./scripts/exampleBasic');
var editableExample = require('./scripts/editableExample');

var App = React.createClass({
  render: function () {
    return (
      <div>
      <ol>
      <li><Link to="home">Home</Link></li>
      <li><Link to="signin">Sign in</Link></li>
      <li><Link to="forgot-password">Forgot Password</Link></li>
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

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('example'));
});
