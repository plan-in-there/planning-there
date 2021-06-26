const mongoose = require('mongoose')
const Schema = mongoose.Schema



const eventSchema = new Schema({
    name: {
        type: String,
        required: 'name is required!'
    },
    date: {
        type: Number,
        required: 'date is required!'
    },
    description: {
        type: String,
        required: 'description is required!'
    },
    city: {
        type: String,
        required: 'city is required!'
    },
    genderRestrictions: {
        type: String
    }
    ,
    category: {
        type: [String],
        required: 'category is required!'
    },
    age: {
        type: Number,
    },
    owner: {
        type: String, //ref del 
    },
    guests: {
        type: [String], // ofrecer otros planes si nadie va a su plan!
    },
    dressCode: {
        type: String,
    },
    createAt: {
        type: Number,
    },
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event