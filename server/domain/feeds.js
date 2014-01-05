/**
 * feeds.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */
'use strict';

var _cleanFeed,
    _createNewFeed,
    _now,
    _time,
    _timeToDie,
    Feed = require('./models/Feed'),
    moment = require('moment'),
    radio = require('radio'),
    console = require('../utils/console');

_now = function () {
    _time = moment.utc();
    return _time.format();
};

_timeToDie = function () {  // keeping it to a default of start date + 1
    return _time.date(_time.date() + 1).format();
};

_createNewFeed = function (feed) {
    var newFeed = new Feed(
        feed.cid,
        feed.mid,
        feed.message,
        feed.type,
        _now(),
        _timeToDie()
    );
    return newFeed;
};

_cleanFeed = function (feed) {
    return feed;
};

module.exports = function (db, BSON) {
    var dataStore = require('../framework/dataStore')(db, BSON, 'feeds', 'feed');

    return {
        all : function (req, res) {
            try {
                dataStore.getAll(function (feeds) {
                    res.json(200, {success: true, feeds: feeds});
                });
            } catch (error) {
                res.json(500, {success: false, reason: error.message});
            }
        },

        get : function (req, res) {
            try {
                dataStore.getById({cid: req.params.cid}, function (feeds) {
                    res.json(200, {success: true, feeds: feeds});
                });
            } catch (error) {
                res.json(500, {success: false, reason: error.message});
            }
        },

        post : function (req, res) {
            var feed;
            try {
                feed = _createNewFeed(req.body);

                dataStore.add(feed, function (feed) {
                    var cleanFeed = _cleanFeed(feed);
                    console.info('feed added for channel: ' + feed.cid);
                    res.json(201, cleanFeed);
                    radio('feed-broadcast:' + feed.cid).broadcast(cleanFeed);
                });
            } catch (error) {
                res.json(500, {success: false, reason: error.message});
            }
        },

        put : function (req, res) {
            try {

            } catch (error) {
                res.json(500, {success: false, reason: error.message});
            }
        },

        delete : function (req, res) {
            try {

            } catch (error) {
                res.json(500, {success: false, reason: error.message});
            }
        }
    };
};