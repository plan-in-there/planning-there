const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const mongoose = require('mongoose')
const User = require('../models/user.model')

passport.serializeUser((user, next) => {
    next(null, user.id)
});

passport.deserializeUser((id, next) => {
    User.findById(id)
        .then(user => next (null, user))
        .catch(error => next(error))
});


passport.use(
    'google-auth',
    new GoogleStrategy(
      {
        clientID: process.env.G_CLIENT_ID,
        clientSecret: process.env.G_CLIENT_SECRET,
        callbackURL: process.env.G_REDIRECT_URI || '/authenticate/google/cb',
      },
      (accessToken, refreshToken, profile, next) => {
      
        const googleId = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0] ? profile.emails[0].value : undefined;
  
        if (googleId && name && email) {
          User.findOne({ $or: [{ email }, { 'social.google': googleId }] })
            .then((user) => {
              if (!user) {
                user = new User({
                  name,
                  email,
                  avatar: profile.photos[0].value,
                  password: mongoose.Types.ObjectId(),
                  social: {
                    google: googleId,
                  },
                  active: true,
                });
  
                return user.save().then((user) => next(null, user));
              } else {
                next(null, user);
              }
            })
            .catch(next);
        } else {
          next(null, null, { oauth: 'invalid google oauth response' });
        }
      },
    ),
  );