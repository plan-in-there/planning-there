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
        dressList,
        title: 'Create your own plan',
        description: 'Fill the for, create your plan and star connecting with people with your interests'
    })
}

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
            console.log(myEvent)
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('events/create', {
                    event: req.body,
                    errors: error.errors,
                    categoriesList,
                    genreList,
                    dressList,
                    title: 'Create your own plan',
                    description: 'Fill the for, create your plan and star connecting with people with your interests'
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
            .populate('matches')
            .then(events => {
                res.render('events/list', {
                    events,
                    categoriesList,
                    genreList,
                    dressList,
                    title: 'Plans for everyone',
                    description: 'Enrole in some of our plans and start connecting with people around the globe'
                })
            })
    } else if (searchCategory != undefined) {
        return Event.find({category: { $in: [searchCategory]}})
                .populate('owner')
                .populate('matches')
                .then(events => {
                    res.render('events/list', {
                        events,
                        categoriesList,
                        genreList,
                        dressList,
                        title: 'Plans for everyone',
                        description: 'Enrole in some of our plans and start connecting with people around the globe'
                    })
                })
    } else {
       return Event.find()
                .sort({dattimestampse: 1})
                .populate('owner')
                .populate('matches')
                .then(events => {
                    res.render('events/list', {
                        events,
                        categoriesList,
                        genreList,
                        dressList,
                        title: 'Plans for everyone',
                        description: 'Enrole in some of our plans and start connecting with people around the globe'
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
                    dressList,
                    title: 'Edit your plan',
                    description: 'Change your events detail'
                })
            } else {
                res.redirect(`/events/${event._id}`)
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
                    dressList,
                    title: 'Edit your plan',
                    description: 'Change your events detail'
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
        .populate('owner')
        .then((event) => {
            return res.render('events/detail', { 
                event,
                title: `${event.name}`,
                description: `${event.description}`
            })

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