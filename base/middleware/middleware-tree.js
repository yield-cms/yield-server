"use strict";

const errors = require('./errors');
const HttpMethod = require('../server/http-method');

class MiddlewareTree {
    constructor() {
        /**
         * @private
         * @type {Map}
         */
        this._sequences = new Map();

        /**
         * @private
         * @type {Map}
         */
        this._forks = new Map();

		/**
		 * @private
		 * @type {Map}
		 */
		this._compounds = new Map();

		/**
		 * @private
		 * @type {String}
		 */
		this._startSequence = null;
    }

	/**
	 * @param {Object} request
	 */
	start(request) {
		this._crashOnUndefinedStartSequence();
	};

	/**
	* @param {String} sequenceName
	* @returns {MiddlewareTree}
	*/
	startsFrom(sequenceName) {
		this._crashOnNotExistSequence(sequenceName);
		this._startSequence = sequenceName;
		return this;
	}

    /**
     * @param {String} sequenceName
     * @param {Function[]} funcsQueue
	 * @returns {MiddlewareTree}
     */
    sequence(sequenceName, funcsQueue) {
        this._crashOnDuplicateSequence();
        this._sequences.set(sequenceName, funcsQueue);
		return this;
    }

    /**
     * @param {String} sequenceName
     * @param {Function} forkFn
	 * @returns {MiddlewareTree}
     */
    fork(sequenceName, forkFn) {
        this._crashOnDuplicateFork();
        this._forks.set(sequenceName, forkFn);
		return this;
    }

    /**
     * @param {String[]} sequencesNames
     * @param {String} targetSequence
	 * @returns {MiddlewareTree}
     */
    compound(sequencesNames, targetSequence) {
		this._crashOnDuplicateCompound();
		this._compounds.set(sequencesNames, targetSequence);
		return this;
    }

	/**
     * @private
     * @throws {errors.UndefinedStartSequenceError}
     */
    _crashOnUndefinedStartSequence() {
        if (this._startSequence === null) {
            throw new errors.UndefinedStartSequenceError();
        }
    }

	/**
     * @private
     * @param {String} sequenceName
     * @throws {errors.SequenceNotExistsError}
     */
    _crashOnNotExistSequence(sequenceName) {
        if (!this._sequences.has(sequenceName)) {
            throw new errors.SequenceNotExistsError(sequenceName);
        }
    }

    /**
     * @private
     * @param {String} sequenceName
     * @throws {errors.DuplicateSequenceError}
     */
    _crashOnDuplicateSequence(sequenceName) {
        if (this._sequences.has(sequenceName)) {
            throw new errors.DuplicateSequenceError(sequenceName);
        }
    }

    /**
     * @private
     * @param {String} sequenceName
     * @throws {DuplicateForkError}
     */
    _crashOnDuplicateFork(sequenceName) {
        if (this._forks.has(sequenceName)) {
            throw new errors.DuplicateForkError(sequenceName);
        }
    }

	/**
     * @private
     * @param {String[]} sequencesNames
     * @throws {DuplicateCompoundError}
     */
	_crashOnDuplicateCompound(sequencesNames) {
		if (this._compounds.has(sequencesNames)) {
			throw new errors.DuplicateCompoundError(sequencesNames);
		}
	}
}

module.exports = MiddlewareTree;
