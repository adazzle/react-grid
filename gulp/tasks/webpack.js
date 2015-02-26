var Webpack = require("webpack");
var gutil     = require("gulp-util");

var defaultErrorHandler = function(err, ctx) {
//  if(err) throw new gutil.PluginError("webpack", err);

    gutil.log("[webpack]", err);
}
module.exports = function (config, done, handlers) {
  handlers = handlers || {};
  handlers = {
    onFatalError: handlers.onFatalError || defaultErrorHandler,
    onError: handlers.onError || defaultErrorHandler,
    onWarning: handlers.onWarning || defaultErrorHandler
  };
  Webpack(config, function(err, stats) {


    if(err) throw new gutil.PluginError("webpack", err);

    done();
  });
}
