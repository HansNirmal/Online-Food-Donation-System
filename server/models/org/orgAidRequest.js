const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orgAidSchema = new Schema({

    orgId:{
        type:String,
        required:true
    },
    orgName:{
        type:String,
        required:true
    },
    requestTitle:{
        type:String,
        required:true
    },
    population:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    orgOtherDetails:{
        type:String,
        required:true
    },
    orgLocation:{
        type:String,
        required:true
    },
    orgTelephone:{
        type:Number,
        required:true
    }
},  {timestamps:true})


module.exports = mongoose.model('OrgAidRequest', orgAidSchema)