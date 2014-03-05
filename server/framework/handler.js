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

// TODO : create a seperate modules for different handlers
feeds = {
    get : function (data, next) {
        // TODO : implement flow to fetch data from store
        // TODO : implement validation
        
        this.emit('data', {data: data});    // testing communication
        if (next) {
            next();
        }
    },

    post : function (data, next) {
        // TODO : implement flow to insert data into store
        // TODO : implement validation

        if (next) {
            next();
        }
    },
    
    put : function (data, next) {
        // TODO : implement flow to update data into store
        // TODO : implement validation

        if (next) {
            next();
        }
    }
};

login = function (data, next) {
    // TODO : implement login flow
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
