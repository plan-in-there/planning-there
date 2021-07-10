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

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.json(users))
    .catch(next)
}

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
  const matchPromise = Match.find({userId : req.user.id})
      .sort({dattimestampse: 1})
      .populate('eventId')
      .populate('userId')
  const eventsPromise = Event.find({owner: req.user.id})
      .sort({dattimestampse: 1})
      .populate('owner')

  Promise.all([matchPromise, eventsPromise])
    .then(([events, createEvents]) => {
      if (events || createEvents) {
        return res.render('user/userevents', {
          events: events.map(matchedEvents => matchedEvents.eventId),
          title: 'Your plans in Plan-in-there',
          description: 'This is the plans that you have enroled or created',
          categories,
          createEvents: createEvents
        })
      } else {
        res.render('user/userevents', {
          title: 'Your plans in Plan-in-there',
          description: 'This is the plans that you have enroled or created',
          eventlist: `You haven't matched any plans yet`,
          categories,
        })
      }
    })
    .catch(next)

    
}

module.exports.createdEvents = (req, res, next) => {
  Event.find({owner: req.user.id})
      .then(createEvents => {
        if(!createEvents) {
          res.render('user/userevents', {
            title: 'Your plans in Plan-in-there',
            description: 'This is the plans that you have enroled or created',
            eventlist: `You haven't matched any plans yet`,
            categories,
          })
        } else {
          return res.render('user/userevents', {
            createEvents: createEvents.map(createdEvents => createdEvents.eventId),
            title: 'Your plans in Plan-in-there',
            description: 'This is the plans that you have enroled or created',
            categories,
          })}
      })
      .catch(next)
}

module.exports.userHomePage = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if(user){    
      return Event.find({category: {$in:user.interests}})
               .populate('matches')
               .populate('owner')
               .then(events => {              
                 res.render('user/home', {
                   events,
                   categories,
                 })
               })
     } else {
       next()
     }
    })
    .catch(next)
 

}
