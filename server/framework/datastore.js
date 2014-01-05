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
        * Find all models
        *
        * @method findAll
        */
        getAll: function (callback) {
            db.collection(collectionName, function (error, collection) {
                if (error) {
                    throw error;
                }
                collection.find().toArray(function (error, items) {
                    if (error) {
                        throw error;
                    }
                    callback(items);
                });
            });
        },

        /**
        * Find model by Id
        *
        * @method findById
        */
        findById: function (condition, callback) {
            db.collection(collectionName, function (error, collection) {
                if (error) {
                    throw error;
                }
                collection.find(
                    condition,
                    function (error, items) {
                        if (error) {
                            throw error;
                        }
                        callback(items);
                    }
                );
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
                }0.
                
                collection.insert(item, {
                    safe: true
                }, function (error, result) {
                    if (error) {
                        throw error;
                    }
                    callback(result[0]);
                });
            });
        }
    };
};