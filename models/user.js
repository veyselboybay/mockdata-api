const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.apiKey = await uuid.v4();
})

module.exports = mongoose.model('User', userSchema);