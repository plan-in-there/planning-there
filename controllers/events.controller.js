const mongoose = require('mongoose')
const Event = require('../models/event.model')
const categoriesList = require('../data/categoriesList.json')
const genreList = require('../data/genreList.json')
const dressList = require('../data/dressList.json')

module.exports.create = (req, res, next) => {
    res.render('events/create', {
        categoriesList,
        genreList,
        dressList
    })
}

module.exports.doCreate = (req, res, next) => {
    myEvent = { name, date, description, city, genreRestrictions, category, age, dressCode} = req.body
    console.log(req.body)
    if (req.file == null) {
        if (req.body.category == "Museums") {
            myEvent['image'] = "/img/categoriesList/Museums.jpeg"
        } else if (req.body.category == "Live-music") {
            myEvent['image'] = "/img/categoriesList/live-music.jpeg"
        } else if (req.body.category == "Night-life") {
            myEvent['image'] = "/img/categoriesList/Night-life.jpeg"
        } else if (req.body.category == "Beers/drinking") {
            myEvent['image'] = "/img/categoriesList/beers.jpeg"
        } else if (req.body.category == "Nature") {
            myEvent['image'] = "/img/categoriesList/Nature.jpeg"
        } else if (req.body.category == "Queer") {
            myEvent['image'] = "/img/categoriesList/Queer.jpeg"
        } else if (req.body.category == "Foodie") {
            myEvent['image'] = "/img/categoriesList/foodie.jpeg"
        } else if (req.body.category == "Dance") {
            myEvent['image'] = "/img/categoriesList/dance.jpeg"
        }
    } else {
        myEvent['image'] = req.file.path
    }

    Event.create(myEvent)
        .then(plan => res.redirect('/events'))
        .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('events/create', {
                    event: req.body,
                    errors: error.errors,
                    categoriesList,
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
                res.render('events/edit', {
                    event, 
                    categoriesList,
                    genreList,
                    dressList
                })
            } else {
                res.redirect('/events')
            }
        })
        .catch(next)
}

module.exports.doEdit = (req, res, next) => {
    if (!req.file) {
        delete req.body.image
    } else {
        req.body.image = req.file.path
    }
    Event.findByIdAndUpdate(req.params.id, req.body)
        .then(() => { res.redirect('/events')})
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('events/create', {
                    event: req.body,
                    errors: error.errors,
                    categoriesList,
                    genreList,
                    dressList
                })
            } else {
                next()
            }
        })
}

module.exports.detail = (req, res, next) => {
    Event.findById(req.params.id)
        .then((event) => res.render('events/detail', {event}))
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/events'))
        .catch(next)
}