const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categories = require('../data/categories.json')
const genre = require('../data/genre.json')


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
            return '/img/profile-white.png'
        }
    },
    age: {
        type: Date,
        //required: 'age is required!',
    },
    genre: {
        type: String,
        enum: Object.keys(genre)
        //required: 'select an option!',
    },
    interests: {
        type: [{
            type: String,
            enum: Object.keys(categories)
        }],
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
    about: {
        type: String,
    },
    local: {
        type: Boolean,
        default: false,
    },
    valoration: {
        type: String,
    },
    social: {
        google: {
          type: String,
        },
        facebook: {
            type: String,
          },
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

userSchema.virtual('createdEvents', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
  });

userSchema.virtual('matchedEvents', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
});


const User = mongoose.model('User', userSchema)

module.exports = User