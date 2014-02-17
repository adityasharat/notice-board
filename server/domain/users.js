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
    crypto = require('../utils/crypto'),
    User = require('./models/User');

var createUser = function (user) {
        return user;
    },
    parseUser = function (user) {
        return user;
    };

module.exports = function (db, BSON) {
    dataStore = require('../framework/dataStore')(db, BSON, 'users', 'user');

    return {
        create : function (user, callback) {
            dataStore.add(createUser(new User(user)), function (user) {
                callback(parseUser(user));
            });
        },

        read : function (condition, callback) {
            dataStore.find(condition, function (users) {
                users.forEach(function (user, index, array) {
                    array[index] = parseUser(user);
                });
                callback(users);
            });
        },

        update : function (condition, item, callback) {
            try {
                dataStore.update(condition, item, callback);
            } catch (error) {
                console.error(error.message);
            }
        },

        delete : function (condition, callback) {
            try {
                dataStore.delete(condition, callback);
            } catch (error) {
                console.error(error.message);
            }
        }
    };
};