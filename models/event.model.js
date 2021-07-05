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
            } else if (this.category.includes("Live-music")) {
                return  "/img/categoriesList/live-music.jpeg"
            } else if (this.category.includes("Night-life")) {
                return  "/img/categoriesList/Night-life.jpeg"
            } else if (this.category.includes("Beers/drinking")) {
                return  "/img/categoriesList/beers.jpeg"
            } else if (this.category.includes("Nature")) {
                return  "/img/categoriesList/Nature.jpeg"
            } else if (this.category.includes("Queer")) {
                return  "/img/categoriesList/Queer.jpeg"
            } else if (this.category.includes("Foodie")) {
                return  "/img/categoriesList/foodie.jpeg"
            } else if (this.category.includes("Dance")) {
                return  "/img/categoriesList/dance.jpeg"
            }
        } 
    },
    age: {
        type: Number,
        required: 'age is required!',
        min: 16, //como poner desde hasta en el form para luego filtrar por edad!!
        max: 99
    },
    owner: {
         type: Schema.Types.ObjectId, 
         ref: "Owner"
         
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

eventSchema.virtual('matches', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'eventId',
    justOne: false
  });



const Event = mongoose.model('Event', eventSchema)

module.exports = Event