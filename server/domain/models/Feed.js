/**
 * Feed.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */
'use strict';

/**
 * feedType = 0: event | 1: text
 */
var Feed = function (cid, mid, message, type, time, expiry) {
    this.cid = cid;
    this.mid = mid;
    this.message = message;
    this.type = type;
    this.time = time;
    this.expiry = expiry;
};

module.exports = Feed;