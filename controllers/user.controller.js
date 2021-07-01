const User = require('../models/user.model');
const mongoose = require('mongoose');
const categoriesList = require('../data/categoriesList.json')

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
    
     User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            avatar: req.file.path,
            age: req.body.age,
            interests: req.body.interests,
            city: req.body.city,
        }, { runValidators: true, new: true })   
        .then(user => res.redirect(`/user-profile/${user.id}`))     
        .catch(error => next(error))

}
