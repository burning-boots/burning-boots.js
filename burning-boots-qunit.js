/*	This file uses JsDoc Toolkit documentation.
 *	http://code.google.com/p/jsdoc-toolkit/
 */

/**	@fileOverview This file contains the Burning Boots Javascript Library QUnit Tests.
 *	Documentation on writing tests here: http://docs.jquery.com/QUnit
 *	Example tests: https://github.com/jquery/qunit/blob/master/test/same.js
 *	@author Matt Clarkson
 */

/*jslint
	browser:	true,
	es5:		true,
	maxerr:		50,
	indent:		4,
 */

/*global
	test,
	asyncTest,
	expect,
	module,
	Qunit,
	ok,
	equal,
	notEqual,
	deepEqual,
	notDeepEqual,
	strictEqual,
	notStrictEqual,
	raises,
	start,
	stop,
	bb,
	$
 */

module('Burning Boots Library' + (!!bb.version ? (' ' + bb.version.toString()) : ''));

test('Environment', function () {
	'use strict';
	expect(3);
	ok(!!window.$, 'jQuery Library is present');
	ok(!!window.bb, 'Burning Boots Library is present');
	ok(!!bb.version, 'Burning Boots Library version ' + (!!bb.version ? bb.version.toString() : 'not found'));
});

test('CSS', function () {
	'use strict';
	expect(6);

	// Cache the local storage
	var presentation	= localStorage.getItem('css.presentation'),
		layout			= localStorage.getItem('css.layout');

	// Test the layout
	bb.css.layout('qunit-test');
	ok($(document.documentElement).hasClass('layout-qunit-test'), 'Correctly added the layout class');
	bb.css.layout('qunit-retest');
	ok(!$(document.documentElement).hasClass('layout-qunit-test') && $(document.documentElement).hasClass('layout-qunit-retest'), 'Correctly removed and added the layout class');
	ok(localStorage.getItem('css.layout') === 'qunit-retest', 'Correctly stored in layout local storage');

	// Test the presentation
	bb.css.presentation('qunit-test');
	ok($(document.documentElement).hasClass('presentation-qunit-test'), 'Correctly added the presentation class');
	bb.css.presentation('qunit-retest');
	ok(!$(document.documentElement).hasClass('presentation-qunit-test') && $(document.documentElement).hasClass('presentation-qunit-retest'), 'Correctly removed and added the presentation class');
	ok(localStorage.getItem('css.presentation') === 'qunit-retest', 'Correctly stored presentation in local storage');

	// Restore the local storage
	if (presentation) {
		localStorage.setItem('css.presentation', presentation);
	} else {
		localStorage.clear('css.presentation');
	}
	if (layout) {
		localStorage.setItem('css.layout', layout);
	} else {
		localStorage.clear('css.layout');
	}
});

test('Key Binding', function () {
	'use strict';
	expect(6);

	var div = document.createElement('div'),
		event	= $.Event('keydown');

	// Add some key bindings
	bb.keyBinding.add(document, 'CTRL+ALT+M', function () {ok(true, 'Document registered CTRL+ALT+M.'); });
	bb.keyBinding.add(document, 'CTRL+ALT+M', function () {ok(true, 'Document registered CTRL+ALT+M.'); });
	bb.keyBinding.add(document, 'CTRL+ALT+Z', function () {ok(true, 'Document registered CTRL+ALT+Z.'); });
	bb.keyBinding.add(div, 'CTRL+ALT+P', function () {ok(true, 'The div registered CTRL+ALT+P.'); });
	bb.keyBinding.add(div, 'CTRL+ALT+Z', function () {ok(true, 'The div registered CTRL+ALT+Z.'); });

	// Trigger the key presses
	event.ctrlKey	= true;
	event.altKey	= true;
	event.which	= 77; // M
	$(document).trigger(event);
	event.which	= 90; // Z
	$(document).trigger(event);
	$(document).trigger(event);
	$(div).trigger(event); // This will bubble up
	event.which	= 80; // P
	$(div).trigger(event);

	// Remove the key bindings
	bb.keyBinding.remove(document, 'CTRL+ALT+M');
	bb.keyBinding.remove(document, 'CTRL+ALT+Z');
	bb.keyBinding.remove(div, 'CTRL+ALT+Z');
	bb.keyBinding.remove(div, 'CTRL+ALT+P');

	// Make sure a key press doesn't register a QUnit result.
	$(document).trigger(event);

	// Remove the div
	div = null;
});

test('Logging', function () {
	'use strict';
	expect(16);

	// Make sure we can get the logging level
	equal(2, bb.log.level, 'Default logging level is correctly set to show warnings');

	// You shouldn't ever be able to directly set the logging level
	try {
		bb.log.level = 5;
		ok(false, 'Setting the logging level directly did not throw an exception');
	} catch (exception) {
		ok(true, 'Setting the logging level directly correctly threw an exception');
	}

	// Increase the logging level
	var logLevel	= bb.log.level,
		event	= $.Event('keydown');
	bb.log.resetLevel();
	equal(logLevel, bb.log.level, 'Reset logging level');

	// Increase the logging level
	logLevel	= bb.log.level;
	bb.log.increaseLevel();
	equal(logLevel + 1, bb.log.level, 'Increased logging level');

	// Decrease the logging level
	logLevel	= bb.log.level;
	bb.log.decreaseLevel();
	equal(logLevel - 1, bb.log.level, 'Decreased logging level');

	// Clear the logging level
	bb.log.clearLevel();
	equal(0, bb.log.level, 'Cleared logging level');

	// These should never throw exceptions
	ok(!bb.log.printLevel(), 'Printed the level');
	ok(!bb.log.error('QUnit'), 'An error was logged');
	ok(!bb.log.warn('QUnit'), 'A warning was logged');
	ok(!bb.log.info('QUnit'), 'Information was logged');
	ok(!bb.log.debug('QUnit'), 'Debugging was logged');
	ok(!bb.log.verbose('QUnit'), 'A verbose message was logged');

	/* Test the logging key bindings
	 * CTRL+ALT+Q	- Increases logging level
	 * CTRL+ALT+W	- Decreases logging level
	 * CTRL+ALT+A	- Resets logging level
	 * CTRL+ALT+S	- Clears the logging level
	 */
	event.ctrlKey	= true;
	event.altKey	= true;
	event.which	= 83; // S
	$(document).trigger(event);
	equal(0, bb.log.level, 'Cleared logging level with CTRL+ALT+S');
	event.which	= 65; // A
	$(document).trigger(event);
	equal(2, bb.log.level, 'Reset the logging level with CTRL+ALT+A');
	event.which	= 81; // Q
	logLevel	= bb.log.level;
	$(document).trigger(event);
	equal(logLevel + 1, bb.log.level, 'Increased the logging level with CTRL+ALT+Q');
	event.which	= 87; // W
	logLevel	= bb.log.level;
	$(document).trigger(event);
	equal(logLevel - 1, bb.log.level, 'Cleared logging level with CTRL+ALT+W');
});
