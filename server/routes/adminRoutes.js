const express = require('express')

const router = express.Router()

const {
    getAdminJob,
    getAdminJobs,
    createAdminJob,
    deleteAdminJob,
    updateAdminJob
} = require('../controller/adminController')

//Get all Admin approves
router.get('/',getAdminJobs) 

//Get a single Admin approve
router.get('/:id',getAdminJob)

//POST a new Admin approve
router.post('/', createAdminJob)

// //Delete a  Admin approve
router.delete('/:id', deleteAdminJob)

// //Update a Admin approve
router.patch('/:id',updateAdminJob)

module.exports = router