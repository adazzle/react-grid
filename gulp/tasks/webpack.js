var Webpack = require("webpack");
var gutil     = require("gulp-util");

var defaultErrorHandler = function(err) { throw new gutil.PluginError("webpack", err); }
module.exports = function (config, done, handlers) {
  handlers = handlers || {};
  handlers = {
    onFatalError: handlers.onFatalError || defaultErrorHandler,
    onError: handlers.onError || defaultErrorHandler,
    onWarning: handlers.onWarning || defaultErrorHandler
  };
  Webpack(config, function(err, stats) {
    console.log(stats);
    console.log(err);
      if(err)
          return handlers.onFatalError(err);
      var jsonStats = stats.toJson();
      if(jsonStats.errors.length > 0)
          return handlers.onError(jsonStats.errors);
      if(jsonStats.warnings.length > 0)
          return handlers.onWarning(jsonStats.warnings);
      done();
  });
}
