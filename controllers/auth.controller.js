const User = require('../models/user.model')
const mongoose = require('mongoose')
const passport = require('passport')

module.exports.register = (req, res, next) => {
  res.render('auth/register', {
    layout: 'layout-principle.hbs',
    title: 'Register today and start connecting',
    description: 'Register now and start meeting new friends and awesome plans',
  })
}

module.exports.doRegister = (req, res, next) => {
  function renderWithErrors(errors) {
    res.render('auth/register', {
      user: req.body,
      errors: errors,
      layout: 'layout-principle.hbs',
      title: 'Register today and start connecting',
      description: 'Register now and start meeting new friends and awesome plans',
    })
  }
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        renderWithErrors({
          email: 'email already exists!'
        })
      } else {
        user = {name,email,password} = req.body
        return User.create(user)
          .then(user => {
            req.login(user, (error) => {
              if (error) next(error);
              else res.redirect('user-profile/me/edit');
            });
          })
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors)
      } else {
        next(error)
      }
    })
}

module.exports.login = (req, res, next) => {
  res.render('auth/login',  {
    layout: 'layout-principle.hbs',
    title: 'Login in plan in there. We miss you!',
    description: 'Login for new friends and awesome plans',
  })
}

module.exports.doLogin = (req, res, next) => {
  const passportController = passport.authenticate('local-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.status(400).render('auth/login', { 
        user: req.body,
        layout: 'layout-principle.hbs',
        title: 'Login in plan in there. We miss you!',
        description: 'Login for new friends and awesome plans',
        errors: {
          email: 'Invalid mail or password',
          password: 'Invalid mail or password',
          invalidSession: 'Invalid mail or password' }
       });
    } else {
      req.login(user, (error) => {
        if (error) next(error);
        else res.redirect(`user-profile/${user.id}`);
      });
    }
  });

  passportController(req, res, next);
};


module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login')
}

module.exports.loginWithGoogle = (req, res, next) => {
  const passportController = passport.authenticate('google-auth', {
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
  });

  passportController(req, res, next);
};

module.exports.doLoginWithGoogle = (req, res, next) => {
  const passportController = passport.authenticate('google-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.status(400).render('users/login', { user: req.body, errors: validations });
    } else {
      req.login(user, (error) => {
        if (error) next(error);
        else res.redirect('/user-profile/me/edit');
      });
    }
  });

  passportController(req, res, next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
};

