const mongoose = require('mongoose')
const Match = require('../models/match.model')

module.exports.like = (req, res, next) => {
    console.log(req.user.id)
    console.log(req.params.id)

    const match = new Match({
        userId : req.user.id,
        eventId : req.params.id
    })
    match.save()
        .then(matches => res.redirect('/events'))
        .catch()
}

