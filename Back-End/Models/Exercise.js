const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true,
    },
    direction:{
        type: String,
        default: "Right",
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('exercise', ExerciseSchema);