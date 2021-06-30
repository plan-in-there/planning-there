const User = require('../models/user.model');
const mongoose = require('mongoose');
const categoriesList = require('../data/categories.json')

module.exports.userProfile = (req, res, next) => {
    res.render('user/profile')
}

module.exports.userProfileEdit = (req, res, next) => {

    User.findOne({_id: req.params.id})
        .then(user => {
            res.render('user/edit', {
                user,
                categoriesList
            })
        })
        .catch(error => next(error))
}

module.exports.userProfileDoEdit = (req, res, next) => {

    function renderWithErrors(errors) {
        res.render('user/edit', {
          user: req.body,
          errors: errors
        })
    }

    delete req.body.password

    if(!req.file){
        delete req.body.avatar
    } else {
        req.body.avatar = req.file.path
    }
    
     User.findByIdAndUpdate(req.params.id, 
        req.body, { runValidators: true, new: true })   
        .then(user => res.redirect(`/user-profile/${user.id}`))     
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })

}