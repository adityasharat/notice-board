/**
 * User.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */
'use strict';

var User = function (email, username, college, channels, time, password) {
    this.email = email;
    this.username = username;
    this.college = college;
    this.channels = channels;
    this.time = time;
    this.password = password;
};

module.exports = User;