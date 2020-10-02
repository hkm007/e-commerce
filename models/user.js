const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    salt: String,
    info: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        typr: Array,
        default: []
    }
})

module.exports = mongoose.model("User", userSchema);