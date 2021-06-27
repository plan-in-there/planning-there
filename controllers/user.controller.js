const User = require('../models/user.model');
const mongoose = require('mongoose');
const categories = require('../data/categories.json')

module.exports.userProfile = (req, res, next) => {
    res.render('user/profile')
}

module.exports.userProfileEdit = (req, res, next) => {


    User
    .findOne({_id: req.params.id})
    .then(user => {
        res.render('user/edit', {
            user,
            categories
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
    
     User
    .findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        avatar: req.file.path,
        age: req.body.age,
        interests: req.body.interests,
        city: req.body.city,
    }, { runValidators: true, new: true })   
    .then(user => {        
        res.redirect(`/user-profile/${user._id}`)
    })     
    .catch(error => next(error))

}