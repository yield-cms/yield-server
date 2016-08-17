"use strict";
const EventEmitter = require('events');

/**
 * @enum {String}
 */
var MiddlewareEvent = {
	NEXT: 'yield-server::Middleware.NEXT', //Go to next middleware
	COMMIT: 'yield-server::Middleware.COMMIT',
	INTERRUPT: 'yield-server::Middleware.INTERRUPT'
};

class Middleware extends EventEmitter {
	/**
	 * @param {Function} func
	 */
	constructor(func) {
		super();

		/**
		 * @private
		 * @type {Function}
		 */
		this._func = func;

		this.setMaxListeners(Infinity);
	}

	/**
	 * @param {Object} request
	 * @param {*} data
	 */
	exec(request, data) {
		this._func(
			request,
			data,
			this._next.bind(this),
			this._commit.bind(this),
			this._interrupt.bind(this)
		);
	}

	/**
	 * @private
	 * @fires Middleware#MiddlewareEvent.NEXT
	 */
	_next() {
		this.emit(MiddlewareEvent.NEXT)
	}

	/**
	 * @private
	 * @fires Middleware#MiddlewareEvent.COMMIT
	 */
	_commit() {
		this.emit(MiddlewareEvent.COMMIT)
	}

	/**
	 * @private
	 * @fires Middleware#MiddlewareEvent.INTERRUPT
	 */
	_interrupt() {
		this.emit(MiddlewareEvent.INTERRUPT)
	}
}

module.exports = {Middleware, MiddlewareEvent};
