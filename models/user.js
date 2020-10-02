const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

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
    encry_password: {
        type: String,
        required: true
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

userSchema.virtual("password")
        .set(function(password) {
            this._password = password;
            this.salt = uuidv1();
            this.encry_password = this.securePassword(password);
        })
        .get(function() {
            return this._password;
        })

userSchema.method = {
    securePassword: function(plainpassword) {
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt).update(plainpassword).digest('hex');
        } catch(err) {
            return "";
        }
    },
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    }
}

module.exports = mongoose.model("User", userSchema);