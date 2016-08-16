"use strict";

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const EventEmitter = require('events');

class Server extends EventEmitter {
    /**
     * @param {number=} port
     */
    constructor(port) {
        super();

        /**
         * @private
         * @type {number}
         */
        this._port = port || 3000;

        /**
         * @private
         * @type {http.Server}
         */
        this._server = http.createServer(this._requestHandler.bind(this));
    }

    /**
     * Start up server
     * @returns {Promise}
     */
    startUp() {
        return new Promise(function(resolve, reject) {
            this._server.listen(this._port, resolve);
        }.bind(this));
    };

    /**
     * Shut down server
     * @returns {Promise}
     */
    shutDown() {
        return new Promise(function(resolve, reject) {
            this._server.close(resolve);
        }.bind(this));
    };

    /**
     * Request handler
     * @param {http.IncomingMessage} request
     * @param {http.ServerResponse} response
     */
    _requestHandler(request, response) {
        response.write('<h1>Welcome To Yield Server!</h1>');
        response.end();
    }
}

module.exports = Server;
