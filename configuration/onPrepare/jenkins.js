require('./base');
var mkdirp = require('mkdirp');
var fs = require('fs');
var rimraf = require('rimraf');

var reportsDir = './target/reports';

var mkdir = function(path, cb) {
    mkdirp(path, function(err) {
        if (err) {
            throw new Error(err);
        } else {
           if(typeof cb === 'function'){ cb(); }
        }
    });
};
var JUnitXmlReporterPath = reportsDir + '/JUnitXmlReporter';
var HTMLlReporterPath = reportsDir + '/HtmlReporter';


// Clean before
rimraf(reportsDir , function(){
    // Create
    mkdir( JUnitXmlReporterPath , function(){
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(JUnitXmlReporterPath, true, true));
    });
    // Only works with 1.0 for now
    mkdir( HTMLlReporterPath , function(){
        var HtmlReporter = require('protractor-html-screenshot-reporter');
        jasmine.getEnv().addReporter(new HtmlReporter({
             baseDirectory: HTMLlReporterPath
        }));
    });
});



