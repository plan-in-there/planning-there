const mongoose = require('mongoose')
const Schema = mongoose.Schema



const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;

const userSchema = new Schema({
    name: {
        type: String,
        required: 'name is required!',
        minLenght: 3
    },
    email: {
        type: String,
        required: 'email is required',
        match: [EMAIL_PATTERN, 'email is not valid'],
        unique: true
    },
    password: {
        type: String,
        required: 'password is required',
        match: [PASSWORD_PATTERN, 'password needs at least 8 chars'],
    },
    avatar: {
        type: String,
        default: function(){
            return 
        }
    },
    age: {
        type: Number,
        required: 'age is required!',
    },
    genre: {
        type: String,
        required: 'select an option!',
    },
    interests: {
        type: [String],
        required: 'interests are required!',
        min: 3,
        max: 5
    },
    ownedPlans: {
        type: [String]
    },
    matchedPlans: {
        type: [String]
    },
    messages: {
        type: [String],
    },
    city: {
        type: String,
        required: 'city is required!'
    },
    local: {
        type: Boolean,
        default: false,
    },
    valoration: {
        type: String,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User