const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({

    organizationName: {
        type: String,
        required: true
    },
    regNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telephoneNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPw: {
        type: String,
        required: true
    }

}, {timestamps:true})

module.exports = mongoose.model('Admin',adminSchema)