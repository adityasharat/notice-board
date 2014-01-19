/**
 * channel.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */
'use strict';
module.exports = function (db, BSON) {
    var dataStore = require('../framework/dataStore')(db, BSON, 'channels', 'channel');

    return {
        create : function (channel, callback) {

        },
        read : function (condition, callback) {

        },
        update : function (condition, callback) {

        },
        delete : function (condition, callback) {

        },
    };
};