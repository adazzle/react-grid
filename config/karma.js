
/*!
* Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
* Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
*/

/*
* Karma configuration. For more information visit
* http://karma-runner.github.io/0.12/config/configuration-file.html
*/

'use strict';

var webpackConfig = require('../webpack.config.js');
var RewirePlugin = require("rewire-webpack");
var path = require('path');

module.exports = function (config) {
  config.set({

    basePath: __dirname,

    files: [
      '../test/Grid.spec.js'
    ],

    preprocessors: {
      '../test/Grid.spec.js': ['webpack']
    },

    webpack: {
      cache: true,
      module: {
        loaders: webpackConfig.module.loaders,
        postLoaders: [ { // << add subject as webpack's postloader
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'istanbul-instrumenter'
      } ]
    },
    plugins: [
    new RewirePlugin()
    ]
  },

  browserNoActivityTimeout: 100000,

  // coverage reporter generates the coverage
  reporters: ['junit', 'progress', 'coverage'],

  coverageReporter: {
    // specify a common output directory
    dir: '../test/reports/coverage',
    reporters: [
    // reporters not supporting the `file` property
    { type: 'html', subdir: 'report-html' },
    { type: 'lcov', subdir: 'report-lcov' }
    ]
  },

  // the default configuration
  junitReporter: {
    outputFile: '../test/reports/test-results.xml',
    suite: ''
  },

  webpackServer: {
    stats: {
      colors: true
    }
  },

  autoWatch: false,

  singleRun: true,

  frameworks: ['jasmine'],

  browsers: ['Chrome'],

  plugins: [
  'karma-chrome-launcher',
  'karma-firefox-launcher',
  'karma-phantomjs-launcher',
  'karma-jasmine',
  'karma-webpack',
  'karma-coverage',
  'karma-junit-reporter'
  ]

});
};
