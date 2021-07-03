const mongoose = require('mongoose')
const Match = require('../models/match.model')

module.exports.like = (req, res, next) => {
    Match.findOne({eventId : req.params.id, userId: req.user.id})
        .then(match => {
            if(!match) {
                const match = new Match({
                    userId : req.user.id,
                    eventId : req.params.id
                })
                match.save()
                    .then(matches => res.redirect('/events'))

            } else {
              return  Match.findByIdAndDelete(match.id)
                .then(() => res.redirect('/'))
            }
        })
        .catch(next)



   /*  const match = new Match({
        userId : req.user.id,
        eventId : req.params.id
    })
    match.save()
        .then(matches => res.redirect('/events'))
        .catch() */
}

