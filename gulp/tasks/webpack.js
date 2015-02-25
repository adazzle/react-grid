var Webpack = require("webpack");
var gutil     = require("gulp-util");

var defaultErrorHandler = function(err) { console.log(err); throw new gutil.PluginError("webpack", err); }
module.exports = function (config, done, handlers) {
  handlers = handlers || {};
  handlers = {
    onFatalError: handlers.onFatalError || defaultErrorHandler,
    onError: handlers.onError || defaultErrorHandler,
    onWarning: handlers.onWarning || defaultErrorHandler
  };
  Webpack(config, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[standalone]", stats.toString({
      // output options
    }));
      done();
  });
}
