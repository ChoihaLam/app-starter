/**
 * Protractor e2e test configuration
 *
 * @author Chiho Sin
 */
require('ts-node/register');
var helpers = require('./helpers');

//noinspection JSValidateTypes,JSUnusedGlobalSymbols
exports.config = {

  /**
   * Test base path
   */
  baseUrl: 'http://localhost:3000/',

  /**
   * E2e test configuration file in src
   */
  specs: [
    helpers.root('src/**/**.e2e.ts'),
    helpers.root('src/**/*.e2e.ts')
  ],

  /**
   * Exclude in test
   */
  exclude: [],

  /**
   * Frameworks to use
   */
  framework: 'jasmine2',

  /**
   * Scripts timeout
   */
  allScriptsTimeout: 110000,

  /**
   * Jasmine configuration
   */
  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },

  /**
   * Test script communicates directly Chrome Driver or Firefox Driver
   */
  directConnect: true,

  /**
   * Browser capabilities to use
   */
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  /**
   * Prep test running
   */
  onPrepare: function () {
    browser.ignoreSynchronization = true;
  },

  /**
   * Selenium server location with java
   */
  seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',

  /**
   * Use all angular app root
   *
   * tells Protractor to wait for any angular2 apps on the page instead of just the one matching `rootEl`
   */
  useAllAngular2AppRoots: true
};
