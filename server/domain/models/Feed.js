/**
 * Feed.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */
'use strict';

var Feed = function (cid, type, title, message, time, expiry) {
    this.cid = cid;         // channel hash id
    this.type = type;       // type of feed
    this.title = title;     // title of the feed
    this.message = message; // message
    this.time = time;       // time of creation
    this.expiry = expiry;   // time of expiry (optional)
};

module.exports = Feed;