/**
 * Server.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */

'use strict';

/* Dependencies */
var console     = require('./utils/console'),
    express     = require('express'),
    fs          = require('fs'),
    http        = require('http'),
    moment = require('moment'),
    mongo       = require('mongodb'),
    radio       = require('radio'),
    socket      = require('socket.io');

/* Configuration */
var configPath  = __dirname + '/data/server.cfg',
    config      = null;

try {
    config = JSON.parse(fs.readFileSync(configPath).toString());
} catch (error) {
    console.error('There was an error reading the config file.\n' + error.message + '\nServer stopped.');
    process.exit(1);
}


// -----------------------------------------------------------------------------
// Database
// -----------------------------------------------------------------------------

var Database = {};
Database.Server = mongo.Server;
Database.Db = mongo.Db;
Database.BSON = mongo.BSONPure;

var databaseServer = new Database.Server(config.database.url, config.database.port, {
    auto_reconnect: true
});

var db = new Database.Db(config.database.name, databaseServer);

// -----------------------------------------------------------------------------
// Domain and Framework
// -----------------------------------------------------------------------------

var users,
    feeds,
    channels,
    auth,
    handler;

// -----------------------------------------------------------------------------
// App
// -----------------------------------------------------------------------------

var app = express();

/* Configure Express */
app.configure(function () {
    app.set('port', config.port);
    app.use(express.bodyParser());
});

// Any HTTP request will be satisfied using the content under './client'
app.use(express.static(config.urls.web));


// -----------------------------------------------------------------------------
// Routes
// -----------------------------------------------------------------------------

/* Route : publish via web app */
app.get('/publish', function (req, res) {
    res.sendfile('./client/publish.html');
});

/* Route : client via web app */
app.get('/client', function (req, res) {
    res.sendfile('./client/index.html');
});

/* Route: all others go to the defult client webapp for now */
app.get('*', function (req, res) {
    res.sendfile('./client/index.html');
});


// -----------------------------------------------------------------------------
// Server setup
// -----------------------------------------------------------------------------

var server  = http.createServer(app),
    io      = socket.listen(server);

// Log socket connections and disconnections
io.set('log level', 1);

db.open(function (error) {

    if (error) {
        console.error('There was an error connecting to the database.\n' + error.message + '\nServer stopped.');
        process.exit(1);
    }

    console.info('Connection to database established');

    users       = require('./domain/users')(db, Database.BSON);
    feeds       = require('./domain/feeds')(db, Database.BSON);
    channels    = require('./domain/channels')(db, Database.BSON);
    auth        = require('./framework/authentication')(express, users);
    handler     = require('./framework/handler');

    // start up web socket server
    io.sockets.on('connection', handler);

    // let the magic begin
    server.listen(app.get('port'), function () {
        console.info("Express server listening on port " + app.get('port'));
    });
});

// -----------------------------------------------------------------------------
// Feed Broadcast Processing
// -----------------------------------------------------------------------------

/* Coming Soon */