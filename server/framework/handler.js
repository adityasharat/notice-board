/**
 * requestHandler.js
 * 
 * @author Aditya Sharat
 */

/*jshint node:true */
'use strict';

var callbacks   = require('../utils/callbacks'),
    console     = require('../utils/console'),
    disconnect,
    login,
    store,
    auth;

var feeds;

feeds = {
    get : function (data, next) {
        this.emit('data', {data: data});
        if (next) {
            next();
        }
    }
};

login = function (data, next) {
    if (next || data) {
        next();
    }
    return;
};

disconnect = function () {
    console.info(this.id + ' disconnected');
};

module.exports = function (dataStore, auth) {
    store = dataStore;

    return function (socket) {
        console.info(socket.id + ' connected');
        socket.on('login', callbacks(this, auth.basic, login));
        socket.on('feeds-get', callbacks(this, auth.basic, feeds.get));
        socket.on('disconnect', disconnect);
    };
};