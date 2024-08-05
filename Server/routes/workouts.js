const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } = require('../controllers/WorkoutControllers');

// initialize router
const router = express.Router();

//require auth for all workout routes
router.use(requireAuth);

router.get('/', getWorkouts);
//Get a single workout
router.get('/:id', getWorkout);
//Post a new workout
router.post('/', createWorkout);
//Delete a workout
router.delete('/:id', deleteWorkout);
//Update a workout
router.patch('/:id', updateWorkout);

module.exports = router;