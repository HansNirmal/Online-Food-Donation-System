const express = require('express')

const router = express.Router()

const {
    getCompletedDonation,
    getCompletedDonations,
    createCompletedDonation,
    deleteCompletedDonation,
    updateCompletedDonation
} = require('../controller/completedDonationController')

//Get all Completed Donations
router.get('/',getCompletedDonations) 

//Get a single Completed Donation
router.get('/:id',getCompletedDonation)

//POST a new Completed Donation
router.post('/', createCompletedDonation)

// //Delete a single Completed Donation
router.delete('/:id', deleteCompletedDonation)

// //Update a single Completed Donation
router.patch('/:id',updateCompletedDonation)

module.exports = router