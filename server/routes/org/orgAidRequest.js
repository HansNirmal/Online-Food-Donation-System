const express = require('express')
const router = express.Router()
const {
    getOrgJob,
    getOrgJobs,
    createOrgJob,
    deleteOrgJob,
    updateOrgJob
} = require('../../controller/org/orgAidRequest')


const suburl = "aidRequest"
//Get all Org jobs
router.get('/',getOrgJobs) 

//Get a single Org job
router.get('/:id',getOrgJob)

//POST a new Org job
router.post('/', createOrgJob)

//Delete a  Org job
router.delete('/:id', deleteOrgJob)

//Update a Org job
router.patch('/:id',updateOrgJob)




module.exports = router;