const express = require('express')
const router = express.Router()
const {
    getVolunteerJob,
    getOneVolunteerJobs,
    getVolunteerJobs,
    createVolunteerJob,
    deleteVolunteerJob,
    updateVolunteerJob
} = require('../controller/volunteerController')



//Get all volunteer jobs
router.get('/',getVolunteerJobs) 

//Get all specific-volunteer jobs
router.get('/user-jobs/:volunteerid',getOneVolunteerJobs)

//Get a single volunteer job
router.get('/:id',getVolunteerJob)

//POST a new volunteer job
router.post('/', createVolunteerJob)

//Delete a  volunteer job
router.delete('/:id', deleteVolunteerJob)

//Update a volunteer job
router.patch('/:id',updateVolunteerJob)


module.exports = router;