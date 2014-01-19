/**
 * app.js
 *
 * @author Aditya Sharat
 */
/*global window, $*/
(function () {
    'use strict';
    var appContainer,
        api,
        buttonRefresh,
        colorIndex = 0,
        colors = ['red', 'green', 'blue'],
        counter,
        domain,
        feeds,
        heading,
        port,
        refreshFeeds,
        renderFeeds,
        renderFeed,
        socket;

    appContainer = $('#app-container');
    heading = $('#heading');

    if (!window.io) {
        heading.text('Web Sockets are not supported in your browser.');
        return;
    }

    /*global io*/
    /* initialization */
    domain = 'http://localhost';
    port = '8080';
    api = {
        feeds : {
            refresh : domain + ':' + port + '/rest/feeds/test'
        }
    };
    socket = io.connect('http://localhost');
    feeds = $('#feeds');
    counter = $('#counter');
    buttonRefresh = $('#button-refresh');
    renderFeed = function (feed) {
        var element;
        element = $($('<li>' + feed.message + '</li>'));
        if (feed.message) {
            element.addClass(colors[colorIndex % colors.length]);
            feeds.prepend(element.hide());
            element.slideDown(200);
            colorIndex++;
        }
    };
    renderFeeds = function (ListOfFeeds, clear) {
        if (clear) {
            feeds.html('');
        }
        ListOfFeeds.forEach(function (feed) {
            renderFeed(feed);
        });
    };
    refreshFeeds = function () {
        appContainer.addClass('overlayEffect');
        $.getJSON(api.feeds.refresh, function (response) {
            if (response.success) {
                renderFeeds(response.feeds, true);
            } else if (response.reason) {
                feeds.append('<li>' + response.reason + '</li>');
            } else {
                feeds.append('<li> Error </li>');
            }
        }).fail(function (response, error) {
            if (response.reason) {
                feeds.append('<li>' + response.reason + '</li>');
            } else {
                feeds.append('<li>' + error + '</li>');
            }
        }).always(function () {
            appContainer.removeClass('overlayEffect');
        });
    };

    buttonRefresh.on('click', refreshFeeds);

    heading.text('Welcome User.');

    buttonRefresh.removeClass('hide');

    socket.on('feed-pushed', function (feeds) {
        renderFeed(feeds, false);
    });
}());