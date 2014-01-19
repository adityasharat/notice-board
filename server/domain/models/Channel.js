/**
 * Channel.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */
'use strict';

var Channel = function (cid, name, desc, owner) {
    this.cid = cid;         // channel hash id
    this.name = name;       // name of channel
    this.desc = desc;       // description of the channel
    this.owner = owner;     // message    
};

module.exports = Channel;