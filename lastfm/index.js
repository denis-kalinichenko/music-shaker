var LastfmAPI = require('lastfmapi');
var config = require("../config");

var lfm = new LastfmAPI({
    'api_key' : config.get("lastfm:api_key"),
    'secret' : config.get("lastfm:secret")
});

module.exports = lfm;