var Webpack = require("webpack");
var gutil     = require("gulp-util");

var defaultErrorHandler = function(err, ctx) {
  if(err) throw new gutil.PluginError("webpack", err);
  else gutil.log("[webpack]", ctx.toString({
      // output options
  }));
}
module.exports = function (config, done, handlers) {
  handlers = handlers || {};
  handlers = {
    onFatalError: handlers.onFatalError || defaultErrorHandler,
    onError: handlers.onError || defaultErrorHandler,
    onWarning: handlers.onWarning || defaultErrorHandler
  };
  Webpack(config, function(err, stats) {

      if(err) return handlers.onFatalError(err, 'Fatal error');
      var jsonStats = stats.toJson();
      if(!jsonStats) {

      }
      if(jsonStats.errors.length > 0) {
        return handlers.onError(jsonStats.errors, 'Stats error');
      }
      if(jsonStats.warnings.length > 0) {
        return handlers.onWarning(jsonStats.warnings, 'Stats warning');
      }
      done();


    });
}
