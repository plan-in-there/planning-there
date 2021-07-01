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

   

    if(!req.file){
        delete req.body.avatar
    } else {
        req.body.avatar = req.file.path
    }

    if(!req.body.password){
        delete req.body.password
    } else {
        req.body.password = req.body.password
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