//Workout Model imported
const OrgAidRequest = require('../../models/donor/provideDonation')
const mongoose = require('mongoose')

// get all Org jobs
const getProvideDonations = async (req, res) => {
    const ProvideDonation = await OrgAidRequest.find({}).sort({ createdAt: -1 })

    res.status(200).json(ProvideDonation)

}

// get all Volunteer Deliver Jobs
const getDonorSelfDelivery = async (req, res) => {
    const OrgJob = await OrgAidRequest.find({"deliveryMethod": "self-delivery"}).sort({ createdAt: -1 })

    res.status(200).json(OrgJob)

}


// get all Volunteer Deliver Jobs
const getDonorVolunteerDelivery = async (req, res) => {
    const OrgJob = await OrgAidRequest.find({"deliveryMethod": "volunteer-delivery"}).sort({ createdAt: -1 })

    res.status(200).json(OrgJob)

}

// get a single Org job
const getProvideDonation = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Org Job' })
    }
    const ProvideDonation = await OrgAidRequest.findById(id)

    if (!ProvideDonation) {
        return res.status(404).json({ error: 'No Such Org Job' })

    }
    res.status(200).json(ProvideDonation)
}

// create a new ProvideDonation
const createProvideDonation = async (req, res) => {
    const { orgId, orgName, requestTitle,population, dueDate, orgOtherDetails, orgLocation, orgTelephone,donorId,donorName,donationSize,deliveryMethod,donorTelephone,donorOtherDetails,donorLocation} = req.body
//    console.log(req.body);
    //add doc to db
    try {
        const newOrgAidRequest = await OrgAidRequest.create({ orgId, orgName, requestTitle,population, dueDate, orgOtherDetails, orgLocation, orgTelephone,donorId,donorName,donationSize,deliveryMethod,donorTelephone,donorOtherDetails,donorLocation })
        res.status(200).json(newOrgAidRequest)
    } catch (error) {
        res.status(400).json({ error: error.message ,msg:"checking2"})
    }



}

// delete a ProvideDonation
const deleteProvideDonation = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Org Job' })
    }
    const ProvideDonation = await OrgAidRequest.findOneAndDelete({ _id: id })

    if (!ProvideDonation) {
        return res.status(400).json({ error: 'No Such Org Job' })
    }

    res.status(200).json(ProvideDonation)

}


// update a workout
const updateProvideDonation = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Workout' })
    }
    const ProvideDonation = await OrgAidRequest.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!ProvideDonation) {
        return res.status(400).json({ error: 'No Such Workout' })
    }

    res.status(200).json(ProvideDonation)

}

module.exports = {
    getProvideDonation,
    getProvideDonations,
    createProvideDonation,
    deleteProvideDonation,
    updateProvideDonation,
    getDonorSelfDelivery,
    getDonorVolunteerDelivery
}