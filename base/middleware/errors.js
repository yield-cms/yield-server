"use strict";

class DuplicateSequenceError extends Error {
    constructor(sequenceName) {
        super(`Sequence "${sequenceName}" already defined`);
    }
}

class DuplicateForkError extends Error {
    constructor(sequenceName) {
        super(`Fork for sequence "${sequenceName}" already defined`);
    }
}

class DuplicateCompoundError extends Error {
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

module.exports = {
    DuplicateSequenceError,
    DuplicateForkError,
    DuplicateCompoundError
}
