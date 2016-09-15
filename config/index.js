var fs    = require('fs'),
    nconf = require('nconf'),
    path = require('path');

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json') });

module.exports = nconf;