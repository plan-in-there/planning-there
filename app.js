require('dotenv').config()

const express = require('express')
const app = express()
const logger = require('morgan')
const path = require('path')
const passport = require('passport');

require('./config/db.config.js')
require('./config/hbs.config')
require('./config/passport.config');

app.use(logger('dev'))
const {sessionConfig} = require('./config/session.config')
//const {sessionConfig, loadUser} = require('./config/session.config')
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session())
//app.use(loadUser)

app.use(express.urlencoded({ extended: true }));




app.use((req, res, next) => {
  res.locals.path = req.path;
  res.locals.currentUser = req.user
  next()
 
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

app.use(passport.initialize());
app.use(passport.session());


const router = require('./config/routes.config')
app.use('/', router)



const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Ready! Listening on port ${port}`);
});