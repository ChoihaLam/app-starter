/**
 * Karma test configuration
 *
 * @author Chiho Sin
 */
module.exports = function (config) {
  var testWebpackConfig = require('./webpack.test.js');

  //noinspection JSUnresolvedVariable
  config.set({

    /**
     * Base path
     *
     * base path that will be used to resolve all patterns (e.g. files, exclude)
     */
    basePath: '',

    /**
     * frameworks to use
     *
     * available frameworks see: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    /**
     * List of files to exclude
     */
    exclude: [],

    /**
     * List of files / patterns to load in the browser
     *
     * test environment in ./spec-bundle.js
     */
    files: [{pattern: './config/spec-bundle.js', watched: false}],

    /**
     * Prep process matching files before serving them to the browser
     *
     * available preprocessors see: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {'./config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']},

    /**
     * Webpack configuration
     *
     * configuration file at ./webpack.test.js
     */
    webpack: testWebpackConfig,

    /**
     * Test coverage reporter configuration
     */
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'json'},
        {type: 'html'}
      ]
    },

    /**
     * Don't show info when running test
     */
    webpackServer: {noInfo: true},

    /**
     * Test results reporter to use
     *
     * possible values: 'dots', 'progress', available reporters see: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['mocha', 'coverage'],

    /**
     * Test web server port
     */
    port: 9876,

    /**
     * Enable colors in the output (reporters and logs)
     */
    colors: true,

    /**
     * Level of logging
     *
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,

    /**
     * Disable watching file and executing tests whenever any file changes
     */
    autoWatch: false,

    /**
     * Start these browsers
     *
     * available browser launchers see: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: [
      // 'Chrome'
      'PhantomJS'
    ],

    /**
     * Continuous Integration mode
     *
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true
  });

};
