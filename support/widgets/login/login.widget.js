/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : login.widget.js
 *  Description:
 *  ----------------------------------------------------------------
 */

'use strict';

var utils = global.utils;

module.exports  = function(config) {

     config = config || {
        name: 'widget-login',
        title: 'Login'
    };

    var widget = this;

    // use widget title as a locator until we have widget name available in chromes
    widget.name = config.name;
    widget.title = config.title;

    /**
     * Prepare all elements
     * @return {promise} Return widget.elements
     */
    widget.get = function() {
        var d = utils.q.defer();
        utils.getWidget(widget.title).then(function(res) {
            widget.body = res.body;
            widget.username = widget.body.element(by.name('j_username'));
            widget.password = widget.body.element(by.name('j_password'));
            widget.loginBtn = widget.body.element(by.css('.btn-sm'));
            d.resolve(widget);
        });
        return d.promise;
    };
    /**
     * Login
     * @description Login with credentials
     */
    widget.login = function(username, password) {
        widget.username.clear();
        widget.password.clear();
        widget.username.sendKeys(username || '');
        widget.password.sendKeys(password || '');
        return widget.loginBtn.click();
    };

};
