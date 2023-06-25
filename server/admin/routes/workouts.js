const express = require('express')
const router = express.Router()
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controller/workoutController')



//Get al workouts
router.get('/',getWorkouts) 

//Get a single workout
router.get('/:id',getWorkout)

//POST a new workout
router.post('/', createWorkout)

//Delete a  workout
router.delete('/:id', deleteWorkout)

//Update a workout
router.patch('/:id',updateWorkout)


module.exports = router;

