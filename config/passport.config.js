const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then((user) => next(null, user))
    .catch(next);
});

passport.use(
  'local-auth',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, next) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            next(null, null, { 
              email: 'Invalid mail or password',
              password: 'Invalid mail or password',
              invalidSession: 'Invalid mail or password' });
          } else {
            return user.checkPassword(password).then((match) => {
              if (match) {
                next(null, user);
              } else {
                next(null, null, { 
                  email: 'Invalid mail or password',
                  password: 'Invalid mail or password',
                  invalidSession: 'Invalid mail or password'  });
              }
            });
          }
        })
        .catch(error => next(error));
    },
  ),
);

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
              
              });

              return user.save().then((user) => next(null, user));
            } else {
              next(null, user);
            }
          })
          .catch(error => next(error));
      } else {
        next(null, null, { oauth: 'invalid google oauth response' });
      }
    },
  ),
);

/* passport.use(
  'facebook-auth',
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || '/authenticate/facebook/cb',
      profileFields: ["email", "name", "avatar"]
    },
    function(accessToken, refreshToken, profile, done) {
      const facebookId = profile.id
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        name: first_name,
        avatar: profile.photos[0].value,
        password: mongoose.Types.ObjectId(),
          social: {
            facebook: facebookId,
          },

      };
      new User(userData).save();
      done(null, profile);
    }
  )
); */