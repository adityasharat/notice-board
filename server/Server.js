/**
 * Server.js
 *
 * @author Aditya Sharat
 */

/*jshint node:true */

'use strict';

/* Dependencies */
var express     = require('express'),
    http        = require('http'),
    socket      = require('socket.io'),
    mongo       = require('mongodb'),
    socketUtil  = require('./utils/socketUtil'),
    console     = require('./utils/console'),
    radio       = require('radio'),
    fs          = require('fs');

/* Configuration */
var configPath  = __dirname + '/data/server.cfg',
    config      = null;

try {
    config = JSON.parse(fs.readFileSync(configPath).toString());
} catch (error) {
    console.error('There was an error reading the config file.\n' + error.message + '\nServer stopped.');
    return;
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
db.open(function (error, database) {});

// -----------------------------------------------------------------------------
// Domain
// -----------------------------------------------------------------------------

var users       = require('./domain/users')(db, Database.BSON),
    feeds       = require('./domain/feeds')(db, Database.BSON),
    channels    = require('./domain/channels')(db, Database.BSON),
    auth        = require('./framework/authentication')(express, users),
    activeUsers = require('./framework/activeUsers');


// -----------------------------------------------------------------------------
// App
// -----------------------------------------------------------------------------

var app = express();

/* Configure Express */
app.configure(function() {
    app.set('port', config.port);
    app.use(express.bodyParser());
});

// Any HTTP request will be satisfied using the content under './client'
app.use(express.static(config.urls.web));


// -----------------------------------------------------------------------------
// Routes
// -----------------------------------------------------------------------------

/* Route: Feeds */
app.get(config.urls.rest.feeds, auth.basic, feeds.all);
app.get(config.urls.rest.feeds + '/:channel', auth.basic, feeds.get);
app.post(config.urls.rest.feeds + '/:channel', auth.publishers, feeds.post);
app.put(config.urls.rest.feeds + '/:channel', auth.publishers, feeds.put);
app.delete(config.urls.rest.feeds + '/:channel', auth.publishers, feeds.delete);

/* Route: Channels */
app.get(config.urls.rest.channels, auth.basic, channels.all);
app.get(config.urls.rest.channels + '/:channel', auth.basic, channels.get);
app.post(config.urls.rest.channels + '/:channel', auth.publishers, channels.post);
app.put(config.urls.rest.channels + '/:channel', auth.publishers, channels.put);
app.delete(config.urls.rest.channels + '/:channel', auth.publishers, channels.delete);

/* Route : publish via web app */
app.get('/publish', function (req, res) {
    res.sendfile('./client/publish.html');
});

/* Route: all others go to the defult client webapp */
app.get('*', function (req, res) {
    res.sendfile('./client/index.html');
});


// -----------------------------------------------------------------------------
// Server setup
// -----------------------------------------------------------------------------

var server  = http.createServer(app),
    io      = socket.listen(server);

io.set('log level', 1);

// Log socket connections and disconnections
io.sockets.on('connection', function (socket) {
    console.info(socket.id + ' connected');

    socket.on('disconnect', function () {
        console.info(socket.id + ' disconnected');
    });
});


server.listen(app.get('port'), function () {
    console.info("Express server listening on port " + app.get('port'));
});


// -----------------------------------------------------------------------------
// Feed Broadcast Processing
// -----------------------------------------------------------------------------

socketUtil.init(io);

radio('feed-broadcast:test').subscribe(function (feed) {
    socketUtil.broadcast('feed-pushed:' + feed.cid, feed);
});
