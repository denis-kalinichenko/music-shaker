// app/models/day.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our day model
var daySchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    username: {
        type: String
    },
    emotions: {
        excited: {
            type: Number,
            min: 0,
            max: 1,
            default: 0
        },
        happy: {
            type: Number,
            min: 0,
            max: 1,
            default: 0
        },
        sad: {
            type: Number,
            min: 0,
            max: 1,
            default: 0
        },
        angry: {
            type: Number,
            min: 0,
            max: 1,
            default: 0
        }
    }
});

// methods ======================


// create the model for days and expose it to our app
module.exports = mongoose.model('Day', daySchema);