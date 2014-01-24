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
    login;

var _users, _feeds, _channels, _auth;

login = function (data, next) {
    if (next) {
        next();
    }
    return;
};

disconnect = function () {
    console.info(this.id + ' disconnected');
};

module.exports = function (users, feeds, channels, auth) {
    _users = users;
    _feeds = feeds;
    _channels = channels;
    _auth = auth;

    return function (socket) {
        console.info(socket.id + ' connected');
        socket.on('login', callbacks(this, auth.basic, login));
        //socket.on('refresh', refresh);
        //socket.on('logout', logout);
        socket.on('disconnect', disconnect);
    };
};