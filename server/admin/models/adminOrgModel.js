const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminOrgSchema = new Schema({
    
    adminOrgOrganizationName: {
        type: String,
        required: true
    },
    adminOrgRegNo: {
        type: String,
        required: true
    },
    adminOrgEmail: {
        type: String,
        required: true
    },
    adminOrgRole: {
        type: String,
        required: true
    },
    adminOrgPassword: {
        type: String,
        required: true
    }
    // confirmPw: {
    //     type: String,
    //     required: true
    // }

}, {timestamps:true})

module.exports = mongoose.model('AdminOrg',adminOrgSchema)