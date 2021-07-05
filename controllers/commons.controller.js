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

/* module.exports.search = (req, res, next) => {

  Event.find({category: { $in: [Museums, Live-music, Night-life, Beers/drinking, Nature, Queer, Foodie, Dance]}})
    .then(event => {
      if (!events) {
        res.redirec('/')
      } else {
        res.render('/events', {events})
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {

      }
    })  
}
 */


/* app.get('/season:seasonId', (request, response) => {
  const episodes = dataEpisodes.filter((e) => e.season === Number(request.params.seasonId))
  response.render('season', {
      data: episodes
  })
  { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
}) */
