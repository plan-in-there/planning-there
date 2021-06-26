const User = require('../models/user.model')
const mongoose = require('mongoose')

module.exports.userProfile = (req, res, next) => {
    res.render('user/profile')
}

module.exports.userProfileEdit = (req, res, next) => {
    

    User
    .findOne({_id: req.params.id})
    .then(user => {
        res.render('user/edit', {
            user
        })
    })
    .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          renderWithErrors(error.errors)
        } else {
          next(error)
        }
      })
}

module.exports.userProfileDoEdit = (req, res, next) => {
    const userUpdated = req.body
    console.log(userUpdated)

    User.findByIdAndUpdate(req.params.id, userUpdated)    
    .then(user => {
        console.log(req.body.name)       
        res.redirect(`/user-profile/${user._id}`)
    }) 
    .catch(error => next(error))   

}