const Admin = require('../models/adminModel')
const mongoose = require('mongoose')

//Get all Admin approves
const getAdminJobs = async (req, res) => {
    const admin = await Admin.find({}).sort({createdAt: -1})

    res.status(200).json(admin)
}

//Get a single Admin approve
const getAdminJob = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Admin Job'})
    }

    const admin = await Admin.findById(id)

    if(!admin) {
        return res.status(404).json({error: "No such approve"})
    }

    res.status(200).json(admin)
} 

//Create a new Admin approve
const createAdminJob = async (req, res) => {
    const {organizationName,regNo,address,telephoneNo,email,password,confirmPw} = req.body

    //add doc to db
    try {
        const admin = await Admin.create({organizationName,regNo,address,telephoneNo,email,password,confirmPw})
        res.status(200).json(admin)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//Delete a  Admin approve
const deleteAdminJob = async (req,res) =>{
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Admin Job'})
    }

    const admin = await Admin.findOneAndDelete({_id: id})

    if (!admin){
        return res.status(400).json({error:'No Such Admin Job'})
    }

    res.status(200).json(admin)

}

//Update a Admin approve
const updateAdminJob = async (req,res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Admin Job'})
    }
    const admin = await Admin.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if (!admin){
        return res.status(400).json({error:'No Such Admin Job'})
    }

    res.status(200).json(admin)

}




// //Workout Model imported
// const AdminJob = require ('../models/adminModel')
// const mongoose = require('mongoose')

// // get all admin jobs
// const getAdminJobs = async(req,res) => {
//     const adminJob = await AdminJob.find({}).sort({createdAt: -1})

//     res.status(200).json(adminJob)

// }

// // get a single admin job
// const getAdminJob = async(req,res) => {
//     const {id} = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error:'No Such Admin Job'})
//     }
//     const adminJob = await AdminJob.findById(id)

//     if (!adminJob){
//         return res.status(404).json({error:'No Such Admin Job'})
    
//     }
//     res.status(200).json(adminJob)
// }

// // create a new adminJob
// const createAdminJob = async (req,res) => {
//    /* const{volunteerName,NIC,vehicleNo,telephoneNo} = req.body */

//     //add doc to db
//     try{
//         const adminJob = await AdminJob.create({volunteerName,NIC,vehicleNo,telephoneNo})
//         res.status(200).json(adminJob)
//     } catch (error) {
//         res.status(400).json({error:error.message})
//     }
     
// }

// // delete a adminJob
// const deleteAdminJob = async (req,res) =>{
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error:'No Such Admin Job'})
//     }
//     const adminJob = await AdminJob.findOneAndDelete({_id: id})

//     if (!adminJob){
//         return res.status(400).json({error:'No Such Admin Job'})
//     }

//     res.status(200).json(adminJob)

// }
 
// // update a adminJob
// const updateAdminJob = async (req,res) => {

//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error:'No Such Admin Job'})
//     }
//     const adminJob = await AdminJob.findByIdAndUpdate({_id: id},{
//         ...req.body
//     })

//     if (!adminJob){
//         return res.status(400).json({error:'No Such Admin Job'})
//     }

//     res.status(200).json(adminJob)

// }
module.exports = {
    getAdminJob,
    getAdminJobs,
    createAdminJob,
    deleteAdminJob,
    updateAdminJob
}