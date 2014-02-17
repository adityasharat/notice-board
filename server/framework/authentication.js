/**
 * authentication.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */

'use strict';

var console = require('../utils/console');

module.exports = function (users) {

    var _basic = function (data, next) {
        if (next) {
            next();
        }
    };

    var _publisher = function (data, next) {
        if (next) {
            next();
        }
    };

    return {
        basic : _basic,
        publishers : _publisher
    };
};
