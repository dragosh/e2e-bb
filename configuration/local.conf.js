
'use strict';

var utils = require('../support/utils');
exports.config = utils.extend(require('./base.conf.js').config , {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    onPrepare: function() {
        require('./onPrepare/base');
        var rimraf = require('rimraf');
        var reports = 'target/reports';

        rimraf(reports , function(){
            var HtmlReporter = require('protractor-html-screenshot-reporter');
            jasmine.getEnv().addReporter(new HtmlReporter({
                baseDirectory: reports
            }));
        });
    },

    capabilities:
    {
        browserName: 'chrome',
        chromeOptions: {
            args: ['show-fps-counter=true', '--test-type']
        }
    }
});
