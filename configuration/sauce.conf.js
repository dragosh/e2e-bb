var utils = require('../support/utils');
exports.config = utils.extend(require('./base.conf.js').config , {
     // ---- 3. To use remote browsers via Sauce Labs -----------------------------
    // If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
    // The tests will be run remotely using Sauce Labs.
    sauceUser: null,
    sauceKey: null,
    // Use sauceSeleniumAddress if you need to customize the URL Protractor
    // uses to connect to sauce labs (for example, if you are tunneling selenium
    // traffic through a sauce connect tunnel). Default is
    // ondemand.saucelabs.com:80/wd/hub
    sauceSeleniumAddress: null,
});
