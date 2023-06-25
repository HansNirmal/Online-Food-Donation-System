//Workout Model imported
const VolunteerJob = require ('../models/volunteerModel')
const mongoose = require('mongoose')

// get all volunteer jobs
const getVolunteerJobs = async(req,res) => {
    const volunteerJob = await VolunteerJob.find({}).sort({createdAt: -1})

    res.status(200).json(volunteerJob)

}


// get a single volunteer job
const getVolunteerJob = async(req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Volunteer Job'})
    }
    const volunteerJob = await VolunteerJob.findById(id)

    if (!volunteerJob){
        return res.status(404).json({error:'No Such Volunteer Job'})
    
    }
    res.status(200).json(volunteerJob)
}

// create a new volunteerJob
const createVolunteerJob = async (req,res) => {
    const{volunteerName,NIC,vehicleNo,telephoneNo} = req.body

    //add doc to db
    try{
        const volunteerJob = await VolunteerJob.create({volunteerName,NIC,vehicleNo,telephoneNo})
        res.status(200).json(volunteerJob)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
     


}

// delete a volunteerJob
const deleteVolunteerJob = async (req,res) =>{
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Volunteer Job'})
    }
    const volunteerJob = await VolunteerJob.findOneAndDelete({_id: id})

    if (!volunteerJob){
        return res.status(400).json({error:'No Such Volunteer Job'})
    }

    res.status(200).json(volunteerJob)

}
 

// update a workout
const updateVolunteerJob = async (req,res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Workout'})
    }
    const volunteerJob = await VolunteerJob.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if (!volunteerJob){
        return res.status(400).json({error:'No Such Workout'})
    }

    res.status(200).json(volunteerJob)

}

module.exports = {
    getVolunteerJob,
    getVolunteerJobs,
    createVolunteerJob,
    deleteVolunteerJob,
    updateVolunteerJob
}