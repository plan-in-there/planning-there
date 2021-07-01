const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categoriesList = require('../data/categoriesList.json')
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
        required: 'city is required!'
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
            enum: categoriesList,
        }],
    },
    image: {
        type: String,
        default: function () {
            if (this.category.includes("Museums")) {
                return  "/img/categoriesList/Museums.jpeg"
            } else if (this.category == "Live-music") {
                return  "/img/categoriesList/live-music.jpeg"
            } else if (this.category == "Night-life") {
                return  "/img/categoriesList/Night-life.jpeg"
            } else if (this.category == "Beers/drinking") {
                return  "/img/categoriesList/beers.jpeg"
            } else if (this.category == "Nature") {
                return  "/img/categoriesList/Nature.jpeg"
            } else if (this.category == "Queer") {
                return  "/img/categoriesList/Queer.jpeg"
            } else if (this.category == "Foodie") {
                return  "/img/categoriesList/foodie.jpeg"
            } else if (this.category == "Dance") {
                return  "/img/categoriesList/dance.jpeg"
            }
        } 
    },
    age: {
        type: Number,
        required: 'age is required!',
        min: 16,
        max: 99
    },
    owner: {
        type: String, //ref de quien crea el evento
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