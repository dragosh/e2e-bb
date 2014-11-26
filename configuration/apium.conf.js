var utils = require('../support/utils');
exports.config = utils.extend(require('./base.conf.js').config , {

    seleniumAddress: 'http://10.10.11.79:4723/wd/hub',

	capabilities: {
		platformName: 'iOS',
		platformVersion: '7.1',
		deviceName: 'iPhone Retina 4-inch',
        browserName: 'Safari' //phantomjs / firefox
    }
});
