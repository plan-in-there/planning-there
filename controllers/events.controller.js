const mongoose = require('mongoose')
const Event = require('../models/event.model')
const User = require('../models/user.model')
const Match = require('../models/match.model')
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
//owner: req.user.id
module.exports.doCreate = (req, res, next) => {
    myEvent = { name, date, description, city, genre, category, age, dressCode, image, time} = req.body
    myEvent.owner = req.user.id
    if (!req.file) {
        delete req.body.image
    } else {
        req.body.image = req.file.path
    }
    Event.create( myEvent )
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
    const searchDate= req.query.filterDate
    const searchCategory = req.query.filterCategory
    if (searchDate != undefined) {
        Event.find({date: { $in: [searchDate]}})
            .populate('owner')
            .then(events => {
                res.render('events/list', {
                    events,
                    categoriesList,
                    genreList,
                    dressList
                })
            })
    } else if (searchCategory != undefined) {
        return Event.find({category: { $in: [searchCategory]}})
                .populate('owner')
                .then(events => {
                    res.render('events/list', {
                        events,
                        categoriesList,
                        genreList,
                        dressList
                    })
                })
    } else {
       return Event.find()
                .sort({dattimestampse: 1})
                .populate('owner')
                .then(events => {
                    res.render('events/list', {
                        events,
                        categoriesList,
                        genreList,
                        dressList
                    })
                })
            .catch(next)
    }
}

module.exports.edit = (req, res, next) => {
    Event.findByIdAndUpdate(req.params.id)
        .then(event => {
            if (event) {
                res.render('events/edit', {
                    event: event,
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
        .then(() => { res.redirect('/events') })
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
        .populate({
            path: 'matches',
            populate:{
                path: 'userId'
            }
        })
        .then((event) => {

            return res.render('events/detail', { event})

        })
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => {
            Match.find({eventId: req.params.id})
                .then(match => {
                    Match.findByIdAndDelete(match)
                        .then(() => res.redirect('/events'))
                })
        })
        .catch(next)
}