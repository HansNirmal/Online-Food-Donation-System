//Workout Model imported
const completedDonation = require('../models/completedDonation')
const mongoose = require('mongoose')

// get all completed Donations
const getCompletedDonations = async (req, res) => {
    console.log("clicked")
    const responseCompletedDonations = await completedDonation.find({}).sort({ createdAt: -1 })

    res.status(200).json(responseCompletedDonations)

}


// // get all Volunteer Deliver Jobs
// const getDonorVolunteerDelivery = async (req, res) => {
//     const OrgJob = await OrgAidRequest.find({"deliveryMethod": "volunteer-delivery"}).sort({ createdAt: -1 })

//     res.status(200).json(OrgJob)

// }

// get a single completed Donation
const getCompletedDonation = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Completed Donation' })
    }
    const CompletedDonation = await completedDonation.findById(id)

    if (!CompletedDonation) {
        return res.status(404).json({ error: 'No Such Completed Donation' })

    }
    res.status(200).json(CompletedDonation)
}

// create a new Completed Donation
const createCompletedDonation = async (req, res) => {
    const { orgId, orgName, requestTitle,population, dueDate, orgOtherDetails, orgLocation, orgTelephone,donorId,donorName,donationSize,deliveryMethod,donorTelephone,donorOtherDetails,donorLocation} = req.body
//    console.log(req.body);
    //add doc to db
    try {
        const newCompletedDonation = await completedDonation.create({ orgId, orgName, requestTitle,population, dueDate, orgOtherDetails, orgLocation, orgTelephone,donorId,donorName,donationSize,deliveryMethod,donorTelephone,donorOtherDetails,donorLocation })
        res.status(200).json(newCompletedDonation)
    } catch (error) {
        res.status(400).json({ error: error.message ,msg:"checking2"})
    }



}

// delete a Completed Donation
const deleteCompletedDonation = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Org Jobs' })
    }
    const deletedCompletedDonation = await completedDonation.findOneAndDelete({ _id: id })

    if (!deletedCompletedDonation) {
        return res.status(400).json({ error: 'No Such Org Jobs' })
    }

    res.status(200).json(deletedCompletedDonation)

}


// update a Completed Donation
const updateCompletedDonation = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Workout' })
    }
    const updatedCompletedDonation = await completedDonation.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!updatedCompletedDonation) {
        return res.status(400).json({ error: 'No Such Workout' })
    }

    res.status(200).json(updatedCompletedDonation)

}

module.exports = {
    getCompletedDonation,
    getCompletedDonations,
    createCompletedDonation,
    deleteCompletedDonation,
    updateCompletedDonation
    
}