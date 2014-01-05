/**
 * SocketUtil.js
 *
 * @author Aditya Sharat
 */
/*jshint node:true */

var _ = require('underscore'),
    _io;

exports.init = function (io) {
    'use strict';
    _io = io;
};

// Broadcast and event to all open sockets
exports.broadcast = function (event, message) {
    'use strict';

    var clients = _io.sockets.clients();
    _.each(clients, function (client) {
        client.emit(event, message);
    });
};