const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    currencies: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('lists', listSchema)
