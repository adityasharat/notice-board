/**
 * Console.js
 *
 * @author Aditya Sharat
 */
/*jshint node:true */
'use strict';
var _ = require('colors'),
    _getLog;

_getLog = function (args) {
    var log = '';
    Array.prototype.forEach.call(args, function (element) {
        log += ' ' + element;
    });
    return log;
};

exports.log = function () {
    console.log('   Log -'.white, _getLog(arguments).white);
};

exports.error = function () {
    console.log('   Error -'.red, _getLog(arguments).red);
};

exports.warn = function () {
    console.log('   Warn -'.yellow, _getLog(arguments).white);
};

exports.info = function () {
    console.log('   Info -'.cyan, _getLog(arguments).white);
};