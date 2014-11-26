// Create gulp-properties module
// https://www.npmjs.org/package/gulp-properties
var properties = require('properties');

exports.paths = {
    properties: 'properties/',
    config: 'configuration/'
};

var options = {
    path: true,
    variables: true,
    sections: true,
    namespaces: true,
    include: true,
    reviver: function(key, value, section) {
        //Do not split section lines
        if (this.isSection) return this.assert();

        //Split all the string values by a comma
        if (typeof value === 'string') {
            var values = value.split(',');
            return values.length === 1 ? value : values;
        }

        //Do not split the rest of the lines
        return this.assert();
    }
};

exports.load = function(path, cb) {
    path = exports.paths.properties +  path;
    properties.parse(path, options, cb);
};
