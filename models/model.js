const mongoose = require('mongoose');


const ModelSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('model', ModelSchema);