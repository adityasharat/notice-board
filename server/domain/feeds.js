/**
 * feeds.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */
'use strict';

var Feed = require('./models/Feed'),
    moment = require('moment'),
    radio = require('radio'),
    console = require('../utils/console');


module.exports = function (db, BSON) {
    var dataStore = require('../framework/dataStore')(db, BSON, 'feeds', 'feed');

    return {
        create : function (feed, callback) {
            try {
                dataStore.add(feed, callback);
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