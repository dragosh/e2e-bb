
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

    folder: path.join(__dirname),
    // #TODO(dragosh) refactor
    require: function(name, bundle, type) {
        bundle = path.join(Support.folder, (bundle || ''));
        var arrName = name.split('.');
        var rawName = arrName[0];
        var fullPath;
        type = arrName[1];

        if(type === 'page') {
            name = '/pages/'+ [rawName, type].join('.');
        } else if(type ==='widget') {
            name = '/widgets/' + rawName + '/' + name;
        } else if(type === 'container') {
            name = '/containers/' + rawName + '/' + name;
        }
        fullPath =  path.join(bundle,  name);
        return require(fullPath);
    },

    /**
     * Small wrappper to locate the widget chrome
     */

    // #TODO grab widget by data-widget attribute when available,
    getWidget: function(selector) {
        var el;
        // Custom selector
        if(utils.isObject(selector)) {
            el = selector;
        } else {
            //plain title
            el = element(by.css('.bp-widget[data-widget-title="' + title + '"]'));
        }
        var d = utils.q.defer();
        var response = {};

        el.then(function(el) {
            el.getAttribute('title').then(function(title){
                response.body = el;
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
