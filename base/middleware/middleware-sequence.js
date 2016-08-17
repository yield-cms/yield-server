"use strict";
const EventEmitter = require('events');

const {Middleware, MiddlewareEvent} = require('./middleware');

/**
 * @enum {String}
 */
const MiddlewareSequenceEvent = {
	COMPLETE: 'yield-server::MiddlewareSequence.COMPLETE',
	COMMIT: 'yield-server::MiddlewareSequence.COMMIT',
	INTERRUPT: 'yield-server::MiddlewareSequence.INTERRUPT'
};

class MiddlewareSequence extends EventEmitter {
	constructor() {
		super();

		/**
		 * @private
		 * @type {Middleware[]}
		 */
		this._middlewares = [];

		this.setMaxListeners(Infinity);
	}

	/**
	 * @param {Function} func
	 */
	push(func) {
		this._middlewares.push(new Middleware(func));
	}

	/**
	 * @param {Object} request
	 * @param {*} data
	 */
	exec(request, data) {
		this._step(0);
	}

	/**
	 * @private
	 * @param {Object} request
	 * @param {*} data
	 * @param {Number} index
	 */
	_step(request, data, index) {
		this._middlewares[index].once(MiddlewareEvents.NEXT, () => {
			if (index === (this._middlewares.length - 1)) {
				this._complete();
			} else {
				this._step(index + 1);
			}
		});

		this._middlewares[index].once(
			MiddlewareEvents.COMMIT,
			this._commit.bind(this)
		);

		this._middlewares[index].once(
			MiddlewareEvents.INTERRUPT,
			this._interrupt.bind(this)
		);

		this._middlewares[index].exec();
	}

	/**
	 * @private
	 * @fires MiddlewareSequence#MiddlewareSequenceEvent.COMPLETE
	 */
	_complete() {
		this.emit(MiddlewareSequenceEvent.COMPLETE)
	};

	/**
	 * @private
	 * @fires MiddlewareSequence#MiddlewareSequenceEvent.COMMIT
	 */
	_commit() {
		this.emit(MiddlewareSequenceEvent.COMMIT)
	};

	/**
	 * @private
	 * @fires MiddlewareSequence#MiddlewareSequenceEvent.INTERRUPT
	 */
	_interrupt() {
		this.emit(MiddlewareSequenceEvent.INTERRUPT)
	};
}
