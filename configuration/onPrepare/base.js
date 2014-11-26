/* globals browser */
'use strict';

require('jasmine-given');

var parseArgs = require('minimist');
var utils = require('../../support/utils');
var locators = require('../../support/locators');
global.dv = browser.driver;
global.utils = utils;

global.login = function() {

    // Impement Custom login

};


global.takeScreenshot = function(filename, path) {
    browser.takeScreenshot().then(function(png) {
        global.writeScreenShot(png, filename, path);
    });
};

// abstract writing screen shot to a file
global.writeScreenShot = function(data, filename, path) {
    var mkdirp = require('mkdirp');
    var fs = require('fs');
    path = path || 'target/screens/';

    mkdirp(path, function(err) {
        if (err) {
            throw new Error(err);
        } else {
            var stream = fs.createWriteStream(path + filename);
            stream.write(new Buffer(data, 'base64'));
            stream.end();
        }
    });

};

// abstract writing screen shot to a file
global.setWindowSize = function(w, h) {
    global.dv.manage().window().setSize(w, h);
};



(function(){
    // don't wait for angular
    browser.ignoreSynchronization = true;
    /*----------------------------------------------------------------*/
    /* Params
    /*----------------------------------------------------------------*/
    var argv = parseArgs(process.argv.slice(2));
    try {
        global.params = JSON.parse(argv.params);
    } catch (e) {
        global.params = {};
    }

    var minWindowWidth = 1280,
        minWindowHeight = 1024,
        browserName,
        platform,
        $window = browser.manage().window();

    browser.getCapabilities().then(function (capabilities) {
        browserName = capabilities.caps_.browserName;
        platform = capabilities.caps_.platform;
    }).then(function getCurrentWindowSize() {
        return $window.getSize();
    }).then(function setWindowSize(dimensions) {
        var windowWidth = Math.max(dimensions.width, minWindowWidth),
            windowHeight = Math.max(dimensions.height, minWindowHeight);
        return $window.setSize(windowWidth, windowHeight);
    }).then(function getUpdatedWindowSize() {
        return $window.getSize();
    }).then(function showWindowSize(dimensions) {
        // ## https://github.com/angular/protractor/issues/1223
        // --INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS
        // if (browserName === 'internet explorer' || browserName === 'safari') {
        //     browser.resetUrl = 'about:blank';
        // }
        utils.log('Browser:', browserName, 'on', platform, 'at', dimensions.width + 'x' + dimensions.height);
        utils.log('Running e2e tests...');
        global.login();
    });


})();
