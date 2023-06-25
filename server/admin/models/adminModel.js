const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    adminOrganizationName: {
        type: String,
        required: true
    },
    adminRegNo: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    adminRole: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    }

}, {timestamps:true})

module.exports = mongoose.model('Admins',adminSchema)