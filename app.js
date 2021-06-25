/* require('dotenv').config()
 */
const express = require('express')
const app = express()
const logger = require('morgan')
const path = require('path')
const bodyparser = require('body-parser')

require('./config/db.config.js')
require('./config/hbs.config')



const {sessionConfig, loadUser} = require('./config/session.config')
app.use(sessionConfig)
app.use(loadUser)

app.use(express.urlencoded({ extended: false }));




app.use((req, res, next) => {
  res.locals.path = req.path;
  next()
 
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


const router = require('./config/routes.config')
app.use('/', router)



const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Ready! Listening on port ${port}`);
});