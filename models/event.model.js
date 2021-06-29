const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categories = require('../data/categories.json')
const genreList = require('../data/genreList.json')
const dressList = require('../data/dressList.json')

const eventSchema = new Schema({
    name: {
        type: String,
        required: 'name is required!'
    },
    date: {
        type: Date,
        required: 'date is required!'
    },
    description: {
        type: String,
        required: 'description is required!'
    },
    city: {
        type: String,
        /* required: 'city is required!' */
    },
    genreRestrictions: {
        type: [{
            type: String,
            enum: genreList
        }]
    },
    category: {
        type: [{
            type: String,
            enum: categories,
        }],
       
        /* required: 'category is required!' */
    },
    age: {
        type: Number,
        min: 16,
        max: 99
    },
    owner: {
        type: String, //ref del 
    },
    guests: {
        type: [String], // ofrecer otros planes si nadie va a su plan!
    },
    dressCode: {
        type: [{
            type: String,
            enum: dressList,

        }]
    },
}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event