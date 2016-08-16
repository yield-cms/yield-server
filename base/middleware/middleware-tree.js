"use strict";

const {
    DuplicateSequenceError,
    DuplicateForkError,
    DuplicateCompoundError
} = require('./errors');

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
    }

    /**
     * @param {String} sequenceName
     * @param {Function[]} funcsQueue
     */
    sequence(sequenceName, funcsQueue) {
        this._crashOnDuplicateSequence();
        this._sequences.set(sequenceName, funcsQueue);
    }

    /**
     * @param {String} sequenceName
     * @param {Function} forkFn
     */
    fork(sequenceName, forkFn) {
        this._crashOnDuplicateFork();
        this._forks.set(sequenceName, forkFn);
    }

    forkByMethod(sequence, options) {
        this._crashOnDuplicateFork();
        this._forks.set(sequenceName);
    }


    /**
     * @param {String[]}
     * @param {String}
     */
    compound(sequencesFrom, sequnceTo) {

    }

    /**
     * @private
     * @param {String}
     * @throws {DuplicateSequenceError}
     */
    _crashOnDuplicateSequence(sequenceName) {
        if (this._sequences.has(sequenceName)) {
            throw new DuplicateSequenceError(sequenceName);
        }
    }

    /**
     * @private
     * @param {String}
     * @throws {DuplicateForkError}
     */
    _crashOnDuplicateFork(sequenceName) {
        if (this._forks.has(sequenceName)) {
            throw new DuplicateForkError(sequenceName);
        }
    }
}

module.exports = MiddlewareTree;
