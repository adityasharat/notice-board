/**
 * crypto.js
 * 
 * @author Aditya Sharat
 */

'use strict';

var crypto = require('crypto');

module.exports = {
    sha : function (data) {
        if (!data) {
            return null;
        }
        return crypto.createHash('sha1').update('data').digest('hex');
    }
};