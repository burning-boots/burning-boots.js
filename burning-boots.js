/*	This file uses JsDoc Toolkit documentation.
 *	http://code.google.com/p/jsdoc-toolkit/
 */

/**	@fileOverview This file contains the Burning Boots Javascript Library.
 *	@author Matt Clarkson
 */

/*jslint
	browser:	true,
	es5:		true,
	maxerr:		50,
	indent:		4,
 */

(function (window, undefined) {
	'use strict';

	// Local copies of the window objects for speed
	var document	= window.document,
/*		navigator	= window.navigator,*/
/*		location	= window.location,*/
		parent		= window.parent,
		console		= window.console,
		$			= window.$,
		bb			= {};

	// Check the needed dependencies
	if ((window === undefined) || (window.$ === undefined)) {
		if (console.error) {
			console.error('BB: Error: You must include jQuery for the burning-boots.js library to work.');
		}
		window.bb	= undefined;
		return;
	}

	// If the library has already been added don't add it again!
	if (window.bb) {
		return;
	}

	// If the parent has the library in it use that
	if (parent.bb) {
		window.bb = parent.bb;
		return;
	}

	/**	Exceptions that can be used throughout the library.
	 *	<br/><br/>
	 *	They are <code>Object.freeze</code>'ed in the
	 *	<code>bb.methods.init()</code> function to prevent
	 *	values being changed.
	 *	<br/><br/>
	 *	@namespace	Private Exceptions
	 *	@private
	 *	@since Version 0.1.0
	 */
	bb.exceptions =
		{
			FAIL:					'(BB Exception) Generic failure',
			INVALID_PARAMS:			'(BB Exception) Invalid parameters for function'
		};

	/**	Definitions that can be used throughout the library.
	 *	<br/><br/>
	 *	They are <code>Object.freeze</code>'ed in the
	 *	<code>bb.methods.init()</code> function to prevent
	 *	values being changed.
	 *	<br/><br/>
	 *	These are like <code>#define</code> in C programming.
	 *	@namespace	Private Definitions
	 *	@private
	 *	@since Version 0.1.0
	 */
	bb.defines =
		{
			/**	A mapping between ASCII and the string for a key.  These are the
			 *	keys that are available to be binded too.
			 *	<br/><br/>
			 *	The only keys that are mapped are the consistent keys across
			 *	most browsers.  These are available at http://unixpapa.com/js/key.html
			 *	@private
			 *	@since Version 0.1.0
			 */
			keyMap:
				{
					/** The Backspace key */
					8:		'BACKSPACE',
					/** The Tab key */
					9:		'SPACE',
					/** The Enter key */
					13:		'ENTER',
					/** The Escape key */
					27:		'ESC',
					/** The Space key */
					32:		'SPACE',
					/** The Page Down key */
					33:		'PAGEDOWN',
					/** The Page Up key */
					34:		'PAGEUP',
					/** The End key */
					35:		'END',
					/** The Home key */
					36:		'HOME',
					/** The Left Arrow key */
					37:		'LEFT',
					/** The Up Arrow key */
					38:		'UP',
					/** The Right Arrow key */
					39:		'RIGHT',
					/** The Down Arrow key */
					40:		'DOWN',
					/** The Insert key */
					45:		'INSERT',
					/** The Delete key */
					46:		'DELETE',
					/** The A key */
					65:		'A',
					/** The B key */
					66:		'B',
					/** The C key */
					67:		'C',
					/** The D key */
					68:		'D',
					/** The E key */
					69:		'E',
					/** The F key */
					70:		'F',
					/** The G key */
					71:		'G',
					/** The H key */
					72:		'H',
					/** The I key */
					73:		'I',
					/** The J key */
					74:		'J',
					/** The K key */
					75:		'K',
					/** The L key */
					76:		'L',
					/** The M key */
					77:		'M',
					/** The N key */
					78:		'N',
					/** The O key */
					79:		'O',
					/** The P key */
					80:		'P',
					/** The Q key */
					81:		'Q',
					/** The R key */
					82:		'R',
					/** The S key */
					83:		'S',
					/** The T key */
					84:		'T',
					/** The U key */
					85:		'U',
					/** The V key */
					86:		'V',
					/** The W key */
					87:		'W',
					/** The X key */
					88:		'X',
					/** The Y key */
					89:		'Y',
					/** The Z key */
					90:		'Z',
					/** The F1 key */
					112:	'F1',
					/** The F2 key */
					113:	'F2',
					/** The F3 key */
					114:	'F3',
					/** The F4 key */
					115:	'F4',
					/** The F5 key */
					116:	'F5',
					/** The F6 key */
					117:	'F6',
					/** The F7 key */
					118:	'F7',
					/** The F8 key */
					119:	'F8',
					/** The F9 key */
					120:	'F9',
					/** The F10 key */
					121:	'F10',
					/** The F11 key */
					122:	'F11',
					/** The F12 key */
					123:	'F12'
				}
		};

	/**	Enumerators that can be used throughout the library.
	 *	<br/><br/>
	 *	They are <code>Object.freeze</code>'ed in the
	 *	<code>bb.methods.init()</code> function to prevent
	 *	values being changed.
	 *	<br/><br/>
	 *	These are like <code>enums</code> in C programming.
	 *	@namespace	Private enumerators
	 *	@private
	 *	@since Version 0.1.0
	 */
	bb.enums =
		{
			/**	This is the logging level of the bb library.
			 *	@namespace Logging Level
			 *	@private
			 *	@since Version 0.1.0
			 */
			logLevel :
				{
					/**	No logging
					 *	@private
					 *	@since Version 0.1.0
					 */
					NONE:		0,

					/**	An error
					 *	@private
					 *	@since Version 0.1.0
					 */
					ERROR:		1,

					/**	A warning
					 *	@private
					 *	@since Version 0.1.0
					 */
					WARN:		2,

					/**	An informative message
					 *	@private
					 *	@since Version 0.1.0
					 */
					INFO:		3,

					/**	A debugging message
					 *	@private
					 *	@since Version 0.1.0
					 */
					DEBUG:		4,

					/**	A verbose message
					 *	@private
					 *	@since Version 0.1.0
					 */
					VERBOSE:	5,

					/**	The number of logging levels
					 *	@private
					 *	@since Version 0.1.0
					 */
					NUM:		6,

					// These provide an easy way to convert to a string value.
					0:	'None',
					1:	'Error',
					2:	'Warning',
					3:	'Information',
					4:	'Debug',
					5:	'Verbose'
				}
		};

	/**	Private members
	 *	@namespace	Private members
	 *	@private
	 *	@since Version 0.1.0
	 */
	bb.members =
		{
			/**	The current logging level of the bb library
			 *	@private
			 *	@since Version 0.1.0
			 */
			logLevel: bb.enums.logLevel.WARN,

			/**	The dynamic CSS of the page
			 *	@private
			 *	@since Version 0.1.0
			 */
			css:
				{
					/**	The dynamic CSS presentation colours of the page
					 *	@name		presentation
					 *	@fieldOf	bb.members.css
					 *	@private
					 *	@since Version 0.1.0
					 */
					get presentation() {
						try {
							return localStorage.getItem('css.presentation');
						} catch (exception) {
							bb.methods.log.error('Failed to get CSS presentation from local storage.  Do you need to install a localStorage polyfill: ' + exception);
						}
					},
					set presentation(value) {
						if ('string' !== typeof (value)) {
							bb.methods.log.error('Invalid value for bb.members.css.presentation');
							throw bb.exceptions.INVALID_PARAMS;
						}
						try {
							return localStorage.setItem('css.presentation', value);
						} catch (exception) {
							bb.methods.log.error('Failed to set CSS layout in local storage.  Do you need to install a localStorage polyfill: ' + exception);
						}
					},

					/**	The dynamic CSS layout of the page
					 *	@name		layout
					 *	@fieldOf	bb.members.css
					 *	@private
					 *	@since Version 0.1.0
					 */
					get layout() {
						try {
							return localStorage.getItem('css.layout');
						} catch (exception) {
							bb.methods.log.error('Failed to get CSS layout from local storage.  o you need to install a localStorage polyfill: ' + exception);
						}
					},
					set layout(value) {
						if ('string' !== typeof (value)) {
							bb.methods.log.error('Invalid value for bb.members.css.layout');
							throw bb.exceptions.INVALID_PARAMS;
						}
						try {
							return localStorage.setItem('css.layout', value);
						} catch (exception) {
							bb.methods.log.error('Failed to set CSS layout in local storage.  Do you need to install a localStorage polyfill: ' + exception);
						}
					}
				}
		};

	/**	Private elements that can be added to the page dynamically
	 *	@namespace	Private elements
	 *	@private
	 *	@since Version 0.1.0
	 */
	bb.elements =	{};

	/**	Private event handlers
	 *	@namespace	Private event handlers
	 *	@private
	 *	@since Version 0.1.0
	 */
	bb.eventCallback =
		{
			/**	When binded to the keydown event
			 *	this functions processes Burning Boots keyboard
			 *	bindings
			 *	@event
			 *	@param	{UIEvent}	event	The event from the user agent.
			 *	@private
			 *	@since Version 0.1.0
			 */
			keyPress: function (event) {
				try {
					bb.methods.keyBinding.process(this, event);
				} catch (exception) {
					bb.methods.log.error('Failed to process Burning Boots Library keyPress: ' + exception);
				}
			}
		};

	/**	Private Methods
	 *	@namespace	Private Methods
	 *	@private
	 *	@since Version 0.1.0
	 */
	bb.methods =
		{
			/**	This initialises our namespace, doing various
			 *	things so that the bb library can be used effectively
			 *	in the user agent.
			 *	@private
			 *	@since Version 0.1.0
			 */
			init: function () {
				try {
					bb.methods.log.info('Initialising Burning Boots Library...');

					bb.methods.log.verbose('Freezing stuff');
					if ('function' === typeof (Object.freeze)) {
						Object.freeze(bb.defines);
						Object.freeze(bb.enums);
						Object.freeze(bb.exceptions);
					}

					// Add our key bindings
					bb.methods.keyBinding.add(document, 'CTRL+ALT+Q', bb.methods.log.increaseLevel);
					bb.methods.keyBinding.add(document, 'CTRL+ALT+W', bb.methods.log.decreaseLevel);
					bb.methods.keyBinding.add(document, 'CTRL+ALT+A', bb.methods.log.resetLevel);
					bb.methods.keyBinding.add(document, 'CTRL+ALT+S', bb.methods.log.clearLevel);

					// Set the default CSS
					bb.methods.css.presentation();
					bb.methods.css.layout();
				} catch (exception) {
					bb.methods.log.error('Burning Boots Library Initialisation...FAILED: ' + exception);
					return;
				}

				bb.methods.log.info('Burning Boots Library Initialisation...DONE!');
			},

			/**	The Burning Boots keyBinding provides methods to bind function
			 *	callbacks to keyboard keys.
			 *	@namespace	Contains everything to bind keyboard keys.
			 *	@private
			 *	@since Version 0.1.0
			 */
			keyBinding:
				{
					/**	Processes a key press on an object
					 *	@param	{Object}	object	The object that the key press occured on.
					 *	@param	{UIEvent}	event	The event from the user agent.
					 *	@throws	{bb.exceptions}	A Burning Boots exception
					 *	@private
					 *	@since Version 0.1.0
					 */
					process: function (object, event) {
						// Check we have the correct parameters
						if ('object' !== typeof (object)) {
							bb.methods.log.error('Invalid parameters to bb.methods.keyBinding.process');
							throw bb.exceptions.INVALID_PARAMS;
						}

						try {
							var keyCombo	= '',
								key			= event.keycode || event.which;
							if (bb.defines.keyMap[key]) {
								keyCombo += event.ctrlKey  ? 'CTRL+'  : '';
								keyCombo += event.altKey   ? 'ALT+'   : '';
								keyCombo += event.shiftKey ? 'SHIFT+' : '';
								keyCombo += bb.defines.keyMap[key];
								if ((object.keyBinding) && (object.keyBinding[keyCombo])) {
									object.keyBinding[keyCombo].callback();
								}
							}
						} catch (exception) {
							bb.methods.log.error('Failed to process key binding: ' + exception);
							throw bb.exceptions.FAIL;
						}
					},

					/**	Sorts a key binding string so that the meta
					 *	meta keys are first.  This is so that when we
					 *	do a lookup for the callback function in bb.members.keyBinding
					 *	we can find the correct one.
					 *	@param		{String}	keyCombo	A key binding in the form CTRL+ALT+A
					 *	@returns	{String}	A sorted string ready to be added to the bb.members.keyBinding
					 *	@throws		{bb.exceptions}	A Burning Boots exception
					 *	@private
					 *	@since Version 0.1.0
					 */
					sort: function (keyCombo) {
						// Check we have the correct parameters
						if ('string' !== typeof (keyCombo)) {
							bb.methods.log.error('Invalid parameters to bb.methods.keyBinding.sort');
							throw bb.exceptions.INVALID_PARAMS;
						}

						try {
							var	i = 0,
								keyComboSplit = keyCombo.toUpperCase().split('+'),
								keyComboSorted = [];

							// Reorder the keys
							if ((i = keyComboSplit.indexOf('CTRL'))  >= 0) { keyComboSorted.push(keyComboSplit.splice(i, 1)); }
							if ((i = keyComboSplit.indexOf('ALT'))   >= 0) { keyComboSorted.push(keyComboSplit.splice(i, 1)); }
							if ((i = keyComboSplit.indexOf('SHIFT')) >= 0) { keyComboSorted.push(keyComboSplit.splice(i, 1)); }

							// Make sure we have a key to bind too
							if ((keyComboSplit.length !== 1)) {
								bb.methods.log.error('Can only bind to one key plus meta keys: \'' + keyComboSplit.join(' & ') + '\'');
								throw bb.exceptions.FAIL;
							}

							/* TODO: Is it possible to warn the user that they
							 * are binding to a key map that isn't in bb.members.keyMap?
							 */

							// Add the sorted meta keys back to the split array at the start.
							if (keyComboSorted.length) { keyComboSplit = keyComboSorted.concat(keyComboSplit); }

							// Return the sorted key combination
							return keyComboSplit.join('+');
						} catch (exception) {
							bb.methods.log.error('Failed to process key binding: ' + exception);
							throw bb.exceptions.FAIL;
						}
					},

					/**	Adds a key binding to a callback function.
					 *	@param		{Object}	object		The object to bind to.
					 *	@param		{String}	keyCombo	A key binding in the form CTRL+ALT+A
					 *	@param		{Function}	callback	The callback function to run when
					 *										the key binding is pressed
					 *	@throws		{bb.exceptions}	A Burning Boots exception
					 *	@example	status = bb.methods.keyBinding.add('CTRL+ALT+Q', bb.methods.increaseLogLevel);
					 *	@private
					 *	@since Version 0.1.0
					 */
					add: function (object, keyCombo, callback) {
						// Check we have the correct parameters
						if (('string' !== typeof (keyCombo)) ||
								('function' !== typeof (callback)) ||
								('object' !== typeof (object))) {
							bb.methods.log.error('Invalid parameters to bb.methods.keyBinding.add');
							throw bb.exceptions.INVALID_PARAMS;
						}
						try {
							// Process the key binding string
							keyCombo = bb.methods.keyBinding.sort(keyCombo);

							bb.methods.log.verbose('Adding keybinding for ' + keyCombo);

							// Create a key binding on the object
							if (!object.keyBinding) {
								object.keyBinding = {};
							}

							// Add the key binding to the list
							object.keyBinding[keyCombo] = {
								callback: callback
							};

							// Make sure that there is only one key press callback assigned
							$(object).unbind('keydown.bb').bind('keydown.bb', bb.eventCallback.keyPress);
						} catch (exception) {
							bb.methods.log.error('Failed to add key binding: ' + exception);
							throw exception;
						}
					},

					/**	Removes a key binding.
					 *	@param		{Object}	object		The object to remove the binding from.
					 *	@param		{String}	keyCombo	A key binding in the form CTRL+ALT+A
					 *	@throws		{bb.exceptions}	A Burning Boots exception
					 *	@example	status = bb.methods.keyBinding.remove('CTRL+ALT+Q');
					 *	@private
					 *	@since Version 0.1.0
					 */
					remove: function (object, keyCombo) {
						// Check we have the correct parameters
						if ('string' !== typeof (keyCombo) ||
								('object' !== typeof (object))) {
							bb.methods.log.error('Invalid parameters to bb.methods.keyBinding.remove');
							throw bb.exceptions.INVALID_PARAMS;
						}
						try {
							// Process the key binding string
							if ((keyCombo = bb.methods.keyBinding.sort(keyCombo)) === undefined) {
								bb.methods.log.error('Failed to sort key combination');
								return bb.enums.errorCode.FAIL;
							}

							bb.methods.log.verbose('Removing keybinding ' + keyCombo);

							// Remove the key binding from the list
							if ((object.keyBinding) && (object.keyBinding[keyCombo])) {
								delete object.keyBinding[keyCombo];
							} else {
								bb.methods.log.warn('There is no key binding for ' + keyCombo + ' to remove.');
							}
						} catch (exception) {
							bb.methods.log.error('Failed to remove key binding', exception);
							throw exception;
						}
					}
				},

			/**	The Burning Boots CSS provides methods to modify the CSS of a 
			 *	page dynamically.
			 *	@namespace	Dynamic CSS class methods.
			 *	@private
			 *	@since Version 0.1.0
			 */
			css:
				{
					/**	Sets the CSS layout of the page
					 *	@param	{classString}	string	The CSS class to set.  Can
					 *									be undefined to set the
					 *									CSS class from local storage.
					 *	@public
					 *	@since Version 0.1.0
					 */
					layout: function (classString) {
						// Check we have the correct parameters
						if (!(('string' === typeof (classString)) || (!classString))) {
							bb.methods.log.error('Invalid parameters to bb.methods.css.layout');
							throw bb.exceptions.INVALID_PARAMS;
						}
						try {
							if (classString) {
								classString = 'layout-' + classString;
								if (bb.members.css.layout) {
									$(document.documentElement).removeClass(bb.members.css.layout);
								}
							} else {
								classString = bb.members.css.layout;
							}
							$(document.documentElement).addClass(classString);
							if (classString) {
								bb.members.css.layout = classString;
							}
						} catch (exception) {
							bb.methods.log.error('Failed to set the CSS layout: ' + exception);
						}
					},

					/**	Sets the CSS presentation colours of the page
					 *	@param	{classString}	string	The CSS class to set.  Can
					 *									be undefined to set the
					 *									CSS class from local storage.
					 *	@public
					 *	@since Version 0.1.0
					 */
					presentation: function (classString) {
						// Check we have the correct parameters
						if (!(('string' === typeof (classString)) || (!classString))) {
							bb.methods.log.error('Invalid parameters to bb.methods.css.presentation');
							throw bb.exceptions.INVALID_PARAMS;
						}
						try {
							if (classString) {
								classString = 'presentation-' + classString;
								if (bb.members.css.presentation) {
									$(document.documentElement).removeClass(bb.members.css.presentation);
								}
							} else {
								classString = bb.members.css.presentation;
							}
							if (bb.members.css.presentation) {
								$(document.documentElement).removeClass(bb.members.css.presentation);
							}
							$(document.documentElement).addClass(classString);
							if (classString) {
								bb.members.css.presentation = classString;
							}
						} catch (exception) {
							bb.methods.log.error('Failed to set the CSS presentation colours: ' + exception);
						}
					}
				},

			/**	The Burning Boots logging provides methods to output necessary
			 *	logging messages from inside the bb Javascript Library.
			 *	<br/><br/>
			 *	The logging level can be changed with the various public
			 *	methods to suppress or enable various levels or logging
			 *	statements.
			 *	<br/><br/>
			 *	The Burning Boots log messages are sent to the user agent console.
			 *	@namespace	Contains everything to control and
			 *				use the Burning Boots logging correctly.
			 *	@private
			 *	@since Version 0.1.0
			 */
			log:
				{

					/**	A logging method to print data to the
					 *	user agents console.
					 *	@param	{bb.enum.logLevel}	level	The logging level of this log.
					 *	@param	{string}			string	The Javascript string to log.
					 *	@private
					 *	@since Version 0.1.0
					 */
					log: function (level, string) {
						try {
							if ((typeof (bb.enums.logLevel.ERROR) === typeof (level)) &&
									(bb.members.logLevel >= level) &&
									(level !== bb.enums.logLevel.NONE) &&
									(typeof (string) === 'string')) {
								var msg = 'BB: ' + bb.enums.logLevel[bb.members.logLevel] + ': ' + string;
								switch (level) {
								case bb.enums.logLevel.ERROR:
									console && console.error && console.error(msg);
									break;
								case bb.enums.logLevel.WARN:
									console && console.warn && console.warn(msg);
									break;
								case bb.enums.logLevel.INFO:
									console && console.info && console.info(msg);
									break;
								case bb.enums.logLevel.DEBUG:
									console && console.debug && console.debug(msg);
									break;
								case bb.enums.logLevel.VERBOSE:
									console && console.log && console.log(msg);
									break;
								default:
									console && console.log && console.log(msg);
									break;
								}
							}
						} catch (exception) {
							/* TODO: We could do some other method of telling the user here
							 * Maybe adding a div to the page?
							 */
						}
					},

					/**	Logs an error message
					 *	@param	{string}		string	The Javascript string to log.
					 *	@private
					 *	@since Version 0.1.0
					 */
					error: function (string) {
						bb.methods.log.log(bb.enums.logLevel.ERROR, string);
					},

					/**	Logs an warning message
					 *	@param	{string}		string	The Javascript string to log.
					 *	@private
					 *	@since Version 0.1.0
					 */
					warn: function (string) {
						bb.methods.log.log(bb.enums.logLevel.WARN, string);
					},

					/**	Logs an information message
					 *	@param	{string}		string	The Javascript string to log.
					 *	@private
					 *	@since Version 0.1.0
					 */
					info: function (string) {
						bb.methods.log.log(bb.enums.logLevel.INFO, string);
					},

					/**	Logs an debugging message
					 *	@param	{string}		string	The Javascript string to log.
					 *	@private
					 *	@since Version 0.1.0
					 */
					debug: function (string) {
						bb.methods.log.log(bb.enums.logLevel.DEBUG, string);
					},

					/**	Logs an verbose message
					 *	@param	{string}		string	The Javascript string to log.
					 *	@private
					 *	@since Version 0.1.0
					 */
					verbose: function (string) {
						bb.methods.log.log(bb.enums.logLevel.VERBOSE, string);
					},

					/**	Prints the current logging level to the console.
					 *	@throws		{bb.exceptions}	A Burning Boots exception
					 *	@private
					 *	@since Version 0.1.0
					 */
					printLevel: function () {
						try {
							if (console.log) {
								console.log('BB: Log Level: ' + bb.enums.logLevel[bb.members.logLevel]);
							}
						} catch (exception) {
							throw bb.exceptions.FAIL;
						}
					},

					/**	Increases the logging level.
					 *	@throws		{bb.exceptions}	A Burning Boots exception
					 *	@private
					 *	@since Version 0.1.0
					 */
					increaseLevel: function () {
						try {
							if (bb.members.logLevel < (bb.enums.logLevel.NUM - 1)) {
								bb.members.logLevel += 1;
							}
							bb.methods.log.printLevel();
						} catch (exception) {
							bb.methods.log.error('Failed to increase log level: ' + exception);
							throw exception;
						}
					},


					/**	Decreases the logging level
					 *	@throws		{bb.exceptions}	A Burning Boots exception
					 *	@private
					 *	@since Version 0.1.0
					 */
					decreaseLevel: function () {
						try {
							if (bb.members.logLevel > bb.enums.logLevel.NONE) {
								bb.members.logLevel -= 1;
							}
							bb.methods.log.printLevel();
						} catch (exception) {
							bb.methods.log.error('Failed to decrease log level: ' + exception);
							throw exception;
						}
					},

					/**	Resets the logging level to the default
					 *	warning and error output
					 *	@throws		{bb.exceptions}	A Burning Boots exception
					 *	@private
					 *	@since Version 0.1.0
					 */
					resetLevel: function () {
						try {
							bb.members.logLevel = bb.enums.logLevel.WARN;
							bb.methods.log.printLevel();
						} catch (exception) {
							bb.methods.log.error('Failed to reset log level: ' + exception);
							throw exception;
						}
					},

					/**	Clears the logging level so that
					 *	no logging will be output
					 *	@throws		{bb.exceptions}	A Burning Boots exception
					 *	@private
					 *	@since Version 0.1.0
					 */
					clearLevel: function () {
						try {
							bb.members.logLevel = bb.enums.logLevel.NONE;
							bb.methods.log.printLevel();
						} catch (exception) {
							bb.methods.log.error('Failed to clear log level: ' + exception);
							throw exception;
						}
					}
				}
		};

	// Initialise the namespace when the DOM loads
	$(document).ready(bb.methods.init);

	/**	The Burning Boots Javascript Library contains useful API calls
	 *	that can be useful for development.
	 *	@namespace	A Burning Boots Javascript Library
	 *	@exports window.bb as bb 
	 *	@version 0.3.0
	 */
	window.bb =
		{
			/**	The Burning Boots library version.
			 *	@namespace	Versioning information.
			 *	@public
			 *	@since Version 0.1.0
			 */
			version: [0, 3, 0],

			/**	The Burning Boots key bindings provides methods
			 *	to bind key combinations to elements on a page.
			 *	@namespace	DOM element key binding methods.
			 *	@public
			 *	@since Version 0.1.0
			 */
			keyBinding:
				{
					/**	Adds a key binding to an element
					 *	@param		{Object}	object		The object to bind to.
					 *	@param		{String}	keyCombo	A key binding in the form CTRL+ALT+A
					 *	@param		{Function}	callback	The callback function to run when
					 *										the key binding is pressed
					 *	@example	status = bb.methods.keyBinding.add(element, 'CTRL+ALT+Z', function(){alert('Hello');});
					 *	@public
					 *	@since Version 0.1.0
					 */
					add: function (object, keyCombo, callback) {
						try {
							bb.methods.keyBinding.add(object, keyCombo, callback);
						} catch (exception) {
							bb.methods.log.error('Failed to add key binding "' + keyCombo + '": ' + exception);
						}
					},

					/**	Removes a key binding to an element
					 *	@param		{Object}	object		The object to remove the binding from.
					 *	@param		{String}	keyCombo	A key binding in the form CTRL+ALT+A
					 *	@example	status = bb.methods.keyBinding.remove(element, 'CTRL+ALT+Z');
					 *	@public
					 *	@since Version 0.1.0
					 */
					remove: function (object, keyCombo) {
						try {
							bb.methods.keyBinding.remove(object, keyCombo);
						} catch (exception) {
							bb.methods.log.error('Failed to remove key binding "' + keyCombo + '": ' + exception);
						}
					}
				},

			/**	The Burning Boots CSS provides methods to modify the CSS of a 
			 *	page dynamically.
			 *	@namespace	Dynamic CSS class methods.
			 *	@public
			 *	@since Version 0.1.0
			 */
			css:
				{
					/**	Sets the CSS layout of the page
					 *	@param	{classString}	string	The CSS class to set.
					 *	@public
					 *	@since Version 0.1.0
					 */
					layout: function (classString) {
						try {
							bb.methods.css.layout(classString);
						} catch (exception) {
							bb.methods.log.error('Failed to set the CSS layout: ' + exception);
						}
					},

					/**	Sets the CSS presentation colours of the page
					 *	@param	{classString}	string	The CSS class to set.
					 *	@public
					 *	@since Version 0.1.0
					 */
					presentation: function (classString) {
						try {
							bb.methods.css.presentation(classString);
						} catch (exception) {
							bb.methods.log.error('Failed to set the CSS presentation colours: ' + exception);
						}
					}
				},

			/**	The Burning Boots logging provides methods to output necessary
			 *	logging messages.
			 *	<br/><br/>
			 *	The logging level can be changed with the various
			 *	methods to suppress or enable various levels or logging
			 *	statements.
			 *	<br/><br/>
			 *	The Burning Boots log messages are sent to the user agent console.
			 *	@namespace	Contains everything to control and
			 *				use the Burning Boots logging correctly.
			 *	@public
			 *	@since Version 0.1.0
			 */
			log:
				{
					/**	The current logging level
					 *	@name		level
					 *	@fieldOf	bb.log
					 *	@public
					 *	@since Version 0.1.0
					 */
					get level() {
						return bb.members.logLevel;
					},
					set level(value) {
						var typeError = new TypeError('Cannot set bb.log.level (' + value.toString + ')');
						throw typeError;
					},

					/**	Logs an error message
					 *	@param	{string}		string	The Javascript string to log.
					 *	@public
					 *	@since Version 0.1.0
					 */
					error: function (string) {
						bb.methods.log.error(string);
					},

					/**	Logs an warning message
					 *	@param	{string}		string	The Javascript string to log.
					 *	@public
					 *	@since Version 0.1.0
					 */
					warn: function (string) {
						bb.methods.log.warn(string);
					},

					/**	Logs an information message
					 *	@param	{string}		string	The Javascript string to log.
					 *	@public
					 *	@since Version 0.1.0
					 */
					info: function (string) {
						bb.methods.log.info(string);
					},

					/**	Logs an debugging message
					 *	@param	{string}		string	The Javascript string to log.
					 *	@public
					 *	@since Version 0.1.0
					 */
					debug: function (string) {
						bb.methods.log.debug(string);
					},

					/**	Logs an verbose message
					 *	@param	{string}		string	The Javascript string to log.
					 *	@public
					 *	@since Version 0.1.0
					 */
					verbose: function (string) {
						bb.methods.log.verbose(string);
					},

					/**	Prints the current logging level to the console.
					 *	@throws		{bb.exceptions}	A Burning Boots exception
					 *	@public
					 *	@since Version 0.1.0
					 */
					printLevel: function () {
						try {
							bb.methods.log.printLevel();
						} catch (exception) {
							bb.methods.log.error('Failed to print log level: ' + exception);
						}
					},

					/**	Increases the logging level.
					 *	@public
					 *	@since Version 0.1.0
					 */
					increaseLevel: function () {
						try {
							bb.methods.log.increaseLevel();
						} catch (exception) {
							bb.methods.log.error('Failed to increase log level: ' + exception);
						}
					},


					/**	Decreases the logging level
					 *	@public
					 *	@since Version 0.1.0
					 */
					decreaseLevel: function () {
						try {
							bb.methods.log.decreaseLevel();
						} catch (exception) {
							bb.methods.log.error('Failed to decrease log level: ' + exception);
						}
					},

					/**	Resets the logging level to the default
					 *	warning and error output
					 *	@public
					 *	@since Version 0.1.0
					 */
					resetLevel: function () {
						try {
							bb.methods.log.resetLevel();
						} catch (exception) {
							bb.methods.log.error('Failed to reset log level: ' + exception);
						}
					},

					/**	Clears the logging level so that
					 *	no logging will be output
					 *	@public
					 *	@since Version 0.1.0
					 */
					clearLevel: function () {
						try {
							bb.methods.log.clearLevel();
						} catch (exception) {
							bb.methods.log.error('Failed to clear log level: ' + exception);
						}
					}
				}
		};

	// Override the version toString method.
	window.bb.version.toString = function () {
		return this.join('.');
	};
}(window));
