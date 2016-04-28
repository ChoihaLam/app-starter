/**
 * Spec bundle
 *
 * @author Chiho Sin
 */

Error.stackTraceLimit = Infinity;

require('core-js');
require('ts-helpers');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('rxjs/Rx');

var testing = require('angular2/testing');
var browser = require('angular2/platform/testing/browser');

/**
 * Set providers
 */
testing.setBaseTestProviders(
  browser.TEST_BROWSER_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_APPLICATION_PROVIDERS
);

/**
 * Assign object include test
 */
Object.assign(global, testing);

//noinspection JSUnresolvedFunction
/**
 * Spec file include test
 */
var testContext = require.context('../src', true, /\.spec\.ts/);

/**
 * All file include test
 */
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

//noinspection JSUnusedLocalSymbols
/**
 * Requires and returns all modules that match
 */
var modules = requireAll(testContext);
