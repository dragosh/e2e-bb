// EXPERIMENTAL

'use strict';

var utils = require('../support/utils');
exports.config = utils.extend(require('./base.conf.js').config , {

    framework: 'cucumber',
     // Spec patterns are relative to this directory.
    specs: [
        '../features/**/*.feature'
    ],
    cucumberOpts: {
        require: '../features/**/*.step.js',
        tags: '@dev',
        format: 'summary'
    },
    capabilities: {
        browserName: 'chrome',
        version: '1',
        platform: 'ANY'
    }
});
