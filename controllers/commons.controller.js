module.exports.home = (req, res, next) => {
  res.render('common/home', {
    layout: 'layout-principle.hbs',
    title: 'Plan-in-there. Connecting people',
    description: 'Connecting people trough the world. We have plans, we have people, you choose',
  });
};
