var brain = require("brain");
var User = require("../models/user");
var _ = require("lodash");

module.exports = function (username, data, emotion, callback) {
    var net = new brain.NeuralNetwork();

    User.findOne({ name: username }, function (err, user) {
        if(err) {
            return callback(err);
        }

        if(user.network) {
            net.fromJSON(user.network);
        }

        var input = {
            angry : 0,
            sad : 0,
            happy : 0,
            excited : 0
        };

        input[emotion] = 1;

        var output = {
            rock: 0,
            electronic: 0,
            alternative: 0,
            indie: 0,
            pop: 0,
            metal: 0,
            classical: 0,
            jazz: 0,
            experimental: 0,
            folk: 0,
            indie_rock: 0,
            punk: 0,
            hard_rock: 0,
            instrumental: 0,
            hip_hop: 0,
            dance: 0,
            hardcore: 0,
            heavy_metal: 0,
            soul: 0,
            chillout: 0,
            blues: 0,
            rap: 0,
            fun: 0
        };

        _.forIn(data, function (value, key) {
           output[key] = value / 100;
        });

        net.train([
            {
                input: input,
                output: output
            }
        ], {
            errorThresh: 0.005,  // error threshold to reach
            iterations: 20000,   // maximum training iterations
            log: true,           // console.log() progress periodically
            logPeriod: 10,       // number of iterations between logging
            learningRate: 0.3    // learning rate
        });

        User.findOneAndUpdate({ name: username }, {$set: {network: net.toJSON() }}, { new: true }, function (err, _user) {
            if(err) {
                return callback(err);
            }
            callback();
        });
    });
};