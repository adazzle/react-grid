
/*!
* Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
* Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
*/

/*
* Karma configuration. For more information visit
* http://karma-runner.github.io/0.12/config/configuration-file.html
*/

'use strict';

var webpackConfig = require('../webpack.config.js')(/* release */ false);

module.exports = function (config) {
  config.set({

    basePath: '../',

    files: [
    'node_modules/es5-shim/es5-shim.js',
    'node_modules/es5-shim/es5-sham.js',
    'node_modules/es6-shim/es6-shim.js',
    'test/**/*.spec.js'
    ],

    preprocessors: {
      'src/js/**': ['webpack']
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
    }
  },

  browserNoActivityTimeout: 100000,

  coverageReporter: {
    // specify a common output directory
    dir: 'build/reports/coverage',
    reporters: [
    // reporters not supporting the `file` property
    { type: 'html', subdir: 'report-html' },
    { type: 'lcov', subdir: 'report-lcov' },
    // reporters supporting the `file` property, use `subdir` to directly
    // output them in the `dir` directory
    { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
    { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
    { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
    { type: 'text', subdir: '.', file: 'text.txt' },
    { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
    ]
  },

  // coverage reporter generates the coverage
  reporters: ['junit', 'progress', 'coverage'],

  // the default configuration
  junitReporter: {
    outputFile: 'test-results.xml',
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
