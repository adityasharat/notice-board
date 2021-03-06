/**
*
* @class dataStore
* @param {Object} db
* @param {Object} BSON
* @param {String} collectionName
* @param {String} modelName
*/
module.exports = function (db, BSON, collectionName, modelName) {
    'use strict';
    return {
        /**
        * Find model by Id
        *
        * @method findById
        */
        find: function (condition, callback) {
            db.collection(collectionName, function (error, collection) {
                if (error) {
                    throw error;
                }
                collection.find(condition).toArray(function (error, items) {
                    if (error) {
                        throw error;
                    }
                    callback(items);
                });
            });
        },

        /**
        * Add a model
        *
        * @method add
        */
        add: function (item, callback) {
            db.collection(collectionName, function (error, collection) {
                if (error) {
                    throw error;
                }

                collection.insert(item, {
                    safe: true
                }, function (error, result) {
                    if (error) {
                        throw error;
                    }
                    callback(result[0]);
                });
            });
        },

        /**
        * update a model
        *
        * @method update
        */
        update: function (condition, item, callback) {
            db.collection(collectionName, function (error, collection) {
                if (error) {
                    throw error;
                }

                collection.update(condition, item, {
                    safe: true
                }, function (error, result) {
                    if (error) {
                        throw error;
                    }
                    callback(result);
                });
            });
        }
    };
};