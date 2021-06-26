const mongoose = require('mongoose')
const Event = require('../models/event.model')

module.exports.create = (req, res, next) => {
    res.render('events/create')
}

module.exports.doCreate = (req, res, next) => {
    
     event = {name, date, description, city, genreRestrictions, category, age, owner, guests, dressCode, createAt} = req.body

    Event.create(event)
        
        .then(event => { return res.send('evento hecho!')})
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('events/create', {
                    event: req.body,
                    errors: error
                })
            } else {
                next()
            }
        })
}