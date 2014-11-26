
'use strict';


var _ = require('lodash');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
var q = require('q');

var utils =  _.noConflict();

var Debug = {
    log: function() {
        console.log.apply(console.log, arguments);
    },
    info: function(message) {
        gutil.log(gutil.colors.white(message));
    },
    error: function(message) {
        gutil.log(gutil.colors.red(message));
    },
    success: function(message) {
        gutil.log(gutil.colors.green(message));
    }
};

/* --------Browser utils-------- */
var Browser = {
    baseUrl: function(url) {
        return browser.baseUrl + (url || '');
    }
};

var Support = {
    // #TODO(dragosh) refactor
    require: function(name, bundle, type) {
        bundle = ( bundle || 'support') ;
        var arrName = name.split('.');
        var rawName = arrName[0];
        var fullPath;
        type = arrName[1];
        if(type === 'page') {
            //name = bundle + [rawName, type].join('.');
        }else if(type ==='widget'){
            name = bundle + '/widgets/'+rawName + '/' + name;
        } else if(type === 'container'){
            // fullPath = path.join(__dirname,
            //     'support/containers/' +
            //     rawName + '/test/e2e/' + name);
        }
        console.log(name);
        fullPath =  fullPath || path.join(__dirname,  name);

        return require(fullPath);
    },

    /**
     * Small wrappper to locate the widget chrome
     */

    // #TODO grab widget by data-widget attribute when available,
    getWidget: function(title) {
        var d = utils.q.defer();
        var response = {};
        var widgetChrome = element(by.css('.bp-widget[data-widget-title="' + title + '"]'));
        widgetChrome.then(function(el) {
            el.getAttribute('title').then(function(title){
                response.chrome = el;
                response.body = el.element(by.css('.bp-widget-body'));
                d.resolve(response);
            });
        });
        return d.promise;
    }
};



utils.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

utils.mixin(Browser);
utils.mixin(Debug);
utils.mixin(Support);
// Promise
utils.q = q;

module.exports = utils;
