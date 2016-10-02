var brain = require("brain");
var User = require("../models/user");
var _ = require("lodash");

module.exports = function (username, emotion, callback) {
    User.findOne({ name: username }, function (err, user) {
        if(err) {
            return callback(err);
        }

        if(!user.network) {
            return callback("No network");
        }

        var net = new brain.NeuralNetwork();
        net.fromJSON(user.network);

        var input = {
            angry : 0,
            sad : 0,
            happy : 0,
            excited : 0
        };

        input[emotion] = 1;

        var output = net.run(input);
        console.log(output);

        callback(null, output);
    });
};