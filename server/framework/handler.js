/**
 * requestHandler.js
 * 
 * @author Aditya Sharat
 */

/*jshint node:true */
'use strict';

var auth        = require('../framework/authentication')(),
    callbacks   = require('../utils/callbacks'),
    console     = require('../utils/console'),
    disconnect,
    login,
    logout,
    refresh;


login = function (data, next) {
    if (next) {
        next();
    }
    return;
};

disconnect = function () {
    console.info(this.id + ' disconnected');
};

module.exports = function (socket) {
    console.info(socket.id + ' connected');
    socket.on('login', callbacks(this, auth.basic, login));
    //socket.on('refresh', refresh);
    //socket.on('logout', logout);
    socket.on('disconnect', disconnect);
};