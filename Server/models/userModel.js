const mongoose = require('mongoose')
const bycrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'users' });


// Check if email already exists
userSchema.statics.signup = async function (email, password) {
    //validation
    if (!email || !password) {
        throw new Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw new Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough')
    }
    const exists = await this.findOne({ email })
    if (exists) {
        throw new Error('Email already exists')
    }

    // Generate salt and hash password
    const salt = await bycrypt.genSalt(10)
    const hash = await bycrypt.hash(password, salt)

    // Create new user document
    const user = await this.create({ email, password: hash })
    return user
}

//static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw new Error('Incorrect email')
    }
    const match = await bycrypt.compare(password, user.password)
    if (!match) {
        throw new Error('Incorrect password')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)
