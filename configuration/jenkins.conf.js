var utils = require('../support/utils');

console.log(require('phantomjs').path);

exports.config = utils.extend(require('./base.conf.js').config, {

    seleniumAddress: 'http://panther:4444/wd/hub',

    onPrepare: 'onPrepare/jenkins.js',

    jasmineNodeOpts: {
        // onComplete will be called just before the driver quits.
        onComplete: null,
        // If true, display spec names.
        isVerbose: false,
        // If true, print colors to the terminal.
        showColors: false,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 100000
    },
    multiCapabilities: [
    // {
    //     browserName: 'phantomjs',
    //     version: '3',
    //     platform: 'ANY',
    // },
    {
        browserName: 'chrome',
        version: '3',
        platform: 'ANY',
        chromeOptions: {
            args: ['show-fps-counter=true', '--test-type']
        }
    },
    // {
    //     browserName: 'firefox',
    //     version: '3',
    //     platform: 'ANY'
    // },
    // {
    //     browserName: 'internet explorer',
    //     version: '3',
    //     platform: 'ANY'
    // },
    // {
    //     browserName: 'safari',
    //     version: '3',
    //     platform: 'ANY'
    // }
    ]
});
