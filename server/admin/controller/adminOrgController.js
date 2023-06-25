const AdminOrg = require('../models/adminOrgModel')
const mongoose = require('mongoose')

//Get all AdminOrg accepts
const getAdminOrgJobs = async (req, res) => {
    const adminOrg = await AdminOrg.find({}).sort({createdAt: -1})

    res.status(200).json(adminOrg)
}

//Get a single AdminOrg accepts
const getAdminOrgJob = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such AdminOrg Job'})
    }

    const adminOrg = await AdminOrg.findById(id)

    if(!adminOrg) {
        return res.status(404).json({error: "No such accepts"})
    }

    res.status(200).json(adminOrg)
} 

//Create a new AdminOrg accepts
const createAdminOrgJob = async (req, res) => {
    const {adminOrgOrganizationName,adminOrgRegNo,adminOrgEmail,adminOrgRole,adminOrgPassword} = req.body

    let emptyFields = []

    if(!adminOrgOrganizationName) {
        emptyFields.push('adminOrgOrganizationName')
    }
    if(!adminOrgRegNo) {
        emptyFields.push('adminOrgRegNo')
    }
    // if(!address) {
    //     emptyFields.push('address')
    // }
    // if(!telephoneNo) {
    //     emptyFields.push('telephoneNo')
    // }
    if(!adminOrgEmail) {
        emptyFields.push('adminOrgEmail')
    }
    if(!adminOrgRole) {
        emptyFields.push('adminOrgRole')
    }
    if(!adminOrgPassword) {
        emptyFields.push('adminOrgPassword')
    }
    // if(!confirmPw) {
    //     emptyFields.push('confirmPw')
    // }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    //add doc to db
    try {
        const adminOrg = await AdminOrg.create({adminOrgOrganizationName,adminOrgRegNo,adminOrgEmail,adminOrgRole,adminOrgPassword})
        res.status(200).json(adminOrg)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//Delete a  AdminOrg accepts
const deleteAdminOrgJob = async (req,res) =>{
    const { id } = req.params;
    console.log(req);

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such AdminOrg Job'})
    }

    const adminOrg = await AdminOrg.findOneAndDelete({_id: id})

    if (!adminOrg){
        return res.status(400).json({error:'No Such AdminOrg Job'})
    }

    res.status(200).json(adminOrg)

}

//Update a AdminOrg accepts
const updateAdminOrgJob = async (req,res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such AdminOrg Job'})
    }
    const adminOrg = await AdminOrg.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if (!adminOrg){
        return res.status(400).json({error:'No Such AdminOrg Job'})
    }

    res.status(200).json(adminOrg)

}

module.exports = {
    getAdminOrgJob,
    getAdminOrgJobs,
    createAdminOrgJob,
    deleteAdminOrgJob,
    updateAdminOrgJob
}