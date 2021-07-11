const mongoose = require('mongoose')
const Event = require('../models/event.model')


module.exports.home = (req, res, next) => {
  res.render('common/home', {
    layout: 'layout-principle.hbs',
    title: 'Plan-in-there. Connecting people',
    description: 'Connecting people trough the world. We have plans, we have people, you choose',
  });
};

module.exports.privacyTerms = (req, res, next) => {
  res.render('common/privacy-terms', {
    title: 'Privacy terms',
    description: 'Plan-in-there privacy terms. We secure your dates!'
  })
}

module.exports.planInThere = (req, res, next) => {
  res.render('common/plan-in-there', {
    title: 'What it is Plan-in-there?',
    description: 'The new social app that connects people'
  })
}
