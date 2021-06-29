const mongoose = require('mongoose')
const Event = require('../models/event.model')
const categories = require('../data/categories.json')
const genreList = require('../data/genreList.json')
const dressList = require('../data/dressList.json')

module.exports.create = (req, res, next) => {
    res.render('events/create', {
        categories,
        genreList,
        dressList
    })
}

module.exports.doCreate = (req, res, next) => {
    myEvent = { name, date, description, city, genreRestrictions, category, age, owner, guests, dressCode, createAt } = req.body

    Event.create(myEvent)
        .then(plan => {
            return res.send('evento hecho!')
        })
        .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('events/create', {
                    event: req.body,
                    errors: error.errors,
                    categories,
                    genreList,
                    dressList
                })
            } else {
                next()
            }
        })
}
module.exports.list = (req, res, next) => {
   Event.find(req.query)
    .then(events => res.render('events/list', {events}))
    .catch(next)
}

module.exports.edit = (req, res, next) => {
    Event.findByIdAndUpdate(req.params.id)
        .then(event => {
            if (event) {
                res.render('events/edit', {event})
            } else {
                res.redirect('/events')
            }
        })
        .catch(next)
}

module.exports.doEdit = (req, res, next) => {
    Event.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect('/events'))
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    Event.findById(req.params.id)
        .then((event) => res.render('events/detail', {event}))
        .catch(next)
}
