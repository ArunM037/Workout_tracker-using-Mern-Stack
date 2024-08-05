const Workout = require('../models/workoutsModel');
const mongoose = require('mongoose');


//Get all workouts
const getWorkouts = async (req, res) => {

    const user_id = req.user._id

    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
}


//Get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;
    //check if id is a valid object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }
    // fectch a single workout
    const workout = await Workout.findById(id);
    // check if workout exists
    if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
}


//Post a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    // add a Workout
    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, reps, load, user_id });
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    //check if id is a valid object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }
    // delete a single workout
    const workout = await Workout.findByIdAndDelete({ _id: id });
    // check if workout exists
    if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
}

//Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    //check if id is a valid object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }
    //update a single workout
    const workout = await Workout.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })
    // check if workout exists
    if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}