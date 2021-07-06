const User = require('../models/user.model');
const Match = require('../models/match.model');
const Event = require('../models/event.model');
const mongoose = require("mongoose");
const categories = Object.keys(require('../data/categories.json'));
const genre = Object.keys(require('../data/genre.json'));

module.exports.userProfile = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    res.render('user/profile', {
      user,
      title: `${user.name}'s profile`,
      description: `This is ${user.name} personal profile in Plan-in-there.`
    });
  });
};

module.exports.userProfileEdit = (req, res, next) => {
  res.render('user/edit', {
    user: req.user,
    categories,
    genre,
    title: 'Edit your profile',
    description: 'Edit your profile'
  });
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
    .then((user) => res.redirect(`/user-profile/${user.id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('user/edit', {
          user: req.body,
          error: error.errors,
          categories,
          genre,
        });
      } else {
        next(error);
      }
    });
};

module.exports.userEvents = (req, res, next) => {
 
  Event.find({owner: req.user.id})
    .then(events => {
      res.render('user/userevents', {
        events,
        title: 'This are your events'
      })
    })
    .catch(next)

}

module.exports.userEvents = (req, res, next) => {
 Match.find({userId : req.user.id})
      .sort({date: 1})
      .populate('eventId')
      .then(events => {    
      return res.render('user/userevents', {
        events: events.map(matchedEvents => matchedEvents.eventId)
      })
    })
    .catch(next)
}

