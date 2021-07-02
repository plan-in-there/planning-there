const User = require('../models/user.model');
const mongoose = require('mongoose');

const categoriesList = require('../data/categoriesList.json');
const genreList = require('../data/genreList.json');

module.exports.userProfile = (req, res, next) => {
    User.findById(req.params.id)
    .then(user => {
        res.render('user/profile', {
            user
        });
    })
 
};

module.exports.userProfileEdit = (req, res, next) => {

  User.find( req.user )
      .then((user) => {      
      res.render('user/edit', {
        user,
        categoriesList,
        genreList
      });
    })
    .catch(next);
};

module.exports.userProfileDoEdit = (req, res, next) => {
  if (req.file) {
    req.body.avatar = req.file.path;
  }

  if (!req.body.password) {
    delete req.body.password;
  }

  delete req.body.email;
  Object.assign(req.user, req.body);
  req.user
    .save()
    .then((user) =>
     res.redirect(`/user-profile/${user.id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('user/edit', {
          user: req.body,
          error: error.errors,
          categoriesList,
          genreList
         
          
        });
      } else {
        next(error);
      }
    });
};

