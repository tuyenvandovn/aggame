const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    win: {
        type: String,
        default: null
    },
    draw: {
        type: String,
        default: null
    },
    loss: {
        type: String,
        default: null
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Transaction', transactionSchema);
