const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'member'
    },
    firstname: {
        type: String,
        default: null
    },
    lastname: {
        type: String,
        default: null
    },
    ip: {
        type: String,
        default: null
    },
    status: {
        type: 'String',
        default: 'active'
    },
    balance: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})


module.exports = mongoose.model('User', userSchema);
