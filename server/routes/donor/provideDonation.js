const express = require('express')
const router = express.Router()
const {
    getProvideDonation,
    getProvideDonations,
    createProvideDonation,
    deleteProvideDonation,
    updateProvideDonation,
    getDonorSelfDelivery,
    getDonorVolunteerDelivery
} = require('../../controller/donor/provideDonation')


const suburl = "provideDonation"
//Get all Org jobs
router.get('/',getProvideDonations) 

//Get all self-delivery donations
router.get('/self-delivery/',getDonorSelfDelivery)


//Get all volunteer jobs
router.get('/volunteer-delivery/',getDonorVolunteerDelivery)

//Get a single Org job
router.get('/:id',getProvideDonation)

//POST a new Org job
router.post('/', createProvideDonation)

//Delete a  Org job
router.delete('/:id', deleteProvideDonation)

//Update a Org job
router.patch('/:id',updateProvideDonation)


module.exports = router;