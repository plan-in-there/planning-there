const Event = require('../models/event.model');
const User = require('../models/user.model')

module.exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports.isNotAuthenticated = (req, res, next) => {
    if (req.user) {
        res.redirect('/login')
    } else {
        next()
    }
}

module.exports.eventOwner = (req, res, next) => {
    Event.findById(req.params)
        .then((event) => {
            if (event) {
                if (event.owner == req.user.id) {
                    req.event = event;
                    next()
                } else {
                    next(createError(403))
                }
            } else {
                next(error => next(error))
            }
        })
        .catch(error => next(error))
}

module.exports.profileOwner = (req, res, next) => {
    User.find(req.user.id)
        .then((user) => {
            if (user) {
                if (user.id == req.user.id) {
                    req.id = id;
                    next()
                } else {
                    next(createError(403))
                }
            } else {
                next(error => next(error))
            }
        })
        .catch(error => next(error))
}