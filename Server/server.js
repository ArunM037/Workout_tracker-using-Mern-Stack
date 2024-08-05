require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');


const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


//create express app
const app = express();

//`middleware`
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// api routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

//connect to db & listening to request
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server started on port:' + process.env.PORT)
        });
    })
    .catch(err => { console.log(err); })

