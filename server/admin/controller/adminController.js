const Admin = require('../models/adminModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { use } = require('../routes/adminRoutes')

//Get all Admin approves
const getAdminJobs = async (req, res) => {
    const admin = await Admin.find({}).sort({createdAt: -1})

    res.status(200).json(admin)
}

//Get one Admin approves
const getOneAdminJobs = async (req, res) => { 
    const {adminid} = req.params; 
    const oneAdminJobs = await AdminJob.find({ "adminId": adminid}).sort({ createdAt: -1 }); 
    res.status(200).json(oneAdminJobs); 
};
const login = async (req, res) => { 
    const { email, password } = req.body
    console.log(email,password);
    const user = await Admin.findOne({"adminEmail": email })
    console.log(user);
    if (user && user.adminPassword  == password) {
        res.json({
          _id: user.id,
          email: user.email,
          role:user.adminRole,
          adminOrganizationName:user.adminOrganizationName,
          adminRegNo:user.adminRegNo,
          token: generateToken(user._id),
          msg:"sucess"
        })
      } else {
        res.status(400)
        res.json({
            msg: "fail",
          })
      }
    // const {adminid} = req.params; 
    // const oneAdminJobs = await AdminJob.find({ "adminId": adminid}).sort({ createdAt: -1 }); 
    // res.status(200).json(oneAdminJobs); 
};

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
    const {adminOrganizationName,adminRegNo,adminEmail,adminRole,adminPassword} = req.body
    console.log(adminOrganizationName,adminRegNo,adminEmail,adminRole,adminPassword);
      try {
        const admin = await Admin.create({adminOrganizationName,adminRegNo,adminEmail,adminRole,adminPassword})
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
const generateToken = (id) => {
    return jwt.sign({ id }, "Rushanth", {
      expiresIn: '30d',
    })
  }

module.exports = {
    getAdminJob,
    getOneAdminJobs,
    getAdminJobs,
    createAdminJob,
    deleteAdminJob,
    updateAdminJob,
    login
}