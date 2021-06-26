const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcryptjs')

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const  SALT_ROUNDS = 10
const userSchema = new Schema({
    name: {
        type: String,
        required: 'name is required!',
        minLength: [3, 'name needs at least 3 chars']
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
        type: Date,
        //required: 'age is required!',
    },
    genre: {
        type: String,
        enum: ['Male', 'Female', 'Non binary', 'Non listed']
        //required: 'select an option!',
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
        //required: 'city is required!'
    },
    local: {
        type: Boolean,
        default: false,
    },
    valoration: {
        type: String,
    }
})

userSchema.pre('save', function (next) {
    const user = this
    if (user.isModified('password')) {
        bcrypt.hash(user.password, SALT_ROUNDS)
            .then(hash => {
                user.password = hash
                next()
            })
            .catch(error => next (error))
    } else {
        next()
    }
})

userSchema.methods.checkPassword = function (passwordToCheck){

        return bcrypt.compare(passwordToCheck, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User