const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orgAidSchema = new Schema({
    orgName: {
        type: String,
    },
    regNo: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
}, { timestamps: true })


module.exports = mongoose.model('allUsers', orgAidSchema)