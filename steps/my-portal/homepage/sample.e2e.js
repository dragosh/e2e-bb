/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  ----------------------------------------------------------------
 */

'use strict';

var utils = global.utils;

describe('Testing my number', function() {

    Given('I have a number ', function(done) {
        this.num = 0;
        done();
    });

    And('I add one',function() {
        this.num++;
    });

    Then('I should have 3', function() {
        expect(this.num).toBe(1);
    });

});

