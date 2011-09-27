/*	This file uses JsDoc Toolkit documentation.
 *	http://code.google.com/p/jsdoc-toolkit/
 */

/**	@fileOverview This file contains the Burning Boots Javascript Library QUnit Tests.
 *	Documentation on writing tests here: http://docs.jquery.com/QUnit
 *	Example tests: https://github.com/jquery/qunit/blob/master/test/same.js
 *	@author Matt Clarkson
 */

/*jslint
	maxerr:		50,
	indent:		4,
 */

module('Burning Boots Library');

test('Environment', function () {
	expect(2);
	ok(!!window.$, "jQuery Library is present");
	ok(!!window.bb, "Burning Boots Library is present");
});

test('Logging', function () {
	expect(11);

	// Make sure we can get the logging level
	equals(2, bb.log.level, 'Default logging level is correctly set to show warnings');

	// Increase the logging level
	var logLevel	= bb.log.level;
	bb.log.resetLevel();
	equals(logLevel, bb.log.level, 'Reset logging level');

	// Increase the logging level
	logLevel	= bb.log.level;
	bb.log.increaseLevel();
	equals(logLevel + 1, bb.log.level, 'Increased logging level');

	// Decrease the logging level
	logLevel	= bb.log.level;
	bb.log.decreaseLevel();
	equals(logLevel - 1, bb.log.level, 'Decreased logging level');

	// Clear the logging level
	bb.log.clearLevel();
	equals(0, bb.log.level, 'Cleared logging level');

	// These should never throw exceptions
	ok(!bb.log.printLevel(), 'Printed the level');
	ok(!bb.log.error('QUnit'), 'An error was logged');
	ok(!bb.log.warn('QUnit'), 'A warning was logged');
	ok(!bb.log.info('QUnit'), 'Information was logged');
	ok(!bb.log.debug('QUnit'), 'Debugging was logged');
	ok(!bb.log.verbose('QUnit'), 'A verbose message was logged');
});
