/**
 *  ----------------------------------------------------------------
 *  Copyright © 2003/2014 Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : protractor.conf.js
 *  Description:
 *
 *  ----------------------------------------------------------------
 */

var Config = {
    baseUrl: 'http://localhost:7777/portalserver',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumArgs: ['-browserTimeout=60'],
    ignoreProtectedModeSettings: true,
    chromeOnly: false,

    capabilities: {
        browserName: 'phantomjs',
        version: '',
        platform: 'ANY'
    },
    suites: {},
    // The timeout for each script run on the browser. This should be longer
    // than the maximum time your application needs to stabilize between tasks.
    allScriptsTimeout: 11000,
    // How long to wait for a page to load.
    getPageTimeout: 10000,
    //framework: 'cucumber',
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        // onComplete will be called just before the driver quits.
        onComplete: function() {},
        // If true, display spec names.
        isVerbose: true,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 60000
    },

    onPrepare: 'onPrepare/base.js',
    onCleanUp: function() { }
};

module.exports.config = Config;
