/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  ----------------------------------------------------------------
 */

'use strict';

var utils = global.utils;

var login = utils.require('login.widget' /* ,bundle name optional*/);

describe('Testing Homepage visibility', function() {

    Given('I am on the profile-summary page ', function(done) {
        browser.get(utils.baseUrl('/'));
        done();
    });

    And('I have access to the widget element',function() {
        new ProfileSummary({title: 'Profile - Summary with profile url'}).get().then(function(widget) {
            this.widget = widget;
        }.bind(this));
    });

    Then('I should see a the Widget', function() {
        expect(this.widget.isVisible()).toBeTruthy();
    });

    Then('I should see Lisa Nijenhuis name', function() {
        expect(this.widget.profileName()).toBe('Lisa Nijenhuis');
    });

});

