/**
 * authentication.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */

'use strict';

module.exports = function (express, users) {
    var result = function () {
        return true;
    };

    var _basic = function (req, res, next) {
        next();
    };

    var _publisher = function (req, res, next) {
        next();
    };

    return {
        basic : _basic,
        publishers : _publisher
    };
};
