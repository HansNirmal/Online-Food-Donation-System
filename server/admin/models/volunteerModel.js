const mongoose = require('mongoose')

const Schema = mongoose.Schema

const volunteerSchema = new Schema({

    volunteerName: {
        type: String,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    vehicleNo:{
        type: String,
        required: true
    },
    telephoneNo:{
        type: Number,
        required: true
    }
},  {timestamps:true})


module.exports = mongoose.model('Volunteer', volunteerSchema)