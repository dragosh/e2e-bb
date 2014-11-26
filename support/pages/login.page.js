
var utils = global.utils;

module.exports = function() {

    'use strict';
    this.url = utils.baseUrl('/login/loginDashboard.jsp');
    this.visit = function() {
        return browser.get(this.url);
    };
};

