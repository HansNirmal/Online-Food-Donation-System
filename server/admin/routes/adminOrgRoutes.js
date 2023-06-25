const express = require('express')

const router = express.Router()

const {
    getAdminOrgJob,
    getAdminOrgJobs,
    createAdminOrgJob,
    deleteAdminOrgJob,
    updateAdminOrgJob
} = require('../controller/adminOrgController')

//Get all Unregisterd Organizations for Admin approves
router.get('/',getAdminOrgJobs) 

//Get a single Unregisterd Organizations for Admin approve
router.get('/:id',getAdminOrgJob)

//POST a new Unregisterd Organizations for Admin approve
router.post('/', createAdminOrgJob)

//Delete a  Unregisterd Organizations for Admin approve
router.delete('/:id', deleteAdminOrgJob)

//Update a Unregisterd Organizations for Admin approve
router.patch('/:id',updateAdminOrgJob)

module.exports = router