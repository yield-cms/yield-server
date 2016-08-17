"use strict";

class SequenceNotExistsError extends Error {
	/**
	 * @param {String} sequenceName
	 */
    constructor(sequenceName) {
        super(`Sequence "${sequenceName}" is not exists`);
    }
};

class UndefinedStartSequenceError extends Error {
    constructor() {
        super(`Start sequence is not defined`);
    }
}

class DuplicateSequenceError extends Error {
	/**
	 * @param {String} sequenceName
	 */
    constructor(sequenceName) {
        super(`Sequence "${sequenceName}" already defined`);
    }
}

class DuplicateForkError extends Error {
	/**
	 * @param {String} sequenceName
	 */
    constructor(sequenceName) {
        super(`Fork for sequence "${sequenceName}" already defined`);
    }
}

class DuplicateCompoundError extends Error {
	/**
	 * @param {String[]} sequencesNames
	 */
    constructor(sequencesNames) {
        let stringified = sequencesNames.reduce((prev, cur, index) => {
            let wrapped = '';
            if (index === 0) {
                wrapped = `"${cur}"`;
            } else if (index === (sequencesNames.length - 1)) {
                wrapped = ` and "${cur}"`;
            } else {
                wrapped = `, "${cur}"`;
            }
            return wrapped;
        });
        super(`Compound for sequences "${stringified}" already defined`);
    }
}

class MethodNotAllowedError extends Error {
	/**
	 * @param {String} method
	 */
	constructor(method) {
		super(`Method not "${method.toUpperCase()}" is not allowed`);
	}
}

module.exports = {
	SequenceNotExistsError,
	UndefinedStartSequenceError,
    DuplicateSequenceError,
    DuplicateForkError,
    DuplicateCompoundError,
	MethodNotAllowedError
}
