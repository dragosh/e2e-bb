'use strict';


// # TODO Better output info
// # TODO better suites/steps inclusion

var gulp = require('gulp');
var gutil = require('gulp-util');
var properties = require('properties');
var _ = require('lodash');
var protractor = require('gulp-protractor').protractor;
var plumber = require('gulp-plumber');

// var log = function() {
//     //JSON.stringify(arguments , null, 2);
//     console.log.apply(console, arguments);
// };

var config = require('./support/parser-properties');

gulp.task('test', [], function() {

    var propFile = (gutil.env.prop || 'jenkins') + '.properties';
    var confFile = config.paths.config + (gutil.env.config || 'jenkins' ) + '.conf.js';
    var params = gutil.env.params;
    var suiteParam = gutil.env.suite;

    var testFiles = [],
        pArgs = [
            '--prop', propFile,
            '--params', JSON.stringify(params) || {}
        ];


    /*----------------------------------------------------------------*/
    /* TODO Create Gulp-properties plugin
    /*----------------------------------------------------------------*/
    config.load(propFile ,function(err, obj) {
         var appName = obj.app.name.toLowerCase();
        if (err) {
            throw err;
        }

        if( obj.hasOwnProperty('app') ){
            // No need for subfolder app
            pArgs.push( '--baseUrl', obj.app.url);
        } else {
            throw new Error('No app was defined');
        }

        if( obj.hasOwnProperty('include') ) {
            var suites = obj.include;
            if(suiteParam) {
                testFiles.push('steps/' + appName + '/' + suiteParam + '/**/*.e2e.js');
                pArgs.push('--suite', suiteParam);
            } else {
                for( var suite in suites) {
                    testFiles.push('steps/' + appName + '/' + suite + '/**/*.e2e.js');
                }
            }
        }


        if(testFiles.length <= 0 ) {
            throw new Error('No test files are included.');
        }

        //Exclude _ files
        testFiles.push('!steps/**/**/_*.js');

        console.log('------- Included Steps -------');
        testFiles.forEach(function(t){
            console.log(t);
        });
        console.log('-------------------------------');
        gulp.src(testFiles)
            .pipe(protractor({
                configFile: confFile,
                args: pArgs
            })

        ).on('error', function(err) {
            throw err;
        });

    });
});


// Start a standalone server
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
gulp.task('start', webdriver_standalone);
// Download and update the selenium driver
var webdriver_update = require('gulp-protractor').webdriver_update;
// Downloads the selenium webdriver
gulp.task('update', webdriver_update);
