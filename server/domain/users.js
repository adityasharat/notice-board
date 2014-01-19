/**
 * users.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */
'use strict';

var console = require('../utils/console'),
    dataStore,
    moment = require('moment'),
    crypto = require('../utils/crypto');

module.exports = function (db, BSON) {
    dataStore = require('../framework/dataStore')(db, BSON, 'users', 'user');

    return {
        create : function (user, callback) {
            try {
                dataStore.add(user, callback);
            } catch (error) {
                console.error(error.message);
            }
        },

        read : function (condition, callback) {
            try {
                dataStore.find(condition, callback);
            } catch (error) {
                console.error(error.message);
            }
        },

        update : function (condition, item, callback) {
            try {
                dataStore.update(condition, item, callback);
            } catch (error) {
                console.error(error.message);
            }
        }
    };
};